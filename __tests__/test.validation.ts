import { isValidProgram } from '../src';

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.'
  + '<-.<.+++.------.--------.>>+.>++.';
const invalidCode1 = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<<-]>>.>---.+++++++..+++.>>.<-.<'
  + '.+++.------.--------.>>+.>++.';
const invalidCode2 = '++++++++]>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-[>>.>---.+++++++..+++.>>.'
  + '<-.<.+++.------.--------.>>+.>++.';

describe('Utility function tests', () => {
  describe('isValidProgram tests', () => {
    it('Accepts valid programs', () => {
      expect(isValidProgram(helloWorldCode))
        .toBeTruthy();
    });
    it('Rejects invalid programs', () => {
      expect(isValidProgram(invalidCode1))
        .toBeFalsy();
      expect(isValidProgram(invalidCode2))
        .toBeFalsy();
    });
  });
});
