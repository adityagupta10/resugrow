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
  classic: { id: 'classic', name: 'ATS Classic', component: ClassicTemplate },
  modern: { id: 'modern', name: 'Modern Creative', component: ModernTemplate },
  executive: { id: 'executive', name: 'Executive Serif', component: ExecutiveTemplate },
  minimalist: { id: 'minimalist', name: 'Minimalist Clean', component: MinimalistTemplate },
  creative: { id: 'creative', name: 'Creative Sidebar', component: CreativeTemplate },
  startup: { id: 'startup', name: 'Startup Clean', component: StartupTemplate },
  tech: { id: 'tech', name: 'Tech Focus', component: TechTemplate },
  academic: { id: 'academic', name: 'Academic Scholar', component: AcademicTemplate },
  impact: { id: 'impact', name: 'Impact Results', component: ImpactTemplate },
  swiss: { id: 'swiss', name: 'Swiss Asymmetric', component: SwissTemplate },
};

export function parseBullets(text) {
  if (!text) return [];
  // Split by newlines, bullets, or common separators
  return text
    .split(/\n|•|[*]/)
    .map(line => line.trim())
    .filter(line => line.length > 0);
}
