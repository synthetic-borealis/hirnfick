// Error Types
const BracketMismatchError = require('./lib/errors/bracketMismatch');
const WrongInputTypeError = require('./lib/errors/wrongInputType');

// Validation & Utilities
const { isValidProgram } = require('./lib/validation');

// Transpilers
const transpileToJsWeb = require('./lib/transpilers/JavaScriptWeb');
const transpileToJsCli = require('./lib/transpilers/JavaScriptCLI');
const transpileToPython = require('./lib/transpilers/Python');
const transpileToC = require('./lib/transpilers/C');
const transpileToCpp = require('./lib/transpilers/CPP');
const transpileToQBasic = require('./lib/transpilers/QBasic');
const transpileToPascal = require('./lib/transpilers/Pascal');

module.exports = {
  BracketMismatchError,
  WrongInputTypeError,
  isValidProgram,
  transpileToJsWeb,
  transpileToJsCli,
  transpileToPython,
  transpileToC,
  transpileToCpp,
  transpileToQBasic,
  transpileToPascal,
};
