import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'LinkedIn Direct Paste Analyzer | ResuGrow',
  description:
    'Analyze pasted LinkedIn profile text with deterministic scoring when PDF export is unavailable.',
  path: '/linkedin-review/paste',
  keywords: ['LinkedIn paste analyzer', 'LinkedIn text review', 'LinkedIn profile score']
});

export default function LinkedInPasteLayout({ children }) {
  return children;
}
