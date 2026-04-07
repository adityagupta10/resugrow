import { NextResponse } from 'next/server';

const LOCATION_MARKETS = {
  india: { label: 'India', unit: 'LPA' },
  usa: { label: 'United States', unit: 'K USD' },
  uk: { label: 'United Kingdom', unit: 'K GBP' },
  singapore: { label: 'Singapore', unit: 'K SGD' },
  remote: { label: 'Remote / Global', unit: 'K USD' },
};

const FAMILY_LIBRARY = {
  engineering: {
    keywords: ['engineer', 'developer', 'frontend', 'backend', 'full stack', 'sre', 'devops', 'platform', 'mobile'],
    strengths: ['systems thinking', 'execution quality', 'technical depth'],
    roles: [
      {
        title: 'Senior Software Engineer',
        track: 'ic',
        idealMinYears: 3,
        idealMaxYears: 6,
        coreSkills: ['system design', 'apis', 'testing', 'cloud', 'sql', 'ownership'],
        stretchSkills: ['architecture', 'mentoring', 'performance tuning'],
        salary: { india: [28, 45], usa: [145, 195], uk: [72, 98], singapore: [95, 132], remote: [110, 155] },
        outcomes: ['own larger technical scope', 'lead delivery across services', 'improve code quality and reliability'],
      },
      {
        title: 'Staff Engineer',
        track: 'ic',
        idealMinYears: 6,
        idealMaxYears: 10,
        coreSkills: ['architecture', 'scalability', 'cross-team influence', 'observability', 'technical strategy'],
        stretchSkills: ['org design', 'platform roadmap', 'executive communication'],
        salary: { india: [45, 70], usa: [190, 270], uk: [100, 145], singapore: [135, 190], remote: [160, 225] },
        outcomes: ['set technical direction', 'de-risk platform decisions', 'raise engineering standards'],
      },
      {
        title: 'Engineering Manager',
        track: 'management',
        idealMinYears: 5,
        idealMaxYears: 9,
        coreSkills: ['people management', 'delivery planning', 'stakeholder management', 'hiring', 'coaching'],
        stretchSkills: ['organizational design', 'resource planning', 'executive alignment'],
        salary: { india: [42, 65], usa: [175, 245], uk: [95, 135], singapore: [130, 180], remote: [155, 220] },
        outcomes: ['improve team throughput', 'grow stronger engineers', 'translate business goals into delivery plans'],
      },
      {
        title: 'Solutions Architect',
        track: 'specialist',
        idealMinYears: 5,
        idealMaxYears: 10,
        coreSkills: ['cloud architecture', 'stakeholder communication', 'solution design', 'security', 'tradeoff analysis'],
        stretchSkills: ['pre-sales', 'cost optimization', 'enterprise architecture'],
        salary: { india: [35, 58], usa: [160, 225], uk: [88, 128], singapore: [118, 172], remote: [145, 210] },
        outcomes: ['design scalable systems', 'align technical choices to commercial goals', 'advise senior stakeholders'],
      },
      {
        title: 'Product Engineer',
        track: 'hybrid',
        idealMinYears: 3,
        idealMaxYears: 7,
        coreSkills: ['product thinking', 'rapid prototyping', 'frontend', 'analytics', 'customer empathy'],
        stretchSkills: ['growth loops', 'experimentation', 'design collaboration'],
        salary: { india: [26, 42], usa: [140, 190], uk: [70, 96], singapore: [92, 128], remote: [105, 150] },
        outcomes: ['ship user-facing improvements faster', 'tie engineering work to customer behavior', 'blend product and delivery judgment'],
      },
    ],
  },
  data: {
    keywords: ['data', 'analyst', 'scientist', 'ml', 'machine learning', 'ai', 'analytics', 'bi'],
    strengths: ['analytical rigor', 'pattern recognition', 'decision support'],
    roles: [
      {
        title: 'Senior Data Analyst',
        track: 'ic',
        idealMinYears: 3,
        idealMaxYears: 6,
        coreSkills: ['sql', 'dashboarding', 'stakeholder communication', 'experimentation', 'business analysis'],
        stretchSkills: ['forecasting', 'data modeling', 'storytelling'],
        salary: { india: [18, 32], usa: [110, 150], uk: [55, 78], singapore: [78, 112], remote: [90, 130] },
        outcomes: ['turn data into clearer decisions', 'build trusted reporting', 'improve commercial insight'],
      },
      {
        title: 'Data Scientist',
        track: 'ic',
        idealMinYears: 2,
        idealMaxYears: 6,
        coreSkills: ['python', 'statistics', 'experimentation', 'machine learning', 'communication'],
        stretchSkills: ['mlops', 'causal inference', 'feature engineering'],
        salary: { india: [20, 36], usa: [125, 175], uk: [62, 90], singapore: [88, 125], remote: [100, 145] },
        outcomes: ['model patterns and predictions', 'operationalize insights', 'drive measurable impact from data'],
      },
      {
        title: 'Analytics Manager',
        track: 'management',
        idealMinYears: 5,
        idealMaxYears: 9,
        coreSkills: ['team leadership', 'stakeholder alignment', 'roadmapping', 'measurement strategy', 'analytics governance'],
        stretchSkills: ['executive communication', 'resource planning', 'cross-functional influence'],
        salary: { india: [30, 48], usa: [145, 205], uk: [78, 115], singapore: [110, 155], remote: [125, 185] },
        outcomes: ['set analytics priorities', 'lead analysts and scientists', 'shape decisions across the business'],
      },
      {
        title: 'ML Engineer',
        track: 'ic',
        idealMinYears: 3,
        idealMaxYears: 7,
        coreSkills: ['python', 'ml deployment', 'cloud', 'pipelines', 'monitoring'],
        stretchSkills: ['model serving', 'kubernetes', 'feature stores'],
        salary: { india: [25, 40], usa: [140, 195], uk: [72, 102], singapore: [100, 140], remote: [115, 160] },
        outcomes: ['ship ML systems reliably', 'bridge modeling and production', 'improve model quality in real environments'],
      },
      {
        title: 'AI Product Specialist',
        track: 'hybrid',
        idealMinYears: 4,
        idealMaxYears: 8,
        coreSkills: ['ai workflows', 'stakeholder communication', 'prompt systems', 'experimentation', 'product judgment'],
        stretchSkills: ['go-to-market alignment', 'customer discovery', 'evaluation frameworks'],
        salary: { india: [24, 38], usa: [135, 185], uk: [68, 95], singapore: [96, 132], remote: [108, 148] },
        outcomes: ['translate AI capabilities into products', 'align use cases to value', 'ship applied AI experiences'],
      },
    ],
  },
  product: {
    keywords: ['product manager', 'product', 'growth manager', 'business analyst', 'program manager'],
    strengths: ['customer insight', 'prioritization', 'cross-functional alignment'],
    roles: [
      {
        title: 'Senior Product Manager',
        track: 'ic',
        idealMinYears: 4,
        idealMaxYears: 8,
        coreSkills: ['roadmapping', 'stakeholder management', 'analytics', 'prioritization', 'user research'],
        stretchSkills: ['pricing', 'growth loops', 'leadership communication'],
        salary: { india: [32, 55], usa: [150, 215], uk: [82, 122], singapore: [118, 168], remote: [130, 190] },
        outcomes: ['own larger product surface area', 'drive roadmap quality', 'tie decisions to user and business outcomes'],
      },
      {
        title: 'Growth Product Manager',
        track: 'ic',
        idealMinYears: 3,
        idealMaxYears: 7,
        coreSkills: ['experimentation', 'funnels', 'retention', 'analytics', 'lifecycle thinking'],
        stretchSkills: ['monetization', 'performance marketing', 'data fluency'],
        salary: { india: [28, 48], usa: [145, 205], uk: [78, 112], singapore: [112, 158], remote: [125, 180] },
        outcomes: ['improve growth metrics', 'run structured experiments', 'connect product work to revenue'],
      },
      {
        title: 'Group Product Manager',
        track: 'management',
        idealMinYears: 7,
        idealMaxYears: 12,
        coreSkills: ['team leadership', 'portfolio thinking', 'executive communication', 'strategy', 'resource prioritization'],
        stretchSkills: ['people development', 'org influence', 'business planning'],
        salary: { india: [50, 80], usa: [190, 270], uk: [110, 155], singapore: [145, 205], remote: [170, 240] },
        outcomes: ['lead multiple PMs', 'shape product portfolio direction', 'turn strategy into roadmaps'],
      },
      {
        title: 'Product Operations Manager',
        track: 'specialist',
        idealMinYears: 4,
        idealMaxYears: 9,
        coreSkills: ['process design', 'analytics', 'stakeholder coordination', 'tooling', 'execution systems'],
        stretchSkills: ['change management', 'enablement', 'portfolio reporting'],
        salary: { india: [25, 42], usa: [125, 175], uk: [68, 98], singapore: [96, 136], remote: [108, 152] },
        outcomes: ['improve product team execution', 'create repeatable operating rhythms', 'increase cross-functional clarity'],
      },
      {
        title: 'Platform Product Manager',
        track: 'hybrid',
        idealMinYears: 4,
        idealMaxYears: 9,
        coreSkills: ['technical fluency', 'roadmapping', 'stakeholder management', 'apis', 'platform strategy'],
        stretchSkills: ['architecture literacy', 'ecosystem thinking', 'governance'],
        salary: { india: [30, 52], usa: [150, 215], uk: [82, 120], singapore: [116, 164], remote: [132, 188] },
        outcomes: ['lead internal platforms', 'align technical systems with product value', 'improve developer or partner leverage'],
      },
    ],
  },
  marketing: {
    keywords: ['marketing', 'growth', 'seo', 'content', 'brand', 'demand gen', 'performance'],
    strengths: ['messaging', 'audience understanding', 'commercial focus'],
    roles: [
      {
        title: 'Growth Marketing Manager',
        track: 'ic',
        idealMinYears: 3,
        idealMaxYears: 7,
        coreSkills: ['funnel analytics', 'campaign strategy', 'experimentation', 'copywriting', 'performance marketing'],
        stretchSkills: ['lifecycle', 'landing page optimization', 'pricing'],
        salary: { india: [18, 32], usa: [105, 145], uk: [52, 75], singapore: [72, 102], remote: [82, 120] },
        outcomes: ['grow acquisition efficiently', 'improve conversion rates', 'connect campaigns to revenue'],
      },
      {
        title: 'Content Marketing Lead',
        track: 'ic',
        idealMinYears: 4,
        idealMaxYears: 8,
        coreSkills: ['editorial strategy', 'seo', 'thought leadership', 'distribution', 'content systems'],
        stretchSkills: ['team management', 'web analytics', 'brand narrative'],
        salary: { india: [16, 28], usa: [95, 135], uk: [48, 68], singapore: [68, 96], remote: [78, 112] },
        outcomes: ['own content engine performance', 'build authority in-market', 'generate consistent inbound demand'],
      },
      {
        title: 'Demand Generation Manager',
        track: 'specialist',
        idealMinYears: 4,
        idealMaxYears: 8,
        coreSkills: ['campaign planning', 'attribution', 'crm', 'paid acquisition', 'lead scoring'],
        stretchSkills: ['ops automation', 'sales alignment', 'multi-touch measurement'],
        salary: { india: [20, 35], usa: [110, 155], uk: [56, 82], singapore: [76, 108], remote: [88, 125] },
        outcomes: ['improve pipeline quality', 'increase marketing-sourced revenue', 'build repeatable acquisition systems'],
      },
      {
        title: 'Brand Marketing Manager',
        track: 'ic',
        idealMinYears: 4,
        idealMaxYears: 8,
        coreSkills: ['brand positioning', 'messaging', 'campaign development', 'audience research', 'cross-channel execution'],
        stretchSkills: ['creative leadership', 'partnerships', 'PR'],
        salary: { india: [18, 32], usa: [105, 148], uk: [52, 78], singapore: [74, 105], remote: [84, 118] },
        outcomes: ['shape brand narrative', 'increase awareness quality', 'improve consistency across campaigns'],
      },
      {
        title: 'Marketing Director',
        track: 'management',
        idealMinYears: 7,
        idealMaxYears: 12,
        coreSkills: ['team leadership', 'budget ownership', 'go-to-market strategy', 'forecasting', 'executive communication'],
        stretchSkills: ['category strategy', 'org design', 'board reporting'],
        salary: { india: [35, 60], usa: [150, 220], uk: [85, 125], singapore: [112, 165], remote: [130, 190] },
        outcomes: ['lead marketing team direction', 'tie spend to pipeline and revenue', 'drive integrated go-to-market execution'],
      },
    ],
  },
};

