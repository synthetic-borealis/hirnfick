const WrongInputTypeError = require('../errors/wrongInputType');
const BracketMismatchError = require('../errors/bracketMismatch');
const { isValidProgram } = require('../validation');
const { cleanCode } = require('../cleanup');

/**
 * Converts a Brainfuck program to UwU.
 * @param {string} source Brainfuck source to convert.
 * @returns {string} Generated UwU code.
 * @throws {WrongInputTypeError} Input must be a string.
 * @throws {BracketMismatchError} Loop starts must have matching loop ends and vice versa.
 */
function transpileToUwu(source) {
  if (typeof source !== 'string') {
    throw new WrongInputTypeError('Input must be a string');
  }
  const cleanSource = cleanCode(source);
  const sourceArray = Array.from(cleanSource);

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
