const fs = require('fs/promises');
const hirnfick = require('../index');

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const userInputCode = ',.';
const helloOutputCode = hirnfick.transpileToQBasic(helloWorldCode);
const userInputOutputCode = hirnfick.transpileToQBasic(userInputCode);
const helloSourceFile = 'hello.bas';
const userInputSourceFile = 'userinput.bas';

fs.writeFile(helloSourceFile, helloOutputCode)
  .then(fs.writeFile(userInputSourceFile, userInputOutputCode))
  .then(() => console.log('Generated FreeBASIC code written successfully'))
  .catch((err) => {
    console.log('Could not write generated code to file');
    console.log(err.message);
  });
