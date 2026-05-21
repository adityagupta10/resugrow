'use client';

import { useState, useRef, useCallback, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { RESUME_TEMPLATES } from '@/components/ResumeTemplates/TemplateConfig';
import {
  FileText, Upload, Loader2, ChevronLeft, ChevronRight, Check,
  User, Briefcase, GraduationCap, Wrench, Star, FolderOpen, Trophy,
  Award, Languages, Activity, LayoutGrid, Download, Mail, Link as LinkIcon,
  Home, ScanSearch, FileSignature, Trash2,
  Wand2, FileDown, Copy, Camera, User2, Lock,
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { generatePDFBlob } from '@/utils/pdfGenerator';
import styles from './resume.module.css';
import AISuggestions from '@/components/AISuggestions';
import { scoreBullet, improveBullet } from '@/lib/ai-suggestions';
import {
  MAX_VERSION_HISTORY,
  stripVersionMeta,
  getResumeSnapshotSummary,
  extractVersionHistory,
  formatVersionDate,
  buildVersionDiff,
} from './versionHistory';
import { uid, getScoreColor, LinkedinIcon } from './builderUtils';
import TagSection from './TagSection';
import SuggestionsPopup from './SuggestionsPopup';

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
    photo: '',
    showPhoto: false,
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
  meta: {},
};

// ── Step Definitions ──────────────────────────────────────────────────────
const STEPS = [
  { id: 'start', label: 'Getting Started', icon: FileText },
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'template', label: 'Template', icon: LayoutGrid },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'strengths', label: 'Strengths', icon: Star },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'languages', label: 'Languages', icon: Languages },
  { id: 'extracurricular', label: 'Activities', icon: Activity },
  { id: 'custom', label: 'Custom Section', icon: LayoutGrid },
  { id: 'download', label: 'Download', icon: Download },
];

// ── AI Suggestions — lazy loaded on demand ────────────────────────────────
// Data is ~35KB and only needed when user opens the popup.
// Loaded dynamically to avoid bloating the initial bundle.

// ── Tag Section Component ─────────────────────────────────────────────────

