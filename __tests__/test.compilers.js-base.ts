import fs from 'fs';
import { BracketMismatchError, compileToJsBase } from '../src';

const bracketMismatchCode = fs.readFileSync('assets/bf/invalid1.bf').toString();

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
