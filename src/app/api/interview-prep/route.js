import { NextResponse } from 'next/server';

// ── Role detection ─────────────────────────────────────────────────────────
const ROLE_KEYWORDS = {
  software_engineer: ['software engineer','sde','swe','developer','programmer','engineer'],
  frontend_developer: ['frontend','front-end','react developer','angular developer','vue developer','ui developer'],
  backend_developer: ['backend','back-end','node developer','java developer','python developer','api developer'],
  fullstack_developer: ['fullstack','full stack','full-stack'],
  mobile_developer: ['mobile developer','ios developer','android developer','flutter','react native','swift','kotlin'],
  cloud_architect: ['cloud architect','solutions architect','aws architect','azure architect'],
  cybersecurity_engineer: ['security engineer','cybersecurity','infosec','penetration tester','soc analyst'],
  qa_engineer: ['qa engineer','sdet','quality assurance','test engineer','automation tester'],
  data_scientist: ['data scientist','machine learning','ml engineer','ai engineer','deep learning'],
  data_analyst: ['data analyst','business intelligence','bi analyst','analytics'],
  product_manager: ['product manager','product owner','pm ','p.m.'],
  ui_ux_designer: ['ux designer','ui designer','product designer','interaction designer'],
  devops_engineer: ['devops','sre','platform engineer','cloud engineer','infrastructure engineer'],
  marketing_manager: ['marketing manager','growth manager','digital marketing','seo manager','content manager'],
  business_analyst: ['business analyst','ba ','systems analyst'],
  hr_manager: ['hr manager','human resources','talent acquisition','recruiter'],
  sales_manager: ['sales manager','account executive','business development','account manager'],
  finance_analyst: ['finance analyst','financial analyst','fp&a','investment analyst'],
  executive: ['ceo','cto','cmo','cfo','coo','vp ','vice president','chief','head of'],
};


const SENIORITY_KEYWORDS = {
  junior: ['junior','jr.','entry level','fresher','graduate','associate','intern'],
  senior: ['senior','sr.','lead','principal','staff','architect'],
  manager: ['manager','head of','director','vp ','vice president','chief'],
};

function detectRole(jd) {
  const lower = jd.toLowerCase();
  let bestRole = 'software_engineer';
  let bestScore = 0;
  for (const [role, keywords] of Object.entries(ROLE_KEYWORDS)) {
    const score = keywords.filter(k => lower.includes(k)).length;
    if (score > bestScore) { bestScore = score; bestRole = role; }
  }
  let seniority = 'mid';
  for (const [level, keywords] of Object.entries(SENIORITY_KEYWORDS)) {
    if (keywords.some(k => lower.includes(k))) { seniority = level; break; }
  }
  return { role: bestRole, seniority };
}

// ── Skills extraction ──────────────────────────────────────────────────────
const SKILL_LIST = [
  'React','Angular','Vue','Next.js','Node.js','Express','Python','Java','Go','Rust','TypeScript','JavaScript',
  'AWS','GCP','Azure','Docker','Kubernetes','Terraform','CI/CD','GitHub Actions','Jenkins',
  'PostgreSQL','MySQL','MongoDB','Redis','Elasticsearch','Kafka','RabbitMQ',
  'GraphQL','REST','gRPC','Microservices','System Design',
  'Machine Learning','TensorFlow','PyTorch','Pandas','NumPy','Spark','Hadoop',
  'Figma','Adobe XD','Sketch','InVision',
  'SQL','Power BI','Tableau','Excel','Looker',
  'Agile','Scrum','JIRA','Confluence','Product Roadmap','OKRs',
  'SEO','Google Ads','Meta Ads','HubSpot','Salesforce','CRM',
  'Communication','Leadership','Collaboration','Problem Solving','Critical Thinking',
];

function extractSkills(jd) {
  return SKILL_LIST.filter(s => new RegExp(`\\b${s.replace('.','\\.')}\\b`, 'i').test(jd)).slice(0, 12);
}

