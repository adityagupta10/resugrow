import { NextResponse } from 'next/server';

const INDUSTRY_PROFILES = {
  general: {
    label: 'General',
    audience: 'professionals building a stronger personal brand',
    keywords: [],
    angles: ['career growth', 'execution', 'professional visibility'],
    hashtags: ['#CareerGrowth', '#ProfessionalDevelopment', '#PersonalBranding'],
  },
  software: {
    label: 'Software Engineering',
    audience: 'software engineers, engineering managers, and product builders',
    keywords: ['software', 'engineering', 'developer', 'backend', 'frontend', 'api', 'microservices', 'react', 'node', 'python', 'java', 'aws', 'kubernetes', 'deployment', 'platform'],
    angles: ['scalability', 'engineering systems', 'shipping velocity'],
    hashtags: ['#SoftwareEngineering', '#TechCareers', '#EngineeringLeadership'],
  },
  data: {
    label: 'Data & AI',
    audience: 'data professionals, ML teams, and AI operators',
    keywords: ['data', 'analytics', 'machine learning', 'ml', 'ai', 'llm', 'model', 'forecasting', 'pipeline', 'sql', 'python', 'insights'],
    angles: ['data-driven decisions', 'ML execution', 'business impact from data'],
    hashtags: ['#DataScience', '#Analytics', '#AIinBusiness'],
  },
  product: {
    label: 'Product Management',
    audience: 'product managers, founders, and cross-functional leaders',
    keywords: ['product', 'roadmap', 'users', 'retention', 'adoption', 'launch', 'discovery', 'experiment', 'feature'],
    angles: ['customer insight', 'shipping better products', 'growth through product'],
    hashtags: ['#ProductManagement', '#ProductStrategy', '#Growth'],
  },
  marketing: {
    label: 'Marketing & Growth',
    audience: 'growth marketers, brand operators, and demand generation leaders',
    keywords: ['marketing', 'growth', 'seo', 'campaign', 'funnel', 'lead', 'brand', 'content', 'paid', 'organic', 'cac', 'conversion'],
    angles: ['growth systems', 'campaign execution', 'brand leverage'],
    hashtags: ['#MarketingStrategy', '#GrowthMarketing', '#ContentMarketing'],
  },
  sales: {
    label: 'Sales & Revenue',
    audience: 'revenue leaders, account executives, and sales operators',
    keywords: ['sales', 'revenue', 'pipeline', 'quota', 'accounts', 'closing', 'prospects', 'deal', 'gtm'],
    angles: ['commercial execution', 'pipeline quality', 'customer relationships'],
    hashtags: ['#SalesLeadership', '#RevenueGrowth', '#B2BSales'],
  },
  finance: {
    label: 'Finance & FinTech',
    audience: 'finance professionals, operators, and fintech builders',
    keywords: ['finance', 'fintech', 'payments', 'risk', 'compliance', 'reconciliation', 'cash flow', 'fraud', 'trading'],
    angles: ['risk-aware growth', 'financial operations', 'trusted systems'],
    hashtags: ['#FinTech', '#FinanceCareers', '#BusinessOperations'],
  },
  healthcare: {
    label: 'Healthcare',
    audience: 'healthcare operators, clinicians, and healthtech teams',
    keywords: ['healthcare', 'clinical', 'patient', 'hospital', 'care', 'medical', 'ehr', 'healthtech'],
    angles: ['patient outcomes', 'operational reliability', 'human-centered execution'],
    hashtags: ['#HealthcareInnovation', '#HealthTech', '#CareDelivery'],
  },
  hr: {
    label: 'HR & Talent',
    audience: 'talent leaders, recruiters, and people managers',
    keywords: ['recruiting', 'hiring', 'talent', 'hr', 'people', 'culture', 'onboarding', 'employer brand'],
    angles: ['talent strategy', 'people operations', 'hiring quality'],
    hashtags: ['#TalentAcquisition', '#PeopleOps', '#Leadership'],
  },
};

