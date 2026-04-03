const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const exts = ['.png', '.jpg', '.jpeg', '.webp'];
let missing = 0;
const checked = new Set();

walkDir('src', (filepath) => {
  if (filepath.endsWith('.js') || filepath.endsWith('.css') || filepath.endsWith('.json') || filepath.endsWith('.jsx')) {
    const content = fs.readFileSync(filepath, 'utf8');
    const regex = /['\"\`](\/(images|emoji|templates|hero-images|coverletters)\/[^'\"\`]+)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const urlPath = match[1];
      if (exts.some(ext => urlPath.endsWith(ext))) {
        if (!checked.has(urlPath)) {
          checked.add(urlPath);
          const fullPath = path.join('public', urlPath);
          if (!fs.existsSync(fullPath)) {
            console.log('Missing image ref in code:', urlPath, 'found in', filepath);
            missing++;
          }
        }
      }
    }
  }
});
console.log('Total broken image strings:', missing);
