import * as pascalUtils from 'pascal-utils';
import fsPromises from 'fs/promises';
import fs from 'fs';
import util from 'util';
import childProcess from 'child_process';
import { BracketMismatchError, compileToPascal } from '../src';

const exec = util.promisify(childProcess.exec);

const helloWorldCode = fs.readFileSync('assets/bf/hello-world.bf')
  .toString();
const bracketMismatchCode = '>>+++[[<-->]';
const userInputCode = ',.';
const exeExtension = process.platform === 'win32' ? '.exe' : '';
const executableFile = `test_pas${exeExtension}`;
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
    it('Generates valid & correct code', () => pascalUtils.compile(sourceFile, executableFile)
      .then(() => exec(commandToRun))
      .then(({ stdout }) => {
        expect(stdout.trim())
          .toBe('Hello World!');
      }));
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
      const outputCode = compileToPascal(userInputCode, 'Test');
      return fsPromises.writeFile(sourceFile, outputCode);
    });
    afterAll(() => Promise.all([
      fsPromises.unlink(sourceFile),
      fsPromises.unlink(objectFile),
      fsPromises.unlink(executableFile),
    ]));
    it('Generates valid & correct code', () => pascalUtils.compile(sourceFile, executableFile)
      .then(() => wrapper())
      .then((out) => expect(out)
        .toBe(inputChar)));
  });
});
