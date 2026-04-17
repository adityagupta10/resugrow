import Link from 'next/link';
import styles from '../subpage.module.css';
import { createPageMetadata } from '@/lib/seo';
import EmojiImage from '@/components/UI/EmojiImage';
import RelatedTools from '@/components/RelatedTools/RelatedTools';

export const metadata = createPageMetadata({
  title: 'About RESUGROW | AI Career Platform Mission & Team',
  description:
    'Learn why RESUGROW was built, the mission behind our AI resume platform, and how we help job seekers become recruiter-ready with confidence.',
  path: '/about',
  keywords: ['about RESUGROW', 'career platform mission', 'AI resume company']
});

const stats = [
  { number: '500K+', label: 'Resumes Built' },
  { number: '21K+', label: 'Interview Wins Monthly' },
  { number: '92%', label: 'User Satisfaction' },
  { number: '150+', label: 'Countries Reached' }
];

const values = [
  {
    icon: '🎯',
    title: 'Clarity over Guesswork',
    text: 'We believe career growth should not depend on insider luck. Every score, recommendation, and rewrite must be transparent enough for users to trust and act on.'
  },
  {
    icon: '🛠️',
    title: 'Action over Advice',
    text: 'Reading tips is not enough. We build tools that convert insight into output: stronger bullets, cleaner sections, and job-ready documents in one flow.'
  },
  {
    icon: '🤝',
    title: 'Empathy at Scale',
    text: 'Behind every resume is a person carrying pressure, ambition, and uncertainty. We design for confidence, not just formatting.'
  }
];

const journey = [
  {
    year: '2023',
    title: 'The Problem Became Personal',
    text: 'We saw talented professionals miss interviews because their resumes were invisible to ATS systems. The gap was not capability; it was positioning.'
  },
  {
    year: '2024',
    title: 'Deterministic Scoring Engine',
    text: 'We shipped our first rules-based ATS framework so users could understand exactly why they scored low and what to fix first.'
  },
  {
    year: '2025',
    title: 'LinkedIn + Rewrite Expansion',
    text: 'We added profile scanning, direct-paste analysis, and SAR rewriting to align every career asset with recruiter expectations.'
  },
  {
    year: '2026',
    title: 'End-to-End Career System',
    text: 'RESUGROW matured into a full platform where users can build, diagnose, rewrite, and optimize with one consistent quality standard.'
  }
];

export default function About() {
  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.subpageContainer}>
          <div className={styles.subpageHeroBadge}>Our Story</div>
          <h1 className={styles.subpageTitle}>
            Built for the moments when careers feel <span className="gradient-text">uncertain</span>
          </h1>
          <p className={styles.subpageDesc}>
            RESUGROW started with one mission: help capable people get seen fairly. We build AI-powered career tools that turn confusion into a clear, recruiter-ready plan.
          </p>
          <div className={styles.subpageBtn}>
            <Link href="/resume/builder" className="btn btn-primary">Build My Resume</Link>
            <Link href="/linkedin-review" className="btn btn-secondary">Review My LinkedIn</Link>
          </div>
        </div>
      </section>

      <section className={styles.subpage}>
        <div className={styles.subpageContainer}>
          <div className={styles.aboutNarrative}>
            <div className={styles.aboutNarrativeMain}>
              <h2>The reason we exist</h2>
              <p>
                Most job seekers are not rejected because they lack skill. They are filtered out because their strengths are buried, their documents are not machine-readable, or their profile language does not match recruiter intent. The result is painful: silence after dozens of applications.
              </p>
              <p>
                We built RESUGROW to remove that silence. Our platform combines deterministic scoring with AI-assisted rewriting so users can understand exactly what is weak, what is missing, and what to change first. That clarity turns effort into momentum.
              </p>
              <p>
                We are deeply outcome-focused. Every feature is designed around one question: does this increase interview probability in the real world? If the answer is not measurable, it does not ship.
              </p>
            </div>
            <div className={styles.aboutNarrativeAside}>
              <h3>What users feel after using RESUGROW</h3>
              <ul>
                <li>They stop guessing what recruiters want.</li>
                <li>They know which edits will move score and visibility.</li>
                <li>They apply with higher confidence and cleaner positioning.</li>
                <li>They build a repeatable process, not one-time luck.</li>
              </ul>
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

          <div className={styles.aboutValues}>
            {values.map((item) => (
              <article key={item.title} className={styles.aboutValueCard}>
                <div className={styles.aboutValueIcon}>
                  <EmojiImage emoji={item.icon} size={26} alt={`${item.title} value icon for RESUGROW mission`} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className={styles.aboutJourney}>
            <h2>Our journey so far</h2>
            <div className={styles.aboutJourneyGrid}>
              {journey.map((item) => (
                <article key={item.year} className={styles.aboutJourneyCard}>
                  <span>{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.aboutManifesto}>
            <h2>What we promise every user</h2>
            <p>
              We will keep RESUGROW practical, transparent, and honest. We will keep shipping tools that save time and improve outcomes. And we will keep building for the people behind every resume: professionals trying to provide, grow, and be recognized for what they can do.
            </p>
            <p>
              If you are in that season right now, we built this for you.
            </p>
            <div className={styles.subpageBtn}>
              <Link href="/resume/ats-checker" className="btn btn-primary">Run ATS Check</Link>
              <Link href="/contact" className="btn btn-secondary">Talk to Our Team</Link>
            </div>
          </div>
        </div>
      </section>
      <RelatedTools />
    </>
  );
}
