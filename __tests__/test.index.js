const brainfuck = require('../index');
const {PythonShell} = require('python-shell');
const should = require('should');

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

  describe('transpileToPython tests', () => {
    const outputCode = brainfuck.transpileToPython(helloWorldCode);

    it('Generates valid Python code', (done) => {
      PythonShell.runString(outputCode, null, (err) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
    describe('Generated Python code', () => {
      it('Returns correct output', (done) => {
        PythonShell.runString(outputCode, null, (err, results) => {
          if (err) return done(err);
          results.should.be.an.Array().and.have.lengthOf(1);
          results.should.eql(['Hello World!']);
          done();
        });
      });
    });
  });
});
