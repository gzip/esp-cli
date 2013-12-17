/*
Script location /home/g/src/Espruino/scripts
Scanning for jswrap.c files
Scanning ./src/jswrap_functions.c
Scanning ./src/jswrap_string.c
Scanning ./src/jswrap_object.c
Scanning ./src/jswrap_io.c
Scanning ./src/jswrap_onewire.c
Scanning ./src/jswrap_serial.c
Scanning ./src/jswrap_arraybuffer.c
Scanning ./src/jswrap_array.c
Scanning ./src/jswrap_spi_i2c.c
Scanning ./src/jswrap_modules.c
Scanning ./src/jswrap_interactive.c
Scanning ./src/jswrap_process.c
Scanning ./src/jswrap_json.c
Scanning ./src/jswrap_pin.c
Scanning ./libs/trigger/jswrap_trigger.c
Scanning ./libs/jswrap_fat.c
Scanning ./libs/graphics/jswrap_graphics.c
Dropped because of #ifdef USE_LCD_SDL
Scanning ./libs/jswrap_math.c
Scanning ./libs/network/cc3000/jswrap_cc3000.c
Scanning ./libs/network/http/jswrap_http.c
Scanning ./targets/arduino/jswrapper.c
Scanning finished.
*/

/**
 * Read 32 bits of memory at the given location - DANGEROUS!
 */
if (!('peek32' in global))
global.peek32 = function (){};
module.exports.peek32 = peek32;

/**
 * This is the built-in JavaScript class for a typed array.
 * Instantiate this in order to efficiently store arrays of data (Espruino's normal arrays store data in a map, which is inefficient for non-sparse arrays). 
 */
if (!('Uint32Array' in global)) {
  global.Uint32Array = {};
}
module.exports.Uint32Array = Uint32Array;

/**
 * Return the current system time in Seconds (as a floating point number)
 */
if (!('getTime' in global))
global.getTime = function (){};
module.exports.getTime = getTime;

/**
 * Set the digital value of the given pin
 * If pin is an array of pins, eg. ```[A2,A1,A0]``` the value will be treated as an integer where the first array element is the MSB
 */
if (!('digitalWrite' in global))
global.digitalWrite = function (){};
module.exports.digitalWrite = digitalWrite;

/**
 * Get the analog value of the given pin
 * This is different to Arduino which only returns an integer between 0 and 1023
 * However only pins connected to an ADC will work (see the datasheet)
 */
if (!('analogRead' in global))
global.analogRead = function (){};
module.exports.analogRead = analogRead;

/**
 * This is a standard JavaScript class that contains useful Maths routines
 */
if (!('Math' in global)) {
  global.Math = {};
}
if (!('asin' in Math))
Math.asin = function (){};
if (!('cos' in Math))
Math.cos = function (){};
if (!('log' in Math))
Math.log = function (){};
if (!('atan' in Math))
Math.atan = function (){};
if (!('floor' in Math))
Math.floor = function (){};
if (!('pow' in Math))
Math.pow = function (){};
if (!('random' in Math))
Math.random = function (){};
/**
 * Clip a number to be between min and max (inclusive)
 */
if (!('clip' in Math))
Math.clip = function (){};
if (!('sqrt' in Math))
Math.sqrt = function (){};
if (!('sin' in Math))
Math.sin = function (){};
if (!('atan2' in Math))
Math.atan2 = function (){};
if (!('abs' in Math))
Math.abs = function (){};
if (!('exp' in Math))
Math.exp = function (){};
/**
 * Wrap a number around if it is less than 0 or greater than or equal to max. For instance you might do: ```Math.wrap(angleInDegrees, 360)```
 */
if (!('wrap' in Math))
Math.wrap = function (){};
if (!('acos' in Math))
Math.acos = function (){};
if (!('ceil' in Math))
Math.ceil = function (){};
if (!('round' in Math))
Math.round = function (){};
if (!('PI' in Math))
Math.PI = function (){};
if (!('E' in Math))
Math.E = function (){};
module.exports.Math = Math;

/**
 * Print the supplied string(s)
 */
if (!('console' in global)) {
  global.console = {};
}
/**
 * Print the supplied string(s)
 */
if (!('log' in console))
console.log = function (){};
module.exports.console = console;

/**
 * Write 32 bits of memory at the given location - VERY DANGEROUS!
 */
if (!('poke32' in global))
global.poke32 = function (){};
module.exports.poke32 = poke32;

/**
 * This is the built-in class for Objects
 */
if (!('Object' in global)) {
  global.Object = function (){};
  global.Object.prototype = {};
}
/**
 * Register an event listener for this object, for instance ```http.on('data', function(d) {...})```. See Node.js's EventEmitter.
 */
if (!('on' in Object.prototype))
Object.prototype.on = function (){};
/**
 * Copy this object completely
 */
if (!('clone' in Object.prototype))
Object.prototype.clone = function (){};
/**
 * Removes all listeners, or those of the specified event.
 */
if (!('removeAllListeners' in Object.prototype))
Object.prototype.removeAllListeners = function (){};
/**
 * Convert the Object to a string
 */
