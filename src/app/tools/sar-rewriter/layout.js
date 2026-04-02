import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Free AI Resume Bullet Rewriter — SAR Format in Seconds',
  description:
    'Paste a weak resume bullet and get 3 AI-rewritten versions in SAR format with measurable results, strong action verbs, and keyword alignment. Free, instant.',
  path: '/tools/sar-rewriter',
  keywords: [
    'resume bullet rewriter', 'SAR bullet rewriter', 'AI resume bullet',
    'resume bullet points', 'action verbs resume', 'resume bullet generator',
    'improve resume bullets', 'resume achievement statements',
  ]
});

export default function SarRewriterLayout({ children }) {
  return children;
}
