const commentRegex = /\/{2,}[^\r^\n]*/gm;
const notBrainfuckRegex = /[^><+\-[\],.]*/gm;

function stripComments(source: string) {
  return source.replace(commentRegex, '');
}

function filterCode(source: string) {
  return source.replace(notBrainfuckRegex, '');
}

/**
 * Strips comments from Brainfuck source and then cleans the code from
 * anything that's not a Brainfuck command.
 * @category Utility
 * @param {string} source Brainfuck code to clean up.
 * @returns {string} Cleaned up Brainfuck code.
 */
export function cleanCode(source: string): string {
  return filterCode(stripComments(source));
}

/**
 * Generates an indentation string.
 * @category Utility
 * @param {number} depth Indentation depth.
 * @param {number} size Indentation size.
 * @param {string} char Indentation character.
 * @returns {string}
 */
export function genIndent(depth: number, size: number, char: string): string {
  return Array(depth * size).fill(char).join('');
}
