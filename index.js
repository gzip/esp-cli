/* Licensed under the MIT License. See the accompanying LICENSE file for terms. */

var repl = require('repl'), // https://github.com/joyent/node/blob/master/lib/repl.js
    util = require('util'),
    vm = require('vm'),
    async = require('async'),
    serialport = require('serialport'),
    SerialPort = serialport.SerialPort,
    espruinoStub = require('./data/stub'),
    resultMatch = /^=(.+)$/m,
    receiveCallback,
    receiveBuffer = '',
    boardInfo = {},
    connected = false,
    candidates = [],
    context,
    queue = [],
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
    connected = true;
}

function init() {
    // start readline ui
    input = repl.start({prompt: ">", useGlobal: true, useColors: true, ignoreUndefined: true, eval: evalLine});

    // replace context to get closer to espruino environment
    context = vm.createContext(espruinoStub);
    input.context = context;

    // set up queue interval
    setInterval(flush, 1);

    // get board info
    query('process.env', function (e, details) {
        if (!e) {
            env = details || {};
            loadBoardInfo(env.BOARD);
        }
    });
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
    var lines = code.split('\n');
    lines.forEach(function (line) {
      queue.push(line);
    });
}

function flush(code) {
    if (queue.length) {
      esp.write(queue.shift() + '\n');
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

function isRecoverableError(e) {
    return e && e.name === 'SyntaxError' && /^Unexpected end of input/.test(e.message);
}

console.log('Searching for Espruino compatible device...');
serialport.list(readPorts);

