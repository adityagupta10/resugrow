import { NextResponse } from "next/server";

const ROUND_TO_HALF = (value) => Math.round(value * 2) / 2;
const TITLE_CASE_ROLE = (role) =>
  role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const isBelowMarket = (position) =>
  ["significantly_below", "below"].includes(position);

// ── India salary database (all values in LPA) ─────────────────────────────
const SALARY_DB = {
  software_engineer: {
    "0-2": { min: 4, mid: 8, max: 14 },
    "3-5": { min: 12, mid: 20, max: 32 },
    "6-9": { min: 22, mid: 35, max: 55 },
    "10+": { min: 40, mid: 65, max: 100 },
  },
  frontend_developer: {
    "0-2": { min: 4, mid: 7, max: 12 },
    "3-5": { min: 10, mid: 18, max: 28 },
    "6-9": { min: 20, mid: 32, max: 50 },
    "10+": { min: 35, mid: 55, max: 90 },
  },
  backend_developer: {
    "0-2": { min: 4, mid: 8, max: 14 },
    "3-5": { min: 12, mid: 20, max: 32 },
    "6-9": { min: 22, mid: 36, max: 58 },
    "10+": { min: 38, mid: 62, max: 95 },
  },
  fullstack_developer: {
    "0-2": { min: 5, mid: 9, max: 15 },
    "3-5": { min: 13, mid: 22, max: 35 },
    "6-9": { min: 24, mid: 38, max: 60 },
    "10+": { min: 42, mid: 68, max: 105 },
  },
  data_scientist: {
    "0-2": { min: 6, mid: 10, max: 18 },
    "3-5": { min: 14, mid: 24, max: 40 },
    "6-9": { min: 25, mid: 42, max: 68 },
    "10+": { min: 45, mid: 75, max: 130 },
  },
  data_analyst: {
    "0-2": { min: 4, mid: 7, max: 12 },
    "3-5": { min: 9, mid: 16, max: 26 },
    "6-9": { min: 18, mid: 30, max: 48 },
    "10+": { min: 32, mid: 52, max: 85 },
  },
  product_manager: {
    "0-2": { min: 8, mid: 14, max: 22 },
    "3-5": { min: 18, mid: 30, max: 50 },
    "6-9": { min: 30, mid: 52, max: 85 },
    "10+": { min: 55, mid: 95, max: 160 },
  },
  product_analyst: {
    "0-2": { min: 5, mid: 9, max: 15 },
    "3-5": { min: 11, mid: 19, max: 30 },
    "6-9": { min: 20, mid: 34, max: 55 },
    "10+": { min: 38, mid: 60, max: 95 },
  },
  ui_ux_designer: {
    "0-2": { min: 3, mid: 6, max: 11 },
    "3-5": { min: 8, mid: 14, max: 24 },
    "6-9": { min: 15, mid: 26, max: 42 },
    "10+": { min: 28, mid: 48, max: 80 },
  },
  devops_engineer: {
    "0-2": { min: 5, mid: 9, max: 16 },
    "3-5": { min: 13, mid: 22, max: 38 },
    "6-9": { min: 24, mid: 40, max: 65 },
    "10+": { min: 42, mid: 72, max: 115 },
  },
  cloud_architect: {
    "0-2": { min: 8, mid: 14, max: 22 },
    "3-5": { min: 16, mid: 28, max: 46 },
    "6-9": { min: 30, mid: 52, max: 85 },
    "10+": { min: 55, mid: 95, max: 160 },
  },
  ml_engineer: {
    "0-2": { min: 7, mid: 12, max: 20 },
    "3-5": { min: 16, mid: 28, max: 48 },
    "6-9": { min: 28, mid: 48, max: 80 },
    "10+": { min: 50, mid: 88, max: 145 },
  },
  marketing_manager: {
    "0-2": { min: 3, mid: 6, max: 10 },
    "3-5": { min: 8, mid: 14, max: 24 },
    "6-9": { min: 15, mid: 26, max: 45 },
    "10+": { min: 28, mid: 50, max: 90 },
  },
  business_analyst: {
    "0-2": { min: 4, mid: 7, max: 12 },
    "3-5": { min: 9, mid: 16, max: 26 },
    "6-9": { min: 16, mid: 28, max: 46 },
    "10+": { min: 30, mid: 52, max: 85 },
  },
  hr_manager: {
    "0-2": { min: 3, mid: 5, max: 9 },
    "3-5": { min: 7, mid: 12, max: 20 },
    "6-9": { min: 13, mid: 22, max: 38 },
    "10+": { min: 25, mid: 42, max: 70 },
  },
  sales_manager: {
    "0-2": { min: 3, mid: 6, max: 12 },
    "3-5": { min: 8, mid: 15, max: 28 },
    "6-9": { min: 14, mid: 26, max: 48 },
    "10+": { min: 28, mid: 52, max: 95 },
  },
  finance_analyst: {
    "0-2": { min: 5, mid: 8, max: 14 },
    "3-5": { min: 10, mid: 18, max: 30 },
    "6-9": { min: 18, mid: 32, max: 55 },
    "10+": { min: 32, mid: 58, max: 100 },
  },
  tech_lead: {
    "0-2": { min: 0, mid: 0, max: 0 },
    "3-5": { min: 18, mid: 28, max: 45 },
    "6-9": { min: 30, mid: 48, max: 75 },
    "10+": { min: 48, mid: 80, max: 130 },
  },
  engineering_manager: {
    "0-2": { min: 0, mid: 0, max: 0 },
    "3-5": { min: 22, mid: 35, max: 55 },
    "6-9": { min: 38, mid: 62, max: 100 },
    "10+": { min: 60, mid: 100, max: 175 },
  },
  scrum_master: {
    "0-2": { min: 4, mid: 7, max: 12 },
    "3-5": { min: 10, mid: 18, max: 30 },
    "6-9": { min: 18, mid: 30, max: 50 },
    "10+": { min: 30, mid: 50, max: 85 },
  },
  qa_engineer: {
    "0-2": { min: 3, mid: 6, max: 10 },
    "3-5": { min: 8, mid: 14, max: 24 },
    "6-9": { min: 14, mid: 24, max: 40 },
    "10+": { min: 25, mid: 42, max: 70 },
  },
  security_engineer: {
    "0-2": { min: 5, mid: 9, max: 16 },
    "3-5": { min: 13, mid: 22, max: 38 },
    "6-9": { min: 24, mid: 40, max: 65 },
    "10+": { min: 40, mid: 70, max: 120 },
  },
  content_writer: {
    "0-2": { min: 2, mid: 4, max: 8 },
    "3-5": { min: 5, mid: 10, max: 18 },
    "6-9": { min: 10, mid: 18, max: 32 },
    "10+": { min: 18, mid: 32, max: 58 },
  },
};

