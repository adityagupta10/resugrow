export default function sitemap() {
  const baseUrl = 'https://www.resugrow.com';
  const lastModified = new Date();

  return [
    { url: baseUrl, changeFrequency: 'daily', priority: 1.0, lastModified },
    { url: `${baseUrl}/resume/ats-checker`, changeFrequency: 'weekly', priority: 0.95, lastModified },
    { url: `${baseUrl}/resume/ai-builder`, changeFrequency: 'weekly', priority: 0.9, lastModified },
    { url: `${baseUrl}/resume/templates`, changeFrequency: 'weekly', priority: 0.9, lastModified },
    { url: `${baseUrl}/linkedin-review`, changeFrequency: 'weekly', priority: 0.9, lastModified },
    { url: `${baseUrl}/linkedin-review/paste`, changeFrequency: 'weekly', priority: 0.85, lastModified },
    { url: `${baseUrl}/linkedin-makeover`, changeFrequency: 'weekly', priority: 0.85, lastModified },
    { url: `${baseUrl}/tools/sar-rewriter`, changeFrequency: 'weekly', priority: 0.8, lastModified },
    { url: `${baseUrl}/cover-letter/builder`, changeFrequency: 'weekly', priority: 0.8, lastModified },
    { url: `${baseUrl}/cover-letter/templates`, changeFrequency: 'weekly', priority: 0.8, lastModified },
    { url: `${baseUrl}/resume-examples`, changeFrequency: 'weekly', priority: 0.75, lastModified },
    { url: `${baseUrl}/career-tips`, changeFrequency: 'weekly', priority: 0.75, lastModified },
    { url: `${baseUrl}/help-center`, changeFrequency: 'monthly', priority: 0.7, lastModified },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.7, lastModified },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.7, lastModified },
    { url: `${baseUrl}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3, lastModified },
    { url: `${baseUrl}/terms-of-service`, changeFrequency: 'yearly', priority: 0.3, lastModified },
    { url: `${baseUrl}/cookies`, changeFrequency: 'yearly', priority: 0.3, lastModified }
  ];
}
