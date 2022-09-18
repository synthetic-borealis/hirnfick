#!/usr/bin/env node
const fs = require('fs');
const parseArgs = require('minimist');
const hirnfick = require('../lib');
const packageConfig = require('../package.json');

const supportedLanguages = [
  'js-web',
  'js-cli',
  'python',
  'c',
  'cpp',
  'qbasic',
  'pascal',
  'kotlin',
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
      outputCode = hirnfick.compileToJsWeb(inputCode, useDynamicMemory);
      break;
    case 'js-cli':
      outputCode = hirnfick.compileToJsCli(inputCode, useDynamicMemory);
      break;
    case 'python':
      outputCode = hirnfick.compileToPython(inputCode, useDynamicMemory);
      break;
    case 'c':
      outputCode = hirnfick.compileToC(inputCode);
      break;
    case 'cpp':
      outputCode = hirnfick.compileToCpp(inputCode, useDynamicMemory);
      break;
    case 'qbasic':
      outputCode = hirnfick.compileToQBasic(inputCode, useDynamicMemory);
      break;
    case 'pascal':
      outputCode = hirnfick.compileToPascal(inputCode);
      break;
    case 'kotlin':
      outputCode = hirnfick.compileToKotlin(inputCode, useDynamicMemory);
      break;

    // skip default case
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