// ── Question banks ─────────────────────────────────────────────────────────
const BEHAVIORAL_TEMPLATES = [
  {
    q: 'Tell me about a time when you had to deliver a project under a very tight deadline. What was your approach?',
    kp: ['How you prioritized tasks','How you communicated with stakeholders','What trade-offs you made','Outcome/delivery'],
    time: '2–3 min',
    followUp: ['What would you do differently?','How did the team respond to the pressure?'],
  },
  {
    q: 'Describe a situation where you disagreed with a decision made by your manager or team. How did you handle it?',
    kp: ['How you raised the concern professionally','Evidence or data you used','How you reached consensus','Outcome'],
    time: '2–3 min',
    followUp: ['Did the outcome validate your concern?','How did it affect your relationship?'],
  },
  {
    q: 'Give me an example of when you identified a problem before it became critical. What did you do?',
    kp: ['How you detected the early signal','Analysis you performed','Action steps you took','Impact averted'],
    time: '2–3 min',
    followUp: ['How did you establish that monitoring?','Did your team adopt the approach?'],
  },
  {
    q: 'Tell me about a time you failed to meet an expectation. What happened and what did you learn?',
    kp: ['Honest account of the failure','Root cause analysis','Immediate actions taken','Lasting lesson applied'],
    time: '2–3 min',
    followUp: ['How did you rebuild trust?','Have you applied that lesson since?'],
  },
  {
    q: 'Describe a time when you had to influence people without having direct authority over them.',
    kp: ['Context and stakeholder map','Influence strategy used','How you built buy-in','Result achieved'],
    time: '2–3 min',
    followUp: ['What would you do if they still refused?','How do you maintain those relationships?'],
  },
  {
    q: 'Tell me about a time you had to learn a new skill quickly to complete a task or project.',
    kp: ['How you identified the skill gap','Learning strategy you used','How fast you became productive','Impact on the project'],
    time: '2 min',
    followUp: ['Do you still use that skill?','What resources worked best?'],
  },
  {
    q: 'Describe a situation where you had to manage conflicting priorities from multiple stakeholders. How did you navigate it?',
    kp: ['How you mapped priorities','Communication approach with each stakeholder','Framework you used to decide','Outcome'],
    time: '2–3 min',
    followUp: ['What did you use to track priorities?','How did stakeholders react?'],
  },
  {
    q: 'Tell me about a time you took a calculated risk and it backfired. How did you recover?',
    kp: ['Risk assessment process','Point of failure','Immediate recovery steps','Long-term adjustment'],
    time: '3 min',
    followUp: ['Would you take the same risk again?','How did leadership react?'],
  },
  {
    q: 'Describe a time you navigated an ambiguous project with no clear requirements or endpoint.',
    kp: ['How you defined scope boundaries','Iterative discovery approach','Check-ins with stakeholders','Project resolution'],
    time: '2–3 min',
    followUp: ['How do you handle the stress of ambiguity?','Were the stakeholders satisfied with the defined scope?'],
  },
  {
    q: 'Tell me about a time you had to adapt your communication style to work effectively with someone.',
    kp: ['Why your original style failed','How you analyzed their preference','Specific adjustments made','Result of the change'],
    time: '2 min',
    followUp: ['Have you incorporated that style permanently?','How do you handle a team with diverse styles?'],
  },
  {
    q: 'Walk me through a time you had to give difficult or critical feedback to a peer.',
    kp: ['Preparation for the conversation','Empathy and framing used','Their immediate reaction','Long-term behavioral change'],
    time: '2–3 min',
    followUp: ['Did it damage the working relationship?','What feedback did they give you?'],
  },
  {
    q: 'Give an example of a time you stepped outside your official role to help the team succeed.',
    kp: ['Gap identified','Why you specifically stepped in','How you managed your actual duties','Result for the team'],
    time: '2 min',
    followUp: ['Did this become a permanent part of your role?','How did your manager react?'],
  },
];

