const fs = require('fs/promises');
const hirnfick = require('../index');

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
// const userInputCode = ',.';

const jsWebOutput = hirnfick.transpileToJSWeb(helloWorldCode);
const jsWebFile = 'hello_web.js';
const jsCLIOutput = hirnfick.transpileToJSCLI(helloWorldCode);
const jsCLIFile = 'hello_cli.js';

fs.writeFile(`tmp/${jsWebFile}`, jsWebOutput)
  .then(() => fs.writeFile(`tmp/${jsCLIFile}`, jsCLIOutput))
  .then(() => console.log('Output written to files'))
  .catch(() => console.error('Error generating output files'));
