import BracketMismatchError from '../errors/bracketMismatch';
import isValidProgram from '../utils/isValidProgram';
import genIndent from '../utils/genIndent';
import cleanCode from '../utils/cleanCode';

/**
 * Converts a Brainfuck program to JavaScript.
 * @description This function is used by {@link compileToJsWeb} and {@link compileToJsCli} to
 * generate their output. You can use it to write functions that generate output for other
 * JavaScript-based platforms.
 * @param {string} source Brainfuck source to convert.
 * @param {boolean} isMemoryDynamic Enable dynamic memory array.
 * @param enableUserInput
 * @param {number} indentSize Indentation size.
 * @param {string} indentChar Indentation character.
 * @returns {<{ declaration: string[], definition: string[] }>}
 */
export default function compileToJsBase(
  source: string,
  isMemoryDynamic: boolean,
  enableUserInput: boolean,
  indentSize: number,
  indentChar: string,
) {
  const cleanSource = cleanCode(source);
  const sourceArray = Array.from(cleanSource);

  if (!isValidProgram(cleanSource)) {
    throw new BracketMismatchError();
  }

  let indent = genIndent(1, indentSize, indentChar);
  const outputDeclarationLines: string[] = [
    'let position = 0;',
  ];
  if (isMemoryDynamic) {
    outputDeclarationLines.push('const cells = [0];');
  } else {
    outputDeclarationLines.push('const cells = Array(30000).fill(0);');
  }

  const outputDefinitionLines: string[] = [];
  let currentDepth = 0;

  sourceArray.forEach((command) => {
    indent = genIndent(currentDepth, indentSize, indentChar);
    switch (command) {
      case '>':
        if (isMemoryDynamic) {
          outputDefinitionLines.push(`${indent}if (position + 1 === cells.length) {`);
          indent += genIndent(1, indentSize, indentChar);
          outputDefinitionLines.push(`${indent}cells.push(0);`);
          indent = genIndent(currentDepth, indentSize, indentChar);
          outputDefinitionLines.push(`${indent}}`);
          outputDefinitionLines.push(`${indent}position += 1;\n`);
        } else {
          outputDefinitionLines.push(`${indent}if (position + 1 < cells.length) {`);
          indent += genIndent(1, indentSize, indentChar);
          outputDefinitionLines.push(`${indent}position += 1;`);
          indent = genIndent(currentDepth, indentSize, indentChar);
          outputDefinitionLines.push(`${indent}}`);
        }
        break;

      case '<':
        outputDefinitionLines.push(`${indent}if (position > 0) {`);
        indent += genIndent(1, indentSize, indentChar);
        outputDefinitionLines.push(`${indent}position -= 1;`);
        indent = genIndent(currentDepth, indentSize, indentChar);
        outputDefinitionLines.push(`${indent}}`);
        break;

      case '+':
        outputDefinitionLines.push(`${indent}if (cells[position] < 255) {`);
        indent += genIndent(1, indentSize, indentChar);
        outputDefinitionLines.push(`${indent}cells[position] += 1;`);
        indent = genIndent(currentDepth, indentSize, indentChar);
        outputDefinitionLines.push(`${indent}}`);
        break;

      case '-':
        outputDefinitionLines.push(`${indent}if (cells[position] > 0) {`);
        indent += genIndent(1, indentSize, indentChar);
        outputDefinitionLines.push(`${indent}cells[position] -= 1;`);
        indent = genIndent(currentDepth, indentSize, indentChar);
        outputDefinitionLines.push(`${indent}}`);
        break;

      case '.':
        outputDefinitionLines.push(`${indent}putchar(String.fromCharCode(cells[position]));`);
        break;

      case ',':
        if (enableUserInput) {
          outputDefinitionLines.push(`${indent}cells[position] = getchar();`);
        }
        break;

      case '[':
        outputDefinitionLines.push(`${indent}while (cells[position] > 0) {`);
        currentDepth += 1;
        break;

      case ']':
        currentDepth = Math.max(currentDepth - 1, 0);
        indent = genIndent(currentDepth, indentSize, indentChar);
        outputDefinitionLines.push(`${indent}}`);
        break;

      // skip default case
    }
  });
  return {
    declaration: outputDeclarationLines,
    definition: outputDefinitionLines,
  };
}
