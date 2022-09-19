import fs from 'fs';
import { compileToJsWeb } from '../src';

const helloWorldCode = fs.readFileSync('assets/bf/hello-world.bf')
  .toString();

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
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(compileToJsWeb(helloWorldCode));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(compileToJsWeb(helloWorldCode, false));
  });
});
