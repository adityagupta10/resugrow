import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'LinkedIn Content Studio | Generate Viral LinkedIn Posts',
  description:
    'Turn resume achievements into compelling LinkedIn posts with proven frameworks (PAS, AIDA, Storytelling), carousel templates, and India-optimized posting schedule.',
  path: '/tools/linkedin-studio',
  keywords: [
    'linkedin post generator',
    'linkedin content studio',
    'linkedin post ideas',
    'linkedin carousel template',
    'linkedin content strategy',
  ],
});

export default function LinkedInStudioLayout({ children }) {
  return children;
}
