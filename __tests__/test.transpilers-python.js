const asyncPyShell = require('../test-utils/async-python-shell');
const hirnfick = require('../index');

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

function checkGeneratedCode(code) {
  it('Generates valid Python code', () => asyncPyShell.runString(code)
    .then(() => expect(true).toBeTruthy()));

  describe('Generated Python code', () => {
    it('Has correct output', () => asyncPyShell.runString(code)
      .then((output) => {
        expect(output).toEqual(
          expect.arrayContaining(['Hello World!']),
        );
      }));
  });
}

describe('Transpilers tests', () => {
  describe('transpileToPython tests (dynamic memory)', () => {
    checkGeneratedCode(hirnfick.transpileToPython(helloWorldCode, true));
  });

  describe('transpileToPython tests (fixed memory)', () => {
    checkGeneratedCode(hirnfick.transpileToPython(helloWorldCode, false));
  });
});
