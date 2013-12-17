/* Licensed under the MIT License. See the accompanying LICENSE file for terms. */

var repl = require('repl'), // https://github.com/joyent/node/blob/master/lib/repl.js
    util = require('util'),
    vm = require('vm'),
    async = require('async'),
    serialport = require('serialport'),
    SerialPort = serialport.SerialPort,
    espruinoStub = require('./data/stub'),
    connected = false,
    candidates = [],
    context,
    input,
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
            console.log(msg + 'Make sure Espruino is plugged in.');
        }
    });
}

function write(code, context, file, cb) {
    var err,
        result;

    // strip repl's wrapping bs
    code = code.replace(/^\(|\n\)$/g, '');

    // first, create the Script object to check the syntax
    try {
        var script = vm.createScript(code, {
            filename: file,
            displayErrors: false
        });
    } catch (e) {
        // pass through unexpected end of input to handle multiline
        if (e.name === 'SyntaxError' && /^Unexpected end of input/.test(e.message)) {
           err = e;
        }
    }

    if (code) {
        if (!err) {
            try {
                result = script.runInContext(context, {displayErrors: false});
            } catch (e) {
            }

            // let autocomplete pass thru
            result = context[code];
            if (!result) {
                esp.write(code + '\n');
            }
        }
    }

    cb(err, result);
}

function startUi() {
    // start readline ui
    input = repl.start({prompt: ">", useGlobal: true, useColors: true, ignoreUndefined: true, eval: write});

    // replace context to get closer to espruino environment
    input.context = vm.createContext(espruinoStub);
}

function onData(data) {
    process.stdout.write(data.toString());
}

function connect(dev) {
    // connect to espruino
    esp = new SerialPort(dev, {});
    esp.on('data', onData);
    connected = true;
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
            startUi();
        } else {
            console.log('No Espruino found, continuing. --^');
        }
    }

    cb(null);
}

console.log('Searching for Espruino compatible device...');
serialport.list(readPorts);

