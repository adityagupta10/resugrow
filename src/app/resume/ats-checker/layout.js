import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Free ATS Resume Checker & Scanner | ResuGrow',
  description:
    'Scan your resume for ATS compatibility, keyword gaps, structure issues, and recruiter-readability signals.',
  path: '/resume/ats-checker',
  keywords: ['ATS checker', 'resume scanner', 'resume ATS score', 'keyword gap analysis']
});

export default function ATSCheckerLayout({ children }) {
  return children;
}
