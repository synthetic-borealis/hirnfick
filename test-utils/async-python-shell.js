const { PythonShell } = require('python-shell');

function runString(code, options = null) {
  return new Promise((resolve, reject) => {
    PythonShell.runString(code, options, (err, output) => {
      if (err) {
        reject(err);
      }
      resolve(output);
    });
  });
}

module.exports = { runString };
