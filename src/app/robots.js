export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/payment', '/linkedin-review/results', '/resume/ats-checker/results']
      }
    ],
    host: 'https://www.resugrow.com',
    sitemap: 'https://www.resugrow.com/sitemap.xml',
  };
}
