import * as cppUtils from 'cpp-utils';
import fsPromises from 'fs/promises';
import fs from 'fs';
import util from 'util';
import childProcess from 'child_process';
import { BracketMismatchError, compileToCpp } from '../src';

const exec = util.promisify(childProcess.exec);

const helloWorldCode = fs.readFileSync('assets/bf/hello-world.bf')
  .toString();
const bracketMismatchCode = '>>+++[[<-->]';
const userInputCode = ',.';
const exeExtension = process.platform === 'win32' ? '.exe' : '';
const executableFile = `test_cpp${exeExtension}`;
const sourceFile = 'test_cpp.cpp';
const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;

function checkGeneratedCode(codeToCheck: string) {
  beforeAll(() => fsPromises.writeFile(sourceFile, codeToCheck));
  afterAll(() => Promise.all([
    fsPromises.unlink(executableFile),
    fsPromises.unlink(sourceFile),
  ]));
  it(
    'Generates valid & correct code',
    () => cppUtils.compileWithGPlus(sourceFile, executableFile, true)
      .then(() => exec(commandToRun))
      .then(({ stdout }) => {
        expect(stdout.trim())
          .toBe('Hello World!');
      }),
  );
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
      const outputCode = compileToCpp(userInputCode);
      return fsPromises.writeFile(sourceFile, outputCode);
    });
    // noinspection DuplicatedCode
    afterAll(() => Promise.all([
      fsPromises.unlink(sourceFile),
      fsPromises.unlink(executableFile),
    ]));
    it('Generates valid code', () => cppUtils.compileWithGPlus(sourceFile, executableFile, true)
      .then(() => wrapper())
      .then((out) => expect(out)
        .toBe(inputChar)));
  });
});
