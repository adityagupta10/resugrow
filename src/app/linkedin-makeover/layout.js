import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'LinkedIn Makeover Service — AI-Assisted Profile Rewrite',
  description:
    'Get a complete LinkedIn profile makeover with AI-assisted rewrites for your headline, About section, and experience. Increase recruiter visibility and inbound messages.',
  path: '/linkedin-makeover',
  keywords: [
    'LinkedIn makeover', 'LinkedIn profile optimization', 'LinkedIn profile rewrite',
    'LinkedIn headline optimization', 'LinkedIn About section', 'LinkedIn profile boost',
    'improve LinkedIn profile', 'LinkedIn for job seekers',
  ]
});

export default function LinkedinMakeoverLayout({ children }) {
  return children;
}
