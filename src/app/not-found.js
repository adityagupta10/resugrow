import Link from 'next/link';
import styles from './not-found.module.css';

const quickLinks = [
  {
    label: 'AI Resume Builder',
    href: '/resume/builder',
    note: 'Create a polished, ATS-safe resume from scratch.',
  },
  {
    label: 'ATS Resume Checker',
    href: '/resume/ats-checker',
    note: 'Scan your existing resume and surface the fixes that matter.',
  },
  {
    label: 'LinkedIn Review',
    href: '/linkedin-review',
    note: 'Score your profile and uncover visibility blockers.',
  },
];

const floatingCards = [
  { text: 'Resume signals lost', accent: 'lime', href: '/resume/ats-checker' },
  { text: 'Return to homepage', accent: 'blue', href: '/' },
  { text: 'Build a stronger profile', accent: 'white', href: '/linkedin-review' },
  { text: 'Design your next application asset', accent: 'white', href: '/resume/builder' },
];

export default function NotFound() {
  return (
    <section className={styles.pageShell}>
      <div className={styles.backdropGlow} />
      <div className={styles.backdropGrid} />

      <div className={styles.container}>
        <div className={styles.heroPanel}>
          <div className={styles.kickerRow}>
            <span className={styles.kicker}>404 / Page Not Found</span>
            <span className={styles.statusPill}>Routing Drift</span>
          </div>

          <div className={styles.copyWrap}>
            <h1 className={styles.title}>
              This page slipped outside the
              <span className="gradient-text"> recruiter-ready route.</span>
            </h1>
            <p className={styles.subtitle}>
              The link may be outdated, moved, or mistyped. Let&apos;s get you back to the parts of
              ResuGrow that actually move applications forward.
            </p>
          </div>

          <div className={styles.ctaRow}>
            <Link href="/" className="btn btn-primary">
              Return Home
            </Link>
            <Link href="/resume/builder" className="btn btn-secondary">
              Build My Resume
            </Link>
          </div>

          <div className={styles.stage}>
            <div className={styles.errorCode}>404</div>

            <div className={`${styles.floatCard} ${styles.cardTopLeft} ${styles.cardLime}`}>
              <span className={styles.cardArrow}>↗</span>
              <span>Wrong turn detected</span>
            </div>

            <div className={`${styles.floatCard} ${styles.cardTopRight} ${styles.cardWhite}`}>
              <span>ATS-safe path</span>
              <span className={styles.cardArrow}>→</span>
            </div>

            <div className={styles.bottomRail}>
              {floatingCards.map((card) => (
                <Link
                  key={card.text}
                  href={card.href}
                  className={`${styles.railCard} ${
                    card.accent === 'lime'
                      ? styles.railCardLime
                      : card.accent === 'blue'
                        ? styles.railCardBlue
                        : styles.railCardWhite
                  }`}
                >
                  <span>{card.text}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.linksPanel}>
          <div className={styles.panelHeader}>
            <p>Continue With Something Useful</p>
            <h2>Popular recovery routes</h2>
          </div>

          <div className={styles.linksGrid}>
            {quickLinks.map((item) => (
              <Link key={item.label} href={item.href} className={styles.linkCard}>
                <div>
                  <h3>{item.label}</h3>
                  <p>{item.note}</p>
                </div>
                <span className={styles.linkIcon}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
