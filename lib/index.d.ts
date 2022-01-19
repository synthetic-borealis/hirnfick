/**
 * Validates a Brainfuck program by looking for umatched loop starts/ends.
 *
 * @param {string} source Brainfuck source-code to validate.
 * @returns {boolean} True if the program is valid, false if it's not.
 */
export function isValidProgram(source: string): boolean;
/**
 * Converts a Brainfuck program to a JavaScript function.
 *
 * @param {string} source Brainfuck source-code to convert.
 * @param {string} funcName Output function name (default = 'run').
 * @param {number} indentSize Indentation size (default = 2).
 * @param {string} indentChar Indentation character (default is space).
 * @returns {string} The generated function (in source form).
 */
export function transpileToJS(source: string, funcName?: string, indentSize?: number, indentChar?: string): string;
/**
 * Converts a Brainfuck program to a Python script.
 *
 * @param {string} source Brainfuck source-code to convert.
 * @returns {string} The generated Python code.
 */
export function transpileToPython(source: string): string;
