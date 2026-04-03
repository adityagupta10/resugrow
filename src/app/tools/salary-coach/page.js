'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';

// ── Icons (inline SVG to avoid any import issues) ─────────────────────────
const IconZap = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
const IconChevDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>;
const IconChevUp = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg>;
const IconCopy = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>;
const IconCheck = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
const IconX = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
const IconArrowLeft = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>;
const IconTrending = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>;
const IconMail = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>;
const IconTarget = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>;
const IconBriefcase = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>;
const IconBook = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>;

// ── Constants ─────────────────────────────────────────────────────────────
const LOCATIONS = [
  { value: 'san_francisco', label: 'San Francisco, CA' },
  { value: 'new_york', label: 'New York, NY' },
  { value: 'london', label: 'London, UK' },
  { value: 'toronto', label: 'Toronto, CA' },
  { value: 'sydney', label: 'Sydney, AU' },
  { value: 'berlin', label: 'Berlin, DE' },
  { value: 'singapore', label: 'Singapore, SG' },
  { value: 'bangalore', label: 'Bangalore, IN' },
  { value: 'remote', label: 'Remote (Global)' },
];

const CURRENCIES = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'GBP', label: 'GBP (£)' },
  { value: 'CAD', label: 'CAD (C$)' },
  { value: 'AUD', label: 'AUD (A$)' },
  { value: 'INR', label: 'INR (₹)' },
];

const COMPANY_TYPES = [
  { value: 'product', label: 'Product' },
  { value: 'startup', label: 'Startup' },
  { value: 'mnc', label: 'MNC' },
  { value: 'service', label: 'IT Services' },
  { value: 'government_psu', label: 'Govt / PSU' },
];

const SECTORS = [
  { value: 'general', label: 'General' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'healthtech', label: 'Healthtech' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'saas', label: 'SaaS' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'edtech', label: 'EdTech' },
  { value: 'media', label: 'Media' },
  { value: 'other', label: 'Other' },
];

const SCRIPT_KEYS = ['openingStatement', 'marketDataReference', 'valueProposition', 'counterOfferAsk', 'objectionHandling', 'closingStatement'];
const SCRIPT_LABELS = ['Opening Statement', 'Market Data Reference', 'Value Proposition', 'Counter-Offer Ask', 'Handling "Out of Budget"', 'Closing Statement'];
const SCRIPT_ICONS = ['👋', '📊', '💎', '💰', '🛡️', '🤝'];

const EMAIL_TABS = [
  { label: 'Initial Response', key: 'initialResponse' },
  { label: 'Counter Offer', key: 'counterOffer' },
  { label: 'Follow-Up', key: 'followUp' },
  { label: 'Acceptance', key: 'acceptance' },
];

const SCENARIOS = [
  {
    label: 'SDE 4 yrs, $140K, San Francisco',
    data: { role: 'Software Engineer', yearsExperience: '4', offeredCTC: '140', currentCTC: '110', location: 'san_francisco', currency: 'USD', companyType: 'product', sector: 'general', skills: ['React', 'Node.js', 'AWS'] },
  },
  {
    label: 'Product Manager 6 yrs, £85K, London, MNC',
    data: { role: 'Product Manager', yearsExperience: '6', offeredCTC: '85', currentCTC: '65', location: 'london', currency: 'GBP', companyType: 'mnc', sector: 'fintech', skills: ['Product Roadmap', 'OKRs', 'Agile'] },
  },
  {
    label: 'Data Scientist 3 yrs, ₹18L, Bangalore, Startup',
    data: { role: 'Data Scientist', yearsExperience: '3', offeredCTC: '18', currentCTC: '12', location: 'bangalore', currency: 'INR', companyType: 'startup', sector: 'healthtech', skills: ['Python', 'TensorFlow', 'SQL'] },
  },
];

