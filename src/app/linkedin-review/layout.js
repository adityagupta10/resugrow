import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'LinkedIn Profile Review Tool | Score, Audit & Improve',
  description:
    'Upload your LinkedIn PDF and get a deterministic profile score with pillar-level insights and optimization guidance.',
  path: '/linkedin-review',
  keywords: ['LinkedIn profile review', 'LinkedIn score', 'LinkedIn optimization tool']
});

export default function LinkedInReviewLayout({ children }) {
  return <>{children}</>;
}
