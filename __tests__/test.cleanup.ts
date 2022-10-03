import fs from 'fs';
import { cleanCode } from '../src';

describe('Cleanup tests', () => {
  const sourceFileWithComments = 'assets/bf/hello-world-with-comments.bf';
  const sourceFileWithoutComments = 'assets/bf/hello-world.bf';
  let helloWorldCleanCode: string;
  let helloWorldCode: string;

  beforeAll(() => {
    helloWorldCode = fs.readFileSync(sourceFileWithComments).toString();
    helloWorldCleanCode = fs.readFileSync(sourceFileWithoutComments).toString();
  });

  it('Cleans Brainfuck code correctly', () => {
    expect(() => cleanCode(helloWorldCode) === helloWorldCleanCode)
      .toBeTruthy();
  });
});