if (!('toString' in Object.prototype))
Object.prototype.toString = function (){};
/**
 * Call the event listeners for this object, for instance ```http.emit('data', 'Foo')```. See Node.js's EventEmitter.
 */
if (!('emit' in Object.prototype))
Object.prototype.emit = function (){};
/**
 * Find the length of the object
 */
if (!('length' in Object.prototype))
Object.prototype.length = {};
/**
 * Return all enumerable keys of the given object
 */
if (!('keys' in Object))
Object.keys = function (){};
module.exports.Object = Object;

/**
 * This class allows use of the built-in SPI ports. Currently it is SPI master only.
 */
if (!('SPI' in global)) {
  global.SPI = function (){};
  global.SPI.prototype = {};
}
/**
 * Set up this SPI port. Master, MSB first, no checksum
 */
if (!('setup' in SPI.prototype))
SPI.prototype.setup = function (){};
/**
 * Send data down SPI, using 4 bits for each 'real' bit (MSB first). This can be useful for faking one-wire style protocols
 * Sending multiple bytes in one call to send is preferable as they can then be transmitted end to end. Using multiple calls to send() will result in significantly slower transmission speeds.
 */
if (!('send4bit' in SPI.prototype))
SPI.prototype.send4bit = function (){};
/**
 * Send data down SPI, and return the result
 * Sending multiple bytes in one call to send is preferable as they can then be transmitted end to end. Using multiple calls to send() will result in significantly slower transmission speeds.
 */
if (!('send' in SPI.prototype))
SPI.prototype.send = function (){};
/**
 * Send data down SPI, using 8 bits for each 'real' bit (MSB first). This can be useful for faking one-wire style protocols
 * Sending multiple bytes in one call to send is preferable as they can then be transmitted end to end. Using multiple calls to send() will result in significantly slower transmission speeds.
 */
if (!('send8bit' in SPI.prototype))
SPI.prototype.send8bit = function (){};
module.exports.SPI = SPI;

/**
 * Clear the Watch that was created with setWatch. If no parameter is supplied, all watches will be removed.
 */
if (!('clearWatch' in global))
global.clearWatch = function (){};
module.exports.clearWatch = clearWatch;

/**
 * Save program memory into flash. It will then be loaded automatically every time Espruino powers on or is hard-reset.
 * This command only executes when the Interpreter returns to the Idle state - for instance ```a=1;save();a=2;``` will save 'a' as 2.
 * In order to stop the program saved with this command being loaded automatically, hold down Button 1 while also pressing reset. On some boards, Button 1 enters bootloader mode, so you will need to press Reset with Button 1 raised, and then hold Button 1 down a fraction of a second later.
 */
if (!('save' in global))
global.save = function (){};
module.exports.save = save;

/**
 * Get the digital value of the given pin
 * If pin is an array of pins, eg. ```[A2,A1,A0]``` the value will be treated as an integer where the first array element is the MSB
 */
if (!('digitalRead' in global))
global.digitalRead = function (){};
module.exports.digitalRead = digitalRead;

/**
 * Convert a string representing a number into an float
 */
if (!('parseFloat' in global))
global.parseFloat = function (){};
module.exports.parseFloat = parseFloat;

/**
 * This is the built-in class for Pins, such as D0,D1,LED1, or BTN
 * You can call the methods on Pin, or you can use Wiring-style functions such as digitalWrite
 */
if (!('Pin' in global)) {
  global.Pin = function (){};
  global.Pin.prototype = {};
}
/**
 * Returns the input state of the pin as a boolean
 */
if (!('read' in Pin.prototype))
Pin.prototype.read = function (){};
/**
 * Sets the output state of the pin to a 0
 */
if (!('reset' in Pin.prototype))
Pin.prototype.reset = function (){};
/**
 * Sets the output state of the pin to the parameter given
 */
if (!('write' in Pin.prototype))
Pin.prototype.write = function (){};
/**
 * Sets the output state of the pin to a 1
 */
if (!('set' in Pin.prototype))
Pin.prototype.set = function (){};
/**
 * Sets the output state of the pin to the parameter given at the specified time
 */
if (!('writeAtTime' in Pin.prototype))
Pin.prototype.writeAtTime = function (){};
module.exports.Pin = Pin;

/**
 * Set whether we can enter deep sleep mode, which reduces power consumption to around 1mA. This only works on the Espruino Board.
 * Deep Sleep is currently beta. Espruino will only enter Deep Sleep when there are no timers and it is not connected to USB. USB will not wake Espruino from Deep Sleep, nor will Serial comms (only setWatch will wake it). The System Timer will also pause.
 */
if (!('setDeepSleep' in global))
global.setDeepSleep = function (){};
module.exports.setDeepSleep = setDeepSleep;

/**
 * Fill the console with the contents of the given function, so you can edit it.
 * NOTE: This is a convenience function - it will not edit 'inner functions'. For that, you must edit the 'outer function' and re-execute it.
 */
if (!('edit' in global))
global.edit = function (){};
module.exports.edit = edit;

/**
 * Set the mode of the given pin - note that digitalRead/digitalWrite/etc set this automatically unless pinMode has been called first. If you want digitalRead/etc to set the pin mode automatically after you have called pinMode, simply call it again with no mode argument: ```pinMode(pin)```
 */
