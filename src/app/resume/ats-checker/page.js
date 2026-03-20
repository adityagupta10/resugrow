'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Testimonials from '@/components/Testimonials/Testimonials';
import { INDUSTRY_MAPPINGS } from '@/constants/industry_keywords';
import styles from '../../subpage.module.css';

const features = [
  { icon: '📊', title: 'Instant ATS Analysis', desc: 'Upload your resume and get an instant compatibility score with detailed breakdown of how well it performs against ATS software.' },
  { icon: '🔍', title: 'Keyword Optimization', desc: 'Discover missing keywords that recruiters and ATS systems are looking for in your target role and industry.' },
  { icon: '📝', title: 'Format Checking', desc: 'Our scanner verifies your resume uses ATS-friendly formatting, fonts, and layout to ensure it gets parsed correctly.' },
  { icon: '💡', title: 'Smart Suggestions', desc: 'Get AI-powered recommendations to improve your content, structure, and keyword density for maximum impact.' },
  { icon: '🎯', title: 'Job Match Score', desc: 'Compare your resume against specific job descriptions to see how well you match and what adjustments to make.' },
  { icon: '📈', title: 'Score Tracking', desc: 'Track your resume score improvements over time. See how each change affects your ATS compatibility.' },
];

export default function ATSChecker() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [industryMode, setIndustryMode] = useState('Software Engineering (General)');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

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
      formData.append('industryMode', industryMode);

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
        sessionStorage.setItem('resumePreview', reader.result);
        sessionStorage.setItem('atsResults', JSON.stringify(data));
        
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
              <input
                type="file"
                className={styles.formInput}
                accept=".pdf"
                onChange={(e) => { setFile(e.target.files[0]); setError(''); }}
              />
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
              <select
                className={styles.formInput}
                value={industryMode}
                onChange={(e) => setIndustryMode(e.target.value)}
                style={{ padding: '12px', cursor: 'pointer', appearance: 'auto' }}
              >
                {Object.keys(INDUSTRY_MAPPINGS).map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
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
                <span style={{ fontSize: '20px' }}>⚠️</span>
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
                  onClick={handleScan}
                  style={{ minWidth: '220px' }}
                >
                  Scan My Resume
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

      {/* 3. Key Benefits (Why ResuGrow?) */}
      <section className={styles.subpage}>
        <div className={styles.subpageContainer}>
          <div className="section-header">
            <h2 className="section-title">Why <span className="gradient-text">ResuGrow?</span></h2>
            <p className="section-subtitle">Comprehensive analysis to ensure your resume gets past ATS filters.</p>
          </div>
          <div className={styles.featureGrid}>
            {[
              { icon: '🔍', title: 'Keyword Optimization', desc: 'Don\'t guess which skills matter. We highlight the exact industry terms missing from your bullet points.' },
              { icon: '📝', title: 'Format Verification', desc: 'We detect "unreadable" elements like tables, graphics, or headers that crash older ATS systems.' },
              { icon: '⚡', title: 'One-Click Tailoring', desc: 'Use our AI to instantly rewrite sections of your resume to increase your score for a specific job.' },
            ].map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureCardIcon}>{f.icon}</div>
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
        subtitle="Join thousands of professionals who used ResuGrow to beat the bots and land their dream interviews."
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
                  ResuGrow uses a proprietary algorithm that mimics the logic of major systems like
                  Workday, Taleo, and Greenhouse to give you a competitive edge. We don&apos;t just check
                  for keywords; we ensure your entire professional story is machine-readable and human-ready.
                </p>
              </div>
            </div>
            <div className={styles.aboutImage}>
              {/* Illustration or Graphic could go here */}
              <div style={{ fontSize: '100px' }}>🤖</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
