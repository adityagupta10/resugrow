'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RESUME_TEMPLATES } from '@/components/ResumeTemplates/TemplateConfig';
import {
  FileText, Upload, Loader2, ChevronLeft, ChevronRight, Check,
  User, Briefcase, GraduationCap, Wrench, Star, FolderOpen, Trophy,
  Award, Languages, Activity, LayoutGrid, Download, Mail, LinkIcon,
  FileDown, Trash2, ScanSearch, FileSignature, Home, Copy
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { generatePDFBlob } from '@/utils/pdfGenerator';
import styles from './resume.module.css';

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

const LinkedinIcon = ({ size = 18, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

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

// ── Step Definitions ──────────────────────────────────────────────────────
const STEPS = [
  { id: 'start',          label: 'Getting Started', icon: FileText },
  { id: 'template',       label: 'Template',        icon: LayoutGrid },
  { id: 'personal',       label: 'Personal Info',   icon: User },
  { id: 'experience',     label: 'Experience',      icon: Briefcase },
  { id: 'education',      label: 'Education',       icon: GraduationCap },
  { id: 'skills',         label: 'Skills',          icon: Wrench },
  { id: 'strengths',      label: 'Strengths',       icon: Star },
  { id: 'projects',       label: 'Projects',        icon: FolderOpen },
  { id: 'achievements',   label: 'Achievements',    icon: Trophy },
  { id: 'certifications', label: 'Certifications',  icon: Award },
  { id: 'languages',      label: 'Languages',       icon: Languages },
  { id: 'extracurricular',label: 'Activities',       icon: Activity },
  { id: 'custom',         label: 'Custom Section',  icon: LayoutGrid },
  { id: 'download',       label: 'Download',        icon: Download },
];

// ── AI Suggestions ────────────────────────────────────────────────────────
const AI_SUGGESTIONS = [
  {
    field: 'Impact & Results',
    items: [
      'Increased team productivity by 28% by introducing weekly sprint retrospectives and async standups.',
      'Reduced customer churn by 18% through proactive outreach program targeting at-risk accounts.',
      'Delivered $1.4M in cost savings by renegotiating vendor contracts and consolidating tooling.',
      'Grew monthly active users from 12K to 47K in 9 months through targeted growth experiments.',
      'Achieved 99.97% uptime SLA across 3 production services by implementing automated failover.',
    ],
  },
  {
    field: 'Leadership & Ownership',
    items: [
      'Spearheaded end-to-end redesign of onboarding flow, reducing time-to-value from 14 days to 3.',
      'Led cross-functional team of 8 (engineering, design, data) to ship v2.0 two weeks ahead of schedule.',
      'Mentored 4 junior engineers, 2 of whom were promoted within 12 months.',
      'Owned product roadmap for a $3M ARR product line, prioritising features based on NPS and usage data.',
      'Championed migration from monolith to microservices, enabling 3x faster independent deployments.',
    ],
  },
  {
    field: 'Technical Execution',
    items: [
      'Architected and deployed a real-time data pipeline processing 2M+ events/day using Kafka and Spark.',
      'Automated CI/CD workflows using GitHub Actions, cutting release cycle from 2 weeks to 2 days.',
      'Engineered RESTful APIs consumed by 15+ internal teams, with 99.9% availability over 18 months.',
      'Optimised SQL query performance by 60% through indexing strategy and query plan analysis.',
      'Built ML-based recommendation engine that increased average order value by 22%.',
    ],
  },
  {
    field: 'Strategy & Analysis',
    items: [
      'Conducted competitive analysis across 12 market players, informing a pivot that added $800K ARR.',
      'Developed financial model projecting 3-year revenue scenarios, used in Series B fundraise.',
      'Analysed 6 months of support tickets to identify top 3 friction points, reducing ticket volume by 34%.',
      'Defined and tracked 12 KPIs across product, marketing, and ops — presented monthly to C-suite.',
      'Designed A/B testing framework that ran 40+ experiments, lifting conversion rate by 11%.',
    ],
  },
  {
    field: 'Collaboration',
    items: [
      'Partnered with Sales and Marketing to launch go-to-market strategy for 3 new product tiers.',
      'Facilitated quarterly OKR planning sessions across 5 departments, aligning 60+ stakeholders.',
      'Produced weekly executive briefings distilling complex technical progress into business outcomes.',
      'Coordinated with 3 external agencies to deliver rebrand on time and 8% under budget.',
      'Established cross-team knowledge-sharing programme, reducing duplicated work by an estimated 20%.',
    ],
  },
];

// ── Tag Section Component ─────────────────────────────────────────────────
function TagSection({ items, newVal, setNewVal, onAdd, onRemove, placeholder, variant = 'blue' }) {
  return (
    <div>
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
        <button className={styles.addTagBtn} onClick={onAdd}>Add</button>
      </div>
    </div>
  );
}

// ── Suggestions Popup ─────────────────────────────────────────────────────
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

// ══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════
export default function ResumeBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState(defaultData);
  const [activeTemplateId, setActiveTemplateId] = useState('classic');
  const [visitedSteps, setVisitedSteps] = useState(new Set([0]));
  const previewRef = useRef(null);

  // Uploading state (for start modal)
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  // Tag input states
  const [newSkill, setNewSkill] = useState('');
  const [newStrength, setNewStrength] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [newExtra, setNewExtra] = useState('');

  // AI suggestions
  const [suggestionAnchor, setSuggestionAnchor] = useState(null);
  const [activeExpId, setActiveExpId] = useState(null);

  const SelectedTemplate = RESUME_TEMPLATES[activeTemplateId]?.component || RESUME_TEMPLATES['classic'].component;

  // ── Navigation ──────────────────────────────────────────────────────────
  const goNext = () => {
    const next = Math.min(currentStep + 1, STEPS.length - 1);
    setCurrentStep(next);
    setVisitedSteps(prev => new Set([...prev, next]));
  };

  const goBack = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
  };

  const goToStep = (idx) => {
    setCurrentStep(idx);
    setVisitedSteps(prev => new Set([...prev, idx]));
  };

  const progressPercent = Math.round((currentStep / (STEPS.length - 1)) * 100);

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

  // ── PDF download (print-to-PDF) ─────────────────────────────────────
  const handleDownloadPDF = useCallback(async () => {
    const srcEl = previewRef.current;
    if (!srcEl) return;

    const filenameBase = `Resume_${data.personal.fullName ? data.personal.fullName.replace(/\s+/g, '_') : 'Download'}`;
    const filename = `${filenameBase}.pdf`;
    const printWindow = window.open('', filenameBase);
    if (!printWindow) {
      alert('Popup blocked. Please allow popups to download your PDF.');
      return;
    }

    const clone = srcEl.cloneNode(true);
    clone.style.transform = 'none';
    clone.style.transformOrigin = 'initial';
    clone.style.margin = '0';

    printWindow.document.title = filename;

    // Copy stylesheets so CSS modules render correctly in the print window.
    const styleNodes = document.querySelectorAll('style, link[rel="stylesheet"]');
    styleNodes.forEach((node) => {
      try {
        printWindow.document.head.appendChild(node.cloneNode(true));
      } catch {}
    });

    const style = printWindow.document.createElement('style');
    style.textContent = `
      @page { size: A4; margin: 12mm 10mm; }
      html, body { margin: 0 !important; padding: 0 !important; background: #ffffff !important; }
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    `;
    printWindow.document.head.appendChild(style);

    printWindow.document.body.innerHTML = clone.outerHTML;

    try {
      if (printWindow.document.fonts?.ready) {
        await printWindow.document.fonts.ready;
      }
    } catch {}

    try {
      const imgs = Array.from(printWindow.document.images || []);
      await Promise.all(
        imgs.map((img) => (img.complete ? Promise.resolve() : new Promise((res) => {
          img.onload = res;
          img.onerror = res;
        })))
      );
    } catch {}

    setTimeout(() => {
      try {
        printWindow.focus();
        printWindow.print();
      } catch {}
    }, 0);
  }, [data.personal.fullName]);

  // ── Export Text Only ────────────────────────────────────────────────
  const handleExportText = () => {
    const p = data.personal;
    let text = '';
    if (p.fullName) text += p.fullName.toUpperCase() + '\n';
    if (p.currentPosition) text += p.currentPosition + '\n';
    const contactParts = [p.email, p.phone, p.location, p.linkedin, p.website].filter(Boolean);
    if (contactParts.length) text += contactParts.join(' | ') + '\n';
    text += '\n';
    if (p.summary) text += 'PROFESSIONAL SUMMARY\n' + p.summary + '\n\n';
    if (data.experience.length) {
      text += 'WORK EXPERIENCE\n';
      data.experience.forEach(e => {
        text += `${e.position}${e.company ? ' at ' + e.company : ''}\n`;
        text += `${e.startDate || ''}${e.endDate || e.current ? ' – ' + (e.current ? 'Present' : e.endDate) : ''}\n`;
        if (e.description) text += e.description + '\n';
        text += '\n';
      });
    }
    if (data.education.length) {
      text += 'EDUCATION\n';
      data.education.forEach(e => {
        text += `${e.degree || ''}${e.field ? ' in ' + e.field : ''} — ${e.institution || ''}\n`;
        text += `${e.startDate || ''}${e.endDate ? ' – ' + e.endDate : ''}${e.gpa ? ' | GPA: ' + e.gpa : ''}\n\n`;
      });
    }
    if (data.skills.length) text += 'SKILLS\n' + data.skills.join(', ') + '\n\n';
    if (data.strengths.length) text += 'STRENGTHS\n' + data.strengths.join(', ') + '\n\n';
    if (data.projects.length) {
      text += 'PROJECTS\n';
      data.projects.forEach(p => {
        text += `${p.name}${p.link ? ' (' + p.link + ')' : ''}\n`;
        if (p.description) text += p.description + '\n';
        text += '\n';
      });
    }
    if (data.achievements.length) text += 'KEY ACHIEVEMENTS\n' + data.achievements.map(a => '• ' + a).join('\n') + '\n\n';
    if (data.certifications.length) {
      text += 'CERTIFICATIONS\n';
      data.certifications.forEach(c => { text += `${c.title}${c.issuer ? ' — ' + c.issuer : ''}\n`; });
      text += '\n';
    }
    if (data.languages.length) {
      text += 'LANGUAGES\n';
      data.languages.forEach(l => { text += `${l.name} (${l.proficiency})\n`; });
      text += '\n';
    }
    if (data.extracurricular.length) text += 'EXTRA-CURRICULAR\n' + data.extracurricular.map(a => '• ' + a).join('\n') + '\n\n';
    if (data.customSection.title) text += data.customSection.title.toUpperCase() + '\n' + data.customSection.content + '\n';
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Resume_${p.fullName ? p.fullName.replace(/\s+/g, '_') : 'Export'}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  // ── Share via Link ─────────────────────────────────────────────────
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [shareId, setShareId] = useState('');
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState(null);

  const handleShareResume = async () => {
    if (isSharing) return;
    setIsSharing(true);
    setShareError(null);

    try {
      const pdfBlob = await generatePDFBlob(previewRef.current);
      if (!pdfBlob) throw new Error('Failed to generate PDF');

      const supabase = createClient();
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!authData?.user) throw new Error('Please sign in to create a shareable resume link.');

      const userId = authData.user.id;
      const stableShareId = shareId || `${userId.slice(0, 8)}-${Date.now()}`;
      const fileName = `${userId}/${stableShareId}-${Date.now()}.pdf`;
      
      const { error: uploadError } = await supabase.storage
        .from('public-resumes')
        .upload(fileName, pdfBlob, {
          contentType: 'application/pdf',
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('public-resumes')
        .getPublicUrl(fileName);

      const res = await fetch('/api/resumes/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: { ...data, meta: { ...(data.meta || {}), templateId: activeTemplateId } },
          title: data.personal.fullName ? `Resume - ${data.personal.fullName}` : 'Untitled Resume',
          sharedPdfUrl: publicUrl,
          shareId: stableShareId,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to save sharing link');

      const brandedUrl = `${window.location.origin}${result.url}`;
      setShareUrl(brandedUrl);
      setShareId(stableShareId);
      navigator.clipboard.writeText(brandedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Sharing failed:', err);
      setShareError(err.message || 'Could not create shareable link.');
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      handleShareResume();
    }
  };

  // ── Send to Email ──────────────────────────────────────────────────
  const [emailModal, setEmailModal] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const handleSendEmail = () => {
    if (!emailAddress.trim()) return;
    // Use mailto as a fallback — opens user's email client with the share link
    const subject = encodeURIComponent(`My Resume — ${data.personal.fullName || 'ResuGrow'}`);
    const body = encodeURIComponent(`Here is my resume built with ResuGrow:\n\n${shareUrl}\n\nBest regards,\n${data.personal.fullName || ''}`);
    window.open(`mailto:${emailAddress}?subject=${subject}&body=${body}`);
    setEmailSent(true);
    setTimeout(() => { setEmailSent(false); setEmailModal(false); }, 2000);
  };

  // ── File Import ─────────────────────────────────────────────────────
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.includes('pdf')) {
      setUploadError('Please upload a PDF file.');
      return;
    }
    setIsUploading(true);
    setUploadError(null);
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const res = await fetch('/api/resume/extract', { method: 'POST', body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Extraction failed');
      setData({ ...defaultData, ...result.data });
      setIsUploading(false);
      goNext(); // go to template step
    } catch (err) {
      setUploadError(err.message);
      setIsUploading(false);
    }
  };

  // ══════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════

  // Helper to check if a step has data
  const stepHasData = (idx) => {
    switch (idx) {
      case 0: return true; // start always done once visited
      case 1: return true; // template always has default
      case 2: return data.personal.fullName.trim().length > 0;
      case 3: return data.experience.length > 0;
      case 4: return data.education.length > 0;
      case 5: return data.skills.length > 0;
      case 6: return data.strengths.length > 0;
      case 7: return data.projects.length > 0;
      case 8: return data.achievements.length > 0;
      case 9: return data.certifications.length > 0;
      case 10: return data.languages.length > 0;
      case 11: return data.extracurricular.length > 0;
      case 12: return data.customSection.title.trim().length > 0;
      default: return false;
    }
  };

  return (
    <div className={styles.wizardPage}>
      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.sidebarLogo}>
          <div className={styles.sidebarLogoIcon}>R</div>
          <span className={styles.sidebarLogoText}>ResuGrow</span>
        </Link>
        <nav className={styles.sidebarNav}>
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === currentStep;
            const isCompleted = visitedSteps.has(idx) && idx < currentStep && stepHasData(idx);
            return (
              <button
                key={step.id}
                className={`${styles.sidebarStep} ${isActive ? styles.sidebarStepActive : ''} ${isCompleted ? styles.sidebarStepCompleted : ''}`}
                onClick={() => goToStep(idx)}
              >
                <span className={styles.stepIcon}>
                  {isCompleted ? <Check size={14} /> : <Icon size={14} />}
                </span>
                {step.label}
              </button>
            );
          })}
        </nav>
        <div className={styles.sidebarFooter}>
          <div className={styles.sidebarFooterIcons}>
            <Link href="/" className={styles.sidebarFooterIconLink} title="Home">
              <Home size={18} />
            </Link>
            <Link href="/resume/ats-checker" className={styles.sidebarFooterIconLink} title="ATS Score Checker">
              <ScanSearch size={18} />
            </Link>
            <Link href="/linkedin-review" className={styles.sidebarFooterIconLink} title="LinkedIn Review">
              <LinkedinIcon size={18} />
            </Link>
            <Link href="/cover-letter/builder" className={styles.sidebarFooterIconLink} title="Cover Letter Builder">
              <FileSignature size={18} />
            </Link>
          </div>
        </div>
      </aside>

      {/* ── Main Area ── */}
      <div className={styles.mainArea}>
        {/* Progress Bar */}
        <div className={styles.progressBarContainer}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
          </div>
          <span className={styles.progressLabel}>{progressPercent}%</span>
        </div>

        {/* Step Content */}
        <div className={styles.stepContent}>

          {/* ═══ Step 0: Getting Started ═══ */}
          {currentStep === 0 && (
            <div className={styles.fullPageStep}>
              <div style={{ textAlign: 'center', maxWidth: 680 }}>
                <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
                  How would you like to build your resume?
                </h1>
                <p style={{ fontSize: 15, color: '#64748b', marginBottom: 36 }}>
                  Start fresh with our guided builder, or upload an existing resume to edit.
                </p>
                <div className={styles.startCards}>
                  <div className={styles.startCard} onClick={goNext}>
                    <div className={styles.startCardIcon}>
                      <FileText size={36} strokeWidth={1.5} />
                    </div>
                    <h3 className={styles.startCardTitle}>Start with a new resume</h3>
                    <p className={styles.startCardText}>
                      Get step-by-step support with expert content suggestions at your fingertips!
                    </p>
                    <button className={styles.primaryBtn}>Create New</button>
                  </div>
                  <div className={`${styles.startCard} ${isUploading ? styles.startCardDisabled : ''}`}>
                    <div className={styles.startCardIcon}>
                      {isUploading ? <Loader2 size={36} className={styles.spin} /> : <Upload size={36} strokeWidth={1.5} />}
                    </div>
                    <h3 className={styles.startCardTitle}>Upload an existing resume</h3>
                    <p className={styles.startCardText}>
                      Edit your resume using expertly generated content in a fresh, new design.
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      accept=".pdf"
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />
                    <button
                      className={styles.secondaryBtn}
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? 'Extracting...' : 'Choose File'}
                    </button>
                    {uploadError && <p className={styles.errorMsg}>{uploadError}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══ Step 1: Template Selection ═══ */}
          {currentStep === 1 && (
            <div className={`${styles.stepCard} ${styles.stepCardWide}`}>
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepTitleIcon} style={{ background: '#ede9fe', color: '#6366f1' }}>
                    <LayoutGrid size={20} />
                  </span>
                  Choose Your Template
                </h2>
                <p className={styles.stepSubtitle}>Select a design for your resume. You can change it anytime on the Download page.</p>
              </div>
              <div className={styles.templateGrid}>
                {Object.values(RESUME_TEMPLATES).map((tmpl, index) => (
                  <button
                    key={tmpl.id}
                    className={`${styles.templateCard} ${activeTemplateId === tmpl.id ? styles.templateCardActive : ''}`}
                    onClick={() => setActiveTemplateId(tmpl.id)}
                  >
                    <div className={styles.templateThumbnail}>
                      {tmpl.preview ? (
                        <Image
                          src={tmpl.preview}
                          alt={`${tmpl.name} resume template preview`}
                          fill
                          className={styles.templateThumbnailImage}
                          sizes="200px"
                          priority={index < 3}
                        />
                      ) : (
                        <span className={styles.templateNoPreview}>Preview</span>
                      )}
                    </div>
                    <div className={styles.templateInfo}>
                      <p className={styles.templateName}>{tmpl.name}</p>
                      <p className={styles.templateCategory}>{tmpl.category || 'Professional'}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ═══ Step 2: Personal Information ═══ */}
          {currentStep === 2 && (
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepTitleIcon} style={{ background: '#dbeafe', color: '#2563eb' }}>
                    <User size={20} />
                  </span>
                  Personal Information
                </h2>
                <p className={styles.stepSubtitle}>Add your contact details so employers can reach you.</p>
              </div>
              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name</label>
                  <input className={styles.input} value={data.personal.fullName}
                    onChange={(e) => updatePersonal('fullName', e.target.value)} placeholder="Your Full Name" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Current Position / Title</label>
                  <input className={styles.input} value={data.personal.currentPosition}
                    onChange={(e) => updatePersonal('currentPosition', e.target.value)} placeholder="e.g. Senior Product Manager" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address</label>
                  <input className={styles.input} type="email" value={data.personal.email}
                    onChange={(e) => updatePersonal('email', e.target.value)} placeholder="email@example.com" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <input className={styles.input} value={data.personal.phone}
                    onChange={(e) => updatePersonal('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Location</label>
                  <input className={styles.input} value={data.personal.location}
                    onChange={(e) => updatePersonal('location', e.target.value)} placeholder="City, State" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>LinkedIn URL</label>
                  <input className={styles.input} value={data.personal.linkedin}
                    onChange={(e) => updatePersonal('linkedin', e.target.value)} placeholder="linkedin.com/in/you" />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Website (optional)</label>
                <input className={styles.input} value={data.personal.website}
                  onChange={(e) => updatePersonal('website', e.target.value)} placeholder="yoursite.com" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Professional Summary
                  <span style={{ fontWeight: 400, color: '#9ca3af', marginLeft: 6, textTransform: 'none', letterSpacing: 0 }}>
                    ({data.personal.summary.trim().split(/\s+/).filter(Boolean).length} words — aim for 30–60)
                  </span>
                </label>
                <textarea className={styles.textarea} value={data.personal.summary}
                  onChange={(e) => updatePersonal('summary', e.target.value)}
                  rows={4} placeholder="Results-driven professional with X years of experience in... Highlight your top 2–3 strengths and career focus." />
              </div>
            </div>
          )}

          {/* ═══ Step 3: Work Experience ═══ */}
          {currentStep === 3 && (
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepTitleIcon} style={{ background: '#fef3c7', color: '#d97706' }}>
                    <Briefcase size={20} />
                  </span>
                  Work Experience
                </h2>
                <p className={styles.stepSubtitle}>Add your work history. Use bullet points and metrics for best results.</p>
              </div>
              <div className={styles.tipBanner}>
                💡 Use strong action verbs and add real numbers (%, $, volume) to your bullets — they boost your ATS score significantly.
              </div>
              {data.experience.map((exp) => (
                <div key={exp.id} className={styles.card}>
                  <button className={styles.deleteBtn} onClick={() => removeExperience(exp.id)} aria-label="Remove">
                    <Trash2 size={16} />
                  </button>
                  <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Company</label>
                      <input className={styles.input} value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} placeholder="Company Name" />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Position</label>
                      <input className={styles.input} value={exp.position}
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} placeholder="Job Title" />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Start Date</label>
                      <input className={styles.input} value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} placeholder="Jan 2022" />
                    </div>
                    <div className={styles.formGroup}>
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
                  <div className={styles.formGroup}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <label className={styles.label} style={{ marginBottom: 0 }}>Description</label>
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
              <button className={styles.addBtn} onClick={addExperience}>+ Add Experience</button>
            </div>
          )}

          {/* ═══ Step 4: Education ═══ */}
          {currentStep === 4 && (
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepTitleIcon} style={{ background: '#dcfce7', color: '#16a34a' }}>
                    <GraduationCap size={20} />
                  </span>
                  Education
                </h2>
                <p className={styles.stepSubtitle}>Add your educational background.</p>
              </div>
              {data.education.map((edu) => (
                <div key={edu.id} className={styles.card}>
                  <button className={styles.deleteBtn} onClick={() => removeEducation(edu.id)} aria-label="Remove">
                    <Trash2 size={16} />
                  </button>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Institution</label>
                    <input className={styles.input} value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} placeholder="University Name" />
                  </div>
                  <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Degree</label>
                      <input className={styles.input} value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} placeholder="Bachelor of Science" />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Field of Study</label>
                      <input className={styles.input} value={edu.field}
                        onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} placeholder="Computer Science" />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Start Year</label>
                      <input className={styles.input} value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} placeholder="2018" />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>End Year</label>
                      <input className={styles.input} value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} placeholder="2022" />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>GPA (optional)</label>
                    <input className={styles.input} value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      placeholder="3.8" style={{ maxWidth: 160 }} />
                  </div>
                </div>
              ))}
              <button className={styles.addBtn} onClick={addEducation}>+ Add Education</button>
            </div>
          )}

          {/* ═══ Step 5: Skills ═══ */}
          {currentStep === 5 && (
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepTitleIcon} style={{ background: '#e0e7ff', color: '#4f46e5' }}>
                    <Wrench size={20} />
                  </span>
                  Skills
                </h2>
                <p className={styles.stepSubtitle}>Add your technical and professional skills. Aim for 6–12 for best ATS results.</p>
              </div>
              <TagSection
                items={data.skills} newVal={newSkill} setNewVal={setNewSkill}
                onAdd={() => addToList('skills', newSkill, setNewSkill)}
                onRemove={(i) => removeFromList('skills', i)}
                placeholder="e.g. Python, Project Management, SQL..."
              />
            </div>
          )}

          {/* ═══ Step 6: Strengths ═══ */}
          {currentStep === 6 && (
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepTitleIcon} style={{ background: '#fef3c7', color: '#d97706' }}>
                    <Star size={20} />
                  </span>
                  Strengths
                </h2>
                <p className={styles.stepSubtitle}>Highlight your key personal and professional strengths.</p>
              </div>
              <TagSection
                items={data.strengths} newVal={newStrength} setNewVal={setNewStrength}
                onAdd={() => addToList('strengths', newStrength, setNewStrength)}
                onRemove={(i) => removeFromList('strengths', i)}
                placeholder="e.g. Strategic Thinking, Problem Solving..."
              />
            </div>
          )}

          {/* ═══ Step 7: Projects ═══ */}
          {currentStep === 7 && (
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepTitleIcon} style={{ background: '#fce7f3', color: '#db2777' }}>
                    <FolderOpen size={20} />
                  </span>
                  Projects
                </h2>
                <p className={styles.stepSubtitle}>Showcase your personal or professional projects.</p>
              </div>
              {data.projects.map((proj) => (
                <div key={proj.id} className={styles.card}>
                  <button className={styles.deleteBtn} onClick={() => removeProject(proj.id)} aria-label="Remove">
                    <Trash2 size={16} />
                  </button>
                  <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Project Name</label>
                      <input className={styles.input} value={proj.name}
                        onChange={(e) => updateProject(proj.id, 'name', e.target.value)} placeholder="Project Title" />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Link (optional)</label>
                      <input className={styles.input} value={proj.link}
                        onChange={(e) => updateProject(proj.id, 'link', e.target.value)} placeholder="github.com/you/project" />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Description</label>
                    <textarea className={styles.textarea} value={proj.description}
                      onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                      rows={3} placeholder="What you built, tech used, and impact..." />
                  </div>
                </div>
              ))}
              <button className={styles.addBtn} onClick={addProject}>+ Add Project</button>
            </div>
          )}

          {/* ═══ Step 8: Key Achievements ═══ */}
          {currentStep === 8 && (
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepTitleIcon} style={{ background: '#fef9c3', color: '#ca8a04' }}>
                    <Trophy size={20} />
                  </span>
                  Key Achievements
                </h2>
                <p className={styles.stepSubtitle}>Add notable awards, accomplishments, or recognitions.</p>
              </div>
              <TagSection
                items={data.achievements} newVal={newAchievement} setNewVal={setNewAchievement}
                onAdd={() => addToList('achievements', newAchievement, setNewAchievement)}
                onRemove={(i) => removeFromList('achievements', i)}
                placeholder="e.g. Grew revenue by 40% in Q3 2024..."
                variant="outline"
              />
            </div>
          )}

          {/* ═══ Step 9: Certifications ═══ */}
          {currentStep === 9 && (
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepTitleIcon} style={{ background: '#dbeafe', color: '#2563eb' }}>
                    <Award size={20} />
                  </span>
                  Certifications
                </h2>
                <p className={styles.stepSubtitle}>Add professional certifications or licenses.</p>
              </div>
              {data.certifications.map((cert) => (
                <div key={cert.id} className={styles.card}>
                  <button className={styles.deleteBtn} onClick={() =>
                    setData(d => ({ ...d, certifications: d.certifications.filter(c => c.id !== cert.id) }))
                  } aria-label="Remove"><Trash2 size={16} /></button>
                  <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Certification Title</label>
                      <input className={styles.input} value={cert.title}
                        onChange={(e) => setData(d => ({ ...d, certifications: d.certifications.map(c => c.id === cert.id ? { ...c, title: e.target.value } : c) }))}
                        placeholder="e.g. AWS Solutions Architect" />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Issuing Organization</label>
                      <input className={styles.input} value={cert.issuer}
                        onChange={(e) => setData(d => ({ ...d, certifications: d.certifications.map(c => c.id === cert.id ? { ...c, issuer: e.target.value } : c) }))}
                        placeholder="e.g. Amazon Web Services" />
                    </div>
                  </div>
                </div>
              ))}
              <button className={styles.addBtn} onClick={() =>
                setData(d => ({ ...d, certifications: [...d.certifications, { id: uid(), title: '', issuer: '' }] }))
              }>+ Add Certification</button>
            </div>
          )}

          {/* ═══ Step 10: Languages ═══ */}
          {currentStep === 10 && (
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepTitleIcon} style={{ background: '#e0f2fe', color: '#0284c7' }}>
                    <Languages size={20} />
                  </span>
                  Languages
                </h2>
                <p className={styles.stepSubtitle}>Add languages you speak and your proficiency level.</p>
              </div>
              {data.languages.map((lang) => (
                <div key={lang.id} className={styles.card}>
                  <button className={styles.deleteBtn} onClick={() =>
                    setData(d => ({ ...d, languages: d.languages.filter(l => l.id !== lang.id) }))
                  } aria-label="Remove"><Trash2 size={16} /></button>
                  <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Language</label>
                      <input className={styles.input} value={lang.name}
                        onChange={(e) => setData(d => ({ ...d, languages: d.languages.map(l => l.id === lang.id ? { ...l, name: e.target.value } : l) }))}
                        placeholder="e.g. Spanish" />
                    </div>
                    <div className={styles.formGroup}>
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
              <button className={styles.addBtn} onClick={() =>
                setData(d => ({ ...d, languages: [...d.languages, { id: uid(), name: '', proficiency: 'Fluent' }] }))
              }>+ Add Language</button>
            </div>
          )}

          {/* ═══ Step 11: Extra-Curricular ═══ */}
          {currentStep === 11 && (
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepTitleIcon} style={{ background: '#fce7f3', color: '#db2777' }}>
                    <Activity size={20} />
                  </span>
                  Extra-Curricular Activities
                </h2>
                <p className={styles.stepSubtitle}>Add volunteer work, clubs, sports, or other activities.</p>
              </div>
              <TagSection
                items={data.extracurricular} newVal={newExtra} setNewVal={setNewExtra}
                onAdd={() => addToList('extracurricular', newExtra, setNewExtra)}
                onRemove={(i) => removeFromList('extracurricular', i)}
                placeholder="e.g. Volunteer at local food bank, Chess club captain..."
                variant="outline"
              />
            </div>
          )}

          {/* ═══ Step 12: Custom Section ═══ */}
          {currentStep === 12 && (
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepTitleIcon} style={{ background: '#f0fdf4', color: '#16a34a' }}>
                    <LayoutGrid size={20} />
                  </span>
                  Custom Section
                </h2>
                <p className={styles.stepSubtitle}>Add any additional section — military service, publications, volunteer work, etc.</p>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Section Title</label>
                <input
                  className={styles.input}
                  value={data.customSection.title}
                  onChange={(e) => setData(d => ({ ...d, customSection: { ...d.customSection, title: e.target.value } }))}
                  placeholder="e.g. Military Service, Publications"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Content</label>
                <textarea
                  className={styles.textarea}
                  value={data.customSection.content}
                  onChange={(e) => setData(d => ({ ...d, customSection: { ...d.customSection, content: e.target.value } }))}
                  rows={6}
                  placeholder="Details for your custom section..."
                />
              </div>
            </div>
          )}

          {/* ═══ Step 13: Download & Share ═══ */}
          {currentStep === 13 && (
            <div className={styles.downloadLayout}>
              <div className={styles.downloadLeft}>
                <h1 className={styles.downloadHeading}>
                  <span className={styles.downloadCheckmark}><Check size={20} /></span>
                  Your Resume is Ready!
                </h1>
                <p className={styles.downloadSubtitle}>
                  Download, share, or continue editing your professional resume.
                </p>

                <div className={styles.downloadActions}>
                  <button
                    className={`${styles.downloadActionBtn} ${styles.downloadActionPrimary}`}
                    onClick={handleDownloadPDF}
                  >
                    <FileDown size={20} /> Download as PDF
                  </button>
                  <button
                    className={`${styles.downloadActionBtn} ${styles.downloadActionSecondary}`}
                    onClick={handleExportText}
                  >
                    <FileText size={20} /> Export Text Only
                  </button>
                  <button
                    className={`${styles.downloadActionBtn} ${styles.downloadActionSecondary}`}
                    onClick={handleCopyLink}
                    disabled={isSharing}
                  >
                    {isSharing ? <Loader2 className={styles.spinner} size={20} /> : <LinkIcon size={20} />}
                    {isSharing ? 'Generating...' : copied ? 'Link Copied!' : 'Share via Link'}
                  </button>
                  <button
                    className={`${styles.downloadActionBtn} ${styles.downloadActionSecondary}`}
                    onClick={() => setEmailModal(true)}
                    disabled={isSharing}
                  >
                    <Mail size={20} /> Send to Email
                  </button>
                </div>

                {shareError && <p className={styles.shareError}>{shareError}</p>}

                {/* Email Modal */}
                {emailModal && (
                  <div className={styles.emailModal}>
                    <label className={styles.label}>Recipient Email</label>
                    <div className={styles.shareRow}>
                      <input
                        className={styles.input}
                        type="email"
                        placeholder="colleague@company.com"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendEmail()}
                      />
                      <button className={styles.copyBtn} onClick={handleSendEmail}>
                        {emailSent ? 'Sent!' : 'Send'}
                      </button>
                    </div>
                    <button
                      className={styles.backBtn}
                      style={{ marginTop: 8 }}
                      onClick={() => setEmailModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}

                <hr className={styles.downloadDivider} />

                <div className={styles.shareSection}>
                  <h3 className={styles.shareSectionTitle}>Branded Shareable Link</h3>
                  <div className={styles.shareRow}>
                    <input 
                      className={styles.shareInput} 
                      readOnly 
                      value={shareUrl || 'Generate a link to share...'} 
                      onClick={(e) => e.target.select()}
                    />
                    <button 
                      className={styles.copyBtn} 
                      onClick={handleCopyLink}
                      disabled={isSharing}
                    >
                      {isSharing ? <Loader2 className={styles.spinner} size={16} /> : <Copy size={16} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <p className={styles.shareTip}>This link stays updated even if you change your resume data later.</p>
                </div>

                <div className={styles.rewriteBanner} style={{ marginTop: 32 }}>
                  <p className={styles.rewriteKicker}>Premium AI Upgrade</p>
                  <h3 className={styles.rewriteTitle}>Turn this draft into a recruiter-ready resume in one click</h3>
                  <p className={styles.rewriteDesc}>
                    Our AI rewrite layer improves clarity, impact metrics, keyword match, and structure while keeping ATS-safe formatting.
                  </p>
                  <Link href="/payment?service=resume-ai-rewrite&source=resume-builder-download-cta" className={`btn btn-primary ${styles.rewriteBtn}`}>
                    ✨ AI Re-Write Resume
                  </Link>
                </div>
              </div>

              <div className={styles.downloadRight}>
                <div className={styles.downloadPreviewCard}>
                  <div className={styles.downloadPreviewInner}>
                    <SelectedTemplate data={data} />
                  </div>
                  <div className={styles.downloadPreviewActions}>
                    <button
                      className={styles.secondaryBtn}
                      style={{ flex: 1 }}
                      onClick={() => goToStep(1)}
                    >
                      Change Template
                    </button>
                    <button
                      className={styles.secondaryBtn}
                      style={{ flex: 1 }}
                      onClick={() => goToStep(2)}
                    >
                      Edit Resume
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Step Footer (Back / Continue) ── */}
        {currentStep > 0 && currentStep < 13 && (
          <div className={styles.stepFooter}>
            <button className={styles.backBtn} onClick={goBack}>
              <ChevronLeft size={18} /> Back
            </button>
            <div>
              {currentStep >= 2 && currentStep <= 12 && (
                <button className={styles.skipBtn} onClick={goNext}>
                  Skip
                </button>
              )}
              <button className={styles.continueBtn} onClick={goNext}>
                {currentStep === 12 ? 'Finish & Preview' : 'Save & Continue'} <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden print area — always mounted so react-to-print can access it */}
      <div style={{ position: 'fixed', left: '-9999px', top: 0, width: '210mm' }}>
        <div ref={previewRef} className={styles.printArea}>
          <SelectedTemplate data={data} />
        </div>
      </div>

      {/* AI Suggestions Popup */}
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
    </div>
  );
}