if (!('pinMode' in global))
global.pinMode = function (){};
module.exports.pinMode = pinMode;

/**
 * An instantiation of a WiFi network adaptor
 */
if (!('WLAN' in global)) {
  global.WLAN = function (){};
  global.WLAN.prototype = {};
}
/**
 * Get the current IP address
 */
if (!('getIP' in WLAN.prototype))
WLAN.prototype.getIP = function (){};
/**
 * Connect to a wireless network
 */
if (!('connect' in WLAN.prototype))
WLAN.prototype.connect = function (){};
module.exports.WLAN = WLAN;

/**
 * Output current interpreter state in a text form such that it can be copied to a new device
 * Note: 'Internal' functions are currently not handled correctly. You will need to recreate these in the onInit function.
 */
if (!('dump' in global))
global.dump = function (){};
module.exports.dump = dump;

/**
 * Initialise the CC3000 and return a WLAN object
 */
if (!('CC3000' in global)) {
  global.CC3000 = {};
}
/**
 * Initialise the CC3000 and return a WLAN object
 */
if (!('connect' in CC3000))
CC3000.connect = function (){};
module.exports.CC3000 = CC3000;

/**
 * Read 16 bits of memory at the given location - DANGEROUS!
 */
if (!('peek16' in global))
global.peek16 = function (){};
module.exports.peek16 = peek16;

/**
 * Clear the Interval that was created with setInterval, for example:
 * ```var id = setInterval(function () { print('foo'); }, 1000);```
 * ```clearInterval(id);```
 * If no argument is supplied, all timers and intervals are stopped
 */
if (!('clearInterval' in global))
global.clearInterval = function (){};
module.exports.clearInterval = clearInterval;

/**
 * Change the Interval on a callback created with setInterval, for example:
 * ```var id = setInterval(function () { print('foo'); }, 1000); // every second```
 * ```changeInterval(id, 1500); // now runs every 1.5 seconds```
 * This takes effect the text time the callback is called (so it is not immediate).
 */
if (!('changeInterval' in global))
global.changeInterval = function (){};
module.exports.changeInterval = changeInterval;

/**
 * This is the built-in class for Text Strings.
 * Text Strings in Espruino are not zero-terminated, so you can store zeros in them.
 */
if (!('String' in global)) {
/**
 * Create a new String
 */
  global.String = function (){};
  global.String.prototype = {};
}
/**
 * Return a single character at the given position in the String.
 */
if (!('charAt' in String.prototype))
String.prototype.charAt = function (){};
/**
 * Return the index of substring in this string, or -1 if not found
 */
if (!('indexOf' in String.prototype))
String.prototype.indexOf = function (){};
if (!('substring' in String.prototype))
String.prototype.substring = function (){};
if (!('substr' in String.prototype))
String.prototype.substr = function (){};
/**
 * Return an array made by splitting this string up by the separator. eg. ```'1,2,3'.split(',')==[1,2,3]```
 */
if (!('split' in String.prototype))
String.prototype.split = function (){};
/**
 * Return the integer value of a single character at the given position in the String.
 * Note that this returns 0 not 'NaN' for out of bounds characters
 */
if (!('charCodeAt' in String.prototype))
String.prototype.charCodeAt = function (){};
/**
 * Return the character represented by the given character code.
 */
if (!('fromCharCode' in String))
String.fromCharCode = function (){};
module.exports.String = String;

/**
 * This is the built-in JavaScript class for a typed array.
 * Instantiate this in order to efficiently store arrays of data (Espruino's normal arrays store data in a map, which is inefficient for non-sparse arrays). 
 */
if (!('Float64Array' in global)) {
  global.Float64Array = {};
}
module.exports.Float64Array = Float64Array;

/**
 * Print the supplied string
 */
if (!('print' in global))
global.print = function (){};
module.exports.print = print;

/**
 * When Espruino is asleep, set the pin specified here high. Set this to undefined to disable the feature.
 */
if (!('setSleepIndicator' in global))
global.setSleepIndicator = function (){};
module.exports.setSleepIndicator = setSleepIndicator;

/**
 * This is the built-in JavaScript class for a typed array.
 * Instantiate this in order to efficiently store arrays of data (Espruino's normal arrays store data in a map, which is inefficient for non-sparse arrays). 
 */
if (!('Float32Array' in global)) {
  global.Float32Array = {};
}
module.exports.Float32Array = Float32Array;

/**
 * Call the function specified when the pin changes
 * The function may also take an argument, which is an object containing a field called 'time', which is the time in seconds at which the pin changed state, and 'state', which is the current state of the pin
 *  This can also be removed using clearWatch
 */
if (!('setWatch' in global))
global.setWatch = function (){};
module.exports.setWatch = setWatch;

/**
 * When Espruino is busy, set the pin specified here high. Set this to undefined to disable the feature.
 */
if (!('setBusyIndicator' in global))
global.setBusyIndicator = function (){};
module.exports.setBusyIndicator = setBusyIndicator;

