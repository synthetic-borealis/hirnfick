const WrongInputTypeError = require('../errors/wrongInputType');
const BracketMismatchError = require('../errors/bracketMismatch');
const { isStringArray, isValidProgram } = require('../validation');
const { genIndent } = require('../utils');

/**
 * Converts a Brainfuck program to Pascal.
 * @param {string | Array<string>} source Brainfuck source to convert.
 * @param {string} programName Name of the generate program (i.e. program programName;).
 * @param {number} indentSize Indentation size (default = 2).
 * @param {string} indentChar Indentation character (default is space).
 * @returns {string} Generated Pascal code.
 * @throws {WrongInputTypeError} Input must be a string or an array of strings.
 * @throws {BracketMismatchError} Loop starts must have matching loop ends and vice versa.
 */
function transpileToPascal(source, programName = 'Hirnfick', indentSize = 2, indentChar = ' ') {
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
    `${indent}Cells: array [0..${cellsUBound}] of Byte;`,
    `${indent}Position: Integer;`,
    'begin',
  ];

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    indent = genIndent(currentDepth + 1, indentSize, indentChar);

    switch (command) {
      case '>':
        outputCodeArray.push(`${indent}if Position + 1 < ${cellsUBound} then`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}Inc(Position);`);
        break;

      case '<':
        outputCodeArray.push(`${indent}if Position > 0 then`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}Dec(Position);`);
        break;

      case '+':
        outputCodeArray.push(`${indent}if Cells[Position] < 255 then`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}Inc(Cells[Position]);`);
        break;

      case '-':
        outputCodeArray.push(`${indent}if Cells[Position] > 0 then`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}Dec(Cells[Position]);`);
        break;

      case '.':
        outputCodeArray.push(`${indent}Write(Char(Cells[Position]));`);
        break;

      case ',':
        outputCodeArray.push(`${indent}Cells[Position] := Byte(ReadKey);`);
        break;

      case '[':
        outputCodeArray.push(`${indent}while Cells[Position] > 0 do`);
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
