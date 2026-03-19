import { NextResponse } from 'next/server';
import {
  SECTION_PATTERNS,
  STRONG_VERBS,
  WEAK_VERBS,
  CONTACT_PATTERNS,
  SOFT_SKILLS,
  HARD_SKILLS_KEYWORDS,
  COMMON_TYPOS,
  REPETITION_IGNORE_LIST,
  SYNONYM_SUGGESTIONS,
  DATE_RANGE_REGEX,
  RESUME_CLICHES
} from '@/constants/ats';
import { parsePDF } from '@/lib/pdf-extract';

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ---------------------------------------------------------------------------
// Foundation Modules
// ---------------------------------------------------------------------------
function scoreTextExtraction(text) {
  const findings = [];
  if (!text || text.trim().length < 50) {
    findings.push({ status: 'error', message: 'Could not extract meaningful text. Your file may be an image-only PDF.' });
    return { score: 0, max: 5, findings };
  }
  findings.push({ status: 'pass', message: `Successfully extracted ${text.trim().split(/\s+/).length} words.` });
  return { score: 5, max: 5, findings };
}

function scoreContactInfo(text) {
  const findings = [];
  let score = 0;
  const checks = [
    { key: 'email', label: 'Email Address', points: 3 },
    { key: 'phone', label: 'Phone Number', points: 3 },
    { key: 'linkedin', label: 'LinkedIn URL', points: 2 },
    { key: 'github', label: 'GitHub / Portfolio', points: 1 },
    { key: 'website', label: 'Personal Website', points: 1 },
  ];
  for (const c of checks) {
    if (CONTACT_PATTERNS[c.key].test(text)) {
      score += c.points;
      findings.push({ status: 'pass', message: `${c.label} found.` });
    } else {
      findings.push({ status: 'error', message: `${c.label} not detected.` });
    }
  }
  return { score, max: 10, findings };
}

function scoreLength(text) {
  const wordCount = text.trim().split(/\s+/).length;
  if (wordCount < 150) return { score: 2, max: 5, findings: [{ status: 'warning', message: `Resume is very short (${wordCount} words). Aim for 300-800.` }] };
  if (wordCount > 1500) return { score: 3, max: 5, findings: [{ status: 'warning', message: `Resume is very long (${wordCount} words). Consider trimming.` }] };
  return { score: 5, max: 5, findings: [{ status: 'pass', message: `Good length (${wordCount} words).` }] };
}

// ---------------------------------------------------------------------------
// Impact Modules
// ---------------------------------------------------------------------------
async function scoreActionVerbs(text) {
  const nlpModule = await import('compromise');
  const nlp = nlpModule.default || nlpModule;
  if (typeof nlp !== 'function') {
    console.error('Compromise NLP is not a function:', nlp);
    return { score: 5, max: 15, findings: [], strongVerbs: [], weakVerbs: [] };
  }
  const strongFound = [];
  const weakFound = [];
  const lines = text.split(/\n/).map(l => l.trim()).filter(l => l.length > 10);
  for (const line of lines) {
    const doc = nlp(line);
    const verbs = doc.verbs().toInfinitive().out('array');
    const firstWord = line.split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, '');
    for (const sv of STRONG_VERBS) if (firstWord === sv || verbs.includes(sv)) if (!strongFound.includes(sv)) strongFound.push(sv);
    for (const wv of WEAK_VERBS) if (firstWord === wv || verbs.includes(wv)) if (!weakFound.includes(wv)) weakFound.push(wv);
  }
  let score = Math.min(strongFound.length * 2, 15);
  score = Math.max(0, score - weakFound.length);
  if (strongFound.length > 0 && score < 5) score = 5;
  const findings = [];
  if (strongFound.length > 0) findings.push({ status: 'pass', message: `Strong verbs detected: ${strongFound.slice(0, 5).join(', ')}.` });
  if (weakFound.length > 0) findings.push({ status: 'warning', message: `Weak/passive verbs found: ${weakFound.join(', ')}.` });
  if (strongFound.length === 0) findings.push({ status: 'error', message: 'No strong action verbs detected.' });
  return { score, max: 15, findings, strongVerbs: strongFound, weakVerbs: weakFound };
}

