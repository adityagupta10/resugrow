import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Dashboard | ResuGrow',
  description: 'Your ResuGrow dashboard for resumes, ATS scans, and LinkedIn optimization history.',
  path: '/dashboard',
  keywords: ['resugrow dashboard'],
  noindex: true,
});

export default function DashboardLayout({ children }) {
  return children;
}