const TECHNICAL_TEMPLATES = {
  software_engineer: [
    {
      q: 'Walk me through how you would design a URL shortener service to handle 100 million requests per day.',
      kp: ['Database schema choice','Hashing/encoding approach','Cache layer design','Scaling bottlenecks'],
      diff: 'hard',
      time: '3–4 min',
    },
    {
      q: 'How do you approach debugging a production issue that causes intermittent 500 errors? Walk me through your process.',
      kp: ['Log analysis strategy','Reproducing locally','Isolating the root cause','Post-mortem/prevention'],
      diff: 'medium',
      time: '2–3 min',
    },
    {
      q: 'Explain the difference between horizontal and vertical scaling. When would you choose each, and what are the tradeoffs?',
      kp: ['Cost implications','Stateless vs stateful services','Database scaling implications','Real example from your experience'],
      diff: 'medium',
      time: '2–3 min',
    },
    {
      q: 'How do you ensure code quality in a fast-moving team? What processes or tools have you introduced or relied on?',
      kp: ['Code review culture','Automated testing strategy','CI/CD setup','Tech debt management'],
      diff: 'medium',
      time: '2–3 min',
    },
    {
      q: 'Describe your approach to designing a RESTful API. What conventions and patterns do you follow?',
      kp: ['Versioning strategy','Error handling','Auth approach','Documentation'],
      diff: 'medium',
      time: '2 min',
    },
  ],
  frontend_developer: [
    {
      q: 'How do you approach performance optimization for a React application that\'s loading slowly?',
      kp: ['Profiling tools used','Code splitting strategy','Bundle size audit','Lazy loading patterns'],
      diff: 'medium',
      time: '2–3 min',
    },
    {
      q: 'Explain how you ensure your frontend code is accessible (a11y). What tools and standards do you use?',
      kp: ['WCAG guidelines familiarity','Screen reader testing','Semantic HTML practices','Automated testing tools'],
      diff: 'medium',
      time: '2 min',
    },
    {
      q: 'How would you architect a large-scale React application for a team of 15+ engineers?',
      kp: ['Folder/module structure','State management choice','Component library approach','Testing strategy'],
      diff: 'hard',
      time: '3–4 min',
    },
    {
      q: 'Describe how you approach responsive design and cross-browser compatibility.',
      kp: ['CSS methodology (BEM, modules, styled-components)','Browser testing matrix','Device testing approach','Progressive enhancement'],
      diff: 'medium',
      time: '2 min',
    },
  ],
  backend_developer: [
    {
      q: 'How would you design a rate-limiting system for a public API serving 10 million requests per day?',
      kp: ['Algorithm choices (token bucket, sliding window)','Storage layer (Redis)','Per-user vs global limits','Response headers and error codes'],
      diff: 'hard',
      time: '3–4 min',
    },
    {
      q: 'Walk me through how you handle database migrations in a production system with zero downtime.',
      kp: ['Backward-compatible migration patterns','Feature flags approach','Rollback strategy','Monitoring during migration'],
      diff: 'hard',
      time: '3 min',
    },
    {
      q: 'Explain your approach to API authentication and authorization. How do you decide between JWT and session tokens?',
      kp: ['Stateless vs stateful tradeoffs','Token expiry and refresh strategy','RBAC implementation','Security considerations'],
      diff: 'medium',
      time: '2–3 min',
    },
    {
      q: 'How do you approach optimizing slow database queries in production?',
      kp: ['Query analysis tools','Indexing strategy','N+1 problem identification','Caching layer decisions'],
      diff: 'medium',
      time: '2–3 min',
    },
  ],
  fullstack_developer: [
    {
      q: 'Describe how you would structure a full-stack application from scratch — tech choices, architecture, and folder structure.',
      kp: ['Frontend/backend separation strategy','API contract design','State management approach','Deployment considerations'],
      diff: 'hard',
      time: '3–4 min',
    },
    {
      q: 'How do you manage environment configuration and secrets across development, staging, and production?',
      kp: ['Environment variable strategy','Secrets management tool','CI/CD integration','Avoiding .env leaks'],
      diff: 'medium',
      time: '2 min',
    },
    {
      q: 'How do you decide when to do work on the server vs the client in a Next.js or similar full-stack framework?',
      kp: ['SEO and performance considerations','Data fetching strategy','Auth implications','Caching at each layer'],
      diff: 'medium',
      time: '2–3 min',
    },
    {
      q: 'Describe your testing strategy for a full-stack application. What layers do you test and with what tools?',
      kp: ['Unit vs integration vs e2e pyramid','API testing approach','Frontend component tests','CI pipeline integration'],
      diff: 'medium',
      time: '2–3 min',
    },
  ],
  data_scientist: [
    {
      q: 'How would you approach building a churn prediction model for a subscription product from scratch?',
      kp: ['Feature engineering approach','Model selection rationale','Evaluation metrics beyond accuracy','Deployment considerations'],
      diff: 'hard',
      time: '3–4 min',
    },
    {
      q: 'A stakeholder says "our model accuracy is 95%". Why might that be misleading and what would you check?',
      kp: ['Class imbalance issue','Precision/recall tradeoffs','Business cost of false positives vs negatives','Baseline comparisons'],
      diff: 'medium',
      time: '2–3 min',
    },
    {
      q: 'How do you validate that a machine learning model is ready for production deployment?',
      kp: ['Offline vs online evaluation','A/B testing setup','Data drift monitoring','Fallback strategy'],
      diff: 'hard',
      time: '3 min',
    },
    {
      q: 'Explain the difference between bagging and boosting with examples of when to use each.',
      kp: ['Variance vs bias focus','Random Forest vs XGBoost','When one outperforms the other','Practical implications'],
      diff: 'medium',
      time: '2 min',
    },
    {
      q: 'Describe a time you had to explain a complex model result to a non-technical stakeholder. How did you approach it?',
      kp: ['Visualization choices','Analogy used','Business framing','How you handled pushback'],
      diff: 'easy',
      time: '2 min',
    },
  ],
  data_analyst: [
    {
      q: 'Walk me through how you would investigate a 30% drop in weekly active users that started 10 days ago.',
      kp: ['Data integrity check first','Segmentation approach (geo, device, cohort)','Hypothesis generation','Stakeholder communication'],
      diff: 'hard',
      time: '3 min',
    },
    {
      q: 'How do you approach building a dashboard that stakeholders will actually use?',
      kp: ['Requirements gathering with stakeholders','Metric selection and definition','Refresh frequency and data freshness','Iteration and feedback loop'],
      diff: 'medium',
      time: '2–3 min',
    },
    {
      q: 'Explain how you would set up an A/B test for a new checkout flow. What would you measure and for how long?',
      kp: ['Sample size calculation','Primary and guardrail metrics','Segmentation considerations','Statistical significance threshold'],
      diff: 'medium',
      time: '2–3 min',
    },
    {
      q: 'How do you ensure data quality in a reporting pipeline that multiple teams depend on?',
      kp: ['Data validation checks','Alerting on anomalies','Documentation practices','SLA communication'],
      diff: 'medium',
      time: '2 min',
    },
  ],
  product_manager: [
    {
      q: 'How would you prioritize features on a product roadmap when you have requests from sales, engineering, and customers all competing?',
      kp: ['Framework used (RICE, ICE, etc.)','Stakeholder alignment approach','How you say no','Documentation process'],
      diff: 'hard',
      time: '3–4 min',
    },
    {
      q: 'Walk me through how you would define success metrics for a new onboarding flow.',
      kp: ['Leading vs lagging indicators','How metrics connect to revenue','Baseline setting','Iteration loop'],
      diff: 'medium',
      time: '2–3 min',
    },
    {
      q: 'Describe how you\'ve used customer research to make a product decision. What methods did you use?',
      kp: ['Research method selection','Sample size/recruitment','How you synthesized insights','Decision made and outcome'],
      diff: 'medium',
      time: '2–3 min',
    },
    {
      q: 'How do you work with engineering to scope a feature without under-scoping or over-engineering?',
      kp: ['Discovery/framing process','How you write requirements','How you handle scope creep','Retrospective process'],
      diff: 'medium',
      time: '2 min',
    },
    {
      q: 'A key metric drops 20% overnight. Walk me through your investigation process.',
      kp: ['First checks (data integrity, anomaly)','Segmentation approach','Hypothesis generation','Communication to stakeholders'],
      diff: 'hard',
      time: '3 min',
    },
  ],
  devops_engineer: [
    {
      q: 'Describe how you would set up a CI/CD pipeline for a microservices application from scratch.',
      kp: ['Tool choices and why','Testing gates at each stage','Deployment strategy (blue/green, canary)','Rollback plan'],
      diff: 'hard',
      time: '3–4 min',
    },
    {
      q: 'A production deployment fails and 20% of users are seeing errors. Walk me through your incident response.',
      kp: ['Detection and alerting','Immediate mitigation steps','Communication protocol','Root cause analysis'],
      diff: 'hard',
      time: '3 min',
    },
    {
      q: 'How do you approach infrastructure-as-code? What tools have you used and what are the tradeoffs?',
      kp: ['Terraform vs Pulumi vs CDK','State management','Team collaboration on IaC','Drift detection'],
      diff: 'medium',
      time: '2–3 min',
    },
    {
      q: 'What is your approach to container security in a Kubernetes environment?',
      kp: ['Image scanning strategy','RBAC configuration','Network policy','Secrets management'],
      diff: 'hard',
      time: '3 min',
    },
  ],
  marketing_manager: [
    {
      q: 'Walk me through a multi-channel campaign you\'ve run. How did you structure it and measure success?',
      kp: ['Channel mix rationale','Budget allocation','KPIs for each channel','Attribution model'],
      diff: 'medium',
      time: '2–3 min',
    },
    {
      q: 'How do you approach content strategy for SEO? Give me an example of a successful content project.',
      kp: ['Keyword research process','Content brief creation','Distribution and promotion','Measurement and iteration'],
      diff: 'medium',
      time: '2–3 min',
    },
    {
      q: 'Describe how you\'ve used data to change or improve a marketing strategy mid-campaign.',
      kp: ['Data sources you monitored','Insight that triggered the change','Action taken','Result'],
      diff: 'medium',
      time: '2 min',
    },
  ],
  ui_ux_designer: [
    {
      q: 'Walk me through your end-to-end design process for a new feature, from brief to handoff.',
      kp: ['Discovery and research phase','Ideation and wireframing','Prototype fidelity decisions','Developer handoff approach'],
      diff: 'medium',
      time: '3 min',
    },
    {
      q: 'Describe a time you had to advocate for the user when business or engineering priorities conflicted with good UX.',
      kp: ['How you framed the user impact','Evidence you used (data, testing)','Compromise reached','Outcome for users'],
      diff: 'medium',
      time: '2–3 min',
    },
    {
      q: 'How do you approach usability testing on a tight timeline? What methods do you use and what do you cut?',
      kp: ['Research method prioritization','Participant recruitment approach','What you\'re willing to skip','How you synthesize quickly'],
      diff: 'medium',
      time: '2 min',
    },
  ],
  business_analyst: [
    {
      q: 'How do you elicit requirements from stakeholders who aren\'t sure what they want?',
      kp: ['Techniques used (workshops, user stories, prototypes)','How you handle conflicting requirements','Documentation approach','Sign-off process'],
      diff: 'medium',
      time: '2–3 min',
    },
    {
      q: 'Describe a time when your analysis changed the direction of a project or product decision.',
      kp: ['Data or insights that drove the change','How you presented the finding','Stakeholder reaction','Outcome'],
      diff: 'medium',
      time: '2–3 min',
    },
  ],
  hr_manager: [
    {
      q: 'How have you built or improved a recruiting pipeline to attract better candidates faster?',
      kp: ['Sourcing strategy changes','Employer brand initiatives','Screening process improvements','Time-to-hire reduction'],
      diff: 'medium',
      time: '2–3 min',
    },
    {
      q: 'Describe how you\'ve handled a situation where an employee\'s performance was consistently below expectations.',
      kp: ['Documentation and process followed','Support offered before escalation','Conversation approach','Resolution and learning'],
      diff: 'medium',
      time: '2–3 min',
    },
  ],
  sales_manager: [
    {
      q: 'Walk me through how you\'ve built or ramp a sales team from scratch or a low-performance baseline.',
      kp: ['Hiring profile you defined','Ramp program structure','Metrics you set early','Culture you built'],
      diff: 'hard',
      time: '3 min',
    },
    {
      q: 'Describe your approach to forecasting. How do you make your pipeline numbers accurate?',
      kp: ['CRM hygiene practices','Qualification framework (MEDDIC, BANT)','Deal review cadence','Sanity-checking methods'],
      diff: 'medium',
      time: '2–3 min',
    },
  ],
  finance_analyst: [
    {
      q: 'Walk me through how you would build a 3-statement financial model for a new business unit.',
      kp: ['Income statement drivers','Working capital assumptions','Cash flow reconciliation','Sensitivity analysis'],
      diff: 'hard',
      time: '3–4 min',
    },
    {
      q: 'How do you present financial analysis to senior leaders who aren\'t deeply finance-literate?',
      kp: ['Chart and visualization choices','Leading with the "so what"','Handling questions you can\'t answer immediately','Follow-up process'],
      diff: 'medium',
      time: '2 min',
    },
  ],
  mobile_developer: [
    {
      q: 'How do you manage memory and prevent leaks in a large mobile application?',
      kp: ['Profiling tools','ARC/Garbage collection','Retain cycles','Image caching strategy'],
      diff: 'hard',
      time: '3 min',
    },
    {
      q: 'Describe your approach to handling offline capabilities and data syncing in a mobile app.',
      kp: ['Local database choices','Conflict resolution','Background fetch','UX during offline mode'],
      diff: 'medium',
      time: '2–3 min',
    },
  ],
  cloud_architect: [
    {
      q: 'Walk me through how you would design a multi-region active-active architecture for high availability.',
      kp: ['Data replication strategy','Global traffic routing (Route53 etc)','Failover automation','Latency considerations'],
      diff: 'hard',
      time: '3–4 min',
    },
    {
      q: 'How do you balance cost optimization with performance when designing cloud infrastructure?',
      kp: ['Spot instances vs reserved','Right-sizing resources','Auto-scaling policies','FinOps tracking'],
      diff: 'medium',
      time: '2–3 min',
    },
  ],
  cybersecurity_engineer: [
    {
      q: 'How would you respond to an alert indicating a suspected data breach on a mission-critical database?',
      kp: ['Containment strategy','Log analysis','Chain of custody','Stakeholder communication'],
      diff: 'hard',
      time: '3 min',
    },
    {
      q: 'Explain how you approach implementing a zero-trust architecture in an existing corporate network.',
      kp: ['Identity verification','Micro-segmentation','Least privilege enforcement','Device health checks'],
      diff: 'hard',
      time: '3–4 min',
    },
  ],
  qa_engineer: [
    {
      q: 'How do you design a test automation framework from scratch for a complex web application?',
      kp: ['Tool selection rationale','Page Object Model or similar','CI/CD integration','Handling flaky tests'],
      diff: 'hard',
      time: '3 min',
    },
    {
      q: 'Describe your approach to testing an API comprehensively before the frontend is even built.',
      kp: ['Boundary testing','Contract testing','Mocking/Stubbing','Performance/Load testing'],
      diff: 'medium',
      time: '2–3 min',
    },
  ],
  executive: [
    {
      q: 'How do you align cross-functional departments (Engineering, Sales, Product) during a major strategic pivot?',
      kp: ['Communication cadence','KPI alignment','Handling department friction','Executive presence'],
      diff: 'hard',
      time: '3–4 min',
    },
    {
      q: 'Describe a time you had to make a high-stakes decision with incomplete data. What was your framework?',
      kp: ['Risk assessment','Reversibility of decision','Consultation process','Outcome evaluation'],
      diff: 'hard',
      time: '3 min',
    },
  ],
};

