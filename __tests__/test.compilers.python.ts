import { PythonShell } from 'python-shell';
import fsPromises from 'fs/promises';
import fs from 'fs';
import { BracketMismatchError, compileToPython } from '../src';

const helloWorldCode = fs.readFileSync('assets/bf/hello-world.bf')
  .toString();
const bracketMismatchCode = fs.readFileSync('assets/bf/invalid1.bf')
  .toString();
const userInputCode = fs.readFileSync('assets/bf/user-input.bf')
  .toString();
const pyFile = 'test_py.py';

function checkGeneratedCode(codeToCheck: string) {
  const wrapper = () => new Promise((resolve, reject) => {
    PythonShell.runString(codeToCheck, undefined, (err, output) => {
      if (err) {
        reject(err);
      }
      resolve((output as string[])[0]);
    });
  });
  it('Generates  valid & correct code', async () => {
    const output = await wrapper();
    expect(output)
      .toBe('Hello World!');
  });
}

describe('Compilation to Python', () => {
  describe('Error handling', () => {
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => compileToPython(bracketMismatchCode))
        .toThrow(BracketMismatchError);
    });
  });
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(compileToPython(helloWorldCode));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(compileToPython(helloWorldCode, false));
  });
  describe('Code generation (with user input)', () => {
    beforeAll(() => {
      const outputCode = compileToPython(userInputCode);
      return fsPromises.writeFile(pyFile, outputCode);
    });
    afterAll(() => fsPromises.unlink(pyFile));
    it('Generates valid & correct code', async () => {
      const inputChar = 'a';
      const wrapper = () => new Promise((resolve, reject) => {
        const pyShell = new PythonShell(pyFile);
        pyShell.on('message', (message) => {
          resolve(message);
        });
        pyShell.on('error', (error) => {
          reject(error);
        });
        pyShell.on('pythonError', (error) => {
          reject(error);
        });
        pyShell.stdin.write(`${inputChar}\n`);
      });
      const out = await wrapper();
      expect(out)
        .toBe(inputChar);
    });
  });
});
