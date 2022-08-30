const WrongInputTypeError = require('../errors/wrongInputType');
const BracketMismatchError = require('../errors/bracketMismatch');
const { isValidProgram } = require('../validation');
const { genIndent } = require('../utils');
const { cleanCode } = require('../cleanup');

function transpileToKotlin(source, useDynamicMemory = true, indentSize = 4, indentChar = ' ') {
  if (typeof source !== 'string') {
    throw new WrongInputTypeError('Input must be a string');
  }
  const cleanSource = cleanCode(source);
  const sourceArray = Array.from(cleanSource);

  if (!isValidProgram(cleanSource)) {
    throw new BracketMismatchError();
  }

  let indent = genIndent(1, indentSize, indentChar);
  const javaScannerImport = ['import java.util.Scanner', ''];
  const javaScannerInit = 'val scanner = Scanner(System.`in`)';
  const outputCodeArray = [];
  const hasUserInput = sourceArray.includes(',');

  if (hasUserInput) {
    outputCodeArray.push(...javaScannerImport);
  }

  outputCodeArray.push(
    'fun main() {',
    `${indent}var position = 0`,
  );

  if (useDynamicMemory) {
    outputCodeArray.push(`${indent}val cells = MutableList<Char>(1) { 0.toChar() }`);
  } else {
    outputCodeArray.push(`${indent}val cells = Array<Char>(30000, { 0.toChar() })`);
  }

  if (hasUserInput) {
    outputCodeArray.push(javaScannerInit);
  }
  outputCodeArray.push('');

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    switch (command) {
      case '>':
        if (useDynamicMemory) {
          outputCodeArray.push(`${indent}if (position + 1 > cells.lastIndex) {`);
          indent += genIndent(1, indentSize, indentChar);
          outputCodeArray.push(`${indent}cells.add(0.toChar())`);
          indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}}`);
          outputCodeArray.push(`${indent}position++`);
        } else {
          outputCodeArray.push(`${indent}if (position + 1 < cells.size()) {`);
          indent += genIndent(1, indentSize, indentChar);
          outputCodeArray.push(`${indent}position++`);
          indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}}`);
        }
        break;

      case '<':
        outputCodeArray.push(`${indent}if (position - 1 >= 0) {`);
        outputCodeArray.push(`${indent}position--`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '+':
        outputCodeArray.push(`${indent}if (cells[position].toInt() < 255) {`);
        outputCodeArray.push(`${indent}cells[position] = cells[position] + 1`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '-':
        outputCodeArray.push(`${indent}if (cells[position].toInt() > 0) {`);
        outputCodeArray.push(`${indent}cells[position] = cells[position] - 1`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '.':
        outputCodeArray.push(`${indent}print(cells[position])`);
        break;

      case ',':
        outputCodeArray.push(`${indent}cells[position] = scanner.next().single()`);
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
module.exports = transpileToKotlin;