const ROLE_SUGGESTIONS = [
  'Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
  'Data Scientist', 'Data Analyst', 'ML Engineer', 'DevOps Engineer', 'Cloud Architect',
  'Product Manager', 'Product Analyst', 'UI/UX Designer', 'Tech Lead', 'Engineering Manager',
  'Marketing Manager', 'Business Analyst', 'HR Manager', 'Sales Manager', 'Finance Analyst',
  'QA Engineer', 'Security Engineer', 'Scrum Master', 'Content Writer',
];

// ── Helpers ───────────────────────────────────────────────────────────────
function formatVal(val, curr) {
  if (curr === 'INR') return '₹' + val + 'L';
  if (curr === 'EUR') return '€' + val + 'K';
  if (curr === 'GBP') return '£' + val + 'K';
  return '$' + val + 'K';
}

function formatSuffix(curr) {
  if (curr === 'INR') return 'LPA';
  return '/ yr';
}

function getPctOnBar(val, barMin, barMax) {
  return Math.max(2, Math.min(97, ((val - barMin) / (barMax - barMin)) * 100));
}

function getVerdictClass(color, styles) {
  if (color === 'red') return styles.verdictRed;
  if (color === 'orange') return styles.verdictOrange;
  if (color === 'blue') return styles.verdictBlue;
  return styles.verdictGreen;
}

function getOfferDotClass(color, styles) {
  if (color === 'red') return styles.offerDotRed;
  if (color === 'orange') return styles.offerDotOrange;
  if (color === 'blue') return styles.offerDotBlue;
  return '';
}

