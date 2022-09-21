import BracketMismatchError from '../errors/bracketMismatch.ts';
import isValidProgram from '../utils/isValidProgram.ts';
import genIndent from '../utils/genIndent.ts';
import cleanCode from '../utils/cleanCode.ts';

/**
 * Converts a Brainfuck program to QBasic.
 * @category Compilation
 * @param {string} source Brainfuck source to convert.
 * @param {boolean} isMemoryDynamic Enable dynamic memory array.
 * @param {number} indentSize Indentation size.
 * @param {string} indentChar Indentation character.
 * @returns {string} Generated QBasic code.
 * @throws {@link BracketMismatchError} if mismatching brackets are detected.
 */
export default function compileToQBasic(
  source: string,
  isMemoryDynamic = false,
  indentSize = 2,
  indentChar = ' ',
): string {
  const cleanSource = cleanCode(source);
  const sourceArray = Array.from(cleanSource);

  if (!isValidProgram(cleanSource)) {
    throw new BracketMismatchError();
  }

  let outputCodeArray;
  if (isMemoryDynamic) {
    outputCodeArray = [
      '\'$LANG: "qb"',
      '\'$DYNAMIC',
      'DIM cells(0) AS INTEGER',
      'DIM curPos AS LONG\n',
    ];
  } else {
    outputCodeArray = [
      'CONST NumberOfCells = 30000',
      'CONST CellsUBound = NumberOfCells - 1',
      'DIM cells(CellsUBound) AS INTEGER',
      'DIM curPos AS LONG\n',
    ];
  }

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    let indent = genIndent(currentDepth, indentSize, indentChar);

    switch (command) {
      case '>':
        if (isMemoryDynamic) {
          outputCodeArray.push(`${indent}curPos = curPos + 1`);
          outputCodeArray.push(`${indent}IF curPos > UBOUND(cells) THEN REDIM PRESERVE cells(curPos) AS INTEGER`);
        } else {
          outputCodeArray.push(`${indent}IF curPos < CellsUBound THEN curPos = curPos + 1`);
        }
        break;

      case '<':
        outputCodeArray.push(`${indent}IF curPos > 0 THEN curPos = curPos - 1`);
        break;

      case '+':
        outputCodeArray.push(`${indent}IF cells(curPos) < 255 THEN cells(curPos) = cells(curPos) + 1`);
        break;

      case '-':
        outputCodeArray.push(`${indent}IF cells(curPos) > 0 THEN cells(curPos) = cells(curPos) - 1`);
        break;

      case '.':
        outputCodeArray.push(`${indent}PRINT CHR$(cells(curPos));`);
        break;

      case ',':
        outputCodeArray.push(`${indent}cells(curPos) = ASC(INPUT$(1))`);
        break;

      case '[':
        outputCodeArray.push(`${indent}WHILE cells(curPos) >= 1`);
        currentDepth += 1;
        break;

      case ']':
        currentDepth = Math.max(currentDepth - 1, 0);
        indent = genIndent(currentDepth, indentSize, indentChar);
        outputCodeArray.push(`${indent}WEND`);
        break;

      // skip default case
    }
  });

  return outputCodeArray.join('\n');
}