/**
 * Call the function specified ONCE after the timeout in milliseconds.
 * The function that is being called may also take an argument, which is an object containing a field called 'time' (the time in seconds at which the timer happened)
 * for example: ```setTimeout(function (e) { print(e.time); }, 1000);```
 * This can also be removed using clearTimeout
 */
if (!('setTimeout' in global))
global.setTimeout = function (){};
module.exports.setTimeout = setTimeout;

/**
 * This is the built-in JavaScript class for array buffers.
 */
if (!('ArrayBuffer' in global)) {
  global.ArrayBuffer = {};
}
module.exports.ArrayBuffer = ArrayBuffer;

/**
 * This class allows use of the built-in USARTs
 * Methods may be called on the USB, Serial1, Serial2, Serial3, Serial4, Serial5 and Serial6 objects. While different processors provide different numbers of USARTs, you can always rely on at least Serial1 and Serial2
 */
if (!('Serial' in global)) {
  global.Serial = function (){};
  global.Serial.prototype = {};
}
/**
 * Set this Serial port as the port for the console
 */
if (!('setConsole' in Serial.prototype))
Serial.prototype.setConsole = function (){};
/**
 * Setup this Serial port with the given baud rate and options
 */
if (!('setup' in Serial.prototype))
Serial.prototype.setup = function (){};
/**
 * Write a character or array of characters to the serial port - without a line feed
 */
if (!('write' in Serial.prototype))
Serial.prototype.write = function (){};
/**
 * Print a line to the serial port (newline character sent are '
')
 */
if (!('println' in Serial.prototype))
Serial.prototype.println = function (){};
/**
 * When a character is received on this serial port, the function supplied to onData gets called.
 * Only one function can ever be supplied, so calling onData(undefined) will stop any function being called
 */
if (!('onData' in Serial.prototype))
Serial.prototype.onData = function (){};
/**
 * Print a string to the serial port - without a line feed
 */
if (!('print' in Serial.prototype))
Serial.prototype.print = function (){};
module.exports.Serial = Serial;

/**
 * Load program memory out of flash
 * This command only executes when the Interpreter returns to the Idle state - for instance ```a=1;load();a=2;``` will still leave 'a' as undefined (or what it was set to in the saved program).
 */
if (!('load' in global))
global.load = function (){};
module.exports.load = load;

/**
 * This is the built-in JavaScript class for a typed array.
 * Instantiate this in order to efficiently store arrays of data (Espruino's normal arrays store data in a map, which is inefficient for non-sparse arrays). 
 */
if (!('Int32Array' in global)) {
  global.Int32Array = {};
}
module.exports.Int32Array = Int32Array;

/**
 * Should TinyJS echo what you type back to you? true = yes (Default), false = no. When echo is off, the result of executing a command is not returned. Instead, you must use 'print' to send output.
 */
if (!('echo' in global))
global.echo = function (){};
module.exports.echo = echo;

/**
 * The HTTP server created by http.createServer
 */
if (!('httpSrv' in global)) {
  global.httpSrv = function (){};
  global.httpSrv.prototype = {};
}
if (!('listen' in httpSrv.prototype))
httpSrv.prototype.listen = function (){};
module.exports.httpSrv = httpSrv;

/**
 * Convert a string representing a number into an integer
 */
if (!('parseInt' in global))
global.parseInt = function (){};
module.exports.parseInt = parseInt;

/**
 * This is the built-in JavaScript class for a typed array.
 * Instantiate this in order to efficiently store arrays of data (Espruino's normal arrays store data in a map, which is inefficient for non-sparse arrays). 
 */
if (!('Int8Array' in global)) {
  global.Int8Array = {};
}
module.exports.Int8Array = Int8Array;

/**
 * This class provides a software-defined OneWire master. It is designed to be similar to Arduino's OneWire library.
 */
if (!('OneWire' in global)) {
/**
 * Create a software OneWire implementation on the given pin
 */
  global.OneWire = function (){};
  global.OneWire.prototype = {};
}
/**
 * Perform a reset cycle
 */
if (!('reset' in OneWire.prototype))
OneWire.prototype.reset = function (){};
/**
 * Search for devices
 */
if (!('search' in OneWire.prototype))
OneWire.prototype.search = function (){};
/**
 * Read a byte
 */
if (!('read' in OneWire.prototype))
OneWire.prototype.read = function (){};
/**
 * Skip a ROM
 */
if (!('skip' in OneWire.prototype))
OneWire.prototype.skip = function (){};
/**
 * Write a byte
 */
if (!('write' in OneWire.prototype))
OneWire.prototype.write = function (){};
/**
 * Select a ROM - reset needs to be done first
 */
if (!('select' in OneWire.prototype))
OneWire.prototype.select = function (){};
module.exports.OneWire = OneWire;

/**
 * Clear the Timeout that was created with setTimeout, for example:
 * ```var id = setTimeout(function () { print('foo'); }, 1000);```
 * ```clearTimeout(id);```
 * If no argument is supplied, all timers and intervals are stopped
 */
if (!('clearTimeout' in global))
global.clearTimeout = function (){};
module.exports.clearTimeout = clearTimeout;

/**
 * This is the built-in JavaScript class for a typed array.
 * Instantiate this in order to efficiently store arrays of data (Espruino's normal arrays store data in a map, which is inefficient for non-sparse arrays). 
 */
