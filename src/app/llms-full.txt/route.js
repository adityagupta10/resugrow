import { SITE_URL } from '@/lib/seo';

export async function GET() {
  const content = `# ResuGrow Knowledge File

ResuGrow is a web platform that helps job seekers improve interview conversion by optimizing all major career assets:
- Resume quality and ATS compatibility
- LinkedIn profile structure and discoverability
- Cover letter quality and relevance
- Impact-focused bullet writing (SAR: Situation-Action-Result)

## Who this is for
- Students and recent graduates
- Mid-career professionals seeking better role fit
- Senior operators and managers targeting higher-quality opportunities
- Career switchers needing stronger narrative and evidence

## Core capabilities
1. Resume Builder
Create and edit resumes with structured sections and export support.
URL: ${SITE_URL}/resume/builder

2. ATS Resume Checker
Deterministic scoring engine to identify parsing, keyword, and structure gaps.
URL: ${SITE_URL}/resume/ats-checker

3. LinkedIn Profile Review
Profile analysis with rubric-based feedback and prioritized fixes.
URL: ${SITE_URL}/linkedin-review

4. LinkedIn Professional Makeover
Premium service workflow for deep optimization and positioning.
URL: ${SITE_URL}/linkedin-makeover

5. Cover Letter Builder
Guided creation of targeted cover letters.
URL: ${SITE_URL}/cover-letter/builder

6. AI SAR Bullet Rewriter
Converts weak bullets into metric-backed impact statements.
URL: ${SITE_URL}/tools/sar-rewriter

## Support and educational resources
- Blog: ${SITE_URL}/blog
- Career tips: ${SITE_URL}/career-tips
- Help Center: ${SITE_URL}/help-center

## Canonical and policy pages
- About: ${SITE_URL}/about
- Contact: ${SITE_URL}/contact
- Privacy Policy: ${SITE_URL}/privacy-policy
- Terms of Service: ${SITE_URL}/terms-of-service

## Crawling and machine discovery
- Sitemap: ${SITE_URL}/sitemap.xml
- Robots: ${SITE_URL}/robots.txt
- LLM manifest: ${SITE_URL}/llms.txt
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