const POSTING_TIMES = [
  { day: 'Tuesday', slots: ['8:00-9:00 AM IST', '12:30-1:30 PM IST', '6:00-7:00 PM IST'], level: 'High', reason: 'Great for practical career content and credibility posts with a strong hook.' },
  { day: 'Wednesday', slots: ['8:30-9:30 AM IST', '1:00-2:00 PM IST', '5:30-7:00 PM IST'], level: 'Highest', reason: 'Usually the best day for reach, especially when the first 3 lines create curiosity.' },
  { day: 'Thursday', slots: ['9:00-10:00 AM IST', '12:00-1:00 PM IST', '6:00-7:30 PM IST'], level: 'High', reason: 'Strong for thought leadership, career lessons, and framework-based content.' },
  { day: 'Sunday', slots: ['6:00-8:00 PM IST'], level: 'Medium', reason: 'Works well for reflective stories and career transitions as people plan the week ahead.' },
];

const ENGAGEMENT_TIPS = {
  PAS: [
    'Make the first line uncomfortable enough to stop the scroll, then resolve the tension with specifics.',
    'Leave visible white space between sections so the post feels skimmable on mobile.',
    'Use one concrete metric early. Numbers make the story feel earned, not inflated.',
  ],
  AIDA: [
    'Treat the first three lines like ad copy. Attention and intrigue matter more than polish.',
    'One clear desire beats five weak benefits. Keep the promise tight.',
    'End with a low-friction question so people can reply without thinking too hard.',
  ],
  Story: [
    'Story posts perform better when the setback feels real and the lesson is professionally useful.',
    'Keep the narrative specific: what changed, why it mattered, and what others can borrow from it.',
    'The best story posts feel personal but still teach a repeatable principle.',
  ],
};

