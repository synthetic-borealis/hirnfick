# Hirnfick
[![npm version](https://badge.fury.io/js/hirnfick.svg)](https://badge.fury.io/js/hirnfick)
[![GitHub license](https://img.shields.io/github/license/synthetic-borealis/hirnfick.js)](https://github.com/synthetic-borealis/hirnfick.js/blob/main/LICENSE)

A [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck) transpilation library.

## Supported Output Languages
- JavaScript (no support for reading keyboard input).
- Python (no support for reading keyboard input).

## Installation
Run `npm i hirnfick`

## Usage

- Use ```isValidProgram``` to validate your Brainfuck program and then ```transpileToJS``` to convert it to JavaScript.
- Generated JavaScript functions return an object containing two members:
  1. ```output``` - The output of the program.
  2. ```cells``` - The array of cells that were used by the program.

## Examples

### Node.js/CommonJS
```javascript
const hirnfick = require('hirnfick');

const helloWorldBF = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

if (hirnfick.isValidProgram(helloWorldBF)) {
    const helloWorldJS = hirnfick.transpileToJS(helloWorldBF);
    const helloWorld = new Function(`${helloWorldJS} return run();`);
    console.log(helloWorld().output);
}
```
### ES6
```javascript
import * as hirnfick from 'hirnfick';

const helloWorldBF = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

if (hirnfick.isValidProgram(helloWorldBF)) {
    const helloWorldJS = hirnfick.transpileToJS(helloWorldBF);
    const helloWorld = new Function(`${helloWorldJS} return run();`);
    console.log(helloWorld().output);
}
```
