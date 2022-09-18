import BracketMismatchError from '../errors/bracketMismatch';
import isValidProgram from '../utils/isValidProgram';
import genIndent from '../utils/genIndent';
import cleanCode from '../utils/cleanCode';

/**
 * Converts a Brainfuck program to Kotlin.
 * @param {string} source Brainfuck source to convert.
 * @param {boolean} useDynamicMemory Enable dynamic memory array.
 * @param {number} indentSize Indentation size.
 * @param {string} indentChar Indentation character.
 * @returns {string} Generated Kotlin code.
 * @throws {BracketMismatchError} if mismatching brackets are detected.
 */
export default function transpileToKotlin(
  source: string,
  useDynamicMemory = true,
  indentSize = 4,
  indentChar = ' ',
): string {
  const cleanSource = cleanCode(source);
  const sourceArray = Array.from(cleanSource);

  if (!isValidProgram(cleanSource)) {
    throw new BracketMismatchError();
  }

  let indent = genIndent(1, indentSize, indentChar);
  const outputCodeArray = [];

  outputCodeArray.push(
    'fun main() {',
    `${indent}var position = 0`,
  );

  if (useDynamicMemory) {
    outputCodeArray.push(`${indent}val cells = MutableList<Int>(1) { 0 }`);
  } else {
    outputCodeArray.push(`${indent}val cells = Array<Int>(30000, { 0 })`);
  }

  outputCodeArray.push('');

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    indent = genIndent(currentDepth + 1, indentSize, indentChar);
    switch (command) {
      case '>':
        if (useDynamicMemory) {
          outputCodeArray.push(`${indent}if (position + 1 > cells.lastIndex) {`);
          indent += genIndent(1, indentSize, indentChar);
          outputCodeArray.push(`${indent}cells.add(0)`);
          indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}}`);
          outputCodeArray.push(`${indent}position++`);
        } else {
          outputCodeArray.push(`${indent}if (position + 1 < cells.size) {`);
          indent += genIndent(1, indentSize, indentChar);
          outputCodeArray.push(`${indent}position++`);
          indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}}`);
        }
        break;

      case '<':
        outputCodeArray.push(`${indent}if (position - 1 >= 0) {`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}position--`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '+':
        outputCodeArray.push(`${indent}if (cells[position] < 255) {`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}cells[position] = cells[position] + 1`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '-':
        outputCodeArray.push(`${indent}if (cells[position] > 0) {`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}cells[position] = cells[position] - 1`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '.':
        outputCodeArray.push(`${indent}print(cells[position].toChar())`);
        break;

      case ',':
        outputCodeArray.push(`${indent}run {`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}val inStr = readLine()!!`);
        outputCodeArray.push(`${indent}cells[position] = if (inStr.length == 0) {`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}cells[position]`);
        indent = genIndent(currentDepth + 2, indentSize, indentChar);
        outputCodeArray.push(`${indent}} else {`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}inStr[0].toInt()`);
        indent = genIndent(currentDepth + 2, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '[':
        outputCodeArray.push(`${indent}while (cells[position] > 0) {`);
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
  outputCodeArray.push('}\n');
  return outputCodeArray.join('\n');
}