const DEFAULT_SALARY = {
  "0-2": { min: 4, mid: 8, max: 14 },
  "3-5": { min: 10, mid: 18, max: 30 },
  "6-9": { min: 18, mid: 32, max: 52 },
  "10+": { min: 32, mid: 55, max: 95 },
};

// ── Multipliers ────────────────────────────────────────────────────────────
const LOCATION_MULT = {
  bangalore: 1.0,
  mumbai: 0.95,
  delhi_ncr: 0.9,
  delhi: 0.9,
  pune: 0.85,
  hyderabad: 0.9,
  chennai: 0.82,
  kolkata: 0.75,
  ahmedabad: 0.72,
  tier2: 0.65,
  remote: 1.0,
  other: 0.78,
};

const COMPANY_MULT = {
  product: 1.25,
  mnc: 1.1,
  startup: 1.15,
  service: 0.82,
  government_psu: 0.7,
};

const SECTOR_BONUS = {
  fintech: 0.15,
  healthtech: 0.08,
  ecommerce: 0.05,
  edtech: -0.05,
  media: -0.05,
  saas: 0.1,
  gaming: 0.08,
  general: 0,
  other: 0,
};

// ── Role detection ─────────────────────────────────────────────────────────
const ROLE_MAP = {
  engineering_manager: [
    "engineering manager",
    "em ",
    "vp engineering",
    "director of engineering",
    "director engineering",
  ],
  tech_lead: [
    "tech lead",
    "technical lead",
    "lead engineer",
    "lead developer",
    "lead sde",
  ],
  ml_engineer: [
    "ml engineer",
    "machine learning engineer",
    "ai engineer",
    "nlp engineer",
    "deep learning engineer",
  ],
  cloud_architect: [
    "cloud architect",
    "solutions architect",
    "aws architect",
    "azure architect",
    "gcp architect",
  ],
  security_engineer: [
    "security engineer",
    "cybersecurity",
    "infosec",
    "penetration",
    "devsecops",
  ],
  scrum_master: ["scrum master", "agile coach", "rte ", "release train"],
  qa_engineer: [
    "qa engineer",
    "quality assurance",
    "sdet",
    "test engineer",
    "automation engineer",
  ],
  devops_engineer: [
    "devops",
    "sre",
    "site reliability",
    "platform engineer",
    "cloud engineer",
    "infrastructure engineer",
  ],
  fullstack_developer: ["fullstack", "full stack", "full-stack"],
  frontend_developer: [
    "frontend",
    "front-end",
    "front end",
    "react developer",
    "angular developer",
    "vue developer",
    "ui developer",
  ],
  backend_developer: [
    "backend",
    "back-end",
    "back end",
    "java developer",
    "python developer",
    "node developer",
    "api developer",
    "golang",
    "rust developer",
  ],
  software_engineer: [
    "software engineer",
    "sde",
    "swe",
    "developer",
    "programmer",
    "software developer",
  ],
  product_manager: ["product manager", "product owner", "pm "],
  product_analyst: ["product analyst"],
  data_scientist: [
    "data scientist",
    "machine learning",
    "deep learning",
    "ai researcher",
    "research scientist",
  ],
  data_analyst: [
    "data analyst",
    "business intelligence",
    "bi analyst",
    "analytics engineer",
    "data engineer",
  ],
  ui_ux_designer: [
    "ux designer",
    "ui designer",
    "product designer",
    "interaction designer",
    "ux researcher",
    "visual designer",
  ],
  marketing_manager: [
    "marketing manager",
    "growth manager",
    "digital marketing",
    "seo manager",
    "content manager",
    "brand manager",
  ],
  business_analyst: [
    "business analyst",
    "ba ",
    "systems analyst",
    "functional analyst",
    "process analyst",
  ],
  hr_manager: [
    "hr manager",
    "hr ",
    "human resources",
    "talent acquisition",
    "recruiter",
    "people ops",
    "hrbp",
  ],
  sales_manager: [
    "sales manager",
    "account executive",
    "business development",
    "account manager",
    "bdm",
    "sales lead",
  ],
  finance_analyst: [
    "finance analyst",
    "financial analyst",
    "fp&a",
    "investment analyst",
    "chartered accountant",
    "ca ",
  ],
  content_writer: [
    "content writer",
    "copywriter",
    "technical writer",
    "content strategist",
  ],
};

