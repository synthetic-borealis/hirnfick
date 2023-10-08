import fs from 'fs';
import { cleanCode, genIndent } from '../src';

const sourceFileWithComments = 'assets/bf/hello-world-with-comments.bf';
const sourceFileWithoutComments = 'assets/bf/hello-world.bf';
const helloWorldCode = fs.readFileSync(sourceFileWithComments)
  .toString();
const helloWorldCleanCode = fs.readFileSync(sourceFileWithoutComments)
  .toString()
  .trim();

describe('Util function tests', () => {
  describe('cleanCode', () => {
    it('Cleans Brainfuck code correctly', () => {
      const cleanedCode = cleanCode(helloWorldCode);
      expect(cleanedCode)
        .toBe(helloWorldCleanCode);
    });
  });
  describe('genIndent', () => {
    it('Generates correct output', () => {
      expect(genIndent(0, 2, ' '))
        .toHaveLength(0);
      expect(genIndent(1, 2, ' '))
        .toHaveLength(2);
      expect(genIndent(2, 2, ' '))
        .toHaveLength(4);
    });
  });
});
