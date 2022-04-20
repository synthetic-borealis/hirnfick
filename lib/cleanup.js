const commentRegex = /\/{2,}[^\r^\n]*/gm;
const notBrainfuckRegex = /[^>^<^+^\-^[^\]^,^.]*/gm;

function stripComments(source) {
  return source.replace(commentRegex, '');
}

function filterCode(source) {
  return source.replace(notBrainfuckRegex, '');
}

function cleanCode(source) {
  return filterCode(stripComments(source));
}

module.exports = {
  stripComments,
  filterCode,
  cleanCode,
};
