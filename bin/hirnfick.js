#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const packageConfig = require('../package.json');

const { argv } = yargs(hideBin(process.argv));

console.log(packageConfig.version);
delete argv.$0;
delete argv._;
console.log(argv);
console.log(Object.keys(argv).length);
