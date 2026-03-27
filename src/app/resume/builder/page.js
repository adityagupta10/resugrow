'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useReactToPrint } from 'react-to-print';
import { RESUME_TEMPLATES } from '@/components/ResumeTemplates/TemplateConfig';
import TemplateSwitcherModal from '@/components/ResumeTemplates/TemplateSwitcherModal';
import ResumeStartModal from '@/components/ResumeTemplates/ResumeStartModal';
import styles from './resume.module.css';

function uid() {
  return Math.random().toString(36).slice(2);
}

const defaultData = {
  personal: {
    fullName: '',
    currentPosition: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  certifications: [],
  strengths: [],
  achievements: [],
  languages: [],
  extracurricular: [],
  projects: [],
  customSection: { title: '', content: '' },
};

// ── Score badge ───────────────────────────────────────────────────────────
function ScoreBadge({ data }) {
  let score = 0;
  const p = data.personal;
  if (p.fullName.trim()) score += 10;
  if (p.email.trim()) score += 10;
  if (p.phone.trim()) score += 5;
  if (p.location.trim()) score += 5;
  if (p.linkedin.trim()) score += 5;
  if (p.summary.trim().split(/\s+/).length >= 20) score += 15;
  if (data.experience.length > 0) score += 20;
  if (data.education.length > 0) score += 10;
  if (data.skills.length >= 4) score += 10;
  if (data.certifications.length > 0) score += 5;
  const hasMetrics = data.experience.some(e => /\d+%|\$[\d,]+|\d+\+/.test(e.description));
  if (hasMetrics) score += 5;

  const cls = score >= 70 ? '' : score >= 40 ? styles.scoreBadgeMid : styles.scoreBadgeLow;
  const label = score >= 70 ? 'ATS Ready' : score >= 40 ? 'Needs Work' : 'Incomplete';

  return (
    <Link href="/resume/ats-checker" className={`${styles.scoreBadge} ${cls}`} title="Run full ATS scan">
      {label} · {score}/100
    </Link>
  );
}// ── AI Suggestions by field ───────────────────────────────────────────────
const AI_SUGGESTIONS = [
  {
    field: '🎯 Impact & Results',
    items: [
      'Increased team productivity by 28% by introducing weekly sprint retrospectives and async standups.',
      'Reduced customer churn by 18% through proactive outreach program targeting at-risk accounts.',
      'Delivered $1.4M in cost savings by renegotiating vendor contracts and consolidating tooling.',
      'Grew monthly active users from 12K to 47K in 9 months through targeted growth experiments.',
      'Achieved 99.97% uptime SLA across 3 production services by implementing automated failover.',
    ],
  },
  {
    field: '🚀 Leadership & Ownership',
    items: [
      'Spearheaded end-to-end redesign of onboarding flow, reducing time-to-value from 14 days to 3.',
      'Led cross-functional team of 8 (engineering, design, data) to ship v2.0 two weeks ahead of schedule.',
      'Mentored 4 junior engineers, 2 of whom were promoted within 12 months.',
      'Owned product roadmap for a $3M ARR product line, prioritising features based on NPS and usage data.',
      'Championed migration from monolith to microservices, enabling 3x faster independent deployments.',
    ],
  },
  {
    field: '🛠 Technical Execution',
    items: [
      'Architected and deployed a real-time data pipeline processing 2M+ events/day using Kafka and Spark.',
      'Automated CI/CD workflows using GitHub Actions, cutting release cycle from 2 weeks to 2 days.',
      'Engineered RESTful APIs consumed by 15+ internal teams, with 99.9% availability over 18 months.',
      'Optimised SQL query performance by 60% through indexing strategy and query plan analysis.',
      'Built ML-based recommendation engine that increased average order value by 22%.',
    ],
  },
  {
    field: '📊 Strategy & Analysis',
    items: [
      'Conducted competitive analysis across 12 market players, informing a pivot that added $800K ARR.',
      'Developed financial model projecting 3-year revenue scenarios, used in Series B fundraise.',
      'Analysed 6 months of support tickets to identify top 3 friction points, reducing ticket volume by 34%.',
      'Defined and tracked 12 KPIs across product, marketing, and ops — presented monthly to C-suite.',
      'Designed A/B testing framework that ran 40+ experiments, lifting conversion rate by 11%.',
    ],
  },
  {
    field: '🤝 Collaboration & Communication',
    items: [
      'Partnered with Sales and Marketing to launch go-to-market strategy for 3 new product tiers.',
      'Facilitated quarterly OKR planning sessions across 5 departments, aligning 60+ stakeholders.',
      'Produced weekly executive briefings distilling complex technical progress into business outcomes.',
      'Coordinated with 3 external agencies to deliver rebrand on time and 8% under budget.',
      'Established cross-team knowledge-sharing programme, reducing duplicated work by an estimated 20%.',
    ],
  },
];

function SuggestionsPopup({ anchor, onSelect, onClose }) {
  const [activeField, setActiveField] = useState(0);
  if (!anchor) return null;
  return (
    <div className={styles.suggestionsPopup} style={{ top: anchor.top, left: anchor.left }}>
      <div className={styles.suggestionsHeader}>
        <span>✨ AI Suggestions</span>
        <button className={styles.suggestionsClose} onClick={onClose} aria-label="Close">×</button>
      </div>
      <p className={styles.suggestionsSubtitle}>Pick a category, then click any bullet to insert it.</p>
      <div className={styles.suggestionsFieldTabs}>
        {AI_SUGGESTIONS.map((group, i) => (
          <button
            key={i}
            className={`${styles.suggestionsFieldTab} ${activeField === i ? styles.suggestionsFieldTabActive : ''}`}
            onClick={() => setActiveField(i)}
          >
            {group.field}
          </button>
        ))}
      </div>
      <div className={styles.suggestionsList}>
        {AI_SUGGESTIONS[activeField].items.map((s, i) => (
          <button key={i} className={styles.suggestionItem} onClick={() => onSelect(s)}>
            <span className={styles.suggestionBullet}>+</span>
            <span>{s}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Tag-based section editor (skills, strengths, languages, etc.) ─────────
function TagSection({ title, items, newVal, setNewVal, onAdd, onRemove, placeholder, variant = 'blue' }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.tagList}>
        {items.map((item, i) => (
          <span key={i} className={variant === 'outline' ? styles.tagOutline : styles.tag}>
            {item}
            <button className={styles.tagRemove} onClick={() => onRemove(i)} aria-label={`Remove ${item}`}>×</button>
          </span>
        ))}
        {items.length === 0 && <p className={styles.empty}>Nothing added yet.</p>}
      </div>
      <div className={styles.addRow}>
        <input
          className={styles.input}
          value={newVal}
          onChange={(e) => setNewVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onAdd()}
          placeholder={placeholder}
        />
        <button className={styles.addBtn} onClick={onAdd}>Add</button>
      </div>
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────
export default function ResumeBuilderPage() {
  const [data, setData] = useState(defaultData);
  const previewRef = useRef(null);
  const [activeTemplateId, setActiveTemplateId] = useState('classic');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(true);

  const SelectedTemplate = RESUME_TEMPLATES[activeTemplateId]?.component || RESUME_TEMPLATES['classic'].component;

  // tag input states
  const [newSkill, setNewSkill] = useState('');
  const [newStrength, setNewStrength] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [newExtra, setNewExtra] = useState('');
  const [suggestionAnchor, setSuggestionAnchor] = useState(null);
  const [activeExpId, setActiveExpId] = useState(null);

  // ── Personal ──────────────────────────────────────────────────────────
  const updatePersonal = useCallback((field, value) => {
    setData((d) => ({ ...d, personal: { ...d.personal, [field]: value } }));
  }, []);

  // ── Generic list helpers ──────────────────────────────────────────────
  const addToList = (key, value, reset) => {
    if (!value.trim()) return;
    setData((d) => ({ ...d, [key]: [...d[key], value.trim()] }));
    reset('');
  };
  const removeFromList = (key, i) =>
    setData((d) => ({ ...d, [key]: d[key].filter((_, idx) => idx !== i) }));

  // ── Experience ────────────────────────────────────────────────────────
  const addExperience = () =>
    setData((d) => ({
      ...d,
      experience: [...d.experience, { id: uid(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' }],
    }));
  const updateExperience = (id, field, value) =>
    setData((d) => ({ ...d, experience: d.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)) }));
  const removeExperience = (id) =>
    setData((d) => ({ ...d, experience: d.experience.filter((e) => e.id !== id) }));

  // ── Education ─────────────────────────────────────────────────────────
  const addEducation = () =>
    setData((d) => ({
      ...d,
      education: [...d.education, { id: uid(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' }],
    }));
  const updateEducation = (id, field, value) =>
    setData((d) => ({ ...d, education: d.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)) }));
  const removeEducation = (id) =>
    setData((d) => ({ ...d, education: d.education.filter((e) => e.id !== id) }));

  // ── Projects ──────────────────────────────────────────────────────────
  const addProject = () =>
    setData((d) => ({
      ...d,
      projects: [...d.projects, { id: uid(), name: '', link: '', description: '' }],
    }));
  const updateProject = (id, field, value) =>
    setData((d) => ({ ...d, projects: d.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)) }));
  const removeProject = (id) =>
    setData((d) => ({ ...d, projects: d.projects.filter((p) => p.id !== id) }));

  // ── PDF download via react-to-print ──────────────────────────────────────
  const handleDownloadPDF = useReactToPrint({
    contentRef: previewRef,
    documentTitle: `Resume_${data.personal.fullName ? data.personal.fullName.replace(/\s+/g, '_') : 'Download'}`
  });

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span>📄</span>
            <span className={styles.logoText}>Resume Builder</span>
          </div>
          <div className={styles.headerActions}>
            <ScoreBadge data={data} />
            <Link href="/resume/ats-checker" className={styles.atsBtn}>🔍 ATS Check</Link>
            <button className={styles.atsBtn} onClick={() => setShowTemplateModal(true)}>🎨 Change Template</button>
            <button className={styles.downloadBtn} onClick={handleDownloadPDF}>⬇ Download PDF</button>
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        {/* ── LEFT: Editor ── */}
        <div className={styles.editor}>
          <div className={styles.tipBanner}>
            💡 <span>Use strong action verbs and add real numbers (%, $, volume) to your bullets — they boost your ATS score significantly.</span>
          </div>

          {/* Personal Info */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Personal Information</h2>
            <div className={styles.grid2}>
              <div>
                <label className={styles.label}>Full Name</label>
                <input className={styles.input} value={data.personal.fullName}
                  onChange={(e) => updatePersonal('fullName', e.target.value)} placeholder="Your Full Name" />
              </div>
              <div>
                <label className={styles.label}>Current Position / Title</label>
                <input className={styles.input} value={data.personal.currentPosition}
                  onChange={(e) => updatePersonal('currentPosition', e.target.value)} placeholder="e.g. Senior Product Manager" />
              </div>
              <div>
                <label className={styles.label}>Email</label>
                <input className={styles.input} type="email" value={data.personal.email}
                  onChange={(e) => updatePersonal('email', e.target.value)} placeholder="email@example.com" />
              </div>
              <div>
                <label className={styles.label}>Phone</label>
                <input className={styles.input} value={data.personal.phone}
                  onChange={(e) => updatePersonal('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
              </div>
              <div>
                <label className={styles.label}>Location</label>
                <input className={styles.input} value={data.personal.location}
                  onChange={(e) => updatePersonal('location', e.target.value)} placeholder="City, State" />
              </div>
              <div>
                <label className={styles.label}>LinkedIn (optional)</label>
                <input className={styles.input} value={data.personal.linkedin}
                  onChange={(e) => updatePersonal('linkedin', e.target.value)} placeholder="linkedin.com/in/you" />
              </div>
              <div>
                <label className={styles.label}>Website (optional)</label>
                <input className={styles.input} value={data.personal.website}
                  onChange={(e) => updatePersonal('website', e.target.value)} placeholder="yoursite.com" />
              </div>
            </div>
            <div style={{ marginTop: '12px' }}>
              <label className={styles.label}>
                Professional Summary
                <span style={{ fontWeight: 400, color: '#9ca3af', marginLeft: 6 }}>
                  ({data.personal.summary.trim().split(/\s+/).filter(Boolean).length} words — aim for 30–60)
                </span>
              </label>
              <textarea className={styles.textarea} value={data.personal.summary}
                onChange={(e) => updatePersonal('summary', e.target.value)}
                rows={4} placeholder="Results-driven professional with X years of experience in... Highlight your top 2–3 strengths and career focus." />
            </div>
          </section>

          <hr className={styles.divider} />

          {/* Work Experience */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Work Experience</h2>
              <button className={styles.addBtn} onClick={addExperience}>+ Add</button>
            </div>
            {data.experience.length === 0 && <p className={styles.empty}>No experience added yet.</p>}
            {data.experience.map((exp) => (
              <div key={exp.id} className={styles.card}>
                <button className={styles.deleteBtn} onClick={() => removeExperience(exp.id)} aria-label="Remove">🗑</button>
                <div className={styles.grid2}>
                  <div>
                    <label className={styles.label}>Company</label>
                    <input className={styles.input} value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} placeholder="Company Name" />
                  </div>
                  <div>
                    <label className={styles.label}>Position</label>
                    <input className={styles.input} value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} placeholder="Job Title" />
                  </div>
                  <div>
                    <label className={styles.label}>Start Date</label>
                    <input className={styles.input} value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} placeholder="Jan 2022" />
                  </div>
                  <div>
                    <label className={styles.label}>End Date</label>
                    <input className={styles.input} value={exp.current ? 'Present' : exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} placeholder="Dec 2023" />
                  </div>
                </div>
                <div className={styles.checkRow}>
                  <input type="checkbox" id={`cur-${exp.id}`} checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)} />
                  <label htmlFor={`cur-${exp.id}`} className={styles.checkLabel}>Currently working here</label>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label className={styles.label} style={{ marginBottom: 0 }}>Description <span style={{ fontWeight: 400, color: '#9ca3af' }}>— bullet points + metrics</span></label>
                    <button 
                      className={styles.suggestionsToggle}
                      onClick={(e) => {
                        const rect = e.target.getBoundingClientRect();
                        setSuggestionAnchor(suggestionAnchor ? null : { top: rect.top + window.scrollY + 30, left: rect.left + window.scrollX - 280 });
                        setActiveExpId(exp.id);
                      }}
                    >
                      ✨ AI Suggestions
                    </button>
                  </div>
                  <textarea className={styles.textarea} value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    rows={5} placeholder={'• Spearheaded X initiative, increasing Y by 32%\n• Automated Z process, saving 8 hrs/week\n• Led team of 5 to deliver...'} />
                </div>
              </div>
            ))}
          </section>

          <hr className={styles.divider} />

          {/* Education */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Education</h2>
              <button className={styles.addBtn} onClick={addEducation}>+ Add</button>
            </div>
            {data.education.length === 0 && <p className={styles.empty}>No education added yet.</p>}
            {data.education.map((edu) => (
              <div key={edu.id} className={styles.card}>
                <button className={styles.deleteBtn} onClick={() => removeEducation(edu.id)} aria-label="Remove">🗑</button>
                <div>
                  <label className={styles.label}>Institution</label>
                  <input className={styles.input} value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} placeholder="University Name" />
                </div>
                <div className={styles.grid2} style={{ marginTop: '10px' }}>
                  <div>
                    <label className={styles.label}>Degree</label>
                    <input className={styles.input} value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} placeholder="Bachelor of Science" />
                  </div>
                  <div>
                    <label className={styles.label}>Field of Study</label>
                    <input className={styles.input} value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} placeholder="Computer Science" />
                  </div>
                  <div>
                    <label className={styles.label}>Start Year</label>
                    <input className={styles.input} value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} placeholder="2018" />
                  </div>
                  <div>
                    <label className={styles.label}>End Year</label>
                    <input className={styles.input} value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} placeholder="2022" />
                  </div>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label className={styles.label}>GPA (optional)</label>
                  <input className={styles.input} value={edu.gpa}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="3.8" style={{ maxWidth: '120px' }} />
                </div>
              </div>
            ))}
          </section>

          <hr className={styles.divider} />

          {/* Skills */}
          <TagSection
            title="Skills"
            items={data.skills}
            newVal={newSkill}
            setNewVal={setNewSkill}
            onAdd={() => addToList('skills', newSkill, setNewSkill)}
            onRemove={(i) => removeFromList('skills', i)}
            placeholder="e.g. Python, Project Management, SQL..."
          />

          <hr className={styles.divider} />

          {/* Strengths */}
          <TagSection
            title="Strengths"
            items={data.strengths}
            newVal={newStrength}
            setNewVal={setNewStrength}
            onAdd={() => addToList('strengths', newStrength, setNewStrength)}
            onRemove={(i) => removeFromList('strengths', i)}
            placeholder="e.g. Strategic Thinking, Problem Solving..."
          />

          <hr className={styles.divider} />

          {/* Projects */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Projects</h2>
              <button className={styles.addBtn} onClick={addProject}>+ Add</button>
            </div>
            {data.projects.length === 0 && <p className={styles.empty}>No projects added yet.</p>}
            {data.projects.map((proj) => (
              <div key={proj.id} className={styles.card}>
                <button className={styles.deleteBtn} onClick={() => removeProject(proj.id)} aria-label="Remove">🗑</button>
                <div className={styles.grid2}>
                  <div>
                    <label className={styles.label}>Project Name</label>
                    <input className={styles.input} value={proj.name}
                      onChange={(e) => updateProject(proj.id, 'name', e.target.value)} placeholder="Project Title" />
                  </div>
                  <div>
                    <label className={styles.label}>Link (optional)</label>
                    <input className={styles.input} value={proj.link}
                      onChange={(e) => updateProject(proj.id, 'link', e.target.value)} placeholder="github.com/you/project" />
                  </div>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label className={styles.label}>Description</label>
                  <textarea className={styles.textarea} value={proj.description}
                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                    rows={3} placeholder="What you built, tech used, and impact..." />
                </div>
              </div>
            ))}
          </section>

          <hr className={styles.divider} />

          {/* Key Achievements */}
          <TagSection
            title="Key Achievements"
            items={data.achievements}
            newVal={newAchievement}
            setNewVal={setNewAchievement}
            onAdd={() => addToList('achievements', newAchievement, setNewAchievement)}
            onRemove={(i) => removeFromList('achievements', i)}
            placeholder="e.g. Grew revenue by 40% in Q3 2024..."
            variant="outline"
          />

          <hr className={styles.divider} />

          {/* Certifications */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Certifications</h2>
              <button className={styles.addBtn} onClick={() =>
                setData(d => ({ ...d, certifications: [...d.certifications, { id: uid(), title: '', issuer: '' }] }))
              }>+ Add</button>
            </div>
            {data.certifications.length === 0 && <p className={styles.empty}>No certifications added yet.</p>}
            {data.certifications.map((cert) => (
              <div key={cert.id} className={styles.card}>
                <button className={styles.deleteBtn} onClick={() =>
                  setData(d => ({ ...d, certifications: d.certifications.filter(c => c.id !== cert.id) }))
                } aria-label="Remove">🗑</button>
                <div className={styles.grid2}>
                  <div>
                    <label className={styles.label}>Certification Title</label>
                    <input className={styles.input} value={cert.title}
                      onChange={(e) => setData(d => ({ ...d, certifications: d.certifications.map(c => c.id === cert.id ? { ...c, title: e.target.value } : c) }))}
                      placeholder="e.g. AWS Solutions Architect" />
                  </div>
                  <div>
                    <label className={styles.label}>Issuing Organization</label>
                    <input className={styles.input} value={cert.issuer}
                      onChange={(e) => setData(d => ({ ...d, certifications: d.certifications.map(c => c.id === cert.id ? { ...c, issuer: e.target.value } : c) }))}
                      placeholder="e.g. Amazon Web Services" />
                  </div>
                </div>
              </div>
            ))}
          </section>

          <hr className={styles.divider} />

          {/* Languages */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Languages</h2>
              <button className={styles.addBtn} onClick={() =>
                setData(d => ({ ...d, languages: [...d.languages, { id: uid(), name: '', proficiency: 'Fluent' }] }))
              }>+ Add</button>
            </div>
            {data.languages.length === 0 && <p className={styles.empty}>No languages added yet.</p>}
            {data.languages.map((lang) => (
              <div key={lang.id} className={styles.card}>
                <button className={styles.deleteBtn} onClick={() =>
                  setData(d => ({ ...d, languages: d.languages.filter(l => l.id !== lang.id) }))
                } aria-label="Remove">🗑</button>
                <div className={styles.grid2}>
                  <div>
                    <label className={styles.label}>Language</label>
                    <input className={styles.input} value={lang.name}
                      onChange={(e) => setData(d => ({ ...d, languages: d.languages.map(l => l.id === lang.id ? { ...l, name: e.target.value } : l) }))}
                      placeholder="e.g. Spanish" />
                  </div>
                  <div>
                    <label className={styles.label}>Proficiency</label>
                    <select className={styles.input} value={lang.proficiency}
                      onChange={(e) => setData(d => ({ ...d, languages: d.languages.map(l => l.id === lang.id ? { ...l, proficiency: e.target.value } : l) }))}>
                      <option>Native</option>
                      <option>Fluent</option>
                      <option>Advanced</option>
                      <option>Intermediate</option>
                      <option>Basic</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <hr className={styles.divider} />

          {/* Extra-Curricular */}
          <TagSection
            title="Extra-Curricular Activities"
            items={data.extracurricular}
            newVal={newExtra}
            setNewVal={setNewExtra}
            onAdd={() => addToList('extracurricular', newExtra, setNewExtra)}
            onRemove={(i) => removeFromList('extracurricular', i)}
            placeholder="e.g. Volunteer at local food bank, Chess club captain..."
            variant="outline"
          />

          <hr className={styles.divider} />

          {/* Custom Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Custom Section</h2>
            <div className={styles.grid2}>
              <div>
                <label className={styles.label}>Section Title</label>
                <input
                  className={styles.input}
                  value={data.customSection.title}
                  onChange={(e) => setData(d => ({ ...d, customSection: { ...d.customSection, title: e.target.value } }))}
                  placeholder="e.g. Military Service, Volunteer Work"
                />
              </div>
            </div>
            <div style={{ marginTop: '12px' }}>
              <label className={styles.label}>Content</label>
              <textarea
                className={styles.textarea}
                value={data.customSection.content}
                onChange={(e) => setData(d => ({ ...d, customSection: { ...d.customSection, content: e.target.value } }))}
                rows={4}
                placeholder="Details for your custom section..."
              />
            </div>
          </section>

          {/* Bottom CTA */}
          <div style={{ marginTop: '32px', padding: '20px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: '#166534', fontWeight: 600, margin: '0 0 8px' }}>
              Done? Run a full ATS scan to see your score.
            </p>
            <Link href="/resume/ats-checker" className={styles.downloadBtn} style={{ display: 'inline-block', textDecoration: 'none' }}>
              🔍 Scan My Resume
            </Link>
          </div>
        </div>

        {/* ── RIGHT: Preview ── */}
        <div className={styles.preview}>
          <div className={styles.previewLabel}>
            <span>Live Preview</span>
            <button onClick={handleDownloadPDF} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>
              Print / Save PDF ↗
            </button>
          </div>
          <div className={styles.previewCard}>
            <div ref={previewRef}>
              <SelectedTemplate data={data} />
            </div>
          </div>
        </div>
      </div>
      <SuggestionsPopup 
        anchor={suggestionAnchor} 
        onClose={() => setSuggestionAnchor(null)} 
        onSelect={(s) => {
          const current = data.experience.find(e => e.id === activeExpId)?.description || '';
          const prefix = current.trim() ? (current.endsWith('\n') ? '• ' : '\n• ') : '• ';
          updateExperience(activeExpId, 'description', current + prefix + s);
          setSuggestionAnchor(null);
        }} 
      />

      {showTemplateModal && (
        <TemplateSwitcherModal
          activeId={activeTemplateId}
          onSelect={(id) => {
            setActiveTemplateId(id);
            setShowTemplateModal(false);
          }}
          onClose={() => setShowTemplateModal(false)}
        />
      )}

      {showStartModal && (
        <ResumeStartModal
          onFresh={() => {
            setShowStartModal(false);
            setShowTemplateModal(true);
          }}
          onImport={(importedData) => {
            setData({ ...defaultData, ...importedData });
            setShowStartModal(false);
            setShowTemplateModal(true);
          }}
          onClose={() => setShowStartModal(false)}
        />
      )}
    </div>
  );
}
