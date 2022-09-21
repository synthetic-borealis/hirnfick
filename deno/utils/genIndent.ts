export default function genIndent(depth: number, size: number, char: string): string {
  return Array(depth * size + 1)
    .join(char);
}