// ── Main component ────────────────────────────────────────────────────────
export default function SalaryCoachPage() {
  // Form state
  const [form, setForm] = useState({
    role: '',
    yearsExperience: '',
    offeredCTC: '',
    currentCTC: '',
    location: 'san_francisco',
    currency: 'USD',
    companyType: 'product',
    sector: 'general',
    skillInput: '',
    skills: [],
  });

  // App state
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [activeEmailTab, setActiveEmailTab] = useState(0);
  const [expandedScript, setExpandedScript] = useState(0);
  const [copiedKey, setCopiedKey] = useState(null);

  const skillInputRef = useRef(null);
  const resultsRef = useRef(null);

  // Scroll to results on success
  useEffect(() => {
    if (results && !showForm && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [results, showForm]);

  // ── Handlers ──────────────────────────────────────────────────────────
  function setField(key, value) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function applyScenario(data) {
    setForm(f => ({
      ...f,
      role: data.role || f.role,
      yearsExperience: data.yearsExperience || f.yearsExperience,
      offeredCTC: data.offeredCTC || f.offeredCTC,
      currentCTC: data.currentCTC || f.currentCTC,
      location: data.location || f.location,
      currency: data.currency || f.currency,
      companyType: data.companyType || f.companyType,
      sector: data.sector || f.sector,
      skills: data.skills || f.skills,
      skillInput: '',
    }));
  }

  function handleSkillKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = form.skillInput.trim().replace(/,$/, '');
      if (val && !form.skills.includes(val)) {
        setForm(f => ({ ...f, skills: [...f.skills, val], skillInput: '' }));
      }
    }
  }

  function removeSkill(skill) {
    setForm(f => ({ ...f, skills: f.skills.filter(s => s !== skill) }));
  }

  async function copyText(text, key) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      // clipboard access denied
    }
  }

  async function handleSubmit() {
    if (!form.role.trim()) { setError('Please enter your job role.'); return; }
    if (!form.yearsExperience && form.yearsExperience !== 0) { setError('Please enter your years of experience.'); return; }
    if (!form.offeredCTC) { setError('Please enter the offered CTC.'); return; }

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/salary-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: form.role,
          currency: form.currency,
          yearsExperience: form.yearsExperience,
          offeredCTC: form.offeredCTC,
          currentCTC: form.currentCTC || null,
          location: form.location,
          companyType: form.companyType,
          sector: form.sector,
          skills: form.skills,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) { setError(data.error || 'Something went wrong. Please try again.'); return; }
      setResults(data);
      setShowForm(false);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleEditInputs() {
    setShowForm(true);
    setResults(null);
    setActiveEmailTab(0);
    setExpandedScript(0);
  }

  // ── Range bar rendering ──────────────────────────────────────────────
  function renderRangeBar(ma) {
    const barMin = ma.minRange * 0.80;
    const barMax = ma.maxRange * 1.12;
    const minPct = getPctOnBar(ma.minRange, barMin, barMax);
    const midPct = getPctOnBar(ma.midRange, barMin, barMax);
    const maxPct = getPctOnBar(ma.maxRange, barMin, barMax);
    const offerPct = getPctOnBar(ma.offeredCTC, barMin, barMax);
    const dotClass = getOfferDotClass(ma.verdictColor, styles);

    return (
      <div className={styles.rangeBarWrap}>
        <div className={styles.rangeBar}>
          {/* Filled region min→max */}
          <div
            className={styles.rangeBarFill}
            style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
          />
          {/* Min marker */}
          <div className={styles.rangeMarker} style={{ left: `${minPct}%` }}>
            <div className={`${styles.rangeLineMin}`} />
          </div>
          {/* Mid marker */}
          <div className={styles.rangeMarker} style={{ left: `${midPct}%` }}>
            <div className={styles.rangeLineMid} />
          </div>
          {/* Max marker */}
          <div className={styles.rangeMarker} style={{ left: `${maxPct}%` }}>
            <div className={styles.rangeLineMax} />
          </div>
          {/* Offer dot */}
          <div className={styles.rangeMarker} style={{ left: `${offerPct}%`, zIndex: 2 }}>
            <div className={`${styles.offerDot} ${dotClass}`} />
          </div>
        </div>

        {/* Labels row */}
        <div className={styles.rangeLabelsRow}>
          <span style={{ position: 'absolute', left: `${minPct}%`, transform: 'translateX(-50%)' }}>
            <span className={styles.rangeLabelVal}>{formatVal(ma.minRange, form.currency)}</span>
            <span className={styles.rangeLabelName}>Min</span>
          </span>
          <span style={{ position: 'absolute', left: `${midPct}%`, transform: 'translateX(-50%)' }}>
            <span className={styles.rangeLabelVal}>{formatVal(ma.midRange, form.currency)}</span>
            <span className={styles.rangeLabelName}>Market Mid</span>
          </span>
          <span style={{ position: 'absolute', left: `${maxPct}%`, transform: 'translateX(-50%)' }}>
            <span className={styles.rangeLabelVal}>{formatVal(ma.maxRange, form.currency)}</span>
            <span className={styles.rangeLabelName}>Max</span>
          </span>
          <span style={{ position: 'absolute', left: `${offerPct}%`, transform: 'translateX(-50%)', top: '28px' }}>
            <span className={`${styles.rangeLabelVal} ${styles.offerLabelVal}`}>{formatVal(ma.offeredCTC, form.currency)}</span>
            <span className={`${styles.rangeLabelName} ${styles.offerLabelName}`}>Your Offer</span>
          </span>
        </div>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.hero}>
          <p className={styles.kicker}>Salary Coach : Negotiation Strategist</p>
          <h1 className={styles.title}>Salary Negotiation Coach</h1>
          <p className={styles.subtitle}>
            Global salary benchmarks, a personalised negotiation script, and ready-to-send email templates — built for your exact offer.
          </p>
        </section>

        {/* ── FORM ──────────────────────────────────────────────────────── */}
        {showForm && (
          <div className={`${styles.formPanel} ${styles.inputPanel}`} style={{ margin: '0 auto' }}>
            <div className={styles.panelHeader} style={{ textAlign: 'center' }}>
              <h2 style={{ justifyContent: 'center' }}>Your Offer Details</h2>
              <p>Fill in your details to get a personalised negotiation strategy and email templates.</p>
            </div>

            {/* Row 1: Role + Experience */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Job Role *</label>
                <input
                  list="role-suggestions"
                  className={styles.formInput}
                  placeholder="e.g. Software Engineer, Product Manager…"
                  value={form.role}
                  onChange={e => setField('role', e.target.value)}
                />
                <datalist id="role-suggestions">
                  {ROLE_SUGGESTIONS.map(r => <option key={r} value={r} />)}
                </datalist>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Years of Experience *</label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  className={styles.formInput}
                  placeholder="e.g. 4"
                  value={form.yearsExperience}
                  onChange={e => setField('yearsExperience', e.target.value)}
                />
              </div>
            </div>

            {/* Row 2: Offered CTC + Current CTC */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Offered CTC (LPA) *</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  className={styles.formInput}
                  placeholder="e.g. 22"
                  value={form.offeredCTC}
                  onChange={e => setField('offeredCTC', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Current CTC (LPA) <span className={styles.optionalTag}>optional</span></label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  className={styles.formInput}
                  placeholder="e.g. 16"
                  value={form.currentCTC}
                  onChange={e => setField('currentCTC', e.target.value)}
                />
              </div>
            </div>

            {/* Row 3: Location + Sector */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Location</label>
                <select
                  className={styles.formSelect}
                  value={form.location}
                  onChange={e => setField('location', e.target.value)}
                >
                  {LOCATIONS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Sector <span className={styles.optionalTag}>optional</span></label>
                <select
                  className={styles.formSelect}
                  value={form.sector}
                  onChange={e => setField('sector', e.target.value)}
                >
                  {SECTORS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>

            {/* Row 4: Company Type */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Company Type</label>
              <div className={styles.typePills}>
                {COMPANY_TYPES.map(ct => (
                  <button
                    key={ct.value}
                    type="button"
                    className={`${styles.typePill} ${form.companyType === ct.value ? styles.typePillActive : ''}`}
                    onClick={() => setField('companyType', ct.value)}
                  >
                    {ct.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 5: Skills */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Key Skills <span className={styles.optionalTag}>press Enter to add</span></label>
              <div
                className={styles.skillsInputWrapper}
                onClick={() => skillInputRef.current?.focus()}
              >
                {form.skills.map(skill => (
                  <span key={skill} className={styles.skillChip}>
                    {skill}
                    <button
                      type="button"
                      className={styles.skillRemoveBtn}
                      onClick={e => { e.stopPropagation(); removeSkill(skill); }}
                    >
                      <IconX />
                    </button>
                  </span>
                ))}
                <input
                  ref={skillInputRef}
                  className={styles.skillRawInput}
                  placeholder={form.skills.length === 0 ? 'React, AWS, System Design…' : ''}
                  value={form.skillInput}
                  onChange={e => setField('skillInput', e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                />
              </div>
            </div>

            {/* Quick scenarios */}
            <div className={styles.scenariosSection}>
              <p className={styles.sectionLabel}>Quick scenarios</p>
              <div className={styles.scenarioChips}>
                {SCENARIOS.map(s => (
                  <button
                    key={s.label}
                    type="button"
                    className={styles.scenarioChip}
                    onClick={() => applyScenario(s.data)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button className={styles.primaryBtn} onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <span className={styles.spinner} />
              ) : (
                <>
                  <IconZap />
                  <span>Analyse My Offer</span>
                </>
              )}
            </button>
            {error && <p className={styles.errorMsg}>{error}</p>}
          </div>
        )}

        {/* ── RESULTS ───────────────────────────────────────────────────── */}
        {results && !showForm && (
          <div ref={resultsRef} className={styles.container}>
            {/* Edit inputs CTA */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
              <button className={styles.editBtn} onClick={handleEditInputs}>
                <IconArrowLeft />
                Edit Inputs
              </button>
            </div>

            <div className={`${styles.outputPanel}`}>
              {/* ── METRICS & SCRIPT SECTION ──────────────────────────────────────── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Market Analysis Card */}
                <div className={styles.analysisCard}>
                  <p className={styles.cardTitle}><IconTrending /> Market Analysis</p>

                  {/* Detected role + band badges */}
                  <div className={styles.detectedBadges}>
                    <span className={styles.roleBadge}>{results.detectedRole}</span>
                    <span className={styles.expBadge}>{results.expBand} yrs</span>
                  </div>

                  {/* Range bar */}
                  {renderRangeBar(results.marketAnalysis)}

                  {/* Spacer for label overflow */}
                  <div style={{ height: '52px' }} />

                  {/* Verdict badge */}
                  <div className={`${styles.verdictBadge} ${getVerdictClass(results.marketAnalysis.verdictColor, styles)}`}>
                    {results.marketAnalysis.verdict}
                    {results.marketAnalysis.pctFromMid !== 0 && (
                      <span>
                        ({results.marketAnalysis.pctFromMid > 0 ? '+' : ''}{results.marketAnalysis.pctFromMid}% vs market mid)
                      </span>
                    )}
                  </div>

                  <p className={styles.analysisText}>{results.marketAnalysis.analysisText}</p>

                  {/* Increment analysis (if currentCTC was provided) */}
                  {results.incrementAnalysis && (
                    <div className={`${styles.incrementBadge} ${results.incrementAnalysis.color === 'red' ? styles.incrementRed : results.incrementAnalysis.color === 'blue' ? styles.incrementBlue : styles.incrementGreen}`}>
                      <strong>Increment vs current CTC:</strong> +{results.incrementAnalysis.increment}% — {results.incrementAnalysis.label}
                    </div>
                  )}
                </div>

                {/* Recommended Ask Card */}
                <div className={styles.askCard}>
                  <p className={styles.cardTitle}><IconTarget /> Recommended Ask</p>
                  <p className={styles.askLabel}>Target CTC</p>
                  <p className={styles.askAmount}>{formatVal(results.recommendedAsk.target, form.currency)} <span className={styles.askLpa}>{formatSuffix(form.currency)}</span></p>
                  <div className={styles.askSubRow}>
                    <div className={styles.askSubItem}>
                      <span className={styles.askSubLabel}>Minimum acceptable</span>
                      <span className={styles.askSubValue}>{formatVal(results.recommendedAsk.minAcceptable, form.currency)} {formatSuffix(form.currency)}</span>
                    </div>
                    <div className={styles.askSubItem}>
                      <span className={styles.askSubLabel}>Maximum ask</span>
                      <span className={styles.askSubValue}>{formatVal(results.recommendedAsk.maxAsk, form.currency)} {formatSuffix(form.currency)}</span>
                    </div>
                  </div>
                  <p className={styles.askRationale}>{results.recommendedAsk.rationale}</p>
                </div>

                {/* Negotiation Script Accordion */}
                <div className={styles.scriptCard}>
                  <p className={styles.cardTitle}>🗣️ Negotiation Script</p>
                  <div className={styles.scriptAccordion}>
                    {SCRIPT_KEYS.map((key, i) => {
                      const isOpen = expandedScript === i;
                      return (
                        <div key={key} className={styles.scriptItem}>
                          <button
                            type="button"
                            className={`${styles.scriptHeader} ${isOpen ? styles.scriptHeaderOpen : ''}`}
                            onClick={() => setExpandedScript(isOpen ? -1 : i)}
                          >
                            <span className={styles.scriptTitleRow}>
                              <span className={styles.scriptStepNum}>{SCRIPT_ICONS[i]}</span>
                              <span className={styles.scriptTitle}>{SCRIPT_LABELS[i]}</span>
                            </span>
                            <span className={`${styles.scriptChevron} ${isOpen ? styles.scriptChevronOpen : ''}`}>
                              {isOpen ? <IconChevUp /> : <IconChevDown />}
                            </span>
                          </button>
                          {isOpen && (
                            <div className={styles.scriptBody}>
                              <p className={styles.scriptText}>{results.negotiationScript[key]}</p>
                              <div className={styles.scriptCopyRow}>
                                <button
                                  className={`${styles.copyBtn} ${copiedKey === `script_${key}` ? styles.copiedBtn : ''}`}
                                  onClick={() => copyText(results.negotiationScript[key], `script_${key}`)}
                                >
                                  {copiedKey === `script_${key}` ? <><IconCheck /> Copied</> : <><IconCopy /> Copy</>}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {/* Copy full script */}
                  <button
                    className={`${styles.copyBtn} ${styles.copyFullBtn} ${copiedKey === 'full_script' ? styles.copiedBtn : ''}`}
                    onClick={() => copyText(
                      SCRIPT_KEYS.map((k, i) => `${SCRIPT_LABELS[i]}:\n${results.negotiationScript[k]}`).join('\n\n'),
                      'full_script'
                    )}
                  >
                    {copiedKey === 'full_script' ? <><IconCheck /> Full Script Copied</> : <><IconCopy /> Copy Full Script</>}
                  </button>
                </div>

                {/* Email Templates */}
                <div className={styles.emailCard}>
                  <p className={styles.cardTitle}><IconMail /> Email Templates</p>
                  <div className={styles.emailTabs}>
                    {EMAIL_TABS.map((tab, i) => (
                      <button
                        key={tab.key}
                        type="button"
                        className={`${styles.emailTab} ${activeEmailTab === i ? styles.emailTabActive : ''}`}
                        onClick={() => setActiveEmailTab(i)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <div className={styles.emailBodyWrap}>
                    <pre className={styles.emailBody}>{results.emailTemplates[EMAIL_TABS[activeEmailTab].key]}</pre>
                  </div>
                  <div className={styles.emailCopyRow}>
                    <button
                      className={`${styles.copyBtn} ${copiedKey === `email_${activeEmailTab}` ? styles.copiedBtn : ''}`}
                      onClick={() => copyText(results.emailTemplates[EMAIL_TABS[activeEmailTab].key], `email_${activeEmailTab}`)}
                    >
                      {copiedKey === `email_${activeEmailTab}`
                        ? <><IconCheck /> Copied!</>
                        : <><IconCopy /> Copy Email</>}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── BOTTOM: Beyond Base Salary ──────────────────────────── */}
            <div className={styles.bottomSection}>
              <p className={styles.bottomSectionTitle}><IconBriefcase /> Beyond Base Salary</p>
              <p className={styles.bottomSectionSub}>These items are equally negotiable — and often easier to get approved than a base increase.</p>
              <div className={styles.additionalGrid}>
                {results.additionalItems.map(item => (
                  <div key={item.item} className={styles.additionalCard}>
                    <div className={styles.additionalCardHeader}>
                      <span className={styles.additionalName}>{item.item}</span>
                      <span className={
                        item.priority === 'High' ? styles.priorityHigh :
                          item.priority === 'Medium' ? styles.priorityMedium :
                            styles.priorityLow
                      }>{item.priority}</span>
                    </div>
                    <p className={styles.additionalDetail}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── BOTTOM: Negotiation Playbook ────────────────────────── */}
            <div className={styles.bottomSection} style={{ marginTop: '16px' }}>
              <p className={styles.bottomSectionTitle}><IconBook /> Negotiation Playbook</p>
              <p className={styles.bottomSectionSub}>Five principles that separate successful negotiators from those who leave money on the table.</p>
              <div className={styles.tipsList}>
                {results.negotiationTips.map((tip, i) => (
                  <div key={i} className={styles.tipItem}>
                    <span className={styles.tipNumber}>{i + 1}</span>
                    <p className={styles.tipText}>{tip}</p>
                    <button
                      className={`${styles.copyBtn} ${styles.tipCopyBtn} ${copiedKey === `tip_${i}` ? styles.copiedBtn : ''}`}
                      onClick={() => copyText(tip, `tip_${i}`)}
                    >
                      {copiedKey === `tip_${i}` ? <IconCheck /> : <IconCopy />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
