'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './builder.module.css';

// ── Constants ─────────────────────────────────────────────────────────────
const STEPS = [
  { id: 'template',   label: 'Template & Color',      icon: '🎨' },
  { id: 'profile',    label: 'Your Profile',           icon: '👤' },
  { id: 'target',     label: 'Target Role',            icon: '🎯' },
  { id: 'story',      label: 'Experience & Story',     icon: '📖' },
  { id: 'strengths',  label: 'Strengths & Style',      icon: '⚡' },
  { id: 'signature',  label: 'Signature & Finish',     icon: '✍️' },
  { id: 'review',     label: 'Review & Download',      icon: '📄' },
];

const TEMPLATES = [
  { id: 'cascade', label: 'Cascade',  desc: 'Classic with a subtle color accent line.' },
  { id: 'diamond', label: 'Diamond',  desc: 'Modern full-width colored header.' },
  { id: 'iconic',  label: 'Iconic',   desc: 'Clean professional with a top border.' },
  { id: 'concept', label: 'Concept',  desc: 'Two-column with a colored side panel.' },
  { id: 'crisp',   label: 'Crisp',    desc: 'Minimalist with clean typography.' },
  { id: 'influx',  label: 'Influx',   desc: 'Bold dark header for contrast.' },
];

const COLORS = [
  { id: 'gray',   hex: '#4b5563' },
  { id: 'blue',   hex: '#2563eb' },
  { id: 'green',  hex: '#059669' },
  { id: 'red',    hex: '#dc2626' },
  { id: 'purple', hex: '#7c3aed' },
  { id: 'teal',   hex: '#0d9488' },
  { id: 'indigo', hex: '#4f46e5' },
  { id: 'orange', hex: '#f97316' },
];

const STRENGTH_SENTENCES = {
  Leadership:           'I lead initiatives with clarity and ensure teams stay aligned on outcomes.',
  'Problem-Solving':    'I break down complex problems into actionable solutions and execute effectively.',
  Ownership:            'I take full ownership of tasks and ensure consistent delivery.',
  Communication:        'I communicate clearly across teams to maintain alignment and momentum.',
  'Execution Speed':    'I deliver results efficiently without compromising quality.',
  Adaptability:         'I adapt quickly to changing priorities and environments.',
  Mentorship:           'I support and mentor team members to improve overall team performance.',
  Innovation:           'I continuously look for ways to improve processes and systems.',
  Collaboration:        'I work effectively across teams to achieve shared goals.',
  Strategy:             'I align execution with long-term business objectives.',
  'Customer Focus':     'I prioritize user and customer outcomes in decision-making.',
  Reliability:          'I consistently deliver dependable and high-quality work.',
  'Data Orientation':   'I use data and insights to guide decisions.',
  Resilience:           'I stay composed and effective in high-pressure situations.',
  'Continuous Learning':'I actively learn and improve to stay relevant and effective.',
};

const STYLE_MODIFIERS = {
  balanced:     { title: 'Balanced',     bodyBridge: 'I focus on delivering consistent and measurable outcomes in my work.' },
  analytical:   { title: 'Analytical',   bodyBridge: 'I rely on data-driven decision-making to improve performance.' },
  collaborative:{ title: 'Collaborative',bodyBridge: 'I prioritize strong communication and teamwork.' },
  formal:       { title: 'Formal',       bodyBridge: '' },
  bold:         { title: 'Bold',         bodyBridge: 'I am confident in my ability to deliver strong results quickly.' },
  concise:      { title: 'Concise',      bodyBridge: '' },
};

const SIGNATURE_FONTS = [
  { id: 'serif',   label: 'Classic Serif',     value: '"Times New Roman", serif' },
  { id: 'script1', label: 'Script Elegant',    value: '"Brush Script MT", cursive' },
  { id: 'script2', label: 'Script Modern',     value: '"Segoe Script", cursive' },
  { id: 'script3', label: 'Monotype',          value: '"Lucida Handwriting", cursive' },
  { id: 'sans',    label: 'Professional Sans', value: 'Inter, Arial, sans-serif' },
];

const EXPERIENCE_SLABS = [
  { id: 'fresher', label: 'Fresher (0–1 yrs)',        min: 0,  max: 1   },
  { id: 'junior',  label: 'Junior (1–3 yrs)',          min: 1,  max: 3   },
  { id: 'mid',     label: 'Mid-Level (3–6 yrs)',       min: 3,  max: 6   },
  { id: 'senior',  label: 'Senior (6–10 yrs)',         min: 6,  max: 10  },
  { id: 'lead',    label: 'Lead / Principal (10+ yrs)',min: 10, max: 100 },
];

const GAP_SENTENCES = {
  covid:      'During the COVID period, I focused on strengthening my skills and staying aligned with industry developments.',
  upskilling: 'During this time, I invested in structured upskilling to deepen my expertise and prepare for more advanced responsibilities.',
  caretaking: 'During a caregiving phase, I continued learning and maintaining professional discipline to stay prepared for my next role.',
};

// ── Content banks ─────────────────────────────────────────────────────────
const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];

