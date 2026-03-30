import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Sign In | ResuGrow',
  description: 'Sign in to ResuGrow to save resumes, track ATS scans, and access premium career tools.',
  path: '/login',
  keywords: ['resugrow login', 'sign in', 'resume builder account'],
  noindex: true,
});

export default function LoginLayout({ children }) {
  return children;
}

