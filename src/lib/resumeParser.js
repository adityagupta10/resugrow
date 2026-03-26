import { CONTACT_PATTERNS, DATE_RANGE_REGEX } from '@/constants/ats';

// ============================================================================
// 1. DICTIONARIES & HEURISTICS
// ============================================================================

const SECTION_ALIASES = {
  summary: ['summary', 'professional summary', 'profile', 'about me', 'objective', 'overview'],
  experience: ['experience', 'work experience', 'employment history', 'professional experience', 'career history'],
  education: ['education', 'academic background', 'qualifications', 'degrees', 'academic profile'],
  skills: ['skills', 'technical skills', 'core competencies', 'expertise', 'technologies'],
  certifications: ['certifications', 'certificates', 'licenses', 'credentials'],
  projects: ['projects', 'personal projects', 'key projects', 'academic projects'],
  achievements: ['achievements', 'awards', 'honors', 'accomplishments'],
  languages: ['languages', 'language proficiency'],
  extracurricular: ['extracurricular', 'volunteer', 'leadership', 'activities']
};

const DEGREE_KEYWORDS = ['bachelor', 'master', 'phd', 'associate', 'diploma', 'mba', 'b.s', 'b.a', 'm.s', 'm.a', 'b.tech', 'bsc', 'beng'];
const COMPANY_SUFFIXES = ['inc', 'llc', 'ltd', 'corp', 'corporation', 'company', 'technologies', 'solutions', 'group'];

// ============================================================================
// 2. HELPER FUNCTIONS
// ============================================================================

function normalizeText(text) {
  return text
    .replace(/[\u2022\u2023\u25E6\u2043\u2219*-]/g, '•') // Normalize all bullet types
    .replace(/\r/g, '')                                  // Remove carriage returns
    .replace(/\t/g, ' ')                                 // Replace tabs with spaces
    .replace(/ {2,}/g, ' ')                              // Collapse multiple spaces
    .replace(/\n{3,}/g, '\n\n')                          // Cap empty lines at double breaks
    .trim();
}

function cleanLine(str) {
  return str.replace(/^[•\s]+/, '').trim(); // Remove leading bullets and spaces
}

function extractDates(line) {
  // Uses imported regex or a robust fallback
  const regex = DATE_RANGE_REGEX || /(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*\d{4}|\b\d{4}\b)\s*(?:-|to|–|—)\s*(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*\d{4}|\b\d{4}\b|Present|Current|Now)/i;
  const match = line.match(regex);
  if (!match) return null;

  const parts = match[0].split(/\s*[-–—]| to \b/i);
  return {
    raw: match[0],
    start: parts[0]?.trim() || '',
    end: parts[1]?.trim() || '',
    current: /present|current|now/i.test(parts[1] || '')
  };
}

function isLikelyCompany(str) {
  const lower = str.toLowerCase();
  if (COMPANY_SUFFIXES.some(s => lower.includes(s))) return true;
  if (str.split(/\s+/).length > 5) return false; // Too long to be a company
  return false;
}

// ============================================================================
// 3. MAIN PARSER ENGINE
// ============================================================================

