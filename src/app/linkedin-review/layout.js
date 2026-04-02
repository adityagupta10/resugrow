import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Free LinkedIn Profile Review — Score & Optimize Your Profile',
  description:
    'Upload your LinkedIn PDF or paste your profile text for a free section-by-section score. Identifies headline, About, and experience gaps that hurt recruiter visibility.',
  path: '/linkedin-review',
  keywords: [
    'LinkedIn profile review', 'LinkedIn score', 'LinkedIn profile checker',
    'LinkedIn optimization tool', 'LinkedIn profile analyzer', 'LinkedIn audit',
    'improve LinkedIn profile', 'LinkedIn profile score', 'LinkedIn review free',
  ]
});

export default function LinkedInReviewLayout({ children }) {
  return <>{children}</>;
}
