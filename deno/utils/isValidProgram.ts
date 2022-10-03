/**
 * Validates a Brainfuck program by looking for unmatched loop starts/ends.
 * @category Validation
 * @param {string} source Brainfuck source-code to validate.
 * @returns {boolean} True if the program is valid, false if it's not.
 */
export default function isValidProgram(source: string): boolean {
  const sourceArray = Array.from(source);
  let numOfLoops = 0;
  for (let i = 0; i < sourceArray.length; i += 1) {
    if (sourceArray[i] === '[') {
      numOfLoops += 1;
    } else if (sourceArray[i] === ']') {
      numOfLoops -= 1;
    }
    if (numOfLoops < 0) {
      return false;
    }
  }
  return numOfLoops === 0;
}
