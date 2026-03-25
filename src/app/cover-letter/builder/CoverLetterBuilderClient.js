'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import EmojiImage from '@/components/UI/EmojiImage';
import styles from './builder.module.css';

const STEPS = [
  'Profile',
  'Target Role',
  'Experience & Story',
  'Strengths & Style',
  'Signature & Finish'
];

const EXPERIENCE_SLABS = [
  { id: 'fresher', label: 'Fresher (0-1 yrs)', min: 0, max: 1 },
  { id: 'junior', label: 'Junior (1-3 yrs)', min: 1, max: 3 },
  { id: 'mid', label: 'Mid-Level (3-6 yrs)', min: 3, max: 6 },
  { id: 'senior', label: 'Senior (6-10 yrs)', min: 6, max: 10 },
  { id: 'lead', label: 'Lead / Principal (10+ yrs)', min: 10, max: 100 }
];

const GAP_SENTENCES = {
  covid: 'During the COVID period, I focused on strengthening my skills and staying aligned with industry developments.',
  upskilling: 'During this time, I invested in structured upskilling to deepen my expertise and prepare for more advanced responsibilities.',
  caretaking: 'During a caregiving phase, I continued learning and maintaining professional discipline to stay prepared for my next role.'
};

const STRENGTH_SENTENCES = {
  Leadership: 'I lead initiatives with clarity and ensure teams stay aligned on outcomes.',
  'Problem-Solving': 'I break down complex problems into actionable solutions and execute effectively.',
  Ownership: 'I take full ownership of tasks and ensure consistent delivery.',
  Communication: 'I communicate clearly across teams to maintain alignment and momentum.',
  'Execution Speed': 'I deliver results efficiently without compromising quality.',
  Adaptability: 'I adapt quickly to changing priorities and environments.',
  Mentorship: 'I support and mentor team members to improve overall team performance.',
  Innovation: 'I continuously look for ways to improve processes and systems.',
  Collaboration: 'I work effectively across teams to achieve shared goals.',
  Strategy: 'I align execution with long-term business objectives.',
  'Customer Focus': 'I prioritize user and customer outcomes in decision-making.',
  Reliability: 'I consistently deliver dependable and high-quality work.',
  'Data Orientation': 'I use data and insights to guide decisions.',
  Resilience: 'I stay composed and effective in high-pressure situations.',
  'Continuous Learning': 'I actively learn and improve to stay relevant and effective.'
};

const STYLE_MODIFIERS = {
  balanced: { title: 'Balanced', bodyBridge: 'I focus on delivering consistent and measurable outcomes in my work.' },
  analytical: { title: 'Analytical', bodyBridge: 'I rely on data-driven decision-making to improve performance.' },
  collaborative: { title: 'Collaborative', bodyBridge: 'I prioritize strong communication and teamwork.' },
  formal: { title: 'Formal', bodyBridge: '' },
  bold: { title: 'Bold', bodyBridge: 'I am confident in my ability to deliver strong results quickly.' },
  concise: { title: 'Concise', bodyBridge: '' }
};

const SIGNATURE_FONTS = [
  { id: 'serif', label: 'Classic Serif', value: '"Times New Roman", serif' },
  { id: 'script1', label: 'Script Elegant', value: '"Brush Script MT", cursive' },
  { id: 'script2', label: 'Script Modern', value: '"Segoe Script", cursive' },
  { id: 'script3', label: 'Monotype', value: '"Lucida Handwriting", cursive' },
  { id: 'sans', label: 'Professional Sans', value: 'Inter, Arial, sans-serif' }
];

const QUICK_POLISH = {
  shorter: { hook: 'I am applying for the {jobTitle} role at {company}.', close: 'Thank you for your consideration.' },
  formal: { hook: 'Please accept my application for the {jobTitle} position at {company}.', close: 'I appreciate your time and consideration, and I look forward to discussing my candidacy.' }
};

