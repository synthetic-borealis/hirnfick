const WrongInputTypeError = require('../errors/wrongInputType');
const BracketMismatchError = require('../errors/bracketMismatch');
const { isStringArray, isValidProgram } = require('../validation');
const { genIndent } = require('../utils');

/**
 * Converts a Brainfuck program to C.
 * @param {string | Array<string>} source Brainfuck source to convert.
 * @param {number} indentSize Indentation size (default = 1).
 * @param {string} indentChar Indentation character (default is tab).
 * @returns {string} Generated C code.
 * @throws {WrongInputTypeError} Input must be a string or an array of strings.
 * @throws {BracketMismatchError} Loop starts must have matching loop ends and vice versa.
 */
function transpileToC(source, indentSize = 1, indentChar = '\t') {
  if (typeof source !== 'string' && !isStringArray()) {
    throw new WrongInputTypeError('Input must be either a string or an array of strings');
  }
  const sourceArray = typeof source === 'string' ? Array.from(source) : source;

  if (!isValidProgram(sourceArray)) {
    throw new BracketMismatchError();
  }

  const outputCodeArray = [
    '#include <stdio.h>',
    '#include <stdlib.h>',
    '',
    'int main()',
    '{',
    `${genIndent(1, indentSize, indentChar)}char array[30000] = {0};`,
    `${genIndent(1, indentSize, indentChar)}char* ptr = array;`,
    `${genIndent(1, indentSize, indentChar)}int position = 0;`,
    '',
  ];

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    switch (command) {
      case '>':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (position + 1 < 30000)`);
          outputCodeArray.push(`${indent}{`);
          outputCodeArray.push(`${indent + genIndent(1, indentSize, indentChar)}++position;`);
          outputCodeArray.push(`${indent + genIndent(1, indentSize, indentChar)}++ptr;`);
          outputCodeArray.push(`${indent}}`);
        }
        break;

      case '<':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (position - 1 >= 0)`);
          outputCodeArray.push(`${indent}{`);
          outputCodeArray.push(`${indent + genIndent(1, indentSize, indentChar)}--position;`);
          outputCodeArray.push(`${indent + genIndent(1, indentSize, indentChar)}--ptr;`);
          outputCodeArray.push(`${indent}}`);
        }
        break;

      case '+':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (*ptr < 255) ++*ptr;`);
        }
        break;

      case '-':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (*ptr > 0) --*ptr;`);
        }
        break;

      case '.':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}putchar(*ptr);`);
        }
        break;

      case ',':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}*ptr = (char)getchar();`);
        }
        break;

      case '[':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}while (*ptr)`);
          outputCodeArray.push(`${indent}{`);
          currentDepth += 1;
        }
        break;

      case ']':
        {
          currentDepth = currentDepth > 0 ? currentDepth - 1 : 0;
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}}`);
          outputCodeArray.push('');
        }
        break;

      default:
    }
  });

  outputCodeArray.push('\n}\n');

  return outputCodeArray.join('\n');
}

module.exports = transpileToC;