const SITUATIONAL_TEMPLATES = [
  {
    q: 'You\'ve just joined a new team and discovered that the codebase/process is significantly more complex than described. What do you do in your first 30 days?',
    kp: ['Onboarding approach','When to ask vs figure out yourself','Quick wins strategy','How you build trust fast'],
    diff: 'medium',
  },
  {
    q: 'A key stakeholder keeps changing requirements mid-sprint. How do you handle this without damaging the relationship?',
    kp: ['Impact assessment process','How you communicate the cost of changes','Documentation approach','Boundary-setting with respect'],
    diff: 'medium',
  },
  {
    q: 'You\'re asked to take on a project that\'s significantly outside your current expertise. What do you do?',
    kp: ['How you assess the gap','Learning plan approach','When you escalate','How you demonstrate progress'],
    diff: 'easy',
  },
  {
    q: 'Halfway through a project, a team member tells you they\'re burning out. What actions do you take?',
    kp: ['Immediate support actions','Scope adjustment options','How you raise it with leadership','Long-term prevention'],
    diff: 'medium',
  },
  {
    q: 'You discover a security vulnerability in production code that you wrote 6 months ago. It hasn\'t been exploited yet. What do you do?',
    kp: ['Immediate containment steps','Disclosure approach','Fix and deployment process','Documentation/retrospective'],
    diff: 'hard',
  },
];

