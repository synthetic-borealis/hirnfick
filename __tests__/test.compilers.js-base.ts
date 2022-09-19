import { BracketMismatchError, compileToJsBase } from '../src';

const bracketMismatchCode = '>>+++[[<-->]';

describe('Compilation to JavaScript (Base)', () => {
  describe('Error handling', () => {
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(
        () => compileToJsBase(
          bracketMismatchCode,
          false,
          false,
          2,
          ' ',
        ),
      ).toThrow(BracketMismatchError);
    });
  });
});