const ROLE_TERMS = ['manager', 'engineer', 'developer', 'founder', 'marketer', 'designer', 'analyst', 'consultant', 'director', 'lead', 'specialist'];
const THEMES = {
  leadership: ['led', 'managed', 'mentored', 'hired', 'team', 'leadership', 'stakeholders'],
  growth: ['grew', 'growth', 'scale', 'scaled', 'revenue', 'pipeline', 'conversion', 'adoption'],
  product: ['feature', 'launch', 'roadmap', 'product', 'retention', 'users', 'customer'],
  efficiency: ['reduced', 'cut', 'saved', 'automation', 'faster', 'efficiency', 'turnaround'],
  technical: ['system', 'platform', 'api', 'architecture', 'infra', 'cloud', 'model', 'pipeline'],
  credibility: ['promotion', 'promoted', 'award', 'recognition', 'certification', 'speaker', 'featured'],
};

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function clampText(text, max = 140) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}...`;
}

function extractMetrics(text) {
  const matches = text.match(/(\$[\d,.]+[mk]?)|(\d+%?)|(\d+\s?(?:x|X))|(\d+\s?(?:users|customers|clients|teams|engineers|months|weeks|days|hours|years|leads))/g);
  return unique(matches || []);
}

function detectRole(text) {
  const lower = text.toLowerCase();
  const role = ROLE_TERMS.find((term) => lower.includes(term));
  return role ? `${role[0].toUpperCase()}${role.slice(1)}` : 'professional';
}

function inferIndustry(selectedIndustry, text) {
  if (selectedIndustry && selectedIndustry !== 'general') return selectedIndustry;
  const lower = text.toLowerCase();
  const scored = Object.entries(INDUSTRY_PROFILES)
    .filter(([key]) => key !== 'general')
    .map(([key, profile]) => ({
      key,
      score: profile.keywords.reduce((acc, keyword) => acc + (lower.includes(keyword) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score);
  return scored[0]?.score > 0 ? scored[0].key : 'general';
}

function detectThemes(text) {
  const lower = text.toLowerCase();
  return unique(
    Object.entries(THEMES)
      .filter(([, terms]) => terms.some((term) => lower.includes(term)))
      .map(([theme]) => theme),
  );
}

function detectKeywords(text, industryKey) {
  const lower = text.toLowerCase();
  const industryProfile = INDUSTRY_PROFILES[industryKey] || INDUSTRY_PROFILES.general;
  const keywords = industryProfile.keywords.filter((keyword) => lower.includes(keyword));
  const metrics = extractMetrics(text);
  return unique([...keywords, ...metrics]).slice(0, 8);
}

function summarizeAchievement(text) {
  const firstSentence = text.split(/[.!?]/).map((part) => part.trim()).find(Boolean) || text.trim();
  return clampText(firstSentence, 120);
}

function getPainPoint(themes, industry) {
  if (themes.includes('efficiency')) return 'Teams get busy, but output stays flat because the system behind the work is still broken.';
  if (themes.includes('growth')) return 'A lot of teams chase activity instead of the metric that actually moves the business.';
  if (themes.includes('leadership')) return 'Leadership work is often invisible until you articulate how decisions changed the outcome.';
  if (industry === 'software') return 'Shipping faster is meaningless if reliability, quality, and ownership are not improving in parallel.';
  if (industry === 'marketing') return 'Marketing looks noisy from the outside, but the real work is building a repeatable growth engine.';
  return 'A lot of strong professionals undersell the actual system, thinking, and tradeoffs behind their results.';
}

function getDesire(themes, industryProfile) {
  if (themes.includes('growth')) return 'build growth that compounds instead of chasing vanity numbers';
  if (themes.includes('leadership')) return 'show strategic leadership, not just hard work';
  if (themes.includes('technical')) return 'translate deep work into clear business value';
  return `build credibility with ${industryProfile.audience}`;
}

function getActionFramework(themes, keywords, role) {
  const base = [
    `Define the outcome before the work starts.`,
    `Choose one signal that proves progress.`,
    `Communicate decisions in language your stakeholders understand.`,
  ];
  if (themes.includes('technical')) {
    base[1] = `Tie the technical work to one visible business or delivery metric.`;
  }
  if (themes.includes('leadership')) {
    base[2] = `Show how your decisions improved team velocity, quality, or clarity.`;
  }
  if (keywords.length) {
    base.push(`Keep the language concrete: mention ${keywords.slice(0, 2).join(' and ')} instead of vague responsibility terms.`);
  }
  base.push(`As a ${role.toLowerCase()}, make the result easier to repeat, not just easier to celebrate.`);
  return base;
}

function buildHashtags(industryKey, themes, keywords, postType, includeHashtags) {
  if (!includeHashtags) return [];
  const industryProfile = INDUSTRY_PROFILES[industryKey] || INDUSTRY_PROFILES.general;
  const themeTags = [];
  if (themes.includes('leadership')) themeTags.push('#Leadership', '#TeamBuilding');
  if (themes.includes('growth')) themeTags.push('#Growth', '#BusinessImpact');
  if (themes.includes('technical')) themeTags.push('#Execution', '#OperationalExcellence');
  if (postType === 'story') themeTags.push('#CareerStory');
  if (postType === 'achievement') themeTags.push('#Wins');
  const keywordTags = keywords
    .filter((kw) => /^[a-z][a-z0-9 ]+$/i.test(kw))
    .slice(0, 3)
    .map((kw) => `#${kw.replace(/[^a-z0-9]+/gi, '')}`);
  return unique([...industryProfile.hashtags, ...themeTags, ...keywordTags, '#LinkedInTips']).slice(0, 8);
}

function addEmoji(enabled, emoji, text) {
  return enabled ? `${emoji} ${text}` : text;
}

function joinPost(lines) {
  return lines.filter(Boolean).join('\n\n');
}

function buildPASPost(context, tone, includeEmoji) {
  const { summary, painPoint, actionFramework, lesson, metrics, audience, industryLabel, suggestedAngle, role } = context;
  const opener =
    tone === 'bold'
      ? `Most ${audience} are still talking about effort when they should be talking about outcomes.`
      : `A lot of ${audience} have stronger results than their LinkedIn content makes visible.`;

  const lines = [
    addEmoji(includeEmoji, '⚠️', opener),
    painPoint,
    `A recent example from my own work: ${summary}`,
    `What changed was not just the output. It was the system behind it.`,
    addEmoji(includeEmoji, 'Problem', 'The usual mistake: describing the task, but hiding the leverage.'),
    addEmoji(includeEmoji, 'Agitation', `That makes high-value work in ${industryLabel.toLowerCase()} sound interchangeable, even when it clearly is not.`),
    addEmoji(includeEmoji, 'Solution', `The better approach is to frame the story around ${suggestedAngle}.`),
    ...actionFramework.map((item, index) => `${index + 1}. ${item}`),
    metrics.length ? `In this case, the evidence was visible in metrics like ${metrics.slice(0, 3).join(', ')}.` : `In this case, the evidence was clear because the outcome became easier to see and easier to trust.`,
    `Lesson: ${lesson}`,
    `If you are a ${role.toLowerCase()} trying to build stronger credibility on LinkedIn, start by rewriting one recent win through the lens of business impact, not effort.`,
    tone === 'conversational'
      ? 'What is one piece of work you have done recently that deserves a sharper story?'
      : 'What is one result from your recent work that is still being described too vaguely?',
  ];

  return { framework: 'PAS', content: joinPost(lines) };
}

