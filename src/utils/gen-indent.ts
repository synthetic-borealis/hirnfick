/**
 * Generates an indentation string.
 * @category Utility
 * @param {number} depth Indentation depth.
 * @param {number} size Indentation size.
 * @param {string} char Indentation character.
 * @returns {string}
 */
export default function genIndent(depth: number, size: number, char: string): string {
  return Array(depth * size + 1)
    .join(char);
}
