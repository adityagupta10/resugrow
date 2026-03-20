// src/app/linkedin-review/results/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './results.module.css';

// Reusing the Elite slab logic but tailored for LinkedIn
const LINKEDIN_SLABS = [
  { min: 81, max: 100, title: 'Hiring Magnet', color: '#16a34a', desc: 'Flawless Profile. You command attention.' },
  { min: 61, max: 80, title: 'Industry Authority', color: '#3b82f6', desc: 'Highly visible and optimized.' },
  { min: 41, max: 60, title: 'Emerging Brand', color: '#f59e0b', desc: 'Good foundation, needs polish.' },
  { min: 21, max: 40, title: 'Passive Presence', color: '#fb923c', desc: 'Missing critical data points.' },
  { min: 0, max: 20, title: 'Ghost Profile', color: '#ef4444', desc: 'Virtually invisible to recruiters.' }
];

export default function LinkedInResults() {
  const [results, setResults] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem('linkedinResults');
    if (!stored) {
      router.push('/linkedin-review');
      return;
    }
    setResults(JSON.parse(stored));
  }, [router]);

  if (!results) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className={styles.pulseRing}></div>
    </div>
  );

  const { overallScore, breakdown, issues, suggestions, completeness, extractedData } = results;

  const currentSlab = LINKEDIN_SLABS.find(s => overallScore >= s.min && overallScore <= s.max) || LINKEDIN_SLABS[LINKEDIN_SLABS.length - 1];
  const nextSlab = LINKEDIN_SLABS.find(s => s.min > overallScore) || currentSlab;
  const gapToNext = nextSlab !== currentSlab ? `You are ${nextSlab.min - overallScore} points away from ${nextSlab.title}` : 'You have reached the pinnacle.';

  return (
    <div className={styles.resultsPage}>
      {/* Header */}
      <header className={styles.resultsHeader}>
        <div className={styles.headerContainer}>
          <Link href="/linkedin-review" className={styles.backButton}>← New Scan</Link>
          <div className={styles.headerActions}>
            <Link href="/linkedin-makeover" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '14px' }}>
              Want us to fix this for you?
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        {/* Profile Context Banner */}
        {extractedData && (
          <div style={{ 
            background: 'white', 
            borderRadius: '12px', 
            padding: '16px 24px', 
            marginBottom: '24px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #0077b5, #00a0dc)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
              👤
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, fontSize: '14px', color: '#64748b', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Analyzed Profile</h4>
              <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>
                {extractedData.headline}
                {extractedData.language === 'Non-English' && <span style={{ marginLeft: '12px', fontSize: '12px', background: '#fee2e2', color: '#b91c1c', padding: '2px 8px', borderRadius: '4px' }}>Non-English</span>}
              </p>
            </div>
            <div style={{ textAlign: 'center', borderLeft: '1px solid #e2e8f0', padding: '0 20px' }}>
              <h4 style={{ margin: 0, fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Roles Detected</h4>
              <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>
                {extractedData.expCount} Roles
              </p>
            </div>
            <div style={{ textAlign: 'right', borderLeft: '1px solid #e2e8f0', paddingLeft: '20px' }}>
              <h4 style={{ margin: 0, fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Parsing Confidence</h4>
              <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: '700', color: extractedData.confidence > 80 ? '#16a34a' : '#f59e0b' }}>
                {extractedData.confidence}%
              </p>
            </div>
          </div>
        )}

        {/* Top Overview Section */}
        <section className={styles.overviewSection}>
          <div className={styles.scoreCard}>
            <div className={styles.scoreDetails}>
              <h1 className={styles.scoreTitle}>LinkedIn Profile Score</h1>
              <div className={styles.slabInfo}>
                <span className={styles.slabBadge} style={{ backgroundColor: `${currentSlab.color}20`, color: currentSlab.color, border: `1px solid ${currentSlab.color}50` }}>
                  {currentSlab.title}
                </span>
                <p className={styles.slabDesc}>{currentSlab.desc}</p>
              </div>
              
              <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', color: '#1e293b' }}>Completeness</span>
                  <span style={{ fontWeight: '700', color: '#3b82f6' }}>{completeness}%</span>
                </div>
                <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px' }}>
                  <div style={{ height: '100%', width: `${completeness}%`, background: '#3b82f6', borderRadius: '3px' }}></div>
                </div>
                {completeness < 100 && (
                  <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px', marginBottom: 0 }}>
                    Missing sections are severely capping your score potential.
                  </p>
                )}
              </div>
            </div>

            <div className={styles.scoreCircleWrapper}>
              <div className={styles.radialProgress} style={{ '--progress': `${overallScore}%`, '--track-color': currentSlab.color }}>
                <span className={styles.scoreText}>{overallScore}<span className={styles.scoreMax}>/100</span></span>
              </div>
              <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748b', marginTop: '16px', fontWeight: '500' }}>
                {gapToNext}
              </p>
            </div>
          </div>
        </section>

        <div className={styles.detailedAnalysis}>
          {/* Left Column - Category Breakdown */}
          <div className={styles.categoriesColumn}>
            <h2 className={styles.columnTitle}>Core Pillar Breakdown</h2>
            
            <CategoryScore title="Identity & Branding" score={breakdown.identity.score} max={breakdown.identity.max} />
            <CategoryScore title="The Hook (About)" score={breakdown.content.score} max={breakdown.content.max} />
            <CategoryScore title="Professional Proof (Experience)" score={breakdown.experience.score} max={breakdown.experience.max} />
            <CategoryScore title="Skills & Credibility" score={breakdown.credibility.score} max={breakdown.credibility.max} />
            
          </div>

          {/* Right Column - Actionable Fixes */}
          <div className={styles.actionColumn}>
            
            {issues.length > 0 && (
              <div className={styles.issuesBox}>
                <h3 className={styles.actionTitle} style={{ color: '#b91c1c' }}>
                  <span style={{ marginRight: '8px' }}>⚠️</span> Critical Flags Detected
                </h3>
                <ul className={styles.actionList}>
                  {issues.map((i, idx) => (
                    <li key={idx} className={styles.issueItem}>{i}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.suggestionsBox} style={{ marginTop: '24px' }}>
              <h3 className={styles.actionTitle} style={{ color: '#16a34a' }}>
                <span style={{ marginRight: '8px' }}>💡</span> Top Fixes Generator
              </h3>
              {suggestions.length > 0 ? (
                <ul className={styles.actionList}>
                  {suggestions.map((s, idx) => (
                    <li key={idx} className={styles.suggestionItem}>{s}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#64748b', fontSize: '14px' }}>Your profile is perfectly optimized!</p>
              )}
            </div>

            <div className={styles.promoBox}>
              <div className={styles.promoContent}>
                <h4>Tired of guessing?</h4>
                <p>Let our experts rewrite your entire profile to guarantee a 95+ score.</p>
                <Link href="/linkedin-makeover" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                  View Makeover Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function CategoryScore({ title, score, max }) {
  const percentage = (score / max) * 100;
  
  let color = '#22c55e'; // green
  if (percentage < 50) color = '#ef4444'; // red
  else if (percentage < 80) color = '#f59e0b'; // orange

  return (
    <div className={styles.moduleCard} style={{ marginBottom: '16px' }}>
      <div className={styles.moduleHeader}>
        <div>
          <h4 className={styles.moduleTitle}>{title}</h4>
        </div>
        <div className={styles.moduleScoreBadge} style={{ backgroundColor: `${color}15`, color: color, width: 'auto', padding: '4px 12px' }}>
          {score} / {max}
        </div>
      </div>
      <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', marginTop: '12px' }}>
        <div style={{ height: '100%', width: `${percentage}%`, background: color, borderRadius: '3px' }}></div>
      </div>
    </div>
  );
}