/* ====================== NEW RANDOM VARIETY ENGINE (ADDED) ====================== */
const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const HOOKS = [
  'I am writing to express my strong interest in the {jobTitle} role at {company}, as I believe my experience and approach align well with your team’s objectives.',
  'I would like to apply for the {jobTitle} position at {company}, where I am confident my background can contribute meaningfully to your goals.',
  'I am interested in the {jobTitle} opportunity at {company} and believe my skills and experience position me well to deliver strong results.',
  'I am excited about the opportunity to contribute as a {jobTitle} at {company}, where I can apply my experience to create measurable impact.',
  'I am reaching out to express my interest in the {jobTitle} role at {company}, as it strongly aligns with my professional experience and career direction.'
];

const EXPERIENCE_BLOCKS = {
  fresher: [
    'As an early-career professional, I bring strong learning agility, a proactive mindset, and the ability to quickly translate knowledge into practical execution.',
    'I am eager to apply my academic foundation and hands-on exposure to contribute effectively while continuously improving in a professional environment.'
  ],
  junior: [
    'With initial professional experience, I have developed strong execution discipline and a clear understanding of delivering consistent results.',
    'I bring hands-on experience combined with a strong focus on learning, improvement, and delivering meaningful outcomes.'
  ],
  mid: [
    'With experience across multiple projects, I have built strong ownership, execution discipline, and a consistent track record of delivering measurable outcomes.',
    'I bring a balanced combination of practical experience, structured thinking, and the ability to drive results in fast-paced environments.'
  ],
  senior: [
    'I have led initiatives across teams and functions, delivering strategic outcomes while maintaining a strong focus on scalability and long-term impact.',
    'With extensive experience, I bring leadership, execution discipline, and the ability to drive complex initiatives to successful completion.'
  ],
  lead: [
    'I have driven large-scale initiatives and built high-performing teams, focusing on long-term strategy, execution excellence, and organizational impact.',
    'At a leadership level, I bring a strong combination of strategic thinking, team leadership, and consistent delivery of high-impact outcomes.'
  ]
};

const ACHIEVEMENTS = [
  'In my recent role, I played a key part in improving processes, enhancing efficiency, and delivering consistent results aligned with business goals.',
  'I contributed to optimizing workflows and driving execution improvements, ensuring both quality and consistency across deliverables.',
  'I successfully managed responsibilities that required ownership, attention to detail, and the ability to deliver under tight timelines.'
];

const WHY_ROLE = [
  'This opportunity strongly aligns with my professional experience and long-term goals, and I am excited about the potential to contribute meaningfully.',
  'I am particularly interested in this role because it allows me to apply my skills while contributing to impactful and meaningful work.',
  'I see strong alignment between my background and this role, and I am confident in my ability to add value from the outset.'
];

const CLOSINGS = [
  'I would welcome the opportunity to further discuss how my experience and approach can contribute to your team’s success.',
  'I look forward to the opportunity to discuss my application in more detail and explore how I can add value.',
  'Thank you for your time and consideration, and I look forward to hearing from you.'
];

const STRENGTH_BANK = [
  'I take full ownership of my work and consistently ensure timely and high-quality delivery.',
  'I break down complex problems into structured, actionable steps and execute them effectively.',
  'I communicate clearly and effectively across teams, ensuring alignment and clarity in execution.',
  'I perform well in fast-paced environments while maintaining focus on quality and outcomes.',
  'I adapt quickly to changing priorities while maintaining strong execution discipline.',
  'I focus on delivering measurable outcomes that align with business objectives.',
  'I prioritize user and customer needs when making decisions and delivering solutions.',
  'I use data and structured thinking to guide decisions and improve performance.',
  'I consistently deliver results with accountability, ownership, and attention to detail.',
  'I handle ambiguity with confidence and maintain clarity in execution.'
];

