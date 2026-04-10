'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { renderCommunityTemplate } from '@/lib/communityTemplateRenderer';
import styles from '../marketplace.module.css';

const DEFAULT_HTML = `<div class="resume-shell">
  <header class="hero-block">
    <div>
      <p class="eyebrow">Community ATS Layout</p>
      <h1>{{fullName}}</h1>
      <p class="role">{{currentPosition}}</p>
    </div>
    <div class="contact-block">
      <p>{{email}}</p>
      <p>{{phone}}</p>
      <p>{{location}}</p>
      <p>{{linkedin}}</p>
    </div>
  </header>
  <section class="section">
    <h2>Summary</h2>
    <p>{{summary}}</p>
  </section>
  <section class="section">
    <h2>Core Skills</h2>
    <div class="chip-row">{{{skillsList}}}</div>
  </section>
  <section class="section">
    <h2>Experience</h2>
    {{{experienceItems}}}
  </section>
  <section class="section split">
    <div>
      <h2>Projects</h2>
      {{{projectItems}}}
    </div>
    <div>
      <h2>Education</h2>
      {{{educationItems}}}
      <h2>Certifications</h2>
      <ul>{{{certificationItems}}}</ul>
    </div>
  </section>
</div>`;

const DEFAULT_CSS = `.resume-shell { background:#fff; color:#0f172a; border-radius:28px; padding:32px; border:1px solid #e2e8f0; }
.hero-block { display:flex; justify-content:space-between; gap:24px; padding-bottom:20px; margin-bottom:22px; border-bottom:1px solid #dbe4ff; }
.eyebrow { font-size:11px; font-weight:800; letter-spacing:0.12em; text-transform:uppercase; color:#7c3aed; margin-bottom:8px; }
h1 { margin:0 0 6px; font-size:34px; line-height:1; }
.role { margin:0; color:#475467; font-size:15px; }
.contact-block { text-align:right; font-size:12px; color:#475467; }
.section { margin-bottom:22px; }
.section h2 { font-size:13px; text-transform:uppercase; letter-spacing:0.12em; color:#111827; margin-bottom:10px; }
.split { display:grid; grid-template-columns:1.2fr 0.8fr; gap:22px; }
.chip-row { display:flex; flex-wrap:wrap; }
ul { padding-left:18px; }`;

const CATEGORY_OPTIONS = ['ATS', 'Modern', 'Executive', 'Creative', 'Minimal', 'Technical', 'Academic'];

const TOKEN_GUIDE = [
  '{{fullName}}', '{{currentPosition}}', '{{email}}', '{{phone}}',
  '{{location}}', '{{website}}', '{{linkedin}}', '{{summary}}',
  '{{{skillsList}}}', '{{{strengthsList}}}', '{{{experienceItems}}}',
  '{{{educationItems}}}', '{{{projectItems}}}', '{{{certificationItems}}}',
  '{{{achievementItems}}}', '{{{languageItems}}}',
];

const INITIAL_FORM = {
  name: '', slug: '', category: 'ATS', description: '',
  tags: 'ATS-Friendly, Modern, Recruiter-Ready',
  authorName: '', authorEmail: '', authorWebsite: '', previewImageUrl: '',
  htmlMarkup: DEFAULT_HTML, cssStyles: DEFAULT_CSS, notes: '',
};

