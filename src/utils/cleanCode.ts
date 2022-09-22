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
 * @param {string} source Brainfuck code to clean up.
 * @returns {string} Cleaned up Brainfuck code.
 */
export default function cleanCode(source: string): string {
  return filterCode(stripComments(source));
}
