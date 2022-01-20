function genIndent(depth, size, char = ' ') {
  return Array(depth * size + 1).join(char);
}

/**
 * Validates a Brainfuck program by looking for umatched loop starts/ends.
 *
 * @param {string} source Brainfuck source-code to validate.
 * @returns {boolean} True if the program is valid, false if it's not.
 */
function isValidProgram(source) {
  const sourceArray = Array.from(source);
  const numOfLoopStarts = sourceArray.reduce((previousVal, currentVal) => (currentVal === '[' ? previousVal + 1 : previousVal), 0);
  const numOfLoopEnds = sourceArray.reduce((previousVal, currentVal) => (currentVal === ']' ? previousVal + 1 : previousVal), 0);

  return numOfLoopStarts === numOfLoopEnds;
}

/**
 * Converts a Brainfuck program to a JavaScript function.
 *
 * @param {string} source Brainfuck source-code to convert.
 * @param {string} funcName Output function name (default = 'run').
 * @param {number} indentSize Indentation size (default = 2).
 * @param {string} indentChar Indentation character (default is space).
 * @returns {string} The generated function (in source form).
 */
function transpileToJS(source, funcName = 'run', indentSize = 2, indentChar = ' ') {
  const sourceArray = Array.from(source);

  const outputCodeArray = [
    `function ${funcName}() {`,
    `${genIndent(1, indentSize, indentChar)}var cells = [0];`,
    `${genIndent(1, indentSize, indentChar)}var position = 0;`,
    `${genIndent(1, indentSize, indentChar)}var output = "";`,
    '',
  ];

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    switch (command) {
      case '>':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (position + 1 === cells.length) cells.push(0);`);
          outputCodeArray.push(`${indent}++position;`);
        }
        break;

      case '<':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (position > 0) --position;`);
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
          outputCodeArray.push(`${indent}output += String.fromCharCode(cells[position]);`);
        }
        break;

      case '[':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}while (cells[position] > 0) {`);
          currentDepth += 1;
        }
        break;

      case ']':
        {
          currentDepth = currentDepth > 0 ? currentDepth - 1 : 0;
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}}`);
        }
        break;

      default:
    }
  });

  outputCodeArray.push('');
  outputCodeArray.push(`${genIndent(1, indentSize, indentChar)}return {cells, output};`);
  outputCodeArray.push('}\n');

  return outputCodeArray.join('\n');
}

/**
 * Converts a Brainfuck program to a Python script.
 *
 * @param {string} source Brainfuck source-code to convert.
 * @returns {string} The generated Python code.
 */
function transpileToPython(source) {
  const sourceArray = Array.from(source);
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

/**
 * Converts a Brainfuck program to C code.
 *
 * @param {string} source Brainfuck source-code to convert.
 * @returns {string} The generated C code.
 */
function transpileToC(source) {
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
}

/**
 * Converts a Brainfuck program to C++ code.
 *
 * @param {string} source Brainfuck source-code to convert.
 * @returns {string} The generated C code.
 */
function transpileToCpp(source) {
  const sourceArray = Array.from(source);
  const indentSize = 4;
  const indentChar = ' ';

  const outputCodeArray = [
    '#include <cstdio>',
    '#include <vector>',
    '',
    'auto main() -> int',
    '{',
    `${genIndent(1, indentSize, indentChar)}std::vector<char> cells { 0 };`,
    `${genIndent(1, indentSize, indentChar)}auto ptr = cells.begin();`,
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
          outputCodeArray.push(`${indent}++ptr;`);
          outputCodeArray.push(`${indent}++position;`);
        }
        break;

      case '<':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (position - 1 >= 0)`);
          outputCodeArray.push(`${indent}{`);
          outputCodeArray.push(`${indent + genIndent(1, indentSize, indentChar)} --ptr;`);
          outputCodeArray.push(`${indent + genIndent(1, indentSize, indentChar)} --position;`);
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
          outputCodeArray.push(`${indent}std::putchar(*ptr);`);
        }
        break;

      case ',':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}*ptr = std::getchar();`);
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

module.exports = {
  isValidProgram,
  transpileToJS,
  transpileToPython,
  transpileToC,
  transpileToCpp,
};
