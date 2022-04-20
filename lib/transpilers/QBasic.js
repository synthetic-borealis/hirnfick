const WrongInputTypeError = require('../errors/wrongInputType');
const BracketMismatchError = require('../errors/bracketMismatch');
const { isValidProgram } = require('../validation');
const { genIndent } = require('../utils');
const { cleanCode } = require('../cleanup');

/**
 * Converts a Brainfuck program to QBasic.
 * @param {string} source Brainfuck source to convert.
 * @param {boolean} useDynamicMemory Enable dynamic memory array.
 * @param {number} indentSize Indentation size.
 * @param {string} indentChar Indentation character.
 * @returns {string} Generated QBasic code.
 * @throws {WrongInputTypeError} Input must be a string.
 * @throws {BracketMismatchError} Loop starts must have matching loop ends and vice versa.
 */
function transpileToQBasic(source, useDynamicMemory = false, indentSize = 2, indentChar = ' ') {
  if (typeof source !== 'string') {
    throw new WrongInputTypeError('Input must be a string');
  }
  const cleanSource = cleanCode(source);
  const sourceArray = Array.from(cleanSource);

  if (!isValidProgram(sourceArray)) {
    throw new BracketMismatchError();
  }

  let outputCodeArray;
  if (useDynamicMemory) {
    outputCodeArray = [
      '\'$LANG: "qb"',
      '\'$DYNAMIC',
      'DIM cells(0) AS INTEGER',
      'DIM curPos AS LONG\n',
    ];
  } else {
    outputCodeArray = [
      'CONST NumberOfCells = 30000',
      'CONST CellsUBound = NumberOfCells - 1',
      'DIM cells(CellsUBound) AS INTEGER',
      'DIM curPos AS LONG\n',
    ];
  }

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    let indent = genIndent(currentDepth, indentSize, indentChar);

    switch (command) {
      case '>':
        if (useDynamicMemory) {
          outputCodeArray.push(`${indent}curPos = curPos + 1`);
          outputCodeArray.push(`${indent}IF curPos > UBOUND(cells) THEN REDIM PRESERVE cells(curPos) AS INTEGER`);
        } else {
          outputCodeArray.push(`${indent}IF curPos < CellsUBound THEN curPos = curPos + 1`);
        }
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

module.exports = transpileToQBasic;
