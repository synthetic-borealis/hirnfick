#!/usr/bin/env node
const fs = require('fs');
const parseArgs = require('minimist');
const hirnfick = require('../index');
const packageConfig = require('../package.json');

const supportedLanguages = [
  'js-web',
  'js-cli',
  'python',
  'c',
  'cpp',
  'qbasic',
  'pascal',
  'uwu',
];

function printWelcome() {
  console.log(`Hirnfick v${packageConfig.version}`);
}

function showHelp() {
  console.log('Usage:');
  console.log('hirnfick -i [input file] -o [output file] options');
  console.log('Options:');
  console.log(' --lang [language] - Output language (default=js-cli).');
  console.log(`    Supported Options: ${supportedLanguages.join(', ')}.`);
  console.log(' --memory-size [fixed|dynamic] - Type of cells array (default=fixed).');
  console.log(' --help - Show help.');
}

const argv = parseArgs(process.argv.slice(2), {
  default: {
    lang: 'js-cli',
    'memory-size': 'fixed',
  },
});

printWelcome();

if (argv.help) {
  showHelp();
  process.exit();
}

if (!argv.i) {
  console.error('Error: Input file is not defined');
  showHelp();
  process.exit(1);
}

if (!argv.o) {
  console.error('Error: Output file is not defined');
  showHelp();
  process.exit(1);
}

if (!supportedLanguages.includes(argv.lang)) {
  console.error('Error: Unsupported output language');
  showHelp();
  process.exit(1);
}

if (!['fixed', 'dynamic'].includes(argv['memory-size'])) {
  console.error('Error: Invalid memory array size');
  showHelp();
  process.exit(1);
}

let inputCode;
try {
  inputCode = fs.readFileSync(argv.i, 'utf-8');
} catch (err) {
  console.error('Error: Cannot read input file');
  process.exit(1);
}

let outputCode;
const useDynamicMemory = argv['memory-size'] === 'dynamic';
try {
  switch (argv.lang) {
    case 'js-web':
      outputCode = hirnfick.transpileToJsWeb(inputCode, useDynamicMemory);
      break;
    case 'js-cli':
      outputCode = hirnfick.transpileToJsCli(inputCode, useDynamicMemory);
      break;
    case 'python':
      outputCode = hirnfick.transpileToPython(inputCode, useDynamicMemory);
      break;
    case 'c':
      outputCode = hirnfick.transpileToC(inputCode);
      break;
    case 'cpp':
      outputCode = hirnfick.transpileToCpp(inputCode, useDynamicMemory);
      break;
    case 'qbasic':
      outputCode = hirnfick.transpileToQBasic(inputCode, useDynamicMemory);
      break;
    case 'pascal':
      outputCode = hirnfick.transpileToPascal(inputCode);
      break;
    case 'uwu':
      outputCode = hirnfick.transpileToUwu(inputCode);
      break;
    default:
      break;
  }
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}

try {
  if (fs.existsSync(argv.o)) {
    fs.unlinkSync(argv.o);
  }
  fs.writeFileSync(argv.o, outputCode);
} catch (err) {
  console.error('Error: Cannot write output to file');
  process.exit(1);
}
