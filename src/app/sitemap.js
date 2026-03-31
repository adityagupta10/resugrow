import { posts } from './blog/data';

export default function sitemap() {
  const baseUrl = 'https://www.resugrow.com';
  const now = new Date();
  const parseDate = (value) => {
    if (!value || typeof value !== 'string') return null;
    const direct = new Date(value);
    if (!Number.isNaN(direct.getTime())) return direct;
    const normalized = new Date(value.replace(/-/g, ' '));
    if (!Number.isNaN(normalized.getTime())) return normalized;
    return null;
  };

  const staticRoutes = [
    // Core — highest priority
    { url: baseUrl,                                    changeFrequency: 'daily',   priority: 1.0,  lastModified: now },
    { url: `${baseUrl}/resume/ats-checker`,            changeFrequency: 'weekly',  priority: 0.95, lastModified: now },
    { url: `${baseUrl}/resume/ai-builder`,             changeFrequency: 'weekly',  priority: 0.92, lastModified: now },
    { url: `${baseUrl}/resume/builder`,                changeFrequency: 'weekly',  priority: 0.92, lastModified: now },
    { url: `${baseUrl}/resume/templates`,              changeFrequency: 'weekly',  priority: 0.90, lastModified: now },
    { url: `${baseUrl}/linkedin-review`,               changeFrequency: 'weekly',  priority: 0.90, lastModified: now },
    { url: `${baseUrl}/linkedin-review/paste`,         changeFrequency: 'weekly',  priority: 0.85, lastModified: now },
    { url: `${baseUrl}/linkedin-makeover`,             changeFrequency: 'weekly',  priority: 0.85, lastModified: now },
    { url: `${baseUrl}/tools/sar-rewriter`,            changeFrequency: 'weekly',  priority: 0.82, lastModified: now },
    { url: `${baseUrl}/cover-letter/builder`,          changeFrequency: 'weekly',  priority: 0.80, lastModified: now },
    { url: `${baseUrl}/cover-letter/templates`,        changeFrequency: 'weekly',  priority: 0.80, lastModified: now },

    // Content & resources
    { url: `${baseUrl}/blog`,                          changeFrequency: 'daily',   priority: 0.80, lastModified: now },
    { url: `${baseUrl}/career-tips`,                   changeFrequency: 'weekly',  priority: 0.75, lastModified: now },

    // Company
    { url: `${baseUrl}/about`,                         changeFrequency: 'monthly', priority: 0.70, lastModified: now },
    { url: `${baseUrl}/contact`,                       changeFrequency: 'monthly', priority: 0.70, lastModified: now },
    { url: `${baseUrl}/help-center`,                   changeFrequency: 'monthly', priority: 0.65, lastModified: now },
    { url: `${baseUrl}/llms.txt`,                      changeFrequency: 'weekly',  priority: 0.60, lastModified: now },
    { url: `${baseUrl}/llms-full.txt`,                 changeFrequency: 'weekly',  priority: 0.58, lastModified: now },

    // Legal — low priority, yearly
    { url: `${baseUrl}/privacy-policy`,                changeFrequency: 'yearly',  priority: 0.30, lastModified: now },
    { url: `${baseUrl}/terms-of-service`,              changeFrequency: 'yearly',  priority: 0.30, lastModified: now },
    { url: `${baseUrl}/cookies`,                       changeFrequency: 'yearly',  priority: 0.30, lastModified: now },
  ];

  // Dynamic blog post URLs
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    changeFrequency: 'monthly',
    priority: 0.75,
    lastModified: parseDate(post.dateModified) || parseDate(post.date) || now,
  }));

  return [...staticRoutes, ...blogRoutes];
}
