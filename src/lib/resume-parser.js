/**
 * Robust Resume Parser Logic
 * Takes raw extracted text from a PDF (e.g., pdf-parse) and converts it into a structured
 * JSON format specifically designed for ATS metric modules.
 */

const SECTION_MAP = {
  summary: /^(summary|profile|professional profile|objective|about me|career summary|professional summary)$/i,
  experience: /^(experience|work history|employment|professional background|work experience|career history|background)$/i,
  education: /^(education|academic|qualifications|academic background|academic record|credentials)$/i,
  skills: /^(skills|technical skills|expertise|competencies|core competencies|it skills|technical expertise)$/i,
  projects: /^(projects|personal projects|technical projects|academic projects|key projects)$/i,
  certifications: /^(certifications|licenses|awards|honors|achievements|certifications and licenses)$/i,
};

/**
 * Transforms raw resume text into a highly structured JSON object.
 * @param {string} rawText The flattened string returned by pdf extraction
 * @returns {object} Parsed JSON with cleanly grouped sections
 */
export function parseResumeText(rawText) {
  // 1. Pre-processing: Clean weird whitespace and normalize bullets.
  // PDF extraction libraries notorious for returning bizarre unicode bullet characters.
  const cleanText = rawText
    .replace(/\r\n/g, '\n') // Normalize Windows newlines
    .replace(/[\u2022\u2023\u25E6\u2043\u2219\u25CF\u25CB\u25A0\u25AA\u00B7▪●○]/g, '-') // Normalize a wide array of PDF bullets to a standard dash
    .trim();

  // 2. Sliding-Window Parsing
  const sections = {};
  const lines = cleanText.split('\n').map(l => l.trim()).filter(Boolean);
  
  let currentSection = 'header'; // The part before the first section (usually Contact info)
  sections[currentSection] = [];

  lines.forEach((line) => {
    // We clean the line of punctuation just for the header check to catch things like "EXPERIENCE -"
    const cleanLineForHeaderCheck = line.replace(/[^A-Za-z ]/g, '').trim();

    // Check if the current line matches a known header synonym
    const matchedSection = Object.entries(SECTION_MAP).find(([key, regex]) => 
      // Ensure the line matches our regex AND is short (Headers rarely exceed 45 chars)
      // This strict length check prevents false positives when a user writes a regular
      // sentence that happens to say "My work experience includes..."
      regex.test(cleanLineForHeaderCheck) && cleanLineForHeaderCheck.length < 45
    );

    if (matchedSection) {
      currentSection = matchedSection[0]; // e.g., 'experience'
      if (!sections[currentSection]) {
         sections[currentSection] = [];
      }
    } else {
      sections[currentSection].push(line);
    }
  });

  return finalizeSections(sections);
}

/**
 * Normalizes and deeply formats the broadly captured sections.
 * @param {object} rawSections Key-value mapping of raw lines grouped by header
 */
function finalizeSections(rawSections) {
  const structured = {
    contact: rawSections.header || [],
    summary: rawSections.summary?.join(' ') || '',
    experience: formatExperience(rawSections.experience || []),
    skills: formatSkills(rawSections.skills || []),
    education: rawSections.education || [],
    projects: rawSections.projects || [],
    certifications: rawSections.certifications || [], // Normalized key name
    raw: rawSections // Keep raw segmented text for global logic (like acronym checks)
  };
  
  // Clean up contact fallback (sometimes there are weird single-character artifacts)
  if (structured.contact) {
    structured.contact = structured.contact.filter(line => line.length > 2);
  }
  
  return structured;
}

/**
 * Specifically targets the Experience Section to pull out individual jobs and sub-bullets.
 * This is crucial for metricDensity and verbStrength logic.
 */
function formatExperience(lines) {
  const jobs = [];
  let currentJob = null;

  lines.forEach(line => {
    // Detect a Date range (e.g., "2020 - 2024", "Jan 2022 -", "Present", "Current")
    const isDate = /(\d{4}|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\b|Present|Current)/i.test(line);
    
    // A line is likely a job header if it contains a date and is relatively short,
    // OR if it's very short and capitalized (company name fallback).
    // This heuristic handles the lack of explicit HTML hierarchy in parsed PDFs.
    if (isDate && line.length < 80 && !line.startsWith('-')) {
      if (currentJob) jobs.push(currentJob);
      currentJob = { titleAndCompany: line.trim(), bullets: [] };
    } else if (currentJob) {
      // If the line starts with our normalized dash, it's a new bullet point
      if (line.startsWith('-')) {
        currentJob.bullets.push(line.replace(/^-/, '').trim());
      } else if (currentJob.bullets.length > 0) {
        // [Crucial Feature]: Multi-line wrapping fallback.
        // If it doesn't start with a dash but we already have bullets,
        // it's almost certainly the wrapped text of the previous bullet point.
        const lastIdx = currentJob.bullets.length - 1;
        currentJob.bullets[lastIdx] += ` ${line}`;
      } else {
         // It might be a subtitle (like "Software Engineer") just below the Company+Date but before the bullets.
         // We append it to the title object for broader context.
         currentJob.titleAndCompany += ` | ${line}`;
      }
    } else {
       // We haven't hit a date/job header yet, but there's valid text. 
       // We create a fallback job block to hold these orphaned lines rather than losing them.
       currentJob = { titleAndCompany: "General/Unknown Role", bullets: [] };
       if (line.startsWith('-')) {
          currentJob.bullets.push(line.replace(/^-/, '').trim());
       } else {
          currentJob.titleAndCompany += ` | ${line}`;
       }
    }
  });

  // Push the final job object hanging in memory
  if (currentJob) jobs.push(currentJob);
  return jobs;
}

/**
 * Extracts and deduplicates skills from a variety of user formatting styles.
 */
function formatSkills(lines) {
  // Join all lines, then split by common PDF separators: commas, pipes, tabs, or our normalized bullet.
  const allSkills = lines
    .join(' ')
    .split(/[,|\t-]/)
    .map(s => s.trim())
    // Keep meaningful words, ignore single letters or empty spaces
    .filter(s => s.length > 1);
    
  return [...new Set(allSkills)]; // Remove duplicates
}
