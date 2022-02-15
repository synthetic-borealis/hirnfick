const fs = require('fs/promises');
const hirnfick = require('../index');

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const userInputCode = ',.';
const helloOutputCodeFixed = hirnfick.transpileToQBasicFixed(helloWorldCode);
const helloOutputCodeDynamic = hirnfick.transpileToQBasicDynamic(helloWorldCode);
const userInputOutputCodeFixed = hirnfick.transpileToQBasicFixed(userInputCode);
const userInputOutputCodeDynamic = hirnfick.transpileToQBasicDynamic(userInputCode);
const helloSourceFileFixed = 'hello_f.bas';
const helloSourceFileDynamic = 'hello_d.bas';
const userInputSourceFileFixed = 'userinput_f.bas';
const userInputSourceFileDynamic = 'userinput_d.bas';

fs.writeFile(helloSourceFileFixed, helloOutputCodeFixed)
  .then(fs.writeFile(userInputSourceFileFixed, userInputOutputCodeFixed))
  .then(fs.writeFile(helloSourceFileDynamic, helloOutputCodeDynamic))
  .then(fs.writeFile(userInputSourceFileDynamic, userInputOutputCodeDynamic))
  .then(() => console.log('Generated FreeBASIC code written successfully'))
  .catch((err) => {
    console.error('Could not write generated code to file');
    console.error(err.message);
  });
