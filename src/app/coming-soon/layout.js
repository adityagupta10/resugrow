import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Feature Coming Soon | ResuGrow',
  description: 'This ResuGrow feature is currently under development and will be available soon.',
  path: '/coming-soon',
  noindex: true
});

export default function ComingSoonLayout({ children }) {
  return children;
}
