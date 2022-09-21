// Error Types
import BracketMismatchError from './errors/bracketMismatch.ts';

// Validation & Utilities
import isValidProgram from './utils/isValidProgram.ts';

// Compilation
import compileToJsBase from './compilers/JavaScriptBase.ts';
import compileToJsWeb from './compilers/JavaScriptWeb.ts';
import compileToJsNode from './compilers/JavaScriptNode.ts';
import compileToJsDeno from './compilers/JavaScriptDeno.ts';
import compileToPython from './compilers/Python.ts';
import compileToC from './compilers/C.ts';
import compileToCpp from './compilers/CPP.ts';
import compileToQBasic from './compilers/QBasic.ts';
import compileToPascal from './compilers/Pascal.ts';
import compileToKotlin from './compilers/Kotlin.ts';

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
