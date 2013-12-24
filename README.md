# Espruino CLI

Command Line Interface for Espruino

## Install
```
npm i -g espruino-cli
```
Use `sudo` if npm complains about permissions.

## Running

It should detect and connect to your device automatically if plugged in.

```
esp
```
Auto complete is supported via the tab key. More options are available via `.help`. To quit type `.exit`.

## Modules

In some cases you may need to require external modules. In order to do so you must first load the modules into memory using the `.module` command.

```
>.module wii_nunchuck
>var nunchuck = require("wii_nunchuck");
```

By default the module command will look for modules at (http://www.espruino.com/modules/)[espruino.com/modules/] but an arbitrary URL or file path may also be provided.

```
>.module foo http://espmods.com/mods/foo
>.module bar ./modules/bar.js
>var foo = require("foo");
>var bar = require("bar");
```

## License

MIT License. See the accompanying LICENSE file for terms.
