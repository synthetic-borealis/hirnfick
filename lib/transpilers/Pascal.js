const WrongInputTypeError = require('../errors/wrongInputType');
const BracketMismatchError = require('../errors/bracketMismatch');
const { isStringArray, isValidProgram } = require('../validation');
const { genIndent } = require('../utils');

function transpileToPascal(source, programName = 'Hirnfick', indentSize = 1, indentChar = '\t') {
  if (typeof source !== 'string' && !isStringArray()) {
    throw new WrongInputTypeError('Input must be either a string or an array of strings');
  }
  const sourceArray = typeof source === 'string' ? Array.from(source) : source;

  if (!isValidProgram(sourceArray)) {
    throw new BracketMismatchError();
  }

  let indent = genIndent(1, indentSize, indentChar);
  const numOfCells = 30000;
  const cellsUBound = numOfCells - 1;
  const outputCodeArray = [
    `program ${programName};`,
    'uses crt;',
    'var',
    `${indent}cells: array[0..${cellsUBound}] of byte;`,
    `${indent}position: integer;`,
    'begin',
  ];

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    indent = genIndent(currentDepth + 1, indentSize, indentChar);

    switch (command) {
      case '>':
        outputCodeArray.push(`${indent}if position + 1 < ${cellsUBound} then inc(position);`);
        break;

      case '<':
        outputCodeArray.push(`${indent}if position > 0 then dec(position);`);
        break;

      case '+':
        outputCodeArray.push(`${indent}if cells[position] < 255 then inc(cells[position]);`);
        break;

      case '-':
        outputCodeArray.push(`${indent}if cells[position] > 0 then dec(cells[position]);`);
        break;

      case '.':
        outputCodeArray.push(`${indent}write(char(cells[position]));`);
        break;

      case ',':
        outputCodeArray.push(`${indent}cells[position] := byte(readkey);`);
        break;

      case '[':
        outputCodeArray.push(`${indent}while cells[position] > 0 do`);
        outputCodeArray.push(`${indent}begin`);
        currentDepth += 1;
        break;

      case ']':
        currentDepth = currentDepth > 0 ? currentDepth - 1 : 0;
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}end;`);
        break;
      default:
    }
  });

  outputCodeArray.push('end.');

  return outputCodeArray.join('\n');
}

module.exports = transpileToPascal;
