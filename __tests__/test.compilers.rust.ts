import fsPromises from 'fs/promises';
import fs from 'fs';
import util from 'util';
import childProcess from 'child_process';
import { BracketMismatchError, compileToRust } from '../src';

const exec = util.promisify(childProcess.exec);

const helloWorldCode = fs.readFileSync('assets/bf/hello-world.bf')
  .toString();
const bracketMismatchCode = '>>+++[[<-->]';
const userInputCode = ',.';
const exeExtension = process.platform === 'win32' ? '.exe' : '';
const executableFile = `test_rs${exeExtension}`;
const sourceFile = 'test_rs.rs';
const compileCommand = `rustc -o ${executableFile} ${sourceFile}`;
const runCommand = process.platform === 'win32' ? executableFile : `./${executableFile}`;

describe('Compilation to Rust', () => {
  describe('Error handling', () => {
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => compileToRust(bracketMismatchCode))
        .toThrow(BracketMismatchError);
    });
  });
  describe('Code generation', () => {
    beforeAll(() => {
      const outputCode = compileToRust(helloWorldCode);
      return fsPromises.writeFile(sourceFile, outputCode);
    });
    afterAll(() => Promise.all([
      fsPromises.unlink(sourceFile),
      fsPromises.unlink(executableFile),
    ]));
    it(
      'Generates valid & correct code',
      () => exec(compileCommand)
        .then(() => exec(runCommand))
        .then(({ stdout }) => {
          expect(stdout.trim())
            .toBe('Hello World!');
        }),
      7000,
    );
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
    it(
      'Generates valid & correct code',
      () => exec(compileCommand)
        .then(() => wrapper())
        .then((out) => expect(out)
          .toBe(inputChar)),
      7000,
    );
  });
});