function buildAIDAPost(context, tone, includeEmoji) {
  const { summary, desire, metrics, keywords, industryLabel, lesson, audience } = context;
  const attention =
    tone === 'inspirational'
      ? `A single strong career story can completely change how ${audience} see your work.`
      : `If you want to stand out in ${industryLabel}, generic updates will not get you there.`;

  const interest = `For context: ${summary}`;
  const desireBlock = [
    `What makes a post resonate is not the achievement alone.`,
    `It is the combination of clarity, proof, and a takeaway people can apply.`,
    `That is how you ${desire}.`,
  ];
  const evidence = metrics.length
    ? `In this example, the proof points were ${metrics.slice(0, 3).join(', ')}.`
    : `In this example, the proof came from visible change in execution quality and outcomes.`;
  const keywordLine = keywords.length
    ? `Even the wording matters. Terms like ${keywords.slice(0, 4).join(', ')} make the post feel credible because they reflect the actual work.`
    : '';
  const lines = [
    addEmoji(includeEmoji, '🚀', attention),
    interest,
    ...desireBlock,
    evidence,
    keywordLine,
    `The takeaway: ${lesson}`,
    `If you are writing about your own wins this week, ask yourself three things:`,
    `1. What changed because of my work?`,
    `2. What proof makes that believable?`,
    `3. What lesson would make someone stop and save this post?`,
    tone === 'bold'
      ? 'If your post could describe anyone, it is not ready yet.'
      : 'If your post could describe anyone, it is probably too generic.',
    'Which of those three questions do you find hardest when writing on LinkedIn?',
  ];

  return { framework: 'AIDA', content: joinPost(lines) };
}

function buildStoryPost(context, tone, includeEmoji) {
  const { summary, lesson, metrics, role, industryLabel, actionFramework, audience } = context;
  const opener =
    tone === 'conversational'
      ? `A quick story from my work in ${industryLabel}.`
      : `Not every meaningful career move looks dramatic in real time.`;
  const tension = `At the time, it just looked like a normal piece of work: ${summary}`;
  const pivot = `But that moment forced me to think differently about how a ${role.toLowerCase()} creates trust with ${audience}.`;
  const evidence = metrics.length
    ? `Later, the effect showed up in real signals: ${metrics.slice(0, 3).join(', ')}.`
    : `Later, the effect was obvious in stronger execution, clearer communication, and better follow-through.`;
  const lessons = actionFramework.slice(0, 3).map((item, index) => `${index + 1}. ${item}`);
  const lines = [
    addEmoji(includeEmoji, '🧵', opener),
    tension,
    pivot,
    evidence,
    `What I would tell my past self now:`,
    ...lessons,
    `The real point is this: ${lesson}`,
    tone === 'inspirational'
      ? `A lot of careers accelerate when people finally learn how to explain their own value clearly.`
      : `A lot of great work goes unnoticed simply because the story around it is too soft.`,
    `What is one professional lesson you learned the hard way this year?`,
  ];

  return { framework: 'Story', content: joinPost(lines) };
}

