import fs from 'fs';
import { BracketMismatchError, transpileToJsWeb } from '../src';

const helloWorldCode = fs.readFileSync('assets/bf/hello-world.bf')
  .toString();
const bracketMismatchCode = '>>+++[[<-->]';

function checkGeneratedCode(codeToCheck: string) {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const generatedFunction = new Function(`${codeToCheck} return main().output;`);
  it('Generates valid code', () => {
    expect(generatedFunction)
      .not
      .toThrow();
  });
  it('Generates correct code', () => {
    expect(generatedFunction()
      .trim())
      .toBe('Hello World!');
  });
}

describe('JavaScript (Web) transpiler', () => {
  describe('Error handling', () => {
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => transpileToJsWeb(bracketMismatchCode))
        .toThrow(BracketMismatchError);
    });
  });
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(transpileToJsWeb(helloWorldCode));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(transpileToJsWeb(helloWorldCode, false));
  });
});