function detectRole(input) {
  const lower = (input || "").toLowerCase();
  for (const [role, keywords] of Object.entries(ROLE_MAP)) {
    if (keywords.some((k) => lower.includes(k))) return role;
  }
  return "software_engineer";
}

function getExpBand(yrs) {
  const n = parseFloat(yrs) || 0;
  if (n <= 2) return "0-2";
  if (n <= 5) return "3-5";
  if (n <= 9) return "6-9";
  return "10+";
}

// ── Market range calculation ───────────────────────────────────────────────
function calcRange(role, band, loc, comp, sec) {
  const base = (SALARY_DB[role] || DEFAULT_SALARY)[band];
  const locMult = LOCATION_MULT[loc] || 0.85;
  const compMult = COMPANY_MULT[comp] || 1.0;
  const secAdj = SECTOR_BONUS[sec] || 0;
  const totalMult = locMult * compMult * (1 + secAdj);

  const applyMultiplier = (v) => ROUND_TO_HALF(v * totalMult);

  return {
    min: applyMultiplier(base.min),
    mid: applyMultiplier(base.mid),
    max: applyMultiplier(base.max),
  };
}

// ── Offer analysis ─────────────────────────────────────────────────────────
function analyzeOffer(offer, range) {
  if (range.mid === 0) {
    return {
      position: "at_market",
      verdict: "At Market Rate",
      color: "green",
      pctFromMid: 0,
    };
  }
  const pct = ((offer - range.mid) / range.mid) * 100;
  if (pct < -25)
    return {
      position: "significantly_below",
      verdict: "Significantly Below Market",
      color: "red",
      pctFromMid: Math.round(pct),
    };
  if (pct < -10)
    return {
      position: "below",
      verdict: "Below Market",
      color: "orange",
      pctFromMid: Math.round(pct),
    };
  if (pct <= 12)
    return {
      position: "at_market",
      verdict: "At Market Rate",
      color: "green",
      pctFromMid: Math.round(pct),
    };
  return {
    position: "above",
    verdict: "Above Market",
    color: "blue",
    pctFromMid: Math.round(pct),
  };
}

