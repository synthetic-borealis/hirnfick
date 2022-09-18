import BracketMismatchError from '../errors/bracketMismatch';
import isValidProgram from '../utils/isValidProgram';
import genIndent from '../utils/genIndent';
import cleanCode from '../utils/cleanCode';

/**
 * Converts a Brainfuck program to JavaScript (Web).
 * @param {string} source Brainfuck source to convert.
 * @param {boolean} useDynamicMemory Enable dynamic memory array.
 * @param {string} funcName Output function name.
 * @param {number} indentSize Indentation size.
 * @param {string} indentChar Indentation character.
 * @returns {string} Generated JavaScript function source.
 * @throws {BracketMismatchError} if mismatching brackets are detected.
 */
export default function compileToJsWeb(
  source: string,
  useDynamicMemory = true,
  funcName = 'main',
  indentSize = 2,
  indentChar = ' ',
): string {
  const cleanSource = cleanCode(source);
  const sourceArray = Array.from(cleanSource);

  if (!isValidProgram(cleanSource)) {
    throw new BracketMismatchError();
  }

  let indent = genIndent(1, indentSize, indentChar);

  const outputCodeArray = [
    `function ${funcName}() {`,
    `${indent}let position = 0;`,
    `${indent}let output = "";`,
  ];

  if (useDynamicMemory) {
    outputCodeArray.push(`${indent}let cells = [0];\n`);
  } else {
    outputCodeArray.push(`${indent}let cells = Array(30000).fill(0);\n`);
  }

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    indent = genIndent(currentDepth + 1, indentSize, indentChar);
    switch (command) {
      case '>':
        if (useDynamicMemory) {
          outputCodeArray.push(`${indent}if (position + 1 === cells.length) {`);
          indent += genIndent(1, indentSize, indentChar);
          outputCodeArray.push(`${indent}cells.push(0);`);
          indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}}`);
          outputCodeArray.push(`${indent}++position;\n`);
        } else {
          outputCodeArray.push(`${indent}if (position + 1 < cells.length) {`);
          indent += genIndent(1, indentSize, indentChar);
          outputCodeArray.push(`${indent}++position;`);
          indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}}`);
        }
        break;

      case '<':
        outputCodeArray.push(`${indent}if (position > 0) {`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}--position;`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '+':
        outputCodeArray.push(`${indent}if (cells[position] < 255) {`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}++cells[position];`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '-':
        outputCodeArray.push(`${indent}if (cells[position] > 0) {`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}--cells[position];`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '.':
        outputCodeArray.push(`${indent}output += String.fromCharCode(cells[position]);`);
        break;

      case '[':
        outputCodeArray.push(`${indent}while (cells[position] > 0) {`);
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

  indent = genIndent(1, indentSize, indentChar);

  outputCodeArray.push('');
  outputCodeArray.push(`${indent}return { cells, output };`);
  outputCodeArray.push('}\n');

  return outputCodeArray.join('\n');
}
