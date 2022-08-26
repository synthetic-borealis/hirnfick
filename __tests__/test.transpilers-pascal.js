const pascalUtils = require('pascal-utils');
const fs = require('fs/promises');
const process = require('node:process');
const util = require('util');
const hirnfick = require('../index');
const exec = util.promisify(require('child_process').exec);

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

describe('Transpilers tests', () => {
  describe('transpileToPascal tests', () => {
    const outputCode = hirnfick.transpileToPascal(helloWorldCode);
    const exeExtension = process.platform === 'win32' ? '.exe' : '';
    const executableFile = `test${exeExtension}`;
    const sourceFile = 'test.pas';

    beforeAll(() => fs.writeFile(sourceFile, outputCode));

    it('Generates valid Pascal code', async () => pascalUtils.compile(sourceFile, executableFile)
      .then(() => {
        expect(true).toBeTruthy();
      }));

    it('Has correct output', async () => {
      const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;
      return exec(commandToRun)
        .then(({ stdout }) => {
          expect(stdout.trim()).toBe('Hello World!');
        });
    });

    afterAll(() => Promise.all([
      fs.unlink(sourceFile), fs.unlink(executableFile), fs.unlink('test.o'),
    ]));
  });
});
