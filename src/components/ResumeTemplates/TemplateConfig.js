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
  classic: { id: 'classic', name: 'ATS Classic', component: ClassicTemplate, preview: '/templates/template-3.png' },
  modern: { id: 'modern', name: 'Modern Creative', component: ModernTemplate, preview: '/templates/template-2.png' },
  executive: { id: 'executive', name: 'Executive Serif', component: ExecutiveTemplate, preview: '/templates/template-1.png' },
  minimalist: { id: 'minimalist', name: 'Minimalist Clean', component: MinimalistTemplate, preview: '/templates/template-5.png' },
  creative: { id: 'creative', name: 'Creative Sidebar', component: CreativeTemplate, preview: '/templates/template-8.png' },
  startup: { id: 'startup', name: 'Startup Clean', component: StartupTemplate, preview: '/templates/template-13.png' },
  tech: { id: 'tech', name: 'Tech Focus', component: TechTemplate, preview: '/templates/template-6.png' },
  academic: { id: 'academic', name: 'Academic Scholar', component: AcademicTemplate, preview: '/templates/template-15.png' },
  impact: { id: 'impact', name: 'Impact Results', component: ImpactTemplate, preview: '/templates/template-4.png' },
  swiss: { id: 'swiss', name: 'Swiss Asymmetric', component: SwissTemplate, preview: '/templates/template-12.png' },
};

export function parseBullets(text) {
  if (!text) return [];
  // Split by newlines, bullets, or common separators
  return text
    .split(/\n|•|[*]/)
    .map(line => line.trim())
    .filter(line => line.length > 0);
}
