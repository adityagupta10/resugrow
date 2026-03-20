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
import { INDUSTRY_MAPPINGS } from '@/constants/industry_keywords';
import semanticDict from '@/constants/semantic_dict.json';
import { parsePDF } from '@/lib/pdf-extract';
import { detectDocumentType } from '@/lib/documentAnalyzer';

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ---------------------------------------------------------------------------
// Foundation Modules
// ---------------------------------------------------------------------------
function scoreContactInfo(text) {
  const findings = [];
  let score = 0;
  const checks = [
    { key: 'email', label: 'Email Address', points: 5 },
    { key: 'phone', label: 'Phone Number', points: 5 },
    { key: 'linkedin', label: 'LinkedIn URL', points: 3 },
    { key: 'github', label: 'GitHub / Portfolio', points: 1 },
    { key: 'website', label: 'Personal Website', points: 1 },
  ];
  for (const c of checks) {
    if (CONTACT_PATTERNS[c.key].test(text)) {
      score += c.points;
      let msg = `${c.label} found.`;
      if (c.key === 'linkedin' && !text.match(CONTACT_PATTERNS.linkedin)?.[0].endsWith('/')) {
        msg += " Tip: End your LinkedIn URL with a forward slash '/' for better ATS recognition.";
      }
      findings.push({ status: 'pass', message: msg });
    } else {
      findings.push({ status: 'error', message: `${c.label} not detected.` });
    }
  }
  return { score, max: 15, findings };
}

