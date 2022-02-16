const WrongInputTypeError = require('../errors/wrongInputType');
const BracketMismatchError = require('../errors/bracketMismatch');
const { isStringArray, isValidProgram } = require('../validation');
const { genIndent } = require('../utils');

/**
 * Converts a Brainfuck program to a JavaScript function.
 * @param {string | Array<string>} source Brainfuck source to convert.
 * @param {string} funcName Output function name (default = 'run').
 * @param {number} indentSize Indentation size (default = 2).
 * @param {string} indentChar Indentation character (default is space).
 * @returns {string} Generated JavaScript function source.
 * @throws {WrongInputTypeError} Input must be a string or an array of strings.
 * @throws {BracketMismatchError} Loop starts must have matching loop ends and vice versa.
 */
function transpileToJavaScript(source, funcName = 'run', indentSize = 2, indentChar = ' ') {
  if (typeof source !== 'string' && !isStringArray()) {
    throw new WrongInputTypeError('Input must be either a string or an array of strings');
  }
  const sourceArray = typeof source === 'string' ? Array.from(source) : source;

  if (!isValidProgram(sourceArray)) {
    throw new BracketMismatchError();
  }

  let indent = genIndent(1, indentSize, indentChar);

  const outputCodeArray = [
    `function ${funcName}() {`,
    `${indent}var cells = [0];`,
    `${indent}var position = 0;`,
    `${indent}var output = "";`,
    '',
  ];

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    indent = genIndent(currentDepth + 1, indentSize, indentChar);
    switch (command) {
      case '>':
        outputCodeArray.push(`${indent}if (position + 1 === cells.length) cells.push(0);`);
        outputCodeArray.push(`${indent}++position;`);
        break;

      case '<':
        outputCodeArray.push(`${indent}if (position > 0) --position;`);
        break;

      case '+':
        outputCodeArray.push(`${indent}if (cells[position] < 255) ++cells[position];`);
        break;

      case '-':
        outputCodeArray.push(`${indent}if (cells[position] > 0) --cells[position];`);
        break;

      case '.':
        outputCodeArray.push(`${indent}output += String.fromCharCode(cells[position]);`);
        break;

      case '[':
        outputCodeArray.push(`${indent}while (cells[position] > 0) {`);
        currentDepth += 1;
        break;

      case ']':
        currentDepth = currentDepth > 0 ? currentDepth - 1 : 0;
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      default:
    }
  });

  indent = genIndent(1, indentSize, indentChar);

  outputCodeArray.push('');
  outputCodeArray.push(`${indent}return {cells, output};`);
  outputCodeArray.push('}\n');

  return outputCodeArray.join('\n');
}

module.exports = transpileToJavaScript;
