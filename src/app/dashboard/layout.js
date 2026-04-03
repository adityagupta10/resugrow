import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Dashboard | RESUGROW',
  description: 'Your RESUGROW dashboard for resumes, ATS scans, and LinkedIn optimization history.',
  path: '/dashboard',
  keywords: ['RESUGROW dashboard'],
  noindex: true,
});

export default function DashboardLayout({ children }) {
  return children;
}

