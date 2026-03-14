import styles from '../subpage.module.css';

export const metadata = {
  title: 'About Us | ResuGrow',
  description: 'Learn about ResuGrow\'s mission to help job seekers create professional resumes and land their dream jobs with AI-powered tools.',
};

const stats = [
  { number: '500K+', label: 'Resumes Created' },
  { number: '92%', label: 'Customer Satisfaction' },
  { number: '21K+', label: 'Interviews Landed Monthly' },
  { number: '150+', label: 'Countries Served' },
];


export default function About() {
  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.subpageContainer}>
          <div className={styles.subpageHeroBadge}>Our Story</div>
          <h1 className={styles.subpageTitle}>
            About <span className="gradient-text">ResuGrow</span>
          </h1>
          <p className={styles.subpageDesc}>
            We&apos;re on a mission to help every job seeker present their best self
            through AI-powered career tools.
          </p>
        </div>
      </section>

      <section className={styles.subpage}>
        <div className={styles.subpageContainer}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutContent}>
              <h2>Our <span className="gradient-text">Mission</span></h2>
              <p>
                ResuGrow was founded with a simple belief: everyone deserves access to
                professional-quality career tools. Too many talented professionals miss out on
                opportunities because their resumes don&apos;t properly showcase their skills.
              </p>
              <p>
                We combine cutting-edge AI technology with deep insights from HR professionals
                and recruiters to create tools that truly make a difference. Our AI has been
                trained on millions of successful resumes to understand what works and what doesn&apos;t.
              </p>
              <p>
                Today, ResuGrow helps over 500,000 job seekers worldwide create resumes that
                land interviews. We&apos;re proud that 92% of our customers recommend us to friends
                and colleagues.
              </p>
            </div>
            <div className={styles.aboutImage}>
              <svg viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '300px' }}>
                <rect x="50" y="20" width="200" height="210" rx="16" fill="white" stroke="#e2e8f0" strokeWidth="2" />
                <rect x="70" y="45" width="160" height="8" rx="4" fill="#2563eb" />
                <rect x="70" y="65" width="130" height="5" rx="2.5" fill="#e2e8f0" />
                <rect x="70" y="80" width="150" height="5" rx="2.5" fill="#e2e8f0" />
                <rect x="70" y="95" width="100" height="5" rx="2.5" fill="#e2e8f0" />
                <rect x="70" y="120" width="70" height="5" rx="2.5" fill="#2563eb" opacity="0.3" />
                <rect x="70" y="135" width="160" height="5" rx="2.5" fill="#e2e8f0" />
                <rect x="70" y="150" width="140" height="5" rx="2.5" fill="#e2e8f0" />
                <rect x="70" y="165" width="155" height="5" rx="2.5" fill="#e2e8f0" />
                <rect x="70" y="190" width="70" height="5" rx="2.5" fill="#2563eb" opacity="0.3" />
                <rect x="70" y="205" width="150" height="5" rx="2.5" fill="#e2e8f0" />
                <circle cx="260" cy="40" r="20" fill="#7c3aed" opacity="0.1" />
                <text x="253" y="46" fontSize="16">🚀</text>
                <circle cx="40" cy="200" r="18" fill="#10b981" opacity="0.1" />
                <text x="33" y="206" fontSize="14">✨</text>
              </svg>
            </div>
          </div>

          <div className={styles.aboutStatsGrid}>
            {stats.map((s) => (
              <div key={s.label} className={styles.aboutStatCard}>
                <div className={styles.aboutStatNumber}>{s.number}</div>
                <div className={styles.aboutStatLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
