/**
 * Deterministic ATS Logic Modules
 * 
 * These hard-coded rules use Regex, structural mapping, and string checking 
 * to mimic legacy ATS parsers without the hallucination risks of an LLM.
 */

// 1. Personal Pronoun Penalty
export const calculatePronounUsageScore = (rawText = '') => {
  const pronouns = rawText.match(/\b(I|me|my|we|us|our)\b/gi) || [];
  const uniquePronouns = [...new Set(pronouns.map(p => p.toLowerCase()))];
  const score = uniquePronouns.length > 0 ? 0 : 10;
  
  const findings = uniquePronouns.length > 0 
    ? [{ status: 'error', message: 'First-person pronouns detected. Use telegraphic style.' }]
    : [{ status: 'pass', message: 'No first-person pronouns detected.' }];

  return { score, max: 10, findings, badWords: uniquePronouns };
};

// 2. Bullet Point Length Optimizer
export const calculateBulletLengthScore = (allBullets = []) => {
  if (!allBullets.length) return { score: 0, max: 10, findings: [{ status: 'error', message: 'No bullets found' }] };

  let badBullets = 0;
  allBullets.forEach(bullet => {
    const wordCount = bullet.split(/\s+/).length;
    if (wordCount < 8 || wordCount > 40) badBullets++;
  });

  const percentBad = badBullets / allBullets.length;
  const score = Math.max(0, Math.round((1 - percentBad) * 10));

  const findings = badBullets > 0 
    ? [{ status: 'warning', message: `${badBullets} bullets are either too short (<8 words) or too dense (>40 words).` }]
    : [{ status: 'pass', message: 'Optimal bullet length achieved across the board.' }];

  return { score, max: 10, findings };
};

// 3. Email Professionalism
export const calculateEmailProfessionalismScore = (email = '') => {
  if (!email || email === 'Not found') return { score: 0, max: 10, findings: [{ status: 'error', message: 'Email missing' }] };
  
  const localPart = email.split('@')[0] || '';
  const numbers = (localPart.match(/\d/g) || []).length;
  const unprofessional = /player|skater|boy|girl|babe|sexy|hustle|boss|crazy|69|420/i.test(localPart);

  let score = 10;
  let findings = [];

  if (numbers > 3) {
    score -= 5;
    findings.push({ status: 'warning', message: 'Email contains excessive numbers. Looks unprofessional.' });
  }
  if (unprofessional) {
    score -= 8;
    findings.push({ status: 'error', message: 'Email handle contains inappropriate or immature keywords.' });
  }

  if (score === 10) findings.push({ status: 'pass', message: 'Email format is clean and professional.' });

  return { score: Math.max(0, score), max: 10, findings };
};

// 4. Date Consistency
export const calculateDateConsistencyScore = (rawText = '') => {
  const mmYyyy = (rawText.match(/\b\d{1,2}\/\d{4}\b/g) || []).length;
  const wordYyyy = (rawText.match(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4}\b/gi) || []).length;
  const justYyyy = (rawText.match(/\b\d{4}\b/g) || []).length;
  
  let formatsUsed = 0;
  if (mmYyyy > 1) formatsUsed++;
  if (wordYyyy > 1) formatsUsed++;
  
  const score = formatsUsed > 1 ? 4 : 10;
  const findings = formatsUsed > 1
    ? [{ status: 'warning', message: 'Inconsistent date formats (e.g. 11/2020 vs Nov 2020). ATS bots prefer uniformity.' }]
    : [{ status: 'pass', message: 'Date formatting is highly consistent.' }];

  return { score, max: 10, findings };
};

