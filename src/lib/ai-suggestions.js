/**
 * lib/ai-suggestions.js
 * V4 - Semantic Suggestion & Auto-Improvement Engine
 */

// ====================== EXTENSIVE DATA BANK ======================

export const ROLE_SUGGESTIONS = {
  developer: {
    experience: {
      impact: [
        'Improved system performance by 45% through caching and query optimization.',
        'Reduced API latency by 60% using Redis and optimized data pipelines.',
        'Scaled backend to handle 1M+ daily requests with 99.9% uptime.',
        'Boosted user retention by 22% by improving LCP and load times by 55%.',
        'Decreased cloud infrastructure costs by 30% via resource rightsizing.'
      ],
      technical: [
        'Architected scalable RESTful APIs using Node.js serving 100K+ DAU.',
        'Designed microservices architecture deployed on AWS using EKS.',
        'Implemented CI/CD pipelines with GitHub Actions, reducing deployment time by 70%.',
        'Engineered real-time features using WebSockets and Socket.io.',
        'Integrated complex third-party gateways including Stripe and Twilio.'
      ],
      ownership: [
        'Spearheaded end-to-end migration from legacy monolith to microservices.',
        'Mentored 5+ junior developers, resulting in 2 internal promotions.',
        'Owned the technical roadmap for the core checkout service.',
        'Championed the adoption of TypeScript, reducing production crashes by 40%.'
      ]
    },
    summary: [
      'Performance-driven Software Engineer specializing in distributed systems.',
      'Full-stack developer with 5+ years experience building scalable SaaS products.',
      'Backend specialist focused on high-availability APIs and cloud architecture.'
    ],
    skills: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL', 'TypeScript', 'Kubernetes'],
    metrics: ['performance', 'latency', 'uptime', 'efficiency', 'load time']
  },

  product_manager: {
    experience: {
      impact: [
        'Increased user retention by 28% through data-driven feature prioritization.',
        'Launched a new mobile app module contributing $1.4M to annual ARR.',
        'Reduced customer churn by 18% by redesigning the user onboarding flow.',
        'Achieved 95% NPS score by implementing a customer feedback loop.',
        'Shortened time-to-market by 30% using Agile and Scrum methodologies.'
      ],
      technical: [
        'Defined the product roadmap for a $5M ARR B2B platform.',
        'Conducted 60+ user interviews to identify high-impact pain points.',
        'Managed cross-functional teams of 12 across engineering, design, and sales.',
        'Authored 25+ detailed PRDs and user stories for major feature launches.'
      ]
    },
    summary: [
      'Strategic Product Manager focused on bridging user needs with business goals.',
      'Data-driven PM with a track record of scaling consumer-facing products.',
      'Execution-oriented Product Leader experienced in Agile and growth hacking.'
    ],
    skills: ['Roadmapping', 'JIRA', 'Figma', 'A/B Testing', 'SQL', 'Product Strategy'],
    metrics: ['retention', 'churn', 'ARR', 'NPS', 'conversion']
  },

  marketing: {
    experience: {
      impact: [
        'Grew organic traffic by 185% within 9 months via comprehensive SEO strategy.',
        'Achieved a 5.2x ROAS on a $100K monthly performance marketing budget.',
        'Increased email open rates by 40% through A/B testing and segmentation.',
        'Generated 15,000+ MQLs per quarter through integrated lead-gen funnels.',
        'Reduced Cost Per Acquisition (CPA) by 22% using targeted lookalike audiences.'
      ],
      technical: [
        'Executed full-funnel growth campaigns across Meta, Google, and LinkedIn.',
        'Managed CMS-driven content strategies resulting in 50k+ monthly views.',
        'Built automated lead scoring models using HubSpot and Salesforce.'
      ]
    },
    summary: [
      'ROI-focused Growth Marketer specializing in performance and SEO.',
      'Digital Strategist with expertise in scaling acquisition channels for B2B SaaS.',
      'Content Marketing Lead focused on brand authority and lead generation.'
    ],
    skills: ['SEO', 'Google Ads', 'HubSpot', 'Copywriting', 'Analytics', 'Growth Hacking'],
    metrics: ['ROAS', 'CPA', 'traffic', 'leads', 'CTR']
  },

  data_analyst: {
    experience: {
      impact: [
        'Identified $200k in annual cost savings through predictive churn modeling.',
        'Built automated BI dashboards reducing reporting time for C-suite by 80%.',
        'Optimized supply chain logistics, improving delivery speed by 15%.'
      ],
      technical: [
        'Architected data pipelines using Python and SQL for 10TB+ datasets.',
        'Developed machine learning models to forecast monthly revenue with 94% accuracy.',
        'Performed cluster analysis to identify 4 high-value customer segments.'
      ]
    },
    summary: [
      'Analytical thinker expert in transforming raw data into actionable insights.',
      'Data Scientist specializing in Python, SQL, and predictive analytics.',
      'BI Analyst focused on data visualization and executive reporting.'
    ],
    skills: ['Python', 'SQL', 'Tableau', 'PowerBI', 'Pandas', 'Machine Learning'],
    metrics: ['accuracy', 'cost savings', 'automation', 'insights']
  },

  general: {
    experience: { 
      impact: ['Improved operational efficiency by 20% through workflow automation.'], 
      technical: ['Coordinated project timelines and deliverables across teams.'], 
      ownership: ['Led a team of 4 to deliver key business objectives ahead of schedule.'] 
    },
    summary: ['Adaptable professional with a strong track record of problem-solving.'],
    skills: ['Communication', 'Project Management', 'Teamwork', 'Critical Thinking'],
    metrics: ['efficiency', 'productivity', 'deadlines']
  },

  sales: {
    experience: {
      impact: [
        'Exceeded annual quota by 138%, closing $2.4M in new ARR.',
        'Grew territory revenue from $800K to $2.1M in 18 months.',
        'Increased average deal size by 34% through consultative selling techniques.',
        'Reduced sales cycle from 62 to 38 days by refining discovery call process.',
        'Maintained a 91% client retention rate across 40+ enterprise accounts.',
      ],
      technical: [
        'Managed a $4.8M pipeline across 18 strategic accounts in Salesforce CRM.',
        'Built outbound sequences in Outreach that generated 120+ qualified meetings per quarter.',
        'Collaborated with marketing to create battle cards that improved win rate by 22%.',
      ],
      ownership: [
        'Onboarded and ramped 6 new SDRs, reducing time-to-first-deal by 3 weeks.',
        'Led weekly deal reviews and coached team on objection handling.',
      ],
    },
    summary: [
      'Quota-crushing Sales Executive with a track record of closing enterprise deals.',
      'Revenue-focused Account Executive specializing in SaaS and B2B sales cycles.',
      'Strategic sales professional with expertise in pipeline management and deal acceleration.',
    ],
    skills: ['Salesforce', 'Outreach', 'HubSpot', 'Negotiation', 'Pipeline Management', 'CRM'],
    metrics: ['quota attainment', 'ARR', 'pipeline', 'win rate', 'deal size'],
  },

  hr: {
    experience: {
      impact: [
        'Reduced time-to-hire from 52 to 28 days by redesigning the interview process.',
        'Improved employee retention by 19% through structured onboarding and 90-day check-ins.',
        'Sourced and hired 120+ candidates across 14 departments in a single fiscal year.',
        'Decreased cost-per-hire by 31% by building an internal referral programme.',
        'Achieved 94% offer acceptance rate through competitive benchmarking and candidate experience improvements.',
      ],
      technical: [
        'Implemented Workday HRIS, migrating 800+ employee records with zero data loss.',
        'Designed competency frameworks used across 6 business units for performance reviews.',
        'Built a talent pipeline of 300+ pre-screened candidates using LinkedIn Recruiter.',
      ],
      ownership: [
        'Led DEI initiative that increased underrepresented hires by 28% in 12 months.',
        'Managed full-cycle recruitment for C-suite and VP-level roles.',
      ],
    },
    summary: [
      'People-first HR Leader with expertise in talent acquisition and organizational development.',
      'Strategic HR Business Partner focused on retention, culture, and high-performance teams.',
      'Talent Acquisition Specialist with a track record of building diverse, high-impact teams.',
    ],
    skills: ['Workday', 'LinkedIn Recruiter', 'ATS', 'HRIS', 'Talent Acquisition', 'Performance Management'],
    metrics: ['time-to-hire', 'retention', 'offer acceptance', 'cost-per-hire', 'headcount'],
  },
};

