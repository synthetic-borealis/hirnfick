const cppUtils = require('cpp-utils');
const fsPromises = require('fs/promises');
const fs = require('fs');
const util = require('util');
const childProcess = require('child_process');
const {
  WrongInputTypeError,
  BracketMismatchError,
  transpileToCpp,
} = require('../lib');

const exec = util.promisify(childProcess.exec);

const helloWorldCode = fs.readFileSync('assets/bf/hello-world.bf')
  .toString();
const bracketMismatchCode = '>>+++[[<-->]';
const userInputCode = ',.';
const exeExtension = process.platform === 'win32' ? '.exe' : '';
const executableFile = `test_cpp${exeExtension}`;
const sourceFile = 'test_cpp.cpp';
const numberArray = [2, 4, 8, 16];
const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;

function checkGeneratedCode(codeToCheck) {
  beforeAll(() => fsPromises.writeFile(sourceFile, codeToCheck));
  afterAll(() => Promise.all([
    fsPromises.unlink(executableFile),
    fsPromises.unlink(sourceFile),
  ]));
  it('Generates valid & correct code', () => cppUtils.compileWithGPlus(sourceFile, executableFile, true)
    .then(() => exec(commandToRun))
    .then(({ stdout }) => {
      expect(stdout.trim())
        .toBe('Hello World!');
    }));
}

describe('C++ transpiler', () => {
  describe('Error handling', () => {
    it('Throws WrongInputTypeError when given input of wrong type', () => {
      // noinspection JSCheckFunctionSignatures
      expect(() => transpileToCpp(numberArray))
        .toThrow(WrongInputTypeError);
    });
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => transpileToCpp(bracketMismatchCode))
        .toThrow(BracketMismatchError);
    });
  });
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(transpileToCpp(helloWorldCode));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(transpileToCpp(helloWorldCode, false));
  });
  describe('Code generation (with user input)', () => {
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
    beforeAll(() => {
      const outputCode = transpileToCpp(userInputCode);
      return fsPromises.writeFile(sourceFile, outputCode);
    });
    // noinspection DuplicatedCode
    afterAll(() => Promise.all([
      fsPromises.unlink(sourceFile),
      fsPromises.unlink(executableFile),
    ]));
    it('Generates valid code', () => cppUtils.compileWithGPlus(sourceFile, executableFile, true)
      .then(() => wrapper())
      .then((out) => expect(out)
        .toBe(inputChar)));
  });
});
