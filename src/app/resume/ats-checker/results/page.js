'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Testimonials from '@/components/Testimonials/Testimonials';
import ATSScoreDisplay from '@/components/ATS/ATSScoreDisplay';
import styles from './results.module.css';

// Status icon helper
function StatusIcon({ status }) {
  if (status === 'pass') return <span style={{ color: 'var(--success)' }}>✓</span>;
  if (status === 'error') return <span style={{ color: '#dc2626' }}>●</span>;
  if (status === 'warning') return <span style={{ color: '#d97706' }}>⚠</span>;
  return <span style={{ color: 'var(--text-muted)' }}>ℹ</span>;
}

export default function ATSResultsPage() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('atsResults');
    const preview = sessionStorage.getItem('resumePreview');
    if (stored) setResults(JSON.parse(stored));
    if (preview) setPreviewUrl(preview);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className={styles.resultsPage} style={{ textAlign: 'center', paddingTop: '120px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
        <h2 style={{ fontSize: '24px', fontWeight: '700' }}>Analyzing your resume...</h2>
        <p style={{ color: 'var(--text-secondary)' }}>This usually takes a few seconds.</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className={styles.resultsPage} style={{ textAlign: 'center', paddingTop: '120px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
        <h2 style={{ fontSize: '24px', fontWeight: '700' }}>No Scan Data Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Please upload your resume on the ATS Checker page first.
        </p>
        <Link href="/resume/ats-checker" className="btn btn-primary">Go to ATS Checker</Link>
      </div>
    );
  }

  const { score, categories, missingKeywords, verbAnalysis, fileInfo, extractedData, repetitionData } = results;

  const ScoringLogicDocs = () => (
    <div style={{ marginTop: '40px', padding: '32px', background: '#f8fafc', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-light)' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px', color: 'var(--text-primary)' }}>🛠️ How We Score Your Resume</h3>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Our scoring engine mimes the logic of enterprise ATS systems (Workday, Taleo, Greenhouse) using a combination of NLP and Rule-Based Parsing.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '24px' }}>
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>Impact & Verb Analysis</h4>
          <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', listStyle: 'none', padding: 0 }}>
            <li>• <b>NLP Engine:</b> Uses `compromise` library for part-of-speech tagging.</li>
            <li>• <b>Tense Alignment:</b> Detects mismatches (e.g., present tense for past roles).</li>
            <li>• <b>Action Verbs:</b> Checks against 40+ high-impact verbs.</li>
            <li>• <b>Fluff Check:</b> Identifies 30+ generic clichés (e.g., "team player").</li>
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>Technical & Formatting</h4>
          <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', listStyle: 'none', padding: 0 }}>
            <li>• <b>Gap Detection:</b> Highlights chronological employment gaps &gt; 3 months.</li>
            <li>• <b>Layout Artifacts:</b> Detects "scrambled" text from complex table/column layouts.</li>
            <li>• <b>URL Polish:</b> Flags uncustomized LinkedIn handles for a professional edge.</li>
            <li>• <b>Section Recognition:</b> Identifies 25+ standard resume header variations.</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderFindings = (sectionData) => {
    if (!sectionData?.findings) return null;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sectionData.findings.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
            <StatusIcon status={f.status} />
            <span>{f.message}</span>
          </div>
        ))}
      </div>
    );
  };

  const SubScore = ({ score, max }) => (
    <span style={{
      fontSize: '13px',
      fontWeight: '700',
      padding: '2px 10px',
      borderRadius: '999px',
      background: score >= max * 0.7 ? '#dcfce7' : score >= max * 0.4 ? '#fef9c3' : '#fee2e2',
      color: score >= max * 0.7 ? '#16a34a' : score >= max * 0.4 ? '#ca8a04' : '#dc2626',
    }}>
      {score}/{max}
    </span>
  );

  const moduleIcons = {
    textExtraction: '📄',
    contactInfo: '📇',
    length: '📏',
    actionVerbs: '💪',
    impactMetrics: '📊',
    readability: '📖',
    repetition: '🔁',
    sections: '📑',
    hardSkills: '🛠️',
    softSkills: '🤝',
    kwMatch: '🔍',
    formatting: '📝',
    spellCheck: '✍️',
    fileMetadata: '📁',
    tenseAlignment: '⏳',
    cliches: '🫧',
    layoutArtifacts: '🧩',
    employmentGaps: '📅',
    linkedinPolish: '✨'
  };

  const categoryIcons = {
    foundation: '🏗️',
    impact: '🚀',
    relevance: '🎯',
    technical: '🛡️'
  };

  return (
    <div className={styles.resultsPage}>
      <div className={styles.resultsContainer}>
        {/* Left Side: Analysis Panel */}
        <div className={styles.analysisPanel}>
          {/* Summary Hero */}
          <section className={styles.scoreHeader}>
            <ATSScoreDisplay score={score} />
            <div style={{ marginTop: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Scan Summary</h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '8px auto 0' }}>
                We&apos;ve analyzed your resume against modern ATS benchmarks. 
                Below is a category-by-category breakdown of your performance.
              </p>
            </div>
          </section>

          {categories && Object.entries(categories).map(([catId, cat]) => (
            <section key={catId} className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{categoryIcons[catId]}</span>
                  <h2 style={{ fontSize: '20px', fontWeight: '800' }}>{cat.title}</h2>
                </div>
                <SubScore score={cat.score} max={cat.max} />
              </div>
              
              <p className={styles.categorySummary}>{cat.summary}</p>

              <div className={styles.issuesGrid}>
                {Object.entries(cat.modules).map(([modId, mod]) => (
                  <div key={modId} className={styles.issueCard}>
                    <div className={styles.issueHeader} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '20px' }}>{moduleIcons[modId] || 'ℹ️'}</span>
                        <h3 style={{ fontSize: '16px', fontWeight: '700' }}>
                          {modId.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                        </h3>
                      </div>
                      <SubScore score={mod.score} max={mod.max} />
                    </div>
                    
                    {renderFindings(mod)}

                    {/* Module-specific logic */}
                    {modId === 'contactInfo' && extractedData?.contact && (
                      <div className={styles.checkList} style={{ marginTop: '16px' }}>
                        {Object.entries(extractedData.contact).map(([label, value]) => (
                          <div key={label} className={styles.checkItem} style={{ display: 'flex', gap: '8px', fontSize: '13px', marginBottom: '4px' }}>
                            <span style={{ color: value === 'Not found' ? '#ef4444' : '#22c55e' }}>{value === 'Not found' ? '✗' : '✓'}</span>
                            <span style={{ textTransform: 'capitalize', width: '70px', fontWeight: '600' }}>{label}:</span>
                            <span style={{ color: value === 'Not found' ? '#94a3b8' : 'inherit' }}>{value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {modId === 'repetition' && repetitionData?.length > 0 && (
                      <div style={{ marginTop: '16px', background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                        {repetitionData.map((item, idx) => (
                          <div key={idx} style={{ marginBottom: '8px' }}>
                            <div style={{ fontSize: '13px', fontWeight: '600' }}>&quot;{item.word}&quot; used {item.count}x</div>
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}>
                              {item.suggestions.slice(0, 3).map(syn => (
                                <span key={syn} style={{ fontSize: '11px', padding: '2px 6px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>{syn}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          <ScoringLogicDocs />

          <div className={styles.aiFixCTA} style={{ marginTop: '48px' }}>
            <h3 className={styles.aiFixTitle}>Ready to enter the Shortlist?</h3>
            <p className={styles.aiFixDesc}>
              Our AI Resume Builder can automatically fix the gaps identified above while maintaining the perfect ATS format.
            </p>
            <Link href="/resume/builder" className={styles.aiFixBtn}>Optimize My Resume with AI</Link>
          </div>
        </div>

        {/* Right Side: Resume Preview */}
        <aside className={styles.previewPanel}>
          <div style={{ padding: '12px 16px', background: '#f1f5f9', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', fontWeight: '700' }}>📄 LIVE PREVIEW</span>
            {fileInfo && <span style={{ fontSize: '11px', color: '#64748b' }}>{fileInfo.type} • {fileInfo.size}</span>}
          </div>
          {previewUrl ? (
            <iframe 
              src={`${previewUrl}#toolbar=0&navpanes=0`} 
              className={styles.pdfViewer} 
              title="Resume Preview"
            />
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
              No preview available. Try re-uploading your PDF.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