if (!('Uint8Array' in global)) {
  global.Uint8Array = {};
}
module.exports.Uint8Array = Uint8Array;

/**
 * This class contains information about Espruino itself
 */
if (!('process' in global)) {
  global.process = {};
}
/**
 * Returns the version of Espruino as a String
 */
if (!('version' in process))
process.version = function (){};
/**
 * Returns an Object containing various pre-defined variables. standard ones are BOARD, VERSION
 */
if (!('env' in process))
process.env = function (){};
module.exports.process = process;

/**
 * Convert the given object into a JSON string which can subsequently be parsed with JSON.parse or eval
 */
if (!('JSON' in global)) {
  global.JSON = {};
}
/**
 * Parse the given JSON string into a JavaScript object
 */
if (!('parse' in JSON))
JSON.parse = function (){};
/**
 * Convert the given object into a JSON string which can subsequently be parsed with JSON.parse or eval
 */
if (!('stringify' in JSON))
JSON.stringify = function (){};
module.exports.JSON = JSON;

/**
 * Run a Garbage Collection pass, and return an object containing information on memory usage.
 * free : Memory that is available to be used
 * usage : Memory that has been used
 * total : Total memory
 * history : Memory used for command history - that is freed if memory is low. Note that this is INCLUDED in the figure for 'free'.
 * On ARM, stackEndAddress is the address (that can be used with peek/poke/etc) of the END of the stack. The stack grows down, so unless you do a lot of recursion, the bytes above this can be used.
 */
if (!('memory' in global))
global.memory = function (){};
module.exports.memory = memory;

/**
 * This is the built-in class for Integer values
 */
if (!('Integer' in global)) {
  global.Integer = {};
}
/**
 * Convert a string representing a number into a number
 */
if (!('parseInt' in Integer))
Integer.parseInt = function (){};
/**
 * Given a string containing a single character, return the numeric value of it
 */
if (!('valueOf' in Integer))
Integer.valueOf = function (){};
module.exports.Integer = Integer;

/**
 * Call the function specified REPEATEDLY after the timeout in milliseconds.
 * The function that is being called may also take an argument, which is an object containing a field called 'time' (the time in seconds at which the timer happened)
 * for example: ```setInterval(function (e) { print(e.time); }, 1000);```
 * This can also be removed using clearInterval
 */
if (!('setInterval' in global))
global.setInterval = function (){};
module.exports.setInterval = setInterval;

/**
 * This class provides Graphics operations that can be applied to a surface.
 * Use Graphics.createXXX to create a graphics object that renders in the way you want.
 * NOTE: On boards that contain an LCD, there is a built-in 'LCD' object of type Graphics. For instance to draw a line you'd type: ```LCD.drawLine(0,0,100,100)```
 */
if (!('Graphics' in global)) {
  global.Graphics = function (){};
  global.Graphics.prototype = {};
}
/**
 * Set a pixel's color
 */
if (!('setPixel' in Graphics.prototype))
Graphics.prototype.setPixel = function (){};
/**
 * Move the cursor to a position - see lineTo
 */
if (!('moveTo' in Graphics.prototype))
Graphics.prototype.moveTo = function (){};
/**
 * Draw a string of text in the current font
 */
if (!('drawString' in Graphics.prototype))
Graphics.prototype.drawString = function (){};
/**
 * Draw a line from the last position of lineTo or moveTo to this position
 */
if (!('lineTo' in Graphics.prototype))
Graphics.prototype.lineTo = function (){};
/**
 * Set the color to use for subsequent drawing operations
 */
if (!('setColor' in Graphics.prototype))
Graphics.prototype.setColor = function (){};
/**
 * Set Graphics to draw with a Bitmapped Font
 */
if (!('setFontBitmap' in Graphics.prototype))
Graphics.prototype.setFontBitmap = function (){};
/**
 * Draw a line between x1,y1 and x2,y2 in the current foreground color
 */
if (!('drawLine' in Graphics.prototype))
Graphics.prototype.drawLine = function (){};
/**
 * Fill a rectangular area in the Foreground Color
 */
if (!('fillRect' in Graphics.prototype))
Graphics.prototype.fillRect = function (){};
/**
 * Clear the LCD with the Background Color
 */
if (!('clear' in Graphics.prototype))
Graphics.prototype.clear = function (){};
/**
 * The height of the LCD
 */
if (!('getHeight' in Graphics.prototype))
Graphics.prototype.getHeight = function (){};
/**
 * The width of the LCD
 */
if (!('getWidth' in Graphics.prototype))
Graphics.prototype.getWidth = function (){};
/**
 * Set Graphics to draw with a Vector Font of the given size
 */
if (!('setFontVector' in Graphics.prototype))
Graphics.prototype.setFontVector = function (){};
/**
 * Draw a filled polygon in the current foreground color
 */
if (!('fillPoly' in Graphics.prototype))
Graphics.prototype.fillPoly = function (){};
/**
 * Draw an unfilled rectangle 1px wide in the Foreground Color
 */
