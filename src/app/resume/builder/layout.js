import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'AI Resume Builder | Build an ATS-Friendly Resume in Minutes | ResuGrow',
  description:
    'Create an ATS-friendly, recruiter-ready resume with ResuGrow. Choose a template, write impact bullets, and export to PDF.',
  path: '/resume/builder',
  keywords: ['AI resume builder', 'ATS-friendly resume', 'resume templates', 'resume PDF'],
});

export default function ResumeBuilderLayout({ children }) {
  return children;
}

