import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Cover Letter Studio | RESUGROW',
  description: 'Create a recruiter-ready cover letter with RESUGROW. Draft, refine, and export to PDF.',
  path: '/cover-letter/create',
  keywords: ['cover letter builder', 'AI cover letter', 'cover letter studio'],
  noindex: true,
});

export default function CoverLetterCreateLayout({ children }) {
  return children;
}

