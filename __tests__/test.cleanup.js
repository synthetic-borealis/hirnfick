const fs = require('fs');
const cleanup = require('../lib/cleanup');

describe('Cleanup tests', () => {
  const helloWorldFile = 'assets/bf/hello-world.bf';
  const helloWorldCleanCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
  let helloWorldCode;

  beforeAll(() => {
    helloWorldCode = fs.readFileSync(helloWorldFile);
  });

  it('Cleans Brainfuck code correctly', () => {
    expect(() => cleanup.cleanCode(helloWorldCode) === helloWorldCleanCode)
      .toBeTruthy();
  });
});
