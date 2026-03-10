import Link from 'next/link';
import styles from '../../subpage.module.css';

export const metadata = {
  title: 'ATS Score Checker | ResuGrow',
  description: 'Check your resume\'s ATS compatibility score for free. Get actionable insights to optimize your resume for Applicant Tracking Systems.',
};

const features = [
  { icon: '📊', title: 'Instant ATS Analysis', desc: 'Upload your resume and get an instant compatibility score with detailed breakdown of how well it performs against ATS software.' },
  { icon: '🔍', title: 'Keyword Optimization', desc: 'Discover missing keywords that recruiters and ATS systems are looking for in your target role and industry.' },
  { icon: '📝', title: 'Format Checking', desc: 'Our scanner verifies your resume uses ATS-friendly formatting, fonts, and layout to ensure it gets parsed correctly.' },
  { icon: '💡', title: 'Smart Suggestions', desc: 'Get AI-powered recommendations to improve your content, structure, and keyword density for maximum impact.' },
  { icon: '🎯', title: 'Job Match Score', desc: 'Compare your resume against specific job descriptions to see how well you match and what adjustments to make.' },
  { icon: '📈', title: 'Score Tracking', desc: 'Track your resume score improvements over time. See how each change affects your ATS compatibility.' },
];

export default function ATSChecker() {
  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.subpageContainer}>
          <div className={styles.subpageHeroBadge}>📊 Free Tool</div>
          <h1 className={styles.subpageTitle}>
            ATS <span className="gradient-text">Score Checker</span>
          </h1>
          <p className={styles.subpageDesc}>
            Find out if your resume will pass Applicant Tracking Systems. Get a detailed score
            and actionable suggestions to improve.
          </p>
          <div className={styles.subpageBtn}>
            <Link href="#" className="btn btn-primary">Check Your Score Free →</Link>
            <Link href="/resume/ai-builder" className="btn btn-secondary">Build ATS-Optimized Resume</Link>
          </div>
        </div>
      </section>

      <section className={styles.subpage}>
        <div className={styles.subpageContainer}>
          <div className="section-header">
            <h2 className="section-title">What We <span className="gradient-text">Check</span></h2>
            <p className="section-subtitle">Comprehensive analysis to ensure your resume gets past ATS filters.</p>
          </div>
          <div className={styles.featureGrid}>
            {features.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureCardIcon}>{f.icon}</div>
                <h3 className={styles.featureCardTitle}>{f.title}</h3>
                <p className={styles.featureCardDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.stepsSection}>
        <div className={styles.subpageContainer}>
          <div className="section-header">
            <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
            <p className="section-subtitle">Get your ATS score in seconds.</p>
          </div>
          <div className={styles.stepsGrid}>
            {[
              { num: '1', title: 'Upload Your Resume', desc: 'Upload your current resume in PDF or Word format. Our system processes it instantly.' },
              { num: '2', title: 'Get Your Score', desc: 'Receive a detailed ATS compatibility score with section-by-section analysis.' },
              { num: '3', title: 'Optimize & Improve', desc: 'Follow our AI-powered suggestions to improve your score and land more interviews.' },
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
    </>
  );
}
