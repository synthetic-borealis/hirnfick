const pascalUtils = require('pascal-utils');
const fs = require('fs/promises');
const process = require('node:process');
const util = require('util');
const {
  WrongInputTypeError,
  BracketMismatchError,
  transpileToPascal,
} = require('..');
const exec = util.promisify(require('child_process').exec);

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const bracketMismatchCode = '>>+++[[<-->]';

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
    const exeExtension = process.platform === 'win32' ? '.exe' : '';
    const executableFile = `test${exeExtension}`;
    const sourceFile = 'test.pas';
    const objectFile = 'test.o';
    beforeAll(() => fs.writeFile(sourceFile, outputCode));
    it('Generates valid code', () => pascalUtils.compile(sourceFile, executableFile)
      .then(() => {
        expect(true).toBeTruthy();
      }));
    it('Generates correct code', () => {
      const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;
      return exec(commandToRun)
        .then(({ stdout }) => {
          expect(stdout.trim()).toBe('Hello World!');
        });
    });
    afterAll(() => Promise.all([
      fs.unlink(sourceFile),
      fs.unlink(objectFile),
      fs.unlink(executableFile),
    ]));
  });
});
