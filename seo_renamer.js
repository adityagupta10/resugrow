const fs = require('fs');
const path = require('path');

const templatesMap = {
  "template-1.png": "ats-friendly-professional-resume-template-1.png",
  "template-2.png": "modern-creative-cv-layout-template-2.png",
  "template-3.png": "executive-leadership-resume-design-3.png",
  "template-4.png": "entry-level-graduate-resume-format-4.png",
  "template-5.png": "tech-software-engineer-resume-template-5.png",
  "template-6.png": "minimalist-clean-resume-builder-template-6.png",
  "template-7.png": "marketing-manager-creative-resume-7.png",
  "template-8.png": "finance-accounting-professional-cv-8.png",
  "template-9.png": "data-science-analytics-resume-template-9.png",
  "template-10.png": "healthcare-medical-resume-format-10.png",
  "template-11.png": "project-manager-agile-resume-template-11.png",
  "template-12.png": "sales-executive-resume-layout-12.png",
  "template-13.png": "customer-success-resume-design-13.png",
  "template-14.png": "freelance-consultant-cv-template-14.png",
  "template-15.png": "academic-research-cv-format-15.png"
};

const emojiMap = JSON.parse(fs.readFileSync('emoji_map.json', 'utf8'));

// 1. Rename files on disk
console.log('Renaming templates...');
for (const [oldName, newName] of Object.entries(templatesMap)) {
  const oldPath = path.join('public', 'templates', oldName);
  const newPath = path.join('public', 'templates', newName);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
  }
}

console.log('Renaming emojis...');
for (const [oldName, newName] of Object.entries(emojiMap)) {
  const oldPath = path.join('public', 'emoji', oldName);
  const newPath = path.join('public', 'emoji', newName);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
  }
}

// 2. Replace references in codebase
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

function processFile(filepath) {
  if (filepath.endsWith('.js') || filepath.endsWith('.css') || filepath.endsWith('.json') || filepath.endsWith('.jsx')) {
    let content = fs.readFileSync(filepath, 'utf8');
    let modified = false;

    for (const [oldName, newName] of Object.entries(templatesMap)) {
      const target = `/templates/${oldName}`;
      if (content.includes(target)) {
        content = content.replaceAll(target, `/templates/${newName}`);
        modified = true;
      }
    }

    for (const [oldName, newName] of Object.entries(emojiMap)) {
      const target = `/emoji/${oldName}`;
      if (content.includes(target)) {
        content = content.replaceAll(target, `/emoji/${newName}`);
        modified = true;
      }
    }

    if (modified) {
      console.log(`Updated references in: ${filepath}`);
      fs.writeFileSync(filepath, content, 'utf8');
    }
  }
}

console.log('Updating codebase references...');
walkDir('src', processFile);
walkDir('public', processFile);

console.log('Done.');
