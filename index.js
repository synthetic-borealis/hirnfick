// Error Types
const BracketMismatchError = require('./lib/errors/bracketMismatch');
const WrongInputTypeError = require('./lib/errors/wrongInputType');

// Validation & Utilities
const { isValidProgram } = require('./lib/validation');

// Transpilers
const transpileToJavaScript = require('./lib/transpilers/JavaScript');
const transpileToPython = require('./lib/transpilers/Python');
const transpileToC = require('./lib/transpilers/C');
const transpileToCpp = require('./lib/transpilers/CPP');
const transpileToUwu = require('./lib/transpilers/Uwu');
const transpileToQBasic = require('./lib/transpilers/QBasic');

module.exports = {
  BracketMismatchError,
  WrongInputTypeError,
  isValidProgram,
  transpileToJavaScript,
  transpileToPython,
  transpileToC,
  transpileToCpp,
  transpileToUwu,
  transpileToQBasic,
};
