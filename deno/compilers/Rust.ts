import BracketMismatchError from '../errors/bracketMismatch.ts';
import isValidProgram from '../utils/isValidProgram.ts';
import genIndent from '../utils/genIndent.ts';
import cleanCode from '../utils/cleanCode.ts';

/**
 * Converts a Brainfuck program to Rust.
 * @category Compilation
 * @param {string} source Brainfuck source to convert.
 * @param {number} indentSize Indentation size.
 * @param {string} indentChar Indentation character.
 * @returns {string} Generated Rust code.
 * @throws {@link BracketMismatchError} if mismatching brackets are detected.
 */
export default function compileToRust(
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
  const putChar = [
    'fn put_char(c: char) {',
    `${indent}let buf: [u8; 1] = [c as u8; 1];`,
    `${indent}stdout().write(&buf).expect("Oh no :\\'(");`,
    '}',
  ];
  const getChar = [
    'fn get_char() -> char {',
    `${indent}let mut buf: [u8; 1] = [0; 1];`,
    `${indent}stdin().read_exact(&mut buf).expect("Oops :(");`,
    `${indent}buf[0] as char`,
    '}',
  ];

  const outputCodeArray = [
    'use std::io::{Read, stdin, stdout, Write};',
    '',
    'fn main() {',
    `${indent}let mut cells: [u8; 30000] = [0; 30000];`,
    `${indent}let mut pos: usize = 0;`,
    '',
  ];

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    indent = genIndent(currentDepth + 1, indentSize, indentChar);

    switch (command) {
      case '>':
        outputCodeArray.push(`${indent}pos = if pos < 30000 {`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}pos + 1`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}} else {`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}pos`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}};`);
        break;

      case '<':
        outputCodeArray.push(`${indent}pos = if pos > 0 {`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}pos - 1`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}} else { pos };`);
        break;

      case '+':
        outputCodeArray.push(`${indent}cells[pos] = if cells[pos] < 255 {`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}cells[pos] + 1`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}} else { cells[pos] };`);
        break;

      case '-':
        outputCodeArray.push(`${indent}cells[pos] = if cells[pos] > 0 {`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}cells[pos] - 1`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}} else { cells[pos] };`);
        break;

      case '.':
        outputCodeArray.push(`${indent}put_char(cells[pos] as char);`);
        break;

      case ',':
        outputCodeArray.push(`${indent}cells[pos] = get_char() as u8;`);
        break;

      case '[':
        outputCodeArray.push(`${indent}while cells[pos] > 0 {`);
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
  outputCodeArray.push(...putChar, '');
  if (sourceArray.indexOf(',') >= 0) {
    outputCodeArray.push(...getChar, '');
  }

  return outputCodeArray.join('\n');
}