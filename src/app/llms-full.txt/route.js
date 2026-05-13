import { SITE_URL } from '@/lib/seo';

export async function GET() {
  const content = `# RESUGROW Knowledge File

RESUGROW is a web platform that helps job seekers improve interview conversion by optimizing all major career assets:
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
Public resume builder landing page and template discovery.
URL: ${SITE_URL}/resume/ai-builder

2. ATS Resume Checker
Deterministic scoring methodology and ATS guidance.
URL: ${SITE_URL}/ats-resume-guide

3. LinkedIn Profile Review
LinkedIn optimization service and profile positioning guidance.
URL: ${SITE_URL}/linkedin-makeover

4. LinkedIn Professional Makeover
Premium service workflow for deep optimization and positioning.
URL: ${SITE_URL}/linkedin-makeover

5. Cover Letter Builder
Guided creation of targeted cover letters.
URL: ${SITE_URL}/cover-letter/builder

6. AI SAR Bullet Rewriter
Resume action verb and bullet writing education.
URL: ${SITE_URL}/resume-summary-examples

7. Career Path Simulator
Career path and skill planning is available inside the authenticated app.
Public tools hub: ${SITE_URL}/tools

8. Job Application Tracker
Kanban-style tracker for applications, status transitions, response rate, interview rate, and job-search funnel analytics inside the authenticated dashboard.
Public tools hub: ${SITE_URL}/tools

9. Community Template Marketplace
Public marketplace for approved community-built HTML/CSS resume templates plus creator submission workflow.
URL: ${SITE_URL}/resume/template-marketplace

## Support and educational resources
- Blog: ${SITE_URL}/blog
- Career tips: ${SITE_URL}/career-tips
- Help Center: ${SITE_URL}/help-center
- Resume examples: ${SITE_URL}/examples
- Resume templates by role: ${SITE_URL}/templates/software-engineer-resume
- Glossary: ${SITE_URL}/glossary

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
