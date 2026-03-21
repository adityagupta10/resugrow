const HEADER_PATTERNS = [
  { key: 'about', regex: /^(about|summary|à propos)$/i },
  { key: 'experience', regex: /^(experience|expérience)$/i },
  { key: 'education', regex: /^(education|formation)$/i },
  { key: 'skills', regex: /^(top skills|skills|compétences)$/i },
  {
    key: 'certifications',
    regex: /^(licenses\s*&\s*certifications|licences\s*&\s*certifications|certifications|licences)$/i
  },
  { key: 'projects', regex: /^projects$/i },
  { key: 'volunteer', regex: /^(volunteer experience|volunteering)$/i },
  { key: 'contact', regex: /^(contact info|contact)$/i }
];

const NON_ENGLISH_MARKERS = ['à propos', 'expérience', 'compétences', 'formation', 'licences'];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeLinkedInUrl(raw) {
  const cleaned = String(raw || '')
    .replace(/\(linkedin\)/gi, '')
    .replace(/\s+/g, '')
    .trim();

  if (!cleaned) return '';

  let url = cleaned;
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  return url.replace(/\/+$/, '');
}

function detectLanguage(lowerText) {
  return NON_ENGLISH_MARKERS.some((marker) => lowerText.includes(marker)) ? 'Non-English' : 'English';
}

function isLikelyName(line) {
  const value = String(line || '').trim();
  if (!value || value.length < 4 || value.length > 60) return false;
  if (/\d/.test(value)) return false;
  if (/(about|experience|education|skills|certifications|contact)/i.test(value)) return false;

  const words = value.split(/\s+/).filter(Boolean);
  if (words.length < 2 || words.length > 5) return false;
  return words.every((word) => /^[A-Za-z.'-]+$/.test(word));
}

function toUniqueCleanList(rawSectionText) {
  return [
    ...new Set(
      String(rawSectionText || '')
        .split(/\n|,|•|;|\|/g)
        .map((item) => item.replace(/^[-*]\s*/, '').trim())
        .filter((item) => item.length > 1 && item.length < 90)
    )
  ];
}

function toExperienceEntries(rawSectionText) {
  const lines = String(rawSectionText || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return [];

  const entries = [];
  let block = [];
  const boundaryRegex =
    /\b(\d{4}\s*-\s*(present|\d{4})|present|manager|engineer|director|lead|product|analyst|intern|consultant)\b/i;

  for (const line of lines) {
    if (block.length > 0 && boundaryRegex.test(line) && block.join(' ').length > 90) {
      entries.push({ text: block.join(' ').trim() });
      block = [];
    }
    block.push(line);
  }

  if (block.length > 0) entries.push({ text: block.join(' ').trim() });
  return entries;
}

function extractLinkedInUrl(lines, fullText) {
  const inlineMatch = String(fullText || '').match(
    /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9._-]+/i
  );
  if (inlineMatch?.[0]) return normalizeLinkedInUrl(inlineMatch[0]);

  for (let idx = 0; idx < lines.length; idx += 1) {
    const line = String(lines[idx] || '').trim();
    if (!line) continue;

    const fullInLine = line.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9._-]+/i);
    if (fullInLine?.[0]) return normalizeLinkedInUrl(fullInLine[0]);

    if (/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/?$/i.test(line)) {
      const nextLine = String(lines[idx + 1] || '')
        .replace(/\(linkedin\)/gi, '')
        .trim();
      if (/^[A-Za-z0-9._-]{3,100}$/.test(nextLine)) {
        return normalizeLinkedInUrl(`www.linkedin.com/in/${nextLine}`);
      }
      return normalizeLinkedInUrl('www.linkedin.com/in/');
    }
  }

  return '';
}

