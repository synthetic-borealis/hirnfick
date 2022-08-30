const WrongInputTypeError = require('../errors/wrongInputType');
const BracketMismatchError = require('../errors/bracketMismatch');
const { isValidProgram } = require('../validation');
const { genIndent } = require('../utils');
const { cleanCode } = require('../cleanup');

/**
 * Converts a Brainfuck program to a Python.
 * @param {string} source Brainfuck source to convert.
 * @param {boolean} useDynamicMemory Enable dynamic memory array.
 * @returns {string} Generated Python code.
 * @throws {WrongInputTypeError} Input must be a string.
 * @throws {BracketMismatchError} Loop starts must have matching loop ends and vice versa.
 */
function transpileToPython(source, useDynamicMemory = true) {
  if (typeof source !== 'string') {
    throw new WrongInputTypeError('Input must be a string');
  }
  const cleanSource = cleanCode(source);
  const sourceArray = Array.from(cleanSource);

  if (!isValidProgram(cleanSource)) {
    throw new BracketMismatchError();
  }

  const indentSize = 4;
  const indentChar = ' ';

  const outputCodeArray = [
    'import sys',
    '',
    'position = 0',
  ];

  if (useDynamicMemory) {
    outputCodeArray.push('cells = [0]');
    outputCodeArray.push('');
  } else {
    outputCodeArray.push('cells = [0] * 30000');
    outputCodeArray.push('');
  }

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    const indent = genIndent(currentDepth, indentSize, indentChar);

    switch (command) {
      case '>':
        if (useDynamicMemory) {
          outputCodeArray.push(`${indent}if position + 1 == len(cells):`);
          outputCodeArray.push(`${indent}${genIndent(1, indentSize, indentChar)}cells.append(0)`);
          outputCodeArray.push(`${indent}`);
          outputCodeArray.push(`${indent}position += 1`);
        } else {
          outputCodeArray.push(`${indent}if position + 1 < len(cells):`);
          outputCodeArray.push(`${indent}${genIndent(1, indentSize, indentChar)}position += 1`);
        }
        break;

      case '<':
        outputCodeArray.push(`${indent}position = position - 1 if position > 0 else position`);
        break;

      case '+':
        outputCodeArray.push(`${indent}cells[position] = cells[position] + 1 if cells[position] < 255 else cells[position]`);
        break;

      case '-':
        outputCodeArray.push(`${indent}cells[position] = cells[position] - 1 if cells[position] > 0 else cells[position]`);
        break;

      case '.':
        outputCodeArray.push(`${indent}sys.stdout.write(chr(cells[position]))`);
        outputCodeArray.push(`${indent}sys.stdout.flush()`);
        break;

      case ',':
        outputCodeArray.push(`${indent}cells[position] = ord(sys.stdin.read(1))`);
        outputCodeArray.push(`${indent}sys.stdout.flush()`);
        break;

      case '[':
        outputCodeArray.push(`${indent}while cells[position] > 0:`);
        currentDepth += 1;
        break;

      case ']':
        currentDepth = Math.max(currentDepth - 1, 0);
        outputCodeArray.push('');
        break;

      // skip default case
    }
  });

  outputCodeArray.push('\n');

  return outputCodeArray.join('\n');
}
module.exports = transpileToPython;
