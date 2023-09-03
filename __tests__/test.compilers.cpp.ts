import * as cppUtils from 'cpp-utils';
import fsPromises from 'fs/promises';
import fs from 'fs';
import util from 'util';
import childProcess from 'child_process';
import { BracketMismatchError, compileToCpp } from '../src';

const exec = util.promisify(childProcess.exec);
const helloWorldCode = fs.readFileSync('assets/bf/hello-world.bf')
  .toString();
const bracketMismatchCode = fs.readFileSync('assets/bf/invalid1.bf').toString();
const userInputCode = fs.readFileSync('assets/bf/user-input.bf').toString();
const executableFile = 'test_cpp.exe';
const sourceFile = 'test_cpp.cpp';
const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;

function checkGeneratedCode(codeToCheck: string) {
  beforeAll(() => fsPromises.writeFile(sourceFile, codeToCheck));
  afterAll(() => Promise.all([
    fsPromises.unlink(executableFile),
    fsPromises.unlink(sourceFile),
  ]));
  it('Generates valid & correct code', async () => {
    await cppUtils.compileWithGPlus(sourceFile, executableFile, true);
    const { stdout } = await exec(commandToRun);
    expect(stdout.trim()).toBe('Hello World!');
  });
}

describe('Compilation to C++', () => {
  describe('Error handling', () => {
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => compileToCpp(bracketMismatchCode))
        .toThrow(BracketMismatchError);
    });
  });
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(compileToCpp(helloWorldCode));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(compileToCpp(helloWorldCode, false));
  });
  describe('Code generation (with user input)', () => {
    const inputChar = 'a';
    const runGeneratedApp = () => new Promise((resolve, reject) => {
      const child = childProcess.exec(`${commandToRun}`, (error, stdout) => {
        if (error) {
          reject(error);
        }
        resolve(stdout);
      });
      child.stdin?.write(`${inputChar}\n`);
    });
    beforeAll(() => {
      const outputCode = compileToCpp(userInputCode);
      return fsPromises.writeFile(sourceFile, outputCode);
    });
    afterAll(() => Promise.all([
      fsPromises.unlink(sourceFile),
      fsPromises.unlink(executableFile),
    ]));
    it('Generates valid code', async () => {
      await cppUtils.compileWithGPlus(sourceFile, executableFile, true);
      const output = await runGeneratedApp();
      expect(output).toBe(inputChar);
    });
  });
});
