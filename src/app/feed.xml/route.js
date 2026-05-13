import { posts } from '../blog/data';
import { SITE_URL, SITE_NAME } from '@/lib/seo';

export async function GET() {
  const latestPosts = posts
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.date || 0);
      const dateB = new Date(b.date || 0);
      return dateB - dateA;
    })
    .slice(0, 50);

  const rssItems = latestPosts
    .map((post) => {
      const pubDate = new Date(post.date || Date.now()).toUTCString();
      const link = `${SITE_URL}/blog/${post.slug}`;
      const desc = (post.excerpt || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const title = (post.title || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const author = post.author || post.authorName || 'RESUGROW Team';
      const categories = (post.tags || [])
        .map((t) => `<category>${t.replace(/&/g, '&amp;')}</category>`)
        .join('');

      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${desc}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${author}</author>
      ${categories}
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} Blog — Career Tips, Resume Guides &amp; Hiring Trends</title>
    <link>${SITE_URL}/blog</link>
    <description>Expert career advice, resume optimization guides, and hiring trend analysis from RESUGROW — the free AI career platform.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/resugrow-logo.png</url>
      <title>${SITE_NAME}</title>
      <link>${SITE_URL}</link>
    </image>
${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
