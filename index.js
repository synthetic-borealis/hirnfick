// Error Types
const BracketMismatchError = require('./lib/errors/bracketMismatch');
const WrongInputTypeError = require('./lib/errors/wrongInputType');

// Validation & Utilities
const { isValidProgram } = require('./lib/validation');

// Transpilers
const transpileToJSWeb = require('./lib/transpilers/JavaScriptWeb');
const transpileToJSCLI = require('./lib/transpilers/JavaScriptCLI');
const transpileToPython = require('./lib/transpilers/Python');
const transpileToC = require('./lib/transpilers/C');
const transpileToCpp = require('./lib/transpilers/CPP');
const transpileToUwu = require('./lib/transpilers/Uwu');
const transpileToQBasicFixed = require('./lib/transpilers/QBasicFixed');
const transpileToQBasicDynamic = require('./lib/transpilers/QBasicDynamic');
const transpileToPascal = require('./lib/transpilers/Pascal');

module.exports = {
  BracketMismatchError,
  WrongInputTypeError,
  isValidProgram,
  transpileToJSWeb,
  transpileToJSCLI,
  transpileToPython,
  transpileToC,
  transpileToCpp,
  transpileToUwu,
  transpileToQBasic: transpileToQBasicFixed, // Ensure backward compatibility
  transpileToQBasicFixed,
  transpileToQBasicDynamic,
  transpileToPascal
};