function scoreImpactMetrics(text) {
  const lines = text.split(/\n/).map(l => l.trim()).filter(l => l.length > 10);
  const metricPattern = /(\d+%|\$[\d,.]+|\b\d{2,}\b)/;
  let matches = lines.filter(l => metricPattern.test(l)).length;
  let score = Math.min(matches * 3, 15);
  const findings = [{ status: matches > 0 ? 'pass' : 'warning', message: `${matches} bullet points include metrics (%, $, numbers).` }];
  return { score, max: 15, findings };
}

function scoreReadability(text) {
  const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 10);
  const avgLength = sentences.reduce((a, b) => a + b.trim().split(/\s+/).length, 0) / (sentences.length || 1);
  let score = 5;
  const findings = [];
  if (avgLength > 25) {
    score = 2;
    findings.push({ status: 'warning', message: 'Average sentence is too long (>25 words). Simplify for recruiters.' });
  } else {
    findings.push({ status: 'pass', message: 'Sentences are concise and readable.' });
  }
  return { score, max: 5, findings };
}

function scoreRepetition(text) {
  const words = text.toLowerCase().split(/\W+/).filter(w => w.length > 2 && !REPETITION_IGNORE_LIST.includes(w));
  const counts = {};
  words.forEach(w => counts[w] = (counts[w] || 0) + 1);

  const repeated = Object.entries(counts)
    .filter(([word, count]) => count >= 3 && SYNONYM_SUGGESTIONS[word])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const findings = [];
  const repetitionData = repeated.map(([word, count]) => ({
    word,
    count,
    suggestions: SYNONYM_SUGGESTIONS[word] || []
  }));

  if (repetitionData.length > 0) {
    findings.push({ 
      status: 'warning', 
      message: `Found ${repetitionData.length} frequently repeated words: ${repetitionData.map(r => r.word).join(', ')}.` 
    });
  } else {
    findings.push({ status: 'pass', message: 'No excessive word repetition detected.' });
  }

  return { 
    score: Math.max(0, 5 - repetitionData.length * 2), 
    max: 5, 
    findings,
    repetitionData 
  };
}

// ---------------------------------------------------------------------------
// Relevance Modules
// ---------------------------------------------------------------------------
function scoreSections(text) {
  let score = 0;
  const findings = [];
  const critical = ['experience', 'education', 'skills', 'summary'];
  for (const [name, pattern] of Object.entries(SECTION_PATTERNS)) {
    if (pattern.test(text)) {
      score += critical.includes(name) ? 3 : 1;
      findings.push({ status: 'pass', message: `"${name}" section detected.` });
    } else if (critical.includes(name)) {
      findings.push({ status: 'error', message: `Missing "${name}" section.` });
    }
  }
  return { score: Math.min(score, 10), max: 10, findings };
}

function scoreSkills(text, type) {
  const list = type === 'soft' ? SOFT_SKILLS : HARD_SKILLS_KEYWORDS;
  const found = list.filter(sk => {
    const escaped = escapeRegExp(sk);
    // If the skill ends with a special char (like C++ or C#), 
    // the \b boundary might fail. We use a more flexible boundary.
    const pattern = new RegExp(`(^|\\s|[,;:.]) ${escaped}($|\\s|[,;:.])`, 'i');
    // Actually, simple word boundary \b works for the START of the word.
    // For the end, if it's C++, we just want to ensure it's not part of another word.
    const safePattern = new RegExp(`\\b${escaped}(?![a-zA-Z0-9])`, 'i');
    return safePattern.test(text);
  });
  const score = Math.min(found.length * 2, 10);
  return {
    score,
    max: 10,
    findings: [{ status: found.length > 3 ? 'pass' : 'warning', message: `Found ${found.length} ${type} skills: ${found.slice(0, 5).join(', ')}.` }]
  };
}

