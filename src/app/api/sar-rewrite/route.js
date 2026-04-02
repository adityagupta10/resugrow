import { NextResponse } from 'next/server';
import {
  STRONG_VERBS,
  WEAK_VERBS,
  HARD_SKILLS_KEYWORDS,
  SOFT_SKILLS
} from '@/constants/ats';

// Domain-specific keywords to detect bullet context
const DOMAIN_PATTERNS = {
  engineering: ['api', 'backend', 'frontend', 'code', 'system', 'architecture', 'deploy', 'database', 'microservice', 'github', 'ci/cd', 'testing', 'infrastructure'],
  data: ['analytics', 'data', 'model', 'dataset', 'ml', 'ai', 'metrics', 'dashboard', 'pipeline', 'etl', 'visualization', 'python', 'sql'],
  marketing: ['campaign', 'marketing', 'content', 'brand', 'social', 'seo', 'conversion', 'funnel', 'lead', 'growth', 'acquisition', 'retention'],
  sales: ['sales', 'revenue', 'quota', 'deal', 'pipeline', 'crm', 'account', 'prospect', 'closing', 'negotiation', 'client'],
  product: ['product', 'roadmap', 'feature', 'user research', 'pm', 'stakeholder', 'requirements', 'backlog', 'mvp', 'iteration'],
  design: ['design', 'ux', 'ui', 'wireframe', 'prototype', 'figma', 'user experience', 'interface', 'visual', 'creative'],
  operations: ['operations', 'process', 'workflow', 'efficiency', 'supply chain', 'logistics', 'vendor', 'procurement', 'compliance'],
  finance: ['finance', 'budget', 'forecast', 'p&l', 'revenue', 'cost', 'investment', 'financial', 'accounting', 'audit'],
  hr: ['recruiting', 'talent', 'onboarding', 'culture', 'performance', 'training', 'employee', 'benefits', 'engagement'],
  customer: ['support', 'customer', 'service', 'ticket', 'resolution', 'satisfaction', 'retention', 'csat', 'helpdesk']
};

const METRIC_REGEX = /(\d+%|\$[\d,.]+|\b\d+[kKmMbB]?\b|\d+\+|\b\d+\s*(users|customers|clients|hrs|hours|weeks|months|days|engineers|people|team members|transactions|requests)\b)/gi;

// Expanded verb banks with context-awareness
const VERB_BANK = {
  growth: {
    core: ['accelerated', 'scaled', 'increased', 'expanded', 'amplified', 'maximized', 'drove', 'boosted', 'multiplied', 'grew'],
    engineering: ['shipped', 'launched', 'deployed', 'released', 'delivered'],
    data: ['uncovered', 'identified', 'pinpointed', 'surfaced', 'extracted'],
    marketing: ['generated', 'captured', 'converted', 'nurtured', 'activated'],
    sales: ['closed', 'won', 'secured', 'captured', 'negotiated'],
    product: ['shipped', 'launched', 'released', 'piloted', 'validated']
  },
  efficiency: {
    core: ['optimized', 'streamlined', 'automated', 'reduced', 'consolidated', 'revamped', 'eliminated', 'simplified', 'refined', 'trimmed'],
    engineering: ['refactored', 'optimized', 'tuned', 'cached', 'parallelized'],
    data: ['automated', 'streamlined', 'scheduled', 'pipelined', 'compressed'],
    operations: ['standardized', 'rationalized', 'consolidated', 'merged', 'restructured'],
    finance: ['reconciled', 'consolidated', 'automated', 'optimized', 'reduced']
  },
  leadership: {
    core: ['spearheaded', 'orchestrated', 'led', 'mentored', 'directed', 'championed', 'pioneered', 'founded', 'established', 'drove'],
    engineering: ['architected', 'tech-led', 'oversaw', 'managed', 'coordinated'],
    product: ['owned', 'managed', 'prioritized', 'aligned', 'synchronized'],
    cross: ['unified', 'galvanized', 'rallied', 'mobilized', 'aligned']
  },
  quality: {
    core: ['improved', 'stabilized', 'strengthened', 'standardized', 'hardened', 'elevated', 'enhanced', 'upgraded', 'fortified', 'polished'],
    engineering: ['tested', 'debugged', 'hardened', 'secured', 'validated', 'verified'],
    data: ['cleansed', 'validated', 'audited', 'verified', 'reconciled'],
    design: ['refined', 'polished', 'perfected', 'enhanced', 'elevated']
  }
};

