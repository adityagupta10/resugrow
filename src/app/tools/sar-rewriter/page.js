'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

const SARContent = () => {
  const searchParams = useSearchParams();
  const initialKeyword = searchParams.get('keyword') || '';
  
  const [bullet, setBullet] = useState('');
  const [keyword, setKeyword] = useState(initialKeyword);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRewrite = async () => {
    if (!bullet.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/sar-rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bullet, keyword })
      });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>AI SAR <span className={styles.gradient}>Bullet Rewriter</span></h1>
          <p className={styles.subtitle}>Transform weak, passive descriptions into high-impact "Situation-Action-Result" metrics that recruiters love.</p>
        </div>

        <div className={styles.toolGrid}>
          {/* Input Section */}
          <div className={styles.card}>
            <div className={styles.inputGroup}>
              <label>Your Current Bullet Point</label>
              <textarea 
                placeholder="Ex: I helped my team with sales and database work."
                value={bullet}
                onChange={(e) => setBullet(e.target.value)}
                className={styles.textarea}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Target Keyword (Optional)</label>
              <input 
                type="text" 
                placeholder="Ex: Python, Leadership, SEO"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className={styles.input}
              />
            </div>

            <button 
              onClick={handleRewrite} 
              disabled={loading}
              className={styles.primaryBtn}
            >
              {loading ? 'Analyzing Impact...' : '✨ Magic Rewrite'}
            </button>
          </div>

          {/* Results Section */}
          <div className={styles.card}>
            {!results ? (
              <div className={styles.placeholder}>
                <div className={styles.icon}>💡</div>
                <p>Enter a bullet point to see the transformation.</p>
              </div>
            ) : (
              <div className={styles.results}>
                <h3 className={styles.resultsTitle}>Improved SAR Versions</h3>
                <div className={styles.suggestions}>
                  {results.suggestions.map((s, idx) => (
                    <div key={idx} className={styles.suggestionCard}>
                      <div className={styles.typeBadge}>{s.type}</div>
                      <p className={styles.suggestionText}>{s.text}</p>
                      <button 
                        onClick={() => navigator.clipboard.writeText(s.text)}
                        className={styles.copyBtn}
                      >
                        Copy to Clipboard
                      </button>
                    </div>
                  ))}
                </div>

                <div className={styles.tipsSection}>
                  <h4>Pro Tips:</h4>
                  <ul>
                    {results.tips.map((t, idx) => <li key={idx}>{t}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default function SARRewriterPage() {
  return (
    <Suspense fallback={<div>Loading tool...</div>}>
      <SARContent />
    </Suspense>
  );
}
