'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Testimonials from '@/components/Testimonials/Testimonials';
import { INDUSTRY_MAPPINGS } from '@/constants/industry_keywords';
import EmojiImage from '@/components/UI/EmojiImage';
import { trackCTA } from '@/lib/analytics';
import { SITE_URL, getSoftwareAppJsonLd } from '@/lib/seo';
import RelatedTools from '@/components/RelatedTools/RelatedTools';
import styles from '../../subpage.module.css';

const features = [
  { icon: '📊', title: 'Instant ATS Analysis', desc: 'Upload your resume and get an instant compatibility score with detailed breakdown of how well it performs against ATS software.' },
  { icon: '🔍', title: 'Keyword Optimization', desc: 'Discover missing keywords that recruiters and ATS systems are looking for in your target role and industry.' },
  { icon: '📝', title: 'Format Checking', desc: 'Our scanner verifies your resume uses ATS-friendly formatting, fonts, and layout to ensure it gets parsed correctly.' },
  { icon: '💡', title: 'Smart Suggestions', desc: 'Get AI-powered recommendations to improve your content, structure, and keyword density for maximum impact.' },
  { icon: '🎯', title: 'Job Match Score', desc: 'Compare your resume against specific job descriptions to see how well you match and what adjustments to make.' },
  { icon: '📈', title: 'Score Tracking', desc: 'Track your resume score improvements over time. See how each change affects your ATS compatibility.' },
];

function getElasticScore(query, candidate) {
  const q = query.trim().toLowerCase();
  const text = candidate.toLowerCase();
  if (!q) return 1;
  if (text === q) return 120;
  if (text.startsWith(q)) return 100 - Math.min(20, text.length - q.length);
  if (text.includes(q)) return 75 - Math.min(25, text.indexOf(q));

  const qTokens = q.split(/\s+/).filter(Boolean);
  const tokenHits = qTokens.reduce((hits, token) => hits + (text.includes(token) ? 1 : 0), 0);

  let subsequenceHits = 0;
  let qIndex = 0;
  for (const ch of text) {
    if (qIndex < q.length && ch === q[qIndex]) {
      subsequenceHits += 1;
      qIndex += 1;
    }
  }

  const subsequenceScore = q.length > 0 ? (subsequenceHits / q.length) * 35 : 0;
  const tokenScore = tokenHits * 20;
  const combined = tokenScore + subsequenceScore - Math.max(0, text.length - q.length) * 0.08;
  return combined > 18 ? combined : 0;
}

