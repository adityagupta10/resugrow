'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import EmojiImage from '@/components/UI/EmojiImage';
import styles from '../subpage.module.css';


const analysisCategories = [
  { icon: '📝', title: 'Headline Analysis', desc: 'We check if your headline is keyword-rich and clearly states your value proposition to recruiters.' },
  { icon: '👤', title: 'About Section', desc: 'Our AI analyzes your summary for storytelling, keywords, and a clear call to action.' },
  { icon: '💼', title: 'Experience Depth', desc: 'Verifying if your experience highlights achievements rather than just listing responsibilities.' },
  { icon: '🎯', title: 'Keyword Optimization', desc: 'Identifying missing industry keywords that LinkedIn algorithms look for in search results.' },
  { icon: '📊', title: 'Engagement Score', desc: 'Evaluating how likely your profile is to convert profile views into meaningful connections.' },
  { icon: '💡', title: 'Visual Impression', desc: 'Providing tips for your profile picture and banner to ensure a professional first look.' },
];

const steps = [
  { num: '1', title: 'Export Profile PDF', desc: 'Go to your LinkedIn profile, click "More" and select "Save to PDF" to get your official export.' },
  { num: '2', title: 'Upload & Analyze', desc: 'Upload the PDF here. Our AI scans 50+ data points including keywords, impact, and structure.' },
  { num: '3', title: 'Get Your V1.0 Score', desc: 'Securely view your professional score (0-100) with a list of actionable expert suggestions.' },
];

export default function ProfileReview() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Extracting About...');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    let interval;
    if (loading) {
      const texts = [
        'Extracting About...', 
        'Analyzing Experience...', 
        'Detecting Skills...', 
        'Calculating Score...',
        'Finalizing Report...'
      ];
      let i = 0;
      interval = setInterval(() => {
        i = (i + 1) % texts.length;
        setLoadingText(texts[i]);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
      setError('');
    } else {
      setError('Please upload a valid PDF file.');
      setFile(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setError('');
    } else {
      setError('Please drop a valid PDF file.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleScan = async () => {
    if (!file) {
      setError('Please upload your LinkedIn PDF first.');
      return;
    }

    setLoading(true);
    setError('');
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) return prev;
        return prev + 2;
      });
    }, 100);

    try {
      const formData = new FormData();
      formData.append('resume', file); // API expects 'resume' field name matching ATS scanner

      const res = await fetch('/api/linkedin-scan', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (data.error || res.status !== 200) {
        clearInterval(progressInterval);
        setError(data.message || data.error || 'Failed to analyze profile.');
        setLoading(false);
        setProgress(0);
        return;
      }

      clearInterval(progressInterval);
      setProgress(100);
      localStorage.setItem('linkedinResults', JSON.stringify(data));
      
      setTimeout(() => {
        router.push('/linkedin-review/results');
      }, 400);

    } catch (err) {
      clearInterval(progressInterval);
      setError('Something went wrong. Please try again.');
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.subpageContainer}>
          <div className={styles.subpageHeroBadge}>LinkedIn Security Priority</div>
          <h1 className={styles.subpageTitle}>
            Get your <span className="gradient-text">LinkedIn Score</span> in 30 seconds
          </h1>
          <p className={styles.subpageDesc}>
            We use your official LinkedIn PDF export to guarantee 100% accuracy and keep your account totally safe from scraping bans.
          </p>
          
          <div className={styles.contactForm} style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'left', background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}>
            
            {/* INSTRUCTIONS */}
            <div style={{ marginBottom: '24px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><EmojiImage emoji="📋" size={18} alt="" /> How to get your PDF</span>
              </h3>
              <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
                <li>Open your <strong>LinkedIn profile</strong></li>
                <li>Click the <span style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>More</span> button near your profile picture</li>
                <li>Select <span style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>Save to PDF</span></li>
              </ol>
            </div>

            <div className={styles.formGroup}>
              {!loading ? (
                <>
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
                      cursor: 'pointer',
                      marginBottom: '16px'
                    }}
                    onClick={() => document.getElementById('pdf-upload').click()}
                  >
                    <input 
                      type="file" 
                      id="pdf-upload" 
                      accept="application/pdf"
                      onChange={handleFileChange} 
                      style={{ display: 'none' }} 
                    />
                    <div style={{ fontSize: '32px', marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                      <EmojiImage emoji={file ? '📄' : '📥'} size={40} alt={file ? 'PDF document ready for LinkedIn profile scan' : 'Upload inbox icon for LinkedIn PDF file'} />
                    </div>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#0f172a' }}>
                      {file ? file.name : 'Click to Upload or Drag & Drop'}
                    </h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                      {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'PDF files only (Max 5MB)'}
                    </p>
                  </div>
                  
                  <button onClick={handleScan} className="btn btn-primary" style={{ width: '100%', opacity: file ? 1 : 0.6 }} disabled={!file}>
                    {file ? 'Analyze My Profile' : 'Upload PDF to Begin'}
                  </button>

                  <p style={{ margin: '10px 0 0', fontSize: '12px', color: '#64748b', fontWeight: '600', textAlign: 'center' }}>
                    Exact path: LinkedIn Profile → More → Save to PDF
                  </p>
                  
                  <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
                      PDF not working? <Link href="/linkedin-review/paste" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'underline' }}>Use Direct Paste instead</Link>
                    </p>
                  </div>

                  <div style={{ marginTop: '14px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #cbd5e1', background: '#ffffff' }}>
                    <Image
                      src="/linkedin-save-pdf-guide.png"
                      alt="Step-by-step LinkedIn profile PDF download guide using More menu and Save to PDF option"
                      width={1194}
                      height={896}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                </>
              ) : (
                <ProgressView progress={progress} loadingText={loadingText} />
              )}

              {error && <ErrorBox error={error} />}
            </div>
            
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '16px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><EmojiImage emoji="🔒" size={18} alt="" /> LinkedIn&rsquo;s &quot;Save to PDF&quot; is working in 2026. 100% private.</span>
            </p>
          </div>
        </div>
      </section>

      <section className={styles.subpage}>
        <div className={styles.subpageContainer}>
          <div className="section-header">
            <h2 className="section-title">What We <span className="gradient-text">Analyze</span></h2>
            <p className="section-subtitle">Our v1.0 engine checks 50+ data points for recruiter-readiness.</p>
          </div>
          <div className={styles.featureGrid}>
            {analysisCategories.map((f) => (
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
    </>
  );
}

function ProgressView({ progress, loadingText }) {
  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
        <span>{loadingText || 'Analyzing Profile Data...'}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'var(--primary)', transition: 'width 0.3s ease' }} />
      </div>
    </div>
  );
}

function ErrorBox({ error }) {
  return (
    <div style={{ 
      marginTop: '16px', 
      padding: '12px 16px', 
      backgroundColor: '#fef2f2', 
      borderLeft: '4px solid #ef4444', 
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px'
    }}>
      <EmojiImage emoji="⚠️" size={20} alt="Warning icon for LinkedIn scan error" />
      <div>
        <h4 style={{ color: '#991b1b', fontSize: '13px', fontWeight: '700', margin: '0 0 2px 0' }}>Scan Halted</h4>
        <p style={{ color: '#b91c1c', fontSize: '13px', margin: 0, lineHeight: '1.4' }}>
          {error}
        </p>
      </div>
    </div>
  );
}
