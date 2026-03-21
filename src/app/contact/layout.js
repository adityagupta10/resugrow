import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Contact ResuGrow | Support, Feedback & Partnerships',
  description:
    'Contact the ResuGrow team for product support, partnership inquiries, or feedback on resume and LinkedIn tools.',
  path: '/contact',
  keywords: ['contact resugrow', 'resume support', 'career tool support']
});

export default function ContactLayout({ children }) {
  return children;
}
