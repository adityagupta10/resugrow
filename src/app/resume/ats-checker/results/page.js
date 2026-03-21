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
    const hydrateTimer = setTimeout(() => {
      if (stored) setResults(JSON.parse(stored));
      if (preview) setPreviewUrl(preview);
      setLoading(false);
    }, 0);

    return () => clearTimeout(hydrateTimer);
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

  const { score, probability, gapAnalysis, categories, missingKeywords, verbAnalysis, fileInfo, extractedData, repetitionData } = results;


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

  const SubScore = ({ score, max, type = 'module' }) => {
    const pct = Math.round((score / max) * 100);
    const normalized = ((score / max) * 10).toFixed(1).replace(/\.0$/, ''); // X.X/10
    const color = pct >= 80 ? '#16a34a' : pct >= 50 ? '#ca8a04' : '#dc2626';

    if (type === 'category') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <span style={{ fontSize: '14px', fontWeight: '800', color: color }}>{pct}%</span>
          <div style={{ width: '100px', height: '6px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: color, transition: 'width 0.3s ease' }} />
          </div>
        </div>
      );
    }

    // Module Type: Only X/10 numbers
    return (
      <span style={{ fontSize: '13px', fontWeight: '800', color: color }}>
        {normalized}/10
      </span>
    );
  };

  const moduleDescriptions = {
    readabilityExtraction: 'Analyzing text parsability and document word count.',
    contactInfo: 'Checking for essential contact details like email and phone.',
    actionVerbs: 'Identifying high-impact verbs that demonstrate initiative.',
    impactMetrics: 'Scanning for quantifiable achievements and data points.',
    readability: 'Assessing how easy it is for a human and machine to read.',
    repetition: 'Detecting overused words to help vary your vocabulary.',
    sections: 'Verifying that standard resume sections are present.',
    hardSkills: 'Checking for technical skills relevant to your target roles.',
    softSkills: 'Identifying interpersonal skills and leadership qualities.',
    kwMatch: 'Analyzing keyword density and relevance to job descriptions.',
    formatting: 'Detecting potential layout issues that break ATS parsers.',
    spellCheck: 'Finding typos and grammatical errors that look unprofessional.',
    fileMetadata: 'Checking file name and properties for professionalism.',
    tenseAlignment: 'Ensuring your experience is written in the correct tense.',
    cliches: 'Flagging generic buzzwords that lack specific meaning.',
    layoutArtifacts: 'Detecting "scrambled" text from complex layouts.',
    employmentGaps: 'Highlighting gaps in your career timeline.',
    linkedinPolish: 'Checking if your LinkedIn profile URL is professional.'
  };

  const moduleIcons = {
    readabilityExtraction: '📏',
    contactInfo: '📇',
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
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Interview Probability:</span>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: '700',
                  background: probability === 'High' ? '#dcfce7' : probability === 'Medium' ? '#fef9c3' : '#fee2e2',
                  color: probability === 'High' ? '#16a34a' : probability === 'Medium' ? '#ca8a04' : '#dc2626'
                }}>
                  {probability || 'Unknown'}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '8px 0 0' }}>
                We&apos;ve analyzed your resume against modern ATS benchmarks.
                Below is a category-by-category breakdown of your performance.
              </p>

              {/* Category Quick Navigation Summary */}
              <div style={{ 
                marginTop: '32px', 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '16px',
                width: '100%'
              }}>
                {categories && Object.entries(categories).map(([catId, cat]) => {
                  const pct = Math.round((cat.score / cat.max) * 100);
                  const color = pct >= 80 ? '#16a34a' : pct >= 50 ? '#ca8a04' : '#dc2626';
                  return (
                    <button 
                      key={catId}
                      onClick={() => document.getElementById(catId)?.scrollIntoView({ behavior: 'smooth' })}
                      style={{
                        textAlign: 'left',
                        padding: '16px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = '#fff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{cat.title}</span>
                        <span style={{ fontSize: '13px', fontWeight: '800', color: color }}>{pct}%</span>
                      </div>
                      <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: color }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {categories && Object.entries(categories).map(([catId, cat]) => (
            <section key={catId} id={catId} className={styles.categorySection} style={{ scrollMarginTop: '100px' }}>
              <div className={styles.categoryHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{categoryIcons[catId]}</span>
                  <h2 style={{ fontSize: '20px', fontWeight: '800' }}>{cat.title}</h2>
                </div>
                <SubScore score={cat.score} max={cat.max} type="category" />
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
                      <SubScore score={mod.score} max={mod.max} type="module" />
                    </div>

                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', fontStyle: 'italic' }}>
                      {moduleDescriptions[modId]}
                    </p>

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

                    {modId === 'kwMatch' && gapAnalysis?.length > 0 && (
                      <div style={{ marginTop: '16px', background: '#ffe4e6', border: '1px solid #fecdd3', padding: '12px', borderRadius: '8px' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#be123c', marginBottom: '8px' }}>🚀 Keyword Gap Analysis</h4>
                        {gapAnalysis.map((gap, idx) => (
                          <div key={idx} style={{ marginBottom: '8px', fontSize: '13px' }}>
                            <span style={{ fontWeight: '700', color: '#9f1239' }}>&quot;{gap.missing}&quot;</span>
                            <p style={{ margin: '4px 0 8px', color: '#881337', fontStyle: 'italic' }}>{gap.suggestion}</p>
                            <Link href={`/tools/sar-rewriter?keyword=${encodeURIComponent(gap.missing)}`}>
                              <button style={{ 
                                background: '#be123c', 
                                color: 'white', 
                                border: 'none', 
                                padding: '4px 12px', 
                                borderRadius: '6px', 
                                fontSize: '11px', 
                                fontWeight: '700',
                                cursor: 'pointer'
                              }}>
                                🤖 Fix with AI
                              </button>
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}

                    {modId === 'linkedinPolish' && (
                      <div style={{ marginTop: '16px' }}>
                        <Link
                          href="/payment?service=linkedin-makeover&source=ats-results-cta"
                          className="btn btn-primary"
                          style={{
                            fontSize: '13px',
                            padding: '10px 24px',
                            marginTop: '8px'
                          }}
                        >
                          ✨ Optimize LinkedIn Profile
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}


          <div className={styles.aiFixCTA} style={{ marginTop: '48px' }}>
            <h3 className={styles.aiFixTitle}>Ready to enter the Shortlist?</h3>
            <p className={styles.aiFixDesc}>
              Our AI Resume Builder can automatically fix the gaps identified above while maintaining the perfect ATS format.
            </p>
            <Link href="/resume/ai-builder" className={styles.aiFixBtn}>Optimize My Resume with AI</Link>
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
