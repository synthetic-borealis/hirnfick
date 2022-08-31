const fsPromises = require('fs/promises');
const fs = require('fs');
const childProcess = require('child_process');
const util = require('util');

const {
  WrongInputTypeError,
  BracketMismatchError,
  transpileToKotlin,
} = require('../lib');

const exec = util.promisify(childProcess.exec);

const helloWorldCode = fs.readFileSync('assets/bf/hello-world.bf')
  .toString();
const bracketMismatchCode = '>>+++[[<-->]';
const userInputCode = ',.';
const jarFile = 'test_kotlin.jar';
const sourceFile = 'test_kotlin.kt';
const numberArray = [2, 4, 8, 16];
const runCommand = `kotlin ${jarFile}`;
const compileCommand = `kotlinc ${sourceFile} -include-runtime -d ${jarFile}`;

function checkGeneratedCode(codeToCheck) {
  beforeAll(() => fsPromises.writeFile(sourceFile, codeToCheck));
  afterAll(() => Promise.all([
    fsPromises.unlink(sourceFile),
    fsPromises.unlink(jarFile),
  ]));
  it('Generates valid & correct code', () => exec(compileCommand)
    .then(() => exec(runCommand))
    .then(({ stdout }) => {
      expect(stdout.trim())
        .toBe('Hello World!');
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
  describe('Code generation (with user input)', () => {
    beforeAll(() => fsPromises.writeFile(sourceFile, transpileToKotlin(userInputCode)));
    afterAll(() => Promise.all([
      fsPromises.unlink(sourceFile),
      fsPromises.unlink(jarFile),
    ]));

    it('Generates valid & correct code', () => {
      const inputChar = 'a';
      const wrapper = () => new Promise((resolve, reject) => {
        const child = childProcess.exec(runCommand, (error, stdout) => {
          if (error) {
            reject(error);
          }
          resolve(stdout);
        });
        child.stdin.write(`${inputChar}\n`);
      });
      return exec(compileCommand)
        .then(wrapper)
        .then((out) => expect(out)
          .toBe(inputChar));
    }, 25000);
  });
});
