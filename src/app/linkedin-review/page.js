import Link from 'next/link';
import styles from '../subpage.module.css';

export const metadata = {
  title: 'LinkedIn Profile Review & Score | ResuGrow',
  description: 'Get your LinkedIn profile reviewed and scored by AI. Receive actionable suggestions to optimize your headline, about section, and professional experience.',
};

const analysisCategories = [
  { icon: '📝', title: 'Headline Analysis', desc: 'We check if your headline is keyword-rich and clearly states your value proposition to recruiters.' },
  { icon: '👤', title: 'About Section', desc: 'Our AI analyzes your summary for storytelling, keywords, and a clear call to action.' },
  { icon: '💼', title: 'Experience Depth', desc: 'Verifying if your experience highlights achievements rather than just listing responsibilities.' },
  { icon: '🎯', title: 'Keyword Optimization', desc: 'Identifying missing industry keywords that LinkedIn algorithms look for in search results.' },
  { icon: '📊', title: 'Engagement Score', desc: 'Evaluating how likely your profile is to convert profile views into meaningful connections.' },
  { icon: '💡', title: 'Visual Impression', desc: 'Providing tips for your profile picture and banner to ensure a professional first look.' },
];

const steps = [
  { num: '1', title: 'Link Your Profile', desc: 'Paste your LinkedIn profile URL. No login or password required for the basic review.' },
  { num: '2', title: 'AI Thorough Check', desc: 'Our AI analyzes over 50 data points on your profile against recruiter-preferred standards.' },
  { num: '3', title: 'Get Your Score (0-100)', desc: 'Receive a comprehensive score out of 100 with a detailed roadmap to reach perfection.' },
];

export default function ProfileReview() {
  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.subpageContainer}>
          <div className={styles.subpageHeroBadge}>📈 LinkedIn Tool</div>
          <h1 className={styles.subpageTitle}>
            LinkedIn <span className="gradient-text">Profile Review & Score</span>
          </h1>
          <p className={styles.subpageDesc}>
            Stand out to recruiters with a perfectly optimized LinkedIn profile. Get your score
            instantly and learn how to present yourself in the best way possible.
          </p>
          
          <div className={styles.contactForm} style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Enter LinkedIn Profile URL</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input 
                  type="url" 
                  className={styles.formInput} 
                  placeholder="https://www.linkedin.com/in/yourprofile" 
                  style={{ flex: 1 }}
                />
                <button className="btn btn-primary">Score My Profile →</button>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
              We do not store your personal data. This is a public profile analysis.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.subpage}>
        <div className={styles.subpageContainer}>
          <div className="section-header">
            <h2 className="section-title">What We <span className="gradient-text">Analyze</span></h2>
            <p className="section-subtitle">We thoroughly check every section of your profile to ensure it is recruiter-ready.</p>
          </div>
          <div className={styles.featureGrid}>
            {analysisCategories.map((f) => (
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
            <p className="section-subtitle">Get your professional LinkedIn score in 3 simple steps.</p>
          </div>
          <div className={styles.stepsGrid}>
            {steps.map((s) => (
              <div key={s.num} className={styles.stepCard}>
                <div className={styles.stepNumber}>{s.num}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.subpage} style={{ background: 'white' }}>
        <div className={styles.subpageContainer}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutContent}>
              <div className={styles.subpageHeroBadge}>✨ Why Optimize?</div>
              <h2>Don't Just Be on LinkedIn, <span className="gradient-text">Be Found</span></h2>
              <p>
                LinkedIn is the world's largest professional network, but with over 900 million users, 
                just having a profile isn't enough. Recruiter-facing algorithms prioritize profiles 
                that are complete, keyword-optimized, and professionally formatted.
              </p>
              <p>
                Our Profile Review tool simulates how a recruiter or an automated system views your profile, 
                giving you an "insider's edge" to fixing common mistakes that hold you back from interview invites.
              </p>
              <div style={{ marginTop: '24px' }}>
                <Link href="/linkedin-makeover" className="btn btn-primary">Need a Full Makeover? →</Link>
              </div>
            </div>
            <div className={styles.aboutImage}>
               <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '72px', fontWeight: '800', color: 'var(--primary)', marginBottom: '10px' }}>
                    95%
                  </div>
                  <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                    Increase in profile views after optimization
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
