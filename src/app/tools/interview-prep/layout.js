import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Interview Question Generator | AI-Powered Prep Tool',
  description:
    'Generate 15–20 tailored interview questions from any job description with SAR answer frameworks and spaced-repetition practice cards.',
  path: '/tools/interview-prep',
  keywords: [
    'interview question generator',
    'interview prep',
    'SAR answer framework',
    'behavioral interview questions',
    'job interview preparation',
  ],
});

export default function InterviewPrepLayout({ children }) {
  return children;
}
