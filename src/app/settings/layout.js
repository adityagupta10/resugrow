import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Account Settings | RESUGROW',
  description: 'Manage your RESUGROW account settings and profile preferences.',
  path: '/settings',
  keywords: ['account settings', 'RESUGROW settings'],
  noindex: true,
});

export default function SettingsLayout({ children }) {
  return children;
}

