import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * Load blog posts from filesystem-backed markdown files in /content/blog.
 *
 * Each .md file contains YAML frontmatter (metadata) followed by the post body.
 * The body is plain markdown — rendered by the same minimal renderer used for
 * the static JS posts, so no MDX runtime is required.
 *
 * Runs only at build time / on the server (uses node:fs).
 */

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

let cachedPosts = null;

function readPostFile(filename) {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  const derivedSlug = filename.replace(/\.mdx?$/, '');

  return {
    slug: data.slug || derivedSlug,
    title: data.title,
    category: data.category,
    date: data.date,
    readTime: data.readTime,
    author: data.author,
    authorRole: data.authorRole,
    authorInitials: data.authorInitials,
    authorColor: data.authorColor,
    excerpt: data.excerpt,
    coverEmoji: data.coverEmoji,
    tags: Array.isArray(data.tags) ? data.tags : [],
    content: content.trim(),
  };
}

export function loadMarkdownPosts() {
  if (cachedPosts) return cachedPosts;

  if (!fs.existsSync(CONTENT_DIR)) {
    cachedPosts = [];
    return cachedPosts;
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

  cachedPosts = files
    .map(readPostFile)
    .filter((p) => p.slug && p.title)
    .sort((a, b) => {
      const da = new Date(a.date || 0).getTime();
      const db = new Date(b.date || 0).getTime();
      return db - da;
    });

  return cachedPosts;
}
