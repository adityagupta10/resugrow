import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'ATS Scan Results | ResuGrow',
  description: 'Your resume ATS analysis results and module-wise breakdown.',
  path: '/resume/ats-checker/results',
  noindex: true
});

export default function ATSResultsLayout({ children }) {
  return children;
}