// Result connectors by focus
const RESULT_BANK = {
  growth: ['driving', 'resulting in', 'contributing to', 'generating', 'producing', 'yielding'],
  efficiency: ['reducing', 'cutting', 'eliminating', 'saving', 'conserving', 'minimizing'],
  leadership: ['unlocking', 'enabling', 'improving', 'empowering', 'accelerating', 'catalyzing'],
  quality: ['increasing', 'raising', 'improving', 'enhancing', 'boosting', 'elevating']
};

// Context-aware metric suggestions
const DOMAIN_METRICS = {
  engineering: {
    growth: ['42% faster deployment cycles', '3x developer productivity gain', '99.99% uptime achievement', '2M+ daily active users supported'],
    efficiency: ['60% reduction in build time', '$180K/year infrastructure savings', '75% fewer production incidents', '5 hours/week saved per engineer'],
    quality: ['99.95% test coverage', '45% reduction in bug escapes', 'zero security vulnerabilities in audit', '4.9/5 code review rating']
  },
  data: {
    growth: ['$2.3M in identified revenue opportunities', '35% improvement in forecast accuracy', '5x faster insight delivery'],
    efficiency: ['80% reduction in report generation time', 'automated 50+ manual data pulls', '$120K/year in analyst time saved'],
    quality: ['99.5% data accuracy rate', 'real-time pipeline monitoring', 'automated anomaly detection']
  },
  marketing: {
    growth: ['156% ROI on campaign spend', '3.2x increase in qualified leads', '$890K attributed pipeline'],
    efficiency: ['40% reduction in campaign setup time', 'automated 12 manual workflows', '$65K/year tool consolidation savings'],
    quality: ['28% improvement in email deliverability', 'A/B test win rate of 68%', 'brand sentiment score +32 points']
  },
  sales: {
    growth: ['$4.2M in new ARR', '142% of quota attainment', '35% increase in average deal size'],
    efficiency: ['50% reduction in sales cycle', 'automated 200+ follow-ups monthly', '30% less time in CRM admin'],
    quality: ['92% customer satisfaction score', '4.8/5 prospect experience rating', '90% forecast accuracy']
  },
  product: {
    growth: ['3x user activation rate', '40% increase in feature adoption', '$1.5M expansion revenue influenced'],
    efficiency: ['60% faster time-to-market', '50% reduction in scope creep', '2x sprint velocity improvement'],
    quality: ['NPS increased from 32 to 58', '4.7/5 app store rating', '42% decrease in support tickets']
  },
  operations: {
    growth: ['scaled operations 4x without headcount increase', 'expanded to 12 new markets', 'onboarded 200+ vendors'],
    efficiency: ['35% cost per unit reduction', 'automated 80% of manual approvals', '2-day process compressed to 4 hours'],
    quality: ['99.8% SLA compliance', 'zero compliance violations', 'ISO 27001 certification achieved']
  },
  general: {
    growth: ['32% uplift in key metrics', '$1.1M business impact', '2.1x performance improvement'],
    efficiency: ['38% reduction in processing time', '$240K annual cost savings', '16 hours/week recovered'],
    leadership: ['27% increase in team velocity', '18-point stakeholder satisfaction gain', '33% reduction in escalations'],
    quality: ['46% decrease in error rate', '99.95% reliability achieved', '29% improvement in retention']
  }
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

function pickRandom(list, seed, count = 1) {
  if (!Array.isArray(list) || list.length === 0) return count === 1 ? '' : [];
  const startIndex = seed % list.length;
  if (count === 1) return list[startIndex];
  const results = [];
  for (let i = 0; i < count && i < list.length; i++) {
    results.push(list[(startIndex + i) % list.length]);
  }
  return results;
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

// Detect the domain/industry of the bullet
function detectDomain(text) {
  const lower = text.toLowerCase();
  const scores = {};
  
  for (const [domain, keywords] of Object.entries(DOMAIN_PATTERNS)) {
    scores[domain] = keywords.filter(kw => lower.includes(kw)).length;
  }
  
  const bestMatch = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .find(([_, count]) => count > 0);
  
  return bestMatch ? bestMatch[0] : 'general';
}

// Extract semantic context with better understanding
function extractContext(text, domain) {
  const normalized = normalizeBullet(text)
    .replace(METRIC_REGEX, '')
    .replace(/^(i\s+)?(helped|worked|assisted|supported|managed|led|developed|was responsible for|contributed to|participated in)\s+/i, '')
    .replace(/^with\s+/i, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalized) return 'critical business initiatives';

  // Domain-specific context extraction
  const domainContexts = {
    engineering: {
      api: 'API architecture and backend systems',
      backend: 'scalable backend infrastructure',
      frontend: 'frontend user experience',
      database: 'database performance and reliability',
      microservice: 'distributed microservices',
      testing: 'test automation and quality assurance',
      infrastructure: 'cloud infrastructure and DevOps'
    },
    data: {
      analytics: 'data analytics and insights',
      pipeline: 'data pipeline architecture',
      dashboard: 'business intelligence dashboards',
      model: 'predictive models and machine learning',
      visualization: 'data visualization solutions'
    },
    marketing: {
      campaign: 'multi-channel marketing campaigns',
      content: 'content strategy and production',
      seo: 'organic search optimization',
      funnel: 'conversion funnel optimization',
      brand: 'brand positioning and awareness'
    },
    sales: {
      pipeline: 'sales pipeline development',
      account: 'strategic account management',
      deal: 'complex deal negotiation',
      prospect: 'prospect qualification and outreach'
    },
    product: {
      roadmap: 'product roadmap execution',
      feature: 'feature definition and delivery',
      stakeholder: 'stakeholder alignment and communication',
      research: 'user research and validation'
    }
  };

  // Check for domain-specific matches
  if (domainContexts[domain]) {
    for (const [key, context] of Object.entries(domainContexts[domain])) {
      if (normalized.toLowerCase().includes(key)) {
        return context;
      }
    }
  }

  // General extraction with smart cleanup
  let short = normalized
    .split(/[.;]/)[0]
    .replace(/^the\s+/i, '')
    .replace(/^my\s+/i, '')
    .replace(/^our\s+/i, '')
    .replace(/\brun\b/gi, 'executing')
    .replace(/\bworked on\b/gi, 'delivering')
    .replace(/\bfixed\b/gi, 'resolving')
    .replace(/\bhelped\b/gi, 'supporting')
    .replace(/\bassisted\b/gi, 'enabling')
    .replace(/\bmanaged\b/gi, 'overseeing')
    .replace(/\bhandled\b/gi, 'coordinating')
    .trim();

  return short.length > 10 ? short : 'core business initiatives';
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
  const domain = detectDomain(bullet);

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
    weaknesses,
    domain,
    wordCount: words.length
  };
}

function getMetricForContext(seed, focus, originalMetric, domain) {
  if (originalMetric) return originalMetric;
  
  const domainMetrics = DOMAIN_METRICS[domain] || DOMAIN_METRICS.general;
  const focusMetrics = domainMetrics[focus] || DOMAIN_METRICS.general[focus] || DOMAIN_METRICS.general.growth;
  
  return pickRandom(focusMetrics, seed);
}

function getToneQualifier(tone, domain) {
  const qualifiers = {
    executive: {
      core: 'at strategic scale',
      engineering: 'aligning technical execution with business objectives',
      data: 'enabling data-driven decision making at the executive level',
      marketing: 'driving market expansion and brand equity',
      sales: 'capturing high-value strategic accounts',
      product: 'delivering roadmap outcomes that move company metrics',
      operations: 'optimizing enterprise-wide operational efficiency'
    },
    technical: {
      core: 'with production-grade rigor',
      engineering: 'meeting enterprise scalability and reliability standards',
      data: 'ensuring data integrity and analytical precision',
      operations: 'implementing robust, auditable systems'
    }
  };

  if (tone === 'balanced') return '';
  
  const toneQualifiers = qualifiers[tone] || qualifiers.executive;
  return toneQualifiers[domain] || toneQualifiers.core;
}

// Generate varied sentence structures based on type and domain
function generateSentence({ type, verb, context, keywordPart, resultLead, metric, toneQualifier, domain }) {
  const structures = {
    metric: [
      `${verb} ${keywordPart}${context}, ${resultLead} ${metric}${toneQualifier ? ` ${toneQualifier}` : ''}`,
      `${verb} ${keywordPart}${context} to ${resultLead.replace(/ing$/, 'e')} ${metric}${toneQualifier ? `, ${toneQualifier}` : ''}`,
      `By ${verb.replace(/ed$/, 'ing')} ${keywordPart}${context}, ${resultLead} ${metric}${toneQualifier ? ` ${toneQualifier}` : ''}`
    ],
    leadership: [
      `${verb} cross-functional teams${keywordPart ? ` on ${keywordPart}` : ''} ${context}, ${resultLead} ${metric}${toneQualifier ? ` ${toneQualifier}` : ''}`,
      `Led and ${verb.replace(/^\w+\s+/, '')} ${keywordPart}${context}, ${resultLead} ${metric} while aligning stakeholder expectations${toneQualifier ? ` ${toneQualifier}` : ''}`,
      `${verb} ${keywordPart}${context} across multiple teams, ${resultLead} ${metric} through improved coordination${toneQualifier ? ` ${toneQualifier}` : ''}`
    ],
    technical: [
      `${verb} ${keywordPart}${context} using modern technical approaches, ${resultLead} ${metric}${toneQualifier ? ` ${toneQualifier}` : ''}`,
      `Architected and ${verb.replace(/ed$/, 'ed').replace(/[^\s]+$/, 'delivered')} ${keywordPart}${context}, ${resultLead} ${metric}${toneQualifier ? `, ${toneQualifier}` : ''}`,
      `${verb} ${keywordPart}${context} with emphasis on scalability, ${resultLead} ${metric}${toneQualifier ? ` ${toneQualifier}` : ''}`
    ],
    impact: [
      `${verb} ${keywordPart}${context}, directly ${resultLead} ${metric}${toneQualifier ? ` ${toneQualifier}` : ''}`,
      `Through ${verb.replace(/ed$/, 'ing')} ${keywordPart}${context}, achieved ${metric}${toneQualifier ? ` ${toneQualifier}` : ''}`,
      `${verb} ${keywordPart}${context} resulting in ${metric} and sustained business value${toneQualifier ? ` ${toneQualifier}` : ''}`
    ]
  };

  const typeStructures = structures[type] || structures.metric;
  return pickRandom(typeStructures, hashString(`${verb}${context}${metric}`));
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
  const domain = originalAnalysis.domain || 'general';
  const context = extractContext(bullet, domain);
  
  // Get domain-specific verbs if available
  const focusVerbs = VERB_BANK[focus] || VERB_BANK.growth;
  const domainVerbs = focusVerbs[domain] || focusVerbs.core || focusVerbs;
  const coreVerbs = focusVerbs.core || focusVerbs;
  
  // Combine and pick verbs
  const allVerbs = [...new Set([...domainVerbs, ...coreVerbs])];
  const verb = pickRandom(allVerbs, seed + type.seedOffset);
  
  const resultLead = pickRandom(RESULT_BANK[focus], seed, 3)[type.seedOffset % 3];
  const metric = getMetricForContext(seed + type.seedOffset, focus, extractMetricSnippet(bullet), domain);
  const keywordPart = shouldInjectKeyword(context, keyword) ? `${keyword} ` : '';
  const toneQualifier = getToneQualifier(tone, domain);

  // Generate varied sentence
  const text = generateSentence({
    type: type.key,
    verb,
    context,
    keywordPart,
    resultLead,
    metric,
    toneQualifier,
    domain
  });

  const rewritten = toSentence(text);
  const rewrittenAnalysis = analyzeBullet(rewritten, keyword);

  // Determine applied fixes based on what actually changed
  const appliedFixes = [];
  if (originalAnalysis.weakVerbHit && rewrittenAnalysis.strongVerbHit) {
    appliedFixes.push(`Replaced "${originalAnalysis.weakVerbHit}" with "${rewrittenAnalysis.strongVerbHit}"`);
  } else if (!originalAnalysis.strongVerbHit && rewrittenAnalysis.strongVerbHit) {
    appliedFixes.push(`Added strong action verb "${rewrittenAnalysis.strongVerbHit}"`);
  }
  if (originalAnalysis.metricsFound.length === 0 && rewrittenAnalysis.metricsFound.length > 0) {
    appliedFixes.push(`Added quantifiable outcome: ${rewrittenAnalysis.metricsFound[0]}`);
  }
  if (keyword && !includesKeyword(bullet, keyword) && includesKeyword(rewritten, keyword)) {
    appliedFixes.push(`Strategically placed "${keyword}"`);
  }
  if (originalAnalysis.wordCount < 10 && rewrittenAnalysis.wordCount >= 10) {
    appliedFixes.push(`Expanded context to show scope and impact (${rewrittenAnalysis.wordCount} words)`);
  }
  if (appliedFixes.length === 0) {
    appliedFixes.push('Restructured into clear SAR format');
  }

  // Better SAR decomposition
  const parts = rewritten.split(/,\s+(?=(?:resulting|driving|reducing|contributing|yielding|producing|enabling|improving|unlocking|accelerating|catalyzing|achieving|directly))/i);
  const actionPart = parts[0] || rewritten;
  const resultPart = parts.slice(1).join(', ').trim() || `Delivered ${metric}`;

  return {
    type: type.label,
    text: rewritten,
    score: rewrittenAnalysis.score,
    scoreDelta: rewrittenAnalysis.score - originalAnalysis.score,
    sar: {
      situation: toSentence(`In the context of ${context}`),
      action: toSentence(actionPart.replace(/^(\w+)/, (match) => match.toLowerCase())),
      result: toSentence(resultPart)
    },
    appliedFixes,
    analysis: rewrittenAnalysis,
    domain
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
    const seed = hashString(`${bullet}|${keyword}|${tone}|${focus}|${Date.now()}`);

    // Dynamic suggestion types based on domain and focus
    const baseTypes = [
      { key: 'metric', label: 'Impact-Focused Rewrite', seedOffset: 1 },
      { key: 'leadership', label: 'Leadership Angle', seedOffset: 7 },
      { key: 'technical', label: 'Technical Precision', seedOffset: 13 }
    ];

    // Adjust suggestion types based on domain
    const domainAdjustedTypes = [...baseTypes];
    if (originalAnalysis.domain === 'sales' || originalAnalysis.domain === 'marketing') {
      domainAdjustedTypes.push({ key: 'impact', label: 'Revenue Impact', seedOffset: 19 });
    }

    const suggestions = domainAdjustedTypes
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

    // Domain-specific tips
    const domainTips = {
      engineering: [
        'Include specific technologies or frameworks you used',
        'Mention scale: requests/sec, data volume, or user count',
        'Highlight reliability, security, or performance gains'
      ],
      data: [
        'Quantify the business decision your analysis influenced',
        'Include dataset size and processing complexity',
        'Mention tools: Python, SQL, Tableau, etc.'
      ],
      marketing: [
        'Use campaign metrics: CTR, conversion rate, CPA',
        'Include budget managed or ROI achieved',
        'Mention channels: social, email, paid, organic'
      ],
      sales: [
        'Always include quota attainment percentage',
        'Specify deal size ranges and sales cycle impact',
        'Mention new logo wins vs. expansion'
      ],
      product: [
        'Include user metrics: adoption, retention, NPS',
        'Mention stakeholder groups you aligned',
        'Quantify business outcomes influenced'
      ],
      general: [
        'Replace synthetic metrics with your actual numbers',
        'Mirror 1-2 exact terms from the job description',
        'Keep bullet length between 14-28 words for maximum scan readability'
      ]
    };

    return NextResponse.json({
      original: bullet,
      controls: { keyword, tone, focus },
      originalAnalysis: {
        ...originalAnalysis,
        domain: originalAnalysis.domain // Expose detected domain
      },
      rewrittenScore: bestScore,
      totalGain: bestScore - originalAnalysis.score,
      suggestions,
      topFixesApplied: [
        `Analyzed bullet context as "${originalAnalysis.domain}" domain`,
        'Converted narrative into SAR ordering (Context → Action → Result).',
        'Upgraded to recruiter-preferred action verbs with domain awareness.',
        'Increased metric and outcome visibility for ATS matching.'
      ],
      nextIteration: domainTips[originalAnalysis.domain] || domainTips.general
    });
  } catch (error) {
    console.error('SAR rewrite failed:', error);
    return NextResponse.json({ error: 'Failed to generate rewrite.' }, { status: 500 });
  }
}
