import fsPromises from 'fs/promises';
import fs from 'fs';
import util from 'util';
import childProcess from 'child_process';
import { BracketMismatchError, compileToJsDeno } from '../src';

const exec = util.promisify(childProcess.exec);

const helloWorldCode = fs.readFileSync('assets/bf/hello-world.bf')
  .toString();
const bracketMismatchCode = '>>+++[[<-->]';
const userInputCode = ',.';
const sourceFile = 'test_js.js';

function checkGeneratedCode(codeToCheck: string) {
  beforeAll(() => fsPromises.writeFile(sourceFile, codeToCheck));
  it('Generates valid & correct code', () => exec(`deno run ${sourceFile}`)
    .then(({ stdout }) => {
      expect(stdout.trim())
        .toBe('Hello World!');
    }));
  afterAll(() => fsPromises.unlink(sourceFile));
}

describe('JavaScript (Deno) compiler', () => {
  describe('Error handling', () => {
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => compileToJsDeno(bracketMismatchCode))
        .toThrow(BracketMismatchError);
    });
  });
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(compileToJsDeno(helloWorldCode));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(compileToJsDeno(helloWorldCode, false));
  });
  describe('Code generation (with user input)', () => {
    beforeAll(() => {
      const outputCode = compileToJsDeno(userInputCode);
      return fsPromises.writeFile(sourceFile, outputCode);
    });
    afterAll(() => fsPromises.unlink(sourceFile));
    it('Generates valid & correct code', () => {
      const inputChar = 'a';
      const wrapper = () => new Promise((resolve, reject) => {
        const child = childProcess.exec(
          `deno run ${sourceFile}`,
          (error, stdout) => {
            if (error) {
              reject(error);
            }
            resolve(stdout);
          },
        );
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
