// src/app/linkedin-review/results/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, AlertTriangle, Rocket } from 'lucide-react';
import styles from './results.module.css';

// Reusing the Elite slab logic but tailored for LinkedIn
const LINKEDIN_SLABS = [
  { min: 81, max: 100, title: 'Final Polish Opportunity', color: '#16a34a', desc: 'Your profile is strong. Expert refinement can push premium outcomes.' },
  { min: 61, max: 80, title: 'High Potential, Under-Leveraged', color: '#3b82f6', desc: 'Visible profile, but not positioned to convert at highest value.' },
  { min: 41, max: 60, title: 'Optimization Required', color: '#f59e0b', desc: 'Core assets exist, but strategic rewriting is needed for recruiter traction.' },
  { min: 21, max: 40, title: 'Low Recruiter Visibility', color: '#fb923c', desc: 'Current profile structure is limiting discoverability and trust.' },
  { min: 0, max: 20, title: 'Critical Profile Fix Needed', color: '#ef4444', desc: 'Profile is likely being skipped. Full optimization is recommended.' }
];

const SECTION_EXPLANATIONS = {
  'Identity & Branding': 'How clearly your profile communicates who you are and what you do.',
  'The Hook (About)': 'How strong your summary narrative is for recruiter and search visibility.',
  'Professional Proof': 'How well your experience proves outcomes with quantifiable evidence.',
  'Skills & Credibility': 'How complete and trustworthy your core skills and foundation signals are.'
};

const SUB_SECTION_EXPLANATIONS = {
  'Profile URL': 'Checks whether your public URL looks professional and custom.',
  'Headline Depth': 'Measures whether your headline has enough specificity and context.',
  'Brand Formatting': 'Checks for structured formatting that improves scannability.',
  'Narrative Length': 'Measures if your About section has enough depth to build authority.',
  'Keyword Density': 'Checks whether important recruiter keywords are naturally present.',
  'Role Count': 'Evaluates the visible breadth of your experience history.',
  'Impact Metrics': 'Checks for numbers, percentages, and measurable outcomes.',
  'Portfolio Bonus': 'Rewards added proof from projects and volunteer contributions.',
  'Skill Volume': 'Measures breadth of skills available for search and matching.',
  'Education & Certs': 'Checks for foundational trust signals from learning credentials.'
};

