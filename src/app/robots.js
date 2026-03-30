export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/payment',
          '/linkedin-review/results',
          '/resume/ats-checker/results',
          '/dashboard',
          '/settings',
          '/login',
          '/example-supabase',
          '/cover-letter/create'
        ]
      }
    ],
    host: 'https://www.resugrow.com',
    sitemap: 'https://www.resugrow.com/sitemap.xml',
  };
}
