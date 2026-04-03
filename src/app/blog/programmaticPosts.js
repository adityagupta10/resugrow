const TOOL_LINKS = {
  ats: [
    { label: 'Run ATS Resume Check', href: '/resume/ats-checker' },
    { label: 'Build a Stronger Resume', href: '/resume/builder' },
    { label: 'Rewrite Bullets (SAR)', href: '/tools/sar-rewriter' },
  ],
  resume: [
    { label: 'Build My Resume', href: '/resume/builder' },
    { label: 'Run ATS Resume Check', href: '/resume/ats-checker' },
    { label: 'Rewrite Bullets (SAR)', href: '/tools/sar-rewriter' },
  ],
  linkedin: [
    { label: 'Scan My LinkedIn', href: '/linkedin-review' },
    { label: 'LinkedIn Makeover', href: '/linkedin-makeover' },
    { label: 'Rewrite Bullets (SAR)', href: '/tools/sar-rewriter' },
  ],
  templates: [
    { label: 'Pick a Resume Template', href: '/resume/builder' },
    { label: 'Validate With ATS Check', href: '/resume/ats-checker' },
  ],
};

const COVER_POOL = [
  { src: '/templates/ats-friendly-professional-resume-template-1.png', theme: 'resume' },
  { src: '/templates/modern-creative-cv-layout-template-2.png', theme: 'resume' },
  { src: '/templates/executive-leadership-resume-design-3.png', theme: 'ats' },
  { src: '/templates/entry-level-graduate-resume-format-4.png', theme: 'resume' },
  { src: '/templates/tech-software-engineer-resume-template-5.png', theme: 'ats' },
  { src: '/templates/minimalist-clean-resume-builder-template-6.png', theme: 'resume' },
  { src: '/templates/marketing-manager-creative-resume-7.png', theme: 'resume' },
  { src: '/templates/finance-accounting-professional-cv-8.png', theme: 'ats' },
  { src: '/templates/data-science-analytics-resume-template-9.png', theme: 'resume' },
  { src: '/templates/healthcare-medical-resume-format-10.png', theme: 'resume' },
  { src: '/templates/project-manager-agile-resume-template-11.png', theme: 'resume' },
  { src: '/templates/sales-executive-resume-layout-12.png', theme: 'resume' },
  { src: '/templates/customer-success-resume-design-13.png', theme: 'resume' },
  { src: '/templates/freelance-consultant-cv-template-14.png', theme: 'resume' },
  { src: '/templates/academic-research-cv-format-15.png', theme: 'resume' },
  { src: '/linkedin-save-pdf-guide.png', theme: 'linkedin' },
  { src: '/linkedin-makeover.png', theme: 'linkedin' },
  { src: '/hero-images/ats-optimized-resume-builder-preview.webp', theme: 'resume' },
  { src: '/hero-images/professional-resume-template-ats-friendly.webp', theme: 'resume' },
  { src: '/hero-images/ai-resume-builder-job-application-template.webp', theme: 'ats' },
  { src: '/hero-images/resume-template-interview-call-rate-boost.webp', theme: 'resume' },
];

function slugHash(slug) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function estimateReadTime(content) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(6, Math.round(words / 220));
  return `${mins} min read`;
}

function pickCoverForPost(post, idx) {
  const h = slugHash(post.slug) + idx;
  const candidates =
    post.type === 'linkedin'
      ? COVER_POOL.filter((c) => c.theme === 'linkedin')
      : post.type === 'templates'
        ? COVER_POOL.filter((c) => c.theme !== 'linkedin')
        : post.type === 'ats'
          ? COVER_POOL.filter((c) => c.theme === 'ats' || c.theme === 'resume')
          : COVER_POOL.filter((c) => c.theme === 'resume' || c.theme === 'ats');

  const picked = candidates[h % candidates.length] || COVER_POOL[0];
  const alt = `${post.title} cover image showing an ATS-friendly resume example and RESUGROW optimization workflow`;
  return { src: picked.src, alt };
}

function buildScreenshots(post, idx) {
  const base = slugHash(post.slug) + idx * 7;
  const a = COVER_POOL[base % COVER_POOL.length];
  const b = COVER_POOL[(base + 5) % COVER_POOL.length];

  const makeAlt = (src, focus) =>
    `${post.title} screenshot ${focus} illustrating ${post.category} best practices for recruiters and ATS parsing`;

  const makeCaption = (focus) =>
    `${focus}: example visual used to explain ${post.category.toLowerCase()} improvements.`;

  return [
    { src: a.src, alt: makeAlt(a.src, 'overview'), caption: makeCaption('Overview') },
    { src: b.src, alt: makeAlt(b.src, 'example'), caption: makeCaption('Example') },
  ];
}

