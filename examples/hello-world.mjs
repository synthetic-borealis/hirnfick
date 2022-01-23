import * as hirnfick from '../index.js';

const helloWorldBF = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

try {
  const helloWorldJS = hirnfick.transpileToJavaScript(helloWorldBF);
  const helloWorld = new Function(`${helloWorldJS} return run();`);
  console.log(helloWorld().output);
} catch (err) {
  console.error(`Error: ${err.message}`);
}
