// Error Types
const BracketMismatchError = require('./errors/bracketMismatch');
const WrongInputTypeError = require('./errors/wrongInputType');

// Validation & Utilities
const { isValidProgram } = require('./validation');

// Transpilers
const transpileToJsWeb = require('./transpilers/JavaScriptWeb');
const transpileToJsCli = require('./transpilers/JavaScriptCLI');
const transpileToPython = require('./transpilers/Python');
const transpileToC = require('./transpilers/C');
const transpileToCpp = require('./transpilers/CPP');
const transpileToQBasic = require('./transpilers/QBasic');
const transpileToPascal = require('./transpilers/Pascal');
const transpileToKotlin = require('./transpilers/Kotlin');

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
  transpileToKotlin,
};
