import BracketMismatchError from '../errors/bracketMismatch';
import isValidProgram from '../utils/isValidProgram';
import genIndent from '../utils/genIndent';
import cleanCode from '../utils/cleanCode';

/**
 * Converts a Brainfuck program to JavaScript (CLI).
 * @param {string} source Brainfuck source to convert.
 * @param {boolean} useDynamicMemory Enable dynamic memory array.
 * @param {number} indentSize Indentation size.
 * @param {string} indentChar Indentation character.
 * @returns {string} Generated JavaScript code.
 * @throws {BracketMismatchError} if mismatching brackets are detected.
 */
export default function compileToJsCli(
  source: string,
  useDynamicMemory = true,
  indentSize = 2,
  indentChar = ' ',
): string {
  const cleanSource = cleanCode(source);
  const sourceArray = Array.from(cleanSource);

  if (!isValidProgram(cleanSource)) {
    throw new BracketMismatchError();
  }

  let indent = genIndent(1, indentSize, indentChar);

  const getchar = [
    'const fs = require(\'fs\');\n',
    'function getchar() {',
    `${indent}const buffer = Buffer.alloc(1);`,
    `${indent}fs.readSync(process.stdin.fd, buffer, 0, 1);`,
    `${indent}return buffer[0];`,
    '}\n',
  ];

  const putchar = [
    'function putchar(char) {',
    `${indent}process.stdout.write(char[0]);`,
    '}\n',
  ];

  const outputCodeArray = [];

  if (sourceArray.includes(',')) {
    outputCodeArray.push(...getchar);
  }
  outputCodeArray.push(...putchar);

  outputCodeArray.push(
    'function main() {',
    `${indent}let position = 0;`,
  );

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
        outputCodeArray.push(`${indent}putchar(String.fromCharCode(cells[position]));`);
        break;

      case ',':
        outputCodeArray.push(`${indent}cells[position] = getchar();`);
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

  outputCodeArray.push('}');
  outputCodeArray.push('main();\n');
  return outputCodeArray.join('\n');
}
