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
import PhotoTemplate from './PhotoTemplate';

export const RESUME_TEMPLATES = {
  // Standard Templates
  executive: {
    id: 'executive',
    name: 'Executive Pro',
    category: 'Professional',
    tags: ['ATS-Friendly', 'Top Rated'],
    component: ExecutiveTemplate,
    preview: '/templates/ats-friendly-professional-resume-template-1.png',
  },
  modern: {
    id: 'modern',
    name: 'Modern Creative',
    category: 'Creative',
    tags: ['Design', 'Portfolio'],
    component: ModernTemplate,
    preview: '/templates/modern-creative-cv-layout-template-2.png',
  },
  classic: {
    id: 'classic',
    name: 'Classic Standard',
    category: 'Traditional',
    tags: ['Conservative', 'Corporate'],
    component: ClassicTemplate,
    preview: '/templates/executive-leadership-resume-design-3.png',
  },
  impact: {
    id: 'impact',
    name: 'Bold Impact',
    category: 'Modern',
    tags: ['Stand Out', 'Bold'],
    component: ImpactTemplate,
    preview: '/templates/entry-level-graduate-resume-format-4.png',
  },
  minimalist: {
    id: 'minimalist',
    name: 'Clean Simple',
    category: 'Minimal',
    tags: ['Minimal', 'Clean'],
    component: MinimalistTemplate,
    preview: '/templates/tech-software-engineer-resume-template-5.png',
  },
  tech: {
    id: 'tech',
    name: 'Tech Forward',
    category: 'Technology',
    tags: ['Tech', 'Developer'],
    component: TechTemplate,
    preview: '/templates/minimalist-clean-resume-builder-template-6.png',
  },
  graduate: {
    id: 'graduate',
    name: 'Graduate Start',
    category: 'Entry Level',
    tags: ['Entry Level', 'Fresh Grad'],
    component: AcademicTemplate,
    preview: '/templates/marketing-manager-creative-resume-7.png',
  },
  creative: {
    id: 'creative',
    name: 'Creative Director',
    category: 'Creative',
    tags: ['Creative', 'Director'],
    component: CreativeTemplate,
    preview: '/templates/finance-accounting-professional-cv-8.png',
  },
  federal: {
    id: 'federal',
    name: 'Federal Resume',
    category: 'Government',
    tags: ['Government', 'Federal'],
    component: ClassicTemplate,
    preview: '/templates/data-science-analytics-resume-template-9.png',
  },
  stylish: {
    id: 'stylish',
    name: 'Stylish Modern',
    category: 'Modern',
    tags: ['Modern', 'Stylish'],
    component: ModernTemplate,
    preview: '/templates/healthcare-medical-resume-format-10.png',
  },
  corporate: {
    id: 'corporate',
    name: 'Corporate Plus',
    category: 'Professional',
    tags: ['Corporate', 'Executive'],
    component: ExecutiveTemplate,
    preview: '/templates/project-manager-agile-resume-template-11.png',
  },
  swiss: {
    id: 'swiss',
    name: 'Minimalist White',
    category: 'Minimal',
    tags: ['Lightweight', 'Clean'],
    component: SwissTemplate,
    preview: '/templates/sales-executive-resume-layout-12.png',
  },
  startup: {
    id: 'startup',
    name: 'Startup Edge',
    category: 'Creative',
    tags: ['Startup', 'Hybrid'],
    component: StartupTemplate,
    preview: '/templates/customer-success-resume-design-13.png',
  },
  medical: {
    id: 'medical',
    name: 'Medical Pro',
    category: 'Professional',
    tags: ['Healthcare', 'Clinical'],
    component: ImpactTemplate,
    preview: '/templates/freelance-consultant-cv-template-14.png',
  },
  academic: {
    id: 'academic',
    name: 'Academic CV',
    category: 'Traditional',
    tags: ['Academic', 'Research'],
    component: AcademicTemplate,
    preview: '/templates/academic-research-cv-format-15.png',
  },

  // ── Photo Template (shown only when "Show photo on resume" is enabled) ──
  photo: {
    id: 'photo',
    name: 'Photo Resume',
    category: 'Professional',
    tags: ['Photo Ready', 'Premium'],
    component: PhotoTemplate,
    preview: '/templates/ats-friendly-professional-resume-template-1.png',
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

// Ensures all expected arrays/objects exist so templates never crash on undefined
export function normalizeData(data = {}) {
  return {
    personal: {
      fullName: '', currentPosition: '', email: '', phone: '',
      location: '', website: '', linkedin: '', summary: '',
      photo: '', showPhoto: false,
      ...(data.personal || {}),
    },
    experience:      Array.isArray(data.experience)      ? data.experience      : [],
    education:       Array.isArray(data.education)       ? data.education       : [],
    skills:          Array.isArray(data.skills)          ? data.skills          : [],
    certifications:  Array.isArray(data.certifications)  ? data.certifications  : [],
    strengths:       Array.isArray(data.strengths)       ? data.strengths       : [],
    achievements:    Array.isArray(data.achievements)    ? data.achievements    : [],
    languages:       Array.isArray(data.languages)       ? data.languages       : [],
    extracurricular: Array.isArray(data.extracurricular) ? data.extracurricular : [],
    projects:        Array.isArray(data.projects)        ? data.projects        : [],
    customSection:   data.customSection || { title: '', content: '' },
  };
}
