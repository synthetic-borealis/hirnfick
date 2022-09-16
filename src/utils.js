function genIndent(depth, size, char) {
  return Array(depth * size + 1)
    .join(char);
}

module.exports = {
  genIndent,
};
