'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import EmojiImage from '@/components/UI/EmojiImage';
import { SITE_URL, getSoftwareAppJsonLd } from '@/lib/seo';
import styles from './page.module.css';

const SAMPLE_BULLETS = [
  'Helped marketing team run campaigns for multiple products.',
  'Worked on backend APIs and fixed production issues.',
  'Managed stakeholders and supported launch activities.'
];

const toneOptions = [
  { value: 'balanced', label: 'Balanced' },
  { value: 'executive', label: 'Executive' },
  { value: 'technical', label: 'Technical' }
];

const focusOptions = [
  { value: 'growth', label: 'Growth' },
  { value: 'efficiency', label: 'Efficiency' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'quality', label: 'Quality' }
];

function MetricTag({ label, value, tone = 'neutral' }) {
  return (
    <div className={`${styles.metricTag} ${tone === 'good' ? styles.metricTagGood : ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const SARContent = () => {
  const searchParams = useSearchParams();
  const initialKeyword = searchParams.get('keyword') || '';

  const [bullet, setBullet] = useState('');
  const [keyword, setKeyword] = useState(initialKeyword);
  const [tone, setTone] = useState('balanced');
  const [focus, setFocus] = useState('growth');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(-1);

  const inputMeta = useMemo(() => {
    const words = bullet.trim().split(/\s+/).filter(Boolean);
    const metricSignals = (bullet.match(/(\d+%|\$[\d,.]+|\d+\+|\b\d+[kKmMbB]\b)/g) || []).length;
    return {
      wordCount: words.length,
      metricSignals
    };
  }, [bullet]);

  const handleRewrite = async () => {
    if (!bullet.trim()) {
      setError('Add a bullet point before running optimization.');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);
    try {
      const res = await fetch('/api/sar-rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bullet, keyword, tone, focus })
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || 'Unable to rewrite this bullet right now.');
        return;
      }
      setResults(data);
    } catch (requestError) {
      console.error('SAR rewrite failed:', requestError);
      setError('Something went wrong while generating rewrites.');
    } finally {
      setLoading(false);
    }
  };

  const copyText = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(-1), 1200);
    } catch (copyError) {
      console.error('Copy failed:', copyError);
    }
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getSoftwareAppJsonLd({
              name: 'ResuGrow SAR Bullet Rewriter',
              description:
                'Rewrite resume bullets into Situation-Action-Result format with measurable outcomes and recruiter-ready language.',
              url: `${SITE_URL}/tools/sar-rewriter`,
              price: '0.00',
            })
          ),
        }}
      />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.kicker}>AI Rewrite Studio</p>
          <h1 className={styles.title}>Advanced SAR Bullet Rewriter</h1>
          <p className={styles.subtitle}>
            Upgrade weak resume bullets into measurable recruiter-grade outcomes with deterministic SAR logic.
          </p>
        </section>

        <section className={styles.grid}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>Input Lab</h2>
              <p>Paste one bullet and choose your rewrite strategy.</p>
            </div>

            <div className={styles.inputBlock}>
              <label>Current Bullet</label>
              <textarea
                className={styles.textarea}
                placeholder="Example: Helped team improve onboarding process."
                value={bullet}
                onChange={(e) => setBullet(e.target.value)}
              />
            </div>

            <div className={styles.metaRow}>
              <MetricTag label="Words" value={inputMeta.wordCount} tone={inputMeta.wordCount >= 10 ? 'good' : 'neutral'} />
              <MetricTag label="Metrics Found" value={inputMeta.metricSignals} tone={inputMeta.metricSignals > 0 ? 'good' : 'neutral'} />
            </div>

            <div className={styles.controlsGrid}>
              <div>
                <label>Target Keyword</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Python, FinTech, Product Strategy..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <div>
                <label>Tone</label>
                <select className={styles.select} value={tone} onChange={(e) => setTone(e.target.value)}>
                  {toneOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Impact Focus</label>
                <select className={styles.select} value={focus} onChange={(e) => setFocus(e.target.value)}>
                  {focusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className={styles.primaryBtn} onClick={handleRewrite} disabled={loading}>
              {loading ? (
                'Optimizing Bullet...'
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <EmojiImage emoji="✨" size={20} /> Generate Advanced Rewrites
                </div>
              )}
            </button>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.samples}>
              <p>Quick Start Samples</p>
              <div className={styles.sampleList}>
                {SAMPLE_BULLETS.map((sample) => (
                  <button key={sample} type="button" onClick={() => setBullet(sample)} className={styles.sampleChip}>
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>Rewrite Output</h2>
              <p>Before/after scoring, SAR decomposition, and copy-ready bullets.</p>
            </div>

            {!results ? (
              <div className={styles.placeholder}>
                <h3>No rewrites yet</h3>
                <p>Run optimization to see score delta, fixes applied, and advanced rewrite variants.</p>
              </div>
            ) : (
              <div className={styles.results}>
                <div className={styles.scoreStrip}>
                  <div>
                    <p className={styles.scoreLabel}>Original Score</p>
                    <h3>{results.originalAnalysis.score}/100</h3>
                  </div>
                  <div>
                    <p className={styles.scoreLabel}>Best Rewrite</p>
                    <h3>{results.rewrittenScore}/100</h3>
                  </div>
                  <div>
                    <p className={styles.scoreLabel}>Score Gain</p>
                    <h3 className={results.totalGain >= 0 ? styles.positive : styles.negative}>
                      {results.totalGain >= 0 ? `+${results.totalGain}` : results.totalGain}
                    </h3>
                  </div>
                </div>

                <div className={styles.signalWrap}>
                  <h4>Missing Signals Detected</h4>
                  <div className={styles.signalList}>
                    {(results.originalAnalysis.missingSignals || []).map((signal) => (
                      <span key={signal} className={styles.signalItem}>
                        {signal}
                      </span>
                    ))}
                    {results.originalAnalysis.missingSignals?.length === 0 && (
                      <span className={styles.signalItemGood}>Strong baseline bullet.</span>
                    )}
                  </div>
                </div>

                <div className={styles.rewriteList}>
                  {results.suggestions.map((item, index) => (
                    <article key={item.type} className={styles.rewriteCard}>
                      <div className={styles.rewriteHeader}>
                        <div>
                          <p className={styles.rewriteType}>{item.type}</p>
                          <p className={styles.rewriteScore}>
                            {item.score}/100 ({item.scoreDelta >= 0 ? '+' : ''}
                            {item.scoreDelta})
                          </p>
                        </div>
                        <button onClick={() => copyText(item.text, index)} className={styles.copyBtn}>
                          {copiedIndex === index ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <p className={styles.rewriteText}>{item.text}</p>

                      <div className={styles.sarBlock}>
                        <p><strong>Situation:</strong> {item.sar.situation}</p>
                        <p><strong>Action:</strong> {item.sar.action}</p>
                        <p><strong>Result:</strong> {item.sar.result}</p>
                      </div>

                      <div className={styles.fixList}>
                        {item.appliedFixes.map((fix) => (
                          <span key={fix} className={styles.fixChip}>
                            {fix}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>

                <div className={styles.footnotes}>
                  <div>
                    <h4>Top Fixes Applied</h4>
                    <ul>
                      {results.topFixesApplied.map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>Next Iteration</h4>
                    <ul>
                      {results.nextIteration.map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{
                  marginTop: '16px',
                  padding: '12px 14px',
                  background: '#fffbeb',
                  border: '1px solid #fcd34d',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#92400e',
                  lineHeight: '1.6'
                }}>
                  <strong>⚠ Heads up on metrics:</strong> Numbers like percentages, dollar amounts, and timeframes in the rewrites above are illustrative placeholders generated to show structure. Replace every metric with your real data before using these bullets on your resume. Fabricated numbers on a resume are a red flag to recruiters.
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default function SARRewriterPage() {
  return (
    <Suspense fallback={<div style={{ padding: '24px' }}>Loading tool...</div>}>
      <SARContent />
    </Suspense>
  );
}
