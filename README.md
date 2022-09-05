# Hirnfick

[![GitHub license](https://img.shields.io/github/license/synthetic-borealis/hirnfick.js)](https://github.com/synthetic-borealis/hirnfick.js/blob/main/LICENSE)
[![npm version](https://badge.fury.io/js/hirnfick.svg)](https://badge.fury.io/js/hirnfick)
![Tests](https://github.com/synthetic-borealis/hirnfick.js/actions/workflows/test.yml/badge.svg)
[![codecov](https://codecov.io/gh/synthetic-borealis/hirnfick.js/branch/main/graph/badge.svg?token=9JF2KN7ZLZ)](https://codecov.io/gh/synthetic-borealis/hirnfick.js)
[![npm downloads](https://img.shields.io/npm/dt/hirnfick)](https://www.npmjs.com/package/hirnfick)

A [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck) source-to-source compiler.

## Contents

1. [Installation](#installation)
2. [Usage](#usage)
   1. [Compiler](#compiler)
   2. [Library](#library)
3. [Supported Output Languages](#supported-output-languages)
4. [Examples](#examples)

## Installation

Run `npm i -g hirnfick` to install globally or `npm i hirnfick` to install for a single project.

## Usage

C++ style single-line comments (i.e. ```// I'm a comment```) are supported.

### Compiler

<pre>
  hirnfick -i [input file] -o [output file] <i>options</i>
</pre>
Options:

- `--lang [language]` - Output language (default=js-cli).
  - Supported options: js-web, js-cli, python, c, cpp, qbasic, pascal, kotlin.
- `--memory-size [fixed|dynamic]` - Type of cells array (default=fixed).

### Library

- Use ```transpileTo[VARIANT]()``` where ```[VARIANT]``` is the output language/variant (e.g. ```transpileToJsWeb()```).
- Transpilation to JavaScript generates a function that returns an object containing two members:
  1. ```output``` - The output of the program.
  2. ```cells``` - The array of cells that were used by the program.
- QBasic programs with dynamic arrays require PDS 7.1 or [FreeBASIC](https://www.freebasic.net/) to compile.
- Single-line C/C++/JS style comments are supported.
- For more information see the [documentation](docs/API.md).

## Supported Output Languages

- JavaScript.
- Python.
- C.
- C++.
- QBasic (manually tested with [FreeBASIC](https://www.freebasic.net/) 1.09.0, QuickBASIC 4.5 and PDS 7.1).
- Pascal (tested with Free Pascal 3.2.2 and Borland Pascal 7.0).
- Kotlin.

### Table 1: Supported Commands by Output Language

| Language         |   \>    |   \<    |    +    |    -    |    .    |    ,    |   \[    |   \]    |  Memory Size   |
|:-----------------|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:--------------:|
| JavaScript (Web) | &check; | &check; | &check; | &check; | &check; | &cross; | &check; | &check; | 30,000/Dynamic |
| JavaScript (CLI) | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; | 30,000/Dynamic |
| Python           | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; | 30,000/Dynamic |
| C                | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |     30,000     |
| C++              | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; | 30,000/Dynamic |
| QBasic           | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; | 30,000/Dynamic |
| Pascal           | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |     30,000     |
| Kotlin           | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; | 30,000/Dynamic |

## Examples

### Node.js/CommonJS

```javascript
const hirnfick = require('hirnfick');

const helloWorldBF = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

try {
  const helloWorldJS = hirnfick.transpileToJsCli(helloWorldBF);
  const helloWorld = new Function(`${helloWorldJS}`);
  helloWorld();
} catch (err) {
  console.error(`Error: ${err.message}`);
}
```

### ES6

```javascript
import * as hirnfick from 'hirnfick';

const helloWorldBF = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

try {
  const helloWorldJS = hirnfick.transpileToJsCli(helloWorldBF);
  const helloWorld = new Function(`${helloWorldJS}`);
  helloWorld();
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
  <script src="https://unpkg.com/hirnfick@6.0.2/dist/hirnfick.js"></script>
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
      const helloWorldProgram = hirnfick.transpileToJsWeb(helloWorldCode);
      const helloWorld = new Function(`${helloWorldProgram} return main().output;`);

      outputBox.value += helloWorld();
    } catch (err) {
      outputBox.value += `Error: ${err.message}`;
    }
  });
</script>
</body>

</html>
```