const INDUSTRY_BLOCKS = {
  tech: [
    'I have experience working with scalable systems and modern technologies, with a strong focus on reliability, performance, and clean implementation.',
    'I focus on building efficient and maintainable technical solutions that deliver long-term value.'
  ],
  marketing: [
    'I focus on driving growth through data-driven strategies, optimizing campaigns, and improving engagement across channels.',
    'I bring a strong understanding of audience behavior and continuously optimize performance to achieve better results.'
  ],
  finance: [
    'I bring strong analytical capabilities and attention to detail, ensuring accuracy and reliability in financial decision-making.',
    'I focus on data-driven insights, compliance, and structured financial analysis to support business outcomes.'
  ],
  healthcare: [
    'I prioritize precision, quality, and compliance while focusing on improving outcomes and overall experience.',
    'I am committed to maintaining high standards while delivering consistent and reliable results.'
  ],
  operations: [
    'I focus on improving efficiency, streamlining workflows, and ensuring smooth execution across teams and processes.',
    'I identify opportunities for optimization and implement improvements that enhance overall performance.'
  ]
};

function detectRole(jobTitle = '') {
  const t = jobTitle.toLowerCase();
  if (t.includes('engineer') || t.includes('developer')) return 'tech';
  if (t.includes('marketing')) return 'marketing';
  if (t.includes('finance')) return 'finance';
  if (t.includes('health')) return 'healthcare';
  return 'operations';
}
/* ====================== END OF NEW RANDOM VARIETY ENGINE ====================== */

const DEFAULT_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  yearsExperience: '',
  currentTitle: '',
  jobTitle: '',
  companyName: '',
  hiringManager: '',
  jobDescription: '',
  achievement: '',
  whyThisRole: '',
  selectedStrengths: [],
  style: 'balanced',
  hasGap: 'no',
  gapReason: 'upskilling',
  signatureMode: 'type',
  signatureTypedName: '',
  signatureFont: 'serif',
  signatureImage: ''
};

function getExpSlab(yearsExperience) {
  const years = Number(yearsExperience);
  if (!Number.isFinite(years)) return EXPERIENCE_SLABS[1];
  return EXPERIENCE_SLABS.find((slab) => years >= slab.min && years <= slab.max) || EXPERIENCE_SLABS[2];
}

function sanitize(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('\n', '<br>');
}

/* ====================== UPDATED HELPERS (with new random engine) ====================== */
function buildHook(form, polishMode) {
  const company = form.companyName.trim() || 'your company';
  const jobTitle = form.jobTitle.trim() || 'this role';

  if (polishMode && QUICK_POLISH[polishMode]) {
    return QUICK_POLISH[polishMode].hook
      .replace('{jobTitle}', sanitize(jobTitle))
      .replace('{company}', sanitize(company));
  }
  return randomPick(HOOKS)
    .replace('{jobTitle}', sanitize(jobTitle))
    .replace('{company}', sanitize(company));
}

function buildStrengthsParagraph(selectedStrengths) {
  const blocks = selectedStrengths.map((key) => STRENGTH_SENTENCES[key]).filter(Boolean);
  if (!blocks.length) {
    return `<p>${sanitize(randomPick(STRENGTH_BANK))}</p>`;
  }
  return `<p>${sanitize(blocks.join('. '))}.</p>`;
}

function buildGapParagraph(hasGap, gapReason) {
  if (hasGap !== 'yes') return '';
  const text = GAP_SENTENCES[gapReason] || '';
  return text ? `<p>${sanitize(text)}</p>` : '';
}

function buildSignatureHtml(form) {
  const fullName = `${form.firstName} ${form.lastName}`.trim() || 'Candidate Name';
  const signatureTyped = sanitize(form.signatureTypedName || fullName);

  if (form.signatureMode === 'upload' && form.signatureImage) {
    return `<img src="${form.signatureImage}" alt="Signature" style="max-height:48px;max-width:200px;object-fit:contain;display:block;margin-bottom:8px;" />`;
  }

  const font = SIGNATURE_FONTS.find((f) => f.id === form.signatureFont)?.value || 'inherit';
  return `<div style="font-family:${font};font-size:22px;line-height:1.2;margin-bottom:6px;">${signatureTyped}</div>`;
}

