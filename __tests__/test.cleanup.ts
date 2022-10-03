import fs from 'fs';
import { cleanCode } from '../src';

const sourceFileWithComments = 'assets/bf/hello-world-with-comments.bf';
const sourceFileWithoutComments = 'assets/bf/hello-world.bf';
const helloWorldCode = fs.readFileSync(sourceFileWithComments).toString();
const helloWorldCleanCode = fs.readFileSync(sourceFileWithoutComments).toString();

describe('Cleanup tests', () => {
  it('Cleans Brainfuck code correctly', () => {
    expect(() => cleanCode(helloWorldCode) === helloWorldCleanCode)
      .toBeTruthy();
  });
});
