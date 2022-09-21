import { PythonShell } from 'python-shell';
import * as path from 'path';

console.log('Generating Deno friendly TypeScript files');
PythonShell.run(path.join(__dirname, 'deno.py'), undefined, (error) => {
  if (error) {
    console.error(error.message);
  } else {
    console.log('Success!');
  }
});
