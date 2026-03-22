'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../subpage.module.css';

export default function LinkedInPastePage() {
  const router = useRouter();
  const [profileText, setProfileText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!profileText.trim()) {
      setError('Paste your LinkedIn profile text before starting analysis.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('profileText', profileText.trim());

      const res = await fetch('/api/linkedin-scan', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.error || res.status !== 200) {
        setError(data.message || data.error || 'Unable to analyze this profile text.');
        setLoading(false);
        return;
      }

      localStorage.setItem('linkedinResults', JSON.stringify(data));
      router.push('/linkedin-review/results');
    } catch (scanError) {
      console.error('LinkedIn paste scan failed:', scanError);
      setError('Something went wrong while analyzing your profile. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.subpageContainer}>
          <div className={styles.subpageHeroBadge}>Direct Paste Mode</div>
          <h1 className={styles.subpageTitle}>
            Paste Your <span className="gradient-text">LinkedIn Profile</span>
          </h1>
          <p className={styles.subpageDesc}>
            Copy your LinkedIn profile text and get the same deterministic score breakdown.
            This is useful if PDF export formatting fails.
          </p>
          <div className={styles.subpageBtn}>
            <Link href="/linkedin-review" className="btn btn-secondary">
              Back to PDF Upload
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.subpage}>
        <div className={styles.subpageContainer}>
          <div className={styles.contactForm} style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>LinkedIn Profile Text</label>
              <textarea
                className={styles.formTextarea}
                style={{ minHeight: '320px' }}
                placeholder="Paste About, Experience, Skills, Education, Certifications here..."
                value={profileText}
                onChange={(e) => setProfileText(e.target.value)}
              />
            </div>

            {error && (
              <div
                style={{
                  marginTop: '12px',
                  padding: '12px 14px',
                  background: '#fef2f2',
                  borderLeft: '4px solid #ef4444',
                  borderRadius: '8px',
                  color: '#b91c1c',
                  fontSize: '14px'
                }}
              >
                {error}
              </div>
            )}

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
              <button
                className="btn btn-primary"
                onClick={handleAnalyze}
                disabled={loading}
                style={{ minWidth: '240px' }}
              >
                {loading ? 'Analyzing Profile...' : 'Analyze Pasted Profile'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