const CULTURE_TEMPLATES = [
  {
    q: 'What drew you specifically to this role and company, and how does it align with where you want to go in your career?',
    kp: ['Specific company research points','Role alignment to goals','Medium-term career vision','Authentic motivation'],
    diff: 'easy',
    time: '1–2 min',
  },
  {
    q: 'Describe your ideal working environment and the conditions under which you do your best work.',
    kp: ['Collaboration style preference','Autonomy vs guidance balance','Communication preferences','Remote/in-person stance'],
    diff: 'easy',
    time: '1–2 min',
  },
  {
    q: 'How do you stay current in your field? What are the last 2–3 things you\'ve learned recently?',
    kp: ['Specific resources you use','Learning habits','Recent concrete example','How learning translates to work'],
    diff: 'easy',
    time: '1–2 min',
  },
];

// ── Answer framework generator ─────────────────────────────────────────────
function generateAnswerFramework(category, role, seniority, skills) {
  const skillHint = skills.length > 0 ? skills.slice(0, 3).join(', ') : 'your core tools';
  const seniorityContext =
    seniority === 'senior'
      ? 'a large-scale system with significant business impact'
      : seniority === 'manager'
      ? 'a cross-functional initiative involving multiple teams'
      : 'a real project from your experience';

  if (category === 'behavioral') {
    return {
      situation: `Set the context: company/team size, your role, the specific challenge. Make it concrete — pick ${seniorityContext}.`,
      action: `Walk through YOUR specific actions step-by-step. Use ${skillHint} as appropriate. Avoid saying "we" — say "I". Keep it active and specific.`,
      result: `Quantify the outcome. Use numbers: % improvement, time saved, revenue impact, error rate reduced. End with a reflection on what you learned.`,
    };
  }
  if (category === 'technical') {
    return {
      situation: `Briefly frame the problem constraints — scale, latency requirements, team size. This shows you think in real-world context.`,
      action: `Walk through your technical approach systematically. Cover: architecture decisions, tradeoffs you considered, why you chose your approach over alternatives.`,
      result: `If hypothetical: conclude with key tradeoffs and monitoring approach. If from experience: share actual results and any lessons from production.`,
    };
  }
  if (category === 'situational') {
    return {
      situation: `If you have a real example, use it. If not, describe exactly what you would do step-by-step — interviewers value both equally if you're specific.`,
      action: `Cover: your immediate action, who you'd involve, tools/processes you'd use, how you'd communicate. Be concrete, not vague.`,
      result: `Describe the expected outcome or the actual outcome. What would success look like? What risk would you have mitigated?`,
    };
  }
  return {
    situation: `Set context on why this company/role matters to you specifically. Research: check the company's recent news, products, mission.`,
    action: `Be authentic and specific. Mention actual things about the company — their tech stack, culture posts, product direction — not just "great company culture".`,
    result: `Connect your answer to value: how your goal aligns to their goal. End with a question back to them about the team/role.`,
  };
}

