const fs = require('fs/promises');
const util = require('util');
const {
  WrongInputTypeError,
  BracketMismatchError,
  transpileToJsCli,
} = require('../lib');
const exec = util.promisify(require('child_process').exec);

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const bracketMismatchCode = '>>+++[[<-->]';
const numberArray = [2, 4, 8, 16];
const sourceFile = 'test.js';

function checkGeneratedCode(codeToCheck) {
  beforeAll(() => fs.writeFile(sourceFile, codeToCheck));
  it('Generates valid & correct code', () => exec(`node ${sourceFile}`)
    .then(({ stdout }) => {
      expect(stdout.trim()).toBe('Hello World!');
    }));
  afterAll(() => fs.unlink(sourceFile));
}

describe('JavaScript (cli) transpiler', () => {
  describe('Error handling', () => {
    it('Throws WrongInputTypeError when given input of wrong type', () => {
      // noinspection JSCheckFunctionSignatures
      expect(() => transpileToJsCli(numberArray)).toThrow(WrongInputTypeError);
    });
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => transpileToJsCli(bracketMismatchCode)).toThrow(BracketMismatchError);
    });
  });
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(transpileToJsCli(helloWorldCode));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(transpileToJsCli(helloWorldCode, false));
  });
});
