import fs from 'fs';
import { hasMismatchingLoopBoundaries, hasInfiniteLoops } from '../src';

const helloWorldSourceFile = 'assets/bf/hello-world.bf';
const invalidSourceFile1 = 'assets/bf/invalid1.bf';
const invalidSourceFile2 = 'assets/bf/invalid2.bf';
const infiniteLoopSourceFile = 'assets/bf/infinite-loop.bf';
const helloWorldCode = fs.readFileSync(helloWorldSourceFile).toString();
const invalidCode1 = fs.readFileSync(invalidSourceFile1).toString();
const invalidCode2 = fs.readFileSync(invalidSourceFile2).toString();
const infiniteLoopCode = fs.readFileSync(infiniteLoopSourceFile).toString();

describe('Syntax checking tests', () => {
  describe('hasMismatchingLoopBoundaries tests', () => {
    it('Returns false for valid programs', () => {
      expect(hasMismatchingLoopBoundaries(helloWorldCode))
        .toBeFalsy();
    });
    it('Returns true for invalid programs', () => {
      expect(hasMismatchingLoopBoundaries(invalidCode1))
        .toBeTruthy();
      expect(hasMismatchingLoopBoundaries(invalidCode2))
        .toBeTruthy();
    });
  });
  describe('hasInfiniteLoops', () => {
    it('Returns true when code contains an infinite loop', () => {
      expect(hasInfiniteLoops(infiniteLoopCode)).toBeTruthy();
    });
    it('Returns false when code does not contain an infinite loop', () => {
      expect(hasInfiniteLoops(helloWorldCode)).toBeFalsy();
    });
  });
});
