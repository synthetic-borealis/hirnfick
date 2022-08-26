const cppUtils = require('cpp-utils');
const fs = require('fs/promises');
const process = require('node:process');
const util = require('util');
const hirnfick = require('../index');
const exec = util.promisify(require('child_process').exec);

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const exeExtension = process.platform === 'win32' ? '.exe' : '';
const executableFile = `test${exeExtension}`;
const sourceFile = 'test.cpp';

function checkGeneratedProgramOutput() {
  it('Has correct output', () => {
    const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;
    return exec(commandToRun)
      .then(({ stdout }) => {
        expect(stdout.trim()).toBe('Hello World!');
      });
  });
}

function writeGeneratedCode(codeToWrite) {
  beforeAll(() => fs.writeFile(sourceFile, codeToWrite));
}

function checkCodeValidity() {
  it('Generates valid C++ code', () => cppUtils.compileWithGPlus(sourceFile, executableFile, true)
    .then(() => expect(true).toBeTruthy()));
}

describe('Transpilers tests', () => {
  describe('transpileToCpp tests (dynamic memory)', () => {
    // beforeAll
    writeGeneratedCode(hirnfick.transpileToCpp(helloWorldCode, true));

    checkCodeValidity();

    describe('Generated C++ code', () => {
      checkGeneratedProgramOutput();
    });

    afterAll(() => Promise.all([fs.unlink(sourceFile), fs.unlink(executableFile)]));
  });

  describe('transpileToCpp tests (fixed memory)', () => {
    // beforeAll
    writeGeneratedCode(hirnfick.transpileToCpp(helloWorldCode, false));

    checkCodeValidity();

    describe('Generated C++ code', () => {
      checkGeneratedProgramOutput();
    });

    afterAll(() => Promise.all([fs.unlink(sourceFile), fs.unlink(executableFile)]));
  });
});
