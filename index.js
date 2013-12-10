/* Licensed under the MIT License. See the accompanying LICENSE file for terms. */

var readline = require('readline'),
    async = require('async'),
    serialport = require('serialport'),
    SerialPort = serialport.SerialPort,
    connected = false,
    candidates = [],
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

function close() {
    input.close();
    onLine('reset()');
    esp.close();
}

function autoComplete(line) {
    var completions = '.help .exit .quit .q'.split(' '),
        hits = completions.filter(function(c) { return c.indexOf(line) == 0 });
    return [hits.length ? hits : completions, line]
}

function onLine(line) {
    switch (line) {
        case '.help':
            process.stdout.write('Help text!\n');
        break;
        case '.q':
        case '.quit':
        case '.exit':
            close();
        break;
        default:
            esp.write(line + '\r');
        break;
    }
}

function onCtrlC() {
    process.stdout.write('(^C again to quit)');
    close();
}

function startUi() {
    // start readline ui
    input = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        completer: autoComplete
    });
    input.on('line', onLine);
    input.on('SIGINT', onCtrlC);
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
            startUi();
            connect(dev);
        } else {
            console.log('No Espruino found, continuing. --^');
        }
    }

    cb(null);
}

console.log('Searching for Espruino compatible device...');
serialport.list(readPorts);

