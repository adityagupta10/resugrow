import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Help Center | RESUGROW Support & FAQs',
  description:
    'Get support for ATS checks, resume builder usage, downloads, billing, and account troubleshooting.',
  path: '/help-center',
  keywords: ['help center', 'resume builder support', 'ATS checker support', 'RESUGROW FAQ']
});

export default function HelpCenterLayout({ children }) {
  return children;
}
