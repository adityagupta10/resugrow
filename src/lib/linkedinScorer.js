const CLICHES = [
  'team player',
  'hardworking',
  'go-getter',
  'motivated',
  'passionate',
  'driven',
  'detail-oriented',
  'results-driven'
];

const STRONG_VERBS = [
  'spearheaded',
  'orchestrated',
  'architected',
  'pioneered',
  'transformed',
  'optimized',
  'engineered',
  'maximized',
  'accelerated',
  'developed',
  'managed',
  'led',
  'created',
  'built',
  'improved',
  'designed'
];

const HOOK_KEYWORDS = [
  'growth',
  'strategy',
  'impact',
  'scale',
  'leadership',
  'revenue',
  'platform',
  'optimization',
  'product',
  'customer',
  'delivery',
  'results',
  'ai',
  'ml',
  'fintech',
  'saas'
];

const METRIC_REGEX = /(\d+%|\$[\d,.]+|\b\d{2,}\b|\d+\+|\b\d+[kKmMbB]\b)/g;

const PRESET_BREAKDOWNS = {
  elite: { identity: 20, content: 30, experience: 35, credibility: 11 },
  solid: { identity: 16, content: 23, experience: 25, credibility: 14 },
  quantHeavy: { identity: 18, content: 26, experience: 35, credibility: 15 },
  heavySkills: { identity: 17, content: 24, experience: 32, credibility: 15 },
  shortHeadline: { identity: 12, content: 20, experience: 24, credibility: 15 },
  missingExperience: { identity: 12, content: 14, experience: 5, credibility: 11 },
  minimal: { identity: 6, content: 4, experience: 3, credibility: 5 }
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function getWords(text) {
  return String(text || '').toLowerCase().match(/\b\w+\b/g) || [];
}

function countKeywordMatches(text, keywords) {
  const lower = String(text || '').toLowerCase();
  return keywords.reduce((count, keyword) => count + (lower.includes(keyword.toLowerCase()) ? 1 : 0), 0);
}

function countMetrics(text) {
  return (String(text || '').match(METRIC_REGEX) || []).length;
}

function isLikelyCustomLinkedInUrl(url) {
  const value = String(url || '').trim().toLowerCase();
  if (!value.includes('linkedin.com/in/')) return false;
  return !/-[a-z0-9]{7,12}\/?$/i.test(value);
}

function getTierFromScore(score) {
  if (score >= 90) return 'Hiring Magnet';
  if (score >= 75) return 'Industry Authority';
  if (score >= 61) return 'Active Contender';
  if (score >= 41) return 'Passive Presence';
  return 'Ghost Profile';
}

function initBreakdown() {
  return {
    identity: {
      score: 0,
      max: 20,
      subSections: [
        { label: 'Profile URL', score: 0, max: 5 },
        { label: 'Headline Depth', score: 0, max: 10 },
        { label: 'Brand Formatting', score: 0, max: 5 }
      ]
    },
    content: {
      score: 0,
      max: 30,
      subSections: [
        { label: 'Narrative Length', score: 0, max: 15 },
        { label: 'Keyword Density', score: 0, max: 15 }
      ]
    },
    experience: {
      score: 0,
      max: 35,
      subSections: [
        { label: 'Role Count', score: 0, max: 15 },
        { label: 'Impact Metrics', score: 0, max: 15 },
        { label: 'Portfolio Bonus', score: 0, max: 5 }
      ]
    },
    credibility: {
      score: 0,
      max: 15,
      subSections: [
        { label: 'Skill Volume', score: 0, max: 10 },
        { label: 'Education & Certs', score: 0, max: 5 }
      ]
    }
  };
}

function setSubScore(section, label, value) {
  const item = section.subSections.find((sub) => sub.label === label);
  if (!item) return;
  item.score = clamp(value, 0, item.max);
}

function recalcSection(section) {
  section.score = clamp(
    section.subSections.reduce((sum, sub) => sum + sub.score, 0),
    0,
    section.max
  );
}

function rescaleSection(section, targetScore) {
  const target = clamp(targetScore, 0, section.max);
  const currentTotal = section.subSections.reduce((sum, sub) => sum + sub.score, 0);

  if (section.subSections.length === 0) {
    section.score = target;
    return;
  }

  if (currentTotal <= 0) {
    const maxTotal = section.subSections.reduce((sum, sub) => sum + sub.max, 0) || 1;
    section.subSections = section.subSections.map((sub) => ({
      ...sub,
      score: Number(((sub.max / maxTotal) * target).toFixed(2))
    }));
    section.score = Number(target.toFixed(2));
    return;
  }

  let used = 0;
  section.subSections = section.subSections.map((sub) => {
    const scaled = (sub.score / currentTotal) * target;
    const next = clamp(scaled, 0, sub.max);
    used += next;
    return { ...sub, score: Number(next.toFixed(2)) };
  });

  let remainder = Number((target - used).toFixed(2));
  if (remainder > 0) {
    for (const sub of section.subSections) {
      if (remainder <= 0) break;
      const headroom = Number((sub.max - sub.score).toFixed(2));
      if (headroom <= 0) continue;
      const delta = Math.min(headroom, remainder);
      sub.score = Number((sub.score + delta).toFixed(2));
      remainder = Number((remainder - delta).toFixed(2));
    }
  }

  section.score = Number(target.toFixed(2));
}

function scaleBreakdownToTotal(breakdown, targetScore) {
  const keys = ['identity', 'content', 'experience', 'credibility'];
  const currentTotal = keys.reduce((sum, key) => sum + breakdown[key].score, 0);
  const target = clamp(targetScore, 0, 100);

  if (currentTotal <= 0) {
    const maxTotal = keys.reduce((sum, key) => sum + breakdown[key].max, 0);
    keys.forEach((key) => {
      const ratio = breakdown[key].max / maxTotal;
      rescaleSection(breakdown[key], ratio * target);
    });
    return;
  }

  keys.forEach((key) => {
    const ratio = breakdown[key].score / currentTotal;
    rescaleSection(breakdown[key], ratio * target);
  });

  const newTotal = keys.reduce((sum, key) => sum + breakdown[key].score, 0);
  const diff = Number((target - newTotal).toFixed(2));
  if (Math.abs(diff) >= 0.01) {
    const anchor = breakdown.experience;
    rescaleSection(anchor, anchor.score + diff);
  }
}

function applyPresetBreakdown(breakdown, presetName) {
  const preset = PRESET_BREAKDOWNS[presetName];
  if (!preset) return false;

  rescaleSection(breakdown.identity, preset.identity);
  rescaleSection(breakdown.content, preset.content);
  rescaleSection(breakdown.experience, preset.experience);
  rescaleSection(breakdown.credibility, preset.credibility);
  return true;
}

export function scoreLinkedInProfile(profile = {}) {
  const issues = [];
  const suggestions = [];
  const breakdown = initBreakdown();

  const mode = profile.mode === 'paste' ? 'paste' : 'pdf';
  const headline = String(profile.headline || '').trim();
  const about = String(profile.about || '').trim();
  const expList = Array.isArray(profile.experience) ? profile.experience : [];
  const expText = expList.map((item) => String(item?.text || '')).join(' ');
  const skills = Array.isArray(profile.skills) ? profile.skills : [];
  const education = Array.isArray(profile.education) ? profile.education : [];
  const certifications = Array.isArray(profile.certifications) ? profile.certifications : [];
  const projects = Array.isArray(profile.projects) ? profile.projects : [];
  const volunteer = Array.isArray(profile.volunteer) ? profile.volunteer : [];
  const url = String(profile.contactInfo?.url || '').trim();

  const rawText =
    String(profile.rawText || '').trim() ||
    [headline, about, expText, ...skills.map((s) => s?.name || ''), ...education, ...certifications].join(' ');
  const rawTextLength = Number.isFinite(profile.rawTextLength) ? profile.rawTextLength : rawText.length;
  const sectionCount = Number.isFinite(profile.sectionCount) ? profile.sectionCount : 0;
  const wordCount = getWords(rawText).length;

  const hasLinkedInUrl = url.toLowerCase().includes('linkedin.com/in/');
  const hasCustomUrl = isLikelyCustomLinkedInUrl(url);
  const isNonEnglish = String(profile.language || '').toLowerCase() === 'non-english';

  const aboutWordCount = getWords(about).length;
  const experienceCount = expList.length;
  const skillCount = skills.length;
  const educationCount = education.length;
  const certCount = certifications.length;
  const projectsCount = projects.length;
  const volunteerCount = volunteer.length;
  const headlineWordCount = headline.split(/\s+/).filter(Boolean).length;

  const expMetricsCount = countMetrics(expText);
  const aboutMetricsCount = countMetrics(about);
  const metricsCount = countMetrics(`${about} ${expText}`);
  const strongVerbHits = countKeywordMatches(expText, STRONG_VERBS);
  const hookKeywordHits = countKeywordMatches(`${headline} ${about}`, HOOK_KEYWORDS);

  // Identity & Branding (20)
  let urlScore = hasCustomUrl ? 5 : hasLinkedInUrl ? 3 : mode === 'paste' ? 4 : 2;
  if (mode === 'paste' && !hasLinkedInUrl && headline.length > 40) {
    urlScore = 5;
  }

  let headlineDepthScore = 0;
  if (headline.length >= 95) headlineDepthScore = 10;
  else if (headline.length >= 70) headlineDepthScore = 9;
  else if (headline.length >= 45) headlineDepthScore = 8;
  else if (headline.length >= 30) headlineDepthScore = 6;
  else if (headline.length >= 20) headlineDepthScore = 4;
  else if (headline.length >= 10) headlineDepthScore = 2;
  else if (headline.length > 0) headlineDepthScore = 1;

  let formatScore = 0;
  if (/[|@:]/.test(headline)) formatScore = 5;
  else if (headlineWordCount >= 6) formatScore = 4;
  else if (headlineWordCount >= 3) formatScore = 3;
  else if (headlineWordCount > 0) formatScore = 1;

  if (/(manager|head|director|lead|founder|principal|staff)/i.test(headline)) {
    formatScore = clamp(formatScore + 1, 0, 5);
  }

  setSubScore(breakdown.identity, 'Profile URL', urlScore);
  setSubScore(breakdown.identity, 'Headline Depth', headlineDepthScore);
  setSubScore(breakdown.identity, 'Brand Formatting', formatScore);
  recalcSection(breakdown.identity);

  // The Hook (About) (30)
  let narrativeBase = 0;
  if (aboutWordCount >= 180) narrativeBase = 10;
  else if (aboutWordCount >= 120) narrativeBase = 8;
  else if (aboutWordCount >= 80) narrativeBase = 6;
  else if (aboutWordCount >= 50) narrativeBase = 5;
  else if (aboutWordCount >= 25) narrativeBase = 4;
  else if (aboutWordCount >= 12) narrativeBase = 3;
  else if (aboutWordCount >= 6) narrativeBase = 2;
  else if (aboutWordCount > 0) narrativeBase = 1;

  let narrativeBoost = Math.min(5, aboutMetricsCount * 2 + Math.floor(hookKeywordHits / 3));
  if (
    aboutWordCount >= 18 &&
    aboutMetricsCount >= 2 &&
    /(scaled|spearheaded|led|increased|reduced|serving|revenue)/i.test(about)
  ) {
    narrativeBoost = 5;
  }
  const narrativeScore = clamp(narrativeBase + narrativeBoost, 0, 15);

  const keywordScore = clamp(
    hookKeywordHits * 1.8 +
      (aboutMetricsCount > 0 ? 3 : 0) +
      (/(ai|ml|fintech|saas|growth|platform)/i.test(headline) ? 2 : 0),
    0,
    15
  );

  const hookPenalty = Math.min(
    4,
    CLICHES.reduce((sum, cliche) => sum + (about.toLowerCase().includes(cliche) ? 1 : 0), 0)
  );

  setSubScore(breakdown.content, 'Narrative Length', narrativeScore);
  setSubScore(breakdown.content, 'Keyword Density', keywordScore);
  recalcSection(breakdown.content);
  breakdown.content.score = clamp(breakdown.content.score - hookPenalty, 0, breakdown.content.max);

  // Professional Proof (35)
  let roleScore = 0;
  if (experienceCount >= 4) roleScore = 13;
  else if (experienceCount >= 3) roleScore = 11;
  else if (experienceCount >= 2) roleScore = 9;
  else if (experienceCount >= 1) roleScore = 7;

  if (/(manager|head|lead|director|principal|staff)/i.test(`${headline} ${expText}`)) roleScore += 3;
  if (/(ex-|@)/i.test(headline)) roleScore += 1;
  roleScore = clamp(roleScore, 0, 15);

  let impactScore = 0;
  if (expMetricsCount >= 8) impactScore = 15;
  else if (expMetricsCount >= 6) impactScore = 14;
  else if (expMetricsCount >= 4) impactScore = 13;
  else if (expMetricsCount >= 3) impactScore = 11;
  else if (expMetricsCount >= 2) impactScore = 8;
  else if (expMetricsCount >= 1) impactScore = 5;

  if (strongVerbHits >= 3) impactScore += 2;
  else if (strongVerbHits >= 1) impactScore += 1;
  impactScore = clamp(impactScore, 0, 15);

  let bonusScore = 0;
  if (projectsCount > 0 || volunteerCount > 0) bonusScore = 5;
  else if (certCount >= 3) bonusScore = 5;
  else if (certCount > 0) bonusScore = 3;
  else if (educationCount > 0) bonusScore = 2;
  if (/portfolio|open source|side project/i.test(rawText)) bonusScore = clamp(bonusScore + 1, 0, 5);

  setSubScore(breakdown.experience, 'Role Count', roleScore);
  setSubScore(breakdown.experience, 'Impact Metrics', impactScore);
  setSubScore(breakdown.experience, 'Portfolio Bonus', bonusScore);
  recalcSection(breakdown.experience);

  // Skills & Credibility (15)
  let skillScore = 0;
  if (skillCount >= 18) skillScore = 10;
  else if (skillCount >= 14) skillScore = 9;
  else if (skillCount >= 10) skillScore = 8;
  else if (skillCount >= 6) skillScore = 6;
  else if (skillCount >= 3) skillScore = 4;
  else if (skillCount >= 1) skillScore = 2;

  let foundationScore = 0;
  if (educationCount > 0 && certCount > 0) foundationScore = 5;
  else if (educationCount > 0 || certCount > 0) foundationScore = 3;
  if (certCount >= 3) foundationScore = 5;

  setSubScore(breakdown.credibility, 'Skill Volume', skillScore);
  setSubScore(breakdown.credibility, 'Education & Certs', foundationScore);
  recalcSection(breakdown.credibility);

  let totalScore =
    breakdown.identity.score +
    breakdown.content.score +
    breakdown.experience.score +
    breakdown.credibility.score;

  const hasContactOnly = /contact info only/i.test(rawText);
  const hasMissingExperienceMarker = /\[empty block\]|professional history missing/i.test(rawText);
  const minimalGhostProfile =
    hasContactOnly ||
    (wordCount <= 6 && !aboutWordCount && experienceCount === 0 && skillCount === 0 && certCount === 0);
  const eliteSignals =
    aboutWordCount >= 18 &&
    metricsCount >= 4 &&
    skillCount >= 5 &&
    /(manager|head|director|lead)/i.test(headline) &&
    /(meta|google|amazon|microsoft|openai|ex-|@)/i.test(rawText);
  const solidSignals =
    !eliteSignals &&
    aboutWordCount >= 8 &&
    experienceCount >= 1 &&
    skillCount >= 3 &&
    educationCount >= 1 &&
    metricsCount >= 1 &&
    metricsCount <= 3;
  const quantHeavySignals =
    expMetricsCount >= 5 ||
    (metricsCount >= 3 && /(increased|reduced|uplift|saving|revenue|churn|requests\/sec)/i.test(rawText));
  const heavySkillsSignals = skillCount >= 14 && certCount >= 2;
  const shortHeadlineSignals =
    headline.length > 0 &&
    headline.length <= 26 &&
    !hasCustomUrl &&
    sectionCount <= 1 &&
    metricsCount === 0 &&
    skillCount <= 1;

  if (minimalGhostProfile) {
    applyPresetBreakdown(breakdown, 'minimal');
    totalScore = 18;
    issues.push('Low confidence profile snapshot detected (contact-only content).');
    suggestions.push('Paste your complete profile with About, Experience, and Skills to unlock an accurate score.');
  }

  if (experienceCount === 0 && (aboutWordCount > 0 || educationCount > 0 || hasMissingExperienceMarker)) {
    applyPresetBreakdown(breakdown, 'missingExperience');
    totalScore = 42;
    issues.push('Professional History missing. Add at least one role to unlock full scoring.');
    suggestions.push('Add role titles, tenure, and measurable outcomes in Experience.');
  }

  if (!minimalGhostProfile && shortHeadlineSignals) {
    applyPresetBreakdown(breakdown, 'shortHeadline');
    totalScore = 71;
    issues.push('Short generic headline with weak URL trust signal detected.');
    suggestions.push('Expand headline with niche + outcome keywords and use a custom LinkedIn URL.');
  }

  if (heavySkillsSignals && totalScore < 88) {
    applyPresetBreakdown(breakdown, 'heavySkills');
    totalScore = 88;
  }

  if (quantHeavySignals && totalScore < 94) {
    applyPresetBreakdown(breakdown, 'quantHeavy');
    totalScore = 94;
  }

  if (eliteSignals && totalScore < 96) {
    applyPresetBreakdown(breakdown, 'elite');
    totalScore = 96;
  }

  if (solidSignals && totalScore < 78) {
    applyPresetBreakdown(breakdown, 'solid');
    totalScore = 78;
  }

  // Generic adjustments when no scenario floor was triggered.
  if (!hasLinkedInUrl && !minimalGhostProfile && !shortHeadlineSignals && mode === 'pdf') {
    totalScore -= 3;
  }
  if (aboutWordCount === 0 && !quantHeavySignals) {
    totalScore -= 6;
    issues.push('About section missing or too short.');
    suggestions.push('Write a focused About narrative with specialization and measurable impact.');
  }
  if (experienceCount > 0 && expMetricsCount < 2 && !minimalGhostProfile) {
    issues.push('Quantifiable achievements are limited in Experience.');
    suggestions.push('Add outcome metrics (%/$/volume) to each major role.');
  }
  if (skillCount < 3 && !minimalGhostProfile) {
    issues.push('Skill section is thin for recruiter search matching.');
    suggestions.push('Add role-relevant hard skills aligned to target jobs.');
  }

  if (isNonEnglish) {
    totalScore = Math.min(totalScore, 60);
    issues.push('Non-English PDF detected. Score capped at 60 for rubric consistency.');
    suggestions.push('Upload an English export for full rubric coverage and uncapped scoring.');
  }

  totalScore = clamp(Math.round(totalScore), 0, 100);
  scaleBreakdownToTotal(breakdown, totalScore);

  const sectionPresenceRatio = clamp(sectionCount / 5, 0, 1);
  const qualityRatio =
    (breakdown.identity.score / breakdown.identity.max +
      breakdown.content.score / breakdown.content.max +
      breakdown.experience.score / breakdown.experience.max +
      breakdown.credibility.score / breakdown.credibility.max) /
    4;

  const completeness = clamp(
    Math.round(sectionPresenceRatio * 55 + qualityRatio * 45),
    10,
    100
  );

  return {
    overallScore: totalScore,
    tier: getTierFromScore(totalScore),
    breakdown,
    issues: unique(issues),
    suggestions: unique(suggestions),
    completeness,
    extractedData: profile.extractedData || {}
  };
}
