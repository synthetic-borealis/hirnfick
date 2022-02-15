const WrongInputTypeError = require('../errors/wrongInputType');
const BracketMismatchError = require('../errors/bracketMismatch');
const { isStringArray, isValidProgram } = require('../validation');
const { genIndent } = require('../utils');

/**
 * Converts a Brainfuck program to QBasic (dynamic cells array).
 * @param {string | Array<string>} source Brainfuck source to convert.
 * @param {number} indentSize Indentation size (default = 1).
 * @param {string} indentChar Indentation character (default is tab).
 * @returns {string} Generated QBasic code.
 * @throws {WrongInputTypeError} Input must be a string or an array of strings.
 * @throws {BracketMismatchError} Loop starts must have matching loop ends and vice versa.
 */
function transpileToQBasicDynamic(source, indentSize = 2, indentChar = ' ') {
  if (typeof source !== 'string' && !isStringArray()) {
    throw new WrongInputTypeError('Input must be either a string or an array of strings');
  }
  const sourceArray = typeof source === 'string' ? Array.from(source) : source;

  if (!isValidProgram(sourceArray)) {
    throw new BracketMismatchError();
  }

  const outputCodeArray = [
    '\'$LANG: "qb"',
    '\'$DYNAMIC',
    'DIM cells(0) AS INTEGER',
    'DIM curPos AS LONG\n',
  ];

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    let indent = genIndent(currentDepth, indentSize, indentChar);

    switch (command) {
      case '>':
        outputCodeArray.push(`${indent}curPos = curPos + 1`);
        outputCodeArray.push(`${indent}IF curPos > UBOUND(cells) THEN REDIM PRESERVE cells(curPos) AS INTEGER`);
        break;

      case '<':
        outputCodeArray.push(`${indent}IF curPos > 0 THEN curPos = curPos - 1`);
        break;

      case '+':
        outputCodeArray.push(`${indent}IF cells(curPos) < 255 THEN cells(curPos) = cells(curPos) + 1`);
        break;

      case '-':
        outputCodeArray.push(`${indent}IF cells(curPos) > 0 THEN cells(curPos) = cells(curPos) - 1`);
        break;

      case '.':
        outputCodeArray.push(`${indent}PRINT CHR$(cells(curPos));`);
        break;

      case ',':
        outputCodeArray.push(`${indent}cells(curPos) = ASC(INPUT$(1))`);
        break;

      case '[':
        outputCodeArray.push(`${indent}WHILE cells(curPos) >= 1`);
        currentDepth += 1;
        break;

      case ']':
        currentDepth = currentDepth > 0 ? currentDepth - 1 : 0;
        indent = genIndent(currentDepth, indentSize, indentChar);
        outputCodeArray.push(`${indent}WEND`);
        break;

      default:
    }
  });

  return outputCodeArray.join('\n');
}

module.exports = transpileToQBasicDynamic;