function buildLetterHtml(form, polishMode) {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const manager = form.hiringManager.trim() || 'Hiring Team';
  const fullName = `${form.firstName} ${form.lastName}`.trim() || 'Candidate Name';
  const style = STYLE_MODIFIERS[form.style] || STYLE_MODIFIERS.balanced;
  const expSlab = getExpSlab(form.yearsExperience);
  const roleType = detectRole(form.jobTitle);

  const hook = buildHook(form, polishMode);
  const experience = sanitize(randomPick(EXPERIENCE_BLOCKS[expSlab.id]));
  const achievement = form.achievement.trim()
    ? sanitize(form.achievement.trim())
    : sanitize(randomPick(ACHIEVEMENTS));
  const whyRole = form.whyThisRole.trim()
    ? sanitize(form.whyThisRole.trim())
    : sanitize(randomPick(WHY_ROLE));
  const closing = polishMode && QUICK_POLISH[polishMode]
    ? QUICK_POLISH[polishMode].close
    : sanitize(randomPick(CLOSINGS));
  const industryLine = sanitize(randomPick(INDUSTRY_BLOCKS[roleType]));
  const strengthsParagraph = buildStrengthsParagraph(form.selectedStrengths);
  const gapParagraph = buildGapParagraph(form.hasGap, form.gapReason);
  const signatureHtml = buildSignatureHtml(form);

  return `
    <div>
      <div class="letter-header">
        <p><strong>${sanitize(fullName)}</strong></p>
        <p>${sanitize(form.email || 'you@example.com')} ${form.phone ? `| ${sanitize(form.phone)}` : ''}</p>
      </div>
      <p>${sanitize(today)}</p>
      <p>${sanitize(manager)}<br/>${sanitize(form.companyName || 'your company')}</p>
      <p>Dear ${sanitize(manager)},</p>
      <p>${hook}</p>
      <p>${experience}</p>
      <p>${achievement}</p>
      ${strengthsParagraph}
      <p>${industryLine}</p>
      ${style.bodyBridge ? `<p>${sanitize(style.bodyBridge)}</p>` : ''}
      <p>${whyRole}</p>
      ${gapParagraph}
      <p>${closing}</p>
      <p>Sincerely,</p>
      <div>${signatureHtml}</div>
      <p>${sanitize(fullName)}</p>
      ${form.currentTitle ? `<p style="color:#475569">${sanitize(form.currentTitle)}</p>` : ''}
    </div>
  `;
}
/* ====================== END OF UPDATED HELPERS ====================== */

