/**
 * Checks whether a program contains mismatching loop boundaries.
 * @category Syntax Checking
 * @param {string} source Brainfuck source-code to validate.
 * @returns {boolean} True if the program is valid, false if it's not.
 */
export default function hasMismatchingLoopBoundaries(source: string): boolean {
  const sourceArray = Array.from(source);
  let numOfLoops = 0;
  for (let i = 0; i < sourceArray.length; i += 1) {
    if (sourceArray[i] === '[') {
      numOfLoops += 1;
    } else if (sourceArray[i] === ']') {
      numOfLoops -= 1;
    }
    if (numOfLoops < 0) {
      return true;
    }
  }
  return numOfLoops !== 0;
}
