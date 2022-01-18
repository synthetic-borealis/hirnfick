const brainfuck = require('../index');

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const invalidCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

describe('Utility function tests', () => {
  describe('isValidProgram tests', () => {
    it('Accepts valid programs', () => {
      expect(brainfuck.isValidProgram(helloWorldCode)).toBeTruthy();
    });
    it('Rejects invalid programs', () => {
      expect(brainfuck.isValidProgram(invalidCode)).toBeFalsy();
    });
  });
});

describe('Transpilers tests', () => {
  describe('transpileToJS tests', () => {
    const outputCode = brainfuck.transpileToJS(helloWorldCode);
    const helloWorld = new Function(`${outputCode}return run();`);

    it('Generates valid JavaScript code', () => {
      expect(helloWorld).not.toThrow();
    });
    describe('Generated function', () => {
      it('Returns correct output string', () => {
        expect(helloWorld().output).toBe('Hello World!\n');
      });
      it('Returns cells array', () => {
        expect(Array.isArray(helloWorld().cells)).toBeTruthy();
      });
    });
  });
});