function buildCarousel(context) {
  const { summary, lesson, industryLabel, metrics, suggestedAngle } = context;
  return {
    title: `${industryLabel} post framework`,
    slideCount: 7,
    slides: [
      { number: 1, title: 'Hook', content: `Most professionals in ${industryLabel.toLowerCase()} are underselling their best work.` },
      { number: 2, title: 'Context', content: summary },
      { number: 3, title: 'What people usually do', content: 'They list responsibilities, tools, and tasks without explaining the leverage.' },
      { number: 4, title: 'What works better', content: `Lead with ${suggestedAngle}, then support it with evidence.` },
      { number: 5, title: 'Proof', content: metrics.length ? metrics.slice(0, 3).join('\n') : 'Use one concrete metric, one operational shift, and one lesson.' },
      { number: 6, title: 'Lesson', content: lesson },
      { number: 7, title: 'CTA', content: 'Take one recent win and rewrite it with a stronger hook, evidence, and takeaway.' },
    ],
  };
}

function buildContext(achievement, selectedIndustry, postType) {
  const industryKey = inferIndustry(selectedIndustry, achievement);
  const industryProfile = INDUSTRY_PROFILES[industryKey] || INDUSTRY_PROFILES.general;
  const role = detectRole(achievement);
  const themes = detectThemes(achievement);
  const keywords = detectKeywords(achievement, industryKey);
  const metrics = extractMetrics(achievement);
  const summary = summarizeAchievement(achievement);
  const suggestedAngle =
    themes.includes('growth')
      ? 'what actually moved the business metric'
      : themes.includes('leadership')
        ? 'the decision-making behind the result'
        : themes.includes('technical')
          ? 'the system change that unlocked the result'
          : industryProfile.angles[0];
  const lesson =
    themes.includes('growth')
      ? 'The strongest career content explains leverage, not just effort.'
      : themes.includes('leadership')
        ? 'Leadership becomes visible when you explain the decisions that changed the outcome.'
        : themes.includes('technical')
          ? 'Technical work earns attention when the business consequence is obvious.'
          : 'Clarity turns good work into visible professional equity.';

  return {
    industryKey,
    industryLabel: industryProfile.label,
    audience: industryProfile.audience,
    role,
    themes,
    keywords,
    metrics,
    summary,
    painPoint: getPainPoint(themes, industryKey),
    desire: getDesire(themes, industryProfile),
    suggestedAngle,
    lesson,
    postType,
    actionFramework: getActionFramework(themes, keywords, role),
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const achievement = (body.achievement || '').trim();
    const postType = body.postType || 'story';
    const tone = body.tone || 'professional';
    const industry = body.industry || 'general';
    const includeEmoji = body.includeEmoji !== false;
    const includeHashtags = body.includeHashtags !== false;

    if (!achievement || achievement.length < 20) {
      return NextResponse.json({ error: 'Please describe your achievement in at least 20 characters.' }, { status: 400 });
    }

    const context = buildContext(achievement, industry, postType);
    const hashtags = buildHashtags(context.industryKey, context.themes, context.keywords, postType, includeHashtags);

    const posts = [
      buildPASPost(context, tone, includeEmoji),
      buildAIDAPost(context, tone, includeEmoji),
      buildStoryPost(context, tone, includeEmoji),
    ].map((post) => ({
      framework: post.framework,
      content: post.content,
      characterCount: post.content.length,
      hashtags,
      callToAction: post.content.split('\n\n').at(-1),
      engagementTips: ENGAGEMENT_TIPS[post.framework] || ENGAGEMENT_TIPS.Story,
    }));

    return NextResponse.json({
      posts,
      insights: {
        industry: context.industryLabel,
        audience: context.audience,
        role: context.role,
        themes: context.themes,
        keywords: context.keywords,
        suggestedAngle: context.suggestedAngle,
      },
      carouselTemplate: buildCarousel(context),
      bestPostingTimes: POSTING_TIMES,
      generalTips: [
        'The first 2-3 lines determine whether someone taps "see more". Spend most of your time there.',
        'If you mention a result, pair it with context. Numbers land harder when readers know what changed.',
        'Posts feel more credible when they include one industry-specific term and one business consequence.',
        'Do not overload hashtags. A smaller, more relevant set usually performs better than a long generic stack.',
        'LinkedIn rewards follow-up engagement. Stay in the comments for the first hour after posting.',
      ],
    });
  } catch (err) {
    console.error('LinkedIn studio error:', err);
    return NextResponse.json({ error: 'Failed to generate posts. Please try again.' }, { status: 500 });
  }
}