function toolLinksForType(type) {
  if (type === 'linkedin') return TOOL_LINKS.linkedin;
  if (type === 'templates') return TOOL_LINKS.templates;
  if (type === 'ats') return TOOL_LINKS.ats;
  return TOOL_LINKS.resume;
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) return tags;
  return String(tags || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

function buildFaqs(post) {
  const common = [
    {
      q: 'How long does it take to fix this?',
      a: 'Most users see meaningful improvement in under 30 minutes: fix the top-third, rewrite 2–3 bullets, and align keywords to one target role.',
    },
    {
      q: 'Which RESUGROW tool should I use first?',
      a:
        post.type === 'linkedin'
          ? 'Start with LinkedIn Review for a score breakdown, then apply fixes in LinkedIn Makeover.'
          : 'Start with ATS Checker to diagnose, then edit in Resume Builder and validate again.',
    },
  ];

  if (post.type === 'score') {
    return [
      {
        q: `Is a resume score of ${post.score} good?`,
        a:
          post.score >= 80
            ? 'It is competitive, but you can still improve conversion by tightening alignment and adding quantified impact.'
            : 'It usually indicates missing keywords, weak impact evidence, or formatting issues that reduce ATS match and recruiter confidence.',
      },
      ...common,
    ];
  }

  if (post.type === 'templates') {
    return [
      {
        q: 'Do templates affect ATS performance?',
        a: 'Yes. Over-designed layouts often break parsing. A clean, single-column template with standard headings is the safest.',
      },
      ...common,
    ];
  }

  if (post.type === 'linkedin') {
    return [
      {
        q: 'What changes increase LinkedIn profile views fastest?',
        a: 'A keyword-rich headline, a structured About section, and quantified experience bullets usually create the biggest lift.',
      },
      ...common,
    ];
  }

  return common;
}

function buildHowToSteps(post) {
  if (post.type === 'linkedin') {
    return [
      { title: 'Fix headline keywords', text: 'Use role + specialty + outcome to improve search visibility.' },
      { title: 'Upgrade About section', text: 'Write a short story with 2–3 metrics that prove impact.' },
      { title: 'Add proof in Experience', text: 'Rewrite your first 2 bullets with measurable outcomes and tools.' },
    ];
  }
  if (post.type === 'templates') {
    return [
      { title: 'Choose one-column layout', text: 'Prioritize ATS readability and recruiter scan speed.' },
      { title: 'Use standard headings', text: 'Work Experience, Education, Skills, Projects, Certifications.' },
      { title: 'Validate with ATS scan', text: 'Run a check to confirm extraction and keyword match.' },
    ];
  }
  if (post.type === 'score') {
    return [
      { title: 'Run ATS check', text: 'Identify missing keywords and weak modules.' },
      { title: 'Rewrite 2–3 bullets', text: 'Use SAR formatting with metrics and tools.' },
      { title: 'Re-scan and finalize', text: 'Confirm score lift before applying.' },
    ];
  }
  return [
    { title: 'Diagnose with ATS', text: 'Scan to find the top issues blocking interviews.' },
    { title: 'Edit with structure', text: 'Fix formatting, rewrite the top-third, and align skills.' },
    { title: 'Tailor and submit', text: 'Match one target job and validate before sending.' },
  ];
}

function paragraph(text) {
  return String(text || '').trim();
}

function generateBlogContent(post) {
  const ctaAts = `[Check your resume score](/resume/ats-checker)`;
  const ctaBuilder = `[build your resume in RESUGROW](/resume/builder)`;
  const ctaLinkedIn = `[scan your LinkedIn profile](/linkedin-review)`;
  const ctaSar = `[rewrite your bullets with SAR](/tools/sar-rewriter)`;

  const booster = `
## The advanced checklist (the stuff most guides skip)

If you already fixed the basics, these are the checks that usually unlock the next jump in responses:

**1. Extraction sanity**
Open the extracted text from your PDF. If you see mixed ordering, missing dates, or broken bullet indentation, simplify formatting. ATS systems prioritize predictable structure over “design.”

**2. Keyword mapping that does not feel forced**
Pull 12–18 high-signal terms from the job description. These are usually:
role keywords, core tools, domain nouns, and required methods. Place them where they belong:
Summary, Skills, and the first bullets in your most recent role. Avoid repeating them everywhere.

**3. Proof density in the first 8 lines**
Recruiters decide fast. Your first 8–12 lines should contain at least:
one role identity statement, one domain signal, and one measurable impact point.

**4. Date and title consistency**
Inconsistent dates create doubt. Use one format everywhere (e.g., "Mar 2023 – Present"). Keep titles accurate and aligned with what you want next.

**5. “So what” clarity**
If a bullet does not imply business value, upgrade it. The simplest upgrade is adding scope and outcome:
volume, time, money, risk reduction, reliability, conversion, engagement, quality.

## How to find metrics even if you “don’t have numbers”

Most people do have numbers. They just do not label them as numbers. Look for:
1. Volume: users, customers, tickets, accounts, campaigns, requests, leads.
2. Speed: cycle time, time-to-resolution, release frequency, turnaround time.
3. Quality: error rate, defect rate, incident count, NPS, CSAT.
4. Money: revenue, budget, savings, CAC, LTV, margin.
5. Risk: SLA, compliance, downtime, fraud, churn.

If you cannot share exact numbers, use safe ranges or directional impact:
"~", "about", "in the low thousands", "double-digit %".

## Keyword alignment workflow you can repeat for every application

1. Copy the job description into a scratch doc.
2. Highlight all tools, methods, and domain nouns.
3. Pick the top 12 terms that match your real experience.
4. Ensure the top 12 show up across Summary, Skills, and Experience (naturally).
5. Run ${ctaAts} to validate match and extraction.

This is how you tailor without rewriting your entire resume every time.

## Example upgrades (patterns that increase recruiter confidence)

Weak: "Responsible for dashboards."

Strong: "Built weekly KPI dashboard used by leadership to prioritize roadmap bets; reduced decision latency from 10 days to 3."

Weak: "Worked with stakeholders."

Strong: "Partnered with cross-functional stakeholders to define requirements and deliver releases on time; improved cycle time by 18%."

Weak: "Improved system performance."

Strong: "Optimized backend performance to cut p95 latency by 32% and reduce infra cost by 14%."

## FAQs (quick answers)

**Should I use Word or PDF?**
Use PDF unless a role explicitly requests Word. Always keep a DOCX backup for legacy systems.

**How many keywords should I add?**
Aim for 12–18 high-signal terms per role, used naturally. Proof beats stuffing.

**How long should my resume be?**
One page for early career. Two pages is fine when page two adds real proof (projects, leadership scope, publications).

**Do templates matter for ATS?**
Yes. One-column, standard headings, and simple spacing improve extraction and ranking reliability.

**What is the fastest way to improve bullets?**
Rewrite the first 2 bullets under your most recent role with SAR and metrics. Use ${ctaSar}.

## Next step (do this now)

Pick one target role, run ${ctaAts}, apply the fixes in ${ctaBuilder}, and re-scan. Repeat until the result is stable and recruiter-ready.`;

  const intro = paragraph(
    `${post.excerpt} This guide is written to be applied in one sitting: diagnose the exact gap, fix the highest-leverage sections first, and validate the result before you apply again.`
  );

  const common = `
${intro}

## What recruiters and ATS systems are looking for in 2026

Most hiring funnels now have two gates: machine parsing (ATS extraction and matching) and human scan (clarity, credibility, and role fit). Your goal is not to “sound impressive.” Your goal is to remove doubt quickly.

In practical terms, that means:
1. A clear target role and keyword alignment.
2. A top-third that summarizes fit in 10 seconds.
3. Evidence: metrics, scope, tools, and outcomes.
4. A layout that extracts cleanly from PDF.

If you want the fast path, start with ${ctaAts}, fix only the bottom-scoring areas, then ${ctaBuilder}.`;

  if (post.type === 'score') {
    const score = post.score;
    const band =
      score >= 90 ? 'elite' : score >= 80 ? 'strong' : score >= 70 ? 'competitive' : score >= 60 ? 'average' : 'low';
    const scoreHook =
      band === 'elite'
        ? 'You are already in the top tier. The next lift comes from tailoring and proof density.'
        : band === 'strong'
          ? 'You are close. Small edits in keywords and impact writing can create a disproportionate response lift.'
          : band === 'competitive'
            ? 'You have a workable baseline, but missing alignment usually suppresses interview conversion.'
            : band === 'average'
              ? 'Recruiters will see potential, but ATS matching and proof signals are likely under-leveraged.'
              : 'You are likely being filtered out early due to missing fundamentals, weak bullets, or formatting issues.';

    return `
${common}

## What a resume score of ${score} usually means

${scoreHook}

A “resume score” is best interpreted as a conversion proxy. It typically reflects:
1. Formatting and extraction reliability (parser confidence).
2. Keyword coverage against target roles (match %).
3. Impact evidence in bullets (metrics and outcomes).
4. Section completeness and clarity (scan speed).

## Why your score can be high in one area and low overall

It is common to see a high “Completeness” score while the overall score remains low. Completeness often measures presence of sections. Overall score penalizes content quality and relevance much more heavily.

Example: a resume with all sections but vague bullets (“responsible for…”) can be “complete” yet still weak in proof and relevance. This is exactly why you should validate with ${ctaAts} and not rely on one metric.

## The 4 levers that move your score the fastest

**Lever 1: Target role alignment**
Pick one role family. Mirror the job description language where it is true.

**Lever 2: Proof density**
Add scope and outcomes: %, $, time saved, volume handled, team size, latency, conversion.

**Lever 3: Top-third clarity**
Your title, summary, and key skills should answer “why you” instantly.

**Lever 4: ATS-safe formatting**
One column, standard headings, consistent dates, no text boxes.

## A 30-minute fix plan

1. Run ${ctaAts} against a target job description.
2. Rewrite your summary into 3–5 lines: role, specialty, 2 metrics.
3. Upgrade the first 2 bullets in your most recent role using ${ctaSar}.
4. Add missing keywords into Skills and those two bullets.
5. Re-scan until the score and extraction stabilize.

## Before and after examples (copy the pattern)

Weak: "Worked on marketing campaigns."

Strong: "Optimized paid acquisition across Google and Meta, improving ROAS by 34% and reducing CAC by 18% over 90 days."

Weak: "Managed a team."

Strong: "Led a team of 6 across product and engineering to ship 3 releases, reducing incident rate by 27%."

## Checklist: what to audit before you apply again

1. The job title you want appears in the top third.
2. The top 10 keywords from the JD appear naturally in Summary, Skills, and Experience.
3. Every recent role has at least one quantified outcome.
4. Dates are consistent and easy to scan.
5. PDF extraction keeps section order intact.

## Final CTA

If you want a measurable lift this week: ${ctaAts}, then ${ctaBuilder}, then validate again.

${booster}`;
  }

  if (post.type === 'job') {
    const role = post.role || post.title.replace(' Resume Guide', '').replace('(Examples + Keywords)', '').trim();
    return `
${common}

## The winning ${role} resume strategy

The best resumes for ${role} roles do three things well:
1. Show role-specific keywords without stuffing.
2. Prove outcomes with metrics, not adjectives.
3. Reduce recruiter interpretation effort with clean structure.

## What to include (the sections that matter)

**Summary (3–5 lines)**
State your role identity, domain, and 2 achievements.

**Skills**
Group by category: Tools, Platforms, Languages, Methods. Keep it role-accurate.

**Experience**
Use 3–5 bullets per role. Your first two bullets carry the most weight.

**Projects (optional)**
Only if they add proof that your experience section cannot.

## Keywords and phrasing recruiters search for

Your keywords should match the job description language. Use the exact names of tools, platforms, and methods. Keep them in Skills and reinforce them inside your most impactful bullets.

## Bullet writing formula (SAR)

Situation: context and scope.
Action: what you did.
Result: measurable impact.

Upgrade bullets fast with ${ctaSar}.

## Example bullets for ${role}

Weak: "Built features and fixed bugs."

Strong: "Shipped 6 production features and reduced error rate by 22% by improving logging, tests, and rollout strategy."

Weak: "Collaborated with stakeholders."

Strong: "Partnered with cross-functional stakeholders to define requirements and deliver on-time releases, improving cycle time by 18%."

## Common mistakes that suppress interviews

1. Listing tools without outcomes.
2. Using generic responsibilities instead of results.
3. Mixing unrelated role families in one resume.
4. Over-designed templates that break ATS parsing.

## Fast path: build, validate, tailor

1. ${ctaBuilder} with a clean template.
2. Validate using ${ctaAts}.
3. Tailor your top-third and 3 bullets per application.

## Final CTA

Build a role-accurate ${role} resume in minutes: ${ctaBuilder}. Then verify it against a target job using ${ctaAts}.

${booster}`;
  }

  if (post.type === 'experience') {
    const years = post.yearsLabel;
    return `
${common}

## The right resume strategy for ${years}

The ideal structure changes with experience. Recruiters scan for different signals depending on seniority.

## What matters most at this stage

1. Clear role identity: the role you want next, not every role you have ever done.
2. Proof: outcomes and scope, especially in the most recent 2 roles.
3. Relevance: remove older details that do not support your next role.

## Section-by-section guidance

**Summary**
If you have ${years}, keep it specific and evidence-backed. Include 2–3 metrics.

**Experience**
Prioritize the last 3–5 years. Older roles should have fewer bullets unless they are highly relevant.

**Skills**
List only what you would be comfortable discussing in an interview.

## Example: weak vs strong positioning

Weak: "Hardworking professional seeking opportunities."

Strong: "Product Manager with ${years} delivering payments and fintech products; drove $10M annualized impact via conversion and retention improvements."

## ATS-safe formatting checklist

1. Use one column.
2. Use standard headings.
3. Avoid tables, text boxes, and icons.
4. Keep dates consistent.

## Final CTA

Start with ${ctaBuilder}, then validate with ${ctaAts}.

${booster}`;
  }

  if (post.type === 'skill') {
    const skill = post.skill;
    return `
${common}

## Why "${skill}" needs proof, not just a mention

Recruiters see thousands of resumes that list ${skill} without any evidence. Proof makes your skill real.

## Where to add ${skill} in your resume

1. Skills section: list it under the right category (Languages, Tools, Platforms).
2. Experience bullets: show how you used it to create outcomes.
3. Projects: add a short project line only if it adds credibility.

## Strong examples you can adapt

Weak: "${skill}"

Strong: "Used ${skill} to automate reporting, cutting manual effort by 6 hours per week and improving data accuracy."

Weak: "Worked with ${skill}."

Strong: "Built ${skill}-based workflow that improved throughput by 28% and reduced rework."

## The anti-pattern: keyword stuffing

Adding ${skill} 12 times does not help if it is not connected to outcomes. One strong bullet is worth more than repeated mentions.

## Quick upgrade workflow

1. Identify 1–2 achievements where ${skill} was essential.
2. Rewrite those bullets using ${ctaSar}.
3. Validate keyword match with ${ctaAts}.

## Final CTA

Use ${ctaSar} to turn generic skill claims into measurable bullets, then run ${ctaAts} to confirm alignment.

${booster}`;
  }

  if (post.type === 'linkedin') {
    return `
${common}

## The LinkedIn optimization order that works

LinkedIn visibility is a mix of completeness and keywords. But in practice, these sections drive the biggest lift:
1. Custom URL + name clarity
2. Headline keywords and hook
3. About section depth
4. Experience proof (SAR bullets)
5. Skills + endorsements

## Headline formula (copy this)

[Role] | [Specialty] | [Outcome]

Example: "Product Manager | FinTech & Payments | Shipping conversion lifts and retention wins"

## About section structure (simple and effective)

Paragraph 1: who you are and what you do.
Paragraph 2: 2–3 wins with numbers.
Paragraph 3: what you are looking for + how to contact you.

## Experience: make it recruiter-proof

Your first two bullets under your current role matter most. Use the same SAR format as a resume. If your bullets are vague, recruiters assume low ownership.

## Skills and credibility signals

Add role-relevant skills, prioritize your top 3, and get endorsements. It improves search matching and trust.

## Fast path (5 steps)

1. ${ctaLinkedIn} for a baseline score.
2. Fix headline with keywords.
3. Rewrite About to 250–400 words with 2 metrics.
4. Rewrite 2 experience bullets using ${ctaSar}.
5. Re-scan until the score and suggestions stabilize.

## Final CTA

If you want a data-driven plan and exact rewrites, start with ${ctaLinkedIn}.

${booster}`;
  }

  if (post.type === 'ats') {
    return `
${common}

## Why resumes fail ATS (the real reasons)

Most ATS failures come from one of three issues:
1. Extraction breaks because formatting is complex.
2. Keywords are missing or too generic.
3. Proof is weak, so ranking stays low even if keywords exist.

## The fix sequence (do this in order)

**Step 1: Validate extraction**
Open the extracted text. If section order is wrong, simplify formatting.

**Step 2: Map keywords**
Take the top 10–15 skills and phrases from the job description and mirror them naturally.

**Step 3: Increase proof density**
Rewrite 2–3 bullets with metrics and scope.

## What to change first

1. Summary: role + domain + 2 wins.
2. Skills: grouped and role-accurate.
3. First bullets in most recent role: measurable outcomes.

## Final CTA

Diagnose the exact issue in minutes with ${ctaAts}, then apply fixes in ${ctaBuilder}.

${booster}`;
  }

  // templates
  return `
${common}

## What makes a resume template ATS-friendly

ATS-friendly templates share the same traits:
1. Single-column layout.
2. Standard headings (Work Experience, Education, Skills).
3. No text boxes, tables, or decorative icons.
4. Consistent dates and spacing.

## One-page vs two-page templates

Use one page if your experience is under 5 years or you can keep only high-signal proof.
Use two pages when the second page adds measurable leadership scope, publications, patents, or high-value projects.

## Template checklist (quick audit)

1. Can the resume be read top-to-bottom without sidebars?
2. Are headings plain text (not images)?
3. Are bullets readable in extracted text?
4. Are skills grouped and role-relevant?

## Final CTA

Pick a clean template in ${ctaBuilder} and validate it with ${ctaAts}.

${booster}`;
}

const BLOG_50_CONFIG = [
  // Resume score series
  { slug: 'resume-score-50-fix', title: 'Resume Score 50: What It Means + How to Improve', category: 'ATS Optimization', date: 'January 8, 2023', author: 'Kavya Sharma', authorRole: 'Product Lead, RESUGROW', authorInitials: 'KS', authorColor: '#2563eb', excerpt: 'Low resume score? Learn why and how to fix it fast.', coverEmoji: '📊', tags: 'ATS, Resume Score', type: 'score', score: 50, primaryTool: 'ats' },
  { slug: 'resume-score-60-improve', title: "Resume Score 60: Why You're Not Getting Calls", category: 'ATS Optimization', date: 'February 14, 2023', author: 'Daniel Osei', authorRole: 'Senior Career Coach', authorInitials: 'DO', authorColor: '#7c3aed', excerpt: 'Improve your resume score from average to interview-ready.', coverEmoji: '📊', tags: 'ATS, Resume Tips', type: 'score', score: 60, primaryTool: 'ats' },
  { slug: 'resume-score-70-guide', title: 'Resume Score 70: Is It Good Enough?', category: 'ATS Optimization', date: 'March 22, 2023', author: 'Nadia Okonkwo', authorRole: 'LinkedIn Growth Strategist', authorInitials: 'NO', authorColor: '#0891b2', excerpt: 'Find out if your resume score is competitive.', coverEmoji: '📊', tags: 'ATS, Resume', type: 'score', score: 70, primaryTool: 'ats' },
  { slug: 'resume-score-80-tips', title: 'Resume Score 80: How to Reach 90+', category: 'ATS Optimization', date: 'April 5, 2023', author: 'Marcus Webb', authorRole: 'Executive Recruiter, 12 years', authorInitials: 'MW', authorColor: '#059669', excerpt: "You're close to perfect, here’s how to get there.", coverEmoji: '📊', tags: 'ATS, Optimization', type: 'score', score: 80, primaryTool: 'ats' },
  { slug: 'resume-score-90-examples', title: 'Resume Score 90: What Top Resumes Do', category: 'ATS Optimization', date: 'May 17, 2023', author: 'Tara Lindqvist', authorRole: 'Hiring Manager & Career Writer', authorInitials: 'TL', authorColor: '#d97706', excerpt: 'Learn from high-performing resumes.', coverEmoji: '📊', tags: 'Resume, ATS', type: 'score', score: 90, primaryTool: 'ats' },

  // Role guides
  { slug: 'software-engineer-resume', title: 'Software Engineer Resume Guide (Examples + Keywords)', category: 'Resume Guides', date: 'June 30, 2023', author: 'Sofia Reyes', authorRole: 'Software Engineer & Career Writer', authorInitials: 'SR', authorColor: '#dc2626', excerpt: 'Build a resume that gets developer interviews.', coverEmoji: '💻', tags: 'Resume, Developer', type: 'job', role: 'Software Engineer', primaryTool: 'resume' },
  { slug: 'data-analyst-resume', title: 'Data Analyst Resume Guide (Examples + Keywords)', category: 'Resume Guides', date: 'July 11, 2023', author: 'Rohan Mehta', authorRole: 'Career Strategy Lead', authorInitials: 'RM', authorColor: '#6d28d9', excerpt: 'Optimize your resume for data roles.', coverEmoji: '📊', tags: 'Data, Resume', type: 'job', role: 'Data Analyst', primaryTool: 'resume' },
  { slug: 'product-manager-resume', title: 'Product Manager Resume Guide', category: 'Resume Guides', date: 'August 23, 2023', author: 'Priya Nair', authorRole: 'Head of Product, RESUGROW', authorInitials: 'PN', authorColor: '#1d4ed8', excerpt: 'Stand out as a product manager.', coverEmoji: '📦', tags: 'PM, Resume', type: 'job', role: 'Product Manager', primaryTool: 'resume' },
  { slug: 'marketing-manager-resume', title: 'Marketing Manager Resume Guide', category: 'Resume Guides', date: 'September 4, 2023', author: 'Kavya Sharma', authorRole: 'Product Lead, RESUGROW', authorInitials: 'KS', authorColor: '#2563eb', excerpt: 'Improve your marketing resume.', coverEmoji: '📢', tags: 'Marketing, Resume', type: 'job', role: 'Marketing Manager', primaryTool: 'resume' },
  { slug: 'sales-resume-guide', title: 'Sales Executive Resume Guide', category: 'Resume Guides', date: 'October 19, 2023', author: 'Daniel Osei', authorRole: 'Senior Career Coach', authorInitials: 'DO', authorColor: '#7c3aed', excerpt: 'Win more sales interviews.', coverEmoji: '💼', tags: 'Sales, Resume', type: 'job', role: 'Sales Executive', primaryTool: 'resume' },

  // Experience-level guides
  { slug: 'resume-0-years', title: 'Resume for Freshers (0 Years Experience)', category: 'Resume Guides', date: 'November 7, 2023', author: 'Nadia Okonkwo', authorRole: 'LinkedIn Growth Strategist', authorInitials: 'NO', authorColor: '#0891b2', excerpt: 'Best resume format for freshers.', coverEmoji: '🎓', tags: 'Fresher, Resume', type: 'experience', yearsLabel: '0 years', primaryTool: 'resume' },
  { slug: 'resume-1-year', title: 'Resume for 1 Year Experience', category: 'Resume Guides', date: 'December 2, 2023', author: 'Marcus Webb', authorRole: 'Executive Recruiter, 12 years', authorInitials: 'MW', authorColor: '#059669', excerpt: 'Early career resume tips.', coverEmoji: '🎓', tags: 'Resume', type: 'experience', yearsLabel: '1 year', primaryTool: 'resume' },
  { slug: 'resume-3-years', title: 'Resume for 3 Years Experience', category: 'Resume Guides', date: 'January 15, 2024', author: 'Tara Lindqvist', authorRole: 'Hiring Manager & Career Writer', authorInitials: 'TL', authorColor: '#d97706', excerpt: 'Optimize your mid-level resume.', coverEmoji: '💼', tags: 'Resume', type: 'experience', yearsLabel: '3 years', primaryTool: 'resume' },
  { slug: 'resume-5-years', title: 'Resume for 5 Years Experience', category: 'Resume Guides', date: 'February 28, 2024', author: 'Sofia Reyes', authorRole: 'Software Engineer & Career Writer', authorInitials: 'SR', authorColor: '#dc2626', excerpt: 'Level up your resume with sharper proof.', coverEmoji: '💼', tags: 'Resume', type: 'experience', yearsLabel: '5 years', primaryTool: 'resume' },
  { slug: 'resume-10-years', title: 'Resume for 10+ Years Experience', category: 'Resume Guides', date: 'March 12, 2024', author: 'Rohan Mehta', authorRole: 'Career Strategy Lead', authorInitials: 'RM', authorColor: '#6d28d9', excerpt: 'Executive resume strategy and leadership proof.', coverEmoji: '💼', tags: 'Resume', type: 'experience', yearsLabel: '10+ years', primaryTool: 'resume' },

  // Skills optimization
  { slug: 'python-skill-resume', title: 'How to Add Python in Resume', category: 'Skills Optimization', date: 'April 24, 2024', author: 'Priya Nair', authorRole: 'Head of Product, RESUGROW', authorInitials: 'PN', authorColor: '#1d4ed8', excerpt: 'Showcase Python effectively with proof and outcomes.', coverEmoji: '🐍', tags: 'Skills, Resume', type: 'skill', skill: 'Python', primaryTool: 'ats' },
  { slug: 'sql-skill-resume', title: 'How to Add SQL in Resume', category: 'Skills Optimization', date: 'May 8, 2024', author: 'Kavya Sharma', authorRole: 'Product Lead, RESUGROW', authorInitials: 'KS', authorColor: '#2563eb', excerpt: 'Highlight SQL skills properly for data-driven roles.', coverEmoji: '📊', tags: 'Skills, Resume', type: 'skill', skill: 'SQL', primaryTool: 'ats' },
  { slug: 'communication-skills-resume', title: 'How to Add Communication Skills', category: 'Skills Optimization', date: 'June 19, 2024', author: 'Daniel Osei', authorRole: 'Senior Career Coach', authorInitials: 'DO', authorColor: '#7c3aed', excerpt: 'Avoid generic soft skills and show real communication impact.', coverEmoji: '💬', tags: 'Skills', type: 'skill', skill: 'Communication', primaryTool: 'ats' },
  { slug: 'leadership-skills-resume', title: 'How to Add Leadership Skills', category: 'Skills Optimization', date: 'July 3, 2024', author: 'Nadia Okonkwo', authorRole: 'LinkedIn Growth Strategist', authorInitials: 'NO', authorColor: '#0891b2', excerpt: 'Show leadership through outcomes, scope, and ownership.', coverEmoji: '👥', tags: 'Skills', type: 'skill', skill: 'Leadership', primaryTool: 'ats' },
  { slug: 'ai-skills-resume', title: 'How to Add AI Skills in Resume', category: 'Skills Optimization', date: 'August 14, 2024', author: 'Marcus Webb', authorRole: 'Executive Recruiter, 12 years', authorInitials: 'MW', authorColor: '#059669', excerpt: 'Add AI skills effectively without keyword stuffing.', coverEmoji: '🤖', tags: 'AI, Resume', type: 'skill', skill: 'AI / Machine Learning', primaryTool: 'ats' },

  // LinkedIn optimization
  { slug: 'linkedin-headline-fresher', title: 'LinkedIn Headline Examples for Freshers', category: 'LinkedIn Optimization', date: 'September 26, 2024', author: 'Tara Lindqvist', authorRole: 'Hiring Manager & Career Writer', authorInitials: 'TL', authorColor: '#d97706', excerpt: 'Improve your LinkedIn headline to show role fit instantly.', coverEmoji: '👤', tags: 'LinkedIn', type: 'linkedin', primaryTool: 'linkedin' },
  { slug: 'linkedin-headline-developer', title: 'LinkedIn Headlines for Developers', category: 'LinkedIn Optimization', date: 'October 9, 2024', author: 'Sofia Reyes', authorRole: 'Software Engineer & Career Writer', authorInitials: 'SR', authorColor: '#dc2626', excerpt: 'Stand out to recruiters with keyword-rich developer headlines.', coverEmoji: '👤', tags: 'LinkedIn', type: 'linkedin', primaryTool: 'linkedin' },
  { slug: 'linkedin-about-examples', title: 'LinkedIn About Section Examples', category: 'LinkedIn Optimization', date: 'November 21, 2024', author: 'Rohan Mehta', authorRole: 'Career Strategy Lead', authorInitials: 'RM', authorColor: '#6d28d9', excerpt: 'Write a powerful summary that gets profile views and replies.', coverEmoji: '👤', tags: 'LinkedIn', type: 'linkedin', primaryTool: 'linkedin' },
  { slug: 'linkedin-summary-students', title: 'LinkedIn Summary for Students', category: 'LinkedIn Optimization', date: 'December 5, 2024', author: 'Priya Nair', authorRole: 'Head of Product, RESUGROW', authorInitials: 'PN', authorColor: '#1d4ed8', excerpt: 'Best student summaries with clear positioning and proof.', coverEmoji: '👤', tags: 'LinkedIn', type: 'linkedin', primaryTool: 'linkedin' },
  { slug: 'linkedin-profile-optimize', title: 'LinkedIn Profile Optimization Guide', category: 'LinkedIn Optimization', date: 'January 17, 2025', author: 'Kavya Sharma', authorRole: 'Product Lead, RESUGROW', authorInitials: 'KS', authorColor: '#2563eb', excerpt: 'Boost recruiter visibility with a structured optimization plan.', coverEmoji: '👁️', tags: 'LinkedIn', type: 'linkedin', primaryTool: 'linkedin' },

  // ATS troubleshooting
  { slug: 'why-resume-fails-ats', title: 'Why Your Resume Fails ATS', category: 'ATS Optimization', date: 'February 6, 2025', author: 'Daniel Osei', authorRole: 'Senior Career Coach', authorInitials: 'DO', authorColor: '#7c3aed', excerpt: 'Common ATS rejection reasons and what to fix first.', coverEmoji: '⚠️', tags: 'ATS', type: 'ats', primaryTool: 'ats' },
  { slug: 'resume-not-shortlisted', title: 'Resume Not Getting Shortlisted?', category: 'ATS Optimization', date: 'March 20, 2025', author: 'Nadia Okonkwo', authorRole: 'LinkedIn Growth Strategist', authorInitials: 'NO', authorColor: '#0891b2', excerpt: 'Fix the most common rejection issues fast.', coverEmoji: '⚠️', tags: 'Resume', type: 'ats', primaryTool: 'ats' },
  { slug: 'resume-formatting-ats', title: 'Fix Resume Formatting for ATS', category: 'ATS Optimization', date: 'April 11, 2025', author: 'Marcus Webb', authorRole: 'Executive Recruiter, 12 years', authorInitials: 'MW', authorColor: '#059669', excerpt: 'Improve formatting so ATS extraction stays clean.', coverEmoji: '📄', tags: 'ATS', type: 'ats', primaryTool: 'ats' },
  { slug: 'resume-keywords-missing', title: 'Missing Keywords in Resume?', category: 'ATS Optimization', date: 'May 29, 2025', author: 'Tara Lindqvist', authorRole: 'Hiring Manager & Career Writer', authorInitials: 'TL', authorColor: '#d97706', excerpt: 'Add the correct keywords without sounding forced.', coverEmoji: '🔍', tags: 'ATS', type: 'ats', primaryTool: 'ats' },
  { slug: 'how-recruiters-read-resume', title: 'How Recruiters Scan Your Resume', category: 'ATS Optimization', date: 'June 13, 2025', author: 'Sofia Reyes', authorRole: 'Software Engineer & Career Writer', authorInitials: 'SR', authorColor: '#dc2626', excerpt: 'Understand recruiter behavior and optimize for the 6-second scan.', coverEmoji: '👁️', tags: 'Resume', type: 'ats', primaryTool: 'ats' },

  // Templates
  { slug: 'resume-templates-fresher', title: 'Best Resume Templates for Freshers', category: 'Templates', date: 'July 25, 2025', author: 'Rohan Mehta', authorRole: 'Career Strategy Lead', authorInitials: 'RM', authorColor: '#6d28d9', excerpt: 'Top fresher templates that stay clean and ATS-friendly.', coverEmoji: '📄', tags: 'Templates', type: 'templates', primaryTool: 'templates' },
  { slug: 'resume-templates-developers', title: 'Resume Templates for Developers', category: 'Templates', date: 'August 7, 2025', author: 'Priya Nair', authorRole: 'Head of Product, RESUGROW', authorInitials: 'PN', authorColor: '#1d4ed8', excerpt: 'Developer templates that emphasize projects and impact.', coverEmoji: '💻', tags: 'Templates', type: 'templates', primaryTool: 'templates' },
  { slug: 'resume-templates-managers', title: 'Resume Templates for Managers', category: 'Templates', date: 'September 18, 2025', author: 'Kavya Sharma', authorRole: 'Product Lead, RESUGROW', authorInitials: 'KS', authorColor: '#2563eb', excerpt: 'Professional templates designed for leadership roles.', coverEmoji: '💼', tags: 'Templates', type: 'templates', primaryTool: 'templates' },
  { slug: 'ats-friendly-templates', title: 'Best ATS-Friendly Resume Templates', category: 'Templates', date: 'October 30, 2025', author: 'Daniel Osei', authorRole: 'Senior Career Coach', authorInitials: 'DO', authorColor: '#7c3aed', excerpt: 'Templates that pass ATS and still look premium.', coverEmoji: '📄', tags: 'ATS, Templates', type: 'templates', primaryTool: 'templates' },
  { slug: 'one-page-resume-templates', title: 'Best One Page Resume Templates', category: 'Templates', date: 'November 12, 2025', author: 'Nadia Okonkwo', authorRole: 'LinkedIn Growth Strategist', authorInitials: 'NO', authorColor: '#0891b2', excerpt: 'Compact formats that stay recruiter-friendly.', coverEmoji: '📄', tags: 'Templates', type: 'templates', primaryTool: 'templates' },
  { slug: 'two-page-resume-templates', title: 'Best Two Page Resume Templates', category: 'Templates', date: 'December 24, 2025', author: 'Marcus Webb', authorRole: 'Executive Recruiter, 12 years', authorInitials: 'MW', authorColor: '#059669', excerpt: 'Detailed formats for senior and specialist roles.', coverEmoji: '📄', tags: 'Templates', type: 'templates', primaryTool: 'templates' },

  // Additional posts to reach 50 (high-intent roles + score coverage)
  { slug: 'resume-score-40-meaning', title: 'Resume Score 40: Why You’re Being Filtered Out', category: 'ATS Optimization', date: 'January 9, 2023', author: 'Tara Lindqvist', authorRole: 'Hiring Manager & Career Writer', authorInitials: 'TL', authorColor: '#d97706', excerpt: 'A score of 40 usually indicates foundational issues. Fix them fast.', coverEmoji: '📉', tags: 'ATS, Resume Score', type: 'score', score: 40, primaryTool: 'ats' },
  { slug: 'resume-score-95-secrets', title: 'Resume Score 95: What Elite Candidates Do Differently', category: 'ATS Optimization', date: 'February 21, 2023', author: 'Sofia Reyes', authorRole: 'Software Engineer & Career Writer', authorInitials: 'SR', authorColor: '#dc2626', excerpt: 'Learn the final refinements that push a strong resume into elite territory.', coverEmoji: '🏆', tags: 'ATS, Resume Score', type: 'score', score: 95, primaryTool: 'ats' },
  { slug: 'data-scientist-resume', title: 'Data Scientist Resume Guide (Examples + Keywords)', category: 'Resume Guides', date: 'March 3, 2024', author: 'Rohan Mehta', authorRole: 'Career Strategy Lead', authorInitials: 'RM', authorColor: '#6d28d9', excerpt: 'Position ML projects and business impact for data science roles.', coverEmoji: '🧠', tags: 'Data Science, Resume', type: 'job', role: 'Data Scientist', primaryTool: 'resume' },
  { slug: 'devops-engineer-resume', title: 'DevOps Engineer Resume Guide (Examples + Keywords)', category: 'Resume Guides', date: 'April 16, 2024', author: 'Priya Nair', authorRole: 'Head of Product, RESUGROW', authorInitials: 'PN', authorColor: '#1d4ed8', excerpt: 'Show reliability, scale, and automation outcomes for DevOps.', coverEmoji: '🛠️', tags: 'DevOps, Resume', type: 'job', role: 'DevOps Engineer', primaryTool: 'resume' },
  { slug: 'ui-ux-designer-resume', title: 'UI/UX Designer Resume Guide (Examples + Keywords)', category: 'Resume Guides', date: 'May 30, 2023', author: 'Kavya Sharma', authorRole: 'Product Lead, RESUGROW', authorInitials: 'KS', authorColor: '#2563eb', excerpt: 'Present design process and measurable UX impact cleanly.', coverEmoji: '🎨', tags: 'Design, Resume', type: 'job', role: 'UI/UX Designer', primaryTool: 'resume' },
  { slug: 'business-analyst-resume', title: 'Business Analyst Resume Guide (Examples + Keywords)', category: 'Resume Guides', date: 'June 11, 2025', author: 'Daniel Osei', authorRole: 'Senior Career Coach', authorInitials: 'DO', authorColor: '#7c3aed', excerpt: 'Highlight analysis, stakeholder alignment, and outcomes.', coverEmoji: '📈', tags: 'Business Analyst, Resume', type: 'job', role: 'Business Analyst', primaryTool: 'resume' },
  { slug: 'project-manager-resume', title: 'Project Manager Resume Guide (Examples + Keywords)', category: 'Resume Guides', date: 'July 22, 2024', author: 'Nadia Okonkwo', authorRole: 'LinkedIn Growth Strategist', authorInitials: 'NO', authorColor: '#0891b2', excerpt: 'Show delivery, risk management, and on-time outcomes.', coverEmoji: '🗓️', tags: 'Project Management, Resume', type: 'job', role: 'Project Manager', primaryTool: 'resume' },
  { slug: 'customer-success-manager-resume', title: 'Customer Success Manager Resume Guide (Examples + Keywords)', category: 'Resume Guides', date: 'August 4, 2023', author: 'Marcus Webb', authorRole: 'Executive Recruiter, 12 years', authorInitials: 'MW', authorColor: '#059669', excerpt: 'Show retention, expansion, and customer outcomes with metrics.', coverEmoji: '🤝', tags: 'Customer Success, Resume', type: 'job', role: 'Customer Success Manager', primaryTool: 'resume' },
  { slug: 'finance-analyst-resume', title: 'Finance Analyst Resume Guide (Examples + Keywords)', category: 'Resume Guides', date: 'September 15, 2025', author: 'Tara Lindqvist', authorRole: 'Hiring Manager & Career Writer', authorInitials: 'TL', authorColor: '#d97706', excerpt: 'Highlight modeling, forecasting, and decision impact.', coverEmoji: '💹', tags: 'Finance, Resume', type: 'job', role: 'Finance Analyst', primaryTool: 'resume' },
  { slug: 'hr-manager-resume', title: 'HR Manager Resume Guide (Examples + Keywords)', category: 'Resume Guides', date: 'October 27, 2023', author: 'Sofia Reyes', authorRole: 'Software Engineer & Career Writer', authorInitials: 'SR', authorColor: '#dc2626', excerpt: 'Show hiring outcomes, process improvements, and people impact.', coverEmoji: '🧩', tags: 'HR, Resume', type: 'job', role: 'HR Manager', primaryTool: 'resume' },
  { slug: 'operations-manager-resume', title: 'Operations Manager Resume Guide (Examples + Keywords)', category: 'Resume Guides', date: 'November 8, 2024', author: 'Rohan Mehta', authorRole: 'Career Strategy Lead', authorInitials: 'RM', authorColor: '#6d28d9', excerpt: 'Show throughput, process design, and cost savings clearly.', coverEmoji: '⚙️', tags: 'Operations, Resume', type: 'job', role: 'Operations Manager', primaryTool: 'resume' },
  { slug: 'graphic-designer-resume', title: 'Graphic Designer Resume Guide (Examples + Keywords)', category: 'Resume Guides', date: 'December 19, 2023', author: 'Priya Nair', authorRole: 'Head of Product, RESUGROW', authorInitials: 'PN', authorColor: '#1d4ed8', excerpt: 'Show portfolio context, tools, and measurable creative outcomes.', coverEmoji: '🖼️', tags: 'Design, Resume', type: 'job', role: 'Graphic Designer', primaryTool: 'resume' },
  { slug: 'data-engineer-resume', title: 'Data Engineer Resume Guide (Examples + Keywords)', category: 'Resume Guides', date: 'January 31, 2025', author: 'Kavya Sharma', authorRole: 'Product Lead, RESUGROW', authorInitials: 'KS', authorColor: '#2563eb', excerpt: 'Highlight pipelines, reliability, and performance metrics.', coverEmoji: '🧱', tags: 'Data Engineering, Resume', type: 'job', role: 'Data Engineer', primaryTool: 'resume' },
  { slug: 'cybersecurity-analyst-resume', title: 'Cybersecurity Analyst Resume Guide (Examples + Keywords)', category: 'Resume Guides', date: 'February 13, 2024', author: 'Daniel Osei', authorRole: 'Senior Career Coach', authorInitials: 'DO', authorColor: '#7c3aed', excerpt: 'Show risk reduction, monitoring, and incident response outcomes.', coverEmoji: '🛡️', tags: 'Cybersecurity, Resume', type: 'job', role: 'Cybersecurity Analyst', primaryTool: 'resume' },
];

export const programmaticPosts = BLOG_50_CONFIG.map((seed, idx) => {
  const post = {
    ...seed,
    tags: normalizeTags(seed.tags),
    toolLinks: toolLinksForType(seed.primaryTool || seed.type),
  };

  const content = generateBlogContent(post);
  const readTime = seed.readTime || estimateReadTime(content);
  const cover = pickCoverForPost(post, idx);
  const screenshots = buildScreenshots(post, idx);

  return {
    ...post,
    readTime,
    content,
    coverImage: cover.src,
    coverAlt: cover.alt,
    screenshots,
    faqs: buildFaqs(post),
    howToSteps: buildHowToSteps(post),
  };
});