const TRACK_LABELS = {
  ic: 'Individual Contributor',
  management: 'Management',
  specialist: 'Specialist',
  hybrid: 'Hybrid / Cross-Functional',
};

function normalizeSkill(value) {
  return value.toLowerCase().trim();
}

function toTitleCase(value) {
  return value
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function inferFamily(role, skills) {
  const roleText = role.toLowerCase();
  const combined = `${roleText} ${skills.map((skill) => skill.toLowerCase()).join(' ')}`;
  const scored = Object.entries(FAMILY_LIBRARY).map(([family, config]) => ({
    family,
    score: config.keywords.reduce((sum, keyword) => sum + (combined.includes(keyword) ? 1 : 0), 0),
  })).sort((a, b) => b.score - a.score);
  return scored[0]?.score > 0 ? scored[0].family : 'engineering';
}

function getTrackBonus(roleTrack, preferredTrack) {
  if (!preferredTrack || preferredTrack === 'open') return 0;
  if (roleTrack === preferredTrack) return 12;
  if (preferredTrack === 'management' && roleTrack === 'hybrid') return 6;
  if (preferredTrack === 'ic' && roleTrack === 'specialist') return 6;
  return 0;
}

function getYearScore(years, role) {
  if (years >= role.idealMinYears && years <= role.idealMaxYears) return 34;
  const distance =
    years < role.idealMinYears ? role.idealMinYears - years : years - role.idealMaxYears;
  return Math.max(6, 34 - distance * 7);
}

function getSkillScore(skills, role) {
  const normalizedSkills = skills.map(normalizeSkill);
  const presentCore = role.coreSkills.filter((skill) => normalizedSkills.some((owned) => owned.includes(skill) || skill.includes(owned)));
  const presentStretch = role.stretchSkills.filter((skill) => normalizedSkills.some((owned) => owned.includes(skill) || skill.includes(owned)));
  const coreScore = Math.round((presentCore.length / role.coreSkills.length) * 38);
  const stretchScore = Math.round((presentStretch.length / Math.max(role.stretchSkills.length, 1)) * 10);
  return {
    total: coreScore + stretchScore,
    presentCore,
    presentStretch,
    gapCore: role.coreSkills.filter((skill) => !presentCore.includes(skill)),
    gapStretch: role.stretchSkills.filter((skill) => !presentStretch.includes(skill)),
  };
}

function formatSalaryBand(location, range) {
  const market = LOCATION_MARKETS[location] || LOCATION_MARKETS.india;
  return `${range[0]}-${range[1]} ${market.unit}`;
}

function buildWhyItFits(role, years, presentCore, family) {
  const reasons = [];
  if (years >= role.idealMinYears) {
    reasons.push(`Your experience level is already within reach for a ${role.title} move.`);
  } else {
    reasons.push(`You are slightly early for ${role.title}, but the move becomes realistic with sharper proof and missing skills closed.`);
  }
  if (presentCore.length > 0) {
    reasons.push(`You already show overlap in ${presentCore.slice(0, 3).map(toTitleCase).join(', ')}.`);
  }
  reasons.push(`This path stays aligned with your ${family} lane instead of forcing a disconnected jump.`);
  return reasons;
}

function buildLearningPath(role, gapCore, gapStretch) {
  const priorities = [...gapCore.slice(0, 3), ...gapStretch.slice(0, 2)].slice(0, 4);
  return priorities.map((skill, index) => ({
    title: toTitleCase(skill),
    priority: index < 2 ? 'High' : 'Medium',
    why: index < gapCore.length
      ? `This is a recurring capability for ${role.title} roles and will materially improve recruiter confidence.`
      : `This is a differentiator that can move you from “qualified” to “preferred”.`,
    proof: index < 2
      ? `Create one project or work artifact that proves ${skill} in action.`
      : `Document one example where you used ${skill} to improve outcomes or decision quality.`,
  }));
}

function buildRoadmap(role, context) {
  const topGaps = [...context.gapCore, ...context.gapStretch].slice(0, 5);
  const proofTarget = role.outcomes[0];
  const roadmap = [
    {
      phase: 'Months 1-2',
      title: 'Tighten your career narrative',
      objectives: [
        `Rewrite your resume and LinkedIn to position yourself toward ${role.title}.`,
        `Audit your recent work and extract 3 stories that prove ${proofTarget}.`,
        `Pick the top 2 missing skills to learn first: ${topGaps.slice(0, 2).map(toTitleCase).join(', ') || 'strategic positioning and stronger proof'}.`,
      ],
    },
    {
      phase: 'Months 3-5',
      title: 'Build visible proof',
      objectives: [
        `Create one portfolio artifact, project write-up, or case study tied to ${role.title} expectations.`,
        `Practice talking about tradeoffs, scope, and outcomes instead of just task execution.`,
        `Close another 1-2 skill gaps through guided practice, coursework, or on-the-job stretch work.`,
      ],
    },
    {
      phase: 'Months 6-8',
      title: 'Signal readiness to the market',
      objectives: [
        `Start applying selectively to ${role.title} roles and adjacent positions with similar scope.`,
        `Use mock interviews or peer reviews to pressure-test the stories around your strongest wins.`,
        `Refine your job search assets based on actual recruiter feedback and keyword gaps.`,
      ],
    },
  ];

  if (role.idealMinYears - context.yearsExperience > 1 || context.gapCore.length >= 3) {
    roadmap.push({
      phase: 'Months 9-12',
      title: 'Convert readiness into offers',
      objectives: [
        `Target higher-signal companies and recruiters once your proof set is stronger.`,
        `Ask for stretch ownership in your current role so your next application has fresher evidence.`,
        `Run a final ATS and LinkedIn optimization pass before concentrated applications.`,
      ],
    });
  }

  return roadmap;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const currentRole = (body.currentRole || '').trim();
    const yearsExperience = Number(body.yearsExperience);
    const location = body.location || 'india';
    const preferredTrack = body.preferredTrack || 'open';
    const currentSkills = Array.isArray(body.currentSkills) ? body.currentSkills.filter(Boolean) : [];

    if (!currentRole) {
      return NextResponse.json({ error: 'Please enter your current role.' }, { status: 400 });
    }
    if (Number.isNaN(yearsExperience) || yearsExperience < 0 || yearsExperience > 30) {
      return NextResponse.json({ error: 'Please enter valid years of experience.' }, { status: 400 });
    }
    if (currentSkills.length < 3) {
      return NextResponse.json({ error: 'Please add at least 3 current skills.' }, { status: 400 });
    }

    const family = inferFamily(currentRole, currentSkills);
    const familyConfig = FAMILY_LIBRARY[family];

    const recommendations = familyConfig.roles.map((role) => {
      const skillAnalysis = getSkillScore(currentSkills, role);
      const fitScore = Math.min(
        98,
        Math.round(
          getYearScore(yearsExperience, role) +
          skillAnalysis.total +
          getTrackBonus(role.track, preferredTrack) +
          10,
        ),
      );

      return {
        title: role.title,
        track: TRACK_LABELS[role.track],
        fitScore,
        salaryBand: formatSalaryBand(location, role.salary[location] || role.salary.india),
        outcomes: role.outcomes,
        skillsPresent: skillAnalysis.presentCore.map(toTitleCase),
        skillGaps: skillAnalysis.gapCore.map(toTitleCase),
        stretchSkills: skillAnalysis.gapStretch.map(toTitleCase),
        whyItFits: buildWhyItFits(role, yearsExperience, skillAnalysis.presentCore, family),
        learningPath: buildLearningPath(role, skillAnalysis.gapCore, skillAnalysis.gapStretch),
        roadmap: buildRoadmap(role, {
          yearsExperience,
          gapCore: skillAnalysis.gapCore,
          gapStretch: skillAnalysis.gapStretch,
        }),
      };
    }).sort((a, b) => b.fitScore - a.fitScore).slice(0, 5);

    const topRole = recommendations[0];

    return NextResponse.json({
      currentProfile: {
        currentRole,
        yearsExperience,
        lane: toTitleCase(family),
        market: LOCATION_MARKETS[location]?.label || LOCATION_MARKETS.india.label,
        strengths: familyConfig.strengths,
        topSkills: currentSkills.slice(0, 8),
      },
      recommendations,
      summary: {
        bestFitRole: topRole.title,
        bestFitScore: topRole.fitScore,
        biggestGap: topRole.skillGaps[0] || 'Stronger proof of business impact',
        timeToMove: topRole.roadmap.length === 4 ? '9-12 months' : '6-8 months',
      },
    });
  } catch (error) {
    console.error('Career path analyzer error:', error);
    return NextResponse.json(
      { error: 'Failed to generate career path recommendations. Please try again.' },
      { status: 500 },
    );
  }
}
