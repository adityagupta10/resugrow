const fs = require('fs');
const git = require('isomorphic-git');
const path = require('path');

async function run() {
  const dir = __dirname;
  const commit = await git.resolveRef({ fs, dir, ref: 'HEAD' });
  const { object: commitObj } = await git.readObject({ fs, dir, oid: commit });
  const treeOid = commitObj.tree;
  
  async function walk(oid, folder) {
    const { object } = await git.readObject({ fs, dir, oid });
    if (!Array.isArray(object)) return;
    
    for (const entry of object) {
      const fullPath = folder ? `${folder}/${entry.path}` : entry.path;
      if (entry.type === 'tree') {
        if (fullPath.startsWith('public') || 'public'.startsWith(fullPath)) {
          await walk(entry.oid, fullPath);
        }
      } else if (entry.type === 'blob') {
        if (fullPath.startsWith('public/') && fullPath.endsWith('.png')) {
          console.log('Restoring', fullPath);
          const { object: blob } = await git.readObject({ fs, dir, oid: entry.oid });
          const abspath = path.join(dir, fullPath);
          const parent = path.dirname(abspath);
          if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
          fs.writeFileSync(abspath, Buffer.from(blob));
        }
      }
    }
  }
  
  await walk(treeOid, '');
}

run().catch(console.error);
