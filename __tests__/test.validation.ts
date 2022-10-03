import fs from 'fs';
import { isValidProgram } from '../src';

const helloWorldSourceFile = 'assets/bf/hello-world.bf';
const invalidSourceFile1 = 'assets/bf/invalid1.bf';
const invalidSourceFile2 = 'assets/bf/invalid2.bf';

let helloWorldCode: string;
let invalidCode1: string;
let invalidCode2: string;

describe('Utility function tests', () => {
  describe('isValidProgram tests', () => {
    beforeAll(() => {
      helloWorldCode = fs.readFileSync(helloWorldSourceFile).toString();
      invalidCode1 = fs.readFileSync(invalidSourceFile1).toString();
      invalidCode2 = fs.readFileSync(invalidSourceFile2).toString();
    });
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
