// src/lib/linkedinScorer.js

const CLICHES = ['team player', 'hardworking', 'go-getter', 'motivated', 'passionate', 'driven', 'detail-oriented', 'results-driven'];
const STRONG_VERBS = [
  'spearheaded', 'orchestrated', 'architected', 'pioneered', 'transformed',
  'optimized', 'engineered', 'maximized', 'accelerated', 'developed', 'managed',
  'led', 'created', 'built', 'improved', 'designed'
];

function getWords(text) {
  return text.toLowerCase().match(/\b\w+\b/g) || [];
}

export function scoreLinkedInProfile(profile) {
  const issues = [];
  const suggestions = [];
  let identityScore = 0, hookScore = 0, proofScore = 0, skillsScore = 0;

  const isNonEnglish = profile.language === 'Non-English';

  // -----------------------------------------------------
  // 1. IDENTITY & BRANDING (20 pts)
  // -----------------------------------------------------
  // Custom URL (5 pts)
  const url = profile.contactInfo?.url || '';
  const isCustomUrl = url && !url.match(/-\d{7,10}$/);
  if (isCustomUrl) {
    identityScore += 5;
  } else {
    issues.push("Uncustomized LinkedIn URL detected.");
    suggestions.push("Customize your LinkedIn URL to remove the random ID string.");
  }

  // Headline (15 pts)
  const headline = profile.headline || '';
  if (headline.length > 120) identityScore += 10;
  else if (headline.length > 60) identityScore += 5;
  
  if (headline.toLowerCase().includes('|') || headline.toLowerCase().includes('•')) identityScore += 5;

  if (/unemployed|seeking|looking/i.test(headline)) {
    identityScore -= 10;
    issues.push("Headline uses 'desperate' framing ('seeking opportunities').");
  }

  // -----------------------------------------------------
  // 2. THE HOOK (CONTENT / ABOUT) (30 pts)
  // -----------------------------------------------------
  const about = profile.about || '';
  const aboutWords = getWords(about);
  
  // Narrative Length (15 pts)
  if (aboutWords.length > 200) hookScore += 15;
  else if (aboutWords.length > 100) hookScore += 8;
  else if (aboutWords.length > 50) hookScore += 4;
  else {
    issues.push("Thin 'About' section.");
    suggestions.push("Expand your summary into a 3nd person narrative bio (300+ words).");
  }

  // Keyword Presence (15 pts) - +3 per match, cap at 15
  const coreKeywords = ['spearheaded', 'growth', 'managed', 'strategic', 'leadership', 'results', 'delivered', 'solutions', 'innovative'];
  let kwMatches = 0;
  coreKeywords.forEach(kw => {
    if (about.toLowerCase().includes(kw)) kwMatches++;
  });
  hookScore += Math.min(15, kwMatches * 3);

  // Cliché Penalty
  CLICHES.forEach(c => {
    if (about.toLowerCase().includes(c)) hookScore -= 1;
  });

  // -----------------------------------------------------
  // 3. PROFESSIONAL PROOF (EXPERIENCE) (35 pts)
  // -----------------------------------------------------
  const expList = profile.experience || [];
  
  // Role Count & Density (15 pts)
  if (expList.length >= 3) proofScore += 15;
  else if (expList.length >= 2) proofScore += 10;
  else if (expList.length === 1) proofScore += 5;

  // Metric Grader (15 pts) - +1 per number/%, $, years
  let metricsFound = 0;
  const metricsRegex = /(\d+%|\$[\d,.]+|\b\d{2,}\b|\d+\+)/g;
  expList.forEach(job => {
    const text = (job.text || '').toLowerCase();
    const matches = text.match(metricsRegex);
    if (matches) metricsFound += matches.length;
  });
  proofScore += Math.min(15, metricsFound);

  if (metricsFound < 3 && expList.length > 0) {
    issues.push("Missing quantifiable achievements (metrics/numbers).");
    suggestions.push("Add concrete numbers (revenue %, team size, $ saved) to your experience.");
  }

  // Bonus: Volunteer/Projects (5 pts)
  if ((profile.volunteer?.length > 0) || (profile.projects?.length > 0)) {
    proofScore += 5;
  }

  // -----------------------------------------------------
  // 4. SKILLS & CREDIBILITY (15 pts)
  // -----------------------------------------------------
  const skills = profile.skills || [];
  // 15+ skills = 10 pts
  if (skills.length >= 15) skillsScore += 10;
  else if (skills.length >= 5) skillsScore += 5;
  else {
    issues.push("Very few skills listed.");
    suggestions.push("Add at least 15 relevant skills to your 'Top Skills' section.");
  }

  // Education/Certs (5 pts)
  if (profile.education?.length > 0 || profile.certifications?.length > 0) {
    skillsScore += 5;
  }

  // -----------------------------------------------------
  // FINAL CALCULATION & EDGE CASES
  // -----------------------------------------------------
  let totalScore = identityScore + hookScore + proofScore + skillsScore;

  // Non-English Cap
  if (isNonEnglish) {
    totalScore = Math.min(totalScore, 60);
    issues.push("Non-English Profile Detected. Scoring capped at 60.");
  }

  // Student Mode Check (No Experience)
  if (expList.length === 0) {
    totalScore = Math.min(totalScore, 40);
    issues.push("No professional experience detected. Profile context: Student/Career Entry.");
    suggestions.push("Click 'Enable Student Mode' for education-optimized scoring.");
  }

  // Safety cap
  totalScore = Math.max(0, Math.min(100, totalScore));

  return {
    overallScore: Math.round(totalScore),
    breakdown: {
      identity: { score: Math.round(Math.max(0, identityScore)), max: 20 },
      content: { score: Math.round(Math.max(0, hookScore)), max: 30 },
      experience: { score: Math.round(Math.max(0, proofScore)), max: 35 },
      credibility: { score: Math.round(Math.max(0, skillsScore)), max: 15 }
    },
    issues: [...new Set(issues)],
    suggestions: [...new Set(suggestions)],
    completeness: Math.round((Object.values(profile).filter(v => Array.isArray(v) ? v.length > 0 : !!v).length / 10) * 100),
    extractedData: profile.extractedData || {}
  };
}
