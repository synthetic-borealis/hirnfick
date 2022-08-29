const cppUtils = require('cpp-utils');
const fs = require('fs/promises');
const util = require('util');
const childProcess = require('child_process');
const {
  WrongInputTypeError,
  BracketMismatchError,
  transpileToCpp,
} = require('../lib');

const exec = util.promisify(childProcess.exec);

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const bracketMismatchCode = '>>+++[[<-->]';
const userInputCode = ',.';
const exeExtension = process.platform === 'win32' ? '.exe' : '';
const executableFile = `test_cpp${exeExtension}`;
const sourceFile = 'test_cpp.cpp';
const numberArray = [2, 4, 8, 16];
const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;

function checkGeneratedCode(codeToCheck) {
  beforeAll(() => fs.writeFile(sourceFile, codeToCheck));
  afterAll(() => Promise.all([
    fs.unlink(executableFile),
    fs.unlink(sourceFile),
  ]));
  it('Generates valid code', () => cppUtils.compileWithGPlus(sourceFile, executableFile, true)
    .then(() => expect(true).toBeTruthy()));
  it('Generates correct code', () => exec(commandToRun)
    .then(({ stdout }) => {
      expect(stdout.trim()).toBe('Hello World!');
    }));
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
    checkGeneratedCode(transpileToCpp(helloWorldCode));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(transpileToCpp(helloWorldCode, false));
  });
  describe('Code generation (with user input)', () => {
    beforeAll(() => {
      const outputCode = transpileToCpp(userInputCode);
      return fs.writeFile(sourceFile, outputCode);
    });
    // noinspection DuplicatedCode
    afterAll(() => Promise.all([
      fs.unlink(sourceFile),
      fs.unlink(executableFile),
    ]));
    it('Generates valid code', () => cppUtils.compileWithGPlus(sourceFile, executableFile, true)
      .then(() => {
        expect(true).toBeTruthy();
      }));
    // noinspection DuplicatedCode
    it('Generates correct code', () => {
      const inputChar = 'a';
      const wrapper = () => new Promise((resolve, reject) => {
        const child = childProcess.exec(`${commandToRun}`, (error, stdout) => {
          if (error) {
            reject(error);
          }
          resolve(stdout);
        });
        child.stdin.write(`${inputChar}\n`);
      });
      return wrapper()
        .then((out) => {
          expect(out).toBe(inputChar);
        });
    });
  });
});
