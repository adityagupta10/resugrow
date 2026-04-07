import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Community Resume Template Marketplace | RESUGROW',
  description:
    'Browse community-built HTML and CSS resume templates, discover new layouts, and submit your own design to the RESUGROW marketplace.',
  path: '/resume/template-marketplace',
  keywords: [
    'resume template marketplace',
    'community resume templates',
    'html css resume templates',
    'submit resume template',
    'ats resume template marketplace',
  ],
});

export default function TemplateMarketplaceLayout({ children }) {
  return children;
}
