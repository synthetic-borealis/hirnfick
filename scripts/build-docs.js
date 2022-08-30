const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');

if (fs.existsSync('docs')) {
  fs.rmSync('docs', { recursive: true });
}
fs.mkdirSync('docs');

const docs = jsdoc2md.renderSync({ files: ['lib/**/*.js'] });

fs.writeFileSync('docs/API.md', docs);
