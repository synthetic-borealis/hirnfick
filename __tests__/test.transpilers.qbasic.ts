import fsPromises from 'fs/promises';
import fs from 'fs';
import util from 'util';
import childProcess from 'child_process';
import { BracketMismatchError, transpileToQBasic } from '../src';

const exec = util.promisify(childProcess.exec);

const helloWorldCode = fs.readFileSync('assets/bf/hello-world.bf')
  .toString();
const bracketMismatchCode = '>>+++[[<-->]';
const userInputCode = ',.';
const exeExtension = process.platform === 'win32' ? '.exe' : '';
const executableFile = `test_bas${exeExtension}`;
const sourceFile = 'test_bas.bas';
const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;

function checkGeneratedCode(codeToCheck: string) {
  beforeAll(() => fsPromises.writeFile(sourceFile, codeToCheck));
  afterAll(() => Promise.all([
    fsPromises.unlink(executableFile),
    fsPromises.unlink(sourceFile),
  ]));
  it('Generates valid & correct code', () => exec(`fbc ${sourceFile} -x ${executableFile}`)
    .then(() => exec(commandToRun))
    .then(({ stdout }) => {
      expect(stdout.trim())
        .toBe('Hello World!');
    }));
}

describe('QBasic transpiler', () => {
  describe('Error handling', () => {
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => transpileToQBasic(bracketMismatchCode))
        .toThrow(BracketMismatchError);
    });
  });
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(transpileToQBasic(helloWorldCode, true));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(transpileToQBasic(helloWorldCode));
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
      const generatedCode = transpileToQBasic(userInputCode);
      return fsPromises.writeFile(sourceFile, generatedCode);
    });
    afterAll(() => Promise.all([
      fsPromises.unlink(executableFile),
      fsPromises.unlink(sourceFile),
    ]));
    it('Generates valid & correct code', () => exec(`fbc ${sourceFile} -x ${executableFile}`)
      .then(() => wrapper())
      .then((out) => expect(out)
        .toBe(inputChar)));
  });
});