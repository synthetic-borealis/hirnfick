const hirnfick = require('../index');
const fs = require('fs/promises');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const invalidCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

describe('Transpilers tests', () => {
  describe('transpileToJsWeb tests (dynamic memory)', () => {
    const outputCode = hirnfick.transpileToJsWeb(helloWorldCode, true);
    const helloWorld = new Function(`${outputCode}return main();`);

    it('Throws an error when input has incorrect type', () => {
      expect(() => hirnfick.transpileToJsWeb([2, 9, 15, 7])).toThrow();
    });

    it('Throws an error when input is an invalid program', () => {
      expect(() => hirnfick.transpileToJsWeb(invalidCode)).toThrow();
    });

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

  describe('transpileToJsWeb tests (fixed memory)', () => {
    const outputCode = hirnfick.transpileToJsWeb(helloWorldCode, false);
    const helloWorld = new Function(`${outputCode}return main();`);

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

  describe('transpileToJsCli tests (dynamic memory)', () => {
    const outputCode = hirnfick.transpileToJsCli(helloWorldCode, true);
    const sourceFile = 'test.js';

    beforeAll(() => {
      return fs.writeFile(sourceFile, outputCode);
    });

    it('Generates valid JavaScript', (done) => {
      exec(`node ${sourceFile}`)
        .then(() => {
          done();
        })
        .catch((err) => done(err));
    });

    describe('Generated JavaScript code', () => {
      it('Has correct output', (done) => {
        exec(`node ${sourceFile}`)
        .then(({stdout}) => {
          if (stdout.trim() === 'Hello World!') {
            done();
          } else {
            done(new Error('Incorrect output'));
          }
        })
        .catch((err) => done(err));
      });
    });

    afterAll(() => {
      return fs.unlink(sourceFile);
    });
  });

  describe('transpileToJsCli tests (fixed memory)', () => {
    const outputCode = hirnfick.transpileToJsCli(helloWorldCode, false);
    const sourceFile = 'test.js';

    beforeAll(() => {
      return fs.writeFile(sourceFile, outputCode);
    });

    it('Generates valid JavaScript', (done) => {
      exec(`node ${sourceFile}`)
        .then(() => {
          done();
        })
        .catch((err) => done(err));
    });

    describe('Generated JavaScript code', () => {
      it('Has correct output', (done) => {
        exec(`node ${sourceFile}`)
        .then(({stdout}) => {
          if (stdout.trim() === 'Hello World!') {
            done();
          } else {
            done(new Error('Incorrect output'));
          }
        })
        .catch((err) => done(err));
      });
    });

    afterAll(() => {
      return fs.unlink(sourceFile);
    });
  });
});