if (!('drawRect' in Graphics.prototype))
Graphics.prototype.drawRect = function (){};
/**
 * Set the background color to use for subsequent drawing operations
 */
if (!('setBgColor' in Graphics.prototype))
Graphics.prototype.setBgColor = function (){};
/**
 * Get a pixel's color
 */
if (!('getPixel' in Graphics.prototype))
Graphics.prototype.getPixel = function (){};
/**
 * Return the size in pixels of a string of text in the current font
 */
if (!('stringWidth' in Graphics.prototype))
Graphics.prototype.stringWidth = function (){};
/**
 * Create a Graphics object that renders by calling a JavaScript callback function
 */
if (!('createCallback' in Graphics))
Graphics.createCallback = function (){};
/**
 * Create a Graphics object that renders to an Array Buffer. This will have a field called 'buffer' that can get used to get at the buffer itself
 */
if (!('createArrayBuffer' in Graphics))
Graphics.createArrayBuffer = function (){};
module.exports.Graphics = Graphics;

/**
 * Reset the interpreter - clear program memory, and do not load a saved program from flash. This does NOT reset the underlying hardware (which allows you to reset the device without it disconnecting from USB).
 * This command only executes when the Interpreter returns to the Idle state - for instance ```a=1;reset();a=2;``` will still leave 'a' as undefined.
 * The safest way to do a full reset is to hit the reset button.
 */
if (!('reset' in global))
global.reset = function (){};
module.exports.reset = reset;

/**
 * Load the given module, and return the exported functions
 */
if (!('require' in global))
global.require = function (){};
module.exports.require = require;

/**
 * This is the built-in JavaScript class for a typed array.
 * Instantiate this in order to efficiently store arrays of data (Espruino's normal arrays store data in a map, which is inefficient for non-sparse arrays). 
 */
if (!('Uint16Array' in global)) {
  global.Uint16Array = {};
}
module.exports.Uint16Array = Uint16Array;

/**
 * This class allows use of the built-in I2C ports. Currently it allows I2C Master mode only.
 * All addresses are in 7 bit format. If you have an 8 bit address then you need to shift it one bit to the right.
 */
if (!('I2C' in global)) {
  global.I2C = function (){};
  global.I2C.prototype = {};
}
/**
 * Transmit to the slave device with the given address. This is like Arduino's beginTransmission, write, and endTransmission rolled up into one.
 */
if (!('writeTo' in I2C.prototype))
I2C.prototype.writeTo = function (){};
/**
 * Set up this I2C port
 */
if (!('setup' in I2C.prototype))
I2C.prototype.setup = function (){};
/**
 * Request bytes from the given slave device, and return them as an array. This is like using Arduino Wire's requestFrom, available and read functions.  Sends a STOP
 */
if (!('readFrom' in I2C.prototype))
I2C.prototype.readFrom = function (){};
module.exports.I2C = I2C;

/**
 * Write 8 bits of memory at the given location - VERY DANGEROUS!
 */
if (!('poke8' in global))
global.poke8 = function (){};
module.exports.poke8 = poke8;

/**
 * Pulse the pin with the value for the given time in milliseconds
 * eg. ```pulse(A0,1,5);``` pulses A0 high for 5ms
 * digitalPulse is for SHORT pulses that need to be very accurate. If you're doing anything over a few milliseconds, use setTimeout instead
 */
if (!('digitalPulse' in global))
global.digitalPulse = function (){};
module.exports.digitalPulse = digitalPulse;

/**
 * Output debugging information
 */
if (!('trace' in global))
global.trace = function (){};
module.exports.trace = trace;

/**
 * Get the serial number of this board
 */
if (!('getSerial' in global))
global.getSerial = function (){};
module.exports.getSerial = getSerial;

/**
 * This is the built-in class for Functions
 */
if (!('Function' in global)) {
  global.Function = function (){};
  global.Function.prototype = {};
}
/**
 * This executes the function with the supplied 'this' argument and parameters
 */
if (!('apply' in Function.prototype))
Function.prototype.apply = function (){};
/**
 * This replaces the function with the one in the argument - while keeping the old function's scope. This allows inner functions to be edited, and is used when edit() is called on an inner function.
 */
if (!('replaceWith' in Function.prototype))
Function.prototype.replaceWith = function (){};
/**
 * This executes the function with the supplied 'this' argument and parameters
 */
if (!('call' in Function.prototype))
Function.prototype.call = function (){};
module.exports.Function = Function;

/**
 * Read 8 bits of memory at the given location - DANGEROUS!
 */
if (!('peek8' in global))
global.peek8 = function (){};
module.exports.peek8 = peek8;

/**
 * The HTTP server response
 */
if (!('httpSRs' in global)) {
  global.httpSRs = function (){};
  global.httpSRs.prototype = {};
}
if (!('write' in httpSRs.prototype))
httpSRs.prototype.write = function (){};
if (!('end' in httpSRs.prototype))
httpSRs.prototype.end = function (){};
if (!('writeHead' in httpSRs.prototype))
httpSRs.prototype.writeHead = function (){};
module.exports.httpSRs = httpSRs;

/**
 * The HTTP server request
 */
if (!('httpSRq' in global)) {
  global.httpSRq = {};
}
module.exports.httpSRq = httpSRq;