export default function SubmitCommunityTemplatePage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const previewHtml = useMemo(
    () => renderCommunityTemplate({ htmlMarkup: form.htmlMarkup, cssStyles: form.cssStyles }),
    [form.htmlMarkup, form.cssStyles],
  );

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
    setSubmitError(''); setSubmitSuccess('');
  }

  function handleNameChange(value) {
    const slug = value.toLowerCase().trim()
      .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    setForm(prev => ({ ...prev, name: value, slug: prev.slug ? prev.slug : slug }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true); setSubmitError(''); setSubmitSuccess('');
    try {
      const res = await fetch('/api/community-templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || data.error) { setSubmitError(data.error || 'Unable to submit right now.'); return; }
      setSubmitSuccess(data.message || 'Template submitted successfully.');
      setForm(prev => ({ ...INITIAL_FORM, authorName: prev.authorName, authorEmail: prev.authorEmail, authorWebsite: prev.authorWebsite }));
    } catch {
      setSubmitError('Something went wrong while submitting your template.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroGlow} />
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Submit to Marketplace
          </div>
          <h1 className={styles.title}>
            Ship Your Template Into the<br />
            <span className={styles.titleGradient}>ResuGrow Ecosystem</span>
          </h1>
          <p className={styles.subtitle}>
            Build an HTML/CSS resume template, preview it live with real data, and submit for review.
            We check ATS readability, layout quality, and safe rendering before publishing.
          </p>
          <div className={styles.heroActions}>
            <Link href="/resume/template-marketplace/my" className={styles.secondaryAction}>My Submissions</Link>
            <Link href="/resume/template-marketplace" className={styles.secondaryAction}>Browse Marketplace</Link>
          </div>
        </section>

        {/* ── Two-column layout ── */}
        <div className={styles.submitLayout}>

          {/* ── Left: Form ── */}
          <article className={styles.submitPanel}>
            <h2 className={styles.sectionTitle}>Creator Submission Studio</h2>
            <p className={styles.sectionText}>
              Keep scripts out of the markup. The goal is a clean HTML/CSS layout that renders safely and can be reviewed for builder integration.
            </p>

            {submitSuccess && <div className={styles.successBox}>{submitSuccess}</div>}
            {submitError   && <div className={styles.errorBox}>{submitError}</div>}
            <div className={styles.helperBox}>
              Submissions go live only after manual review — we check ATS-friendliness, visual polish, safe markup, and whether the layout scales to real content.
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label htmlFor="name">Template name</label>
                  <input id="name" className={styles.input} value={form.name} onChange={e => handleNameChange(e.target.value)} placeholder="Aurora ATS Minimal" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="slug">Slug</label>
                  <input id="slug" className={styles.input} value={form.slug} onChange={e => updateField('slug', e.target.value.toLowerCase())} placeholder="aurora-ats-minimal" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="category">Category</label>
                  <select id="category" className={styles.select} value={form.category} onChange={e => updateField('category', e.target.value)}>
                    {CATEGORY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="tags">Tags</label>
                  <input id="tags" className={styles.input} value={form.tags} onChange={e => updateField('tags', e.target.value)} placeholder="ATS-Friendly, Minimal, Professional" />
                </div>
                <div className={styles.fieldFull}>
                  <label htmlFor="description">Description</label>
                  <textarea id="description" className={styles.textarea} value={form.description} onChange={e => updateField('description', e.target.value)} placeholder="Explain the design direction, best-fit audience, and why this template stands out." />
                </div>
                <div className={styles.field}>
                  <label htmlFor="authorName">Author name</label>
                  <input id="authorName" className={styles.input} value={form.authorName} onChange={e => updateField('authorName', e.target.value)} placeholder="Avery Morgan" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="authorEmail">Author email</label>
                  <input id="authorEmail" type="email" className={styles.input} value={form.authorEmail} onChange={e => updateField('authorEmail', e.target.value)} placeholder="avery@example.com" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="authorWebsite">Author website</label>
                  <input id="authorWebsite" className={styles.input} value={form.authorWebsite} onChange={e => updateField('authorWebsite', e.target.value)} placeholder="https://averymorgan.design" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="previewImageUrl">Preview image URL</label>
                  <input id="previewImageUrl" className={styles.input} value={form.previewImageUrl} onChange={e => updateField('previewImageUrl', e.target.value)} placeholder="https://..." />
                </div>
                <div className={styles.fieldFull}>
                  <label htmlFor="htmlMarkup">HTML markup</label>
                  <textarea id="htmlMarkup" className={styles.code} value={form.htmlMarkup} onChange={e => updateField('htmlMarkup', e.target.value)} />
                </div>
                <div className={styles.fieldFull}>
                  <label htmlFor="cssStyles">CSS styles</label>
                  <textarea id="cssStyles" className={styles.code} value={form.cssStyles} onChange={e => updateField('cssStyles', e.target.value)} />
                </div>
                <div className={styles.fieldFull}>
                  <label htmlFor="notes">Notes for reviewer</label>
                  <textarea id="notes" className={styles.textarea} value={form.notes} onChange={e => updateField('notes', e.target.value)} placeholder="Mention export assumptions, spacing strategy, or ATS intent." />
                </div>
              </div>

              <div className={styles.actionsRow}>
                <button type="submit" className={styles.submitBtn} disabled={submitting}>
                  {submitting ? 'Submitting…' : '✦ Submit to Marketplace'}
                </button>
                <button type="button" className={styles.resetBtn} onClick={() => setForm(INITIAL_FORM)}>
                  Reset
                </button>
              </div>
            </form>
          </article>

          {/* ── Right: Preview + Token guide ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <article className={styles.previewPanel}>
              <div className={styles.previewHead}>
                <div>
                  <h2 className={styles.sectionTitle}>Live Preview</h2>
                  <p className={styles.sectionText} style={{ marginBottom: 0 }}>Updates as you edit HTML and CSS.</p>
                </div>
              </div>
              <div className={styles.livePreviewWrap}>
                <iframe
                  title="Community template live preview"
                  srcDoc={previewHtml}
                  className={styles.liveFrame}
                  sandbox=""
                />
              </div>
            </article>

            <article className={styles.tokenList}>
              <h2 className={styles.sectionTitle}>Template tokens</h2>
              <p className={styles.sectionText}>Use these placeholders in your markup — ResuGrow hydrates them with real resume data.</p>
              <ul>
                {TOKEN_GUIDE.map(token => (
                  <li key={token}><code style={{ fontSize: 12, color: '#7c3aed', background: '#f5f3ff', padding: '2px 6px', borderRadius: 4 }}>{token}</code></li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}
