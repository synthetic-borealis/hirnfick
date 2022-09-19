import fsPromises from 'fs/promises';
import fs from 'fs';
import util from 'util';
import childProcess from 'child_process';

import { BracketMismatchError, compileToKotlin } from '../src';

const exec = util.promisify(childProcess.exec);

const helloWorldCode = fs.readFileSync('assets/bf/hello-world.bf')
  .toString();
const bracketMismatchCode = '>>+++[[<-->]';
const userInputCode = ',.';
const jarFile = 'test_kotlin.jar';
const sourceFile = 'test_kotlin.kt';
const runCommand = `kotlin ${jarFile}`;
const compileCommand = `kotlinc ${sourceFile} -include-runtime -d ${jarFile}`;

function checkGeneratedCode(codeToCheck: string) {
  beforeAll(() => fsPromises.writeFile(sourceFile, codeToCheck));
  afterAll(() => Promise.all([
    fsPromises.unlink(sourceFile),
    fsPromises.unlink(jarFile),
  ]));
  it('Generates valid & correct code', () => exec(compileCommand)
    .then(() => exec(runCommand))
    .then(({ stdout }) => {
      expect(stdout.trim())
        .toBe('Hello World!');
    }), 35000);
}

describe('Compilation to Kotlin', () => {
  describe('Error handling', () => {
    it('Throws BracketMismatchError when there\'s a bracket mismatch', () => {
      expect(() => compileToKotlin(bracketMismatchCode))
        .toThrow(BracketMismatchError);
    });
  });
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(compileToKotlin(helloWorldCode));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(compileToKotlin(helloWorldCode, false));
  });
  describe('Code generation (with user input)', () => {
    beforeAll(() => fsPromises.writeFile(sourceFile, compileToKotlin(userInputCode)));
    afterAll(() => Promise.all([
      fsPromises.unlink(sourceFile),
      fsPromises.unlink(jarFile),
    ]));

    it('Generates valid & correct code', () => {
      const inputChar = 'a';
      const wrapper = () => new Promise((resolve, reject) => {
        const child = childProcess.exec(runCommand, (error, stdout) => {
          if (error) {
            reject(error);
          }
          resolve(stdout);
        });
        child.stdin?.write(`${inputChar}\n`);
      });
      return exec(compileCommand)
        .then(wrapper)
        .then((out) => expect(out)
          .toBe(inputChar));
    }, 25000);
  });
});
