const { isValidProgram } = require('./lib/validation');
const transpileToJS = require('./lib/transpilers/JavaScript');
const transpileToPython = require('./lib/transpilers/Python');
const transpileToC = require('./lib/transpilers/C');
const transpileToCpp = require('./lib/transpilers/CPP');


module.exports = {
  isValidProgram,
  transpileToJS,
  transpileToPython,
  transpileToC,
  transpileToCpp,
};
