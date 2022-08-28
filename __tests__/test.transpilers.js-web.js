const {
  WrongInputTypeError,
  BracketMismatchError,
  transpileToJsWeb,
} = require('..');

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const bracketMismatchCode = '>>+++[[<-->]';
const numberArray = [2, 4, 8, 16];

function checkGeneratedCode(codeToCheck) {
  const generatedFunction = new Function(`${codeToCheck} return main().output;`);
  it('Generates valid code', () => {
    expect(generatedFunction).not.toThrow();
  });
  it('Generates correct code', () => {
    expect(generatedFunction().trim()).toBe('Hello World!');
  });
}

describe('JavaScript (Web) transpiler', () => {
  describe('Error handling', () => {
    it('Throws WrongInputTypeError when given input of wrong type', () => {
      // noinspection JSCheckFunctionSignatures
      expect(() => transpileToJsWeb(numberArray)).toThrow(WrongInputTypeError);
    });
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => transpileToJsWeb(bracketMismatchCode)).toThrow(BracketMismatchError);
    });
  });
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(transpileToJsWeb(helloWorldCode));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(transpileToJsWeb(helloWorldCode, false));
  });
});
