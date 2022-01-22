# Hirnfick
[![npm version](https://badge.fury.io/js/hirnfick.svg)](https://badge.fury.io/js/hirnfick)
![Tests](https://github.com/synthetic-borealis/hirnfick.js/actions/workflows/test.yml/badge.svg)
[![GitHub license](https://img.shields.io/github/license/synthetic-borealis/hirnfick.js)](https://github.com/synthetic-borealis/hirnfick.js/blob/main/LICENSE)

A [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck) transpilation library.

## Supported Output Languages
- JavaScript (no support for reading keyboard input).
- Python (no support for reading keyboard input).
- C.
- C++.

## Installation
Run `npm i hirnfick`

## Usage

- Use ```isValidProgram``` to validate your Brainfuck program and then ```transpileTo[OUTPUT-LANGUAGE]``` (e.g. ```transpileToJS```) to convert it to JavaScript.
- Transpilation to JavaScript generates a function that returns an object containing two members:
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

### Web
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello Hirnfick</title>
  <script src="https://unpkg.com/hirnfick@1.2.3/dist/hirnfick.js"></script>
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
      const helloWorldProgram = hirnfick.transpileToJS(helloWorldCode);
      const helloWorld = new Function(`${helloWorldProgram} return run().output;`);

      outputBox.value += helloWorld();
    });
  </script>
</body>

</html>
```