/**
 * Write 16 bits of memory at the given location - VERY DANGEROUS!
 */
if (!('poke16' in global))
global.poke16 = function (){};
module.exports.poke16 = poke16;

/**
 * List all files in the supplied directory, returning them as an array of strings.
 * NOTE: Espruino does not yet support Async file IO, so this function behaves like the 'Sync' version.
 */
if (!('fs' in global)) {
  global.fs = {};
}
/**
 * Append the data to the given file, created a new file if it doesn't exist
 * NOTE: Espruino does not yet support Async file IO, so this function behaves like the 'Sync' version.
 */
if (!('appendFile' in fs))
fs.appendFile = function (){};
/**
 * List all files in the supplied directory, returning them as an array of strings.
 * NOTE: Espruino does not yet support Async file IO, so this function behaves like the 'Sync' version.
 */
if (!('readdir' in fs))
fs.readdir = function (){};
/**
 * List all files in the supplied directory, returning them as an array of strings.
 */
if (!('readdirSync' in fs))
fs.readdirSync = function (){};
/**
 * Append the data to the given file, created a new file if it doesn't exist
 */
if (!('appendFileSync' in fs))
fs.appendFileSync = function (){};
/**
 * Write the data to the given file
 * NOTE: Espruino does not yet support Async file IO, so this function behaves like the 'Sync' version.
 */
if (!('writeFile' in fs))
fs.writeFile = function (){};
/**
 * Read all data from a file and return as a string
 * NOTE: Espruino does not yet support Async file IO, so this function behaves like the 'Sync' version.
 */
if (!('readFile' in fs))
fs.readFile = function (){};
/**
 * Write the data to the given file
 */
if (!('writeFileSync' in fs))
fs.writeFileSync = function (){};
/**
 * Read all data from a file and return as a string
 */
if (!('readFileSync' in fs))
fs.readFileSync = function (){};
module.exports.fs = fs;

/**
 * Create an HTTP Server
 */
if (!('http' in global)) {
  global.http = {};
}
/**
 * Create an HTTP Server
 */
if (!('createServer' in http))
http.createServer = function (){};
/**
 * Create an HTTP Request - end() must be called on it to complete the operation
 */
if (!('request' in http))
http.request = function (){};
/**
 * Create an HTTP Request - convenience function for ```http.request()```. options.method is set to 'get', and end is called automatically
 */
if (!('get' in http))
http.get = function (){};
module.exports.http = http;

/**
 * This is the built-in class for Floating Point values
 */
if (!('Double' in global)) {
  global.Double = {};
}
/**
 *  Convert the floating point value given into an integer representing the bits contained in it
 */
if (!('doubleToIntBits' in Double))
Double.doubleToIntBits = function (){};
module.exports.Double = Double;

/**
 * Return an array of module names that have been cached
 */
if (!('Modules' in global)) {
  global.Modules = {};
}
/**
 * Remove the given module from the list of cached modules
 */
if (!('removeCached' in Modules))
Modules.removeCached = function (){};
/**
 * Return an array of module names that have been cached
 */
if (!('getCached' in Modules))
Modules.getCached = function (){};
/**
 * Remove all cached modules
 */
if (!('removeAllCached' in Modules))
Modules.removeAllCached = function (){};
/**
 * Add the given module to the cache
 */
if (!('addCached' in Modules))
Modules.addCached = function (){};
module.exports.Modules = Modules;

/**
 * Evaluate a string containing JavaScript code
 */
if (!('eval' in global))
global.eval = function (){};
module.exports.eval = eval;

/**
 * This is the built-in JavaScript class for a typed array.
 * Instantiate this in order to efficiently store arrays of data (Espruino's normal arrays store data in a map, which is inefficient for non-sparse arrays). 
 */
if (!('Int16Array' in global)) {
  global.Int16Array = {};
}
module.exports.Int16Array = Int16Array;

/**
 * Set the analog Value of a pin. It will be output using PWM
 */
if (!('analogWrite' in global))
global.analogWrite = function (){};
module.exports.analogWrite = analogWrite;

/**
 * The HTTP client request
 */
if (!('httpCRq' in global)) {
  global.httpCRq = function (){};
  global.httpCRq.prototype = {};
}
if (!('write' in httpCRq.prototype))
httpCRq.prototype.write = function (){};
/**
 * Finish this HTTP request - optional data to append as an argument
 */
if (!('end' in httpCRq.prototype))
httpCRq.prototype.end = function (){};
module.exports.httpCRq = httpCRq;

/**
 * This class helps to convert URLs into Objects of information ready for http.request/get
 */
if (!('url' in global)) {
  global.url = {};
}
if (!('parse' in url))
url.parse = function (){};
module.exports.url = url;

/**
 * This class exists in order to interface Espruino with fast-moving trigger wheels. Trigger wheels are physical discs with evenly spaced teeth cut into them, and often with one or two teeth next to each other missing. A sensor sends a signal whenever a tooth passed by, and this allows a device to measure not only RPM, but absolute position.
 * This class is currently in testing - it is NOT AVAILABLE on normal boards.
 */
