const fs = require('fs/promises');
const childProcess = require('child_process');
const util = require('util');

const {
  WrongInputTypeError,
  BracketMismatchError,
  transpileToKotlin,
} = require('../lib');

const exec = util.promisify(childProcess.exec);

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const bracketMismatchCode = '>>+++[[<-->]';
const userInputCode = ',.';
const jarFile = `test_kotlin.jar`;
const sourceFile = 'test_kotlin.kt';
const numberArray = [2, 4, 8, 16];
const runCommand = `java -jar ${jarFile}`;
const compileCommand = `kotlinc ${sourceFile} -include-runtime -d ${jarFile}`;

function checkGeneratedCode(codeToCheck) {
  beforeAll(() => fs.writeFile(sourceFile, codeToCheck));
  afterAll(() => Promise.all([
    fs.unlink(sourceFile),
    fs.unlink(jarFile),
  ]));
  it('Generates valid & correct code', () => exec(compileCommand)
    .then(() => exec(runCommand))
    .then(({ stdout }) => {
      expect(stdout.trim()).toBe('Hello World!');
    }), 35000);
}

describe('Kotlin transpiler', () => {
  describe('Error handling', () => {
    it('Throws WrongInputTypeError when given input of wrong type', () => {
      // noinspection JSCheckFunctionSignatures
      expect(() => transpileToKotlin(numberArray))
        .toThrow(WrongInputTypeError);
    });
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => transpileToKotlin(bracketMismatchCode))
        .toThrow(BracketMismatchError);
    });
  });
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(transpileToKotlin(helloWorldCode));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(transpileToKotlin(helloWorldCode, false));
  });
});
