import * as cppUtils from 'cpp-utils';
import fsPromises from 'fs/promises';
import fs from 'fs';
import util from 'util';
import childProcess from 'child_process';
import { BracketMismatchError, transpileToC } from '../src';

const exec = util.promisify(childProcess.exec);

const helloWorldCode = fs.readFileSync('assets/bf/hello-world.bf')
  .toString();
const bracketMismatchCode = '>>+++[[<-->]';
const userInputCode = ',.';
const exeExtension = process.platform === 'win32' ? '.exe' : '';
const executableFile = `test_c${exeExtension}`;
const sourceFile = 'test_c.c';
const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;

describe('C transpiler', () => {
  describe('Error handling', () => {
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => transpileToC(bracketMismatchCode))
        .toThrow(BracketMismatchError);
    });
  });
  describe('Code generation', () => {
    beforeAll(() => {
      const outputCode = transpileToC(helloWorldCode);
      return fsPromises.writeFile(sourceFile, outputCode);
    });
    afterAll(() => Promise.all([
      fsPromises.unlink(sourceFile),
      fsPromises.unlink(executableFile),
    ]));
    it(
      'Generates valid & correct code',
      () => cppUtils.compileWithGcc(sourceFile, executableFile, true)
        .then(() => exec(commandToRun))
        .then(({ stdout }) => {
          expect(stdout.trim())
            .toBe('Hello World!');
        }),
    );
  });
  describe('Code generation (with user input)', () => {
    const inputChar = 'a';
    const wrapper = () => new Promise((resolve, reject) => {
      const child = childProcess.exec(`${commandToRun}`, (error, stdout) => {
        if (error) {
          reject(error);
        }
        resolve(stdout);
      });
      child.stdin?.write(`${inputChar}\n`);
    });
    beforeAll(() => {
      const outputCode = transpileToC(userInputCode);
      return fsPromises.writeFile(sourceFile, outputCode);
    });
    // noinspection DuplicatedCode
    afterAll(() => Promise.all([
      fsPromises.unlink(sourceFile),
      fsPromises.unlink(executableFile),
    ]));
    it(
      'Generates valid & correct code',
      () => cppUtils.compileWithGcc(sourceFile, executableFile, true)
        .then(() => wrapper())
        .then((out) => expect(out)
          .toBe(inputChar)),
    );
  });
});
