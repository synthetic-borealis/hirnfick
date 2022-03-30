import * as hirnfick from 'hirnfick';

const helloWorldBF = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

try {
  const helloWorldJS = hirnfick.transpileToJsCli(helloWorldBF);
  const helloWorld = new Function(`${helloWorldJS}`);
  helloWorld();
} catch (err) {
  console.error(`Error: ${err.message}`);
}
