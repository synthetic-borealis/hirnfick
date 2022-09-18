import fsPromises from 'fs/promises';
import fs from 'fs';
import util from 'util';
import childProcess from 'child_process';
import { BracketMismatchError, compileToJsCli } from '../src';

const exec = util.promisify(childProcess.exec);

const helloWorldCode = fs.readFileSync('assets/bf/hello-world.bf')
  .toString();
const bracketMismatchCode = '>>+++[[<-->]';
const userInputCode = ',.';
const sourceFile = 'test_js.js';

function checkGeneratedCode(codeToCheck: string) {
  beforeAll(() => fsPromises.writeFile(sourceFile, codeToCheck));
  it('Generates valid & correct code', () => exec(`node ${sourceFile}`)
    .then(({ stdout }) => {
      expect(stdout.trim())
        .toBe('Hello World!');
    }));
  afterAll(() => fsPromises.unlink(sourceFile));
}

describe('JavaScript (cli) transpiler', () => {
  describe('Error handling', () => {
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => compileToJsCli(bracketMismatchCode))
        .toThrow(BracketMismatchError);
    });
  });
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(compileToJsCli(helloWorldCode));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(compileToJsCli(helloWorldCode, false));
  });
  describe('Code generation (with user input)', () => {
    beforeAll(() => {
      const outputCode = compileToJsCli(userInputCode);
      return fsPromises.writeFile(sourceFile, outputCode);
    });
    afterAll(() => fsPromises.unlink(sourceFile));
    it('Generates valid & correct code', () => {
      const inputChar = 'a';
      const wrapper = () => new Promise((resolve, reject) => {
        const child = childProcess.exec(`node ${sourceFile}`, (error, stdout) => {
          if (error) {
            reject(error);
          }
          resolve(stdout);
        });
        child.stdin?.write(`${inputChar}\n`);
      });
      return wrapper()
        .then((out) => {
          expect(out)
            .toBe(inputChar);
        });
    });
  });
});