export async function parseResumeText(rawText) {
  const text = normalizeText(rawText);
  const lines = text.split('\n').map(l => l.trim());
  const fullText = lines.join('\n');

  const data = {
    personal: { fullName: '', currentPosition: '', email: '', phone: '', location: '', website: '', linkedin: '', summary: '' },
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    strengths: [],
    achievements: [],
    languages: [],
    extracurricular: [],
    projects: [],
    customSection: { title: '', content: '' },
    meta: { confidence: 'low' } // Confidence tracking
  };

  // --- A. CONTACT INFO ---
  data.personal.email = fullText.match(CONTACT_PATTERNS?.email || /[\w.-]+@[\w.-]+\.\w+/)?.[0] || '';
  data.personal.phone = fullText.match(CONTACT_PATTERNS?.phone || /(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/)?.[0] || '';
  data.personal.linkedin = fullText.match(CONTACT_PATTERNS?.linkedin || /linkedin\.com\/in\/[\w.-]+/i)?.[0] || '';
  data.personal.website = fullText.match(CONTACT_PATTERNS?.website || /(github\.com\/|[\w.-]+\.(com|net|org|io|dev))/) ?.[0] || '';

  // --- B. NAME EXTRACTION (Heuristic) ---
  for (const line of lines) {
    if (!line) continue;
    const lowerLine = line.toLowerCase();
    
    // Skip if it looks like contact info or a section header
    if (lowerLine.includes(data.personal.email) || lowerLine.includes('linkedin.com')) continue;
    if (Object.values(SECTION_ALIASES).flat().some(alias => lowerLine === alias)) continue;
    
    // Valid name: 2-5 words, no numbers
    const words = line.split(/\s+/);
    if (words.length >= 2 && words.length <= 5 && !/\d/.test(line)) {
      data.personal.fullName = line;
      break;
    }
  }

  // --- C. SECTION BOUNDARY DETECTION ---
  const allAliases = Object.values(SECTION_ALIASES).flat();
  const sectionPattern = new RegExp(`^(${allAliases.join('|')})s?$`, 'im'); 
  
  const sectionMatches = [];
  let match;
  
  // Find all headers
  const globalPattern = new RegExp(`^(${allAliases.join('|')})s?$`, 'gim');
  while ((match = globalPattern.exec(fullText)) !== null) {
    const heading = match[0].toLowerCase();
    const type = Object.entries(SECTION_ALIASES).find(([_, aliases]) => aliases.includes(heading))?.[0];
    if (type) {
      sectionMatches.push({ type, index: match.index, length: match[0].length });
    }
  }

  sectionMatches.sort((a, b) => a.index - b.index);

  const sections = {};
  for (let i = 0; i < sectionMatches.length; i++) {
    const current = sectionMatches[i];
    const next = sectionMatches[i + 1];
    sections[current.type] = fullText.slice(current.index + current.length, next ? next.index : fullText.length).trim();
  }

  // --- D. PARSE SUMMARY ---
  if (sections.summary) {
    data.personal.summary = sections.summary.split('\n\n')[0].replace(/\n/g, ' ').trim();
  }

  // --- E. PARSE SKILLS (Smart Filter) ---
  if (sections.skills) {
    data.skills = sections.skills
      .split(/[,\n•|;]/)
      .map(s => cleanLine(s))
      .filter(s => s.length > 2 && s.length < 35 && !/\d{4}/.test(s)) // Filter out dates or long sentences
      .slice(0, 25);
  }

  // --- F. PARSE EXPERIENCE (Date-First Block Engine) ---
  if (sections.experience) {
    let currentExp = null;
    const expLines = sections.experience.split('\n').filter(l => l.trim());

    for (let i = 0; i < expLines.length; i++) {
      const line = expLines[i];
      const dates = extractDates(line);

      // Trigger new job block on Date find
      if (dates) {
        if (currentExp) data.experience.push(currentExp);
        currentExp = { id: Math.random().toString(36).slice(2), position: '', company: '', startDate: dates.start, endDate: dates.end, current: dates.current, description: '' };
        
        // The line before the date is usually the company or title
        const prevLine = i > 0 ? cleanLine(expLines[i - 1]) : '';
        const remainingOnDateLine = cleanLine(line.replace(dates.raw, ''));

        // Logic to split Company and Title
        let textToParse = remainingOnDateLine || prevLine;
        if (textToParse) {
          const splitAt = textToParse.split(/ at | @ | \| | - /i);
          if (splitAt.length > 1) {
            currentExp.position = splitAt[0].trim();
            currentExp.company = splitAt[1].trim();
          } else if (isLikelyCompany(textToParse)) {
            currentExp.company = textToParse;
          } else {
            currentExp.position = textToParse;
          }
        }
      } else if (currentExp) {
        // Not a date line -> Append to description if it's a bullet, otherwise it might be the company/title we missed
        if (line.startsWith('•') || line.length > 60) {
          currentExp.description += (currentExp.description ? '\n' : '') + line;
        } else if (!currentExp.company && !line.startsWith('•')) {
          currentExp.company = line;
        } else if (!currentExp.position && !line.startsWith('•')) {
          currentExp.position = line;
        }
      }
    }
    if (currentExp) data.experience.push(currentExp);
  }

  // --- G. PARSE EDUCATION ---
  if (sections.education) {
    let currentEdu = null;
    const eduLines = sections.education.split('\n').filter(l => l.trim());

    for (const line of eduLines) {
      const isDegreeLine = DEGREE_KEYWORDS.some(kw => new RegExp(`\\b${kw}\\b`, 'i').test(line));
      const dates = extractDates(line);

      if (isDegreeLine || dates) {
        if (currentEdu && (currentEdu.degree || currentEdu.institution)) Object.assign(currentEdu, { id: Math.random().toString(36).slice(2) }), data.education.push(currentEdu);
        currentEdu = { degree: '', institution: '', startDate: '', endDate: '', gpa: '' };
      }
      
      if (currentEdu) {
        if (dates && !currentEdu.endDate) {
          currentEdu.startDate = dates.start;
          currentEdu.endDate = dates.end;
        } else if (isDegreeLine && !currentEdu.degree) {
          currentEdu.degree = cleanLine(line);
        } else if (line.toLowerCase().includes('gpa')) {
          currentEdu.gpa = line.match(/\d\.\d{1,2}/)?.[0] || '';
        } else if (!currentEdu.institution && !line.startsWith('•')) {
          currentEdu.institution = cleanLine(line);
        }
      }
    }
    if (currentEdu && (currentEdu.degree || currentEdu.institution)) data.education.push(Object.assign(currentEdu, { id: Math.random().toString(36).slice(2) }));
  }

  // --- H. FALLBACK & CONFIDENCE SYSTEM ---
  data.meta.confidence = (data.experience.length > 0 && data.skills.length > 3) ? 'high' : 'low';

  // If extraction completely failed to find experience dates, capture raw text so user doesn't lose data
  if (data.experience.length === 0 && sections.experience) {
    data.experience.push({
      id: Math.random().toString(36).slice(2),
      position: 'Review Required',
      company: '',
      startDate: '', endDate: '', current: false,
      description: sections.experience.slice(0, 1500) // Dump raw text into description box
    });
  }

  return data;
}
