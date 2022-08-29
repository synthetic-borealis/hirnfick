const pascalUtils = require('pascal-utils');
// noinspection DuplicatedCode
const fs = require('fs/promises');
const util = require('util');
const childProcess = require('child_process');
const {
  WrongInputTypeError,
  BracketMismatchError,
  transpileToPascal,
} = require('../lib');

const exec = util.promisify(childProcess.exec);

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const bracketMismatchCode = '>>+++[[<-->]';
const userInputCode = ',.';
const exeExtension = process.platform === 'win32' ? '.exe' : '';
const executableFile = `test_pas${exeExtension}`;
const sourceFile = 'test_pas.pas';
const objectFile = 'test_pas.o';
const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;

describe('Pascal transpiler', () => {
  describe('Error handling', () => {
    it('Throws WrongInputTypeError when given input of wrong type', () => {
      const numberArray = [2, 4, 8, 16];
      // noinspection JSCheckFunctionSignatures
      expect(() => transpileToPascal(numberArray)).toThrow(WrongInputTypeError);
    });
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => transpileToPascal(bracketMismatchCode)).toThrow(BracketMismatchError);
    });
  });
  describe('Code generation', () => {
    const outputCode = transpileToPascal(helloWorldCode, 'Test');
    beforeAll(() => fs.writeFile(sourceFile, outputCode));
    afterAll(() => Promise.all([
      fs.unlink(sourceFile),
      fs.unlink(objectFile),
      fs.unlink(executableFile),
    ]));
    it('Generates valid code', () => pascalUtils.compile(sourceFile, executableFile)
      .then(() => {
        expect(true).toBeTruthy();
      }));
    it('Generates correct code', () => exec(commandToRun)
      .then(({ stdout }) => {
        expect(stdout.trim()).toBe('Hello World!');
      }));
  });
  describe('Code generation (with user input)', () => {
    beforeAll(() => {
      const outputCode = transpileToPascal(userInputCode, 'Test');
      return fs.writeFile(sourceFile, outputCode);
    });
    afterAll(() => Promise.all([
      fs.unlink(sourceFile),
      fs.unlink(objectFile),
      fs.unlink(executableFile),
    ]));
    it('Generates valid code', () => pascalUtils.compile(sourceFile, executableFile)
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
        process.stdin.resume();
        process.stdin.pipe(child.stdin);
        process.stdin.push(`${inputChar}\n`);
        process.stdin.end();
      });
      return wrapper()
        .then((out) => {
          expect(out).toBe(inputChar);
        });
    });
  });
});
