import BracketMismatchError from '../errors/bracketMismatch.ts';
import isValidProgram from '../utils/isValidProgram.ts';
import genIndent from '../utils/genIndent.ts';
import cleanCode from '../utils/cleanCode.ts';

/**
 * Converts a Brainfuck program to C.
 * @category Compilation
 * @param {string} source Brainfuck source to convert.
 * @param {number} indentSize Indentation size.
 * @param {string} indentChar Indentation character.
 * @returns {string} Generated C code.
 * @throws {@link BracketMismatchError} if mismatching brackets are detected.
 */
export default function compileToC(
  source: string,
  indentSize = 4,
  indentChar = ' ',
): string {
  const cleanSource = cleanCode(source);
  const sourceArray = Array.from(cleanSource);

  if (!isValidProgram(cleanSource)) {
    throw new BracketMismatchError();
  }

  let indent = genIndent(1, indentSize, indentChar);

  const outputCodeArray = [
    '#include <stdio.h>',
    '#include <stdlib.h>',
    '',
    'int main()',
    '{',
    `${indent}unsigned char cells[30000] = {0};`,
    `${indent}int position = 0;`,
    '',
  ];

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    indent = genIndent(currentDepth + 1, indentSize, indentChar);

    switch (command) {
      case '>':
        outputCodeArray.push(`${indent}if (position + 1 < 30000)`);
        outputCodeArray.push(`${indent}{`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}++position;`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '<':
        outputCodeArray.push(`${indent}if (position - 1 >= 0)`);
        outputCodeArray.push(`${indent}{`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}--position;`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '+':
        outputCodeArray.push(`${indent}if (cells[position] < 255)`);
        outputCodeArray.push(`${indent}{`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}cells[position] += 1;`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '-':
        outputCodeArray.push(`${indent}if (cells[position] > 0)`);
        outputCodeArray.push(`${indent}{`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}cells[position] -= 1;`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '.':
        outputCodeArray.push(`${indent}putchar(cells[position]);`);
        break;

      case ',':
        outputCodeArray.push(`${indent}cells[position] = (unsigned char)getchar();`);
        break;

      case '[':
        outputCodeArray.push(`${indent}while (cells[position])`);
        outputCodeArray.push(`${indent}{`);
        currentDepth += 1;
        break;

      case ']':
        currentDepth = Math.max(currentDepth - 1, 0);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      // skip default case
    }
  });

  outputCodeArray.push('}\n');

  return outputCodeArray.join('\n');
}
