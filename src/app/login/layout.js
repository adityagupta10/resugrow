import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Sign In | RESUGROW',
  description: 'Sign in to RESUGROW to save resumes, track ATS scans, and access premium career tools.',
  path: '/login',
  keywords: ['RESUGROW login', 'sign in', 'resume builder account'],
  noindex: true,
});

export default function LoginLayout({ children }) {
  return children;
}