// ====================== ENGINE LOGIC ======================

export function detectRole(jobTitle = '') {
  const t = jobTitle.toLowerCase();
  const roleMap = {
    developer: ['engineer', 'developer', 'software', 'frontend', 'backend', 'fullstack', 'coder'],
    product_manager: ['product', 'pm', 'po', 'product owner'],
    marketing: ['marketing', 'growth', 'seo', 'social media', 'content'],
    data_analyst: ['analyst', 'data', 'bi', 'scientist', 'statistics'],
    sales: ['sales', 'bd', 'account executive', 'business development'],
    hr: ['hr', 'recruiter', 'talent', 'human resources']
  };

  for (const [role, keywords] of Object.entries(roleMap)) {
    if (keywords.some(k => t.includes(k))) return role;
  }
  return 'general';
}

export function detectIntent(text = '') {
  const t = text.toLowerCase();
  const score = { impact: 0, technical: 0, ownership: 0 };

  ['increase', 'reduce', 'improve', '%', '$', 'boost', 'save', 'grow'].forEach(k => t.includes(k) && score.impact++);
  ['build', 'develop', 'engineer', 'create', 'code', 'architect', 'design'].forEach(k => t.includes(k) && score.technical++);
  ['lead', 'manage', 'own', 'mentor', 'spearhead', 'launch', 'coordinate'].forEach(k => t.includes(k) && score.ownership++);

  return Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
}

