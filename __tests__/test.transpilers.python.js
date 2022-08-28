const asyncPyShell = require('../test-utils/async-python-shell');
const {
  WrongInputTypeError,
  BracketMismatchError,
  transpileToPython,
} = require('../lib');

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const bracketMismatchCode = '>>+++[[<-->]';
const numberArray = [2, 4, 8, 16];

function checkGeneratedCode(codeToCheck) {
  it('Generates valid code', () => asyncPyShell.runString(codeToCheck)
    .then(() => expect(true).toBeTruthy()));

  it('Generates correct code', () => asyncPyShell.runString(codeToCheck)
    .then((output) => {
      expect(output).toEqual(
        expect.arrayContaining(['Hello World!']),
      );
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
