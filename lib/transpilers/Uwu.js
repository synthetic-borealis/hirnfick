const WrongInputTypeError = require('../errors/wrongInputType');
const BracketMismatchError = require('../errors/bracketMismatch');
const { isStringArray, isValidProgram } = require('../validation');

/**
 * Converts a Brainfuck program to UwU.
 * @param {string | Array<string>} source Brainfuck source to convert.
 * @returns {string} Generated UwU code.
 * @throws {WrongInputTypeError} Input must be a string or an array of strings.
 * @throws {BracketMismatchError} Loop starts must have matching loop ends and vice versa.
 */
function transpileToUwu(source) {
  if (typeof source !== 'string' && !isStringArray()) {
    throw new WrongInputTypeError('Input must be either a string or an array of strings');
  }
  const sourceArray = typeof source === 'string' ? Array.from(source) : source;

  if (!isValidProgram(sourceArray)) {
    throw new BracketMismatchError();
  }

  return sourceArray.map((value) => {
    switch (value) {
      case '<':
        return 'OwO';

      case '>':
        return '°w°';

      case '+':
        return 'UwU';

      case '-':
        return 'QwQ';

      case '.':
        return '@w@';

      case ',':
        return '>w<';

      case '[':
        return '~w~';

      case ']':
        return '¯w¯';

      default:
        return '';
    }
  }).join(' ');
}

module.exports = transpileToUwu;