if (!('Trig' in global)) {
  global.Trig = {};
}
/**
 * Initialise the trigger class
 */
if (!('setup' in Trig))
Trig.setup = function (){};
/**
 * Disable a trigger
 */
if (!('killTrigger' in Trig))
Trig.killTrigger = function (){};
/**
 * Get the current error flags from the trigger wheel - and zero them
 */
if (!('getErrors' in Trig))
Trig.getErrors = function (){};
/**
 * Get the position of the trigger wheel at the given time (from getTime)
 */
if (!('getPosAtTime' in Trig))
Trig.getPosAtTime = function (){};
/**
 * Get the current error flags from the trigger wheel - and zero them
 */
if (!('getErrorArray' in Trig))
Trig.getErrorArray = function (){};
/**
 * Get the RPM of the trigger wheel
 */
if (!('getRPM' in Trig))
Trig.getRPM = function (){};
/**
 * Get the current state of a trigger
 */
if (!('getTrigger' in Trig))
Trig.getTrigger = function (){};
/**
 * Set a trigger for a certain point in the cycle
 */
if (!('setTrigger' in Trig))
Trig.setTrigger = function (){};
module.exports.Trig = Trig;

/**
 * This is the built-in JavaScript class that is the prototype for Uint8Array / Float32Array / etc
 */
if (!('ArrayBufferView' in global)) {
  global.ArrayBufferView = function (){};
  global.ArrayBufferView.prototype = {};
}
/**
 * Interpolate between two adjacent values in the Typed Array
 */
if (!('interpolate2d' in ArrayBufferView.prototype))
ArrayBufferView.prototype.interpolate2d = function (){};
/**
 * Interpolate between two adjacent values in the Typed Array
 */
if (!('interpolate' in ArrayBufferView.prototype))
ArrayBufferView.prototype.interpolate = function (){};
/**
 * The buffer this view references
 */
if (!('buffer' in ArrayBufferView.prototype))
ArrayBufferView.prototype.buffer = {};
/**
 * The length, in bytes, of the view
 */
if (!('byteLength' in ArrayBufferView.prototype))
ArrayBufferView.prototype.byteLength = {};
/**
 * The offset, in bytes, to the first byte of the view within the ArrayBuffer
 */
if (!('byteOffset' in ArrayBufferView.prototype))
ArrayBufferView.prototype.byteOffset = {};
module.exports.ArrayBufferView = ArrayBufferView;

/**
 * This is the built-in class for the Espruino device. It is the 'root scope', as 'Window' is for JavaScript on the desktop.
 */
if (!('Hardware' in global)) {
  global.Hardware = {};
}
module.exports.Hardware = Hardware;

/**
 * This is the built-in JavaScript class for arrays.
 * Arrays can be defined with ```[]```, ```new Array()```, or ```new Array(length)```
 */
if (!('Array' in global)) {
/**
 * Create an Array. Either give it one integer argument (>=0) which is the length of the array, or any number of arguments 
 */
  global.Array = function (){};
  global.Array.prototype = {};
}
/**
 * Return an array which is made from the following: ```A.map(function) = [function(A[0]), function(A[1]), ...]```
 */
if (!('map' in Array.prototype))
Array.prototype.map = function (){};
/**
 * Join all elements of this array together into one string, using 'separator' between them. eg. ```[1,2,3].join(' ')=='1 2 3'```
 */
if (!('join' in Array.prototype))
Array.prototype.join = function (){};
/**
 * Return the index of the value in the array, or -1
 */
if (!('indexOf' in Array.prototype))
Array.prototype.indexOf = function (){};
/**
 * Return true if this array contains the given value
 */
if (!('contains' in Array.prototype))
Array.prototype.contains = function (){};
/**
 * Pop a new value off of the end of this array
 */
if (!('pop' in Array.prototype))
Array.prototype.pop = function (){};
/**
 * Executes a provided function once per array element.
 */
if (!('forEach' in Array.prototype))
Array.prototype.forEach = function (){};
/**
 * Both remove and add items to an array
 */
if (!('splice' in Array.prototype))
Array.prototype.splice = function (){};
/**
 * Push a new value onto the end of this array'
 */
if (!('push' in Array.prototype))
Array.prototype.push = function (){};
module.exports.Array = Array;

SPI2 = new SPI();
module.exports.SPI2 = SPI2;

SPI3 = new SPI();
module.exports.SPI3 = SPI3;

Serial1 = new Serial();
module.exports.Serial1 = Serial1;

SPI1 = new SPI();
module.exports.SPI1 = SPI1;

USB = new Serial();
module.exports.USB = USB;

Serial5 = new Serial();
module.exports.Serial5 = Serial5;

Serial2 = new Serial();
module.exports.Serial2 = Serial2;

Serial6 = new Serial();
module.exports.Serial6 = Serial6;

Serial4 = new Serial();
module.exports.Serial4 = Serial4;

Serial3 = new Serial();
module.exports.Serial3 = Serial3;

I2C1 = new I2C();
module.exports.I2C1 = I2C1;

I2C2 = new I2C();
module.exports.I2C2 = I2C2;

I2C3 = new I2C();
module.exports.I2C3 = I2C3;