const HOOKS = [
  'I am writing to express my strong interest in the {jobTitle} role at {company}, as I believe my experience aligns well with your team\'s objectives.',
  'I would like to apply for the {jobTitle} position at {company}, where I am confident my background can contribute meaningfully.',
  'I am interested in the {jobTitle} opportunity at {company} and believe my skills position me well to deliver strong results.',
  'I am excited about the opportunity to contribute as a {jobTitle} at {company}, where I can apply my experience to create measurable impact.',
];

const EXPERIENCE_BLOCKS = {
  fresher: ['As an early-career professional, I bring strong learning agility, a proactive mindset, and the ability to quickly translate knowledge into practical execution.'],
  junior:  ['With initial professional experience, I have developed strong execution discipline and a clear understanding of delivering consistent results.'],
  mid:     ['With experience across multiple projects, I have built strong ownership, execution discipline, and a consistent track record of delivering measurable outcomes.'],
  senior:  ['I have led initiatives across teams and functions, delivering strategic outcomes while maintaining a strong focus on scalability and long-term impact.'],
  lead:    ['I have driven large-scale initiatives and built high-performing teams, focusing on long-term strategy, execution excellence, and organizational impact.'],
};

const ACHIEVEMENTS_BANK = [
  'In my recent role, I played a key part in improving processes, enhancing efficiency, and delivering consistent results aligned with business goals.',
  'I contributed to optimizing workflows and driving execution improvements, ensuring both quality and consistency across deliverables.',
];

const WHY_ROLE_BANK = [
  'This opportunity strongly aligns with my professional experience and long-term goals, and I am excited about the potential to contribute meaningfully.',
  'I see strong alignment between my background and this role, and I am confident in my ability to add value from the outset.',
];

const CLOSINGS = [
  'I would welcome the opportunity to further discuss how my experience can contribute to your team\'s success.',
  'I look forward to the opportunity to discuss my application in more detail.',
  'Thank you for your time and consideration, and I look forward to hearing from you.',
];

const INDUSTRY_BLOCKS = {
  tech:       ['I have experience working with scalable systems and modern technologies, with a strong focus on reliability, performance, and clean implementation.'],
  marketing:  ['I focus on driving growth through data-driven strategies, optimizing campaigns, and improving engagement across channels.'],
  finance:    ['I bring strong analytical capabilities and attention to detail, ensuring accuracy and reliability in financial decision-making.'],
  healthcare: ['I prioritize precision, quality, and compliance while focusing on improving outcomes and overall experience.'],
  operations: ['I focus on improving efficiency, streamlining workflows, and ensuring smooth execution across teams and processes.'],
};

function detectRole(jobTitle = '') {
  const t = jobTitle.toLowerCase();
  if (t.includes('engineer') || t.includes('developer')) return 'tech';
  if (t.includes('marketing')) return 'marketing';
  if (t.includes('finance')) return 'finance';
  if (t.includes('health')) return 'healthcare';
  return 'operations';
}

function sanitize(v) {
  return String(v || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/\n/g,'<br>');
}

function getExpSlab(years) {
  const y = Number(years);
  if (!Number.isFinite(y)) return EXPERIENCE_SLABS[1];
  return EXPERIENCE_SLABS.find(s => y >= s.min && y <= s.max) || EXPERIENCE_SLABS[2];
}

