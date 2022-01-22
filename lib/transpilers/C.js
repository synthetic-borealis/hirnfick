const { genIndent } = require('../utils');

/**
 * Converts a Brainfuck program to C code.
 *
 * @param {string} source Brainfuck source-code to convert.
 * @returns {string} The generated C code.
 */
module.exports = function transpileToC(source) {
  const sourceArray = Array.from(source);
  const indentSize = 4;
  const indentChar = ' ';

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
};