// 5. Parser Safety
export const calculateParserSafetyScore = (rawText = '') => {
  const sansBullets = rawText.replace(/[\u2022\u2023\u25E6\u2043\u2219\u25CF\u25CB\u25A0\u25AA\u00B7▪●○]/g, '');
  const unsafeChars = sansBullets.match(/[^\x00-\x7F\s\w.,!?'"()/:;&%-]/g) || [];
  
  const uniqueUnsafe = [...new Set(unsafeChars)].filter(c => c.trim().length > 0);

  const score = uniqueUnsafe.length > 2 ? 0 : uniqueUnsafe.length > 0 ? 5 : 10;
  const findings = uniqueUnsafe.length > 0
    ? [{ status: 'warning', message: `Unsafe/emoji characters detected: ${uniqueUnsafe.slice(0, 3).join(' ')}. These break legacy ATS systems.` }]
    : [{ status: 'pass', message: 'Document uses safe, standard encoding characters.' }];

  return { score, max: 10, findings };
};

// 6. Header Standardization
export const calculateHeaderStandardizationScore = (orderedSections = []) => {
  let score = 10;
  const unrecognized = [];
  const recognizedMapping = ['header', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'contact'];

  orderedSections.forEach(sec => {
    if (!recognizedMapping.includes(sec.toLowerCase())) {
      unrecognized.push(sec);
      score -= 3;
    }
  });

  const findings = unrecognized.length > 0
    ? [{ status: 'warning', message: `Non-standard headers identified: "${unrecognized.join(', ')}". Use strict naming (e.g. "Experience").` }]
    : [{ status: 'pass', message: 'All section headers match ATS dictionary standards.' }];

  return { score: Math.max(0, score), max: 10, findings };
};

// 7. ALL CAPS Density
export const calculateCapsDensityScore = (rawText = '') => {
  const letters = rawText.replace(/[^a-zA-Z]/g, '');
  if (!letters.length) return { score: 10, max: 10, findings: [] };

  const caps = letters.replace(/[^A-Z]/g, '').length;
  const ratio = caps / letters.length;

  const score = ratio > 0.15 ? 4 : 10;
  const findings = ratio > 0.15
    ? [{ status: 'warning', message: `High density of ALL CAPS (${Math.round(ratio*100)}%). Excessive capitalization reduces readability.` }]
    : [{ status: 'pass', message: 'Capitalization ratio is within normal readable bounds.' }];

  return { score, max: 10, findings };
};

// 8. Link Formatting
export const calculateLinkFormattingScore = (rawText = '') => {
  const urls = rawText.match(/https?:\/\/[^\s]+/g) || [];
  let messyLinks = 0;

  urls.forEach(url => {
    if (url.includes('?') || url.includes('=') || url.includes('&')) messyLinks++;
  });

  const score = messyLinks > 0 ? 5 : 10;
  const findings = messyLinks > 0
    ? [{ status: 'warning', message: `Found ${messyLinks} messy URLs with tracking parameters. Use clean URL slugs.` }]
    : [{ status: 'pass', message: 'All hyperlinks are cleanly formatted.' }];

  return { score, max: 10, findings };
};

// 9. Contact Completeness
export const calculateContactCompletenessScore = (contact = {}) => {
  const hasEmail = !!contact.email && contact.email !== 'Not found';
  const hasPhone = !!contact.phone && contact.phone !== 'Not found';
  const hasLinkedIn = !!contact.linkedin && contact.linkedin !== 'Not found';
  
  const score = (hasEmail ? 4 : 0) + (hasPhone ? 3 : 0) + (hasLinkedIn ? 3 : 0);

  const findings = [];
  if (!hasEmail) findings.push({ status: 'error', message: 'Email address is missing.' });
  if (!hasPhone) findings.push({ status: 'error', message: 'Phone number is missing.' });
  if (!hasLinkedIn) findings.push({ status: 'warning', message: 'LinkedIn profile is highly recommended.' });

  if (findings.length === 0) findings.push({ status: 'pass', message: 'Digital footprint is rock solid.' });

  return { score, max: 10, findings };
};

// 10. Acronym Overuse
export const calculateAcronymOveruseScore = (rawText = '') => {
  const acronyms = rawText.match(/\b[A-Z]{3,}\b/g) || [];
  const unique = new Set(acronyms);
  
  let score = 10;
  if (unique.size > 15) score = 4;
  else if (unique.size > 8) score = 7;

  const findings = unique.size > 8
    ? [{ status: 'warning', message: `Heavy acronym usage (${unique.size} found). Ensure acronyms are spelled out upon first use.` }]
    : [{ status: 'pass', message: 'Acronym usage is balanced.' }];

  return { score, max: 10, findings, badWords: unique.size > 8 ? [...unique] : [] };
};

// 11. Section Order Validation
export const calculateSectionOrderScore = (orderedSections = []) => {
  let score = 10;
  let findings = [];

  const expIdx = orderedSections.findIndex(s => s.toLowerCase() === 'experience');
  const eduIdx = orderedSections.findIndex(s => s.toLowerCase() === 'education');
  const skillIdx = orderedSections.findIndex(s => s.toLowerCase() === 'skills');

  if (expIdx > -1 && skillIdx > -1 && expIdx > skillIdx) {
    score -= 4;
    findings.push({ status: 'warning', message: 'Skills appear before Experience. Traditional ATS prefers Experience immediately after Summary.' });
  }

  if (expIdx > -1 && eduIdx > -1 && expIdx > eduIdx) {
    score -= 3;
    findings.push({ status: 'info', message: 'Education appears before Experience. Only recommended for recent grads.' });
  }

  if (findings.length === 0) findings.push({ status: 'pass', message: 'Optimal chronological section hierarchy detected.' });

  return { score: Math.max(0, score), max: 10, findings };
};

// 12. Responsibility vs Achievement (Weak Verb Penalty System)
export const calculateResponsibilityVsAchievementScore = (allBullets = []) => {
  if (!allBullets.length) return { score: 0, max: 10, findings: [] };

  let responsibilityCount = 0;
  allBullets.forEach(b => {
    if (/responsible for|in charge of|handled|worked on|assisted with|helped with/gi.test(b)) responsibilityCount++;
  });

  const percentage = Math.round((responsibilityCount / allBullets.length) * 100);
  const score = Math.max(0, 10 - Math.floor(percentage / 10));

  const findings = percentage > 20
    ? [{ status: 'warning', message: `${percentage}% of bullets contain "doing" phrases rather than "achieving" phrases (e.g. "responsible for").` }]
    : [{ status: 'pass', message: 'Strong achievement language. Minimal "responsibility" fluff.' }];

  return { score, max: 10, findings };
};

// 13. File Name Professionalism
export const calculateFileNameProfessionalismScore = (fileName = '') => {
  if (!fileName || fileName === 'unknown') return { score: 10, max: 10, findings: [] }; 

  const isGeneric = /^resume\.pdf|^cv\.pdf|^document|^untitled/i.test(fileName);
  const score = isGeneric ? 4 : 10;

  const findings = isGeneric
    ? [{ status: 'warning', message: 'Generic filename detected. Rename to "FirstName_LastName_Role.pdf".' }]
    : [{ status: 'pass', message: 'Professional, personalized filename detected.' }];

  return { score, max: 10, findings };
};
