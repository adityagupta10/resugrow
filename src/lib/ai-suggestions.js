/**
 * lib/ai-suggestions.js
 * V4 - Semantic Suggestion & Auto-Improvement Engine
 */

// ====================== EXTENSIVE DATA BANK ======================

export const ROLE_SUGGESTIONS = {
  // ── Renamed to SEO long-tail slugs ────────────────────────────────────
  'software-engineer-resume': {
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

  'product-manager-resume': {
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

  'marketing-manager-resume': {
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

  'data-analyst-resume': {
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

  'sales-executive-resume': {
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

  'hr-manager-resume': {
    experience: {
      impact: [
        'Reduced time-to-hire from 52 to 28 days by redesigning the interview process.',
        'Improved employee retention by 19% through structured onboarding and 90-day check-ins.',
        'Sourced and hired 120+ candidates across 14 departments in a single fiscal year.',
        'Decreased cost-per-hire by 31% by building an internal referral programme.',
        'Achieved 94% offer acceptance rate through competitive benchmarking.',
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

  // ── 10 New roles ──────────────────────────────────────────────────────
  'devops-engineer-resume': {
    experience: {
      impact: [
        'Reduced deployment failures by 72% by implementing blue-green deployment strategy.',
        'Cut infrastructure costs by $180K annually through cloud resource optimization.',
        'Improved system reliability from 99.5% to 99.97% uptime across 12 production services.',
        'Accelerated release cycles from bi-weekly to daily by automating CI/CD pipelines.',
      ],
      technical: [
        'Designed and maintained Kubernetes clusters handling 500K+ daily requests on AWS EKS.',
        'Built infrastructure-as-code using Terraform managing 200+ cloud resources.',
        'Implemented centralized logging and monitoring using ELK stack and Prometheus/Grafana.',
        'Automated security scanning in CI pipelines, reducing critical vulnerabilities by 85%.',
      ],
      ownership: [
        'Led migration of 15 microservices from on-premise to AWS, completing 3 weeks ahead of schedule.',
        'Established SRE practices including SLOs, error budgets, and incident runbooks.',
      ],
    },
    summary: [
      'Reliability-focused DevOps Engineer with expertise in cloud infrastructure and CI/CD automation.',
      'Platform Engineer specializing in Kubernetes, Terraform, and zero-downtime deployments.',
      'SRE-minded DevOps professional with a track record of improving uptime and reducing toil.',
    ],
    skills: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'CI/CD', 'GitHub Actions', 'Prometheus', 'Linux'],
    metrics: ['uptime', 'deployment frequency', 'MTTR', 'cost savings', 'pipeline speed'],
  },

  'ux-designer-resume': {
    experience: {
      impact: [
        'Increased user task completion rate by 38% through redesigned onboarding flow.',
        'Reduced support tickets by 42% by improving information architecture and navigation.',
        'Improved mobile conversion rate by 27% through responsive design overhaul.',
        'Achieved 4.8/5 usability score in user testing for redesigned checkout experience.',
      ],
      technical: [
        'Designed end-to-end product experiences for 3 B2B SaaS platforms with 50K+ users.',
        'Built and maintained a design system with 120+ reusable components in Figma.',
        'Conducted 80+ user interviews and usability tests to validate design decisions.',
        'Collaborated with engineering to implement pixel-perfect designs using design tokens.',
      ],
      ownership: [
        'Led UX strategy for a $2M product redesign, delivering on time and within budget.',
        'Established design review process that reduced design-to-dev handoff errors by 60%.',
      ],
    },
    summary: [
      'User-centered UX Designer with expertise in research-driven product design and design systems.',
      'Product Designer specializing in B2B SaaS with a track record of measurable usability improvements.',
      'Creative UX/UI Designer focused on translating complex workflows into intuitive experiences.',
    ],
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Usability Testing', 'Wireframing', 'Adobe XD'],
    metrics: ['task completion rate', 'usability score', 'conversion rate', 'support ticket reduction'],
  },

  'project-manager-resume': {
    experience: {
      impact: [
        'Delivered $4.2M enterprise software project 3 weeks ahead of schedule and 8% under budget.',
        'Improved on-time delivery rate from 67% to 94% by implementing Agile sprint planning.',
        'Reduced project scope creep by 55% through rigorous change management processes.',
        'Managed portfolio of 8 concurrent projects totaling $12M in annual value.',
      ],
      technical: [
        'Led cross-functional teams of 20+ across engineering, design, QA, and business stakeholders.',
        'Implemented JIRA-based project tracking reducing status meeting time by 40%.',
        'Developed risk mitigation frameworks that prevented 3 critical project failures.',
        'Coordinated vendor relationships across 5 external agencies for a global product launch.',
      ],
      ownership: [
        'Established PMO processes adopted company-wide, improving project success rate by 31%.',
        'Mentored 4 junior PMs, 2 of whom were promoted to Senior PM within 18 months.',
      ],
    },
    summary: [
      'PMP-certified Project Manager with expertise in Agile delivery and stakeholder management.',
      'Results-driven PM with a track record of delivering complex, multi-million dollar projects on time.',
      'Strategic Project Leader specializing in cross-functional coordination and risk management.',
    ],
    skills: ['Agile/Scrum', 'JIRA', 'MS Project', 'Risk Management', 'Stakeholder Management', 'PMP', 'Budgeting'],
    metrics: ['on-time delivery', 'budget variance', 'scope creep', 'stakeholder satisfaction'],
  },

  'business-analyst-resume': {
    experience: {
      impact: [
        'Identified $1.2M in process inefficiencies through workflow analysis, enabling targeted automation.',
        'Reduced reporting cycle from 5 days to 4 hours by redesigning data collection processes.',
        'Improved requirements accuracy by 45%, reducing rework costs by $300K annually.',
        'Delivered ROI analysis that secured $2.8M budget approval for digital transformation initiative.',
      ],
      technical: [
        'Elicited and documented 200+ business requirements across 6 enterprise system implementations.',
        'Built SQL-based reporting dashboards used by 50+ stakeholders for weekly decision-making.',
        'Facilitated 40+ workshops with C-suite and operational teams to align on process improvements.',
        'Developed business cases and cost-benefit analyses for 12 strategic initiatives.',
      ],
      ownership: [
        'Led requirements gathering for a $5M ERP implementation across 3 business units.',
        'Established BA practice standards adopted across a team of 8 analysts.',
      ],
    },
    summary: [
      'Detail-oriented Business Analyst with expertise in process improvement and requirements engineering.',
      'Strategic BA specializing in bridging business needs and technical solutions for enterprise systems.',
      'Data-driven Business Analyst with a track record of delivering measurable operational improvements.',
    ],
    skills: ['SQL', 'JIRA', 'Visio', 'Requirements Gathering', 'Process Mapping', 'Excel', 'Stakeholder Management'],
    metrics: ['cost savings', 'process efficiency', 'requirements accuracy', 'ROI'],
  },

  'finance-analyst-resume': {
    experience: {
      impact: [
        'Identified $3.4M in cost reduction opportunities through variance analysis and benchmarking.',
        'Improved forecast accuracy from 78% to 94% by rebuilding financial models.',
        'Reduced month-end close cycle from 8 days to 4 days through process automation.',
        'Supported $50M Series C fundraise by preparing investor-grade financial models and projections.',
      ],
      technical: [
        'Built dynamic 3-statement financial models for 5 business units with $200M+ combined revenue.',
        'Automated 12 recurring reports using Python and Excel macros, saving 20 hours/week.',
        'Prepared board-level financial presentations for quarterly business reviews.',
        'Conducted DCF and comparable company analysis for 3 M&A due diligence processes.',
      ],
      ownership: [
        'Owned annual budgeting process for a $40M cost center across 6 departments.',
        'Led implementation of Anaplan FP&A platform, reducing planning cycle by 35%.',
      ],
    },
    summary: [
      'CFA-level Finance Analyst with expertise in financial modeling, FP&A, and strategic analysis.',
      'Results-driven Financial Analyst specializing in forecasting, budgeting, and M&A support.',
      'Analytical Finance professional with a track record of improving forecast accuracy and reducing costs.',
    ],
    skills: ['Excel', 'Python', 'SQL', 'Financial Modeling', 'FP&A', 'Tableau', 'Bloomberg', 'Anaplan'],
    metrics: ['forecast accuracy', 'cost savings', 'close cycle time', 'ROI', 'variance'],
  },

  'operations-manager-resume': {
    experience: {
      impact: [
        'Reduced operational costs by $2.1M annually through vendor consolidation and process redesign.',
        'Improved order fulfillment speed by 40% by redesigning warehouse layout and workflows.',
        'Increased team productivity by 32% through implementation of OKR framework and weekly reviews.',
        'Achieved 99.2% SLA compliance across 3 service lines serving 10,000+ customers.',
      ],
      technical: [
        'Managed daily operations for a 150-person team across 3 locations.',
        'Implemented ERP system migration affecting 8 departments with zero operational downtime.',
        'Designed KPI dashboards tracking 25+ operational metrics for executive reporting.',
        'Led process improvement initiatives using Lean Six Sigma methodology.',
      ],
      ownership: [
        'Built operations function from scratch for a Series B startup, scaling from 20 to 80 employees.',
        'Established vendor management programme reducing supplier costs by 18%.',
      ],
    },
    summary: [
      'Execution-focused Operations Manager with expertise in process optimization and team leadership.',
      'Strategic Operations Leader with a track record of scaling teams and reducing operational costs.',
      'Lean Six Sigma-certified Operations professional specializing in efficiency and cross-functional alignment.',
    ],
    skills: ['Lean Six Sigma', 'ERP', 'Process Improvement', 'KPI Management', 'Vendor Management', 'OKR', 'Supply Chain'],
    metrics: ['cost reduction', 'SLA compliance', 'productivity', 'fulfillment speed', 'headcount'],
  },

  'graphic-designer-resume': {
    experience: {
      impact: [
        'Increased brand recognition by 34% through cohesive visual identity redesign.',
        'Reduced design production time by 50% by building a reusable component library.',
        'Improved email click-through rates by 28% through redesigned campaign templates.',
        'Delivered 200+ design assets per quarter across digital, print, and social channels.',
      ],
      technical: [
        'Designed complete brand identity systems for 8 clients including logo, typography, and color systems.',
        'Created motion graphics and video assets achieving 2M+ views across social platforms.',
        'Produced print-ready materials for campaigns with budgets up to $500K.',
        'Collaborated with marketing and product teams to maintain brand consistency across 15+ touchpoints.',
      ],
      ownership: [
        'Led visual direction for a product rebrand that contributed to 22% increase in trial signups.',
        'Managed a team of 3 junior designers, establishing quality review processes.',
      ],
    },
    summary: [
      'Creative Graphic Designer with expertise in brand identity, digital design, and visual storytelling.',
      'Versatile Designer specializing in B2B brand systems, marketing collateral, and UI design.',
      'Results-driven Graphic Designer with a track record of creating visuals that drive measurable business outcomes.',
    ],
    skills: ['Adobe Illustrator', 'Photoshop', 'Figma', 'InDesign', 'After Effects', 'Brand Identity', 'Typography'],
    metrics: ['brand recognition', 'CTR', 'production speed', 'asset volume'],
  },

  'customer-success-manager-resume': {
    experience: {
      impact: [
        'Reduced customer churn by 24% through proactive health scoring and intervention playbooks.',
        'Grew net revenue retention from 108% to 127% by identifying expansion opportunities.',
        'Achieved 96% CSAT score across a portfolio of 45 enterprise accounts worth $8M ARR.',
        'Onboarded 30+ enterprise customers with average time-to-value of 14 days.',
      ],
      technical: [
        'Managed a portfolio of 45 enterprise accounts with $8M combined ARR.',
        'Built customer health scoring model in Gainsight tracking 12 engagement signals.',
        'Conducted quarterly business reviews with C-suite stakeholders at 20+ accounts.',
        'Collaborated with product team to translate customer feedback into 8 shipped features.',
      ],
      ownership: [
        'Built CS onboarding playbook adopted across a team of 12 CSMs.',
        'Led renewal negotiations for $3.2M in ARR with 94% renewal rate.',
      ],
    },
    summary: [
      'Customer-obsessed CSM with expertise in enterprise account management and churn reduction.',
      'Strategic Customer Success Manager specializing in NRR growth and executive relationship management.',
      'Results-driven CSM with a track record of turning at-risk accounts into long-term advocates.',
    ],
    skills: ['Gainsight', 'Salesforce', 'Customer Health Scoring', 'QBR', 'Churn Analysis', 'Onboarding', 'NPS'],
    metrics: ['churn rate', 'NRR', 'CSAT', 'time-to-value', 'renewal rate'],
  },

  'data-scientist-resume': {
    experience: {
      impact: [
        'Built recommendation engine that increased average order value by 22% and drove $4.1M incremental revenue.',
        'Reduced fraud losses by $1.8M annually through ML-based transaction scoring model.',
        'Improved demand forecasting accuracy from 71% to 93%, reducing inventory waste by 30%.',
        'Deployed NLP model that automated 65% of customer support ticket classification.',
      ],
      technical: [
        'Developed and deployed 8 production ML models using Python, scikit-learn, and TensorFlow.',
        'Built real-time feature engineering pipelines processing 500K+ events per day using Spark.',
        'Designed A/B testing framework that ran 40+ experiments with statistical rigor.',
        'Created executive-facing dashboards in Tableau tracking model performance and business impact.',
      ],
      ownership: [
        'Led data science workstream for a $3M digital transformation initiative.',
        'Mentored 3 junior data scientists, establishing model review and deployment standards.',
      ],
    },
    summary: [
      'Applied Data Scientist with expertise in ML model development, NLP, and production deployment.',
      'Business-focused Data Scientist specializing in predictive modeling and revenue optimization.',
      'Full-stack Data Scientist with a track record of shipping models that deliver measurable ROI.',
    ],
    skills: ['Python', 'TensorFlow', 'scikit-learn', 'SQL', 'Spark', 'Tableau', 'A/B Testing', 'NLP'],
    metrics: ['model accuracy', 'revenue impact', 'fraud reduction', 'forecast accuracy'],
  },

  'content-writer-resume': {
    experience: {
      impact: [
        'Grew organic blog traffic from 12K to 180K monthly visitors in 14 months through SEO-led content strategy.',
        'Increased email newsletter open rates from 18% to 34% through subject line and content optimization.',
        'Generated 2,400+ qualified leads per quarter through gated content and thought leadership articles.',
        'Reduced content production cost by 40% by building a freelancer network and editorial calendar system.',
      ],
      technical: [
        'Produced 80+ long-form articles, whitepapers, and case studies per year for B2B SaaS clients.',
        'Managed editorial calendar across 4 content channels with 12+ weekly publishing slots.',
        'Optimized 200+ existing articles for SEO, improving average ranking position by 18 spots.',
        'Collaborated with design and video teams to produce multi-format content campaigns.',
      ],
      ownership: [
        'Built content strategy from scratch for a Series A startup, establishing brand voice and editorial standards.',
        'Led a team of 5 freelance writers, maintaining consistent quality and on-time delivery.',
      ],
    },
    summary: [
      'SEO-focused Content Writer with expertise in long-form B2B content, thought leadership, and organic growth.',
      'Strategic Content Strategist specializing in driving measurable traffic and lead generation through content.',
      'Versatile Content Writer with a track record of building audiences and generating pipeline through storytelling.',
    ],
    skills: ['SEO Writing', 'Content Strategy', 'WordPress', 'HubSpot', 'Ahrefs', 'Copywriting', 'Email Marketing'],
    metrics: ['organic traffic', 'open rate', 'leads generated', 'ranking position'],
  },

  'cybersecurity-analyst-resume': {
    experience: {
      impact: [
        'Reduced security incidents by 68% by implementing zero-trust network architecture.',
        'Identified and remediated 340+ critical vulnerabilities across 50+ systems in annual audit.',
        'Decreased mean time to detect (MTTD) from 72 hours to 4 hours through SIEM optimization.',
        'Prevented estimated $4.2M in potential breach costs through proactive threat hunting.',
      ],
      technical: [
        'Managed SOC operations monitoring 10,000+ endpoints across 3 global offices.',
        'Implemented SIEM solution (Splunk) processing 2TB+ of log data daily.',
        'Conducted penetration testing across web applications, APIs, and internal networks.',
        'Developed incident response playbooks covering 15 threat scenarios.',
      ],
      ownership: [
        'Led ISO 27001 certification project, achieving compliance 2 months ahead of schedule.',
        'Built security awareness training programme with 98% employee completion rate.',
      ],
    },
    summary: [
      'CISSP-certified Cybersecurity Analyst with expertise in threat detection, incident response, and SOC operations.',
      'Proactive Security Engineer specializing in zero-trust architecture and vulnerability management.',
      'Results-driven Cybersecurity professional with a track record of reducing risk and improving detection speed.',
    ],
    skills: ['Splunk', 'SIEM', 'Penetration Testing', 'ISO 27001', 'Zero Trust', 'Incident Response', 'CISSP'],
    metrics: ['MTTD', 'MTTR', 'vulnerabilities remediated', 'incident reduction'],
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
};

// --- Mass SEO Generation Injector ---
const extraRoles = [
  'accountant', 'administrative-assistant', 'architect', 'art-director', 'bank-teller', 
  'bartender', 'bookkeeper', 'brand-manager', 'business-development', 'call-center-representative',
  'cashier', 'certified-nursing-assistant', 'chef', 'civil-engineer', 'communications-specialist',
  'community-manager', 'construction-manager', 'copywriter', 'customer-service', 'data-entry',
  'database-administrator', 'dental-assistant', 'digital-marketing', 'electrical-engineer',
  'elementary-teacher', 'event-planner', 'executive-assistant', 'financial-advisor',
  'flight-attendant', 'front-desk-receptionist', 'general-manager', 'graphic-web-designer',
  'health-administrator', 'help-desk-technician', 'hospitality-manager', 'human-resources-assistant',
  'industrial-designer', 'inside-sales', 'instructional-designer', 'interior-designer',
  'investment-banker', 'it-manager', 'java-developer', 'journalist', 'legal-assistant',
  'logistics-manager', 'machine-learning-engineer', 'managing-director', 'marketing-coordinator',
  'mechanical-engineer', 'medical-assistant', 'network-engineer', 'nurse-practitioner',
  'occupational-therapist', 'office-manager', 'paralegal', 'pharmacist', 'physical-therapist',
  'physician-assistant', 'police-officer', 'pr-manager', 'preschool-teacher', 'production-manager',
  'property-manager', 'public-relations', 'purchasing-manager', 'quality-assurance', 'real-estate-agent',
  'registered-nurse', 'restaurant-manager', 'retail-manager', 'sales-associate', 'sales-manager',
  'scrum-master', 'security-guard', 'social-media-manager', 'social-worker', 'software-tester',
  'solutions-architect', 'special-education-teacher', 'store-manager', 'supply-chain-manager',
  'systems-administrator', 'teacher-assistant', 'technical-support', 'technical-writer',
  'truck-driver', 'ui-developer', 'virtual-assistant', 'warehouse-manager', 'web-developer'
];

extraRoles.forEach(role => {
  const roleName = role.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  ROLE_SUGGESTIONS[`${role}-resume`] = {
    experience: {
      impact: [`Demonstrated excellence as a ${roleName}, consistently exceeding performance targets.`, `Streamlined operations reducing manual workload by 15% across the cross-functional team.`],
      technical: [`Leveraged industry-standard tools to optimize daily workflows and output.`],
      ownership: [`Spearheaded initiatives to improve overall service quality and delivery.`]
    },
    summary: [`Results-driven ${roleName} with a proven track record of delivering high-quality outcomes.`, `Dedicated ${roleName} focused on growth, efficiency, and cross-functional success.`],
    skills: [roleName, 'Communication', 'Project Management', 'Problem Solving', 'Leadership'],
    metrics: ['efficiency', 'productivity', 'growth']
  };
});


// ====================== ENGINE LOGIC ======================

export function detectRole(jobTitle = '') {
  const t = jobTitle.toLowerCase();
  const roleMap = {
    'software-engineer-resume': ['engineer', 'developer', 'software', 'frontend', 'backend', 'fullstack', 'coder'],
    'product-manager-resume': ['product', 'pm', 'po', 'product owner'],
    'marketing-manager-resume': ['marketing', 'growth', 'seo', 'social media', 'content'],
    'data-analyst-resume': ['analyst', 'data', 'bi', 'scientist', 'statistics'],
    'sales-executive-resume': ['sales', 'bd', 'account executive', 'business development'],
    'hr-manager-resume': ['hr', 'recruiter', 'talent', 'human resources'],
    'devops-engineer-resume': ['devops', 'sre', 'platform', 'infrastructure', 'cloud'],
    'data-scientist-resume': ['data scientist', 'machine learning', 'ml engineer', 'ai engineer'],
    'finance-analyst-resume': ['finance', 'financial', 'fp&a', 'accounting'],
    'operations-manager-resume': ['operations', 'ops manager', 'supply chain'],
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