// ── Recommended ask ────────────────────────────────────────────────────────
const PREMIUM_SKILLS = [
  "AWS",
  "GCP",
  "Kubernetes",
  "Machine Learning",
  "React",
  "TypeScript",
  "System Design",
  "Microservices",
  "Terraform",
  "Go",
  "Rust",
];

function calcAsk(offer, range, analysis, skills) {
  const skillPremium =
    (skills || []).filter((s) => PREMIUM_SKILLS.includes(s)).length > 3
      ? 0.05
      : 0;
  const { position } = analysis;

  if (position === "significantly_below") {
    return {
      target: ROUND_TO_HALF(range.mid * (1 + skillPremium)),
      minAcceptable: ROUND_TO_HALF(offer * 1.15),
      maxAsk: ROUND_TO_HALF(range.mid * 1.12),
      rationale: `The offer of ₹${offer} LPA is ${Math.abs(analysis.pctFromMid)}% below market mid (₹${range.mid} LPA). A significant counter-offer is fully justified and expected by most hiring managers in this situation.`,
    };
  }

  if (position === "below") {
    return {
      target: ROUND_TO_HALF(range.mid * (1 + skillPremium)),
      minAcceptable: ROUND_TO_HALF(offer * 1.1),
      maxAsk: ROUND_TO_HALF(range.mid * 1.06),
      rationale: `The offer is ${Math.abs(analysis.pctFromMid)}% below market mid. A modest but firm counter to reach or approach market mid is standard practice and rarely damages the relationship.`,
    };
  }

  if (position === "at_market") {
    return {
      target: ROUND_TO_HALF(offer * (1.08 + skillPremium)),
      minAcceptable: offer,
      maxAsk: ROUND_TO_HALF(range.max * 0.92),
      rationale: `The offer is at fair market rate. Your negotiation should focus on pushing to the upper end of the market range by citing specific premium skills and demonstrable past impact.`,
    };
  }

  return {
    target: offer,
    minAcceptable: offer,
    maxAsk: ROUND_TO_HALF(offer * 1.08),
    rationale: `The offer is already above market rate. Focus your negotiation on non-cash items — joining bonus, equity, flexibility, and benefits — rather than base CTC.`,
  };
}

// ── Negotiation script ─────────────────────────────────────────────────────
function buildScript(role, offer, ask, range, analysis) {
  const rl = TITLE_CASE_ROLE(role);
  const below = isBelowMarket(analysis.position);

  return {
    openingStatement: `Thank you so much for extending the offer for the ${rl} position — I'm genuinely excited about the opportunity to join the team. Before formally signing, I'd welcome a brief conversation about the compensation package. I want to make sure we start on the right footing, and I'm confident we can reach a number that works well for both sides.`,

    marketDataReference: below
      ? `I've done some research into current market compensation for ${rl} roles — looking at AmbitionBox, Glassdoor, LinkedIn Salary Insights, and Levels.fyi. For this experience level and location, the market range appears to be ₹${range.min}–₹${range.max} LPA, with a mid-point around ₹${range.mid} LPA. The current offer of ₹${offer} LPA is ${Math.abs(analysis.pctFromMid)}% below that mid-point, which is why I'd like to discuss a revision.`
      : `I've reviewed current compensation benchmarks for ${rl} roles across similar companies. The offer aligns broadly with market data, and I appreciate that. Given my specific experience and the skills I bring that are directly relevant to this role, I believe there's a reasonable case to position compensation toward the upper end of the market range.`,

    valueProposition: `Beyond the market context, I want to highlight the direct value I bring: [insert your most impressive, quantified achievement here — e.g., "reduced infra costs by 30% while scaling to 10M requests/day" or "grew ARR by ₹4Cr in 18 months"]. I'm not asking for a premium over market — I'm asking to be paid at market for the specific skills and impact I'll bring from day one.`,

    counterOfferAsk: below
      ? `Given all of this, I'd like to respectfully propose a revised CTC of ₹${ask.target} LPA. I'm flexible on how this is structured — fixed, variable, joining bonus, or a combination — and I'm genuinely open to a creative package that works for both sides. My minimum to move forward would be ₹${ask.minAcceptable} LPA.`
      : `I'd like to propose moving to ₹${ask.target} LPA. If the budget is constrained, I'm open to discussing a performance milestone review at 6 months with a pre-agreed increment range, or a joining bonus to bridge the gap. My goal is to find a structure that works for both sides.`,

    closingStatement: `I'm very committed to this role — this conversation is about starting the relationship on the right foundation so I can focus entirely on delivering results from day one. I'm confident we can find a number that works. Would it be possible to set up a brief call this week to finalize the details?`,
  };
}