async function scoreKeywordMatch(resumeText, jobDescription) {
  if (!jobDescription || jobDescription.trim().length < 30) {
    return { score: 0, max: 15, findings: [{ status: 'info', message: 'No JD provided for keyword match.' }], skipped: true };
  }
  const swModule = await import('stopword');
  const removeStopwords = swModule.removeStopwords || swModule.default?.removeStopwords || swModule.default;
  if (typeof removeStopwords !== 'function') {
    console.error('Stopword removeStopwords is not a function:', removeStopwords);
    return { score: 0, max: 15, findings: [{ status: 'info', message: 'Keyword match service unavailable.' }], skipped: true };
  }
  const tokenize = (t) => removeStopwords(t.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 2));
  const resumeSet = new Set(tokenize(resumeText));
  const jdUnique = [...new Set(tokenize(jobDescription))];
  const matched = jdUnique.filter(t => resumeSet.has(t));
  const ratio = matched.length / (jdUnique.length || 1);
  return {
    score: Math.round(ratio * 15),
    max: 15,
    findings: [{ status: ratio > 0.5 ? 'pass' : 'warning', message: `Found ${Math.round(ratio * 100)}% of JD keywords.` }],
    missing: jdUnique.filter(t => !resumeSet.has(t)).slice(0, 15)
  };
}