// ── Main question generator ────────────────────────────────────────────────
function generateQuestions(jd, resumeText, focusArea) {
  const { role, seniority } = detectRole(jd);
  const skills = extractSkills(jd);
  const questions = [];
  let idCounter = 1;
  const makeId = () => `q_${String(idCounter++).padStart(3, '0')}`;

  const addQ = (template, category, diff = 'medium') => {
    questions.push({
      id: makeId(),
      question: template.q,
      category,
      difficulty: template.diff || diff,
      rationale: getRationale(category, role),
      answerFramework: generateAnswerFramework(category, role, seniority, skills),
      keyPoints: template.kp || [],
      talkingTime: template.time || '2–3 min',
      followUpQuestions: template.followUp || getGenericFollowUps(category),
    });
  };

  // Behavioral (always included unless focusArea === 'technical')
  if (focusArea !== 'technical') {
    const behPool = shuffle(BEHAVIORAL_TEMPLATES);
    behPool.slice(0, focusArea === 'behavioral' ? 8 : 4).forEach(t => addQ(t, 'behavioral'));
  }

  // Technical
  if (focusArea !== 'behavioral') {
    const techPool = TECHNICAL_TEMPLATES[role] || TECHNICAL_TEMPLATES.software_engineer;
    techPool.slice(0, focusArea === 'technical' ? 7 : 4).forEach(t => addQ(t, 'technical', t.diff || 'medium'));
  }

  // Situational
  if (focusArea === 'all' || focusArea === 'situational') {
    shuffle(SITUATIONAL_TEMPLATES).slice(0, 3).forEach(t => addQ(t, 'situational'));
  }

  // Role-specific (always add 2–3)
  const roleSpecific = getRoleSpecificQuestions(role, seniority, skills);
  roleSpecific.forEach(t => addQ(t, 'role-specific'));

  // Culture (always add 2–3)
  shuffle(CULTURE_TEMPLATES).slice(0, 2).forEach(t => addQ(t, 'culture', 'easy'));

  return { questions, role, seniority, skills };
}

