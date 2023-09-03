import fsPromises from 'fs/promises';
import fs from 'fs';
import util from 'util';
import childProcess from 'child_process';
import { compileToJsDeno } from '../src';

const exec = util.promisify(childProcess.exec);
const helloWorldCode = fs.readFileSync('assets/bf/hello-world.bf')
  .toString();
const userInputCode = fs.readFileSync('assets/bf/user-input.bf').toString();
const sourceFile = 'test_js_deno.js';

function checkGeneratedCode(codeToCheck: string) {
  beforeAll(() => fsPromises.writeFile(sourceFile, codeToCheck));
  it('Generates valid & correct code', async () => {
    const { stdout } = await exec(`deno run ${sourceFile}`);
    expect(stdout.trim()).toBe('Hello World!');
  });
  afterAll(() => fsPromises.unlink(sourceFile));
}

describe('Compilation to JavaScript (Deno)', () => {
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
    it('Generates valid & correct code', async () => {
      const inputChar = 'a';
      const runGeneratedApp = () => new Promise((resolve, reject) => {
        const child = childProcess.exec(`deno run ${sourceFile}`, (error, stdout) => {
          if (error) {
            reject(error);
          }
          resolve(stdout);
        });
        child.stdin?.write(`${inputChar}\n`);
      });
      const output = await runGeneratedApp();
      expect(output).toBe(inputChar);
    });
  });
});
