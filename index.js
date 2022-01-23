const { isValidProgram } = require('./lib/validation');
const transpileToJavaScript = require('./lib/transpilers/JavaScript');
const transpileToPython = require('./lib/transpilers/Python');
const transpileToC = require('./lib/transpilers/C');
const transpileToCpp = require('./lib/transpilers/CPP');
const transpileToUwu = require('./lib/transpilers/Uwu');


module.exports = {
  isValidProgram,
  transpileToJavaScript,
  transpileToPython,
  transpileToC,
  transpileToCpp,
  transpileToUwu,
};
