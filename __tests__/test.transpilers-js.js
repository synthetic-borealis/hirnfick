const fs = require('fs/promises');
const util = require('util');
const hirnfick = require('../index');
const exec = util.promisify(require('child_process').exec);

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const invalidCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

function checkGeneratedWebCode(codeToTest) {
  const generatedFunction = new Function(`${codeToTest}return main();`);

  it('Generates valid JavaScript code', () => {
    expect(generatedFunction).not.toThrow();
  });

  describe('Generated function', () => {
    it('Returns correct output string', () => {
      expect(generatedFunction().output).toBe('Hello World!\n');
    });

    it('Returns cells array', () => {
      expect(Array.isArray(generatedFunction().cells)).toBeTruthy();
    });
  });
}

function checkGeneratedCliCode(codeToTest) {
  const sourceFile = 'test.js';

  beforeAll(() => fs.writeFile(sourceFile, codeToTest));

  it('Generates valid JavaScript', async () => {
    await expect(exec(`node ${sourceFile}`)).resolves.toBeDefined();
  });

  describe('Generated JavaScript code', () => {
    it('Has correct output', () => exec(`node ${sourceFile}`)
      .then(({ stdout }) => {
        expect(stdout.trim()).toBe('Hello World!');
      }));
  });

  afterAll(() => fs.unlink(sourceFile));
}

describe('Transpilers tests', () => {
  describe('transpileToJsWeb error handling tests', () => {
    it('Throws an error when input has incorrect type', () => {
      // noinspection JSCheckFunctionSignatures
      expect(() => hirnfick.transpileToJsWeb([2, 9, 15, 7])).toThrow();
    });

    it('Throws an error when input is an invalid program', () => {
      expect(() => hirnfick.transpileToJsWeb(invalidCode)).toThrow();
    });
  });

  describe('transpileToJsWeb tests (dynamic memory)', () => {
    checkGeneratedWebCode(hirnfick.transpileToJsWeb(helloWorldCode, true));
  });

  describe('transpileToJsWeb tests (fixed memory)', () => {
    checkGeneratedWebCode(hirnfick.transpileToJsWeb(helloWorldCode, false));
  });

  describe('transpileToJsCli tests (dynamic memory)', () => {
    checkGeneratedCliCode(hirnfick.transpileToJsCli(helloWorldCode, true));
  });

  describe('transpileToJsCli tests (fixed memory)', () => {
    checkGeneratedCliCode(hirnfick.transpileToJsCli(helloWorldCode, false));
  });
});
