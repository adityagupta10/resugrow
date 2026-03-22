'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
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

// ── Resume preview ────────────────────────────────────────────────────────
function ResumeDoc({ data }) {
  const p = data.personal;
  return (
    <div className={styles.resumeDoc}>
      {/* Header */}
      <div className={styles.resumeHeader}>
        <h1 className={styles.resumeName}>{p.fullName || 'Your Name'}</h1>
        {p.currentPosition && (
          <p className={styles.resumePosition}>{p.currentPosition}</p>
        )}
        <div className={styles.resumeContact}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.website && <span>{p.website}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
        </div>
      </div>

      {p.summary && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Professional Summary</h2>
          <p className={styles.resumeText}>{p.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Work Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className={styles.resumeEntry}>
              <div className={styles.resumeEntryHeader}>
                <div>
                  <strong>{exp.position || 'Position'}</strong>
                  {exp.company && <span className={styles.resumeCompany}> — {exp.company}</span>}
                </div>
                <span className={styles.resumeDate}>
                  {exp.startDate}{(exp.startDate || exp.endDate || exp.current) ? ' – ' : ''}
                  {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              {exp.description && <p className={styles.resumeDesc}>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {data.projects.length > 0 && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Projects</h2>
          {data.projects.map((proj) => (
            <div key={proj.id} className={styles.resumeEntry}>
              <div className={styles.resumeEntryHeader}>
                <strong>{proj.name || 'Project Name'}</strong>
                {proj.link && <span className={styles.resumeDate}>{proj.link}</span>}
              </div>
              {proj.description && <p className={styles.resumeDesc}>{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {data.achievements.length > 0 && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Key Achievements</h2>
          <ul className={styles.resumeBulletList}>
            {data.achievements.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      )}

      {data.education.length > 0 && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className={styles.resumeEntry}>
              <div className={styles.resumeEntryHeader}>
                <strong>{edu.institution || 'Institution'}</strong>
                <span className={styles.resumeDate}>
                  {edu.startDate}{(edu.startDate || edu.endDate) ? ' – ' : ''}{edu.endDate}
                </span>
              </div>
              <div className={styles.resumeCompany}>
                {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                {edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
              </div>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Skills</h2>
          <div className={styles.resumeSkills}>
            {data.skills.map((skill, i) => (
              <span key={i} className={styles.resumeSkillTag}>{skill}</span>
            ))}
          </div>
        </div>
      )}

      {data.strengths.length > 0 && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Strengths</h2>
          <div className={styles.resumeSkills}>
            {data.strengths.map((s, i) => (
              <span key={i} className={styles.resumeSkillTag}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {data.certifications.length > 0 && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Certifications</h2>
          <ul className={styles.resumeCertList}>
            {data.certifications.map((cert, i) => <li key={i}>{cert}</li>)}
          </ul>
        </div>
      )}

      {data.languages.length > 0 && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Languages</h2>
          <div className={styles.resumeSkills}>
            {data.languages.map((lang, i) => (
              <span key={i} className={styles.resumeSkillTag}>{lang}</span>
            ))}
          </div>
        </div>
      )}

      {data.extracurricular.length > 0 && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Extra-Curricular Activities</h2>
          <ul className={styles.resumeBulletList}>
            {data.extracurricular.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────
export default function ResumeBuilderPage() {
  const [data, setData] = useState(defaultData);
  const previewRef = useRef(null);

  // tag input states
  const [newSkill, setNewSkill] = useState('');
  const [newCert, setNewCert] = useState('');
  const [newStrength, setNewStrength] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newExtra, setNewExtra] = useState('');

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

  // ── PDF download via hidden iframe ────────────────────────────────────
  const handleDownloadPDF = () => {
    const docHtml = previewRef.current?.innerHTML;
    if (!docHtml) return;

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Resume</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: Georgia, serif; font-size: 13px;
      line-height: 1.5; color: #1a1a1a;
      padding: 40px; background: white;
    }
    .resumeHeader { border-bottom: 2px solid #1a1a1a; padding-bottom: 16px; margin-bottom: 20px; }
    .resumeName { font-size: 26px; font-weight: 700; letter-spacing: -0.5px; }
    .resumePosition { font-size: 13.5px; color: #444; margin-top: 4px; font-family: Arial, sans-serif; font-style: italic; }
    .resumeContact { margin-top: 6px; display: flex; flex-wrap: wrap; gap: 14px; font-size: 11.5px; color: #555; font-family: Arial, sans-serif; }
    .resumeSection { margin-bottom: 20px; }
    .resumeSectionTitle { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #333; margin: 0 0 8px; border-bottom: 1px solid #ddd; padding-bottom: 4px; font-family: Arial, sans-serif; }
    .resumeText { margin: 0; color: #333; line-height: 1.65; white-space: pre-line; }
    .resumeEntry { margin-bottom: 14px; }
    .resumeEntryHeader { display: flex; justify-content: space-between; align-items: baseline; font-size: 13.5px; }
    .resumeDate { font-size: 11.5px; color: #666; white-space: nowrap; margin-left: 12px; font-family: Arial, sans-serif; }
    .resumeCompany { color: #555; font-size: 12.5px; }
    .resumeDesc { margin: 4px 0 0; color: #333; white-space: pre-line; line-height: 1.65; font-size: 13px; }
    .resumeSkills { display: flex; flex-wrap: wrap; gap: 6px; }
    .resumeSkillTag { background: #f0f0f0; border-radius: 4px; padding: 2px 8px; font-size: 11.5px; color: #333; font-family: Arial, sans-serif; }
    .resumeCertList, .resumeBulletList { margin: 4px 0 0; padding-left: 16px; color: #333; }
    .resumeCertList li, .resumeBulletList li { margin-bottom: 3px; font-size: 12.5px; line-height: 1.6; }
    @media print {
      body { padding: 15mm 20mm; }
      @page { margin: 0; size: A4; }
    }
  </style>
</head>
<body>${docHtml}</body>
</html>`);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 400);
  };

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
                  <label className={styles.label}>Description <span style={{ fontWeight: 400, color: '#9ca3af' }}>— bullet points + metrics</span></label>
                  <textarea className={styles.textarea} value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    rows={5} placeholder={'• Spearheaded X initiative, increasing Y by 32%\n• Automated Z process, saving 8 hrs/week\n• Led team of 5 to deliver...'} />
                </div>
              </div>
            ))}
          </section>

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

          {/* Certifications */}
          <TagSection
            title="Certifications"
            items={data.certifications}
            newVal={newCert}
            setNewVal={setNewCert}
            onAdd={() => addToList('certifications', newCert, setNewCert)}
            onRemove={(i) => removeFromList('certifications', i)}
            placeholder="e.g. AWS Certified Solutions Architect..."
            variant="outline"
          />

          <hr className={styles.divider} />

          {/* Languages */}
          <TagSection
            title="Languages"
            items={data.languages}
            newVal={newLanguage}
            setNewVal={setNewLanguage}
            onAdd={() => addToList('languages', newLanguage, setNewLanguage)}
            onRemove={(i) => removeFromList('languages', i)}
            placeholder="e.g. English (Native), Spanish (Fluent)..."
          />

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
              <ResumeDoc data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
