const hirnfick = require('../');

const validCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
const invalidCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.]]].------.--------.>>+.>++.';

console.log(hirnfick.isValidProgram(validCode)); // true
console.log(hirnfick.isValidProgram(invalidCode)); // false
