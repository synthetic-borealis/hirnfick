function genIndent(depth, size, char = ' ') {
  return Array(depth * size + 1).join(char);
}

function isValidProgram(source) {
  const sourceArray = Array.from(source);
  const numOfLoopStarts = sourceArray.reduce((previousVal, currentVal) => (currentVal === '[' ? previousVal + 1 : previousVal), 0);
  const numOfLoopEnds = sourceArray.reduce((previousVal, currentVal) => (currentVal === ']' ? previousVal + 1 : previousVal), 0);

  return numOfLoopStarts === numOfLoopEnds;
}

function transpileToJS(source, funcName = 'run', indentSize = 2) {
  const sourceArray = Array.from(source);

  const outputCodeArray = [
    `function ${funcName}() {`,
    `${genIndent(1, indentSize)}var cells = [0];`,
    `${genIndent(1, indentSize)}var position = 0;`,
    `${genIndent(1, indentSize)}var output = "";`,
    '',
  ];

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    switch (command) {
      case '>':
        {
          const indent = genIndent(currentDepth + 1, indentSize);
          outputCodeArray.push(`${indent}if (position + 1 === cells.length) cells.push(0);`);
          outputCodeArray.push(`${indent}++position;`);
        }
        break;

      case '<':
        {
          const indent = genIndent(currentDepth + 1, indentSize);
          outputCodeArray.push(`${indent}if (position > 0) --position;`);
        }
        break;

      case '+':
        {
          const indent = genIndent(currentDepth + 1, indentSize);
          outputCodeArray.push(`${indent}if (cells[position] < 255) ++cells[position];`);
        }
        break;

      case '-':
        {
          const indent = genIndent(currentDepth + 1, indentSize);
          outputCodeArray.push(`${indent}if (cells[position] > 0) --cells[position];`);
        }
        break;

      case '.':
        {
          const indent = genIndent(currentDepth + 1, indentSize);
          outputCodeArray.push(`${indent}output += String.fromCharCode(cells[position]);`);
        }
        break;

      case '[':
        {
          const indent = genIndent(currentDepth + 1, indentSize);
          outputCodeArray.push(`${indent}while (cells[position] > 0) {`);
          currentDepth += 1;
        }
        break;

      case ']':
        {
          currentDepth = currentDepth > 0 ? currentDepth - 1 : 0;
          const indent = genIndent(currentDepth + 1, indentSize);
          outputCodeArray.push(`${indent}}`);
        }
        break;

      default:
    }
  });

  outputCodeArray.push('');
  outputCodeArray.push(`${genIndent(1, indentSize)}return {cells, output};`);
  outputCodeArray.push('}\n');

  return outputCodeArray.join('\n');
}

module.exports = { isValidProgram, transpileToJS };
