const WrongInputTypeError = require('../errors/wrongInputType');
const BracketMismatchError = require('../errors/bracketMismatch');
const { isValidProgram } = require('../validation');
const { genIndent } = require('../utils');
const { cleanCode } = require('../cleanup');

/**
 * Converts a Brainfuck program to Pascal.
 * @param {string} source Brainfuck source to convert.
 * @param {string} programName Name of the generate program (i.e. 'program programName;').
 * @param {number} indentSize Indentation size.
 * @param {string} indentChar Indentation character.
 * @returns {string} Generated Pascal code.
 * @throws {WrongInputTypeError} Input must be a string.
 * @throws {BracketMismatchError} Loop starts must have matching loop ends and vice versa.
 */
function transpileToPascal(source, programName = 'Hirnfick', indentSize = 2, indentChar = ' ') {
  if (typeof source !== 'string') {
    throw new WrongInputTypeError('Input must be a string');
  }
  const cleanSource = cleanCode(source);
  const sourceArray = Array.from(cleanSource);

  if (!isValidProgram(cleanSource)) {
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
        currentDepth = Math.max(currentDepth - 1, 0);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}end;`);
        break;

      // skip default case
    }
  });

  outputCodeArray.push('end.');

  return outputCodeArray.join('\n');
}
module.exports = transpileToPascal;
