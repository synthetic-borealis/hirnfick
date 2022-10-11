import BracketMismatchError from '../errors/bracket-mismatch-error';
import { hasMismatchingLoopBoundaries } from '../utils/syntax-checking';
import genIndent from '../utils/gen-indent';
import cleanCode from '../utils/clean-code';

/**
 * Converts a Brainfuck program to C++.
 * @category Compilation
 * @param {string} source Brainfuck source to convert.
 * @param {boolean} isMemoryDynamic Enable dynamic memory array.
 * @param {number} indentSize Indentation size.
 * @param {string} indentChar Indentation character.
 * @returns {string} Generated C++ code.
 * @throws {@link BracketMismatchError} if mismatching brackets are detected.
 */
export default function compileToCpp(
  source: string,
  isMemoryDynamic = true,
  indentSize = 4,
  indentChar = ' ',
): string {
  const cleanSource = cleanCode(source);
  const sourceArray = Array.from(cleanSource);

  if (hasMismatchingLoopBoundaries(cleanSource)) {
    throw new BracketMismatchError();
  }

  let indent = genIndent(1, indentSize, indentChar);

  const outputCodeArray = [
    '#include <iostream>',
    '#include <cstdio>',
    '#include <vector>',
    '',
    'auto main() -> int',
    '{',
    `${indent}int position = 0;`,
  ];

  if (isMemoryDynamic) {
    outputCodeArray.push(`${indent}std::vector<unsigned char> cells { 0 };\n`);
  } else {
    outputCodeArray.push(`${indent}std::vector<unsigned char> cells { std::vector<unsigned char>(30000) };\n`);
  }

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    indent = genIndent(currentDepth + 1, indentSize, indentChar);
    switch (command) {
      case '>':
        if (isMemoryDynamic) {
          outputCodeArray.push(`${indent}if (position + 1 == cells.size())`);
          outputCodeArray.push(`${indent}{`);
          indent += genIndent(1, indentSize, indentChar);
          outputCodeArray.push(`${indent}cells.push_back(0);`);
          indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}}`);
          outputCodeArray.push(`${indent}++position;`);
        } else {
          outputCodeArray.push(`${indent}if (position + 1 < cells.size())`);
          outputCodeArray.push(`${indent}{`);
          indent += genIndent(1, indentSize, indentChar);
          outputCodeArray.push(`${indent}++position;`);
          indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}}`);
        }
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
        outputCodeArray.push(`${indent}++cells[position];`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '-':
        outputCodeArray.push(`${indent}if (cells[position] > 0)`);
        outputCodeArray.push(`${indent}{`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}--cells[position];`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '.':
        outputCodeArray.push(`${indent}std::cout << cells[position];`);
        break;

      case ',':
        outputCodeArray.push(`${indent}cells[position] = std::getchar();`);
        break;

      case '[':
        outputCodeArray.push(`${indent}while (cells[position] > 0)`);
        outputCodeArray.push(`${indent}{`);
        currentDepth += 1;
        break;

      case ']':
        currentDepth = Math.max(currentDepth - 1, 0);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        outputCodeArray.push('');
        break;

      // skip default case
    }
  });

  outputCodeArray.push('\n}\n');

  return outputCodeArray.join('\n');
}