// ── Email templates ────────────────────────────────────────────────────────
function buildEmails(role, offer, ask, range, analysis) {
  const rl = TITLE_CASE_ROLE(role);
  const below = isBelowMarket(analysis.position);

  const initialResponse = `Subject: Re: Offer Letter – ${rl} Position

Dear [Hiring Manager / HR Name],

Thank you so much for sending over the offer letter for the ${rl} role at [Company Name]. I'm genuinely excited about the opportunity and the team.

I've reviewed the offer carefully. Before formally signing, I'd love a brief 15-minute call to discuss one aspect of the package. I want to make sure we're fully aligned before I commit.

Would you be available for a quick call this week?

Looking forward to it.

Warm regards,
[Your Full Name]
[Phone Number]`;

  const counterOffer = `Subject: Compensation Discussion – ${rl} Offer

Dear [Hiring Manager / HR Name],

Thank you for taking the time to speak with me — I really appreciate the openness.

To summarize: the current offer is ₹${offer} LPA.${below ? ` Based on my research of current market compensation for ${rl} roles in [City] — using AmbitionBox, Glassdoor, and LinkedIn Salary Insights — the typical range for this profile at a [Company Type] company is ₹${range.min}–₹${range.max} LPA (mid: ₹${range.mid} LPA).` : ""}

Given my background in [Skill 1] and [Skill 2], and the direct value I can bring to [specific team/product area], I'd like to propose a revised CTC of ₹${ask.target} LPA.

I'm flexible on structure — base, variable, joining bonus, or a combination — and genuinely open to a creative solution. My minimum requirement to move forward is ₹${ask.minAcceptable} LPA.

I remain very enthusiastic about the role and the company. I'm confident we can find a package that works for both sides.

Please let me know your thoughts at your earliest convenience.

Best regards,
[Your Full Name]
[Phone Number]`;

  const followUp = `Subject: Following Up – ${rl} Compensation Discussion

Dear [Hiring Manager / HR Name],

I hope you're doing well. I wanted to follow up on my email from [Date] regarding the compensation package for the ${rl} role.

I'm still very excited about joining [Company Name] and haven't taken any other decisions — I'm waiting to resolve this before moving forward.

If the revised base isn't feasible within budget, I'm also open to exploring alternatives such as:
  • A one-time joining bonus of ₹[Amount]
  • An accelerated performance review at the 6-month mark with a pre-agreed increment range
  • Additional ESOPs or equity (if applicable to the role)
  • A higher variable pay component

Would you be available for a quick 10-minute call this week to finalize this? I'd love to wrap it up so we can both move forward.

Warm regards,
[Your Full Name]
[Phone Number]`;

  const acceptance = `Subject: Formal Offer Acceptance – ${rl} Position

Dear [Hiring Manager / HR Name],

Thank you for working through the compensation discussion with me — I genuinely appreciate the transparency and flexibility shown throughout the process.

I'm pleased to formally accept the offer for the ${rl} position at [Company Name] with a total CTC of ₹[Final Agreed Amount] LPA.

Please send over the revised offer letter at your earliest convenience. My tentative joining date is [Date] — please let me know if there are any pre-joining formalities, documentation, or onboarding steps I should complete before then.

I'm looking forward to joining the team and getting started!

Warm regards,
[Your Full Name]
[Phone Number]`;

  return { initialResponse, counterOffer, followUp, acceptance };
}

