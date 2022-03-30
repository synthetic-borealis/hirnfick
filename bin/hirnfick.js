#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');
const hirnfick = require('../index');
const packageConfig = require('../package.json');

const { argv } = yargs(hideBin(process.argv));
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

delete argv.$0;
delete argv._;
const argc = Object.keys(argv).length;

function printWelcome() {
  console.log(`Hirnfick v${packageConfig.version}`);
}

function showHelp() {
  console.log('Usage:');
  console.log('hirnfick -i [input file] -o [output file] options');
  console.log('Options:');
  console.log(' --lang [language] - Output language (default=js-cli).');
  console.log(`    Supported Options: ${supportedLanguages.join(', ')}.`);
  console.log(' --array-size [fixed|dynamic] - Type of cells array (default=fixed).');
  console.log(' --help - Show help.');
}

printWelcome();

const isArraySizeArgValid = (!argv['array-size'] || (argv['array-size'] === 'fixed' || argv['array-size'] === 'dynamic'));
const isLangArgValid = (!argv.lang || supportedLanguages.some((lang) => argv.lang === lang));

if (argc === 0 || !argv.i || !argv.o || argv.i === argv.o || argv.help) {
  showHelp();
  process.exit();
}

if (!isArraySizeArgValid) {
  showHelp();
  console.error('\nArgument Error: Invalid array size');
  process.exit(1);
}

if (!isLangArgValid) {
  showHelp();
  console.error('\nArgument Error: Invalid output language');
  process.exit(1);
}

const options = {
  lang: 'js-cli',
  'array-size': 'fixed',
  ...argv,
};

if (!fs.existsSync(options.i)) {
  console.error('\nError: Input file does not exist or is inaccessible');
  process.exit(1);
}

let inputCode;
try {
  inputCode = fs.readFileSync(options.i, 'utf-8');
} catch (err) {
  console.error('\nError: Could not read input file');
  process.exit(1);
}

let outputCode;
try {
  switch (options.lang) {
    case 'js-web':
      outputCode = hirnfick.transpileToJsWeb(inputCode);
      break;

    case 'js-cli':
      outputCode = hirnfick.transpileToJsCli(inputCode);
      break;

    case 'python':
      outputCode = hirnfick.transpileToPython(inputCode);
      break;

    case 'c':
      outputCode = hirnfick.transpileToC(inputCode);
      break;

    case 'cpp':
      outputCode = hirnfick.transpileToCpp(inputCode);
      break;

    case 'qbasic':
      if (options['array-size'] === 'dynamic') {
        outputCode = hirnfick.transpileToQBasicDynamic(inputCode);
      } else {
        outputCode = hirnfick.transpileToQBasicFixed(inputCode);
      }
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
  console.error(`\nError: ${err.message}`);
}

try {
  if (fs.existsSync(options.o)) {
    fs.unlinkSync(options.o);
  }
  fs.writeFileSync(options.o, outputCode);
} catch (err) {
  console.error('\nError: Could not write output to file');
}
