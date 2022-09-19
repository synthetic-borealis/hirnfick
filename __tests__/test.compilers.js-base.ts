import { BracketMismatchError, compileToJsBase } from '../src';

const bracketMismatchCode = '>>+++[[<-->]';

describe('JavaScript base compiler', () => {
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
