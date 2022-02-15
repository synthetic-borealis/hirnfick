# Hirnfick
[![npm version](https://badge.fury.io/js/hirnfick.svg)](https://badge.fury.io/js/hirnfick)
![Tests](https://github.com/synthetic-borealis/hirnfick.js/actions/workflows/test.yml/badge.svg)
[![GitHub license](https://img.shields.io/github/license/synthetic-borealis/hirnfick.js)](https://github.com/synthetic-borealis/hirnfick.js/blob/main/LICENSE)

A [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck) transpilation library.

## Contants
1. [Installation](#installation)
2. [Usage](#usage)
3. [Supported Output Languages](#supported-output-languages)
4. [Examples](#examples)

## Installation
Run `npm i hirnfick`

## Usage

- Use ```transpileTo[VARIANT]()``` where ```[VARIANT]``` is a the output language/variant (e.g. ```transpileToJavaScript()```).
- Transpilation to JavaScript generates a function that returns an object containing two members:
  1. ```output``` - The output of the program.
  2. ```cells``` - The array of cells that were used by the program.
- There are two QBasic transpiler variants:
  1. ```transpileToQBasicFixed``` outputs programs with a fixed-size cells array.
  2. ```transpileToQBasicDynamic``` outputs programs with a dynamic cells array (requires PDS 7.1 or [FreeBASIC](https://www.freebasic.net/) to compile).
- ```transpileToQBasic``` is an alias for ```transpileToQBasicFixed```.
- For more information see the [documentation](docs/API.md).

## Supported Output Languages

- JavaScript (no support for reading keyboard input).
- Python.
- C.
- C++.
- QBasic (manually tested with [FreeBASIC](https://www.freebasic.net/) 1.09.0 and QuickBASIC 4.5).
- [UwU](https://github.com/KiraDotRose/UwU).

### Table 1: Supported Commands by Output Language

| Language   |    \>   |    \<   |    +    |    -    |    .    |    ,    |   \[    |   \]    |   Cells Array Size   |
| :--------- | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: | :------------------: |
| JavaScript | &check; | &check; | &check; | &check; | &check; | &cross; | &check; | &check; | Dynamic              |
| Python     | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; | Dynamic              |
| C          | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; | 30,000               |
| C++        | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; | Dynamic              |
| QBasic     | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; | 30,000/Dynamic       |
| UwU        | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; | Not Applicable       |

## Examples

### Node.js/CommonJS
```javascript
const hirnfick = require('hirnfick');

const helloWorldBF = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

try {
  const helloWorldJS = hirnfick.transpileToJavaScript(helloWorldBF);
  const helloWorld = new Function(`${helloWorldJS} return run();`);
  console.log(helloWorld().output);
} catch (err) {
  console.error(`Error: ${err.message}`);
}
```
### ES6
```javascript
const hirnfick = require('hirnfick');

const helloWorldBF = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

try {
  const helloWorldJS = hirnfick.transpileToJavaScript(helloWorldBF);
  const helloWorld = new Function(`${helloWorldJS} return run();`);
  console.log(helloWorld().output);
} catch (err) {
  console.error(`Error: ${err.message}`);
}
```

### Web
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello Hirnfick</title>
  <script src="https://unpkg.com/hirnfick@2.2.0/dist/hirnfick.js"></script>
</head>

<body>
  <p>
    <textarea id="output-box" readonly rows="8" style="width: 90%;"></textarea>
  </p>
  <button id="run-button">Run</button>

  <script>
    const runButton = document.getElementById('run-button');
    const outputBox = document.getElementById('output-box');
    const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

    outputBox.value = '';
    runButton.addEventListener('click', () => {
      try {
        const helloWorldProgram = hirnfick.transpileToJavaScript(helloWorldCode);
        const helloWorld = new Function(`${helloWorldProgram} return run().output;`);

        outputBox.value += helloWorld();
      } catch (err) {
        outputBox.value += `Error: ${err.message}`;
      }
    });
  </script>
</body>

</html>
```
