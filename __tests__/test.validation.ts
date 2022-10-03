import fs from 'fs';
import { isValidProgram } from '../src';

const helloWorldSourceFile = 'assets/bf/hello-world.bf';
const invalidSourceFile1 = 'assets/bf/invalid1.bf';
const invalidSourceFile2 = 'assets/bf/invalid2.bf';
const helloWorldCode = fs.readFileSync(helloWorldSourceFile).toString();
const invalidCode1 = fs.readFileSync(invalidSourceFile1).toString();
const invalidCode2 = fs.readFileSync(invalidSourceFile2).toString();

describe('Utility function tests', () => {
  describe('isValidProgram tests', () => {
    it('Accepts valid programs', () => {
      expect(isValidProgram(helloWorldCode))
        .toBeTruthy();
    });
    it('Rejects invalid programs', () => {
      expect(isValidProgram(invalidCode1))
        .toBeFalsy();
      expect(isValidProgram(invalidCode2))
        .toBeFalsy();
    });
  });
});
