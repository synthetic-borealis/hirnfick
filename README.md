# Hirnfick.js
A [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck) transpilation library.

## Installation
Run `npm i synthetic-borealis/hirnfick.js`

## Usage Examples

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
