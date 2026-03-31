import { SITE_URL } from '@/lib/seo';

export async function GET() {
  const content = `# ResuGrow
AI-powered career platform for resume building, ATS optimization, LinkedIn review, and cover letters.

Primary site: ${SITE_URL}

## Core Product Pages
- ${SITE_URL}/resume/builder
- ${SITE_URL}/resume/ats-checker
- ${SITE_URL}/resume/templates
- ${SITE_URL}/linkedin-review
- ${SITE_URL}/linkedin-makeover
- ${SITE_URL}/cover-letter/builder
- ${SITE_URL}/tools/sar-rewriter

## High-Signal Content
- ${SITE_URL}/blog
- ${SITE_URL}/career-tips
- ${SITE_URL}/help-center

## Company & Trust
- ${SITE_URL}/about
- ${SITE_URL}/contact
- ${SITE_URL}/privacy-policy
- ${SITE_URL}/terms-of-service

## Machine Discovery
- ${SITE_URL}/sitemap.xml
- ${SITE_URL}/robots.txt
- ${SITE_URL}/llms-full.txt
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