// ── Letter HTML builder ───────────────────────────────────────────────────
function buildLetterHtml(form, jobDescription = '', letterLength = 'medium', fontSize = '14px') {
  const today   = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
  const manager = form.hiringManager.trim() || 'Hiring Team';
  const company = form.companyName.trim()   || 'your company';
  const jobTitle= form.jobTitle.trim()      || 'this role';
  const fullName= `${form.firstName} ${form.lastName}`.trim() || 'Candidate Name';
  const color   = form.colorHex || '#2563eb';
  const expSlab = getExpSlab(form.yearsExperience);
  const roleType= detectRole(form.jobTitle);
  const style   = STYLE_MODIFIERS[form.style] || STYLE_MODIFIERS.balanced;
  const email   = sanitize(form.email || 'you@example.com');
  const phone   = form.phone ? sanitize(form.phone) : '';

  const hook        = rnd(HOOKS).replace('{jobTitle}', sanitize(jobTitle)).replace('{company}', sanitize(company));
  const experience  = sanitize(rnd(EXPERIENCE_BLOCKS[expSlab.id]));
  const achievement = form.achievement.trim() ? sanitize(form.achievement.trim()) : sanitize(rnd(ACHIEVEMENTS_BANK));
  const whyRole     = form.whyThisRole.trim() ? sanitize(form.whyThisRole.trim()) : sanitize(rnd(WHY_ROLE_BANK));
  const closing     = sanitize(rnd(CLOSINGS));

  let industryLine = sanitize(rnd(INDUSTRY_BLOCKS[roleType]));
  if (jobDescription) {
    const kws = [...new Set((jobDescription.toLowerCase().match(/\b[a-z]{5,}\b/g) || []))].slice(0, 3);
    if (kws.length) industryLine += ` I am particularly drawn to ${sanitize(company)} because of its focus on ${kws.join(', ')}.`;
  }

  const strengthsParagraph = (() => {
    const blocks = form.selectedStrengths.map(k => STRENGTH_SENTENCES[k]).filter(Boolean);
    return blocks.length ? `<p style="margin:0 0 18px;">${sanitize(blocks.join('. '))}.</p>` : '';
  })();

  const gapParagraph = form.hasGap === 'yes' && GAP_SENTENCES[form.gapReason]
    ? `<p style="margin:0 0 18px;">${sanitize(GAP_SENTENCES[form.gapReason])}</p>` : '';

  const signatureHtml = (() => {
    const name = sanitize(form.signatureTypedName || fullName);
    if (form.signatureMode === 'upload' && form.signatureImage)
      return `<img src="${form.signatureImage}" alt="Signature" style="max-height:52px;max-width:200px;object-fit:contain;display:block;margin:8px 0;" />`;
    const font = SIGNATURE_FONTS.find(f => f.id === form.signatureFont)?.value || 'inherit';
    return `<div style="font-family:${font};font-size:26px;line-height:1.3;margin:8px 0 4px;color:#1e293b;">${name}</div>`;
  })();

  // Shared body paragraphs — generous spacing
  const P = (text) => `<p style="margin:0 0 18px;line-height:1.85;">${text}</p>`;

  let bodyParagraphs = `
    ${P(`${sanitize(today)}`)}
    ${P(`${sanitize(manager)}<br/><strong>${sanitize(company)}</strong>`)}
    ${P(`Dear ${sanitize(manager)},`)}
    ${P(hook)}
    ${P(experience)}
    ${P(achievement)}
  `;
  if (letterLength !== 'short') bodyParagraphs += `${strengthsParagraph}${P(industryLine)}`;
  if (letterLength === 'detailed') bodyParagraphs += `${style.bodyBridge ? P(sanitize(style.bodyBridge)) : ''}${P(whyRole)}`;
  bodyParagraphs += `
    ${gapParagraph}
    ${P(closing)}
    <p style="margin:0 0 4px;">Sincerely,</p>
    ${signatureHtml}
    <p style="margin:4px 0 2px;font-weight:700;color:#1e293b;">${sanitize(fullName)}</p>
    ${form.currentTitle ? `<p style="margin:0;color:#64748b;font-size:13px;">${sanitize(form.currentTitle)}</p>` : ''}
  `;

  // Base styles applied to all templates
  const base = `font-family:'Inter',Arial,sans-serif;font-size:${fontSize};line-height:1.85;color:#334155;`;

  // ── 1. Cascade — left accent bar + name header ──────────────────────────
  if (form.templateId === 'cascade') {
    return `
      <div style="${base}width:100%;min-height:297mm;box-sizing:border-box;">
        <div style="border-left:5px solid ${color};padding:28px 32px 24px 28px;margin-bottom:32px;background:#fafbfc;">
          <div style="font-size:30px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;margin-bottom:6px;">${sanitize(fullName)}</div>
          ${form.currentTitle ? `<div style="font-size:14px;color:${color};font-weight:600;margin-bottom:8px;">${sanitize(form.currentTitle)}</div>` : ''}
          <div style="font-size:13px;color:#64748b;display:flex;gap:20px;flex-wrap:wrap;">
            <span>${email}</span>
            ${phone ? `<span>${phone}</span>` : ''}
          </div>
        </div>
        <div style="padding:0 32px 32px;">${bodyParagraphs}</div>
      </div>`;
  }

  // ── 2. Diamond — full-width colored header band ─────────────────────────
  if (form.templateId === 'diamond') {
    return `
      <div style="${base}width:100%;min-height:297mm;box-sizing:border-box;">
        <div style="background:${color};padding:36px 40px;margin-bottom:36px;">
          <div style="font-size:32px;font-weight:800;color:white;letter-spacing:-0.5px;margin-bottom:6px;">${sanitize(fullName)}</div>
          ${form.currentTitle ? `<div style="font-size:14px;color:rgba(255,255,255,0.85);font-weight:500;margin-bottom:8px;">${sanitize(form.currentTitle)}</div>` : ''}
          <div style="font-size:13px;color:rgba(255,255,255,0.8);display:flex;gap:20px;flex-wrap:wrap;">
            <span>${email}</span>
            ${phone ? `<span>${phone}</span>` : ''}
          </div>
        </div>
        <div style="padding:0 40px 40px;">${bodyParagraphs}</div>
      </div>`;
  }

  // ── 3. Iconic — centered name, top color bar ────────────────────────────
  if (form.templateId === 'iconic') {
    return `
      <div style="${base}width:100%;min-height:297mm;box-sizing:border-box;">
        <div style="height:6px;background:${color};width:100%;margin-bottom:0;"></div>
        <div style="text-align:center;padding:32px 40px 28px;border-bottom:1px solid #e2e8f0;margin-bottom:32px;">
          <div style="font-size:32px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;margin-bottom:6px;">${sanitize(fullName)}</div>
          ${form.currentTitle ? `<div style="font-size:14px;color:${color};font-weight:600;margin-bottom:8px;">${sanitize(form.currentTitle)}</div>` : ''}
          <div style="font-size:13px;color:#64748b;display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
            <span>${email}</span>
            ${phone ? `<span>•</span><span>${phone}</span>` : ''}
          </div>
        </div>
        <div style="padding:0 40px 40px;">${bodyParagraphs}</div>
      </div>`;
  }

  // ── 4. Concept — two-column: colored sidebar + content ─────────────────
  if (form.templateId === 'concept') {
    return `
      <div style="${base}width:100%;min-height:297mm;box-sizing:border-box;display:flex;">
        <div style="width:200px;flex-shrink:0;background:${color};padding:36px 24px;min-height:297mm;">
          <div style="font-size:20px;font-weight:800;color:white;line-height:1.3;margin-bottom:24px;">${sanitize(fullName)}</div>
          ${form.currentTitle ? `<div style="font-size:12px;color:rgba(255,255,255,0.8);margin-bottom:20px;font-weight:500;">${sanitize(form.currentTitle)}</div>` : ''}
          <div style="font-size:10px;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Contact</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.9);margin-bottom:8px;word-break:break-all;">${email}</div>
          ${phone ? `<div style="font-size:12px;color:rgba(255,255,255,0.9);margin-bottom:8px;">${phone}</div>` : ''}
        </div>
        <div style="flex:1;padding:36px 32px;font-size:13px;line-height:1.85;">${bodyParagraphs}</div>
      </div>`;
  }

  // ── 5. Crisp — minimal, name left / contact right ───────────────────────
  if (form.templateId === 'crisp') {
    return `
      <div style="${base}width:100%;min-height:297mm;box-sizing:border-box;">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;padding:32px 40px 20px;border-bottom:2px solid #0f172a;margin-bottom:32px;">
          <div>
            <div style="font-size:30px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">${sanitize(fullName)}</div>
            ${form.currentTitle ? `<div style="font-size:13px;color:#64748b;margin-top:4px;">${sanitize(form.currentTitle)}</div>` : ''}
          </div>
          <div style="text-align:right;font-size:13px;color:#64748b;line-height:1.7;">
            <div>${email}</div>
            ${phone ? `<div>${phone}</div>` : ''}
          </div>
        </div>
        <div style="padding:0 40px 40px;">${bodyParagraphs}</div>
      </div>`;
  }

  // ── 6. Influx — dark header with color accent bottom border ────────────
  if (form.templateId === 'influx') {
    return `
      <div style="${base}width:100%;min-height:297mm;box-sizing:border-box;">
        <div style="background:#1e293b;padding:36px 40px;border-bottom:5px solid ${color};margin-bottom:36px;">
          <div style="font-size:30px;font-weight:800;color:white;letter-spacing:-0.5px;margin-bottom:6px;">${sanitize(fullName)}</div>
          ${form.currentTitle ? `<div style="font-size:14px;color:${color};font-weight:600;margin-bottom:8px;">${sanitize(form.currentTitle)}</div>` : ''}
          <div style="font-size:13px;color:#94a3b8;display:flex;gap:20px;flex-wrap:wrap;">
            <span>${email}</span>
            ${phone ? `<span>${phone}</span>` : ''}
          </div>
        </div>
        <div style="padding:0 40px 40px;">${bodyParagraphs}</div>
      </div>`;
  }

  // Fallback
  return `<div style="${base}padding:40px;min-height:297mm;">${bodyParagraphs}</div>`;
}

