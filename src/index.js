function transpile(source) {
  const sourceArray = source.split('');
  const numOfLoopStarts = sourceArray.reduce((previousVal, currentVal) => (currentVal === '[' ? previousVal + 1 : previousVal), 0);
  const numOfLoopEnds = sourceArray.reduce((previousVal, currentVal) => (currentVal === ']' ? previousVal + 1 : previousVal), 0);

  if (numOfLoopStarts !== numOfLoopEnds) {
    return {
      status: 'Error',
      message: 'Bracket number mismatch',
      run: undefined,
    };
  }

  const outputCodeArray = [
    'var cells = [0];',
    'var position = 0;',
    'var output = ``;',
  ];

  sourceArray.forEach((command) => {
    switch (command) {
      case '>':
        outputCodeArray.push('if (position + 1 === cells.length) cells.push(0);');
        outputCodeArray.push('++position;');
        break;

      case '<':
        outputCodeArray.push('if (position > 0) --position;');
        break;

      case '+':
        outputCodeArray.push('if (cells[position] < 255) ++cells[position];');
        break;

      case '-':
        outputCodeArray.push('if (cells[position] > 0) --cells[position];');
        break;

      case '.':
        outputCodeArray.push('output = output.concat(String.fromCharCode(cells[position]));');
        break;

      case '[':
        outputCodeArray.push('while (cells[position] > 0) {');
        break;

      case ']':
        outputCodeArray.push('}');
        break;

      default:
    }
  });
  outputCodeArray.push('return output;');

  const outputCode = outputCodeArray.join('\n');
  return {
    status: 'Success',
    message: '',
    run: new Function(outputCode),
  };
}

export default { transpile };
