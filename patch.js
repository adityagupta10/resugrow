const fs = require('fs');
const path = 'src/app/blog/page.js';
let content = fs.readFileSync(path, 'utf8');

// Insert timing logs
content = content.replace('const { data: dbPosts, error } = await supabase', 'const t0 = Date.now();\n  const { data: dbPosts, error } = await supabase');
content = content.replace('if (error)', 'console.log("Supabase fetch:", Date.now() - t0, "ms");\n  const t1 = Date.now();\n  if (error)');
content = content.replace('const displayPosts = filteredPosts.length > 0 ? filteredPosts : allPosts;', 'console.log("Processing posts:", Date.now() - t1, "ms");\n  const displayPosts = filteredPosts.length > 0 ? filteredPosts : allPosts;');

fs.writeFileSync(path, content);
