const commentRegex = /\/{2,}[^\r^\n]*/gm;
const notBrainfuckRegex = /[^><+\-[\],.]*/gm;

function stripComments(source: string) {
  return source.replace(commentRegex, '');
}

function filterCode(source: string) {
  return source.replace(notBrainfuckRegex, '');
}

export default function cleanCode(source: string): string {
  return filterCode(stripComments(source));
}