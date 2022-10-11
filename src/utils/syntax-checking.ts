/**
 * Checks whether a program contains mismatching loop boundaries.
 * @category Syntax Checking
 * @param {string} source Brainfuck source to check.
 * @returns {boolean} True if the program contains mismatching loop boundaries,
 * false if it doesn't.
 */
export function hasMismatchingLoopBoundaries(source: string): boolean {
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

/**
 * Checks whether a program contains infinite loops.
 * @category Syntax Checking
 * @param {string} source Brainfuck source to check.
 * @returns {boolean} True if the program is contains an infinite loop, false if it doesn't.
 */
export function hasInfiniteLoops(source: string): boolean {
  const infiniteLoopRegex = /\[[+.]*]/gm;
  return source.search(infiniteLoopRegex) > -1;
}