export default function LinkedInResults() {
  const [results, setResults] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('linkedinResults');
    if (!stored) {
      router.push('/linkedin-review');
      return;
    }

    const hydrateTimer = setTimeout(() => {
      setResults(JSON.parse(stored));
    }, 0);

    return () => clearTimeout(hydrateTimer);
  }, [router]);

  if (!results) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className={styles.pulseRing}></div>
    </div>
  );

  const { overallScore, breakdown, issues, completeness, extractedData = {} } = results;
  const parsingConfidence = Number.isFinite(extractedData.confidence) ? extractedData.confidence : null;

  const currentSlab = LINKEDIN_SLABS.find(s => overallScore >= s.min && overallScore <= s.max) || LINKEDIN_SLABS[LINKEDIN_SLABS.length - 1];
  const nextSlab = LINKEDIN_SLABS
    .filter((s) => s.min > overallScore)
    .sort((a, b) => a.min - b.min)[0] || currentSlab;
  const gapToNext = nextSlab !== currentSlab
    ? `You are ${nextSlab.min - overallScore} points away from ${nextSlab.title}.`
    : 'You are in the highest band. Expert optimization can still improve conversion quality.';
  const completenessHint = completeness >= 80 && overallScore < 60
    ? 'Most sections are present, but weak positioning and proof are pulling your total score down.'
    : completeness < 50
      ? 'Critical sections are missing, which is heavily limiting your score potential.'
      : 'Coverage is decent. Stronger proof, sharper keywords, and clearer positioning will raise this further.';

  const categoryItems = [
    { key: 'identity', title: 'Identity & Branding', data: breakdown.identity },
    { key: 'content', title: 'The Hook (About)', data: breakdown.content },
    { key: 'experience', title: 'Professional Proof', data: breakdown.experience },
    { key: 'credibility', title: 'Skills & Credibility', data: breakdown.credibility }
  ];

  return (
    <div className={styles.resultsPage}>
      {/* Header */}
      <header className={styles.resultsHeader}>
        <div className={styles.headerContainer}>
          <Link href="/linkedin-review" className={styles.backButton}>← New Scan</Link>
          <div className={styles.headerActions}>
            <Link href="/payment?service=linkedin-makeover&source=results-top-cta" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '14px' }}>
              Want us to fix this for you?
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        {/* Profile Context Banner */}
        {extractedData && (
          <div className={styles.profileBanner}>
            <div className={styles.profileBannerIcon}>
              <Image
                src="/LinkedIn_icon.svg"
                alt="LinkedIn profile review icon for AI-powered profile scoring and optimization results"
                width={34}
                height={34}
                priority
              />
            </div>
            <div className={styles.profileBannerMain}>
              <h4 className={styles.profileBannerLabel}>Analyzed Profile</h4>
              <p className={styles.profileBannerHeadline}>
                {extractedData.fullName || extractedData.headline || 'Unknown Profile'}
                {extractedData.language === 'Non-English' && <span className={styles.nonEnglishBadge}>Non-English</span>}
              </p>
              <p className={styles.profileBannerRole}>
                {extractedData.currentPosition || 'Current position not detected'}
              </p>
              {extractedData.linkedinUrl && extractedData.linkedinUrl !== 'Not found' && (
                <a
                  href={extractedData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.profileBannerUrl}
                >
                  {extractedData.linkedinUrl}
                </a>
              )}
            </div>
            <div className={styles.profileBannerMeta}>
              <h4 className={styles.profileBannerMetaLabel}>Parsing Confidence</h4>
              <p
                className={styles.profileBannerMetaValue}
                style={{ color: parsingConfidence !== null && parsingConfidence > 80 ? '#16a34a' : '#f59e0b' }}
              >
                {parsingConfidence !== null ? `${parsingConfidence}%` : 'N/A'}
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
              
              <div className={styles.scoreInsightsStack}>
                <div className={styles.completenessCard}>
                  <div className={styles.completenessHeader}>
                    <span className={styles.completenessTitle}>Profile Completeness</span>
                    <span className={styles.completenessValue}>{completeness}%</span>
                  </div>
                  <div className={styles.completenessTrack}>
                    <div className={styles.completenessBar} style={{ width: `${completeness}%` }} />
                  </div>
                  <p className={styles.completenessHint}>
                    {completenessHint}
                  </p>
                </div>

                <div className={styles.basicDetailsCard}>
                  <h4 className={styles.basicDetailsTitle}>Profile Basics</h4>
                  <div className={styles.basicDetailsList}>
                    <div className={styles.basicDetailsRow}>
                      <span className={styles.basicDetailsKey}>Full Name</span>
                      <span className={styles.basicDetailsValue}>{extractedData.fullName || 'Not found'}</span>
                    </div>
                    <div className={styles.basicDetailsRow}>
                      <span className={styles.basicDetailsKey}>Email ID</span>
                      <span className={styles.basicDetailsValue}>{extractedData.email || 'Not found'}</span>
                    </div>
                    <div className={styles.basicDetailsRow}>
                      <span className={styles.basicDetailsKey}>Current Position</span>
                      <span className={styles.basicDetailsValue}>{extractedData.currentPosition || 'Not found'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.scoreCircleWrapper}>
              <div className={styles.radialProgress} style={{ '--progress': `${overallScore}%`, '--track-color': currentSlab.color }}>
                <span className={styles.scoreText}>{overallScore}<span className={styles.scoreMax}>/100</span></span>
              </div>
              <p className={styles.scoreGapText}>
                {gapToNext}
              </p>
            </div>
          </div>
        </section>

        <section className={styles.promoSection}>
          <div className={styles.promoBox}>
            <div className={styles.promoContent}>
              <h4>Precision Makeover?</h4>
              <p>Use our Futuristic AI + expert strategy stack to rebuild your profile into a high-conversion recruiter magnet.</p>
              <Link href="/payment?service=linkedin-makeover&source=results-promo-cta" className="btn btn-primary" style={{ width: '100%', marginTop: '16px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Sparkles size={20} aria-label="Sparkles icon for AI optimization" /> Optimize LinkedIn Profile
              </Link>
            </div>
          </div>
        </section>

        {issues.length > 0 && (
          <section className={styles.flagsSection}>
            <div className={styles.issuesBox}>
              <h3 className={styles.actionTitle} style={{ color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertTriangle size={24} aria-label="Warning icon for critical LinkedIn profile flags" /> Critical Flags
              </h3>
              <ul className={styles.actionList}>
                {issues.map((i, idx) => (
                  <li key={idx} className={styles.issueItem}>{i}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className={styles.breakdownSection}>
          <h2 className={styles.columnTitle}>Core Pillar Breakdown</h2>
          {categoryItems.map((item, idx) => (
            <CategoryScore
              key={item.key}
              title={item.title}
              score={item.data.score}
              max={item.data.max}
              subSections={item.data.subSections}
              locked={idx === categoryItems.length - 1}
              partialLocked={item.key === 'experience'}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

function CategoryScore({ title, score, max, subSections, locked = false, partialLocked = false }) {
  const percentage = (score / max) * 100;
  
  let color = '#22c55e'; // green
  if (percentage < 50) color = '#ef4444'; // red
  else if (percentage < 80) color = '#f59e0b'; // orange

  return (
    <div className={`${styles.moduleCard} ${locked ? styles.lockedCard : ''} ${partialLocked && !locked ? styles.partialLockedCard : ''}`}>
      <div className={locked ? styles.lockedContent : undefined}>
        <div className={styles.moduleHeader}>
          <div>
            <h4 className={styles.moduleTitle}>{title}</h4>
            <p className={styles.moduleOneLiner}>
              {SECTION_EXPLANATIONS[title] || 'This section reflects one core pillar of your LinkedIn quality.'}
            </p>
          </div>
          <div className={styles.moduleScoreBadge} style={{ backgroundColor: `${color}15`, color: color }}>
            {Math.round(percentage)}%
          </div>
        </div>

        <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', position: 'relative', overflow: 'hidden', marginBottom: '24px' }}>
          <div style={{ height: '100%', width: `${percentage}%`, background: `linear-gradient(90deg, ${color}88, ${color})`, borderRadius: '4px', transition: 'width 1.5s cubic-bezier(0.1, 0.5, 0.2, 1)' }}></div>
        </div>

        {subSections && subSections.length > 0 && (
          <div className={styles.subSectionList}>
            {subSections.map((sub, idx) => (
              <div key={idx} className={styles.subItem}>
                <div className={styles.subSectionRow}>
                  <span className={styles.subLabel}>{sub.label}</span>
                  <span className={styles.subValue}>{Math.round((sub.max > 0 ? sub.score / sub.max : 0) * 10)}/10</span>
                </div>
                <p className={styles.subHint}>
                  {SUB_SECTION_EXPLANATIONS[sub.label] || 'Detailed check for one specific profile signal.'}
                </p>
                <div className={styles.subProgressTrack}>
                  <div
                    className={styles.subProgressBar}
                    style={{
                      width: `${(sub.score / sub.max) * 100}%`,
                      backgroundColor: (sub.score / sub.max) >= 0.8 ? '#22c55e' : (sub.score / sub.max) >= 0.5 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {partialLocked && !locked && (
        <div className={styles.partialBlurOverlay}>
          <span className={styles.partialBlurHint}>Advanced proof insights continue in the full AI makeover.</span>
        </div>
      )}

      {locked && (
        <div className={styles.lockOverlay}>
          <h5 className={styles.lockOverlayTitle}>Unlock Full Skills Breakdown</h5>
          <p className={styles.lockOverlayText}>Get complete credibility insights with the LinkedIn optimization plan.</p>
          <Link href="/payment?service=linkedin-makeover&source=results-lock-cta" className="btn btn-primary" style={{ borderRadius: '10px', padding: '10px 20px', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Rocket size={18} aria-hidden="true" />
            Unlock My LinkedIn Advantage
          </Link>
        </div>
      )}
    </div>
  );
}
