const cppUtils = require('cpp-utils');
const fs = require('fs/promises');
const process = require('node:process');
const util = require('util');
const {
  WrongInputTypeError,
  BracketMismatchError,
  transpileToCpp,
} = require('../index');
const exec = util.promisify(require('child_process').exec);

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const bracketMismatchCode = '>>+++[[<-->]';
const exeExtension = process.platform === 'win32' ? '.exe' : '';
const executableFile = `test${exeExtension}`;
const sourceFile = 'test.cpp';
const numberArray = [2, 4, 8, 16];

function writeGeneratedCode(codeToWrite) {
  beforeAll(() => fs.writeFile(sourceFile, codeToWrite));
}

function checkGeneratedCode() {
  it('Generates valid C++ code', () => cppUtils.compileWithGPlus(sourceFile, executableFile, true)
    .then(() => expect(true).toBeTruthy()));
  it('Generates correct code', () => {
    const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;
    return exec(commandToRun)
      .then(({ stdout }) => {
        expect(stdout.trim()).toBe('Hello World!');
      });
  });
  afterAll(() => Promise.all([
    fs.unlink(executableFile),
    fs.unlink(sourceFile),
  ]));
}

describe('C++ transpiler', () => {
  describe('Error handling', () => {
    it('Throws WrongInputTypeError when given input of wrong type', () => {
      // noinspection JSCheckFunctionSignatures
      expect(() => transpileToCpp(numberArray)).toThrow(WrongInputTypeError);
    });
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => transpileToCpp(bracketMismatchCode)).toThrow(BracketMismatchError);
    });
  });
  describe('Code generation (dynamic array)', () => {
    writeGeneratedCode(transpileToCpp(helloWorldCode));
    checkGeneratedCode();
  });
  describe('Code generation (fixed array)', () => {
    writeGeneratedCode(transpileToCpp(helloWorldCode, false));
    checkGeneratedCode();
  });
});
