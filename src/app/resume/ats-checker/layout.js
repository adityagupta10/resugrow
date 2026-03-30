import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Free ATS Resume Checker & Scanner | ResuGrow',
  description:
    'Scan your resume for ATS compatibility, keyword gaps, structure issues, and recruiter-readability signals. Get a score out of 100 in under 30 seconds.',
  path: '/resume/ats-checker',
  keywords: ['ATS checker', 'free ATS resume checker', 'resume scanner', 'resume ATS score', 'keyword gap analysis', 'resume compatibility test'],
  imageAlt: 'Free ATS Resume Checker tool by ResuGrow — scan your resume for keyword gaps and formatting issues'
});

export default function ATSCheckerLayout({ children }) {
  return children;
}
