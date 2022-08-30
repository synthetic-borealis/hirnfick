const { PythonShell } = require('python-shell');
const {
  WrongInputTypeError,
  BracketMismatchError,
  transpileToPython,
} = require('../lib');

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const bracketMismatchCode = '>>+++[[<-->]';
const numberArray = [2, 4, 8, 16];

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
});
