const fs = require('fs/promises');
const hirnfick = require('../index');

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const userInputCode = ',.';

const jsWebOutput = hirnfick.transpileToJSWeb(helloWorldCode);
const jsWebFile = 'hello_web.js';

fs.writeFile(`tmp/${jsWebFile}`, jsWebOutput)
  .then(() => console.log('Output written to files'))
  .catch(() => console.error('Error generating output files'));