function getRoleSpecificQuestions(role, seniority, skills) {
  const skillStr = skills.slice(0, 2).join(' and ') || 'your primary tools';
  const bank = {
    software_engineer: [
      {
        q: `Walk me through the most complex technical decision you've made in the past year. What was the context, options you considered, and how did you decide?`,
        kp: ['Problem framing','Options evaluated','Tradeoff framework','Outcome and learning'],
        time: '3 min',
      },
      {
        q: `How do you approach code reviews — both as a reviewer and when your code is being reviewed? What do you look for?`,
        kp: ['What you look for in a PR','How you give feedback constructively','How you receive/act on feedback','Culture impact'],
        time: '2 min',
      },
      {
        q: `Describe your experience with ${skillStr}. What's the hardest production problem you've solved using it?`,
        kp: ['Depth of experience','Specific challenge','Debug/solution process','What you\'d do differently'],
        time: '2–3 min',
      },
    ],
    frontend_developer: [
      {
        q: `Walk me through your approach to building a reusable component library. What decisions do you make upfront?`,
        kp: ['API design for components','Documentation approach','Versioning strategy','Adoption across teams'],
        time: '2–3 min',
      },
      {
        q: `Describe your experience with ${skillStr}. What's the most complex UI challenge you've solved?`,
        kp: ['Technical depth demonstrated','Specific challenge overcome','Performance or UX impact','What you\'d improve'],
        time: '2–3 min',
      },
    ],
    backend_developer: [
      {
        q: `Describe the most complex distributed system problem you've debugged in production. Walk me through your process.`,
        kp: ['Observability tools used','Hypothesis formation','Isolation technique','Fix and prevention'],
        time: '3 min',
      },
      {
        q: `How do you design for failure in a microservices architecture? What patterns do you rely on?`,
        kp: ['Circuit breaker pattern','Retry with backoff','Graceful degradation','Chaos engineering approach'],
        time: '2–3 min',
      },
    ],
    fullstack_developer: [
      {
        q: `Describe the full-stack project you're most proud of. What decisions did you make and what would you change today?`,
        kp: ['Architecture choices','What you built end-to-end','Scale/performance challenges','Honest retrospective'],
        time: '3 min',
      },
      {
        q: `How do you handle authentication across a full-stack app, including SSR pages, API routes, and third-party integrations?`,
        kp: ['Session vs token strategy','Cookie security considerations','SSR auth flow','Third-party OAuth handling'],
        time: '2–3 min',
      },
    ],
    product_manager: [
      {
        q: `Tell me about a product you've shipped that you're most proud of. What was your specific contribution and what impact did it have?`,
        kp: ['Your exact role','Decision you owned','Metric impact','What you\'d do differently'],
        time: '3 min',
      },
      {
        q: `How do you balance short-term wins (quick revenue) with long-term product bets? Give an example.`,
        kp: ['Framework for balancing','Stakeholder alignment','How you communicate trade-offs','Example outcome'],
        time: '2–3 min',
      },
    ],
    data_scientist: [
      {
        q: `Walk me through an end-to-end ML project — from data exploration to production deployment. What did you learn?`,
        kp: ['Data quality issues you found','Feature engineering choices','Model evaluation rigor','Production challenges'],
        time: '3–4 min',
      },
      {
        q: `How do you communicate model uncertainty or limitations to a non-technical business leader?`,
        kp: ['Confidence intervals in plain language','Business impact framing','When to say "we don\'t know yet"','Examples used'],
        time: '2 min',
      },
    ],
    data_analyst: [
      {
        q: `Describe the most impactful analysis you've done. How did it change a business decision?`,
        kp: ['Business context','Analytical approach','Insight that changed the decision','Long-term outcome'],
        time: '2–3 min',
      },
      {
        q: `How do you handle a situation where the data says one thing but a senior stakeholder\'s intuition says another?`,
        kp: ['How you validate the data','How you frame the conversation','When you push back vs defer','Outcome'],
        time: '2 min',
      },
    ],
    devops_engineer: [
      {
        q: `Describe the most complex infrastructure migration you've managed. What was the biggest risk and how did you mitigate it?`,
        kp: ['Migration strategy','Rollback plan','Communication to stakeholders','Monitoring during cutover'],
        time: '3 min',
      },
      {
        q: `How do you approach observability and monitoring for a distributed system?`,
        kp: ['Metrics, logs, traces triad','Alerting philosophy (avoid alert fatigue)','Dashboards for different audiences','On-call runbooks'],
        time: '2–3 min',
      },
    ],
    marketing_manager: [
      {
        q: `Tell me about a campaign that underperformed. What did you diagnose as the root cause and what did you change?`,
        kp: ['How you diagnosed vs guessed','Hypothesis you tested','Change made','New result'],
        time: '2–3 min',
      },
      {
        q: `How do you think about the balance between brand-building and performance marketing?`,
        kp: ['Attribution philosophy','Budget allocation framework','Long-term vs short-term tension','Example from your work'],
        time: '2 min',
      },
    ],
    ui_ux_designer: [
      {
        q: `Show me a project where the design went through major pivots based on user feedback. How did you manage that?`,
        kp: ['Research that prompted the pivot','Stakeholder communication','What you preserved vs changed','Final outcome'],
        time: '2–3 min',
      },
      {
        q: `How do you design for edge cases and error states without overcomplicating the happy path?`,
        kp: ['Error state inventory process','Copy and tone decisions','Developer collaboration','Testing error flows'],
        time: '2 min',
      },
    ],
    business_analyst: [
      {
        q: `Describe a time when your analysis challenged an existing assumption that the business had been operating on for years.`,
        kp: ['How you validated the finding','How you raised it carefully','Reception from leadership','Change that resulted'],
        time: '2–3 min',
      },
      {
        q: `How do you ensure that requirements don't get lost or misinterpreted between discovery and delivery?`,
        kp: ['Documentation format you use','Handoff process with engineering','Change management process','Acceptance criteria approach'],
        time: '2 min',
      },
    ],
    hr_manager: [
      {
        q: `Describe how you've built or improved an onboarding programme. What metrics did you use to measure success?`,
        kp: ['Current state assessment','Changes made','Ramp time or retention metrics','Iteration process'],
        time: '2–3 min',
      },
      {
        q: `How do you approach building a culture of feedback in an organisation where it hasn't historically been the norm?`,
        kp: ['Psychological safety foundation','Tooling and cadence','How you modelled it yourself','Resistance you faced'],
        time: '2 min',
      },
    ],
    sales_manager: [
      {
        q: `Tell me about a deal you lost that you should have won. What happened and what did you change afterwards?`,
        kp: ['Honest assessment of what went wrong','Competitive or process factors','Change you implemented','Subsequent result'],
        time: '2–3 min',
      },
      {
        q: `How do you coach a rep who is consistently hitting activity metrics but missing quota?`,
        kp: ['Diagnostic process','Specific coaching technique','Accountability structure','Outcome or learning'],
        time: '2 min',
      },
    ],
    finance_analyst: [
      {
        q: `Describe a time when your financial analysis directly influenced a major business decision. What was the context?`,
        kp: ['Analysis you built','Key insight that emerged','How you presented it','Decision and outcome'],
        time: '2–3 min',
      },
      {
        q: `How do you build in flexibility when building financial models for scenarios with high uncertainty?`,
        kp: ['Scenario and sensitivity framework','Assumption documentation','Communication of uncertainty ranges','Model governance'],
        time: '2 min',
      },
    ],
    mobile_developer: [
      {
        q: `Tell me about a mobile feature you built that had strict performance requirements. How did you optimize it?`,
        kp: ['Optimization techniques','Tools used for profiling','Trade-offs made','End-user impact'],
        time: '2–3 min',
      },
      {
        q: `How do you approach testing on mobile platforms across fragmented device ecosystems?`,
        kp: ['Device farm usage','OS version coverage','Automated vs manual','Handling specific OEM quirks'],
        time: '2 min',
      },
    ],
    cloud_architect: [
      {
        q: `Describe the most complex migration from on-prem to cloud you've architected. What went wrong that you didn't anticipate?`,
        kp: ['Planning phase','Execution strategy','Unexpected hurdle','How you recovered'],
        time: '3 min',
      },
      {
        q: `How do you enforce security and compliance standards automatically across a multi-account cloud environment?`,
        kp: ['Guardrails vs gates','Infrastructure as code','Compliance frameworks','Remediation automation'],
        time: '2–3 min',
      },
    ],
    cybersecurity_engineer: [
      {
        q: `Walk me through a time you found a significant vulnerability. How did you communicate the risk to engineering leadership to get it prioritized?`,
        kp: ['Vulnerability assessment','Exploitability demonstration','Business impact translation','Remediation collaboration'],
        time: '3 min',
      },
      {
        q: `How do you stay updated on zero-day threats and integrate them into your team's defense posture quickly?`,
        kp: ['Threat intel sources','Triaging process','Patch deployment speed','Automated scanning updates'],
        time: '2 min',
      },
    ],
    qa_engineer: [
      {
        q: `Tell me about a time when a critical bug slipped into production. How did you handle the post-mortem and what did you change in your test strategy?`,
        kp: ['Root cause analysis','Test coverage gap identified','Process implementation','Cultural handling of failure'],
        time: '2–3 min',
      },
      {
        q: `How do you decide what NOT to automate in a test suite?`,
        kp: ['ROI of automation','Maintenance overhead','Exploratory testing value','Visual regression limitations'],
        time: '2 min',
      },
    ],
    executive: [
      {
        q: `Describe the most difficult organizational restructuring or team transition you've successfully led.`,
        kp: ['Business rationale','Communication plan','Handling dissent or turnover','Sustaining productivity'],
        time: '3–4 min',
      },
      {
        q: `How do you balance achieving quarterly targets with investing in long-term strategic capabilities?`,
        kp: ['Resource allocation framework','Managing board/investor expectations','Leading/lagging indicators','Course correction mechanism'],
        time: '3 min',
      },
    ],
  };
  return (bank[role] || bank.software_engineer).slice(0, 2);
}