function evaluateBouncer({ mode, text, lines, signatureCount, sectionCount }) {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const lower = text.toLowerCase();
  const hasContactOnlyMarker = lower.includes('contact info');
  const hasAnyLinkedInSignal =
    signatureCount > 0 || sectionCount > 0 || /linkedin\.com\/in\//i.test(text) || hasContactOnlyMarker;

  if (mode === 'pdf') {
    if (text.length < 800) {
      return {
        passed: false,
        message: 'Empty or corrupted export. Please re-export with full profile visible.'
      };
    }
    if (!hasAnyLinkedInSignal || signatureCount < 2) {
      return {
        passed: false,
        message: 'Not a valid LinkedIn PDF export.'
      };
    }
    return { passed: true };
  }

  // Paste mode needs to stay permissive for short-but-valid snippets.
  if (wordCount < 3 || lines.length === 0) {
    return {
      passed: false,
      message: 'Empty or corrupted export. Please re-export with full profile visible.'
    };
  }

  if (!hasAnyLinkedInSignal && wordCount < 8 && text.length < 140) {
    return {
      passed: false,
      message: 'Empty or corrupted export. Please re-export with full profile visible.'
    };
  }

  return { passed: true };
}

export function parseLinkedInPDF(fullText, options = {}) {
  const mode = options.mode === 'paste' ? 'paste' : 'pdf';
  const text = String(fullText || '').trim();

  if (!text) {
    return {
      error: 'Empty or corrupted export. Please re-export with full profile visible.'
    };
  }

  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const lower = text.toLowerCase();

  const signatureChecks = [
    /(about|summary|à propos)/i.test(text),
    /(experience|expérience)/i.test(text),
    /(top skills|skills|compétences)/i.test(text),
    /(licenses\s*&\s*certifications|licences\s*&\s*certifications|certifications|licences)/i.test(text),
    /education|formation/i.test(text),
    /linkedin\.com\/in\//i.test(text),
    /contact info/i.test(text)
  ];
  const signatureCount = signatureChecks.filter(Boolean).length;

  const sections = {
    header: '',
    about: '',
    experience: '',
    education: '',
    skills: '',
    certifications: '',
    projects: '',
    volunteer: '',
    contact: ''
  };

  let currentKey = 'header';
  for (const line of lines) {
    const matched = HEADER_PATTERNS.find((item) => item.regex.test(line));
    if (matched) {
      currentKey = matched.key;
      continue;
    }
    sections[currentKey] += `${line}\n`;
  }

  const parsedSections = {
    about: sections.about.trim(),
    experienceEntries: toExperienceEntries(sections.experience),
    education: toUniqueCleanList(sections.education),
    skills: toUniqueCleanList(sections.skills).map((name) => ({ name })),
    certifications: toUniqueCleanList(sections.certifications),
    projects: toUniqueCleanList(sections.projects),
    volunteer: toUniqueCleanList(sections.volunteer)
  };

  const sectionCount = [
    parsedSections.about.length > 0,
    parsedSections.experienceEntries.length > 0,
    parsedSections.education.length > 0,
    parsedSections.skills.length > 0,
    parsedSections.certifications.length > 0
  ].filter(Boolean).length;

  const bouncer = evaluateBouncer({
    mode,
    text,
    lines,
    signatureCount,
    sectionCount
  });
  if (!bouncer.passed) {
    return {
      error: bouncer.message,
      bouncer: {
        passed: false,
        signatureCount,
        sectionCount,
        mode
      }
    };
  }

  const headerLines = sections.header
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const fullNameCandidate = headerLines.find((line) => isLikelyName(line)) || lines.find((line) => isLikelyName(line));
  const fullName = fullNameCandidate || lines[0] || 'Not found';
  const headline =
    headerLines.find((line) => line !== fullName && !HEADER_PATTERNS.some((item) => item.regex.test(line))) ||
    lines[1] ||
    '';

  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const linkedInUrl = extractLinkedInUrl(lines, text);
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  const confidence = clamp(
    Math.round(
      (signatureCount / 7) * 45 +
      (sectionCount / 5) * 30 +
      Math.min(25, wordCount / 3)
    ),
    10,
    100
  );

  return {
    isValid: true,
    fullName,
    headline: String(headline).trim(),
    language: detectLanguage(lower),
    sections: {
      ...parsedSections,
      contactInfo: {
        email: emailMatch?.[0] || '',
        url: linkedInUrl
      }
    },
    confidence,
    rawTextLength: text.length,
    sectionCount,
    bouncer: {
      passed: true,
      signatureCount,
      sectionCount,
      mode
    }
  };
}
