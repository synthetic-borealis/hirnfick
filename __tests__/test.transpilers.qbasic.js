const util = require('util');
const fs = require('fs/promises');
const childProcess = require('child_process');
const {
  WrongInputTypeError,
  BracketMismatchError,
  transpileToQBasic,
} = require('../lib');

const exec = util.promisify(childProcess.exec);

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const bracketMismatchCode = '>>+++[[<-->]';
const userInputCode = ',.';
const numberArray = [2, 4, 8, 16];
const exeExtension = process.platform === 'win32' ? '.exe' : '';
const executableFile = `test_bas${exeExtension}`;
const sourceFile = 'test_bas.bas';
const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;

function checkGeneratedCode(codeToCheck) {
  beforeAll(() => fs.writeFile(sourceFile, codeToCheck));
  afterAll(() => Promise.all([
    fs.unlink(executableFile),
    fs.unlink(sourceFile),
  ]));
  it('Generates valid code', () => exec(`fbc ${sourceFile} -x ${executableFile}`)
    .then(() => expect(true).toBeTruthy()));
  it('Generates correct code', () => exec(commandToRun)
    .then(({ stdout }) => {
      expect(stdout.trim()).toBe('Hello World!');
    }));
}

describe('QBasic transpiler', () => {
  describe('Error handling', () => {
    it('Throws WrongInputTypeError when given input of wrong type', () => {
      // noinspection JSCheckFunctionSignatures
      expect(() => transpileToQBasic(numberArray)).toThrow(WrongInputTypeError);
    });
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => transpileToQBasic(bracketMismatchCode)).toThrow(BracketMismatchError);
    });
  });
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(transpileToQBasic(helloWorldCode, true));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(transpileToQBasic(helloWorldCode));
  });
  describe('Code generation (with user input)', () => {
    beforeAll(() => {
      const generatedCode = transpileToQBasic(userInputCode);
      return fs.writeFile(sourceFile, generatedCode);
    });
    afterAll(() => Promise.all([
      fs.unlink(executableFile),
      fs.unlink(sourceFile),
    ]));
    it('Generates valid code', () => exec(`fbc ${sourceFile} -x ${executableFile}`)
      .then(() => expect(true).toBeTruthy()));
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
