// ------------------------------------------------------------------
// ATS Scoring Engine Constants
// ------------------------------------------------------------------

export const ATS_SLABS = [
  { min: 0,  max: 10,  label: "Empty / Unreadable", color: "text-red-700", bg: "bg-red-50", border: "border-red-200", comment: "System Alert: Your file might be a flat image or non-standard encoding." },
  { min: 11, max: 20,  label: "Parsing Failure",    color: "text-red-600", bg: "bg-red-50", border: "border-red-200", comment: "Critical: Basic contact info or section headers are missing." },
  { min: 21, max: 30,  label: "Critical Errors",    color: "text-red-500", bg: "bg-red-50", border: "border-red-200", comment: "High Risk: Your resume lacks clear structure and standard headers." },
  { min: 31, max: 40,  label: "Formatting Conflict", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", comment: "Warning: Invisible elements (tables/text boxes) are scrambling your text." },
  { min: 41, max: 50,  label: "Content Thin",       color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200", comment: "Weak Match: Layout is fine, but you're missing core substance and metrics." },
  { min: 51, max: 60,  label: "Needs Optimization", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", comment: "Average: Passing readability, but failing relevance. Add 5+ industry keywords." },
  { min: 61, max: 70,  label: "Good Foundation",    color: "text-yellow-500", bg: "bg-yellow-50", border: "border-yellow-200", comment: "Solid: Clean format. Replace passive phrases with high-impact action verbs." },
  { min: 71, max: 80,  label: "Strong Match",       color: "text-green-500", bg: "bg-green-50", border: "border-green-200", comment: "Competitive: Top 20%. Adding specific quantifiable metrics will boost you higher." },
  { min: 81, max: 90,  label: "Highly Qualified",   color: "text-green-600", bg: "bg-green-50", border: "border-green-200", comment: "Elite: Perfectly optimized for bots. Ensure your LinkedIn profile matches this data." },
  { min: 91, max: 100, label: "Shortlist Ready",    color: "text-green-700", bg: "bg-green-50", border: "border-green-200", comment: "Perfect: Top-tier resume with near-perfect keyword match. Ready to apply!" },
];

// Standard section headers that ATS systems recognise
export const SECTION_PATTERNS = {
  experience: /\b(experience|work\s*history|employment|professional\s*experience|work\s*experience)\b/i,
  education: /\b(education|academic|qualifications|degrees?|certifications?)\b/i,
  skills: /\b(skills|technical\s*skills|core\s*competencies|competencies|proficiencies|technologies)\b/i,
  summary: /\b(summary|objective|profile|about\s*me|professional\s*summary|career\s*objective)\b/i,
  projects: /\b(projects|portfolio|key\s*projects)\b/i,
  awards: /\b(awards|honors|achievements|accomplishments)\b/i,
};

// Strong action verbs that ATS and recruiters value
export const STRONG_VERBS = [
  'spearheaded', 'architected', 'optimized', 'engineered', 'orchestrated',
  'implemented', 'developed', 'designed', 'led', 'managed', 'launched',
  'accelerated', 'transformed', 'delivered', 'increased', 'reduced',
  'automated', 'streamlined', 'scaled', 'pioneered', 'negotiated',
  'mentored', 'established', 'built', 'drove', 'championed',
  'revamped', 'consolidated', 'resolved', 'improved', 'generated',
  'executed', 'directed', 'coordinated', 'analyzed', 'initiated',
  'formulated', 'overhauled', 'restructured', 'elevated', 'amplified',
];

// Weak / passive verbs to flag
export const WEAK_VERBS = [
  'helped', 'worked', 'assisted', 'participated', 'was responsible',
  'contributed', 'involved', 'supported', 'handled', 'did',
  'tried', 'used', 'made', 'got', 'went',
  'had', 'put', 'took', 'gave', 'served',
];

// Contact-info regex patterns
export const CONTACT_PATTERNS = {
  email: /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/,
  phone: /(\+?\d{1,3}[\s\-]?)?\(?\d{2,4}\)?[\s\-]?\d{3,4}[\s\-]?\d{3,4}/,
  linkedin: /(?:https?:\/\/)?(?:www\.)?linkedin\s?\.\s?com\s?\/\s?(?:in|pub|profile)\s?\/[\s\n]*[a-zA-Z0-9\-_%/]+/i,
  github: /github\.com\/[a-zA-Z0-9\-_%]+/i,
  website: /https?:\/\/(?!linkedin|github)[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}/i,
};

// New Skills & Logic Constants
export const SOFT_SKILLS = [
  'leadership', 'communication', 'teamwork', 'problem solving', 'critical thinking',
  'adaptability', 'time management', 'conflict resolution', 'emotional intelligence',
  'collaboration', 'creativity', 'work ethic', 'attention to detail', 'interpersonal',
];

export const HARD_SKILLS_KEYWORDS = [
  'python', 'javascript', 'typescript', 'react', 'next.js', 'node.js', 'docker', 'kubernetes',
  'aws', 'azure', 'sql', 'nosql', 'mongodb', 'postgresql', 'java', 'c++', 'c#', 'golang', 'rust',
  'graphql', 'rest api', 'ci/cd', 'git', 'linux', 'cloud computing', 'machine learning', 'ai',
];

export const COMMON_TYPOS = {
  'experiance': 'experience',
  'mangement': 'management',
  'responsibilty': 'responsibility',
  'achievment': 'achievement',
  'knowlege': 'knowledge',
  'proyect': 'project',
  'succesful': 'successful',
  'commited': 'committed',
};

export const READABILITY_SLABS = {
  sentence_avg: 20, // max recommended words per sentence
};

// Words to ignore in repetition check (common stop words plus resume filler)
export const REPETITION_IGNORE_LIST = [
  'the', 'a', 'an', 'and', 'or', 'but', 'for', 'with', 'to', 'in', 'on', 'at', 'by', 'from',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
  'i', 'me', 'my', 'we', 'our', 'us', 'you', 'your', 'he', 'him', 'his', 'she', 'her', 'it', 'its', 'they', 'them', 'their',
  'this', 'that', 'these', 'those', 'which', 'who', 'whom', 'whose', 'where', 'when', 'why', 'how',
  'of', 'as', 'if', 'up', 'down', 'out', 'into', 'over', 'under', 'again', 'further', 'then', 'once',
  'here', 'there', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
  's', 't', 'can', 'will', 'just', 'should', 'now', 'd', 'll', 'm', 'o', 're', 've', 'y',
  'resume', 'experience', 'worked', 'responsible', 'duties'
];

// Synonym suggestions for frequently repeated high-impact words
export const SYNONYM_SUGGESTIONS = {
  led: ['guided', 'directed', 'managed', 'orchestrated', 'pioneered', 'steered'],
  managed: ['oversaw', 'supervised', 'directed', 'coordinated', 'governed', 'administered'],
  developed: ['created', 'built', 'engineered', 'formulated', 'designed', 'produced'],
  helped: ['assisted', 'supported', 'facilitated', 'aided', 'collaborated'],
  improved: ['enhanced', 'optimized', 'boosted', 'refined', 'upgraded', 'revitalized'],
  increased: ['boosted', 'maximized', 'amplified', 'elevated', 'expanded'],
  reduced: ['decreased', 'minimized', 'curtailed', 'slashed', 'lessened'],
  responsible: ['accountable', 'tasked', 'charged', 'entrusted'],
  worked: ['collaborated', 'partnered', 'engaged', 'labored'],
};

export const RESUME_CLICHES = [
  'go-getter', 'team player', 'synergy', 'hard worker', 'think outside the box',
  'detail-oriented', 'results-driven', 'self-motivated', 'dynamic', 'proactive',
  'thought leader', 'value add', 'empower', 'leverage', 'bottom line',
  'wheelhouse', 'game changer', 'hit the ground running', 'passionate', 'strategic thinker',
  'proven track record', 'world class', 'multi-tasker', 'best of breed', 'guru',
  'ninja', 'rockstar', 'evangelist', 'customer centric', 'highly qualified'
];

export const DATE_RANGE_REGEX = /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s.]+\d{2,4}\s*(?:-|to|–)\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|[a-z]*|\d{2,4}|\bPresent\b|\bCurrent\b)/gi;
