import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'LinkedIn Makeover Service | AI + Expert Profile Rewrite',
  description:
    'Upgrade your LinkedIn profile with an AI-assisted expert makeover focused on recruiter visibility and conversion.',
  path: '/linkedin-makeover',
  keywords: ['LinkedIn makeover', 'LinkedIn profile optimization', 'LinkedIn profile rewrite']
});

export default function LinkedinMakeoverLayout({ children }) {
  return children;
}
