import { loadMarkdownPosts } from '@/lib/blogContent';

// Sourced from /content/blog/*.md — see lib/blogContent.js for the loader.
// New posts can be added by dropping a new .md file with frontmatter.
export const newPosts = loadMarkdownPosts();
