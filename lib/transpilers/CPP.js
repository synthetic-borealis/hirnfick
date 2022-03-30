const WrongInputTypeError = require('../errors/wrongInputType');
const BracketMismatchError = require('../errors/bracketMismatch');
const { isStringArray, isValidProgram } = require('../validation');
const { genIndent } = require('../utils');

/**
 * Converts a Brainfuck program to C++.
 * @param {string | Array<string>} source Brainfuck source to convert.
 * @param {number} indentSize Indentation size.
 * @param {string} indentChar Indentation character.
 * @returns {string} Generated C++ code.
 * @throws {WrongInputTypeError} Input must be a string or an array of strings.
 * @throws {BracketMismatchError} Loop starts must have matching loop ends and vice versa.
 */
function transpileToCpp(source, indentSize = 1, indentChar = '\t') {
  if (typeof source !== 'string' && !isStringArray()) {
    throw new WrongInputTypeError('Input must be either a string or an array of strings');
  }
  const sourceArray = typeof source === 'string' ? Array.from(source) : source;

  if (!isValidProgram(sourceArray)) {
    throw new BracketMismatchError();
  }

  let indent = genIndent(1, indentSize, indentChar);

  const outputCodeArray = [
    '#include <iostream>',
    '#include <cstdio>',
    '#include <vector>',
    '',
    'auto main() -> int',
    '{',
    `${indent}std::vector<char> cells { 0 };`,
    `${indent}int position = 0;`,
    '',
  ];

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    indent = genIndent(currentDepth + 1, indentSize, indentChar);
    switch (command) {
      case '>':
        outputCodeArray.push(`${indent}if (position + 1 == cells.size())`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}cells.push_back(0);`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}++position;`);
        break;

      case '<':
        outputCodeArray.push(`${indent}if (position - 1 >= 0)`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}--position;`);
        break;

      case '+':
        outputCodeArray.push(`${indent}if (cells[position] < 255)`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}++cells[position];`);
        break;

      case '-':
        outputCodeArray.push(`${indent}if (cells[position] > 0)`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}--cells[position];`);
        break;

      case '.':
        outputCodeArray.push(`${indent}std::cout << cells[position];`);
        break;

      case ',':
        outputCodeArray.push(`${indent}cells[position] = std::getchar();`);
        break;

      case '[':
        outputCodeArray.push(`${indent}while (cells[position] > 0)`);
        outputCodeArray.push(`${indent}{`);
        currentDepth += 1;
        break;

      case ']':
        currentDepth = currentDepth > 0 ? currentDepth - 1 : 0;
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        outputCodeArray.push('');
        break;

      default:
    }
  });

  outputCodeArray.push('\n}\n');

  return outputCodeArray.join('\n');
}

module.exports = transpileToCpp;
