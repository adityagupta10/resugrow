import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Internal Test Page | ResuGrow',
  description: 'Internal testing page.',
  path: '/example-supabase',
  noindex: true,
});

export default function ExampleSupabaseLayout({ children }) {
  return children;
}

