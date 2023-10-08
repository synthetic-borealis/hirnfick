// Error Types
import BracketMismatchError from './errors/bracket-mismatch-error.ts';

// Syntax checking & Utilities
import { hasMismatchingLoopBoundaries, hasInfiniteLoops } from './utils/syntax-checking.ts';
import { cleanCode, genIndent } from './utils/utils.ts';

// Compilation
import compileToJsBase from './compilers/javascript-base.ts';
import compileToJsWeb from './compilers/javascript-web.ts';
import compileToJsNode from './compilers/javascript-node.ts';
import compileToJsDeno from './compilers/javascript-deno.ts';
import compileToPython from './compilers/python.ts';
import compileToC from './compilers/c.ts';
import compileToCpp from './compilers/cpp.ts';
import compileToQBasic from './compilers/qbasic.ts';
import compileToRust from './compilers/rust.ts';

export {
  BracketMismatchError,
  hasMismatchingLoopBoundaries,
  hasInfiniteLoops,
  cleanCode,
  genIndent,
  compileToJsBase,
  compileToJsWeb,
  compileToJsNode,
  compileToJsDeno,
  compileToPython,
  compileToC,
  compileToCpp,
  compileToQBasic,
  compileToRust,
};