// ══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════
function ResumeBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState(defaultData);
  const [activeTemplateId, setActiveTemplateId] = useState('classic');
  const [visitedSteps, setVisitedSteps] = useState(new Set([0]));
  const [personalInfoSaved, setPersonalInfoSaved] = useState(false);
  const [startOptionChosen, setStartOptionChosen] = useState(false);
  const previewRef = useRef(null);
  const searchParams = useSearchParams();
  const resumeIdParam = searchParams.get('id');
  const [isLoadingResume, setIsLoadingResume] = useState(!!resumeIdParam);

  const [shareUrl, setShareUrl] = useState('');
  const [shareId, setShareId] = useState('');

  // ── Persistence Helper (Defined early to avoid ReferenceError) ──────────
  const persistResumeRecord = useCallback(async ({
    sharedPdfUrl = null,
    recordVersion = false,
    versionReason = 'Manual snapshot',
    overrideData = null,
    overrideTemplateId = null,
  } = {}) => {
    const supabase = createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;
    if (!authData?.user) throw new Error('Please sign in to save your resume.');

    const userId = authData.user.id;
    const stableShareId = shareId || `${userId.slice(0, 8)}-${Date.now()}`;
    const nextTemplateId = overrideTemplateId || activeTemplateId;
    const payloadData = overrideData || data;
    const sanitizedData = stripVersionMeta(payloadData);
    const hydratedData = {
      ...sanitizedData,
      meta: {
        ...(sanitizedData.meta || {}),
        templateId: nextTemplateId,
      },
    };

    const res = await fetch('/api/resumes/share', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: hydratedData,
        title: hydratedData.personal?.fullName ? `Resume - ${hydratedData.personal.fullName}` : 'Untitled Resume',
        sharedPdfUrl,
        shareId: stableShareId,
        recordVersion,
        versionReason,
      }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to save resume state.');

    const brandedUrl = `https://www.resugrow.com${result.url}`;
    setShareUrl(brandedUrl);
    setShareId(stableShareId);

    if (result.resume?.data) {
      setData(result.resume.data);
      const incomingHistory = extractVersionHistory(result.resume.data);
      setVersionHistory(incomingHistory);
      if (incomingHistory.length >= 2) {
        setCompareVersionIds({
          left: incomingHistory[0].id,
          right: incomingHistory[1].id,
        });
      } else if (incomingHistory.length === 1) {
        setCompareVersionIds({
          left: incomingHistory[0].id,
          right: '',
        });
      }
    }

    return { ...result, shareId: stableShareId, brandedUrl };
  }, [activeTemplateId, data, shareId]);

  // Uploading state (for start modal)
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);
  const photoInputRef = useRef(null);

  // Tag input states
  const [newSkill, setNewSkill] = useState('');
  const [newStrength, setNewStrength] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [newExtra, setNewExtra] = useState('');

  // AI suggestions
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const [suggestionSection, setSuggestionSection] = useState(null);
  const [activeExpId, setActiveExpId] = useState(null);

  const SelectedTemplate = RESUME_TEMPLATES[activeTemplateId]?.component || RESUME_TEMPLATES['classic'].component;

  // ── Navigation ──────────────────────────────────────────────────────────
  const goNext = () => {
    if (currentStep === 0) setStartOptionChosen(true);
    if (currentStep === 1) setPersonalInfoSaved(true);
    const next = Math.min(currentStep + 1, STEPS.length - 1);
    setCurrentStep(next);
    setVisitedSteps(prev => new Set([...prev, next]));
  };

  const goBack = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
  };

  const goToStep = (idx) => {
    // Step 0 always accessible
    if (idx === 0) { setCurrentStep(0); return; }
    // Step 1 (Personal Info) only accessible after choosing a start option
    if (idx === 1 && !startOptionChosen) return;
    // Steps 2+ only accessible after Personal Info is saved
    if (idx >= 2 && !personalInfoSaved) return;
    setCurrentStep(idx);
    setVisitedSteps(prev => new Set([...prev, idx]));
  };

  const progressPercent = Math.round((currentStep / (STEPS.length - 1)) * 100);

  // ── Personal ──────────────────────────────────────────────────────────
  const updatePersonal = useCallback((field, value) => {
    setData((d) => ({ ...d, personal: { ...d.personal, [field]: value } }));
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Photo must be smaller than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      updatePersonal('photo', event.target.result);
    };
    reader.readAsDataURL(file);
  };

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

  const [isSharing, setIsSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState(null);
  const [versionHistory, setVersionHistory] = useState([]);
  const [isSavingVersion, setIsSavingVersion] = useState(false);
  const [versionNotice, setVersionNotice] = useState('');
  const [compareVersionIds, setCompareVersionIds] = useState({ left: '', right: '' });

  const comparedVersions = useMemo(() => {
    const left = versionHistory.find((version) => version.id === compareVersionIds.left) || versionHistory[0] || null;
    const right = versionHistory.find((version) => version.id === compareVersionIds.right) || versionHistory[1] || null;
    return { left, right };
  }, [compareVersionIds, versionHistory]);

  const versionDiffRows = useMemo(
    () => buildVersionDiff(comparedVersions.left, comparedVersions.right),
    [comparedVersions.left, comparedVersions.right],
  );


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

      await persistResumeRecord({
        sharedPdfUrl: publicUrl,
        recordVersion: false,
      });
      // No auto-copy here during auto-generation to avoid UX surprise.
    } catch (err) {
      console.error('Sharing failed:', err);
      setShareError(err.message || 'Could not create shareable link.');
    } finally {
      setIsSharing(false);
    }
  };

  // ── PDF download (print-to-PDF) ─────────────────────────────────────
  const handleDownloadPDF = useCallback(async () => {
    const srcEl = previewRef.current;
    if (!srcEl) return;

    setShareError(null);
    setVersionNotice('');
    setIsSavingVersion(true);

    const filenameBase = `Resume_${data.personal.fullName ? data.personal.fullName.replace(/\s+/g, '_') : 'Download'}`;
    const filename = `${filenameBase}.pdf`;
    const printWindow = window.open('', filenameBase);
    if (!printWindow) {
      setIsSavingVersion(false);
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
      } catch { }
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
    } catch { }

    try {
      const imgs = Array.from(printWindow.document.images || []);
      await Promise.all(
        imgs.map((img) => (img.complete ? Promise.resolve() : new Promise((res) => {
          img.onload = res;
          img.onerror = res;
        })))
      );
    } catch { }

    try {
      const saveResult = await persistResumeRecord({
        recordVersion: true,
        versionReason: 'PDF export',
      });
      const nextVersionNumber =
        saveResult?.resume?.data?.meta?.versionCounter || versionHistory.length + 1;
      setVersionNotice(`Version ${nextVersionNumber} saved from this PDF export.`);
    } catch (error) {
      console.error('Version snapshot failed:', error);
      setShareError(error.message || 'Could not save version history for this export.');
    } finally {
      setIsSavingVersion(false);
    }

    setTimeout(() => {
      try {
        printWindow.focus();
        printWindow.print();
      } catch { }
    }, 0);
  }, [data.personal.fullName, persistResumeRecord, versionHistory.length]);

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

  // Moved to Share via Link section

  // ── Auto-generate sharing link on Step 13 ──────────────────────────────
  useEffect(() => {
    if (currentStep === 13 && !shareUrl && !isSharing && !shareError) {
      handleShareResume();
    }
  }, [currentStep, shareUrl, isSharing, shareError]);

  useEffect(() => {
    if (!versionHistory.length) return;
    setCompareVersionIds((prev) => ({
      left: prev.left || versionHistory[0]?.id || '',
      right: prev.right || versionHistory[1]?.id || '',
    }));
  }, [versionHistory]);

  // ── Load existing resume if ID is present ──────────────────────────────
  useEffect(() => {
    if (resumeIdParam) {
      const fetchResume = async () => {
        try {
          setIsLoadingResume(true);
          const res = await fetch(`/api/resumes/${resumeIdParam}`);
          if (res.ok) {
            const resume = await res.json();
            if (resume.data) {
              setData(resume.data);
              const incomingHistory = extractVersionHistory(resume.data);
              setVersionHistory(incomingHistory);
              setCompareVersionIds({
                left: incomingHistory[0]?.id || '',
                right: incomingHistory[1]?.id || '',
              });
              if (resume.data.meta?.templateId) {
                setActiveTemplateId(resume.data.meta.templateId);
              }
              // Set shareUrl so we don't regenerate immediately if they go to download
              const brandedUrl = `https://www.resugrow.com/r/${resume.shareId}`;
              setShareUrl(brandedUrl);
              setShareId(resume.shareId);
              
              // Skip the "Getting Started" modal/step since we're editing
              setCurrentStep(1); 
              setVisitedSteps(new Set([0, 1]));
              setStartOptionChosen(true);
              setPersonalInfoSaved(true);
            }
          }
        } catch (err) {
          console.error("Failed to fetch resume:", err);
        } finally {
          setIsLoadingResume(false);
        }
      };
      fetchResume();
    }
  }, [resumeIdParam]);

  // ── Load Fixed Resume Data from ATS Auto-Fix ────────────────────────────
  useEffect(() => {
    const isFixed = searchParams.get('useFixed');
    if (isFixed === 'true') {
      const fixedData = localStorage.getItem('atsFixedResumeData');
      if (fixedData) {
        try {
          const parsed = JSON.parse(fixedData);
          // Gently patch the form data with the ATS outputs
          setData(prev => ({
            ...prev,
            personal: { ...prev.personal, ...parsed.personal },
            experience: parsed.structuredData?.experience?.map(exp => ({
              id: exp.id || Math.random().toString(36).substr(2, 9),
              company: exp.company || '',
              position: exp.title || '',
              startDate: exp.date || '',
              endDate: '',
              current: false,
              description: exp.bullets ? exp.bullets.join('\n') : ''
            })) || prev.experience,
          }));
          
          localStorage.removeItem('atsFixedResumeData');
          setCurrentStep(1);
          setVisitedSteps(new Set([0, 1]));
          setStartOptionChosen(true);
          setPersonalInfoSaved(true);
        } catch (e) {
          console.error("Failed to parse ATS fixed data", e);
        }
      }
    }
  }, [searchParams]);

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
    const subject = encodeURIComponent(`My Resume — ${data.personal.fullName || 'RESUGROW'}`);
    const body = encodeURIComponent(`Here is my resume built with RESUGROW:\n\n${shareUrl}\n\nBest regards,\n${data.personal.fullName || ''}`);
    window.open(`mailto:${emailAddress}?subject=${subject}&body=${body}`);
    setEmailSent(true);
    setTimeout(() => { setEmailSent(false); setEmailModal(false); }, 2000);
  };

  const handleSocialShare = (platform) => {
    const urlStr = shareUrl || 'https://resugrow.vercel.app/resume/view/' + uid();
    const text = encodeURIComponent(`Check out my professional resume built with RESUGROW!`);
    const url = encodeURIComponent(urlStr);

    let shareLink = '';
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'x':
        shareLink = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'telegram':
        shareLink = `https://t.me/share/url?url=${url}&text=${text}`;
        break;
      case 'whatsapp':
        shareLink = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        break;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };

  const handleRestoreVersion = async (versionId) => {
    const targetVersion = versionHistory.find((version) => version.id === versionId);
    if (!targetVersion?.data) return;

    const restoredTemplateId = targetVersion.templateId || 'classic';
    const restoredData = {
      ...targetVersion.data,
      meta: {
        ...(targetVersion.data.meta || {}),
        templateId: restoredTemplateId,
        versionHistory,
        versionCounter: data.meta?.versionCounter || versionHistory.length,
      },
    };

    setData(restoredData);
    setActiveTemplateId(restoredTemplateId);
    setVersionNotice(`${targetVersion.label} restored. Export again to save the rollback as a fresh snapshot.`);
    setShareError(null);

    try {
      await persistResumeRecord({
        overrideData: restoredData,
        overrideTemplateId: restoredTemplateId,
        recordVersion: false,
      });
    } catch (error) {
      console.error('Failed to persist restored version:', error);
      setShareError(error.message || 'Restored locally, but failed to sync the rollback to your account.');
    }
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
    <div data-theme="resume" className={styles.wizardPage}>
      {isLoadingResume && (
        <div className={styles.globalLoader}>
          <div className={styles.loaderContent}>
            <Loader2 className="animate-spin" size={48} />
            <p>Loading your resume...</p>
          </div>
        </div>
      )}
      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.sidebarLogo}>
          <div className={styles.sidebarLogoIcon}>R</div>
          <span className={styles.sidebarLogoText}>RESUGROW</span>
        </Link>
        <nav className={styles.sidebarNav}>
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === currentStep;
            const isCompleted = visitedSteps.has(idx) && idx < currentStep && stepHasData(idx);
            const isLocked = (idx === 1 && !startOptionChosen) || (idx >= 2 && !personalInfoSaved);
            return (
              <button
                key={step.id}
                className={`${styles.sidebarStep} ${isActive ? styles.sidebarStepActive : ''} ${isCompleted ? styles.sidebarStepCompleted : ''} ${isLocked ? styles.sidebarStepLocked : ''}`}
                onClick={() => goToStep(idx)}
                disabled={isLocked}
                title={isLocked && idx === 1 ? 'Choose a start option first' : isLocked ? 'Complete Personal Info first' : ''}
              >
                <span className={styles.stepIcon}>
                  {isLocked ? <Lock size={14} /> : isCompleted ? <Check size={14} /> : <Icon size={14} />}
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
        <div className={currentStep === 13 ? styles.downloadPageWrapper : styles.stepContent}>

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

          {/* ═══ Step 1: Personal Information ═══ */}
          {currentStep === 1 && (
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepTitleIcon} style={{ background: '#dcfce7', color: '#166534' }}>
                    <User size={20} />
                  </span>
                  Personal Information
                </h2>
                <p className={styles.stepSubtitle}>Add your contact details so employers can reach you.</p>
              </div>

              {/* Photo Toggle & Upload */}
              <div className={styles.photoSection}>
                <div 
                  className={styles.photoUploadBox}
                  style={!data.personal.showPhoto ? { opacity: 0.4, pointerEvents: 'none', cursor: 'not-allowed' } : {}}
                  onClick={() => data.personal.showPhoto && photoInputRef.current?.click()}
                >
                  {data.personal.photo ? (
                    <img src={data.personal.photo} alt="Profile" className={styles.photoPreview} />
                  ) : (
                    <>
                      <Camera className={styles.photoUploadIcon} size={24} />
                      <span className={styles.photoUploadText}>Upload</span>
                    </>
                  )}
                  <input 
                    type="file"
                    ref={photoInputRef}
                    className={styles.photoInput}
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                </div>
                <div className={styles.photoControls}>
                  <h3 className={styles.photoTitle}>Profile Photo</h3>
                  <p className={styles.photoDesc}>A professional photo can build trust. (Max 2MB)</p>
                  
                  <div 
                    className={styles.toggleContainer}
                    onClick={() => {
                      const newVal = !data.personal.showPhoto;
                      updatePersonal('showPhoto', newVal);
                      
                      // Switch to/from the dedicated photo template
                      if (newVal) {
                        setActiveTemplateId('photo');
                      } else {
                        setActiveTemplateId('classic');
                      }
                    }}
                  >
                    <div className={`${styles.toggleBase} ${data.personal.showPhoto ? styles.toggleActive : ''}`}>
                      <div className={styles.toggleCircle} />
                    </div>
                    <span className={styles.toggleLabel}>Show photo on resume</span>
                  </div>

                  {data.personal.photo && (
                    <button 
                      className={styles.removePhotoBtn}
                      onClick={() => updatePersonal('photo', '')}
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div className={styles.scoreRow}>
                    <label className={styles.label} style={{ marginBottom: 0 }}>Professional Summary</label>
                    {data.personal.summary.trim().length > 10 && (
                      <div className={`${styles.scoreMeter} ${getScoreColor(scoreBullet(data.personal.summary))}`}>
                        Score: {scoreBullet(data.personal.summary)}/100
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {data.personal.summary.trim().length > 5 && scoreBullet(data.personal.summary) < 70 && (
                      <button 
                        className={styles.magicBtn}
                        onClick={() => updatePersonal('summary', improveBullet(data.personal.summary, data.personal.currentPosition))}
                        title="Instant AI Upgrade"
                      >
                        <Wand2 size={14} /> Upgrade
                      </button>
                    )}
                    <button
                      className={styles.suggestionsToggle}
                      onClick={() => {
                        setSuggestionSection('summary');
                        setIsSuggestionOpen(true);
                      }}
                    >
                      ✨ AI Suggestions
                    </button>
                  </div>
                </div>
                <textarea className={styles.textarea} value={data.personal.summary}
                  onChange={(e) => updatePersonal('summary', e.target.value)}
                  rows={4} placeholder="Results-driven professional with X years of experience in... Highlight your top 2–3 strengths and career focus." />

                <AISuggestions
                  section="summary"
                  jobTitle={data.personal.currentPosition}
                  userText={data.personal.summary}
                  onSelect={(suggestion) => {
                    const current = data.personal.summary || '';
                    const prefix = current.trim() ? (current.endsWith(' ') ? '' : ' ') : '';
                    updatePersonal('summary', current + prefix + suggestion);
                  }}
                />
              </div>
            </div>
          )}

          {/* ═══ Step 2: Template Selection ═══ */}
          {currentStep === 2 && (
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
                {Object.values(RESUME_TEMPLATES)
                  .filter(tmpl => !tmpl.id.startsWith('photo'))
                  .map((tmpl, index) => (
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
                      <div className={styles.templateCardInfo}>
                        <h4 className={styles.templateCardName}>{tmpl.name}</h4>
                        <p className={styles.templateCardCategory}>{tmpl.category}</p>
                      </div>
                    </button>
                  ))}
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
                      <div className={styles.scoreRow}>
                        <label className={styles.label} style={{ marginBottom: 0 }}>Description</label>
                        {exp.description.trim().length > 10 && (
                          <div className={`${styles.scoreMeter} ${getScoreColor(scoreBullet(exp.description))}`}>
                            Score: {scoreBullet(exp.description)}/100
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {exp.description.trim().length > 5 && scoreBullet(exp.description) < 70 && (
                          <button 
                            className={styles.magicBtn}
                            onClick={() => updateExperience(exp.id, 'description', improveBullet(exp.description, exp.position || data.personal.currentPosition))}
                            title="Instant AI Upgrade"
                          >
                            <Wand2 size={14} /> Upgrade
                          </button>
                        )}
                        <button
                          className={styles.suggestionsToggle}
                          onClick={() => {
                            setSuggestionSection('experience');
                            setIsSuggestionOpen(true);
                            setActiveExpId(exp.id);
                          }}
                        >
                          ✨ AI Suggestions
                        </button>
                      </div>
                    </div>
                    <textarea className={styles.textarea} value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      rows={5} placeholder={'• Spearheaded X initiative, increasing Y by 32%\n• Automated Z process, saving 8 hrs/week\n• Led team of 5 to deliver...'} />

                    <AISuggestions
                      section="experience"
                      jobTitle={exp.position || data.personal.currentPosition}
                      userText={exp.description}
                      onSelect={(suggestion) => {
                        const current = exp.description || '';
                        const prefix = current.trim() ? (current.endsWith('\n') ? '• ' : '\n• ') : '• ';
                        updateExperience(exp.id, 'description', current + prefix + suggestion);
                      }}
                    />
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
                  <span className={styles.stepTitleIcon} style={{ background: '#3b82f615', color: '#3b82f6' }}>
                    <Wrench size={20} />
                  </span>
                  Skills
                </h2>
                <p className={styles.stepSubtitle}>Highlight your primary tools, software, and specialised expertise.</p>
              </div>
              <div className={styles.tipBanner}>
                💡 Group similar skills (e.g. "React, Node, SQL") for better readability.
              </div>
              <div className={styles.formGroup}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <label className={styles.label} style={{ marginBottom: 0 }}>Add Skills</label>
                  <button
                    className={styles.suggestionsToggle}
                    onClick={() => {
                      setSuggestionSection('skills');
                      setIsSuggestionOpen(true);
                    }}
                  >
                    ✨ AI Suggestions
                  </button>
                </div>
                <TagSection
                  items={data.skills}
                  newVal={newSkill}
                  setNewVal={setNewSkill}
                  onAdd={() => addToList('skills', newSkill, setNewSkill)}
                  onRemove={(i) => removeFromList('skills', i)}
                  placeholder="e.g. Project Management, Figma, Python..."
                />
              </div>
            </div>
          )}

          {/* ═══ Step 6: Strengths ═══ */}
          {currentStep === 6 && (
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepTitleIcon} style={{ background: '#f0f9ff', color: '#0369a1' }}>
                    <Star size={20} />
                  </span>
                  Strengths
                </h2>
                <p className={styles.stepSubtitle}>What makes you stand out? Add your key personality traits and areas of mastery.</p>
              </div>
              <div className={styles.formGroup}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <label className={styles.label} style={{ marginBottom: 0 }}>Your Strengths</label>
                  <button
                    className={styles.suggestionsToggle}
                    onClick={() => {
                      setSuggestionSection('strengths');
                      setIsSuggestionOpen(true);
                    }}
                  >
                    ✨ AI Suggestions
                  </button>
                </div>
                <TagSection
                  items={data.strengths}
                  newVal={newStrength}
                  setNewVal={setNewStrength}
                  onAdd={() => addToList('strengths', newStrength, setNewStrength)}
                  onRemove={(i) => removeFromList('strengths', i)}
                  placeholder="e.g. Analytical Thinking, Leadership, Adaptability..."
                  variant="outline"
                />
              </div>
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
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                <button className={styles.suggestionsToggle} onClick={() => { setSuggestionSection('projects'); setIsSuggestionOpen(true); }}>
                  ✨ AI Suggestions
                </button>
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
                  <span className={styles.stepTitleIcon} style={{ background: '#fcfaf2', color: '#ca8a04' }}>
                    <Trophy size={20} />
                  </span>
                  Achievements
                </h2>
                <p className={styles.stepSubtitle}>List your performance awards, competition wins, or major milestones.</p>
              </div>
              <div className={styles.formGroup}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <label className={styles.label} style={{ marginBottom: 0 }}>Notable Wins</label>
                  <button
                    className={styles.suggestionsToggle}
                    onClick={() => {
                      setSuggestionSection('achievements');
                      setIsSuggestionOpen(true);
                    }}
                  >
                    ✨ AI Suggestions
                  </button>
                </div>
                <TagSection
                  items={data.achievements}
                  newVal={newAchievement}
                  setNewVal={setNewAchievement}
                  onAdd={() => addToList('achievements', newAchievement, setNewAchievement)}
                  onRemove={(i) => removeFromList('achievements', i)}
                  placeholder="e.g. Employee of the Year, Hackathon Winner..."
                />
              </div>
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
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                <button className={styles.suggestionsToggle} onClick={() => { setSuggestionSection('certifications'); setIsSuggestionOpen(true); }}>
                  ✨ AI Suggestions
                </button>
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
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                <button className={styles.suggestionsToggle} onClick={() => { setSuggestionSection('languages'); setIsSuggestionOpen(true); }}>
                  ✨ AI Suggestions
                </button>
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
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                <button className={styles.suggestionsToggle} onClick={() => { setSuggestionSection('activities'); setIsSuggestionOpen(true); }}>
                  ✨ AI Suggestions
                </button>
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
                <button
                  className={styles.backBtn}
                  style={{ marginBottom: 24, padding: '8px 0' }}
                  onClick={goBack}
                >
                  <ChevronLeft size={18} /> Back to Editor
                </button>

                <h1 className={styles.downloadHeading}>
                  <span className={styles.downloadCheckmark}><Check size={20} /></span>
                  Ready to go!
                </h1>
                <p className={styles.downloadSubtitle}>
                  Download your resume or share it with recruiters via a professional link.
                </p>

                <div className={styles.downloadActions}>
                  <button
                    className={`${styles.downloadActionBtn} ${styles.downloadActionPrimary}`}
                    onClick={handleDownloadPDF}
                    disabled={isSavingVersion}
                  >
                    {isSavingVersion ? <Loader2 className={styles.spinner} size={20} /> : <FileDown size={20} />}
                    {isSavingVersion ? 'Saving Version...' : 'Download as PDF'}
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
                {versionNotice && <p className={styles.versionNotice}>{versionNotice}</p>}

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
                  <h3 className={styles.shareSectionTitle}>Share your Professional Link</h3>
                  <div className={styles.shareRow}>
                    <input
                      className={styles.shareInput}
                      readOnly
                      value={shareUrl || 'Generating link...'}
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

                  <div className={styles.socialShareRow}>
                    <button className={`${styles.socialBtn} ${styles.socialFB}`} onClick={() => handleSocialShare('facebook')} title="Share on Facebook">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </button>
                    <button className={`${styles.socialBtn} ${styles.socialX}`} onClick={() => handleSocialShare('x')} title="Share on X">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/></svg>
                    </button>
                    <button className={`${styles.socialBtn} ${styles.socialTG}`} onClick={() => handleSocialShare('telegram')} title="Share on Telegram">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0C5.346 0 0 5.346 0 11.944s5.346 11.944 11.944 11.944 11.944-5.346 11.944-11.944S18.542 0 11.944 0zm5.812 8.353l-1.974 9.307c-.145.658-.537.818-1.084.508l-3.004-2.213-1.448 1.393c-.16.16-.296.296-.604.296l.216-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.654-.64.135-.954l11.566-4.458c.535-.196 1.006.128.832.914z"/></svg>
                    </button>
                    <button className={`${styles.socialBtn} ${styles.socialWA}`} onClick={() => handleSocialShare('whatsapp')} title="Share on WhatsApp">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.431 5.623 1.432h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </button>
                  </div>
                </div>

                {shareUrl && (
                  <div className={styles.dashboardLinkBanner} style={{
                    marginTop: 24, 
                    padding: 20, 
                    borderRadius: 12, 
                    background: 'var(--primary-50)', 
                    border: '1px solid var(--primary-200)',
                    textAlign: 'center'
                  }}>
                    <h4 style={{ margin: '0 0 8px', color: 'var(--text-primary)', fontSize: '16px' }}>✅ Securely Saved to your Account</h4>
                    <p style={{ margin: '0 0 16px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                      You can return and edit this exact configuration later. 
                    </p>
                    <Link href="/dashboard" className="btn btn-secondary" style={{ display: 'inline-block' }}>
                      Go to Dashboard
                    </Link>
                  </div>
                )}

                <div className={styles.versionPanel}>
                  <div className={styles.versionPanelHeader}>
                    <div>
                      <p className={styles.versionKicker}>Feature 3 : Resume Version Control</p>
                      <h3 className={styles.versionTitle}>Export snapshots, compare changes, and roll back instantly</h3>
                      <p className={styles.versionText}>
                        Every PDF export now saves a point-in-time version of this resume. Use the compare view below to see what changed between iterations before you send the next one out.
                      </p>
                    </div>
                  </div>

                  {versionHistory.length ? (
                    <>
                      <div className={styles.versionCompareControls}>
                        <div className={styles.versionCompareField}>
                          <label className={styles.versionLabel}>Compare from</label>
                          <select
                            className={styles.versionSelect}
                            value={comparedVersions.left?.id || ''}
                            onChange={(e) => setCompareVersionIds((prev) => ({ ...prev, left: e.target.value }))}
                          >
                            {versionHistory.map((version) => (
                              <option key={version.id} value={version.id}>
                                {version.label} · {formatVersionDate(version.createdAt)}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className={styles.versionCompareField}>
                          <label className={styles.versionLabel}>Compare to</label>
                          <select
                            className={styles.versionSelect}
                            value={comparedVersions.right?.id || ''}
                            onChange={(e) => setCompareVersionIds((prev) => ({ ...prev, right: e.target.value }))}
                          >
                            <option value="">Select version</option>
                            {versionHistory.map((version) => (
                              <option key={version.id} value={version.id}>
                                {version.label} · {formatVersionDate(version.createdAt)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {comparedVersions.left && comparedVersions.right ? (
                        <div className={styles.versionDiffCard}>
                          <div className={styles.versionCompareHeader}>
                            <div>
                              <strong>{comparedVersions.left.label}</strong>
                              <span>{formatVersionDate(comparedVersions.left.createdAt)}</span>
                            </div>
                            <div>
                              <strong>{comparedVersions.right.label}</strong>
                              <span>{formatVersionDate(comparedVersions.right.createdAt)}</span>
                            </div>
                          </div>

                          {versionDiffRows.length ? (
                            <div className={styles.versionDiffGrid}>
                              {versionDiffRows.map((row) => (
                                <div key={`${row.label}-${row.left}-${row.right}`} className={styles.versionDiffRow}>
                                  <span>{row.label}</span>
                                  <strong>{row.left}</strong>
                                  <strong>{row.right}</strong>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className={styles.versionEmpty}>These two versions are structurally identical based on template and section counts.</p>
                          )}
                        </div>
                      ) : null}

                      <div className={styles.versionCards}>
                        {versionHistory.map((version) => (
                          <div key={version.id} className={styles.versionCard}>
                            <div className={styles.versionCardTop}>
                              <div>
                                <h4>{version.label}</h4>
                                <p>{formatVersionDate(version.createdAt)}</p>
                              </div>
                              <span className={styles.versionReason}>{version.reason || 'Snapshot'}</span>
                            </div>

                            <div className={styles.versionMeta}>
                              <span>Template: {version.templateId || 'classic'}</span>
                              <span>{version.summary?.experienceCount || 0} experience entries</span>
                              <span>{version.summary?.skillsCount || 0} skills</span>
                            </div>

                            <div className={styles.versionCardActions}>
                              <button
                                type="button"
                                className={styles.versionBtn}
                                onClick={() => setCompareVersionIds({
                                  left: versionHistory[0]?.id || version.id,
                                  right: version.id,
                                })}
                              >
                                Compare
                              </button>
                              <button
                                type="button"
                                className={styles.versionBtnPrimary}
                                onClick={() => handleRestoreVersion(version.id)}
                              >
                                Restore this version
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className={styles.versionEmptyState}>
                      <h4>No saved snapshots yet</h4>
                      <p>
                        Your first PDF export will create Version 1 automatically. After that, each export becomes a checkpoint you can compare or restore.
                      </p>
                    </div>
                  )}
                </div>

                <div className={styles.rewriteBanner} style={{ marginTop: 32 }}>
                  <p className={styles.rewriteKicker}>Premium AI Upgrade</p>
                  <h3 className={styles.rewriteTitle}>One-click Recruiter Optimization</h3>
                  <p className={styles.rewriteDesc}>
                    Our AI rewrite layer improves clarity, impact metrics, and structure while keeping ATS-safe formatting.
                  </p>
                  <Link href="/payment?service=resume-ai-rewrite&source=resume-builder-download-cta" className={`btn btn-primary ${styles.rewriteBtn}`}>
                    ✨ AI Re-Write Resume
                  </Link>
                </div>
              </div>

              <div className={styles.downloadRight}>
                <div className={styles.downloadPreviewInner}>
                  <div className={styles.previewScaleWrapper}>
                    <div className={styles.scaledContent} style={{ transform: 'scale(0.55)' }}>
                      <SelectedTemplate data={data} />
                    </div>
                  </div>
                </div>

                {/* Floating Action Buttons for preview area */}
                <div style={{
                  position: 'absolute',
                  bottom: 30,
                  display: 'flex',
                  gap: 12,
                  zIndex: 10
                }}>
                  <button
                    className={styles.secondaryBtn}
                    style={{ background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    onClick={() => goToStep(1)}
                  >
                    Change Template
                  </button>
                  <button
                    className={styles.primaryBtn}
                    style={{ boxShadow: '0 4px 12px rgba(59,130,246,0.2)' }}
                    onClick={() => goToStep(2)}
                  >
                    Edit Content
                  </button>
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
        isOpen={isSuggestionOpen}
        section={suggestionSection}
        onClose={() => setIsSuggestionOpen(false)}
        onSelect={(s) => {
          if (suggestionSection === 'experience') {
            const current = data.experience.find(e => e.id === activeExpId)?.description || '';
            const prefix = current.trim() ? (current.endsWith('\n') ? '• ' : '\n• ') : '• ';
            updateExperience(activeExpId, 'description', current + prefix + s);
          } else if (suggestionSection === 'summary') {
            const current = data.personal.summary || '';
            const prefix = current.trim() ? (current.endsWith(' ') ? '' : ' ') : '';
            updatePersonal('summary', current + prefix + s);
          } else if (['skills', 'strengths', 'achievements'].includes(suggestionSection)) {
            addToList(suggestionSection, s, () => { });
          } else if (suggestionSection === 'activities') {
            addToList('extracurricular', s, () => { });
          } else if (suggestionSection === 'certifications') {
            // Parse "Title — Issuer" or just use as title
            const parts = s.split(' – ');
            setData(d => ({ ...d, certifications: [...d.certifications, { id: uid(), title: parts[0].trim(), issuer: parts[1]?.trim() || '' }] }));
          } else if (suggestionSection === 'languages') {
            // Parse "Language (Proficiency)" format
            const match = s.match(/^(.+?)\s*\((.+)\)$/);
            setData(d => ({ ...d, languages: [...d.languages, { id: uid(), name: match ? match[1].trim() : s, proficiency: match ? match[2].trim() : 'Fluent' }] }));
          } else if (suggestionSection === 'projects') {
            // Add as a new project card with description pre-filled
            setData(d => ({ ...d, projects: [...d.projects, { id: uid(), name: '', link: '', description: s }] }));
          } else if (suggestionSection === 'volunteer') {
            addToList('extracurricular', s, () => { });
          }
          setIsSuggestionOpen(false);
        }}
      />
    </div>
  );
}

export default function ResumeBuilderPageWrapper() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '14px' }}>Loading builder...</div>}>
      <ResumeBuilderPage />
    </Suspense>
  );
}