// ── Default form ──────────────────────────────────────────────────────────
const DEFAULT_FORM = {
  templateId: 'cascade', colorHex: '#2563eb',
  firstName: '', lastName: '', email: '', phone: '', yearsExperience: '', currentTitle: '',
  jobTitle: '', companyName: '', hiringManager: '',
  achievement: '', whyThisRole: '',
  selectedStrengths: [], style: 'balanced',
  hasGap: 'no', gapReason: 'upskilling',
  signatureMode: 'type', signatureTypedName: '', signatureFont: 'serif', signatureImage: '',
};

// ── Field component ───────────────────────────────────────────────────────
function Field({ label, children, full }) {
  return (
    <div className={`${styles.field} ${full ? styles.fieldFull : ''}`}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function CoverLetterBuilderClient() {
  const [step, setStep]           = useState(0);
  const [form, setForm]           = useState(DEFAULT_FORM);
  const [jobDescription, setJD]   = useState('');
  const [letterLength, setLen]    = useState('medium');
  const [letterHtml, setHtml]     = useState('');
  const [rndKey, setRndKey]       = useState(0);
  const [fontSize, setFontSize]     = useState('14px');
  const editorRef                   = useRef(null);
  const debounceRef                 = useRef(null);

  const setField = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const strengthOptions = useMemo(() => Object.keys(STRENGTH_SENTENCES), []);
  const isReview = step === STEPS.length - 1;

  // Persist draft
  useEffect(() => {
    try {
      const saved = localStorage.getItem('clDraft');
      if (saved) { const d = JSON.parse(saved); setForm(d.form || DEFAULT_FORM); setJD(d.jd || ''); setLen(d.len || 'medium'); }
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem('clDraft', JSON.stringify({ form, jd: jobDescription, len: letterLength }));
  }, [form, jobDescription, letterLength]);

  // Rebuild letter HTML
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setHtml(buildLetterHtml(form, jobDescription, letterLength, fontSize));
    }, 250);
    return () => clearTimeout(debounceRef.current);
  }, [form, jobDescription, letterLength, rndKey, fontSize]);

  // Sync editable preview
  useEffect(() => {
    if (editorRef.current && letterHtml && editorRef.current.innerHTML !== letterHtml) {
      editorRef.current.innerHTML = letterHtml;
    }
  }, [letterHtml]);

  const downloadPDF = () => {
    const html = editorRef.current?.innerHTML || letterHtml;
    if (!html) return;
    const w = window.open('', '_blank', 'width=900,height=700');
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Cover Letter</title><style>@page{size:A4;margin:16mm}body{margin:0;padding:20mm 15mm;font-family:Inter,sans-serif;font-size:${fontSize};line-height:1.6;color:#0f172a}p{margin:0 0 11px}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}</style></head><body>${html}</body></html>`);
    w.document.close();
    setTimeout(() => { w.focus(); w.print(); w.close(); }, 400);
  };

  const downloadWord = () => {
    const html = editorRef.current?.innerHTML || letterHtml;
    const blob = new Blob([`<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><style>body{font-family:Calibri,sans-serif;font-size:11pt;margin:2cm}p{margin:0 0 8pt}</style></head><body>${html}</body></html>`], { type: 'application/msword' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `Cover_Letter_${form.firstName || 'Download'}.doc`; a.click();
  };

  const downloadText = () => {
    const el = document.createElement('div'); el.innerHTML = editorRef.current?.innerHTML || letterHtml;
    const text = el.innerText || el.textContent || '';
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `Cover_Letter_${form.firstName || 'Download'}.txt`; a.click();
  };

  const progress = Math.round(((step + 1) / STEPS.length) * 100);

  // ── Step panels ───────────────────────────────────────────────────────
  const stepPanels = [
    // 0 — Template & Color
    <div key="template" className={styles.stepCard}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>Choose Your Template & Color</h2>
        <p className={styles.stepSubtitle}>Pick a layout and accent color. The preview updates live.</p>
      </div>
      <div className={styles.block}>
        <p className={styles.blockLabel}>Template</p>
        <div className={styles.templateGrid}>
          {TEMPLATES.map(t => (
            <button key={t.id} type="button"
              className={`${styles.templateCard} ${form.templateId === t.id ? styles.templateCardActive : ''}`}
              onClick={() => setField('templateId', t.id)}
            >
              <div className={styles.templatePreview} style={{ '--accent-color': form.colorHex }}>
                <div className={`${styles.microPreview} ${styles[`micro${t.id.charAt(0).toUpperCase()+t.id.slice(1)}`]}`}>
                  {t.id === 'concept' && <div className={styles.microSidebar} style={{ background: form.colorHex }} />}
                  <div className={styles.microBody}>
                    <div className={styles.microHeader} style={['cascade','iconic','crisp'].includes(t.id) ? { background: form.colorHex } : t.id === 'influx' ? { background: '#1e293b', borderBottom: `4px solid ${form.colorHex}` } : {}} />
                    <div className={`${styles.microLine} ${styles.microLineLong}`} />
                    <div className={`${styles.microLine} ${styles.microLineMedium}`} />
                    <div className={`${styles.microLine} ${styles.microLineShort}`} />
                  </div>
                </div>
              </div>
              <p className={styles.templateLabel}>{t.label}</p>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.block}>
        <p className={styles.blockLabel}>Accent Color</p>
        <div className={styles.colorPalette}>
          {COLORS.map(c => (
            <button key={c.id} type="button"
              className={`${styles.colorSwatch} ${form.colorHex === c.hex ? styles.colorSwatchActive : ''}`}
              style={{ backgroundColor: c.hex }}
              onClick={() => setField('colorHex', c.hex)}
              aria-label={c.id}
            />
          ))}
        </div>
      </div>
    </div>,

    // 1 — Profile
    <div key="profile" className={styles.stepCard}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>Your Profile</h2>
        <p className={styles.stepSubtitle}>Basic details that appear in the letter header.</p>
      </div>
      <div className={styles.fieldGrid}>
        <Field label="First Name"><input className={styles.input} value={form.firstName} onChange={e => setField('firstName', e.target.value)} placeholder="Jane" /></Field>
        <Field label="Last Name"><input className={styles.input} value={form.lastName} onChange={e => setField('lastName', e.target.value)} placeholder="Smith" /></Field>
        <Field label="Email"><input className={styles.input} type="email" value={form.email} onChange={e => setField('email', e.target.value)} placeholder="jane@example.com" /></Field>
        <Field label="Phone"><input className={styles.input} value={form.phone} onChange={e => setField('phone', e.target.value)} placeholder="+1 555 000 0000" /></Field>
        <Field label="Years of Experience"><input className={styles.input} type="number" min="0" value={form.yearsExperience} onChange={e => setField('yearsExperience', e.target.value)} placeholder="5" /></Field>
        <Field label="Current / Most Recent Title"><input className={styles.input} value={form.currentTitle} onChange={e => setField('currentTitle', e.target.value)} placeholder="Senior Product Manager" /></Field>
      </div>
    </div>,

    // 2 — Target Role
    <div key="target" className={styles.stepCard}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>Target Role</h2>
        <p className={styles.stepSubtitle}>Tell us about the job you're applying for.</p>
      </div>
      <div className={styles.fieldGrid}>
        <Field label="Target Job Title"><input className={styles.input} value={form.jobTitle} onChange={e => setField('jobTitle', e.target.value)} placeholder="Product Manager" /></Field>
        <Field label="Target Company"><input className={styles.input} value={form.companyName} onChange={e => setField('companyName', e.target.value)} placeholder="Acme Corp" /></Field>
        <Field label="Hiring Manager (optional)" full><input className={styles.input} value={form.hiringManager} onChange={e => setField('hiringManager', e.target.value)} placeholder="Alex Johnson" /></Field>
      </div>
      <Field label="Job Description (paste for smarter tailoring)" full>
        <textarea className={styles.textarea} rows={6} value={jobDescription} onChange={e => setJD(e.target.value)} placeholder="Paste the full job description here..." />
      </Field>
    </div>,

    // 3 — Experience & Story
    <div key="story" className={styles.stepCard}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>Experience & Story</h2>
        <p className={styles.stepSubtitle}>Add a key achievement and your motivation for this role.</p>
      </div>
      <Field label="One Key Achievement" full>
        <textarea className={styles.textarea} rows={4} value={form.achievement} onChange={e => setField('achievement', e.target.value)} placeholder="e.g. Grew ARR by 40% in 6 months by launching a new pricing tier..." />
      </Field>
      <Field label="Why This Role / Company" full>
        <textarea className={styles.textarea} rows={4} value={form.whyThisRole} onChange={e => setField('whyThisRole', e.target.value)} placeholder="e.g. I'm drawn to Acme's mission to..." />
      </Field>
      <div className={styles.block}>
        <p className={styles.blockLabel}>Career Gap?</p>
        <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
          {['no','yes'].map(v => (
            <label key={v} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: 600 }}>
              <input type="radio" name="hasGap" checked={form.hasGap === v} onChange={() => setField('hasGap', v)} /> {v === 'no' ? 'No gap' : 'Yes, I have a gap'}
            </label>
          ))}
        </div>
        {form.hasGap === 'yes' && (
          <Field label="Gap Reason" full>
            <select className={styles.select} value={form.gapReason} onChange={e => setField('gapReason', e.target.value)}>
              <option value="covid">COVID-19 period</option>
              <option value="upskilling">Upskilling / education</option>
              <option value="caretaking">Caretaking responsibilities</option>
            </select>
          </Field>
        )}
      </div>
    </div>,

    // 4 — Strengths & Style
    <div key="strengths" className={styles.stepCard}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>Strengths & Style</h2>
        <p className={styles.stepSubtitle}>Pick 3 strengths and a writing style that fits you.</p>
      </div>
      <div className={styles.block}>
        <p className={styles.blockLabel}>Select exactly 3 strengths ({form.selectedStrengths.length}/3)</p>
        <div className={styles.pills}>
          {strengthOptions.map(item => {
            const active = form.selectedStrengths.includes(item);
            const disabled = !active && form.selectedStrengths.length >= 3;
            return (
              <button key={item} type="button"
                className={`${styles.pill} ${active ? styles.pillActive : ''}`}
                onClick={() => setForm(p => {
                  if (p.selectedStrengths.includes(item)) return { ...p, selectedStrengths: p.selectedStrengths.filter(s => s !== item) };
                  if (p.selectedStrengths.length >= 3) return p;
                  return { ...p, selectedStrengths: [...p.selectedStrengths, item] };
                })}
                disabled={disabled}
              >{item}</button>
            );
          })}
        </div>
      </div>
      <div className={styles.block}>
        <p className={styles.blockLabel}>Writing Style</p>
        <div className={styles.cardGrid}>
          {Object.entries(STYLE_MODIFIERS).map(([id, s]) => (
            <button key={id} type="button"
              className={`${styles.styleCard} ${form.style === id ? styles.styleCardActive : ''}`}
              onClick={() => setField('style', id)}
            >{s.title}</button>
          ))}
        </div>
      </div>
    </div>,

    // 5 — Signature & Finish
    <div key="signature" className={styles.stepCard}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>Signature & Finish</h2>
        <p className={styles.stepSubtitle}>Add your signature and fine-tune the tone and length.</p>
      </div>
      <div className={styles.block}>
        <p className={styles.blockLabel}>Signature Type</p>
        <div style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
          {[['type','Type my name'],['upload','Upload PNG']].map(([v,l]) => (
            <label key={v} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: 600 }}>
              <input type="radio" name="sigMode" checked={form.signatureMode === v} onChange={() => setField('signatureMode', v)} /> {l}
            </label>
          ))}
        </div>
        {form.signatureMode === 'type' ? (
          <div className={styles.fieldGrid}>
            <Field label="Typed Name"><input className={styles.input} value={form.signatureTypedName} onChange={e => setField('signatureTypedName', e.target.value)} placeholder="Jane Smith" /></Field>
            <Field label="Signature Font">
              <select className={styles.select} value={form.signatureFont} onChange={e => setField('signatureFont', e.target.value)}>
                {SIGNATURE_FONTS.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
              </select>
            </Field>
          </div>
        ) : (
          <Field label="Upload transparent PNG" full>
            <input type="file" accept="image/png" onChange={e => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => setField('signatureImage', reader.result || '');
              reader.readAsDataURL(file);
            }} />
          </Field>
        )}
      </div>
      <div className={styles.block}>
        <p className={styles.blockLabel}>Letter Length</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[['short','Short (~200 words)'],['medium','Medium (~300 words)'],['detailed','Detailed (~400+ words)']].map(([v,l]) => (
            <button key={v} type="button"
              className={`${styles.pill} ${letterLength === v ? styles.pillActive : ''}`}
              onClick={() => setLen(v)}
            >{l}</button>
          ))}
        </div>
      </div>
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '16px 20px', fontSize: '14px', color: '#1e40af' }}>
        ✅ You're all set! Click <strong>Next →</strong> to see your cover letter preview and make final edits.
      </div>
    </div>,
  ];

  // ── Review & Edit layout ──────────────────────────────────────────────
  if (isReview) {
    // A4 at 96dpi = 794px wide. Scale to 60% = 476px displayed width.
    const A4_W = 794;
    const SCALE = 0.60;
    const scaledW = Math.round(A4_W * SCALE);

    const panelStyle = { width: '340px', flexShrink: 0, background: 'white', display: 'flex', flexDirection: 'column', height: '100vh', borderLeft: '1px solid #e2e8f0' };
    const sectionLabel = { fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '10px', marginTop: 0 };
    const inputStyle = { width: '100%', padding: '7px 10px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#0f172a', background: '#f8fafc', boxSizing: 'border-box', fontFamily: 'inherit' };
    const dlBtn = (onClick, bg, color, label) => (
      <button onClick={onClick} style={{ width: '100%', padding: '11px', background: bg, color, border: bg === 'white' ? '1.5px solid #e2e8f0' : 'none', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', marginBottom: '8px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
        {label}
      </button>
    );

    return (
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: 'Inter, sans-serif', background: '#e8edf2' }}>

        {/* ── LEFT: Edit panel ── */}
        <div style={{ ...panelStyle, borderRight: '1px solid #e2e8f0', borderLeft: 'none' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>Review & Edit</h2>
              <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#64748b' }}>Changes update the preview instantly</p>
            </div>
            <button onClick={() => setStep(5)} style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '5px 10px', fontSize: '12px', fontWeight: 600, color: '#64748b', cursor: 'pointer' }}>← Back</button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            {/* Color */}
            <p style={sectionLabel}>Accent Color</p>
            <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {COLORS.map(c => (
                <button key={c.id} type="button" onClick={() => setField('colorHex', c.hex)}
                  style={{ width: '26px', height: '26px', borderRadius: '50%', background: c.hex, border: form.colorHex === c.hex ? '3px solid #0f172a' : '2px solid white', boxShadow: '0 0 0 1px #e2e8f0', cursor: 'pointer' }}
                  aria-label={c.id} />
              ))}
            </div>

            {/* Name & Contact */}
            {[
              { label: 'Name', fields: [['firstName','First'],['lastName','Last']] },
              { label: 'Contact', fields: [['email','Email'],['phone','Phone']] },
              { label: 'Role', fields: [['jobTitle','Job Title'],['companyName','Company'],['hiringManager','Hiring Manager'],['currentTitle','Your Title']] },
            ].map(g => (
              <div key={g.label} style={{ marginBottom: '18px' }}>
                <p style={sectionLabel}>{g.label}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {g.fields.map(([k, lbl]) => (
                    <div key={k}>
                      <label style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '3px' }}>{lbl}</label>
                      <input value={form[k]} onChange={e => setField(k, e.target.value)} style={inputStyle} />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ marginBottom: '18px' }}>
              <p style={sectionLabel}>Key Achievement</p>
              <textarea value={form.achievement} onChange={e => setField('achievement', e.target.value)} rows={3}
                style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <p style={sectionLabel}>Why This Role</p>
              <textarea value={form.whyThisRole} onChange={e => setField('whyThisRole', e.target.value)} rows={3}
                style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            {/* Letter length */}
            <div style={{ marginBottom: '18px' }}>
              <p style={sectionLabel}>Letter Length</p>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[['short','Short'],['medium','Medium'],['detailed','Detailed']].map(([v,l]) => (
                  <button key={v} type="button" onClick={() => setLen(v)}
                    style={{ padding: '5px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, border: '1.5px solid', borderColor: letterLength === v ? '#2563eb' : '#e2e8f0', background: letterLength === v ? '#eff6ff' : 'white', color: letterLength === v ? '#2563eb' : '#64748b', cursor: 'pointer' }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <button type="button" onClick={() => setRndKey(k => k + 1)}
              style={{ width: '100%', padding: '9px', border: '2px solid #2563eb', borderRadius: '10px', background: 'white', color: '#2563eb', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
              🎲 Regenerate Content
            </button>
          </div>
        </div>

        {/* ── CENTER: A4 Preview ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', overflow: 'hidden', position: 'relative' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '16px', alignSelf: 'flex-start' }}>
            Live Preview
          </p>

          {/* Scale wrapper — fixed height, no scroll */}
          <div style={{ position: 'relative', width: `${scaledW}px`, height: `${Math.round(1122 * SCALE)}px`, flexShrink: 0, overflow: 'hidden' }}>
            {/* The A4 sheet scaled to 60% */}
            <div style={{ transform: `scale(${SCALE})`, transformOrigin: 'top left', width: `${A4_W}px`, boxShadow: '0 8px 40px rgba(0,0,0,0.18)', background: 'white' }}>
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                style={{ width: '210mm', minHeight: '297mm', padding: '0', background: 'white', outline: 'none', fontSize, lineHeight: 1.85, color: '#334155', fontFamily: 'Inter, sans-serif', cursor: 'text', overflow: 'hidden' }}
                onInput={() => { if (debounceRef.current) clearTimeout(debounceRef.current); }}
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Download panel ── */}
        <div style={panelStyle}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
            <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>Download & Export</h2>
            <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#64748b' }}>Choose your format</p>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            {/* Font size */}
            <p style={sectionLabel}>Font Size</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              {[['12px','Small'],['14px','Medium'],['16px','Large']].map(([v,l]) => (
                <button key={v} type="button" onClick={() => setFontSize(v)}
                  style={{ flex: 1, padding: '8px 4px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, border: '1.5px solid', borderColor: fontSize === v ? '#2563eb' : '#e2e8f0', background: fontSize === v ? '#eff6ff' : 'white', color: fontSize === v ? '#2563eb' : '#64748b', cursor: 'pointer' }}>
                  {l}
                </button>
              ))}
            </div>

            {/* Download buttons */}
            <p style={sectionLabel}>Export Format</p>
            {dlBtn(downloadPDF, '#2563eb', 'white', <><span style={{ fontSize: '18px' }}>📄</span><div><div style={{ fontSize: '13px' }}>Download PDF</div><div style={{ fontSize: '10px', opacity: 0.8, fontWeight: 400 }}>Best for job applications</div></div></>)}
            {dlBtn(downloadWord, '#1d6f42', 'white', <><span style={{ fontSize: '18px' }}>📝</span><div><div style={{ fontSize: '13px' }}>Download Word (.doc)</div><div style={{ fontSize: '10px', opacity: 0.8, fontWeight: 400 }}>Editable in Microsoft Word</div></div></>)}
            {dlBtn(downloadText, 'white', '#374151', <><span style={{ fontSize: '18px' }}>📋</span><div><div style={{ fontSize: '13px' }}>Export Plain Text</div><div style={{ fontSize: '10px', color: '#64748b', fontWeight: 400 }}>For online application forms</div></div></>)}

            <div style={{ height: '1px', background: '#f1f5f9', margin: '16px 0' }} />

            {/* Template switcher */}
            <p style={sectionLabel}>Switch Template</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
              {TEMPLATES.map(t => (
                <button key={t.id} type="button" onClick={() => setField('templateId', t.id)}
                  style={{ padding: '8px', border: '1.5px solid', borderColor: form.templateId === t.id ? '#2563eb' : '#e2e8f0', borderRadius: '8px', background: form.templateId === t.id ? '#eff6ff' : 'white', fontSize: '12px', fontWeight: 600, color: form.templateId === t.id ? '#2563eb' : '#475569', cursor: 'pointer' }}>
                  {t.label}
                </button>
              ))}
            </div>

            <div style={{ height: '1px', background: '#f1f5f9', margin: '16px 0' }} />

            <Link href="/resume/ats-checker"
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', textDecoration: 'none', color: '#374151', fontWeight: 600, fontSize: '13px' }}>
              <span style={{ fontSize: '18px' }}>🔍</span>
              <div>
                <div>Run ATS Check</div>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 400 }}>Score your resume too</div>
              </div>
            </Link>
          </div>

          <div style={{ padding: '16px 20px', borderTop: '1px solid #e2e8f0' }}>
            <button onClick={() => setStep(5)} style={{ width: '100%', padding: '10px', background: 'none', border: '1px solid #e2e8f0', borderRadius: '10px', fontWeight: 600, fontSize: '13px', color: '#64748b', cursor: 'pointer' }}>
              ← Edit Letter
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Wizard layout ─────────────────────────────────────────────────────
  return (
    <div className={styles.wizardPage}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.sidebarLogo}>
          <div className={styles.sidebarLogoIcon}>✉</div>
          <span className={styles.sidebarLogoText}>RESUGROW</span>
        </Link>
        <nav className={styles.sidebarNav}>
          {STEPS.map((s, i) => (
            <button key={s.id} type="button"
              className={`${styles.sidebarStep} ${i === step ? styles.sidebarStepActive : ''}`}
              onClick={() => i < step && setStep(i)}
              disabled={i > step}
            >
              <span className={styles.stepIcon}>{i < step ? '✓' : i + 1}</span>
              {s.label}
            </button>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>Draft auto-saved</p>
        </div>
      </aside>

      {/* Main */}
      <div className={styles.mainArea}>
        {/* Progress bar */}
        <div className={styles.progressBarContainer}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.progressLabel}>Step {step + 1} of {STEPS.length} — {progress}%</span>
        </div>

        {/* Step content */}
        <div className={styles.stepContent}>
          {stepPanels[step]}
        </div>

        {/* Footer nav */}
        <div className={styles.stepFooter}>
          <button type="button" className={styles.backBtn} disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))}>
            ← Back
          </button>
          <button type="button" className={styles.continueBtn} onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}>
            {step === STEPS.length - 2 ? 'Preview My Letter →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
