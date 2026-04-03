import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Contact RESUGROW | Support, Feedback & Partnerships',
  description:
    'Contact the RESUGROW team for product support, partnership inquiries, or feedback on resume and LinkedIn tools.',
  path: '/contact',
  keywords: ['contact RESUGROW', 'resume support', 'career tool support']
});

export default function ContactLayout({ children }) {
  return children;
}
