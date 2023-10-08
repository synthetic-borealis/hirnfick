import fsPromises from 'fs/promises';
import fs from 'fs';
import util from 'util';
import childProcess from 'child_process';
import {BracketMismatchError, compileToRust} from '../src';

const exec = util.promisify(childProcess.exec);
const helloWorldCode = fs.readFileSync('assets/bf/hello-world.bf')
  .toString();
const bracketMismatchCode = fs.readFileSync('assets/bf/invalid1.bf')
  .toString();
const userInputCode = fs.readFileSync('assets/bf/user-input.bf')
  .toString();
const executableFile = 'test_rs.exe';
const sourceFile = 'test_rs.rs';
const compileCommand = `rustc -o ${executableFile} ${sourceFile}`;
const runCommand = process.platform === 'win32' ? executableFile : `./${executableFile}`;

function checkGeneratedCode(codeToCheck: string) {
  beforeAll(() => fsPromises.writeFile(sourceFile, codeToCheck));
  afterAll(() => Promise.all([
    fsPromises.unlink(sourceFile),
    fsPromises.unlink(executableFile),
  ]));
  it('Generates valid & correct code', async () => {
    await exec(compileCommand);
    const {stdout} = await exec(runCommand);
    expect(stdout.trim())
      .toBe('Hello World!');
  });
}

describe('Compilation to Rust', () => {
  describe('Error handling', () => {
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => compileToRust(bracketMismatchCode))
        .toThrow(BracketMismatchError);
    });
  });
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(compileToRust(helloWorldCode));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(compileToRust(helloWorldCode, false));
  });
  describe('Code generation (with user input)', () => {
    const inputChar = 'a';
    const wrapper = () => new Promise((resolve, reject) => {
      const child = childProcess.exec(`${runCommand}`, (error, stdout) => {
        if (error) {
          reject(error);
        }
        resolve(stdout);
      });
      child.stdin?.write(`${inputChar}\n`);
    });
    beforeAll(() => {
      const outputCode = compileToRust(userInputCode);
      return fsPromises.writeFile(sourceFile, outputCode);
    });
    // noinspection DuplicatedCode
    afterAll(() => Promise.all([
      fsPromises.unlink(sourceFile),
      fsPromises.unlink(executableFile),
    ]));
    it('Generates valid & correct code', async () => {
      await exec(compileCommand);
      const output = await wrapper();
      expect(output)
        .toBe(inputChar);
    });
  });
});