// ── Additional negotiation items ───────────────────────────────────────────
function buildAdditionalItems(offer, range, compType, analysis) {
  const below = isBelowMarket(analysis.position);
  const gap = Math.max(0, range.mid - offer);

  const items = [
    {
      item: "Joining Bonus",
      priority: below ? "High" : "Medium",
      detail: below
        ? `Ask for a one-time joining bonus of ₹${ROUND_TO_HALF(gap * 0.5)}–₹${ROUND_TO_HALF(gap * 1.0)}L to bridge the gap between the offer and market mid. Joining bonuses are easier to approve than base increases.`
        : "A 1–2 month CTC joining bonus is standard at most companies and is rarely refused. Frame it as compensation for the notice period cost or deferred bonuses from your current role.",
    },
    {
      item: "Variable Pay Structure",
      priority: "High",
      detail:
        "Confirm the exact fixed vs. variable split in writing. Push for a higher fixed percentage. A 90:10 split is far more financially secure than 70:30, especially if the variable is subject to company performance.",
    },
    {
      item: "6-Month Performance Review",
      priority: below ? "High" : "Medium",
      detail:
        "If the base is below your target, negotiate a formal performance review at 6 months with a pre-agreed increment range (e.g., 15–25%) written into the offer letter. This gives you a clear, early path to correction.",
    },
  ];

  if (compType === "startup") {
    items.push({
      item: "ESOPs / Equity",
      priority: "High",
      detail:
        "For startups, ESOP allocation can be highly valuable. Ask for: total grant size (number of options), current strike price, vesting schedule (standard is 4 years with 1-year cliff), and the last 409A valuation.",
    });
  }

  items.push(
    {
      item: "WFH / Hybrid Flexibility",
      priority: "Medium",
      detail:
        "Confirm hybrid terms in the offer letter itself — not just verbally. Even 2 days WFH/week saves ₹2,000–₹6,000/month in commute costs and significantly impacts quality of life.",
    },
    {
      item: "Learning & Development Budget",
      priority: "Medium",
      detail:
        "Request an annual L&D budget of ₹30,000–₹1,00,000 for certifications (AWS, PMP, CFA, etc.), online courses, and conferences. This is standard at most product companies and mid-to-large MNCs.",
    },
    {
      item: "Health Insurance Coverage",
      priority: "Medium",
      detail:
        "Verify: (1) Sum insured — aim for ₹5L+, (2) Whether it covers spouse, children, and/or parents, (3) Whether the premium for dependents is covered by the company, (4) Top-up options available.",
    },
    {
      item: "Notice Period Buyout",
      priority: "Medium",
      detail:
        "If your current employer requires a buyout to exit early, ask the new company to cover it. This is increasingly common at ₹50,000–₹3,00,000 depending on your seniority and notice period length.",
    },
    {
      item: "Relocation Assistance",
      priority: "Low",
      detail:
        "If you are relocating cities for this role, request a one-time relocation allowance of ₹50,000–₹2,00,000 to cover moving expenses, accommodation deposit, and travel. Many companies have a standard relocation policy.",
    },
    {
      item: "Laptop / Equipment Policy",
      priority: "Low",
      detail:
        "Confirm whether the company provides a work laptop and peripherals, or whether you are expected to use your own (BYOD). If BYOD, negotiate a one-time equipment allowance of ₹30,000–₹80,000.",
    },
  );

  return items;
}

// ── Negotiation tips ───────────────────────────────────────────────────────
const NEGOTIATION_TIPS = [
  'Never give the first number. If asked "what are your expectations?", redirect: "I\'d love to understand the approved band for this role first, so we can have a meaningful conversation."',
  "Always follow up a verbal negotiation conversation in writing — it creates a paper trail, removes real-time pressure, and gives you time to think through your response carefully.",
  'Cite data, not feelings. "Market research across AmbitionBox and Glassdoor shows X" lands far better than "I was expecting more" or "I feel the offer is low."',
  "Negotiate the full package, not just base. Variable pay structure, joining bonus, ESOPs, L&D budget, and WFH flexibility are all legitimate and negotiable levers.",
  "Stay warm, collaborative, and professional throughout. You're not adversaries — you're two parties trying to align on a number. Tone and relationship often determine outcome more than logic.",
  "Set your walk-away number before the negotiation begins. If they can't meet your minimum acceptable, be prepared to decline clearly and respectfully. Knowing your floor removes panic from the conversation.",
  'If they say "this is the maximum approved budget," ask: "Is there flexibility on a joining bonus, an accelerated 6-month review, or ESOPs?" There is almost always a second lever available.',
  "Silence is one of your most powerful negotiation tools. After stating your counter-offer, stop talking. The discomfort of silence often prompts the other party to move toward your position.",
  'Never negotiate against yourself. If they ask "what would it take?", give a specific number — don\'t give a range. The lower end of your range immediately becomes the ceiling for them.',
  "Research the company's financial health, recent funding, and pay culture before negotiating. A Series B startup flush with cash and a bootstrapped company have very different actual constraints.",
];

