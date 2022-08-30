const { PythonShell } = require('python-shell');
const fs = require('fs/promises');
const {
  WrongInputTypeError,
  BracketMismatchError,
  transpileToPython,
} = require('../lib');

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const bracketMismatchCode = '>>+++[[<-->]';
const userInputCode = ',.';
const numberArray = [2, 4, 8, 16];
const pyFile = 'test_py.py';

function checkGeneratedCode(codeToCheck) {
  const wrapper = () => new Promise((resolve, reject) => {
    PythonShell.runString(codeToCheck, null, (err, output) => {
      if (err) {
        reject(err);
      }
      resolve(output[0]);
    });
  });
  it('Generates  valid & correct code', () => wrapper()
    .then((output) => {
      expect(output).toBe('Hello World!');
    }));
}

describe('Python transpiler', () => {
  describe('Error handling', () => {
    it('Throws WrongInputTypeError when given input of wrong type', () => {
      // noinspection JSCheckFunctionSignatures
      expect(() => transpileToPython(numberArray)).toThrow(WrongInputTypeError);
    });
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => transpileToPython(bracketMismatchCode)).toThrow(BracketMismatchError);
    });
  });
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(transpileToPython(helloWorldCode));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(transpileToPython(helloWorldCode, false));
  });
  describe('Code generation (with user input)', () => {
    beforeAll(() => {
      const outputCode = transpileToPython(userInputCode);
      return fs.writeFile(pyFile, outputCode);
    });
    afterAll(() => fs.unlink(pyFile));
    it('Generates valid & correct code', () => {
      const inputChar = 'a';
      const wrapper = () => new Promise((resolve, reject) => {
        const pyShell = new PythonShell(pyFile);
        pyShell.on('message', (message) => {
          resolve(message);
        });
        pyShell.on('error', (error) => {
          reject(error);
        });
        pyShell.on('pythonError', (error) => {
          reject(error);
        });
        pyShell.stdin.write(`${inputChar}\n`);
      });
      return wrapper()
        .then((out) => {
          expect(out).toBe(inputChar);
        });
    });
  });
});
