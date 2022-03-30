const hirnfick = require('../index');
const {PythonShell} = require('python-shell');
const cppUtils = require('cpp-utils');
const should = require('should');
const fs = require('fs/promises');
const process = require('process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const invalidCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

describe('Transpilers tests', () => {
  describe('transpileToJSWeb tests', () => {
    const outputCode = hirnfick.transpileToJSWeb(helloWorldCode);
    const helloWorld = new Function(`${outputCode}return run();`);

    it('Throws an error when input has incorrect type', () => {
      expect(() => hirnfick.transpileToJSWeb([2, 9, 15, 7])).toThrow();
    });

    it('Throws an error when input is an invalid program', () => {
      expect(() => hirnfick.transpileToJSWeb(invalidCode)).toThrow();
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

  describe('transpileToJSCLI tests', () => {
    const outputCode = hirnfick.transpileToJSCLI(helloWorldCode);
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

  describe('transpileToPython tests', () => {
    const outputCode = hirnfick.transpileToPython(helloWorldCode);

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
      it('Has correct output', (done) => {
        PythonShell.runString(outputCode, null, (err, results) => {
          if (err) return done(err);
          results.should.be.an.Array().and.have.lengthOf(1);
          results.should.eql(['Hello World!']);
          done();
        });
      });
    });
  });

  describe('transpileToC tests', () => {
    const outputCode = hirnfick.transpileToC(helloWorldCode);
    const exeExtension = process.platform === 'win32' ? '.exe' : '';
    const executableFile = `test${exeExtension}`;
    const sourceFile = 'test.c';

    beforeAll(() => {
      return fs.writeFile(sourceFile, outputCode);
    });

    it('Generates valid C code', () => {
      return expect(cppUtils.compileWithGcc(sourceFile, executableFile, true)).resolves.toBeDefined();
    });

    describe('Generated C code', () => {
      it('Has correct output', (done) => {
        const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;
        exec(commandToRun)
          .then(({stdout, stderr}) => {
            if (stdout.trim() === 'Hello World!') {
              done();
            } else {
              done(new Error('Incorrect output'));
            }
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    afterAll(() => {
      return Promise.all([fs.unlink(sourceFile), fs.unlink(executableFile)]);
    });
  });

  describe('transpileToCpp tests', () => {
    const outputCode = hirnfick.transpileToCpp(helloWorldCode);
    const exeExtension = process.platform === 'win32' ? '.exe' : '';
    const executableFile = `test${exeExtension}`;
    const sourceFile = 'test.cpp';

    beforeAll(() => {
      return fs.writeFile(sourceFile, outputCode);
    });

    it('Generates valid C++ code', () => {
      return expect(cppUtils.compileWithGPlus(sourceFile, executableFile, true)).resolves.toBeDefined();
    });

    describe('Generated C++ code', () => {
      it('Has correct output', (done) => {
        const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;

        exec(commandToRun)
          .then(({stdout, stderr}) => {
            if (stdout.trim() === 'Hello World!') {
              done();
            } else {
              done(new Error('Incorrect output'));
            }
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    afterAll(() => {
      return Promise.all([fs.unlink(sourceFile), fs.unlink(executableFile)]);
    });
  });
});
