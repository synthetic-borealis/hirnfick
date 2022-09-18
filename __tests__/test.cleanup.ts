import fs from 'fs';
import cleanCode from '../src/utils/cleanCode';

describe('Cleanup tests', () => {
  const helloWorldFile = 'assets/bf/hello-world.bf';
  const helloWorldCleanCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
  let helloWorldCode: string;

  beforeAll(() => {
    helloWorldCode = fs.readFileSync(helloWorldFile).toString();
  });

  it('Cleans Brainfuck code correctly', () => {
    expect(() => cleanCode(helloWorldCode) === helloWorldCleanCode)
      .toBeTruthy();
  });
});
