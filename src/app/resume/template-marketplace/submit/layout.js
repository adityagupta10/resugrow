import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Submit a Community Resume Template | RESUGROW',
  description: 'Submit a community resume template for RESUGROW marketplace moderation.',
  path: '/resume/template-marketplace/submit',
  noindex: true,
});

export default function SubmitTemplateLayout({ children }) {
  return children;
}
