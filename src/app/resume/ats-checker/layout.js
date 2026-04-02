import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Free ATS Resume Checker — Score Your Resume in 30 Seconds',
  description:
    'Upload your resume and get an instant ATS score out of 100. Identifies keyword gaps, formatting issues, and missing sections. Free, no sign-up required.',
  path: '/resume/ats-checker',
  keywords: [
    'ATS resume checker', 'free ATS checker', 'resume ATS score', 'ATS scanner',
    'resume keyword checker', 'resume compatibility test', 'ATS resume test',
    'applicant tracking system checker', 'resume score checker', 'ats resume',
  ],
  imageAlt: 'Free ATS Resume Checker — get your resume score in 30 seconds',
});

export default function ATSCheckerLayout({ children }) {
  return children;
}
