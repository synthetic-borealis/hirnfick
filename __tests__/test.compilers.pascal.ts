import * as pascalUtils from 'pascal-utils';
import fsPromises from 'fs/promises';
import fs from 'fs';
import util from 'util';
import childProcess from 'child_process';
import { BracketMismatchError, compileToPascal } from '../src';

const exec = util.promisify(childProcess.exec);
// function exec(command: string): Promise<{ stdout: string }> {
//   return new Promise((resolve, reject) => {
//     childProcess.exec(command, (error, stdout) => {
//       if (error) {
//         reject(error);
//       }
//       resolve({ stdout: stdout.toString('utf8') });
//     });
//   });
// }
const helloWorldCode = fs.readFileSync('assets/bf/hello-world.bf')
  .toString();
const bracketMismatchCode = fs.readFileSync('assets/bf/invalid1.bf').toString();
const userInputCode = fs.readFileSync('assets/bf/user-input.bf').toString();
const executableFile = 'test_pas.exe';
const sourceFile = 'test_pas.pas';
const objectFile = 'test_pas.o';
const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;

describe('Compilation to Pascal', () => {
  describe('Error handling', () => {
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => compileToPascal(bracketMismatchCode))
        .toThrow(BracketMismatchError);
    });
  });
  describe('Code generation', () => {
    const outputCode = compileToPascal(helloWorldCode, 'Test');
    beforeAll(() => fsPromises.writeFile(sourceFile, outputCode));
    afterAll(() => Promise.all([
      fsPromises.unlink(sourceFile),
      fsPromises.unlink(objectFile),
      fsPromises.unlink(executableFile),
    ]));
    it('Generates valid & correct code', async () => {
      await pascalUtils.compile(sourceFile, executableFile);
      const { stdout } = await exec(commandToRun);
      expect(stdout.trim()).toBe('Hello World!');
    });
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
      const outputCode = compileToPascal(userInputCode, 'Test');
      return fsPromises.writeFile(sourceFile, outputCode);
    });
    afterAll(() => Promise.all([
      fsPromises.unlink(sourceFile),
      fsPromises.unlink(objectFile),
      fsPromises.unlink(executableFile),
    ]));
    it('Generates valid & correct code', async () => {
      const output = await runGeneratedApp();
      expect(output).toBe(inputChar);
    });
  });
});