function getRationale(category, role) {
  const map = {
    behavioral: 'Interviewers use this to assess your past behavior as a predictor of future performance — especially how you handle pressure, conflict, and growth.',
    technical: `Tests whether you can apply your ${role.replace(/_/g, ' ')} expertise to realistic problems, not just describe theory.`,
    situational: 'Reveals your judgment and problem-solving approach in realistic scenarios you\'ll likely face in this role.',
    'role-specific': 'Assesses depth of experience directly relevant to this specific position — the most differentiating question type.',
    culture: 'Evaluates mutual fit — whether your work style and values align with the team, not just your skills.',
  };
  return map[category] || 'Standard screening question used by most interviewers.';
}

function getGenericFollowUps(category) {
  const map = {
    behavioral: ['What would you do differently now?', 'What did your manager say about your approach?'],
    technical: ['What would you change if the scale was 10x larger?', 'Have you implemented this in production?'],
    situational: ['How do you know your approach would work?', 'What if that option wasn\'t available?'],
    'role-specific': ['Can you elaborate on the specific challenge?', 'What metrics did you track?'],
    culture: ['How does that manifest day-to-day?', 'Can you give a concrete example?'],
  };
  return map[category] || ['Can you elaborate?', 'What was the outcome?'];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const PREP_TIPS = [
  'Use the STAR format (Situation, Task, Action, Result) for every behavioral answer — it keeps you structured under pressure.',
  'Prepare 5–6 "anchor stories" from your career that can be adapted for multiple questions across competencies.',
  'Research the company\'s recent news, product launches, and engineering blog posts — reference them in your answers.',
  'Practice answers out loud, not just in your head. The gap between thinking an answer and saying it clearly is significant.',
  'Prepare 3–5 sharp questions for the interviewer that show you\'ve thought deeply about the role and team.',
  'Record yourself answering mock questions and watch for filler words, pacing issues, and unclear transitions.',
  'Keep each answer to 2–3 minutes max. Interviewers lose focus after that — practice cutting ruthlessly.',
];

// ── POST handler ───────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json();
    const jobDescription = (body.jobDescription || '').trim();
    const resumeText = (body.resumeText || '').trim();
    const focusArea = body.focusArea || 'all';

    if (!jobDescription || jobDescription.length < 50) {
      return NextResponse.json(
        { error: 'Please provide a job description of at least 50 characters.' },
        { status: 400 }
      );
    }

    const { questions, role, seniority, skills } = generateQuestions(jobDescription, resumeText, focusArea);

    return NextResponse.json({
      detectedRole: role.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      seniority: seniority.charAt(0).toUpperCase() + seniority.slice(1),
      extractedSkills: skills,
      totalQuestions: questions.length,
      questions,
      prepTips: shuffle(PREP_TIPS).slice(0, 5),
      topSkillsToHighlight: skills.slice(0, 6),
    });
  } catch (err) {
    console.error('Interview prep error:', err);
    return NextResponse.json(
      { error: 'Failed to generate questions. Please try again.' },
      { status: 500 }
    );
  }
}
