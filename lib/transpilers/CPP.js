const { genIndent } = require('../utils');

/**
 * Converts a Brainfuck program to C++ code.
 *
 * @param {string} source Brainfuck source-code to convert.
 * @returns {string} The generated C code.
 */
module.exports = function transpileToCpp(source) {
  const sourceArray = Array.from(source);
  const indentSize = 4;
  const indentChar = ' ';

  const outputCodeArray = [
    '#include <iostream>',
    '#include <cstdio>',
    '#include <vector>',
    '',
    'auto main() -> int',
    '{',
    `${genIndent(1, indentSize, indentChar)}std::vector<char> cells { 0 };`,
    `${genIndent(1, indentSize, indentChar)}int position = 0;`,
    '',
  ];

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    switch (command) {
      case '>':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (position + 1 == cells.size()) cells.push_back(0);`);
          outputCodeArray.push(`${indent}++position;`);
        }
        break;

      case '<':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (position - 1 >= 0) --position;`);
        }
        break;

      case '+':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (cells[position] < 255) ++cells[position];`);
        }
        break;

      case '-':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (cells[position] > 0) --cells[position];`);
        }
        break;

      case '.':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}std::cout << cells[position];`);
        }
        break;

      case ',':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}cells[position] = std::getchar();`);
        }
        break;

      case '[':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}while (cells[position] > 0)`);
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
