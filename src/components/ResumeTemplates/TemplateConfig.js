import ClassicTemplate from './ClassicTemplate';
import ModernTemplate from './ModernTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import MinimalistTemplate from './MinimalistTemplate';
import CreativeTemplate from './CreativeTemplate';
import StartupTemplate from './StartupTemplate';
import TechTemplate from './TechTemplate';
import AcademicTemplate from './AcademicTemplate';
import ImpactTemplate from './ImpactTemplate';
import SwissTemplate from './SwissTemplate';

export const RESUME_TEMPLATES = {
  executive: {
    id: 'executive',
    name: 'Executive Pro',
    category: 'Professional',
    tags: ['ATS-Friendly', 'Top Rated'],
    component: ExecutiveTemplate,
    preview: '/templates/template-1.png',
  },
  modern: {
    id: 'modern',
    name: 'Modern Creative',
    category: 'Creative',
    tags: ['Design', 'Portfolio'],
    component: ModernTemplate,
    preview: '/templates/template-2.png',
  },
  classic: {
    id: 'classic',
    name: 'Classic Standard',
    category: 'Traditional',
    tags: ['Conservative', 'Corporate'],
    component: ClassicTemplate,
    preview: '/templates/template-3.png',
  },
  impact: {
    id: 'impact',
    name: 'Bold Impact',
    category: 'Modern',
    tags: ['Stand Out', 'Bold'],
    component: ImpactTemplate,
    preview: '/templates/template-4.png',
  },
  minimalist: {
    id: 'minimalist',
    name: 'Clean Simple',
    category: 'Minimal',
    tags: ['Minimal', 'Clean'],
    component: MinimalistTemplate,
    preview: '/templates/template-5.png',
  },
  tech: {
    id: 'tech',
    name: 'Tech Forward',
    category: 'Technology',
    tags: ['Tech', 'Developer'],
    component: TechTemplate,
    preview: '/templates/template-6.png',
  },
  graduate: {
    id: 'graduate',
    name: 'Graduate Start',
    category: 'Entry Level',
    tags: ['Entry Level', 'Fresh Grad'],
    component: AcademicTemplate,
    preview: '/templates/template-7.png',
  },
  creative: {
    id: 'creative',
    name: 'Creative Director',
    category: 'Creative',
    tags: ['Creative', 'Director'],
    component: CreativeTemplate,
    preview: '/templates/template-8.png',
  },
  federal: {
    id: 'federal',
    name: 'Federal Resume',
    category: 'Government',
    tags: ['Government', 'Federal'],
    component: ClassicTemplate,
    preview: '/templates/template-9.png',
  },
  stylish: {
    id: 'stylish',
    name: 'Stylish Modern',
    category: 'Modern',
    tags: ['Modern', 'Stylish'],
    component: ModernTemplate,
    preview: '/templates/template-10.png',
  },
  corporate: {
    id: 'corporate',
    name: 'Corporate Plus',
    category: 'Professional',
    tags: ['Corporate', 'Executive'],
    component: ExecutiveTemplate,
    preview: '/templates/template-11.png',
  },
  swiss: {
    id: 'swiss',
    name: 'Minimalist White',
    category: 'Minimal',
    tags: ['Lightweight', 'Clean'],
    component: SwissTemplate,
    preview: '/templates/template-12.png',
  },
  startup: {
    id: 'startup',
    name: 'Startup Edge',
    category: 'Creative',
    tags: ['Startup', 'Hybrid'],
    component: StartupTemplate,
    preview: '/templates/template-13.png',
  },
  medical: {
    id: 'medical',
    name: 'Medical Pro',
    category: 'Professional',
    tags: ['Healthcare', 'Clinical'],
    component: ImpactTemplate,
    preview: '/templates/template-14.png',
  },
  academic: {
    id: 'academic',
    name: 'Academic CV',
    category: 'Traditional',
    tags: ['Academic', 'Research'],
    component: AcademicTemplate,
    preview: '/templates/template-15.png',
  },
};

export function parseBullets(text) {
  if (!text) return [];
  // Split by newlines, bullets, or common separators
  return text
    .split(/\n|•|[*]/)
    .map(line => line.trim())
    .filter(line => line.length > 0);
}
