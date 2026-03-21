import { NextResponse } from 'next/server';
import {
  STRONG_VERBS,
  WEAK_VERBS,
  HARD_SKILLS_KEYWORDS,
  SOFT_SKILLS
} from '@/constants/ats';

const METRIC_REGEX = /(\d+%|\$[\d,.]+|\b\d+[kKmMbB]?\b|\d+\+|\b\d+\s*(users|customers|hrs|hours|weeks|months|engineers)\b)/gi;

const VERB_BANK = {
  growth: ['accelerated', 'scaled', 'increased', 'expanded', 'amplified', 'maximized'],
  efficiency: ['optimized', 'streamlined', 'automated', 'reduced', 'consolidated', 'revamped'],
  leadership: ['spearheaded', 'orchestrated', 'led', 'mentored', 'directed', 'championed'],
  quality: ['improved', 'stabilized', 'strengthened', 'standardized', 'hardened', 'elevated']
};

const RESULT_BANK = {
  growth: ['driving', 'resulting in', 'contributing to'],
  efficiency: ['reducing', 'cutting', 'eliminating'],
  leadership: ['unlocking', 'enabling', 'improving'],
  quality: ['increasing', 'raising', 'improving']
};

const SYNTHETIC_METRICS = {
  growth: ['a 32% uplift in conversion', '$1.1M incremental revenue', 'a 2.1x increase in engagement'],
  efficiency: ['a 38% reduction in turnaround time', '$240K annual cost savings', '16 hours/week in manual effort'],
  leadership: ['a 27% increase in delivery velocity', 'an 18-point gain in stakeholder NPS', 'a 33% drop in escalation volume'],
  quality: ['a 46% drop in critical defects', '99.95% uptime reliability', 'a 29% improvement in customer retention']
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function hashString(value) {
  let hash = 0;
  const input = String(value || '');
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick(list, seed, offset = 0) {
  if (!Array.isArray(list) || list.length === 0) return '';
  return list[(seed + offset) % list.length];
}

function toSentence(text) {
  const cleaned = String(text || '')
    .replace(/\s+/g, ' ')
    .replace(/\s+,/g, ',')
    .replace(/\s+\./g, '.')
    .trim();
  if (!cleaned) return '';
  const withPunctuation = /[.!?]$/.test(cleaned) ? cleaned : `${cleaned}.`;
  return withPunctuation.charAt(0).toUpperCase() + withPunctuation.slice(1);
}

function normalizeBullet(raw) {
  return String(raw || '')
    .replace(/^[\s\-•*]+/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function includesKeyword(text, keyword) {
  if (!keyword) return false;
  const normalizedKeyword = keyword.toLowerCase().trim();
  return String(text || '').toLowerCase().includes(normalizedKeyword);
}

function extractMetricSnippet(text) {
  const matches = String(text || '').match(METRIC_REGEX) || [];
  if (matches.length === 0) return '';
  return matches.slice(0, 2).join(' and ');
}

function extractContext(text) {
  const normalized = normalizeBullet(text)
    .replace(METRIC_REGEX, '')
    .replace(/^(i\s+)?(helped|worked|assisted|supported|managed|led|developed|was responsible for)\s+/i, '')
    .replace(/^with\s+/i, '')
    .trim();

  if (!normalized) return 'critical initiatives';

  const short = normalized
    .split(/[.;]/)[0]
    .replace(/^the\s+/i, '')
    .replace(/^my\s+/i, '')
    .replace(/^marketing team\s+/i, 'marketing ')
    .replace(/^team\s+/i, '')
    .replace(/\brun\b/gi, 'executing')
    .replace(/\bworked on\b/gi, 'building')
    .replace(/\bfixed\b/gi, 'resolving')
    .replace(/\bmarketing executing campaigns\b/gi, 'campaign execution')
    .replace(/\bexecuting campaigns\b/gi, 'campaign execution')
    .trim();

  const lowered = short.toLowerCase();
  if (lowered.includes('campaign') && lowered.includes('multiple products')) {
    return 'campaign execution across multiple products';
  }
  if (/(api|backend)/i.test(short) && /(issue|incident|production|bug)/i.test(short)) {
    return 'backend API delivery and production reliability';
  }
  if (lowered.includes('stakeholder') && lowered.includes('launch')) {
    return 'cross-functional launch execution';
  }

  return short.length > 10 ? short : 'core initiatives';
}

function shouldInjectKeyword(context, keyword) {
  if (!keyword) return false;
  const contextLower = String(context || '').toLowerCase();
  const keywordTokens = String(keyword)
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token.length > 2);

  return keywordTokens.every((token) => !contextLower.includes(token));
}

function getDetectedSkills(text) {
  const lower = String(text || '').toLowerCase();
  const hard = HARD_SKILLS_KEYWORDS.filter((skill) => lower.includes(skill.toLowerCase()));
  const soft = SOFT_SKILLS.filter((skill) => lower.includes(skill.toLowerCase()));
  return { hard: [...new Set(hard)], soft: [...new Set(soft)] };
}

function analyzeBullet(rawBullet, keyword = '') {
  const bullet = normalizeBullet(rawBullet);
  const lower = bullet.toLowerCase();
  const words = bullet.split(/\s+/).filter(Boolean);
  const metricMatches = bullet.match(METRIC_REGEX) || [];
  const strongVerbHit = STRONG_VERBS.find((verb) => lower.includes(verb));
  const weakVerbHit = WEAK_VERBS.find((verb) => lower.includes(verb));
  const keywordMatched = includesKeyword(lower, keyword);
  const skills = getDetectedSkills(lower);

  const actionStrength = strongVerbHit ? 24 : weakVerbHit ? 8 : 15;
  const metricImpact = metricMatches.length > 0 ? clamp(10 + metricMatches.length * 7, 0, 25) : 4;
  const specificity = words.length >= 12 && words.length <= 30 ? 18 : words.length >= 8 ? 14 : 9;
  const keywordAlignment = keyword ? (keywordMatched ? 15 : 5) : 12;
  const clarity = words.length <= 34 ? 15 : 10;

  const score = clamp(
    Math.round(actionStrength + metricImpact + specificity + keywordAlignment + clarity),
    0,
    100
  );

  const missingSignals = [];
  const weaknesses = [];
  if (!strongVerbHit) {
    missingSignals.push('Strong action verb');
    weaknesses.push('Bullet starts soft and undersells ownership.');
  }
  if (metricMatches.length === 0) {
    missingSignals.push('Quantified result');
    weaknesses.push('No measurable impact found (%/$/volume/time).');
  }
  if (keyword && !keywordMatched) {
    missingSignals.push(`Keyword: ${keyword}`);
    weaknesses.push('Target keyword is missing from the bullet.');
  }
  if (words.length < 10) {
    missingSignals.push('Role context');
    weaknesses.push('Bullet is too short to show context + action + result.');
  }

  return {
    score,
    components: {
      actionStrength,
      metricImpact,
      specificity,
      keywordAlignment,
      clarity
    },
    metricsFound: metricMatches,
    skills,
    strongVerbHit: strongVerbHit || '',
    weakVerbHit: weakVerbHit || '',
    missingSignals,
    weaknesses
  };
}

function createMetric(seed, focus, originalMetric) {
  if (originalMetric) return originalMetric;
  return pick(SYNTHETIC_METRICS[focus], seed);
}

function getToneQualifier(tone) {
  if (tone === 'executive') return 'at strategic scale';
  if (tone === 'technical') return 'with production-grade rigor';
  return 'with clear business alignment';
}

function buildSuggestion({
  type,
  bullet,
  keyword,
  tone,
  focus,
  seed,
  originalAnalysis
}) {
  const context = extractContext(bullet);
  const verbPool = VERB_BANK[focus] || VERB_BANK.growth;
  const verb = pick(verbPool, seed, type.seedOffset) || 'optimized';
  const resultLead = pick(RESULT_BANK[focus], seed, type.seedOffset) || 'driving';
  const metric = createMetric(seed + type.seedOffset, focus, extractMetricSnippet(bullet));
  const keywordPart = shouldInjectKeyword(context, keyword) ? `${keyword} ` : '';
  const toneQualifier = getToneQualifier(tone);

  let text = '';
  if (type.key === 'metric') {
    text = `${verb} ${keywordPart}${context}, ${resultLead} ${metric} ${toneQualifier}`;
  } else if (type.key === 'leadership') {
    text = `${verb} cross-functional teams to ${keywordPart}${context}, ${resultLead} ${metric} through tighter execution rhythms ${toneQualifier}`;
  } else {
    text = `${verb} ${keywordPart}${context} using scalable technical patterns, ${resultLead} ${metric} while improving system reliability ${toneQualifier}`;
  }

  const rewritten = toSentence(text);
  const rewrittenAnalysis = analyzeBullet(rewritten, keyword);

  const appliedFixes = [];
  if (originalAnalysis.weakVerbHit) appliedFixes.push('Replaced weak verb with high-impact action verb');
  if (originalAnalysis.metricsFound.length === 0) appliedFixes.push('Added quantifiable result signal');
  if (keyword && !includesKeyword(bullet, keyword)) appliedFixes.push(`Injected keyword "${keyword}"`);
  if (normalizeBullet(bullet).split(/\s+/).length < 10) appliedFixes.push('Added context for scope and ownership');

  const parts = rewritten.split(',');
  const actionPart = parts[0] || rewritten;
  const resultPart = parts.slice(1).join(',').trim();

  return {
    type: type.label,
    text: rewritten,
    score: rewrittenAnalysis.score,
    scoreDelta: rewrittenAnalysis.score - originalAnalysis.score,
    sar: {
      situation: toSentence(`In the context of ${context}`),
      action: toSentence(actionPart),
      result: toSentence(resultPart || `Delivered ${metric}`)
    },
    appliedFixes: appliedFixes.length > 0 ? appliedFixes : ['Improved structure into SAR format'],
    analysis: rewrittenAnalysis
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const bullet = normalizeBullet(body.bullet);
    const keyword = String(body.keyword || '').trim();
    const tone = ['balanced', 'executive', 'technical'].includes(body.tone) ? body.tone : 'balanced';
    const focus = ['growth', 'efficiency', 'leadership', 'quality'].includes(body.focus)
      ? body.focus
      : 'growth';

    if (!bullet) {
      return NextResponse.json({ error: 'No bullet point provided.' }, { status: 400 });
    }

    const originalAnalysis = analyzeBullet(bullet, keyword);
    const seed = hashString(`${bullet}|${keyword}|${tone}|${focus}`);

    const suggestionTypes = [
      { key: 'metric', label: 'Metric-Driven Rewrite', seedOffset: 1 },
      { key: 'leadership', label: 'Leadership Rewrite', seedOffset: 7 },
      { key: 'technical', label: 'Technical Rewrite', seedOffset: 13 }
    ];

    const suggestions = suggestionTypes
      .map((type) =>
        buildSuggestion({
          type,
          bullet,
          keyword,
          tone,
          focus,
          seed,
          originalAnalysis
        })
      )
      .sort((a, b) => b.score - a.score);

    const bestScore = suggestions[0]?.score || originalAnalysis.score;

    return NextResponse.json({
      original: bullet,
      controls: { keyword, tone, focus },
      originalAnalysis,
      rewrittenScore: bestScore,
      totalGain: bestScore - originalAnalysis.score,
      suggestions,
      topFixesApplied: [
        'Converted narrative into SAR ordering (Context -> Action -> Result).',
        'Upgraded to recruiter-preferred action verbs.',
        'Increased metric and outcome visibility for ATS matching.'
      ],
      nextIteration: [
        'Replace synthetic metric placeholders with your exact numbers.',
        'Mirror 1-2 exact terms from the job description in each bullet.',
        'Keep bullet length between 14-28 words for maximum scan readability.'
      ]
    });
  } catch (error) {
    console.error('SAR rewrite failed:', error);
    return NextResponse.json({ error: 'Failed to generate rewrite.' }, { status: 500 });
  }
}
