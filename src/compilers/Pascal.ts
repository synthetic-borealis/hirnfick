import BracketMismatchError from '../errors/bracketMismatch';
import hasMismatchingLoopBoundaries from '../utils/hasMismatchingLoopBoundaries';
import genIndent from '../utils/genIndent';
import cleanCode from '../utils/cleanCode';

/**
 * Converts a Brainfuck program to Pascal.
 * @category Compilation
 * @param {string} source Brainfuck source to convert.
 * @param {string} programName Name of the generate program (i.e. 'program programName;').
 * @param {number} indentSize Indentation size.
 * @param {string} indentChar Indentation character.
 * @returns {string} Generated Pascal code.
 * @throws {@link BracketMismatchError} if mismatching brackets are detected.
 */
export default function compileToPascal(
  source: string,
  programName = 'Hirnfick',
  indentSize = 2,
  indentChar = ' ',
): string {
  const cleanSource = cleanCode(source);
  const sourceArray = Array.from(cleanSource);

  if (hasMismatchingLoopBoundaries(cleanSource)) {
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
