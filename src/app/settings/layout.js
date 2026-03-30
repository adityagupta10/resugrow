import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Account Settings | ResuGrow',
  description: 'Manage your ResuGrow account settings and profile preferences.',
  path: '/settings',
  keywords: ['account settings', 'resugrow settings'],
  noindex: true,
});

export default function SettingsLayout({ children }) {
  return children;
}