function scoreReadabilityExtraction(text) {
  const findings = [];
  let score = 0;
  
  // 1. Extraction Check (2 pts)
  if (text && text.trim().length >= 50) {
    score += 2;
    findings.push({ status: 'pass', message: 'Text successfully extracted and readable.' });
  } else {
    findings.push({ status: 'error', message: 'Extraction failed. Ensure your file is not an image-only PDF.' });
  }

  // 2. Length Check (3 pts)
  const wordCount = text.trim().split(/\s+/).length;
  if (wordCount >= 150 && wordCount <= 1500) {
    score += 3;
    findings.push({ status: 'pass', message: `Ideal length (${wordCount} words).` });
  } else if (wordCount > 1500) {
    score += 1.5;
    findings.push({ status: 'warning', message: `Resume is long (${wordCount} words). Aim for under 1000.` });
  } else {
    score += 1;
    findings.push({ status: 'warning', message: `Resume too short (${wordCount} words). Add more detail.` });
  }

  return { score, max: 5, findings };
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
  
  let matches = 0;
  let strongBullets = 0;
  
  for (const l of lines) {
    if (metricPattern.test(l)) {
      matches++;
      const hasActionVerb = STRONG_VERBS.some(v => l.toLowerCase().includes(v));
      const hasNumber = /\d/.test(l);
      const hasPercentage = /%/.test(l);
      if (hasActionVerb && hasNumber && hasPercentage) strongBullets++;
    }
  }
  
  let score = Math.min((matches * 2) + (strongBullets * 3), 15);
  const findings = [];
  if (matches > 0) findings.push({ status: 'pass', message: `${matches} bullet points include metrics (%, $, numbers).` });
  if (strongBullets > 0) findings.push({ status: 'pass', message: `Found ${strongBullets} Elite "Strong" bullets (Verb + Number + %).` });
  if (matches === 0) findings.push({ status: 'warning', message: 'No metrics (%, $) found in bullets.' });
  
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

function scoreSkills(text, type, targetedKeywords = null) {
  const list = type === 'soft' ? SOFT_SKILLS : (targetedKeywords || HARD_SKILLS_KEYWORDS);
  const found = list.filter(sk => {
    const escaped = escapeRegExp(sk);
    const safePattern = new RegExp(`\\b${escaped}(?![a-zA-Z0-9])`, 'i');
    return safePattern.test(text);
  });
  
  // Cap at max 10 points. If a targeted list is small, we calculate proportional score.
  let pointsPerFind = list.length < 20 ? 3 : 2;
  const score = Math.min(found.length * pointsPerFind, 10);
  
  return {
    score,
    max: 10,
    findings: [{ status: found.length > 3 ? 'pass' : 'warning', message: `Found ${found.length} ${type} skills: ${found.slice(0, 5).join(', ')}.` }]
  };
}

async function scoreKeywordMatch(resumeText, jobDescription) {
  if (!jobDescription || jobDescription.trim().length < 30) {
    return { score: 0, max: 15, findings: [{ status: 'info', message: 'No JD provided for keyword match.' }], skipped: true, gapAnalysis: [] };
  }
  const swModule = await import('stopword');
  const removeStopwords = swModule.removeStopwords || swModule.default?.removeStopwords || swModule.default;
  
  const nlpModule = await import('compromise');
  const nlp = nlpModule.default || nlpModule;
  if (typeof removeStopwords !== 'function') {
    return { score: 0, max: 15, findings: [{ status: 'info', message: 'Keyword match service unavailable.' }], skipped: true, gapAnalysis: [] };
  }
  
  const tokenize = (t) => removeStopwords(t.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 2));
  const resumeSet = new Set(tokenize(resumeText));
  const resumeTextLower = resumeText.toLowerCase();
  
  const jdDoc = nlp(jobDescription);
  const jdNouns = jdDoc.nouns().out('array').map(n => n.toLowerCase());
  const resumeNounsSet = new Set(nlp(resumeText).nouns().out('array').map(n => n.toLowerCase()));

  const jdUnique = [...new Set(tokenize(jobDescription))];
  let matchedCount = 0;
  const missing = [];
  const gapAnalysis = [];

  for (const t of jdUnique) {
    if (resumeSet.has(t)) {
      matchedCount++;
    } else {
      let semanticMatched = false;
      const synonyms = semanticDict[t] || [];
      for (const syn of synonyms) {
        if (resumeTextLower.includes(syn)) {
          semanticMatched = true;
          break;
        }
      }
      if (semanticMatched) {
        matchedCount++;
      } else {
        missing.push(t);
        if (jdNouns.includes(t) && !resumeNounsSet.has(t) && gapAnalysis.length < 5) {
          gapAnalysis.push({
            missing: t,
            suggestion: `The JD emphasizes '${t}'. Consider rewriting an experience bullet to include it.`
          });
        }
      }
    }
  }

  const ratio = matchedCount / (jdUnique.length || 1);
  return {
    score: Math.min(15, Math.round(ratio * 15)),
    max: 15,
    findings: [{ status: ratio > 0.5 ? 'pass' : 'warning', message: `Found ${Math.round(ratio * 100)}% of JD keywords (including semantic matches).` }],
    missing: missing.slice(0, 15),
    gapAnalysis: gapAnalysis
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

function scoreLayoutArtifacts(text, industryMode) {
  const columnArtifacts = (text.match(/\s{6,}/g) || []).length;
  const tabArtifacts = (text.match(/\t/g) || []).length;
  const total = columnArtifacts + tabArtifacts;
  
  const findings = [];
  let score = 5;

  if (total > 5) {
    if (industryMode === 'Creative') {
      findings.push({ status: 'pass', message: 'Multi-column formatting detected, but acceptable for Creative roles.' });
    } else {
      score = 0;
      findings.push({ status: 'error', message: 'Complex multi-column/table formatting detected. This confuses many ATS bots.' });
    }
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
    const industryMode = formData.get('industryMode') || 'Standard';
    
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

    // 1.5. Validate Document Type
    const docAnalysis = detectDocumentType(text);
    if (!docAnalysis.isResume) {
      return NextResponse.json({
        error: `Upload Error: The provided file appears to be a ${docAnalysis.identifiedType}. Please upload a standard Resume PDF for ATS analysis.`
      }, { status: 400 });
    }

    // Extraction for UI lists
    const extractedData = {
      contact: {
        email: (text.match(CONTACT_PATTERNS.email)?.[0] || 'Not found').trim(),
        phone: (text.match(CONTACT_PATTERNS.phone)?.[0] || 'Not found').trim(),
        linkedin: (text.match(CONTACT_PATTERNS.linkedin)?.[0] || 'Not found').trim()
      },
      sections: Object.entries(SECTION_PATTERNS)
        .filter(([name, pattern]) => pattern.test(text))
        .map(([name]) => name.charAt(0).toUpperCase() + name.slice(1))
    };

    // 2. Score Individual Modules
    const contactInfo = scoreContactInfo(text);
    const readabilityExtraction = scoreReadabilityExtraction(text);
    const fileMetadata = { score: fileInfo.isPdf ? 5 : 3, max: 5, findings: [{ status: fileInfo.isPdf ? 'pass' : 'warning', message: `File format: ${fileInfo.type}. ${fileInfo.isPdf ? 'Ideal' : 'Consider PDF'}.` }] };
    
    const actionVerbs = await scoreActionVerbs(text);
    const impactMetrics = scoreImpactMetrics(text);
    const readability = scoreReadability(text);
    const repetition = scoreRepetition(text);
    const tenseAlignment = await scoreTenseAlignment(text);
    const cliches = scoreCliches(text);

    const sections = scoreSections(text);
    
    // Evaluate standard Hard Skills
    const hardSkills = scoreSkills(text, 'hard'); // defaults to global HARD_SKILLS_KEYWORDS
    
    // Apply Bonus Points for Industry-Specific Keywords
    if (industryMode && INDUSTRY_MAPPINGS[industryMode]) {
      const industryKeys = INDUSTRY_MAPPINGS[industryMode];
      const industryFound = industryKeys.filter(sk => {
        const escaped = escapeRegExp(sk);
        const safePattern = new RegExp(`\\b${escaped}(?![a-zA-Z0-9])`, 'i');
        return safePattern.test(text);
      });

      if (industryFound.length > 0) {
        const bonusPoints = industryFound.length * 2;
        hardSkills.score = Math.min(hardSkills.score + bonusPoints, 15); // Cap at 15 with bonus
        hardSkills.max = 15; // Increase max potential if applying for specific industry
        hardSkills.findings.push({ 
          status: 'pass', 
          message: `Bonus: Found ${industryFound.length} industry keywords for ${industryMode}: ${industryFound.slice(0, 5).join(', ')}. (+${bonusPoints} pts)` 
        });
      }
    }
    
    const softSkills = scoreSkills(text, 'soft');
    const kwMatch = await scoreKeywordMatch(text, jd);

    const formatting = scoreFormatting(text);
    const spellCheck = scoreSpellCheck(text);
    const layoutArtifacts = scoreLayoutArtifacts(text, industryMode);
    const employmentGaps = scoreEmploymentGaps(text);
    const linkedinPolish = scoreLinkedInPolish(extractedData);

    // 3. Group into Categories
    const categories = {
      foundation: {
        title: 'Foundation',
        summary: 'These are the non-negotiables. If an ATS cannot extract your text or find your contact details, your application may be automatically discarded.',
        score: contactInfo.score + readabilityExtraction.score + fileMetadata.score,
        max: 25,
        modules: { contactInfo, readabilityExtraction, fileMetadata }
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

    // 4. Calculate Final V2 Score & Normalizations
    let wFoundation = 0.15, wImpact = 0.30, wRelevance = 0.40, wTechnical = 0.15;
    if (industryMode === 'Executive & Leadership') { wImpact += 0.10; wFoundation -= 0.10; }

    const getScore = (cat, weight) => {
      if (cat.max === 0) return { weighted: 0, raw: 0 };
      let rawPct = cat.score / cat.max;
      if (rawPct > 0.8) rawPct = Math.min(1.0, rawPct * 1.1); // Non-Linear Elit Boost
      return { weighted: Math.min(weight, rawPct * weight), raw: cat.score / cat.max };
    };

    const foundationCalc = getScore(categories.foundation, wFoundation);
    const impactCalc = getScore(categories.impact, wImpact);
    const relevanceCalc = getScore(categories.relevance, wRelevance);
    const technicalCalc = getScore(categories.technical, wTechnical);

    const totalV2Score = Math.round((foundationCalc.weighted + impactCalc.weighted + relevanceCalc.weighted + technicalCalc.weighted) * 100);

    // Interview Probability Combine Relevance (40%) and Impact (30%)
    let probability = "Medium";
    if (totalV2Score > 80) {
      probability = "High";
    } else if (relevanceCalc.raw < 0.5) {
      probability = "Low";
    } else if (relevanceCalc.raw >= 0.8 && impactCalc.raw >= 0.8) {
      probability = "High";
    } else if (relevanceCalc.raw + impactCalc.raw > 1.4) {
      probability = "High";
    }

    return NextResponse.json({
      score: totalV2Score,
      probability,
      gapAnalysis: kwMatch.skipped ? [] : kwMatch.gapAnalysis,
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