export default function CoverLetterBuilderClient() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [polishMode, setPolishMode] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');
  const [manualHtml, setManualHtml] = useState('');
  const [isManualOverride, setIsManualOverride] = useState(false);
  const [randomKey, setRandomKey] = useState(0);
  const editorRef = useRef(null);
  const debounceRef = useRef(null);

  const strengthOptions = useMemo(() => Object.keys(STRENGTH_SENTENCES), []);
  const progress = Math.round(((currentStep + 1) / STEPS.length) * 100);

  // Auto pre-fill from ResuGrow scan
  useEffect(() => {
    try {
      const saved = localStorage.getItem('resugrowUserProfile');
      if (saved) {
        const profile = JSON.parse(saved);
        setForm((prev) => ({
          ...prev,
          firstName: profile.firstName || prev.firstName,
          lastName: profile.lastName || prev.lastName,
          currentTitle: profile.currentTitle || prev.currentTitle,
          yearsExperience: profile.yearsExperience || prev.yearsExperience,
          email: profile.email || prev.email
        }));
      }
    } catch {
      // ignore corrupt or invalid localStorage
    }
  }, []);

  useEffect(() => {
    const nextHtml = buildLetterHtml(form, polishMode);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      setPreviewHtml(nextHtml);
      if (!isManualOverride) setManualHtml(nextHtml);
    }, 300);
    return () => { if (debounceRef.current) window.clearTimeout(debounceRef.current); };
  }, [form, polishMode, isManualOverride, randomKey]);

  useEffect(() => {
    if (editorRef.current && manualHtml && editorRef.current.innerHTML !== manualHtml) {
      editorRef.current.innerHTML = manualHtml;
    }
  }, [manualHtml]);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const toggleStrength = (strength) => {
    setForm((prev) => {
      const exists = prev.selectedStrengths.includes(strength);
      if (exists) return { ...prev, selectedStrengths: prev.selectedStrengths.filter((s) => s !== strength) };
      if (prev.selectedStrengths.length >= 3) return prev;
      return { ...prev, selectedStrengths: [...prev.selectedStrengths, strength] };
    });
  };

  const onSignatureUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setField('signatureImage', reader.result || '');
    reader.readAsDataURL(file);
  };

  const downloadLetterPdf = () => {
    const letterHtml = editorRef.current?.innerHTML || manualHtml || previewHtml;
    if (!letterHtml) return;

    let printIframe = document.getElementById('resugrow-print-iframe');
    if (!printIframe) {
      printIframe = document.createElement('iframe');
      printIframe.id = 'resugrow-print-iframe';
      printIframe.style.position = 'fixed';
      printIframe.style.right = '0';
      printIframe.style.bottom = '0';
      printIframe.style.width = '0';
      printIframe.style.height = '0';
      printIframe.style.border = '0';
      printIframe.style.visibility = 'hidden';
      document.body.appendChild(printIframe);
    }

    const doc = printIframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>ResuGrow Cover Letter</title>
          <style>
            @page { size: A4; margin: 16mm; }
            html, body { margin: 0; padding: 0; background: #fff; color: #0f172a; font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
            .letter { line-height: 1.5; font-size: 14px; color: #0f172a; }
            .letter p { margin: 0 0 11px; }
            .letter img { max-height: 48px; max-width: 220px; object-fit: contain; display: block; margin: 0 0 8px; }
            .letter-header { margin-bottom: 24px; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; }
            .letter-header p { margin: 0; color: #475569; }
            .letter-header p strong { color: #0f172a; font-size: 18px; }
          </style>
        </head>
        <body>
          <article class="letter">${letterHtml}</article>
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      printIframe.contentWindow?.focus();
      printIframe.contentWindow?.print();
    }, 500);
  };

  const stepContent = [
    <div className={styles.stepPanel} key="step-personal">
      <div className={styles.fieldGrid}>
        <label>First Name<input value={form.firstName} onChange={(e) => setField('firstName', e.target.value)} /></label>
        <label>Last Name<input value={form.lastName} onChange={(e) => setField('lastName', e.target.value)} /></label>
        <label>Email<input value={form.email} onChange={(e) => setField('email', e.target.value)} /></label>
        <label>Phone<input value={form.phone} onChange={(e) => setField('phone', e.target.value)} /></label>
        <label>Years of Experience<input type="number" min="0" value={form.yearsExperience} onChange={(e) => setField('yearsExperience', e.target.value)} /></label>
        <label>Current / Most Recent Title<input value={form.currentTitle} onChange={(e) => setField('currentTitle', e.target.value)} /></label>
      </div>
    </div>,

    <div className={styles.stepPanel} key="step-target">
      <div className={styles.fieldGrid}>
        <label>Target Job Title<input value={form.jobTitle} onChange={(e) => setField('jobTitle', e.target.value)} /></label>
        <label>Target Company (optional)<input value={form.companyName} onChange={(e) => setField('companyName', e.target.value)} /></label>
        <label>Hiring Manager (optional)<input value={form.hiringManager} onChange={(e) => setField('hiringManager', e.target.value)} /></label>
      </div>
      <label className={styles.fullWidth}>
        Job Description (optional)
        <textarea value={form.jobDescription} onChange={(e) => setField('jobDescription', e.target.value)} rows={5} />
      </label>
    </div>,

    <div className={styles.stepPanel} key="step-story-gap">
      <label className={styles.fullWidth}>
        One key achievement
        <textarea value={form.achievement} onChange={(e) => setField('achievement', e.target.value)} rows={4} />
      </label>
      <label className={styles.fullWidth}>
        Why this role / company
        <textarea value={form.whyThisRole} onChange={(e) => setField('whyThisRole', e.target.value)} rows={4} />
      </label>

      <div className={styles.block}>
        <p className={styles.blockLabel}>Career gap?</p>
        <div className={styles.inlineChoices}>
          <label><input type="radio" name="hasGap" checked={form.hasGap === 'no'} onChange={() => setField('hasGap', 'no')} /> No</label>
          <label><input type="radio" name="hasGap" checked={form.hasGap === 'yes'} onChange={() => setField('hasGap', 'yes')} /> Yes</label>
        </div>
        {form.hasGap === 'yes' && (
          <label className={styles.fullWidth}>
            Gap reason
            <select value={form.gapReason} onChange={(e) => setField('gapReason', e.target.value)}>
              <option value="covid">COVID</option>
              <option value="upskilling">Upskilling</option>
              <option value="caretaking">Caretaking</option>
            </select>
          </label>
        )}
      </div>
    </div>,

    <div className={styles.stepPanel} key="step-style">
      <p className={styles.blockLabel}>Choose exactly 3 strengths ({form.selectedStrengths.length}/3 selected)</p>
      <div className={styles.pills}>
        {strengthOptions.map((item) => {
          const active = form.selectedStrengths.includes(item);
          const disabled = !active && form.selectedStrengths.length >= 3;
          return (
            <button
              type="button"
              key={item}
              className={`${styles.pill} ${active ? styles.pillActive : ''}`}
              onClick={() => toggleStrength(item)}
              disabled={disabled}
            >
              {item}
            </button>
          );
        })}
      </div>

      <p className={styles.blockLabel}>Working Style</p>
      <div className={styles.cardGrid}>
        {Object.entries(STYLE_MODIFIERS).map(([id, style]) => (
          <button
            key={id}
            type="button"
            className={`${styles.styleCard} ${form.style === id ? styles.styleCardActive : ''}`}
            onClick={() => setField('style', id)}
          >
            {style.title}
          </button>
        ))}
      </div>
    </div>,

    <div className={styles.stepPanel} key="step-signature">
      <div className={styles.inlineChoices}>
        <label><input type="radio" name="signatureMode" checked={form.signatureMode === 'type'} onChange={() => setField('signatureMode', 'type')} /> Type Signature</label>
        <label><input type="radio" name="signatureMode" checked={form.signatureMode === 'upload'} onChange={() => setField('signatureMode', 'upload')} /> Draw / Upload PNG</label>
      </div>

      {form.signatureMode === 'type' ? (
        <div className={styles.fieldGrid}>
          <label>Typed Name<input value={form.signatureTypedName} onChange={(e) => setField('signatureTypedName', e.target.value)} /></label>
          <label>Signature Font
            <select value={form.signatureFont} onChange={(e) => setField('signatureFont', e.target.value)}>
              {SIGNATURE_FONTS.map((font) => <option key={font.id} value={font.id}>{font.label}</option>)}
            </select>
          </label>
        </div>
      ) : (
        <label className={styles.fullWidth}>
          Upload transparent PNG
          <input type="file" accept="image/png" onChange={(e) => onSignatureUpload(e.target.files?.[0])} />
          <small style={{ display: 'block', marginTop: '6px', color: '#64748b' }}>Recommended: transparent PNG, max 200×80 px</small>
        </label>
      )}

      <div className={styles.polishActions}>
        <p className={styles.blockLabel}>Quick Polish</p>
        <div className={styles.polishGrid}>
          <button type="button" className={`${styles.polishBtn} ${polishMode === 'shorter' ? styles.polishBtnActive : ''}`} onClick={() => setPolishMode('shorter')}>Make it shorter</button>
          <button type="button" className={`${styles.polishBtn} ${polishMode === 'formal' ? styles.polishBtnActive : ''}`} onClick={() => setPolishMode('formal')}>Make it more formal</button>
          <button type="button" className={`${styles.polishBtn} ${!polishMode ? styles.polishBtnActive : ''}`} onClick={() => setPolishMode('')}>Default tone</button>
        </div>
      </div>
    </div>
  ];

  return (
    <div className={styles.builderPage}>
      {/* ── Top Header Bar ── */}
      <header className={styles.builderHeader}>
        <div className={styles.builderHeaderInner}>
          <Link href="/cover-letter/builder" className={styles.builderLogo}>
            ← Cover Letter Studio
          </Link>
          <div className={styles.builderHeaderActions}>
            <button type="button" className="btn btn-primary" onClick={downloadLetterPdf} style={{ padding: '8px 18px', fontSize: '13px' }}>
              Download PDF
            </button>
            <Link href="/resume/ats-checker" className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
              Run ATS Scanner
            </Link>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        <aside className={styles.leftPane}>
          <div className={styles.leftHeader}>
            <h2>Build Your Cover Letter</h2>
            <p>1000+ Unique Variations. Recruiter-ready output.</p>
            <div className={styles.progressWrap}>
              <div className={styles.progressTrack}><span style={{ width: `${progress}%` }} /></div>
              <small>Step {currentStep + 1} of {STEPS.length} — {progress}% complete</small>
            </div>
          </div>

          <div className={styles.stepsBar}>
            {STEPS.map((step, idx) => (
              <button key={step} type="button" className={`${styles.stepChip} ${idx === currentStep ? styles.stepChipActive : ''}`} onClick={() => setCurrentStep(idx)}>
                {idx + 1}. {step}
              </button>
            ))}
          </div>

          {stepContent[currentStep]}

          <div className={styles.navActions}>
            <button type="button" className="btn btn-secondary" disabled={currentStep === 0} onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}>← Back</button>
            <button type="button" className="btn btn-primary" disabled={currentStep === STEPS.length - 1} onClick={() => setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1))}>Next →</button>
          </div>

          <div className={styles.aiRewriteSection}>
            <Link href="/payment?service=cover-letter-ai-rewrite&source=cover-letter-builder-ai-rewrite" className={styles.aiRewriteBtn}>
              <EmojiImage emoji="✨" size={20} /> Re-write with AI
            </Link>
            <p className={styles.aiNote}>Upgrade to an AI-polished, role-tailored rewrite of your cover letter.</p>
          </div>
        </aside>

        <section className={styles.rightPane}>
          <div className={styles.previewToolbar}>
            <div className={styles.toolbarLeft}>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#6b7280' }}>Live Preview</span>
            </div>
            <div className={styles.toolbarCenter}>
              <button type="button" className={styles.randomBtn} onClick={() => setRandomKey((k) => k + 1)}>
                <EmojiImage emoji="🎲" size={20} /> RANDOMIZE
              </button>
            </div>
            <div className={styles.toolbarRight}>
              <div className={styles.quickActions}>
                {isManualOverride && (
                  <button type="button" onClick={() => { setIsManualOverride(false); setManualHtml(previewHtml); setPolishMode(''); }}>↺ Sync from wizard</button>
                )}
              </div>
            </div>
          </div>

          <div className={styles.a4Frame}>
            <div ref={editorRef} className={styles.editor} contentEditable suppressContentEditableWarning onInput={(e) => { setIsManualOverride(true); setManualHtml(e.currentTarget.innerHTML); }} />
          </div>
        </section>
      </div>
    </div>
  );
}
