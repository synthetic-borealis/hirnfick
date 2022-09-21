// Error Types
import BracketMismatchError from './errors/bracketMismatch';

// Validation & Utilities
import isValidProgram from './utils/isValidProgram';

// Compilation
import compileToJsBase from './compilers/JavaScriptBase';
import compileToJsWeb from './compilers/JavaScriptWeb';
import compileToJsNode from './compilers/JavaScriptNode';
import compileToJsDeno from './compilers/JavaScriptDeno';
import compileToPython from './compilers/Python';
import compileToC from './compilers/C';
import compileToCpp from './compilers/CPP';
import compileToQBasic from './compilers/QBasic';
import compileToPascal from './compilers/Pascal';
import compileToKotlin from './compilers/Kotlin';

const compileToJsCli = compileToJsNode; // for backward compatibility

export default {
  BracketMismatchError,
  isValidProgram,
  compileToJsBase,
  compileToJsWeb,
  compileToJsNode,
  compileToJsDeno,
  compileToJsCli,
  compileToPython,
  compileToC,
  compileToCpp,
  compileToQBasic,
  compileToPascal,
  compileToKotlin,
};

export {
  BracketMismatchError,
  isValidProgram,
  compileToJsBase,
  compileToJsWeb,
  compileToJsNode,
  compileToJsDeno,
  compileToJsCli,
  compileToPython,
  compileToC,
  compileToCpp,
  compileToQBasic,
  compileToPascal,
  compileToKotlin,
};
