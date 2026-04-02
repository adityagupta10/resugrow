import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Free AI Resume Builder — Create an ATS Resume in Minutes',
  description:
    'Build a professional, ATS-optimized resume with our free AI resume builder. 15 templates, real-time scoring, PDF export. No sign-up needed.',
  path: '/resume/builder',
  keywords: [
    'free resume builder', 'AI resume builder', 'resume maker', 'resume creator',
    'ATS resume builder', 'professional resume builder', 'online resume builder',
    'resume builder free', 'create resume online', 'resume generator',
  ],
  imageAlt: 'Free AI Resume Builder by ResuGrow — build an ATS-friendly resume in minutes',
});

export default function ResumeBuilderLayout({ children }) {
  return children;
}
