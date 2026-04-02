import Link from 'next/link';
import { SITE_URL, createPageMetadata, getSoftwareAppJsonLd } from '@/lib/seo';
import EmojiImage from '@/components/UI/EmojiImage';
import styles from '../../subpage.module.css';
import landingStyles from './landing.module.css';

export const metadata = createPageMetadata({
  title: 'Free Cover Letter Builder — Job-Tailored Letters in Minutes',
  description:
    'Build a professional cover letter with our free guided builder. 6 templates, live A4 preview, PDF export. Tailored to your role, company, and experience level.',
  path: '/cover-letter/builder',
  keywords: [
    'cover letter builder', 'free cover letter builder', 'cover letter generator',
    'cover letter maker', 'AI cover letter', 'cover letter template',
    'how to write a cover letter', 'cover letter examples',
  ]
});

const features = [
  { icon: '⚡', title: 'Deterministic Generator', desc: 'No API wait time. Generate structured, polished letters instantly with rule-based logic.' },
  { icon: '🪄', title: 'Live A4 Preview', desc: 'See your cover letter update in real time while you complete the guided wizard.' },
  { icon: '🎯', title: 'Role Tailoring', desc: 'Personalize by target role, experience level, strengths, and working style.' },
  { icon: '🛡️', title: 'Gap Handler', desc: 'Handle career breaks positively with pre-written professional framing options.' },
  { icon: '✍️', title: 'Signature Modes', desc: 'Use typed script-style signatures or upload your own signature image.' },
  { icon: '📤', title: 'Export Ready', desc: 'Fine-tune in the editor, then download as PDF and continue to ATS check.' }
];

export default function CoverLetterBuilder() {
  const softwareJsonLd = getSoftwareAppJsonLd({
    name: 'ResuGrow Cover Letter Studio',
    description:
      'Generate job-tailored cover letters with live preview, deterministic structure, and one-click PDF export.',
    url: `${SITE_URL}/cover-letter/builder`,
    price: '0.00',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <section className={`${styles.subpageHero} ${landingStyles.compactHero}`}>
        <div className={styles.subpageContainer}>
          <div className={styles.subpageHeroBadge}>Cover Letter Studio</div>
          <h1 className={styles.subpageTitle}>
            Build Your <span className="gradient-text">Cover Letter</span>
          </h1>
          <p className={styles.subpageDesc}>
            Use our guided generator to create a job-tailored cover letter in minutes,
            or start from professionally designed templates.
          </p>
          <div className={styles.subpageBtn}>
            <Link href="/cover-letter/create" className="btn btn-primary">Start Building</Link>
            <Link href="/cover-letter/templates" className="btn btn-secondary">Browse Templates</Link>
          </div>
        </div>
      </section>

      <section className={`${styles.subpage} ${landingStyles.compactSection}`}>
        <div className={styles.subpageContainer}>
          <div className="section-header">
            <h2 className="section-title">What You Get</h2>
            <p className="section-subtitle">Fast generation, strong structure, and editable output.</p>
          </div>
          <div className={`${styles.featureGrid} ${landingStyles.compactFeatureGrid}`}>
            {features.map((f) => (
              <div key={f.title} className={`${styles.featureCard} ${landingStyles.compactFeatureCard}`}>
                <div className={styles.featureCardIcon}>
                  <EmojiImage emoji={f.icon} size={32} />
                </div>
                <h3 className={styles.featureCardTitle}>{f.title}</h3>
                <p className={styles.featureCardDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
