import fsPromises from 'fs/promises';
import fs from 'fs';
import util from 'util';
import childProcess from 'child_process';
import { compileToJsNode } from '../src';

const exec = util.promisify(childProcess.exec);
const helloWorldCode = fs.readFileSync('assets/bf/hello-world.bf')
  .toString();
const userInputCode = fs.readFileSync('assets/bf/user-input.bf').toString();
const sourceFile = 'test_js_node.js';

function checkGeneratedCode(codeToCheck: string) {
  beforeAll(() => fsPromises.writeFile(sourceFile, codeToCheck));
  it('Generates valid & correct code', () => exec(`node ${sourceFile}`)
    .then(({ stdout }) => {
      expect(stdout.trim())
        .toBe('Hello World!');
    }));
  afterAll(() => fsPromises.unlink(sourceFile));
}

describe('Compilation to JavaScript (Node.js)', () => {
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(compileToJsNode(helloWorldCode));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(compileToJsNode(helloWorldCode, false));
  });
  describe('Code generation (with user input)', () => {
    beforeAll(() => {
      const outputCode = compileToJsNode(userInputCode);
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
