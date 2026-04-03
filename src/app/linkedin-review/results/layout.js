import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'LinkedIn Scan Results | RESUGROW',
  description: 'LinkedIn profile scoring results and optimization breakdown.',
  path: '/linkedin-review/results',
  noindex: true
});

export default function LinkedInResultsLayout({ children }) {
  return children;
}
