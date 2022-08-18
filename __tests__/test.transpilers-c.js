// noinspection NpmUsedModulesInstalled

const cppUtils = require('cpp-utils');
const fs = require('fs/promises');
const process = require('process');
const util = require('util');
const hirnfick = require('../index');
const exec = util.promisify(require('child_process').exec);

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

describe('Transpilers tests', () => {
  describe('transpileToC tests', () => {
    const outputCode = hirnfick.transpileToC(helloWorldCode);
    const exeExtension = process.platform === 'win32' ? '.exe' : '';
    const executableFile = `test${exeExtension}`;
    const sourceFile = 'test.c';

    beforeAll(() => fs.writeFile(sourceFile, outputCode));

    it('Generates valid C code', () => expect(cppUtils.compileWithGcc(sourceFile, executableFile, true))
      .resolves.toBeDefined());

    describe('Generated C code', () => {
      it('Has correct output', () => {
        const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;
        return exec(commandToRun)
          .then(({ stdout }) => {
            expect(stdout.trim()).toBe('Hello World!');
          });
      });
    });

    afterAll(() => Promise.all([fs.unlink(sourceFile), fs.unlink(executableFile)]));
  });
});
