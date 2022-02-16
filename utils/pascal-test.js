const fs = require('fs/promises');
const hirnfick = require('../index');

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const userInputCode = ',.';
const helloOutputCode = hirnfick.transpileToPascal(helloWorldCode);
const userInputOutputCode = hirnfick.transpileToPascal(userInputCode);
const helloSourceFile = 'hello.pas';
const userInputSourceFile = 'userinput.pas';

fs.writeFile(helloSourceFile, helloOutputCode)
  .then(fs.writeFile(userInputSourceFile, userInputOutputCode))
  .then(() => console.log('Generated Pascal code written successfully'))
  .catch((err) => {
    console.error('Could not write generated code to file');
    console.error(err.message);
  });
