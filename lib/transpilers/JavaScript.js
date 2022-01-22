const { genIndent } = require('../utils');

/**
 * Converts a Brainfuck program to a JavaScript function.
 *
 * @param {string} source Brainfuck source-code to convert.
 * @param {string} funcName Output function name (default = 'run').
 * @param {number} indentSize Indentation size (default = 2).
 * @param {string} indentChar Indentation character (default is space).
 * @returns {string} The generated function (in source form).
 */
module.exports = function transpileToJS(source, funcName = 'run', indentSize = 2, indentChar = ' ') {
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
};