// ---------------------------------------------------------------------------
// Technical Modules
// ---------------------------------------------------------------------------
function scoreFormatting(text) {
  let score = 5;
  const findings = [];
  if ((text.match(/[^\w\s.,;:!?@#$%&*()\-+/'"]/g) || []).length / text.length > 0.05) {
    score -= 2;
    findings.push({ status: 'error', message: 'High special character density (possible encoding issue).' });
  }
  if (text.split('\n').filter(l => l.trim().length > 15 && l.trim() === l.trim().toUpperCase()).length > 3) {
    score -= 1;
    findings.push({ status: 'warning', message: 'Excessive ALL CAPS usage.' });
  }
  if (findings.length === 0) findings.push({ status: 'pass', message: 'Clean layout detected.' });
  return { score: Math.max(0, score), max: 5, findings };
}

function scoreSpellCheck(text) {
  const findings = [];
  let score = 5;
  const foundTypos = [];
  for (const [typo, correct] of Object.entries(COMMON_TYPOS)) {
    if (new RegExp(`\\b${typo}\\b`, 'i').test(text)) {
      foundTypos.push(`${typo} (should be "${correct}")`);
      score -= 1;
    }
  }
  if (foundTypos.length > 0) {
    findings.push({ status: 'error', message: `Typo detected: ${foundTypos.join(', ')}.` });
  } else {
    findings.push({ status: 'pass', message: 'No common resume typos found.' });
  }
  return { score: Math.max(0, score), max: 5, findings };
}

// ---------------------------------------------------------------------------
// Advanced Modules
// ---------------------------------------------------------------------------

async function scoreTenseAlignment(text) {
  const nlpModule = await import('compromise');
  const nlp = nlpModule.default || nlpModule;
  const findings = [];
  let score = 5;
  let mismatches = 0;

  // Split text into lines to find date markers
  const lines = text.split('\n').map(l => l.trim());
  let currentJobIsPast = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isDateLine = DATE_RANGE_REGEX.test(line);
    
    if (isDateLine) {
      currentJobIsPast = !(/\b(Present|Current)\b/i.test(line));
      DATE_RANGE_REGEX.lastIndex = 0; // Reset regex
      continue;
    }

    // Heuristic: Check bullets (lines starting with - or •)
    if (line.startsWith('-') || line.startsWith('•') || line.length > 20) {
      const doc = nlp(line);
      const verbs = doc.verbs().json();
      
      verbs.forEach(v => {
        const tense = v.verb?.tense || 'present'; // Default to present
        if (currentJobIsPast && tense === 'present') {
          mismatches++;
        } else if (!currentJobIsPast && tense === 'past') {
          // Exception: "Led" might be okay if referring to a completed project within a current role
          // but usually we want present for active roles
          mismatches++;
        }
      });
    }
  }

  score = Math.max(0, 5 - mismatches);
  if (mismatches > 0) {
    findings.push({ status: 'warning', message: `Detected ${mismatches} verb tense inconsistencies across job blocks.` });
  } else {
    findings.push({ status: 'pass', message: 'Consistent verb tenses throughout experience blocks.' });
  }

  return { score, max: 5, findings };
}

function scoreCliches(text) {
  const found = [];
  const lowercaseText = text.toLowerCase();
  
  RESUME_CLICHES.forEach(cliche => {
    if (lowercaseText.includes(cliche)) {
      found.push(cliche);
    }
  });

  const score = Math.max(0, 5 - found.length);
  const findings = [];
  
  if (found.length > 0) {
    findings.push({ 
      status: 'warning', 
      message: `Avoid "fluff" words: ${found.slice(0, 3).join(', ')}. Use concrete metrics instead.` 
    });
  } else {
    findings.push({ status: 'pass', message: 'No clichés or "empty" buzzwords detected.' });
  }

  return { score, max: 5, findings };
}

function scoreEmploymentGaps(text) {
  const dateRanges = text.match(DATE_RANGE_REGEX) || [];
  const findings = [];
  let score = 5;
  
  if (dateRanges.length < 2) return { score: 5, max: 5, findings: [{ status: 'info', message: 'Not enough date data to detect gaps.' }] };

  try {
    const parsedDates = dateRanges.map(range => {
      const parts = range.split(/(?:-|to|–)/i).map(p => p.trim());
      const startStr = parts[0];
      const endStr = parts[1];
      
      const parseDate = (s) => {
        if (/\b(Present|Current)\b/i.test(s)) return new Date();
        return new Date(s);
      };

      return { start: parseDate(startStr), end: parseDate(endStr) };
    }).filter(d => !isNaN(d.start.getTime()) && !isNaN(d.end.getTime()));

    // Sort by end date descending (newest first)
    parsedDates.sort((a, b) => b.end - a.end);

    let largeGaps = 0;
    for (let i = 0; i < parsedDates.length - 1; i++) {
      const nextStart = parsedDates[i].start;
      const prevEnd = parsedDates[i + 1].end;
      
      // Diff in months
      const gapMonths = (nextStart - prevEnd) / (1000 * 60 * 60 * 24 * 30);
      if (gapMonths > 3.5) {
        largeGaps++;
      }
    }

    if (largeGaps > 0) {
      findings.push({ status: 'warning', message: `Potential gaps detected in employment history (${largeGaps}). Explain these in your summary.` });
    } else {
      findings.push({ status: 'pass', message: 'Continental employment history with no major gaps.' });
    }
  } catch (err) {
    return { score: 5, max: 5, findings: [] };
  }

  return { score, max: 5, findings };
}

function scoreLayoutArtifacts(text) {
  const columnArtifacts = (text.match(/\s{6,}/g) || []).length;
  const tabArtifacts = (text.match(/\t/g) || []).length;
  const total = columnArtifacts + tabArtifacts;
  
  const findings = [];
  let score = 5;

  if (total > 5) {
    score = 0;
    findings.push({ status: 'error', message: 'Complex multi-column/table formatting detected. This confuses many ATS bots.' });
  } else {
    findings.push({ status: 'pass', message: 'Single-column structure detected. Highly ATS friendly.' });
  }

  return { score, max: 5, findings };
}

function scoreLinkedInPolish(extractedData) {
  const url = extractedData?.contact?.linkedin || '';
  const findings = [];
  let score = 5;

  if (!url || url === 'Not found') {
    return { 
      score: 0, 
      max: 5, 
      findings: [{ status: 'error', message: 'LinkedIn profile not detected. Most recruiters search for your presence before an interview.' }] 
    };
  }

  // Heuristic: uncustomized URLs usually end with a hash/hex string like -8b3a192
  const isUncustomized = /-[a-z0-9]{7,12}$/i.test(url.replace(/\/$/, ''));
  
  if (isUncustomized) {
    score = 3;
    findings.push({ status: 'warning', message: 'Your LinkedIn handle is uncustomized. Claim a professional, clean URL.' });
  } else {
    findings.push({ status: 'pass', message: 'Professional, customized LinkedIn URL detected.' });
  }

  return { score, max: 5, findings };
}

// ---------------------------------------------------------------------------
// Main POST Handler
// ---------------------------------------------------------------------------
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume');
    const jd = formData.get('jobDescription') || '';
    if (!file) return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileInfo = {
      size: `${(file.size / 1024).toFixed(0)} KB`,
      type: file.type.includes('pdf') ? 'PDF' : file.name.split('.').pop().toUpperCase(),
      isPdf: file.type.includes('pdf')
    };

    let text;
    try {
      text = await parsePDF(buffer);
    } catch (err) {
      console.error('PDF Parse Error:', err);
      return NextResponse.json({ error: 'PDF parsing failed' }, { status: 200 });
    }

    // Extraction for UI lists
    const extractedData = {
      contact: {
        email: (text.match(CONTACT_PATTERNS.email)?.[0] || 'Not found').replace(/\s+/g, ''),
        phone: (text.match(CONTACT_PATTERNS.phone)?.[0] || 'Not found').replace(/\s+/g, ''),
        linkedin: (text.match(CONTACT_PATTERNS.linkedin)?.[0] || 'Not found').replace(/\s+/g, '')
      },
      sections: Object.entries(SECTION_PATTERNS)
        .filter(([name, pattern]) => pattern.test(text))
        .map(([name]) => name.charAt(0).toUpperCase() + name.slice(1))
    };

    // 2. Score Individual Modules
    const textExtraction = { score: text ? 5 : 0, max: 5, findings: text ? [{ status: 'pass', message: 'Text successfully extracted.' }] : [{ status: 'error', message: 'Failed to extract text. Check file encoding.' }] };
    const contactInfo = scoreContactInfo(text);
    const length = scoreLength(text);
    const fileMetadata = { score: fileInfo.isPdf ? 5 : 3, max: 5, findings: [{ status: fileInfo.isPdf ? 'pass' : 'warning', message: `File format: ${fileInfo.type}. ${fileInfo.isPdf ? 'Ideal' : 'Consider PDF'}.` }] };
    
    const actionVerbs = await scoreActionVerbs(text);
    const impactMetrics = scoreImpactMetrics(text);
    const readability = scoreReadability(text);
    const repetition = scoreRepetition(text);
    const tenseAlignment = await scoreTenseAlignment(text);
    const cliches = scoreCliches(text);

    const sections = scoreSections(text);
    const hardSkills = scoreSkills(text, 'hard');
    const softSkills = scoreSkills(text, 'soft');
    const kwMatch = await scoreKeywordMatch(text, jd);

    const formatting = scoreFormatting(text);
    const spellCheck = scoreSpellCheck(text);
    const layoutArtifacts = scoreLayoutArtifacts(text);
    const employmentGaps = scoreEmploymentGaps(text);
    const linkedinPolish = scoreLinkedInPolish(extractedData);

    // 3. Group into Categories
    const categories = {
      foundation: {
        title: 'Foundation',
        summary: 'These are the non-negotiables. If an ATS cannot extract your text or find your contact details, your application may be automatically discarded.',
        score: textExtraction.score + contactInfo.score + length.score + fileMetadata.score,
        max: 25,
        modules: { textExtraction, contactInfo, length, fileMetadata }
      },
      impact: {
        title: 'Impact',
        summary: 'We analyze your use of strong action verbs, quantifiable metrics, and readability to ensure your achievements stand out instantly.',
        score: actionVerbs.score + impactMetrics.score + readability.score + repetition.score + tenseAlignment.score + cliches.score,
        max: 50,
        modules: { actionVerbs, impactMetrics, readability, repetition, tenseAlignment, cliches }
      },
      relevance: {
        title: 'Relevance',
        summary: 'Alignment with job requirements. We check for core hard/soft skills and keyword density critical for passing algorithmic filters.',
        score: sections.score + hardSkills.score + softSkills.score + (kwMatch.skipped ? 0 : kwMatch.score),
        max: kwMatch.skipped ? 30 : 45,
        modules: { sections, hardSkills, softSkills, kwMatch }
      },
      technical: {
        title: 'Trust & Layout',
        summary: 'Technical glitches like spelling errors or complex formatting can scramble your data. This section ensures your resume is bot-ready.',
        score: formatting.score + spellCheck.score + layoutArtifacts.score + employmentGaps.score + linkedinPolish.score,
        max: 25,
        modules: { formatting, spellCheck, layoutArtifacts, employmentGaps, linkedinPolish }
      }
    };

    // 4. Calculate Final Totals
    let totalScore = 0;
    let totalMax = 0;
    Object.values(categories).forEach(cat => {
      totalScore += cat.score;
      totalMax += cat.max;
    });

    return NextResponse.json({
      score: Math.round((totalScore / totalMax) * 100),
      fileInfo,
      categories,
      repetitionData: repetition.repetitionData,
      missingKeywords: kwMatch.skipped ? [] : kwMatch.missing,
      verbAnalysis: {
        strong: actionVerbs.strongVerbs,
        weak: actionVerbs.weakVerbs
      },
      extractedData
    });
  } catch (err) {
    console.error('ATS Scan Error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