// ── POST handler ───────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      role: roleInput,
      yearsExperience,
      offeredCTC,
      currentCTC,
      location,
      companyType,
      sector,
      skills,
    } = body;

    // Validation
    if (!roleInput || String(roleInput).trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide your job role." },
        { status: 400 },
      );
    }
    if (!yearsExperience && yearsExperience !== 0) {
      return NextResponse.json(
        { error: "Please provide your years of experience." },
        { status: 400 },
      );
    }
    if (!offeredCTC) {
      return NextResponse.json(
        { error: "Please provide the offered CTC." },
        { status: 400 },
      );
    }

    const offer = parseFloat(offeredCTC);
    const curCTC = currentCTC ? parseFloat(currentCTC) : null;

    if (isNaN(offer) || offer <= 0) {
      return NextResponse.json(
        { error: "Offered CTC must be a positive number." },
        { status: 400 },
      );
    }

    // Core calculations
    const role = detectRole(String(roleInput));
    const band = getExpBand(yearsExperience);
    const locKey = (location || "bangalore")
      .toLowerCase()
      .replace(/[\s-]+/g, "_");
    const compKey = companyType || "product";
    const secKey = sector || "general";

    const safeSkills = skills || [];
    const range = calcRange(role, band, locKey, compKey, secKey);
    const analysis = analyzeOffer(offer, range);
    const ask = calcAsk(offer, range, analysis, safeSkills);
    const script = buildScript(role, offer, ask, range, analysis);
    const emails = buildEmails(role, offer, ask, range, analysis);
    const extras = buildAdditionalItems(offer, range, compKey, analysis);

    // Shuffle tips and pick 5
    const tips = [...NEGOTIATION_TIPS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    // Increment analysis
    let incrementAnalysis = null;
    if (curCTC !== null && !isNaN(curCTC) && curCTC > 0) {
      const pct = ((offer - curCTC) / curCTC) * 100;
      incrementAnalysis = {
        currentCTC: curCTC,
        increment: Math.round(pct),
        label:
          pct < 20
            ? "Low increment — typically below the 20–30% standard for a lateral move."
            : pct < 40
              ? "Standard increment range for a job switch."
              : "Strong increment — above average for a job switch.",
        color: pct < 20 ? "red" : pct < 40 ? "green" : "blue",
      };
    }

    return NextResponse.json({
      detectedRole: TITLE_CASE_ROLE(role),
      expBand: band,
      marketAnalysis: {
        minRange: range.min,
        midRange: range.mid,
        maxRange: range.max,
        offeredCTC: offer,
        offerPosition: analysis.position,
        verdict: analysis.verdict,
        verdictColor: analysis.color,
        pctFromMid: analysis.pctFromMid,
        analysisText: `Market range for a ${role.replace(/_/g, " ")} with ${yearsExperience} year(s) of experience at a ${compKey} company in ${(location || "Bangalore").replace(/_/g, " ")} is approximately ₹${range.min}–₹${range.max} LPA (mid ₹${range.mid} LPA). Your offer of ₹${offer} LPA is ${Math.abs(analysis.pctFromMid)}% ${analysis.pctFromMid <= 0 ? "below" : "above"} market mid.`,
      },
      incrementAnalysis,
      recommendedAsk: ask,
      negotiationScript: script,
      emailTemplates: emails,
      additionalItems: extras,
      negotiationTips: tips,
    });
  } catch (err) {
    console.error("Salary coach error:", err);
    return NextResponse.json(
      { error: "Failed to generate analysis. Please try again." },
      { status: 500 },
    );
  }
}
