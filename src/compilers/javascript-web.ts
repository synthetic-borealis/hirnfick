import { genIndent } from '../utils/utils';
import compileToJsBase from './javascript-base';

/**
 * Converts a Brainfuck program to JavaScript (Web).
 * @category Compilation
 * @param {string} source Brainfuck source to convert.
 * @param {boolean} isMemoryDynamic Enable dynamic memory array.
 * @param {string} mainFunctionName Output function name.
 * @param {number} indentSize Indentation size.
 * @param {string} indentChar Indentation character.
 * @returns {string} Generated JavaScript function source.
 * @throws {@link BracketMismatchError} if mismatching brackets are detected.
 */
export default function compileToJsWeb(
  source: string,
  isMemoryDynamic = true,
  mainFunctionName = 'main',
  indentSize = 2,
  indentChar = ' ',
): string {
  const {
    declaration: declarationLines,
    definition: definitionLines,
  } = compileToJsBase(
    source,
    isMemoryDynamic,
    false,
    indentSize,
    indentChar,
  );
  const indent = genIndent(1, indentSize, indentChar);
  const outputCodeArray = [
    ...declarationLines,
    'let output = \'\';\n',
  ];
  const putchar = [
    'function putchar() {',
    `${indent}output += String.fromCharCode(cells[position]);`,
    '}\n',
  ];
  outputCodeArray.push(...putchar);
  outputCodeArray.push(`function ${mainFunctionName}() {`);
  outputCodeArray.push(...(definitionLines.map((line) => `${indent}${line}`)));
  outputCodeArray.push('');
  outputCodeArray.push(`${indent}return { cells, output };`);
  outputCodeArray.push('}\n');
  return outputCodeArray.join('\n');
}
