/* Licensed under the MIT License. See the accompanying LICENSE file for terms. */

var repl = require('repl'), // https://github.com/joyent/node/blob/master/lib/repl.js
    util = require('util'),
    vm = require('vm'),
    fs = require('fs'),
    async = require('async'),
    http = require('http'),
    libUrl = require('url'),
    serialport = require('serialport'),
    SerialPort = serialport.SerialPort,
    version = require('./package').version,
    espruinoStub = require('./data/stub'),
    resultMatch = /^=(.+)$/m,
    receiveCallback,
    receiveBuffer = '',
    boardInfo = {},
    connected = false,
    candidates = [],
    context,
    buffer = '',
    input,
    env = {},
    esp;

function readPorts(err, ports) {
    ports.forEach(eachPort);
    attempt();
}

function eachPort(port) {
    candidates.push(function candidate(cb) {
        analyze(port, cb);
    });
}

function attempt() {
    async.series(candidates, function done(err) {
        if (!connected) {
            var msg = candidates.length ? 'Espruino not found!' : 'No connected devices found!';
            console.log(msg + ' Make sure Espruino is plugged in.');
        }
    });
}

function analyze(port, cb) {
    if (!connected) {
        var dev = port.comName,
            id = port.pnpId;

        console.log('Analyzing ' + dev + ' (' + id + ')');
        if (id.match('Espruino') || id.match('STM32')) {
            console.log('Found compatible Espruino device! --^');
            console.log('Connecting...');
            connect(dev);
        } else {
            console.log('No Espruino found, continuing. --^');
        }
    }

    cb(null);
}

function connect(dev) {
    // connect to espruino
    esp = new SerialPort(dev, {});
    esp.on('open', init);
    esp.on('data', receive);
    esp.on('close', exit);
    connected = true;
}

function init() {
    // start repl ui
    input = repl.start({prompt: ">", useGlobal: true, useColors: true, ignoreUndefined: true, eval: evalLine});
    input.on('exit', exit);
    input.defineCommand('module', {
        help: 'Add a module for require.',
        action: loadModule
    });

    // replace context to get closer to espruino environment
    context = vm.createContext(espruinoStub);
    input.context = context;

    // set up queue interval
    setInterval(flush, 5);

    // get board info
    query('process.env', function (e, details) {
        if (!e) {
            env = details || {};
            loadBoardInfo(env.BOARD);
        }
    });
}

function exit(e) {
    console.log('Disconnecting...');
    process.exit();
}

function loadBoardInfo(board) {
    if (board) {
        try {
            boardInfo = require('./data/boards/' + board);
            // populate pins for autocomplete
            (boardInfo.pins || []).forEach(function eachPin(pin) {
                context[pin.name] = 1;
            });
        } catch(e) {
            receive('Unable to load board info for ' + board);
        }
    }
}

function query(code, cb) {
    receiveCallback = cb;
    send(code);
}

function send(code) {
    buffer += code + '\n';
}

function flush() {
    if (buffer.length) {
        var chunk = buffer.substr(0, 32);
        buffer = buffer.substr(32);
        esp.write(chunk);
    }
}

function receive(data) {
    data = data.toString();
    if (receiveCallback) {
        receiveBuffer += data;
        var match = data.match(/\r>$/m) ? resultMatch.exec(receiveBuffer) : null;
        if (match) {
            try {
                var result = JSON.parse(match[1]);
                receiveCallback(null, result);
            } catch (e) {
                // buffer isn't finished so continue
                if (isRecoverableError(e)) {
                    return;
                }
                receiveCallback(e);
            }
            receiveCallback = null;
            receiveBuffer = '';
        }
    } else {
        process.stdout.write(data);
    }
}

function evalLine(code, context, file, cb) {
    var err,
        result;

    // strip repl's wrapping bs
    code = code.replace(/^\(|\n\)$/g, '');

    // first, create the script object to check the syntax
    try {
        var script = vm.createScript(code, {
            filename: file,
            displayErrors: false
        });
    } catch (e) {
        // pass through unexpected end of input to handle multiline
        if (isRecoverableError(e)) {
           err = e;
        }
    }

    if (code) {
        if (!err) {
            try {
                // this retains a rough approximation of the board state
                result = script.runInContext(context, {displayErrors: false});
            } catch (e) {
            }

            // let autocomplete pass thru w/o write
            result = context[code];
            if (!result) {
                send(code);
            }
        }
    }

    cb(err, result);
}

function loadModule(args) {
    var self = this,
        args = args && args.length ? args.split(' ') : [],
        base = 'http://www.espruino.com/modules/{mod}.min.js',
        mod = args[0],
        url, path, msg, code, body = '',
        log = function (msg, prompt) {
            console.log(msg);
            if (prompt !== false) {
                input.displayPrompt();
            }
        },
        add = function (body) {
            if (body) {
                send('echo(0);');
                // hack to work around Espruino buffer errors (introduces escaped line breaks to allow queueing)
                body = JSON.stringify(body).replace(/;/g, ';\\\n')
                var code = 'Modules.addCached("' + mod + '", ' + body + '); echo(1)';
                send(code);
            }
        };

    switch (args.length) {
        case 0:
            msg = 'Expected a module name and optional URL / file path.';
        break;
        case 1:
            url = base.replace('{mod}', args[0]);
        break;
        case 2:
            if (args[1].substr(0, 5) === 'http:') {
                url = args[1];
            } else {
                path = args[1];
            }
        break;
        default:
            msg = 'Unexpected number of arguments.';
        break;
    }

    if (url) {
        log('Attempting to fetch module "' + mod + '" from ' + url + '...', false);
        var options = libUrl.parse(url);
        options.headers = {'User-Agent': 'Espruino CLI/' + version};
        http.get(options, function(res) {
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function (chunk) {
                if (res.statusCode === 200) {
                    log('Module fetched, sending to Espruino...', false);
                    add(body);
                } else {
                    log('Error fetching module "' + mod + '"!');
                }
            });
        }).on('error', function(e) {
            log('Error fetching module "' + mod + '"!');
        });
    } else if (path) {
        log('Attempting to load module "' + mod + '" from ' + path + '...', false);
        try {
            body = fs.readFileSync(path, {encoding: 'utf-8'});
            add(body);
        } catch (e) {
            log('Error loading module "' + mod + '"!');
        }
    }

    if (msg) {
        log(msg);
    }
}

function isRecoverableError(e) {
    return e && e.name === 'SyntaxError' && /^Unexpected end of input/.test(e.message);
}

console.log('Searching for Espruino compatible device...');
serialport.list(readPorts);

