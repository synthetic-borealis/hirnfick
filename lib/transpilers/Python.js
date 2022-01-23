const WrongInputTypeError = require('../errors/wrongInputType');
const BracketMismatchError = require('../errors/bracketMismatch');
const { isStringArray, isValidProgram } = require('../validation');
const { genIndent } = require('../utils');

/**
 * Converts a Brainfuck program to a Python.
 * @param {string | Array<string>} source Brainfuck source to convert.
 * @returns {string} Generated Python code.
 * @throws {WrongInputTypeError} Input must be a string or an array of strings.
 * @throws {BracketMismatchError} Loop starts must have matching loop ends and vice versa.
 */
function transpileToPython(source) {
  if (typeof source !== 'string' && !isStringArray()) {
    throw new WrongInputTypeError('Input must be either a string or an array of strings');
  }
  const sourceArray = typeof source === 'string' ? Array.from(source) : source;

  if (!isValidProgram(sourceArray)) {
    throw new BracketMismatchError();
  }

  const indentSize = 4;
  const indentChar = ' ';

  const outputCodeArray = [
    'import sys',
    '',
    'cells = [0]',
    'position = 0',
    '',
  ];

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    switch (command) {
      case '>':
        {
          const indent = genIndent(currentDepth, indentSize, indentChar);
          outputCodeArray.push(`${indent}if position + 1 == len(cells):`);
          outputCodeArray.push(`${indent}${genIndent(1, indentSize, indentChar)}cells.append(0)`);
          outputCodeArray.push(`${indent}`);
          outputCodeArray.push(`${indent}position += 1`);
        }
        break;

      case '<':
        {
          const indent = genIndent(currentDepth, indentSize, indentChar);
          outputCodeArray.push(`${indent}position = position - 1 if position > 0 else position`);
        }
        break;

      case '+':
        {
          const indent = genIndent(currentDepth, indentSize, indentChar);
          outputCodeArray.push(`${indent}cells[position] = cells[position] + 1 if cells[position] < 255 else cells[position]`);
        }
        break;

      case '-':
        {
          const indent = genIndent(currentDepth, indentSize, indentChar);
          outputCodeArray.push(`${indent}cells[position] = cells[position] - 1 if cells[position] > 0 else cells[position]`);
        }
        break;

      case '.':
        {
          const indent = genIndent(currentDepth, indentSize, indentChar);
          outputCodeArray.push(`${indent}sys.stdout.write(chr(cells[position]))`);
          outputCodeArray.push(`${indent}sys.stdout.flush()`);
        }
        break;

      case '[':
        {
          const indent = genIndent(currentDepth, indentSize, indentChar);
          outputCodeArray.push(`${indent}while cells[position] > 0:`);
          currentDepth += 1;
        }
        break;

      case ']':
        currentDepth = currentDepth > 0 ? currentDepth - 1 : 0;
        outputCodeArray.push('');
        break;

      default:
    }
  });

  outputCodeArray.push('\n');

  return outputCodeArray.join('\n');
}

module.exports = transpileToPython;
