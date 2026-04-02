const PASSIVE_VOICE_REGEX = /\b(am|are|is|was|were|be|being|been)\b\s*([\w\s]+ed|\w+en)\b/gi;
const WEAK_PHRASES = ['i feel', 'i believe', 'in my opinion', 'responsible for', 'duties included', 'hard working', 'team player', 'looking for an opportunity'];
const POWER_VERBS = ['achieved', 'accelerated', 'built', 'delivered', 'drove', 'engineered', 'executed', 'grew', 'headed', 'implemented', 'initiated', 'launched', 'led', 'managed', 'negotiated', 'optimized', 'orchestrated', 'owned', 'pioneered', 'produced', 'reduced', 'revamped', 'scaled', 'secured', 'spearheaded', 'streamlined', 'transformed'];

function extractKeywords(text, count = 5) {
  if (!text) return [];
  const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
  const freq = words.reduce((acc, word) => {
    if (!POWER_VERBS.includes(word) && word.length > 4) {
      acc[word] = (acc[word] || 0) + 1;
    }
    return acc;
  }, {});
  return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, count).map(e => e[0]);
}

function analyzeLength(text) {
  const wordCount = text.split(/\s+/).length;
  let score = 100;
  let suggestion = '';
  if (wordCount < 200) {
    score = 50;
    suggestion = 'Your cover letter is too short. Aim for 250-400 words to provide enough detail.';
  } else if (wordCount > 450) {
    score = 60;
    suggestion = 'Your cover letter is too long. Aim for 250-400 words for recruiter readability.';
  } else if (wordCount > 380) {
    score = 90;
  }
  return { score, wordCount, suggestion };
}

function analyzeKeywords(letterText, jobDescText) {
  if (!jobDescText) return { score: 50, missingKeywords: [], density: 0 };
  const jdKeywords = extractKeywords(jobDescText, 10);
  const letterLower = letterText.toLowerCase();
  const foundKeywords = jdKeywords.filter(kw => letterLower.includes(kw));
  const missingKeywords = jdKeywords.filter(kw => !letterLower.includes(kw));
  const score = (foundKeywords.length / jdKeywords.length) * 100;
  const density = (foundKeywords.length / (letterText.split(/\s+/).length || 1)) * 100;
  return { score: Math.round(score), missingKeywords, density: density.toFixed(2) };
}

function analyzePersonalization(form) {
  let score = 20;
  const issues = [];
  if (form.companyName) score += 30;
  else issues.push('Missing company name. Generic letters get ignored.');
  if (form.jobTitle) score += 30;
  else issues.push('Missing job title. Always tailor your letter to a specific role.');
  if (form.hiringManager) score += 20;
  return { score, issues };
}

function analyzeImpact(text) {
  const metricRegex = /(\d+%|\$\d+|\d+x|\d{2,})/g;
  const metricsFound = (text.match(metricRegex) || []).length;
  const powerVerbCount = (text.toLowerCase().match(new RegExp(POWER_VERBS.join('|'), 'g')) || []).length;
  let score = (metricsFound * 30) + (powerVerbCount * 10);
  return { score: Math.min(100, score), powerVerbCount, metricsFound };
}

function analyzeClarity(text) {
  const passiveMatches = (text.match(PASSIVE_VOICE_REGEX) || []).length;
  const weakMatches = WEAK_PHRASES.filter(p => text.toLowerCase().includes(p));
  let score = 100 - (passiveMatches * 20) - (weakMatches.length * 15);
  const issues = [];
  if (passiveMatches > 0) issues.push(`Detected ${passiveMatches} instance(s) of passive voice. Use active verbs.`)
  if (weakMatches.length > 0) issues.push(`Found weak phrases: ${weakMatches.join(', ')}. Replace with specific achievements.`)
  return { score: Math.max(0, score), issues };
}

export function analyzeCoverLetter(form, letterHtml, jobDesc) {
  const plainText = letterHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  
  const lengthAnalysis = analyzeLength(plainText);
  const keywordAnalysis = analyzeKeywords(plainText, jobDesc);
  const personalizationAnalysis = analyzePersonalization(form);
  const impactAnalysis = analyzeImpact(plainText);
  const clarityAnalysis = analyzeClarity(plainText);

  const overallScore = Math.round(
    (lengthAnalysis.score * 0.2) +
    (keywordAnalysis.score * 0.25) +
    (personalizationAnalysis.score * 0.25) +
    (impactAnalysis.score * 0.15) +
    (clarityAnalysis.score * 0.15)
  );

  const issues = [
    ...personalizationAnalysis.issues,
    ...clarityAnalysis.issues,
  ];
  if (lengthAnalysis.suggestion) issues.push(lengthAnalysis.suggestion);
  if (keywordAnalysis.missingKeywords.length > 0) {
    issues.push(`Missing key job description keywords: ${keywordAnalysis.missingKeywords.slice(0, 3).join(', ')}.`);
  }

  return {
    score: overallScore,
    wordCount: lengthAnalysis.wordCount,
    powerVerbCount: impactAnalysis.powerVerbCount,
    metricsFound: impactAnalysis.metricsFound,
    keywordDensity: keywordAnalysis.density,
    issues: issues.slice(0, 4), // Limit to 4 major issues
  };
}