export default function ATSChecker() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [industryMode, setIndustryMode] = useState('General');
  const [industryQuery, setIndustryQuery] = useState('General');
  const [showIndustryOptions, setShowIndustryOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const softwareJsonLd = useMemo(
    () =>
      getSoftwareAppJsonLd({
        name: 'RESUGROW ATS Resume Checker',
        description:
          'Upload a resume PDF and get an ATS compatibility score, keyword gaps, and actionable fixes.',
        url: `${SITE_URL}/resume/ats-checker`,
        price: '0.00',
      }),
    []
  );

  const industryOptions = useMemo(() => Object.keys(INDUSTRY_MAPPINGS), []);
  const filteredIndustries = useMemo(() => {
    return industryOptions
      .map((industry) => ({ industry, score: getElasticScore(industryQuery, industry) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.industry.localeCompare(b.industry))
      .slice(0, 12)
      .map(({ industry }) => industry);
  }, [industryOptions, industryQuery]);

  const handleFileChange = (selectedFile) => {
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please upload a valid PDF file.');
      setFile(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const selectIndustry = (industry) => {
    setIndustryMode(industry);
    setIndustryQuery(industry);
    setShowIndustryOptions(false);
  };

  const handleScan = async () => {
    if (!file) {
      setError('Please upload a resume file first.');
      return;
    }

    setError('');
    setLoading(true);
    setProgress(0);

    // Start progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 5;
      });
    }, 100);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      if (jobDescription.trim()) {
        formData.append('jobDescription', jobDescription);
      }
      const resolvedIndustry = INDUSTRY_MAPPINGS[industryQuery]
        ? industryQuery
        : filteredIndustries[0] || industryMode;
      setIndustryMode(resolvedIndustry);
      setIndustryQuery(resolvedIndustry);
      formData.append('industryMode', resolvedIndustry);

      const res = await fetch('/api/ats-scan', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.error && res.status !== 200) {
        clearInterval(progressInterval);
        setError(data.error);
        setLoading(false);
        setProgress(0);
        return;
      }

      // Complete progress bar
      clearInterval(progressInterval);
      setProgress(100);

      // Convert file to Data URL for preview on the results page
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('resumePreview', reader.result);
        localStorage.setItem('atsResults', JSON.stringify(data));
        
        // Brief delay so user sees the 100% completion
        setTimeout(() => {
          router.push('/resume/ats-checker/results');
        }, 400);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      clearInterval(progressInterval);
      setError('Something went wrong. Please try again.');
      setLoading(false);
      setProgress(0);
    }
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      {/* 1. Hero Section (The Hook) */}
      <section className={styles.subpageHero}>
        <div className={styles.subpageContainer}>
          <div className={styles.subpageHeroBadge}>#1 AI Resume Scanner</div>
          <h1 className={styles.subpageTitle}>
            Stop Being <span className="gradient-text">Invisible.</span><br />
            See What the ATS Sees.
          </h1>
          <p className={styles.subpageDesc}>
            98% of Fortune 500 companies use Applicant Tracking Systems (ATS) to filter resumes.
            Our AI-powered checker scans your resume against real-world hiring algorithms to
            ensure you make the &quot;Shortlist.&quot;
          </p>

          <div className={styles.contactForm} style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'left' }}>
            {/* File Upload */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Upload Your Resume (PDF)</label>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                  border: '2px dashed #cbd5e1',
                  borderRadius: '12px',
                  padding: '32px 24px',
                  textAlign: 'center',
                  backgroundColor: file ? '#f0fdf4' : '#f8fafc',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onClick={() => document.getElementById('ats-pdf-upload').click()}
              >
                <input
                  type="file"
                  id="ats-pdf-upload"
                  accept="application/pdf"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  style={{ display: 'none' }}
                />
                <div style={{ fontSize: '32px', marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                  <EmojiImage emoji={file ? '📄' : '📥'} size={40} alt={file ? 'PDF resume file selected for ATS scan' : 'Upload area icon for resume PDF file'} />
                </div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#0f172a' }}>
                  {file ? file.name : 'Click to Upload or Drag & Drop'}
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                  {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'PDF files only (Max 5MB)'}
                </p>
              </div>
            </div>

            {/* Job Description (Optional) */}
            <div className={styles.formGroup} style={{ marginTop: '16px' }}>
              <label className={styles.formLabel}>Paste Job Description <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>(Optional — for keyword matching)</span></label>
              <textarea
                className={styles.formInput}
                rows={4}
                placeholder="Paste the full job description here for a targeted keyword match..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                style={{ resize: 'vertical', minHeight: '80px' }}
              />
            </div>

            {/* Industry Mode */}
            <div className={styles.formGroup} style={{ marginTop: '16px' }}>
              <label className={styles.formLabel}>Target Industry <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>(Optional)</span></label>
              <div style={{ position: 'relative' }}>
                <input
                  className={styles.formInput}
                  type="text"
                  value={industryQuery}
                  onChange={(e) => {
                    const value = e.target.value;
                    setIndustryQuery(value);
                    setShowIndustryOptions(true);
                    if (INDUSTRY_MAPPINGS[value]) {
                      setIndustryMode(value);
                    }
                  }}
                  onFocus={() => setShowIndustryOptions(true)}
                  onBlur={() => {
                    setTimeout(() => {
                      setShowIndustryOptions(false);
                      if (!INDUSTRY_MAPPINGS[industryQuery]) {
                        setIndustryQuery(industryMode);
                      }
                    }, 120);
                  }}
                  placeholder="Search industry (e.g. FinTech, Healthcare, SaaS)"
                  autoComplete="off"
                />

                {showIndustryOptions && filteredIndustries.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    left: 0,
                    right: 0,
                    maxHeight: '240px',
                    overflowY: 'auto',
                    background: '#fff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '10px',
                    boxShadow: '0 12px 24px -8px rgba(15, 23, 42, 0.18)',
                    zIndex: 30
                  }}>
                    {filteredIndustries.map((industry) => (
                      <button
                        key={industry}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => selectIndustry(industry)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          background: industry === industryMode ? '#eff6ff' : '#fff',
                          color: '#0f172a',
                          border: 'none',
                          borderBottom: '1px solid #f1f5f9',
                          padding: '10px 12px',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        {industry}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ 
                marginTop: '16px', 
                padding: '16px', 
                backgroundColor: '#fef2f2', 
                borderLeft: '4px solid #ef4444', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <EmojiImage emoji="⚠️" size={22} alt="Warning icon for ATS scan error" />
                <div>
                  <h4 style={{ color: '#991b1b', fontSize: '14px', fontWeight: '700', margin: '0 0 4px 0' }}>Scan Halted</h4>
                  <p style={{ color: '#b91c1c', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button & Progress */}
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              {!loading ? (
                <button
                  className="btn btn-primary"
                  onClick={() => { trackCTA('scan_resume', 'ATS Checker'); handleScan(); }}
                  style={{ width: '100%', opacity: file ? 1 : 0.6 }}
                  disabled={!file}
                >
                  {file ? 'Scan My Resume' : 'Upload PDF to Begin'}
                </button>
              ) : (
                <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold', color: '#0f172a' }}>
                    <span>Analyzing your profile...</span>
                    <span>{progress}%</span>
                  </div>
                  <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        background: 'linear-gradient(90deg, #2563eb, #7c3aed)', 
                        width: `${progress}%`,
                        transition: 'width 0.2s ease-out'
                      }} 
                    />
                  </div>
                </div>
              )}
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'center' }}>
              Free. Confidential. Secure. Your data is never stored without your permission.
            </p>
          </div>
        </div>
      </section>

      {/* 2. The "How It Works" Section */}
      <section className={styles.stepsSection}>
        <div className={styles.subpageContainer}>
          <div className="section-header">
            <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
            <p className="section-subtitle">Get your ATS score in seconds.</p>
          </div>
          <div className={styles.stepsGrid}>
            {[
              { num: '1', title: 'Upload your Resume', desc: 'Drag and drop your PDF or Word doc. Our system parses the data just like a recruiter\'s bot.' },
              { num: '2', title: 'Paste the Job Description', desc: 'AI compares your skills and experience against the specific job you\'re targeting.' },
              { num: '3', title: 'Get Your Score', desc: 'Receive a real-time "Match Score" out of 100, highlighting missing keywords, formatting errors, and contact info gaps.' },
            ].map((s) => (
              <div key={s.num} className={styles.stepCard}>
                <div className={styles.stepNumber}>{s.num}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Key Benefits (Why RESUGROW?) */}
      <section className={styles.subpage}>
        <div className={styles.subpageContainer}>
          <div className="section-header">
            <h2 className="section-title">Why <span className="gradient-text">RESUGROW?</span></h2>
            <p className="section-subtitle">Comprehensive analysis to ensure your resume gets past ATS filters.</p>
          </div>
          <div className={styles.featureGrid}>
            {features.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureCardIcon}>
                  <EmojiImage emoji={f.icon} size={32} />
                </div>
                <h3 className={styles.featureCardTitle}>{f.title}</h3>
                <p className={styles.featureCardDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The "Fear of Missing Out" (Social Proof) */}
      <Testimonials
        title="Stop Getting Auto-Rejected"
        subtitle="Join thousands of professionals who used RESUGROW to beat the bots and land their dream interviews."
      />

      {/* 5. Technical Trust Signals (SEO Boost) */}
      <section className={styles.trustSection}>
        <div className={styles.subpageContainer}>
          <div className={styles.trustGrid}>
            <div>
              <h2 className={styles.trustTitle}>Why is ATS Optimization important in 2026?</h2>
              <div className={styles.trustContent}>
                <p>
                  With the rise of AI-driven recruitment, resumes are now ranked by &quot;relevance scores.&quot;
                  Traditional resumes often fail because they focus only on aesthetics, ignoring the underlying
                  data structures that bots require.
                </p>
                <p>
                  RESUGROW uses a proprietary algorithm that mimics the logic of major systems like
                  Workday, Taleo, and Greenhouse to give you a competitive edge. We don&apos;t just check
                  for keywords; we ensure your entire professional story is machine-readable and human-ready.
                </p>
              </div>
            </div>
            <div className={styles.aboutImage}>
              {/* Illustration or Graphic could go here */}
              <div style={{ fontSize: '100px', display: 'flex', justifyContent: 'center' }}>
                <EmojiImage emoji="🤖" size={120} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <RelatedTools />
    </>
  );
}