export function getSmartSuggestions({ jobTitle = '', userText = '', section = 'experience' }) {
  const role = detectRole(jobTitle);
  const intent = detectIntent(userText);
  const roleData = ROLE_SUGGESTIONS[role] || ROLE_SUGGESTIONS.general;

  if (section === 'experience') {
    const pool = [
      ...(roleData.experience[intent] || []),
      ...(roleData.experience.impact || []),
      ...(roleData.experience.technical || [])
    ];
    // Deduplicate pool to avoid repeating suggestions
    const uniquePool = Array.from(new Set(pool));
    return shuffle(uniquePool).slice(0, 5);
  }
  if (section === 'summary') return roleData.summary;
  if (section === 'skills') return roleData.skills;
  return [];
}

/**
 * Advanced Bullet Improver
 * Uses Semantic Action Verbs and Context-Aware Metrics
 */
export function improveBullet(text = '', jobTitle = '') {
  if (!text) return '';
  const role = detectRole(jobTitle);
  let improved = text.toLowerCase();

  const replacements = {
    'worked on': 'Spearheaded',
    'helped with': 'Contributed to',
    'responsible for': 'Architected and executed',
    'did': 'Optimized',
    'made': 'Engineered',
    'used': 'Leveraged'
  };

  Object.entries(replacements).forEach(([k, v]) => {
    improved = improved.replaceAll(k, v);
  });

  // 1. Add Strong Action Verb if missing
  const verbs = ['Led', 'Developed', 'Designed', 'Implemented', 'Engineered', 'Orchestrated', 'Championed'];
  if (!verbs.some(v => improved.toLowerCase().startsWith(v.toLowerCase()))) {
    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
    improved = `${randomVerb} ${improved}`;
  }

  // 2. Add Contextual Tool
  const tools = ROLE_SUGGESTIONS[role]?.skills || [];
  if (tools.length && !tools.some(t => improved.includes(t.toLowerCase()))) {
    improved += ` utilizing ${tools[0]}`;
  }

  // 3. Add Contextual Metric if missing
  if (!/\d+/.test(improved)) {
    const roleMetrics = ROLE_SUGGESTIONS[role]?.metrics || ROLE_SUGGESTIONS.general.metrics;
    const randomMetric = roleMetrics[Math.floor(Math.random() * roleMetrics.length)];
    improved += `, improving ${randomMetric} by ${Math.floor(Math.random() * 20) + 15}%`;
  }

  // Formatting
  improved = improved.trim();
  improved = improved.charAt(0).toUpperCase() + improved.slice(1);
  if (!/[.!?]$/.test(improved)) improved += '.';

  return improved;
}

export function scoreBullet(text = '') {
  let score = 0;
  if (/\d+%|\$\d+/.test(text)) score += 35; // Metrics are king
  if (/^(Led|Architected|Engineered|Spearheaded|Optimized|Designed|Implemented|Orchestrated)/i.test(text)) score += 25;
  if (text.length > 70 && text.length < 200) score += 20; // Ideal length
  if (/using|via|through|utilizing|leveraging/i.test(text)) score += 15;
  if (!/worked on|responsible for|helped/i.test(text)) score += 5;

  return Math.min(score, 100);
}

function shuffle(arr) {
  return [...arr].sort(() => 0.5 - Math.random());
}