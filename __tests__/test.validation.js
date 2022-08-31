const { isValidProgram } = require('../lib/validation');

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const invalidCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

describe('Utility function tests', () => {
  describe('isValidProgram tests', () => {
    it('Accepts valid programs', () => {
      expect(isValidProgram(helloWorldCode))
        .toBeTruthy();
    });
    it('Rejects invalid programs', () => {
      expect(isValidProgram(invalidCode))
        .toBeFalsy();
    });
  });
});
