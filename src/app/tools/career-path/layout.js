import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Career Path Simulator | Next Roles, Salary Ranges & Skill Gap Analyzer',
  description:
    'See your most realistic next career moves, salary ranges, skill gaps, and a 6-12 month roadmap based on your current role and experience.',
  path: '/tools/career-path',
  keywords: [
    'career path simulator',
    'skill gap analyzer',
    'next role career tool',
    'career roadmap tool',
    'salary range by role',
    'career progression planner',
    'job growth planner',
  ],
});

export default function CareerPathLayout({ children }) {
  return children;
}
