import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Application Tracker Dashboard | RESUGROW',
  description:
    'Track job applications in a Kanban dashboard with response-rate analytics, interview funnel visibility, and resume workflow support.',
  path: '/dashboard/applications',
  keywords: ['job application tracker', 'job search kanban board', 'application dashboard'],
  noindex: true,
});

export default function ApplicationsLayout({ children }) {
  return children;
}
