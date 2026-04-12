export const platformFaqs = [

  // ─────────────────────────────────────────────
  // GETTING STARTED
  // ─────────────────────────────────────────────

  {
    category: "Getting Started",
    q: "Is Resugrow beginner-friendly?",
    a: "Absolutely. Resugrow is built as a guided, step-by-step workflow — not a blank editor that leaves you guessing what to do next. Whether you are building your very first resume or overhauling a stale one, the platform walks you through every stage in priority order: upload or build your resume, run an ATS scan against a job description, identify the highest-impact gaps, apply AI-assisted rewrites, and then check your score again to confirm the improvement. You do not need a background in HR, professional resume writing, or recruiting to get meaningful results. The scoring engine tells you exactly what is working, what is not, and — critically — why. Most users see a measurable score improvement within the first 15 minutes of using the platform."
  },
  {
    category: "Getting Started",
    q: "What should I use first: the Resume Builder, ATS Checker, or LinkedIn tools?",
    a: "For the vast majority of users, the optimal sequence is: (1) Build or upload your resume first to establish your baseline document. (2) Run the ATS Checker against a target job description to generate your match score, keyword gap report, and section-by-section improvement priorities. (3) Apply the suggested rewrites and fixes until your score crosses the 80%+ threshold. (4) Move to the LinkedIn optimization tools to align your profile with the language and positioning you established in your resume. This sequence matters because your resume is the source of truth — everything else should reinforce it. Recruiters who find you on LinkedIn and then open your resume expect to see a coherent, consistent professional narrative across both touchpoints. Building that narrative in your resume first and propagating it outward is the most efficient path to a strong, aligned job search presence."
  },
  {
    category: "Getting Started",
    q: "How long does it take to get a fully optimized resume using Resugrow?",
    a: "For a resume that already exists and needs optimization rather than a full rebuild, most users complete the core ATS optimization cycle — upload, scan, fix, rescan — in 20 to 40 minutes per job application. For users building a resume from scratch using the guided builder, expect 45 to 90 minutes for a complete first draft depending on years of experience and how much detail you input. The most time-intensive part of the process is writing strong, quantified achievement bullets — Resugrow's SAR Rewriter significantly reduces this time by generating achievement-structured rewrites that you then personalize with your real numbers and context. The key insight is that optimization is not a one-time event: the most effective users run a fresh ATS scan for every job they apply to and make targeted tweaks per application, a process that takes 5 to 10 minutes once your base document is in good shape."
  },
  {
    category: "Getting Started",
    q: "Do I need to upload a job description to use Resugrow?",
    a: "For the Resume Builder and cover letter tools, a job description is optional — you can build and improve your resume as a general document without targeting a specific role. However, for the ATS Checker and keyword gap analysis features, a job description is essential and transforms the output from generic advice into precise, role-specific intelligence. When you paste a job description, the platform performs a two-way analysis: it evaluates your resume against that specific role's required keywords, seniority language, and competency signals, and it generates a match score and prioritized fix list that is entirely unique to that role. The difference in output quality between a job-description-paired scan and a general scan is significant — we strongly recommend always pairing your ATS check with a real job posting from the role you are applying to."
  },
  {
    category: "Getting Started",
    q: "Can I use Resugrow if I am switching careers or industries?",
    a: "Yes — Resugrow is particularly well-suited for career pivoters because the ATS gap analysis explicitly surfaces which required skills in your target role are present in your resume and which are missing. For career changers, this gap report serves as both a resume optimization guide and a professional development roadmap. The platform's AI rewriting tools are also specifically useful for career pivoters who need to reframe existing experience in the vocabulary of a new industry — translating transferable skills from the language of your past into the language of your future. The cover letter generator includes transition-specific framing options that help you address the 'why the change' narrative that career pivot applications require. If you are pivoting, treat Resugrow's gap report as your honest assessment of where you stand and what you need to close before your target role's application filter."
  },

  // ─────────────────────────────────────────────
  // ATS SCORING & ANALYSIS
  // ─────────────────────────────────────────────

  {
    category: "ATS Scoring & Analysis",
    q: "How accurate are Resugrow's ATS scores?",
    a: "Resugrow's scoring engine is deterministic and rule-based, which means two critical things: first, identical input always produces an identical score — there is no random variation or black-box ambiguity; second, every change you make to your resume has a traceable, measurable effect on a specific scoring module, so you can see exactly which edits moved the needle and by how much. The scoring model is built around the same core logic used by enterprise ATS platforms — keyword frequency and placement, section structure, parse-friendliness, and skills coverage — and is continuously calibrated against real-world hiring data. While no third-party tool can perfectly replicate the proprietary algorithm of every ATS platform (Workday, Greenhouse, Taleo, iCIMS all have unique variations), Resugrow's score is the most reliable proxy available for understanding and improving your competitive position before you submit an application."
  },
  {
    category: "ATS Scoring & Analysis",
    q: "What score should I aim for before submitting my application?",
    a: "As a benchmark, aim for a minimum score of 75% before submitting to a competitive role, and ideally 80–90% for senior or high-volume positions where ATS filtering is most aggressive. Scores below 65% carry a high probability of automatic archiving before a recruiter ever sees your resume. That said, score targets should be calibrated to context: a highly specialized role with 40 very specific keyword requirements is harder to score perfectly on than a broad generalist role; a perfect 100% score often indicates over-optimization or keyword stuffing rather than genuine improvement. The practical goal is to close the most significant keyword gaps and achieve strong coverage of the role's must-have requirements — not to achieve an artificial perfect score at the expense of natural, readable language."
  },
  {
    category: "ATS Scoring & Analysis",
    q: "Why is my score different for two jobs with the same title?",
    a: "This is completely expected and is actually one of the most important insights Resugrow provides. Two job postings with identical titles — say, 'Senior Marketing Manager' — can have dramatically different keyword requirements depending on the company's industry, stack, and specific team needs. One posting may prioritize 'Google Analytics,' 'A/B testing,' and 'SEO'; another may prioritize 'Salesforce,' 'pipeline management,' and 'B2B demand generation.' Your resume's alignment with each of those distinct keyword sets will produce different scores. This is precisely why submitting the same unmodified resume to every application is a losing strategy. Resugrow's per-job-description analysis gives you the exact roadmap to customize your resume for each specific role — a targeted resume consistently outperforms a generic one in ATS matching by a significant margin."
  },
  {
    category: "ATS Scoring & Analysis",
    q: "What exactly does the ATS scanner look for?",
    a: "Resugrow's ATS scanner evaluates your resume across several distinct dimensions simultaneously. On the keyword dimension, it checks whether the specific skills, tools, methodologies, and qualifications mentioned in the job description appear in your resume, and scores them based on frequency, placement (experience bullets carry more weight than a standalone skills list), and recency (skills in recent roles are weighted higher than those in roles from 10+ years ago). On the structure dimension, it assesses whether your resume follows the clean, single-column, standard-section format that ATS parsers are designed to process — flagging issues like multi-column layouts, tables, headers/footers, and non-standard section names. On the content quality dimension, it evaluates whether bullets are achievement-oriented versus task-descriptive, whether metrics are present, and whether the professional summary is targeted and keyword-rich. Finally, it checks technical compliance: file format compatibility, appropriate length, font readability, and absence of ATS-confusing design elements."
  },
  {
    category: "ATS Scoring & Analysis",
    q: "Can I optimize for a specific industry or job function?",
    a: "Yes. Industry targeting is a core feature of the ATS analysis engine. When you paste a job description, the platform identifies the industry context, role function, and seniority level from the language and requirements, and prioritizes the keywords and competency signals most relevant to that specific combination. A software engineering role in fintech will surface different critical keywords than a software engineering role in healthtech, even if the technical stack overlaps — the domain language, compliance terminology, and business context keywords differ significantly. This means you receive industry-calibrated guidance rather than generic advice that treats all roles as interchangeable. If you are targeting multiple industries simultaneously, running separate ATS scans for each job posting type gives you a clear picture of how your current resume performs across different sector expectations."
  },
  {
    category: "ATS Scoring & Analysis",
    q: "Does Resugrow analyze the entire resume or just the skills section?",
    a: "Resugrow analyzes the full document end to end. Every section of your resume contributes to the scoring model: the professional summary is evaluated for keyword density and positioning strength; each role in the work experience section is assessed for achievement quality, quantification, keyword integration, and recency weighting; the skills section is checked for coverage of required competencies; education, certifications, and additional sections are scanned for relevant qualifications. Critically, the platform does not treat keyword presence as binary — it tracks where in the document a keyword appears and weights that placement accordingly. A keyword found in a recent, substantive experience bullet is scored more favorably than the same keyword appearing only in a skills list or in a role from a decade ago. This granular, section-level analysis is what enables Resugrow to generate specific, prioritized fix recommendations rather than a vague overall impression."
  },
  {
    category: "ATS Scoring & Analysis",
    q: "How is Resugrow different from a normal resume template website?",
    a: "Template websites solve exactly one problem: visual presentation. They provide a formatted starting point that looks professional, but they stop entirely at design. Resugrow treats resume quality as a multi-dimensional challenge that design alone cannot address. The platform layers intelligence on top of structure: an ATS scoring engine that tells you precisely how a machine will evaluate your document before a human ever sees it; a keyword gap analysis that identifies exactly which required skills are missing or underrepresented; a SAR Rewriter that transforms generic task descriptions into quantified, achievement-focused bullets; a cover letter generator that creates role-targeted companion documents; and LinkedIn optimization tools that extend your professional narrative beyond the resume itself. The result is not just a resume that looks good — it is a resume that is engineered to pass the automated filters, persuade the human reviewer, and create a coherent impression across every channel a recruiter uses to evaluate you."
  },

  // ─────────────────────────────────────────────
  // RESUME BUILDER & WRITING TOOLS
  // ─────────────────────────────────────────────

  {
    category: "Resume Builder & Writing Tools",
    q: "Can Resugrow help me improve weak bullet points quickly?",
    a: "Yes — the SAR Rewriter is specifically designed for this. It takes a weak, responsibility-style bullet ('Managed social media accounts for the company') and transforms it into a structured, achievement-oriented statement following the Situation-Action-Result framework ('Overhauled social media strategy for a stagnant 8K-follower account, growing organic reach by 280% and driving a 45% increase in inbound leads over two quarters'). The rewriter generates a strong structural foundation; you then layer in your real numbers, specific tools, and precise context to make it authentically yours. This two-step process — AI generates the achievement frame, you add the authentic data — consistently produces stronger bullets than either pure AI output or purely manual writing, and typically takes 2 to 3 minutes per bullet compared to 15 to 20 minutes of manual drafting from scratch."
  },
  {
    category: "Resume Builder & Writing Tools",
    q: "What is the SAR method and why does Resugrow use it?",
    a: "SAR stands for Situation, Action, Result — a three-part framework for constructing resume bullet points that communicate real professional value rather than just listing job duties. The 'Situation' provides just enough context to make the achievement meaningful (the scale of the project, the problem being solved, or the environment); the 'Action' describes what you specifically did and how; and the 'Result' delivers the quantifiable impact. Resugrow uses SAR as the structural foundation for all AI-generated rewrites because it is the framework most closely aligned with how recruiters and hiring managers actually evaluate resume content. A recruiter scanning a resume is trying to answer one question for each bullet: 'What did this person achieve, and does that achievement matter for my role?' SAR answers that question directly and efficiently, in a format that is skimmable in under three seconds and substantive enough to withstand deeper scrutiny in an interview."
  },
  {
    category: "Resume Builder & Writing Tools",
    q: "Do I need to rewrite everything manually after scanning?",
    a: "No. The platform is explicitly designed to minimize the manual rewriting burden. After your ATS scan, the improvement report prioritizes fixes by impact level — highest-impact gaps appear first so you know exactly where to focus your time. For each identified issue, the AI provides a specific rewrite suggestion or improvement direction rather than leaving you to figure it out yourself. You are making targeted, data-backed edits rather than re-evaluating every word from scratch. In practice, most users find that 5 to 8 targeted changes — typically adding 2 to 3 missing keywords in relevant experience bullets, strengthening the professional summary, and adding quantification to 2 to 3 underperforming bullets — are sufficient to move from a mediocre score to a competitive one. The platform handles the diagnostic work so you can focus your effort precisely where it produces the most return."
  },
  {
    category: "Resume Builder & Writing Tools",
    q: "Can I upload my existing resume instead of building from scratch?",
    a: "Yes. Resugrow accepts resume uploads in DOCX and PDF formats and parses them into the platform's structured format, preserving your existing content while making it editable and analyzable. After uploading, you can run an immediate ATS scan to establish a baseline score, then edit individual sections directly within the platform using the same guided tools available to users who built from scratch. The upload process typically takes under 60 seconds, and the ATS scan on an uploaded resume begins producing results in approximately 30 seconds. If the parsing is imperfect on a heavily formatted or complex resume, the platform flags specific sections for manual review so you can correct any data that was misextracted before running your score analysis."
  },
  {
    category: "Resume Builder & Writing Tools",
    q: "How does the Resume Builder handle different resume formats (chronological, hybrid)?",
    a: "The Resume Builder defaults to the reverse-chronological format — the universally preferred structure for ATS compatibility and recruiter readability — but includes configurable layout options for candidates who need a hybrid structure. The hybrid option generates a document that leads with a robust professional summary and categorized skills section before flowing into a complete, reverse-chronological work history. This makes it appropriate for career pivoters, returnees from career breaks, and senior professionals with broad cross-functional experience who benefit from foregrounding their competencies. The platform does not support the functional resume format by design — because functional resumes are heavily penalized by modern ATS systems and broadly considered a red flag by experienced recruiters, Resugrow intentionally steers users toward the formats that produce the best real-world outcomes."
  },
  {
    category: "Resume Builder & Writing Tools",
    q: "Does Resugrow help me write a professional summary?",
    a: "Yes. The professional summary generator creates a targeted, 3 to 5 sentence summary based on the role you are targeting, your years of experience, your primary skills, and your strongest recent achievement. The generated summary is specifically engineered to include the highest-priority keywords from your target job description, open with a specific professional identity statement rather than a generic buzzword cluster, and include at least one quantified achievement to immediately signal impact. Because the professional summary is the single highest-read section of any resume — and one of the highest-weighted sections in ATS scoring — getting it right is disproportionately valuable. The generator produces a strong baseline summary that you personalize with your actual numbers, specific accomplishments, and authentic voice before finalizing."
  },
  {
    category: "Resume Builder & Writing Tools",
    q: "Can I create multiple versions of my resume for different roles?",
    a: "Yes, and this is not just supported — it is actively encouraged and considered best practice. Resugrow allows you to save multiple resume versions under distinct job-target profiles, so you can maintain a 'Software Engineer — Backend' version, a 'Technical Lead' version, and a 'Product Engineer' version simultaneously, each optimized for a different job description cluster. This is important because each distinct role type may require different keyword priorities, different bullet point emphasis, and even a different professional summary framing. Maintaining a library of targeted resume versions means you can respond to new job postings quickly with a document that is already 80%+ optimized, requiring only minor tweaks rather than a full re-optimization from scratch."
  },

  // ─────────────────────────────────────────────
  // COVER LETTER
  // ─────────────────────────────────────────────

  {
    category: "Cover Letter",
    q: "Does Resugrow generate cover letters?",
    a: "Yes. Resugrow includes an AI-powered cover letter generator that produces role-targeted, professionally structured cover letters based on three inputs: your resume content, the specific job description you are applying for, and optional contextual details you choose to provide (such as a specific achievement you want to highlight or a career transition you want to address). The generated letter is structured in the most effective format: a compelling, personalized opening hook that avoids the generic 'I am writing to apply...' opener; a body section that draws direct lines between your most relevant experience and the employer's stated needs; and a confident, forward-looking close with a specific call to action. The AI does not generate a template with placeholder text — it produces a substantive, contextually specific draft that typically requires 10 to 15 minutes of personalization to make fully authentic before sending."
  },
  {
    category: "Cover Letter",
    q: "How personalized are the generated cover letters?",
    a: "The cover letter generator uses both your resume content and the specific job description as primary inputs, which means every generated letter is unique to the specific combination of your background and the target role — not a generic template applied uniformly. The AI identifies the three to four most relevant intersections between your experience and the role's stated requirements, and builds the letter around those specific alignment points. It also picks up on company-specific language from the job description — product names, mission-related phrasing, industry terminology — and incorporates it naturally into the letter to demonstrate contextual awareness. The output is a strong, specific first draft. We recommend adding one piece of company-specific research you found independently (a recent product launch, a press release, a strategic initiative) to demonstrate genuine interest that the AI could not have generated on your behalf."
  },
  {
    category: "Cover Letter",
    q: "Should I still write a cover letter if the job posting says it is optional?",
    a: "In most cases, yes — particularly if you are a career changer, have an employment gap to address, are making a geographic relocation, or are applying to a company whose culture and mission you want to directly address. 'Optional' in a job posting typically means that applications without a cover letter will not be automatically disqualified — it does not mean that a well-written, targeted cover letter will not create a meaningful positive impression. Research on recruiter behavior consistently shows that a genuine, specific, well-written cover letter increases callback rates when it reaches a human reviewer — and with Resugrow generating a strong first draft in under 60 seconds, the effort cost of submitting one is minimal. The only context where skipping a cover letter is clearly the right choice is when an ATS pre-screen asks whether a cover letter is included and the application portal provides no mechanism to attach one."
  },

  // ─────────────────────────────────────────────
  // LINKEDIN OPTIMIZATION
  // ─────────────────────────────────────────────

  {
    category: "LinkedIn Optimization",
    q: "How does Resugrow help optimize my LinkedIn profile?",
    a: "Resugrow's LinkedIn optimization tools address the platform's most critical ranking and impression-driving elements. For discoverability, the tool analyzes your current headline and suggests keyword-rich alternatives that balance recruiter search optimization with compelling human readability — because your headline is the first thing displayed in every recruiter search result and connection request. For the 'About' section, the AI generates a first-person narrative summary that communicates your professional identity, signature achievement, and value proposition in the warm, conversational register that LinkedIn's format suits. The tool also surfaces the highest-priority skills to pin in your Skills section based on your target roles, and flags profile completeness gaps (missing featured content, absent certifications, incomplete education) that suppress your LinkedIn 'All-Star' algorithm score. The overarching goal is LinkedIn-resume narrative alignment so recruiters experience a coherent, consistent professional identity across every touchpoint."
  },
  {
    category: "LinkedIn Optimization",
    q: "Why does my LinkedIn profile need to be optimized separately from my resume?",
    a: "Your resume and LinkedIn profile serve different functions and reach different audiences, which means the same content needs to be formatted and framed differently for each. Your resume is a concise, ATS-optimized, formal document designed to be read in one sitting by a recruiter who already has your application in hand. Your LinkedIn profile is a publicly searchable, algorithmically ranked digital presence that needs to attract passive discovery from recruiters who do not yet know you exist, sustain the attention of professional peers who visit your profile, and communicate your value in a warmer, more narrative, first-person voice. LinkedIn's algorithm also has its own ranking logic — separate from any ATS — that rewards profile completeness, keyword density in the headline and summary, connection count, endorsement volume, and content engagement. Optimizing your resume does not automatically optimize your LinkedIn profile, but having a well-optimized resume makes optimizing your LinkedIn significantly faster because your core positioning and keyword strategy are already defined."
  },

  // ─────────────────────────────────────────────
  // HUMAN RECRUITER IMPACT
  // ─────────────────────────────────────────────

  {
    category: "Human Recruiter Impact",
    q: "Will this help with both ATS systems and human recruiters?",
    a: "Yes — that dual optimization is the core design principle of Resugrow, and it is what distinguishes the platform from tools that optimize for only one of the two audiences. ATS optimization and human recruiter optimization are not the same challenge. A resume that is perfectly keyword-matched but written in dense, jargon-heavy, unreadable prose will pass the ATS filter and immediately lose the human reviewer. Conversely, a beautifully written, creatively formatted resume that a recruiter would love may never reach a human because it failed the ATS parse. Resugrow addresses both layers: the ATS layer through keyword analysis, section structure validation, and parse-friendliness checks; and the human layer through achievement-oriented bullet rewrites, quantification guidance, professional summary optimization, and overall document readability. Every recommendation the platform makes is evaluated for its impact on both audiences simultaneously."
  },
  {
    category: "Human Recruiter Impact",
    q: "How does Resugrow improve the 6-second recruiter scan?",
    a: "Research on recruiter eye-tracking behavior shows that a human reviewer spends approximately 6 seconds on the initial scan of a resume before deciding whether to read further or move on. During those 6 seconds, they typically look at: the candidate's most recent job title and company, the professional summary or first visible content block, and the overall visual structure of the document (is it clean and scannable, or dense and overwhelming). Resugrow improves performance on all three of these dimensions. The platform optimizes the professional summary to front-load your most relevant credentials in the first sentence. It structures experience bullets for visual scannability — ensuring they are appropriately concise, lead with strong action verbs, and contain visible numbers that the eye naturally gravitates toward. And it validates that the overall document layout is clean, appropriately spaced, and free of the visual clutter (dense paragraphs, inconsistent formatting, excessive length) that causes reviewers to abandon a resume in those critical first seconds."
  },

  // ─────────────────────────────────────────────
  // KEYWORD OPTIMIZATION
  // ─────────────────────────────────────────────

  {
    category: "Keyword Optimization",
    q: "What is the difference between keyword stuffing and legitimate keyword optimization?",
    a: "Keyword stuffing is the practice of artificially forcing job description terms into a resume in an excessive, unnatural, or deceptive manner — such as repeating a skill 8 times across the document, hiding white-font keyword blocks in the footer, or listing 60 skills in a wall of text with no supporting evidence. Modern ATS platforms detect frequency anomalies and semantic inconsistencies, and experienced human recruiters immediately recognize stuffed resumes as lacking genuine depth. Legitimate keyword optimization, by contrast, involves identifying the 8 to 12 most critical keywords in a job description and ensuring they each appear naturally — once or twice — in the context of substantive, achievement-oriented bullet points that demonstrate real experience with those skills. Resugrow's recommendations are always in the legitimate optimization category: the platform identifies missing keywords and suggests specific experience bullets where they can be integrated authentically, never advising repetitive or deceptive insertion."
  },
  {
    category: "Keyword Optimization",
    q: "How do I know which keywords from the job description are the most important to include?",
    a: "Resugrow's keyword gap analysis automatically prioritizes this for you. When you paste a job description, the platform performs a weighted keyword extraction that distinguishes between must-have keywords (skills and qualifications appearing in the 'Required' section, mentioned multiple times, or expressed as explicit minimum requirements) and nice-to-have keywords (skills in the 'Preferred' section, mentioned once, or framed as 'a plus'). The gap report shows you which of your priority-weighted keywords are already present in your resume, which are absent entirely, and which appear but in a weak position (e.g., only in a skills list rather than in an experience bullet). This prioritized gap list means you can focus your editing time on the keywords that will move your score the most, rather than trying to address every single term in the job description equally."
  },
  {
    category: "Keyword Optimization",
    q: "Should I tailor my resume for every single job application?",
    a: "For roles you are genuinely prioritizing — companies you want to work for, roles that represent a meaningful career step — yes, tailoring your resume to each specific job description is the single most impactful thing you can do to improve your callback rate. A resume tailored to a specific job description consistently scores 20 to 40 percentage points higher on ATS matching than a generic version of the same resume, and that gap frequently represents the difference between being filtered out and being reviewed. For lower-priority applications or roles that are closely related to your primary target, a lighter tailoring approach — updating the professional summary and adding 2 to 3 specific missing keywords — can achieve a meaningful improvement with significantly less effort. Resugrow's multi-version resume management feature is specifically designed to make targeted tailoring fast: you maintain a base document and generate targeted variants in minutes rather than starting from scratch each time."
  },

  // ─────────────────────────────────────────────
  // PRIVACY & DATA
  // ─────────────────────────────────────────────

  {
    category: "Privacy & Data",
    q: "Is my resume data secure on Resugrow?",
    a: "Yes. Resugrow treats your professional and personal data with the highest standard of security and privacy. All data transmitted to and from the platform is encrypted in transit using TLS (Transport Layer Security), and stored data is encrypted at rest. Your resume content — which contains sensitive personal information including your employment history, contact details, and professional background — is never sold to third parties, shared with employers, or used to train external AI models without your explicit consent. You retain full ownership of all content you create or upload on the platform. For users in privacy-regulated regions, Resugrow's data practices are designed to comply with applicable data protection frameworks. You can delete your account and all associated data at any time through your account settings."
  },
  {
    category: "Privacy & Data",
    q: "Can employers or recruiters see my resume on Resugrow?",
    a: "No. Resugrow is a candidate-side tool — your resume and all analysis reports are private to your account by default. There is no recruiter-facing marketplace or public profile feature on the platform; nothing you create, upload, or optimize on Resugrow is visible to employers or recruiters unless you explicitly choose to share it directly (by exporting your resume and sending it yourself). This is an intentional design choice: Resugrow's purpose is to equip you with a superior document and preparation before you engage with employers on your own terms — not to create another job board or talent marketplace where your profile is browsable."
  },

  // ─────────────────────────────────────────────
  // EXPORTS & COMPATIBILITY
  // ─────────────────────────────────────────────

  {
    category: "Exports & Compatibility",
    q: "What file formats can I export my resume in?",
    a: "Resugrow supports export in PDF and DOCX formats. PDF is the recommended format for the vast majority of online applications submitted through an ATS portal — it preserves formatting exactly as designed and is universally readable across operating systems and devices. However, because Resugrow's builder generates ATS-optimized, clean-structure PDFs with selectable, machine-readable text (rather than image-scanned or design-heavy PDFs that confuse parsers), you get both visual consistency and ATS compatibility in a single file. DOCX export is available for situations where an application explicitly requests a Word document, where a career center or mentor needs to track changes and add comments, or where you want to do additional formatting customization outside the platform. Both formats are generated from the same optimized content, so the underlying quality is identical regardless of which you choose."
  },
  {
    category: "Exports & Compatibility",
    q: "Will my Resugrow resume parse correctly in all ATS platforms?",
    a: "Resugrow's resume templates and builder are specifically engineered around ATS parse compatibility across the major enterprise platforms — including Workday, Greenhouse, Lever, iCIMS, Taleo, BambooHR, and SmartRecruiters. The structural rules embedded in the platform (single-column layout, standard section headings, clean font stack, no tables or text boxes, no headers/footers for critical content, selectable text in PDF output) are derived directly from the technical specifications that these platforms' parsing engines are designed around. While no tool can guarantee perfect parsing across every ATS configuration — because some companies customize their platform's field-mapping and threshold settings — a resume built with Resugrow's guidelines will perform significantly better across all major ATS platforms than one built with design-first tools like Canva, Novoresume in visual mode, or complex Word templates with multi-column formatting."
  },

  // ─────────────────────────────────────────────
  // SPECIFIC USER SITUATIONS
  // ─────────────────────────────────────────────

  {
    category: "Specific User Situations",
    q: "I have an employment gap on my resume. How does Resugrow help me handle it?",
    a: "Resugrow addresses employment gaps through two mechanisms. First, the platform's professional summary generator includes gap-contextualizing framing options that allow you to lead with your skills, accomplishments, and professional identity rather than implicitly foregrounding the gap through a purely chronological opening. Second, the resume builder guides you on how to represent activities during gap periods — freelance or contract work, certifications earned, courses completed, caregiving responsibilities, volunteer leadership, or entrepreneurial ventures — as legitimate resume entries with dates, framing the gap period as purposeful rather than empty. The cover letter generator also includes transition-specific prompts that help you craft a confident, forward-looking gap explanation for roles where addressing it directly is strategically appropriate. The platform never advises concealing a gap through date manipulation — it helps you present your actual history in the strongest, most contextually honest framing possible."
  },
  {
    category: "Specific User Situations",
    q: "I am a recent graduate with limited work experience. Is Resugrow useful for me?",
    a: "Yes — and the earlier in your career you optimize your resume, the greater the compounding benefit. Recent graduates typically face the challenge of building a competitive resume when formal work experience is limited, which requires strategically presenting internships, academic projects, research experience, extracurricular leadership, volunteer work, and relevant coursework in the most professional and achievement-focused format possible. Resugrow's SAR Rewriter works equally well on internship bullet points, research project contributions, and academic achievements as it does on corporate work experience. The ATS scanning tools help recent graduates understand exactly which skills they need to highlight (or still need to develop) for their target entry-level roles. Additionally, the keyword gap analysis gives new graduates a clear view of which certifications, tools, or skills to prioritize acquiring — effectively functioning as a career development roadmap built from real job market data."
  },
  {
    category: "Specific User Situations",
    q: "I am a senior professional with 15+ years of experience. Will my resume be too long?",
    a: "Resugrow's guidelines for senior professionals are calibrated to real recruiter expectations: a two-page resume is entirely appropriate for candidates with 10 or more years of experience, and a targeted three-page resume can be acceptable at the executive level when breadth and depth of experience genuinely warrants it. The platform will flag content that exceeds optimal length thresholds and recommend consolidation strategies — such as condensing early-career roles into a brief 'Early Career' section, removing roles older than 15 years that are not strategically relevant, and tightening bullet points that are over-explained. The goal is not arbitrary brevity — it is appropriate density. Every line on a senior resume should earn its place by communicating something meaningful about scope, impact, or expertise. Resugrow's editing tools help you identify which content is doing that work and which is occupying space without adding value."
  },
  {
    category: "Specific User Situations",
    q: "I am applying to roles internationally. Can Resugrow help with CV formats for different countries?",
    a: "Yes, with important nuance. In the United States and Canada, 'resume' conventions (1–2 pages, no photo, no date of birth, no marital status) are the professional standard, and Resugrow's builder is fully aligned with these norms. For applications in the United Kingdom, Ireland, Australia, and New Zealand — where 'CV' is used interchangeably with resume and refers to a 2-page professional summary — the platform's output is equally appropriate. For continental European markets (Germany, France, Netherlands, Scandinavia) and certain Asian markets, local conventions differ: some countries expect a photo, some use a Europass standardized format, and some have specific length or section expectations. Resugrow's ATS optimization principles remain applicable regardless of format, but users applying to non-Anglophone markets should research country-specific document conventions and adapt the platform's output accordingly. The AI editing tools make this adaptation process significantly faster than starting from scratch."
  },
  {
    category: "Specific User Situations",
    q: "I have been laid off recently. How should I use Resugrow to re-enter the job market quickly?",
    a: "A layoff situation calls for a specific, high-speed optimization strategy — and Resugrow is well-suited to it. Start by uploading your most current resume and running an ATS scan against the 3 to 5 highest-priority job postings you have identified. Use the gap reports from those scans to identify the pattern of keywords you are consistently missing across multiple job descriptions — these represent the highest-leverage edits to make to your base document because they will improve your score across all similar roles simultaneously. Update your professional summary to reflect your most recent role and its strongest achievement. Use the SAR Rewriter to strengthen the 3 to 5 most impactful bullets in your most recent role, since recruiters will read those first. Export and begin applying within your first session. In parallel, use the LinkedIn optimization tools to update your profile and activate the 'Open to Work' setting for recruiters. The platform's guided workflow is specifically designed to get you from 'stale resume' to 'submission-ready' in a single focused session."
  },
  {
    category: "Specific User Situations",
    q: "I work in a creative field (design, marketing, content). Do I still need to worry about ATS?",
    a: "Yes — and this is one of the most common and costly misconceptions in creative job searching. Even for roles in design, marketing, copywriting, UX, and other creative disciplines at companies with 100+ employees, applications are almost universally processed through an ATS before reaching a human reviewer. The creative industry is not exempt from ATS filtering; what differs is the specific keywords and competencies the ATS is scanning for. A UX designer's ATS checklist looks for: Figma, user research, prototyping, usability testing, design systems, accessibility standards. A content marketer's checklist looks for: SEO, content strategy, editorial calendar management, Google Analytics, HubSpot, conversion optimization. Resugrow identifies these field-specific keyword clusters from your target job descriptions and applies the same optimization logic that works for technical and corporate roles. The ATS-compatible format requirement is universal — even creative roles must have a parseable document alongside any portfolio links."
  },

  // ─────────────────────────────────────────────
  // AI & TECHNOLOGY
  // ─────────────────────────────────────────────

  {
    category: "AI & Technology",
    q: "What AI technology powers Resugrow's writing tools?",
    a: "Resugrow combines deterministic rule-based scoring logic with large language model (LLM) capabilities for its writing and generation features. The ATS scoring engine is intentionally deterministic — it uses explicit, auditable rules derived from real ATS platform behavior and hiring research to produce consistent, explainable scores that do not vary randomly between sessions. The writing tools — SAR Rewriter, professional summary generator, cover letter generator, LinkedIn summary writer — leverage AI language generation to produce human-quality professional content from structured inputs. This hybrid approach is by design: scoring must be transparent and reproducible for users to trust and act on it; writing assistance benefits from the fluency and contextual intelligence that generative AI provides. The combination means you get reliable, explainable analysis paired with high-quality, contextually intelligent content generation."
  },
  {
    category: "AI & Technology",
    q: "Will the AI-generated content sound like me, or will it sound generic?",
    a: "The platform is specifically designed to produce content that functions as a strong, professional first draft — not a final product that gets submitted without personalization. The AI generates content based on the specific inputs you provide (your job history, target role, key achievements, industry), which means the output is contextualized to your background rather than generic. However, authentic personal voice, specific numerical data, and the subtle nuances of your professional personality are elements that only you can add. We recommend the two-step workflow: let the AI generate the structure and professional framing, then spend 10 to 15 minutes adding your real numbers, specific tools, particular achievements, and natural language choices. The result of this collaboration is consistently stronger than either pure AI output or purely manual writing from a blank page — it combines the AI's structural efficiency with your irreplaceable authenticity."
  },
  {
    category: "AI & Technology",
    q: "Does Resugrow use my data to train its AI?",
    a: "No. Your resume content, job descriptions you paste, and any personal information you input are used solely to generate results for your individual session and account. Your data is never used to train Resugrow's AI models, shared with third-party AI providers for training purposes, or incorporated into outputs for other users. This commitment is foundational: your resume contains highly sensitive professional and personal information, and the trust required for you to share it with a platform is only appropriate if the platform uses that information exclusively in your service. Full details on data handling, retention policies, and your rights over your personal information are available in Resugrow's Privacy Policy."
  },

  // ─────────────────────────────────────────────
  // PRICING & ACCESS
  // ─────────────────────────────────────────────

  {
    category: "Pricing & Access",
    q: "Is Resugrow free to use?",
    a: "Resugrow offers a free tier that gives every user access to the core resume building and ATS scanning functionality without requiring payment or a credit card to get started. The free tier is designed to let you experience the full value of the platform's scoring and gap analysis before committing to an upgraded plan. Premium features — including unlimited resume versions, full AI rewriting access, cover letter generation, LinkedIn optimization tools, and priority report delivery — are available through the paid subscription tier. Details on what is included at each access level are available on the pricing page. The philosophy is that every job seeker should be able to understand and improve their ATS performance regardless of budget — and the premium tier is priced to be accessible relative to the career value it delivers."
  },
  {
    category: "Pricing & Access",
    q: "Can I cancel my subscription at any time?",
    a: "Yes. Resugrow subscriptions are month-to-month with no long-term contracts or cancellation penalties. You can cancel at any time through your account settings, and your access to premium features continues through the end of your current billing period. After cancellation, your account reverts to the free tier rather than being deleted — all your saved resumes, versions, and previous scan results remain accessible in read-only mode so your work is never lost. If you cancel and want to resume full premium access, you can reactivate your subscription at any time without losing previously created content."
  },

  // ─────────────────────────────────────────────
  // RESULTS & EFFECTIVENESS
  // ─────────────────────────────────────────────

  {
    category: "Results & Effectiveness",
    q: "How much can my ATS score realistically improve after using Resugrow?",
    a: "The improvement range varies based on starting conditions, but the typical pattern is significant. Users who upload a generic, untailored resume against a specific job description frequently start with scores in the 30 to 55% range. After running through Resugrow's optimization workflow — addressing keyword gaps, restructuring the professional summary, and strengthening the highest-impact bullet points — most users reach the 75 to 90% range within a single optimization session. The most impactful single change is consistently the same: adding the 3 to 5 highest-priority missing keywords from the job description into substantive, contextually appropriate experience bullets. This one action alone typically produces a 15 to 25 percentage point score improvement. Subsequent improvements from structural fixes, summary optimization, and skills section updates typically add another 10 to 20 points."
  },
  {
    category: "Results & Effectiveness",
    q: "Does a higher ATS score guarantee an interview?",
    a: "A higher ATS score significantly increases the probability that your resume reaches a human reviewer — but it does not guarantee an interview, because the human review stage introduces qualitative judgment that no scoring tool can fully predict. ATS optimization removes the automated gatekeeping that silently eliminates the majority of applicants; it does not substitute for the genuine quality of your experience, the strength of your accomplishments, or the overall narrative coherence of your professional story. Think of Resugrow's score as your admission ticket to the game — it gets your resume in front of a recruiter who would not have seen it otherwise. What happens next is determined by the quality of the content, the alignment of your experience with the role's needs, and how well your application competes against other qualified candidates who also passed the filter. Resugrow improves both dimensions: ATS pass rate and human persuasiveness."
  },
  {
    category: "Results & Effectiveness",
    q: "How many job applications should I send to expect an interview?",
    a: "The industry average callback rate for cold online applications (no referral, no connection) is approximately 2 to 3% — meaning most job seekers need to submit 30 to 50 applications to receive 1 to 2 interview requests through this channel alone. With a Resugrow-optimized resume, the goal is to push that callback rate meaningfully higher by ensuring that applications that are genuinely qualified for a role are not being silently filtered out by ATS before reaching a human. Additionally, Resugrow's approach to cover letter generation and professional narrative alignment supports a diversified job search strategy — combining targeted online applications (enhanced by ATS optimization) with networking, direct outreach, and LinkedIn-driven inbound interest — which collectively produces significantly better results than volume-based cold application approaches alone. The platform is not designed to help you apply to more jobs indiscriminately; it is designed to help each application land more effectively."
  },
  {
    category: "Results & Effectiveness",
    q: "Can Resugrow help me prepare for interviews as well?",
    a: "While Resugrow's primary tools are focused on resume optimization, ATS scoring, cover letter generation, and LinkedIn profile improvement, the platform's analysis outputs have significant indirect interview preparation value. The keyword gap report gives you a clear view of the competencies your target role requires most — which maps directly to the skills and experiences you should be most prepared to discuss in behavioral interviews. The SAR-rewritten bullet points in your optimized resume are effectively pre-built STAR interview stories: each quantified, achievement-structured bullet can be expanded into a full STAR response with the situation context and the emotional narrative details that a resume bullet compresses out. We recommend reviewing your Resugrow-optimized resume in depth before any interview and preparing to speak fluently and specifically about every achievement and metric you included — because a strong resume invites detailed follow-up questions about the claims it makes."
  },

  // ─────────────────────────────────────────────
  // PLATFORM & SUPPORT
  // ─────────────────────────────────────────────

  {
    category: "Platform & Support",
    q: "Is Resugrow available on mobile devices?",
    a: "Yes. Resugrow is fully responsive and accessible via any modern mobile browser on iOS and Android devices, with no app download required. The core workflow — uploading a resume, running an ATS scan, viewing the gap report, and reading optimization recommendations — is fully functional on mobile. For longer editing sessions involving significant resume rewriting, a desktop or laptop environment is recommended for typing comfort and overall productivity, but the platform does not restrict any feature based on device type. Many users find mobile access valuable for reviewing their score reports and optimization checklists on the go while their primary editing workflow is desktop-based."
  },
  {
    category: "Platform & Support",
    q: "How often is Resugrow's keyword database and scoring model updated?",
    a: "Resugrow's keyword intelligence and scoring model are updated continuously based on real-world job posting data and recruiter behavior patterns. The technology landscape and keyword expectations in fast-moving fields like software engineering, AI, data science, and digital marketing shift significantly from year to year — skills that were cutting-edge in 2022 may be table stakes in 2025, and entirely new competency categories emerge constantly. Our team monitors job description language patterns across industries and updates the platform's keyword prioritization and scoring logic on a rolling basis to ensure that the guidance you receive reflects current market expectations rather than historical data. When you run an ATS scan on Resugrow, you are receiving analysis calibrated to the current job market, not a static ruleset built years ago."
  },
  {
    category: "Platform & Support",
    q: "What kind of customer support does Resugrow offer?",
    a: "Resugrow provides email-based support for all users, with priority response times for premium subscribers. The platform also includes an in-app help center with written guides covering every feature in detail, video walkthroughs for key workflows (the ATS scanning process, the SAR Rewriter, the cover letter generator), and a searchable FAQ library. For users who encounter technical issues with document parsing, score anomalies, or export formatting, the support team reviews individual cases and typically responds within one business day. Feature requests and product feedback can be submitted directly through the platform and are reviewed by the product team as part of the ongoing development roadmap."
  },
  {
    category: "Platform & Support",
    q: "Can I use Resugrow on behalf of someone else, such as a friend or family member?",
    a: "Yes. A single Resugrow account can be used to create and manage multiple resume profiles, making it practical to help a partner, sibling, student, or mentee optimize their job search materials alongside your own. Career coaches and academic advisors who work with multiple students or clients may find the platform's multi-profile functionality valuable for managing several active job searches from a single account. If you are a career professional supporting clients at scale, please reach out to discuss organizational or team account options that provide appropriate capacity and administrative controls for professional use cases."
  }

];