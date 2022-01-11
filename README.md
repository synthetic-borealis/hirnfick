# Brainfuck.js
A [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck) interpreter/transpiler.

## Examples
### Example 1
```javascript
const brainfuck = require('brainfuck');

const helloWorldSrc = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

const helloWorldProgram = brainfuck.transpile(helloWorldSrc);

if (helloWorldProgram.status === "Success") {
  const helloWorldOutput = helloWorldProgram.run();
  console.log(helloWorldOutput);
} else {
  console.log(`Error: ${helloWorldProgram.message}`);
}
```

### Example 2
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="brainfuck.min.js"></script>
</head>

<body>
  <p>
    <textarea id="output-box" readonly rows="8" style="width: 90%;"></textarea>
  </p>
  <button id="run-button">Run</button>

  <script>
    const runButton = document.getElementById('run-button');
    const outputBox = document.getElementById('output-box');
    const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

    outputBox.value = '';
    runButton.addEventListener('click', () => {
      const helloWorldProgram = brainfuck.transpile(helloWorldCode);
      if (helloWorldProgram.status === 'Success') {
        outputBox.value = outputBox.value.concat((helloWorldProgram.run()));
      } else {
        outputBox.value = outputBox.value.concat((`Error: ${helloWorldProgram.message}`));
      }
    });
  </script>
</body>

</html>
```
