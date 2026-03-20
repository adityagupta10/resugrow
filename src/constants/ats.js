// ------------------------------------------------------------------
// ATS Scoring Engine Constants
// ------------------------------------------------------------------

export const ATS_SLABS = [
  // 🔴 THE RED ZONE: SYSTEM BLINDNESS (0-20)
  { min: 0,  max: 5,   label: "Data Void",         color: "text-red-900", bg: "bg-red-100", border: "border-red-400", comment: "Analysis Failed: The system cannot establish a data path for this file." },
  { min: 6,  max: 10,  label: "Binary Static",     color: "text-red-700", bg: "bg-red-50", border: "border-red-300", comment: "Readability Failure: The file contents are currently uninterpretable by standard parsers." },
  { min: 11, max: 15,  label: "System Mute",       color: "text-rose-700", bg: "bg-rose-50", border: "border-rose-300", comment: "Critical Obscurity: Your professional signal is not reaching the system's core sensors." },
  { min: 16, max: 20,  label: "Invisible Tier",    color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200", comment: "Severe Friction: Major structural blocks are preventing any meaningful data extraction." },

  // 🟠 THE ORANGE ZONE: HIGH FILTER RISK (21-40)
  { min: 21, max: 25,  label: "High-Filter Risk",  color: "text-orange-700", bg: "bg-orange-100", border: "border-orange-400", comment: "Automatic Rejection Risk: The system identifies this profile as high-risk for filtering." },
  { min: 26, max: 30,  label: "Parsing Friction",  color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-300", comment: "Low Recognition: The engine is struggling to map your career history to standard roles." },
  { min: 31, max: 35,  label: "Obscured Signal",   color: "text-amber-600", bg: "bg-amber-100", border: "border-amber-400", comment: "Muffled Profile: Your professional value is partially hidden behind technical inefficiencies." },
  { min: 36, max: 40,  label: "Draft Quality",     color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-300", comment: "Baseline Minimal: The profile is visible but lacks the depth required to trigger an alert." },

  // 🟡 THE YELLOW/LIME ZONE: EMERGING VISIBILITY (41-60)
  { min: 41, max: 45,  label: "Latent Power",      color: "text-yellow-700", bg: "bg-yellow-100", border: "border-yellow-400", comment: "Entry Threshold: You have cleared the basic parse, but the signal strength remains weak." },
  { min: 46, max: 50,  label: "Entry Threshold",   color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-300", comment: "Standard Presence: Your data is being indexed, but it is not currently ranked for selection." },
  { min: 51, max: 55,  label: "Active Visibility", color: "text-lime-700", bg: "bg-lime-100", border: "border-lime-400", comment: "Developing Match: The resume is moving through the funnel but lacks competitive momentum." },
  { min: 56, max: 60,  label: "Upward Velocity",   color: "text-lime-600", bg: "bg-lime-50", border: "border-lime-300", comment: "Gaining Traction: You are clearing the majority of standard machine-learning filters." },

  // 🟢 THE GREEN/EMERALD ZONE: COMPETITIVE MATCH (61-80)
  { min: 61, max: 65,  label: "Market Relevant",   color: "text-green-700", bg: "bg-green-100", border: "border-green-400", comment: "Validated Profile: You have achieved a solid balance of readability and core relevance." },
  { min: 66, max: 70,  label: "Strategic Build",   color: "text-green-600", bg: "bg-green-50", border: "border-green-300", comment: "Strong Contender: This profile is successfully communicating value to the hiring algorithm." },
  { min: 71, max: 75,  label: "Competitive Edge",  color: "text-emerald-700", bg: "bg-emerald-100", border: "border-emerald-400", comment: "High-Tier Signal: Your profile is currently outperforming the majority of the applicant pool." },
  { min: 76, max: 80,  label: "Shortlist Path",    color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-300", comment: "Qualified Match: You are positioned in the top-tier of candidates for this scoring bracket." },

  // 🔵 THE TEAL/INDIGO ZONE: HIRING MAGNET (81-100)
  { min: 81, max: 85,  label: "Impact Prime",       color: "text-teal-700", bg: "bg-teal-100", border: "border-teal-400", comment: "Elite Calibration: Your career data is perfectly synced with modern recruitment logic." },
  { min: 86, max: 90,  label: "Algorithm Favorite", color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-300", comment: "Top 5% Performance: Highly optimized signal that triggers immediate human review." },
  { min: 91, max: 95,  label: "Interview Gold",     color: "text-indigo-700", bg: "bg-indigo-100", border: "border-indigo-400", comment: "Master Class: This profile represents the industry standard for AI-ready professional stories." },
  { min: 96, max: 100, label: "Hiring Magnet",      color: "text-indigo-800", bg: "bg-indigo-50", border: "border-indigo-300", comment: "Maximum Reach: Perfectly engineered to bypass filters and dominate the shortlist." },
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
  'monetized', 'secured', 'synthesized', 'forecasted', 'negotiated',
  'championed', 'persuaded', 'validated', 'deployed', 'maximized',
];

// Weak / passive verbs to flag
export const WEAK_VERBS = [
  'helped', 'worked', 'assisted', 'participated', 'was responsible',
  'contributed', 'involved', 'supported', 'handled', 'did',
  'tried', 'used', 'made', 'got', 'went',
  'had', 'put', 'took', 'gave', 'served',
  'dealt with', 'looked after', 'kept track of', 'watched over',
  'showed', 'told', 'talked to', 'brought', 'sent', 'put together',
  'was tasked with', 'assigned to',
];

// Contact-info regex patterns
export const CONTACT_PATTERNS = {
  email: /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.(?:com|in|co|net|org|edu|gov|io|me|info)/i,
  phone: /(\+?\d{1,3}[\s\-]?)?\(?\d{2,4}\)?[\s\-]?\d{3,4}[\s\-]?\d{3,4}/,
  linkedin: /(?:https?:\/\/)?(?:www\.)?linkedin[\s\.]*com[\s\/]+(?:in|pub|profile)[\s\/]+[a-zA-Z0-9\-_%/]+/i,
  github: /github\.com\/[a-zA-Z0-9\-_%]+/i,
  website: /https?:\/\/(?!linkedin|github)[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}/i,
};

// New Skills & Logic Constants
export const SOFT_SKILLS = [
  'leadership', 'communication', 'teamwork', 'problem solving', 'critical thinking',
  'adaptability', 'time management', 'conflict resolution', 'emotional intelligence',
  'collaboration', 'creativity', 'work ethic', 'attention to detail', 'interpersonal',
  'cross-functional leadership', 'stakeholder management', 'strategic planning', 'delegation',
  'data-driven decision making', 'resource allocation', 'risk mitigation', 'prioritization',
  'asynchronous communication', 'cross-cultural collaboration', 'active listening', 'consensus building',
];

export const HARD_SKILLS_KEYWORDS = [
  'python', 'javascript', 'typescript', 'react', 'next.js', 'node.js', 'docker', 'kubernetes',
  'aws', 'azure', 'sql', 'nosql', 'mongodb', 'postgresql', 'java', 'c++', 'c#', 'golang', 'rust',
  'graphql', 'rest api', 'ci/cd', 'git', 'linux', 'cloud computing', 'machine learning', 'ai',
  'swift', 'kotlin', 'react native', 'flutter', 'ios', 'android', 'mobile ui',
  'pytorch', 'tensorflow', 'llms', 'rag', 'nlp', 'prompt engineering', 'pandas', 'spark', 'etl',
  'terraform', 'cybersecurity', 'oauth', 'jwt', 'infosec', 'bash', 'nginx',
  'figma', 'ui/ux', 'wireframing', 'product management', 'a/b testing', 'user research',
  'microservices', 'serverless', 'system design', 'kafka', 'redis', 'distributed systems',
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
  'ninja', 'rockstar', 'evangelist', 'customer centric', 'highly qualified',
  'self-starter', 'wears many hats', 'motivated', 'passion', 'hard worker',
  'value-add', 'bottom-line', 'wheelhouse', 'move the needle', 'paradigm shift',
  'expert', 'master', 'perfectionist', 'workaholic'
];

export const DATE_RANGE_REGEX = /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s.]+\d{2,4}\s*(?:-|to|–)\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|[a-z]*|\d{2,4}|\bPresent\b|\bCurrent\b)/gi;
