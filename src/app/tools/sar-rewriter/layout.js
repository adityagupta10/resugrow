import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'AI SAR Bullet Rewriter | Upgrade Resume Bullets Fast',
  description:
    'Rewrite weak resume bullets into high-impact SAR statements with measurable results and keyword alignment.',
  path: '/tools/sar-rewriter',
  keywords: ['SAR bullet rewriter', 'resume bullet rewrite', 'action result resume bullets']
});

export default function SarRewriterLayout({ children }) {
  return children;
}
