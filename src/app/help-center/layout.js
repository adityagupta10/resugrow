import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Help Center | ResuGrow Support & FAQs',
  description:
    'Get support for ATS checks, resume builder usage, downloads, billing, and account troubleshooting.',
  path: '/help-center',
  keywords: ['help center', 'resume builder support', 'ATS checker support', 'ResuGrow FAQ']
});

export default function HelpCenterLayout({ children }) {
  return children;
}
