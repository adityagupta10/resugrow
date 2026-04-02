import Link from 'next/link';
import styles from '../../subpage.module.css';
import { createPageMetadata } from '@/lib/seo';
import EmojiImage from '@/components/UI/EmojiImage';

export const metadata = createPageMetadata({
  title: 'Free AI Resume Builder — Build ATS-Friendly Resumes Faster',
  description:
    'Generate a recruiter-ready resume with AI in minutes. Real-time ATS scoring, job description matching, 15 professional templates, and one-click PDF export. Free.',
  path: '/resume/ai-builder',
  keywords: [
    'AI resume builder', 'free AI resume', 'resume generator', 'ATS friendly resume builder',
    'AI resume writer', 'resume builder AI', 'smart resume builder', 'resume builder 2026',
  ]
});

const features = [
  { icon: '🤖', title: 'AI Content Generation', desc: 'Our AI analyzes your experience and generates professional bullet points, summaries, and skill descriptions tailored to your target role.' },
  { icon: '📊', title: 'Real-Time ATS Score', desc: 'See how well your resume performs against Applicant Tracking Systems in real-time. Get actionable suggestions to improve your score.' },
  { icon: '🎯', title: 'Job Matching', desc: 'Paste any job description and our AI will automatically tailor your resume to match the requirements and keywords.' },
  { icon: '⚡', title: 'Instant Formatting', desc: 'Professional formatting is applied automatically. No more fighting with spacing, margins, or layout issues.' },
  { icon: '🔄', title: 'Multiple Versions', desc: 'Create unlimited resume versions for different jobs. Switch between them with one click.' },
  { icon: '📤', title: 'Export Anywhere', desc: 'Download as PDF, Word, or plain text. Share via a unique link or send directly to employers.' },
];

const steps = [
  { num: '1', title: 'Choose a Template', desc: 'Pick from our library of ATS-friendly, recruiter-approved templates designed for every industry.' },
  { num: '2', title: 'Add Your Details', desc: 'Enter your experience and let our AI enhance your content with powerful, action-oriented language.' },
  { num: '3', title: 'Download & Apply', desc: 'Export your polished resume and start applying. Track your applications with our dashboard.' },
];

export default function AIBuilder() {
  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.subpageContainer}>
          <div className={styles.subpageHeroBadge}>AI-Powered</div>
          <h1 className={styles.subpageTitle}>
            AI Powered <span className="gradient-text">Resume Builder</span>
          </h1>
          <p className={styles.subpageDesc}>
            Let artificial intelligence craft the perfect resume for you. Get hired faster with
            intelligent content suggestions and ATS optimization.
          </p>
          <div className={styles.subpageBtn}>
            <Link href="/resume/builder" className="btn btn-primary">Start Building Free</Link>
            <Link href="/resume/ats-checker" className="btn btn-secondary">Check Your ATS Score</Link>
          </div>
        </div>
      </section>

      <section className={styles.subpage}>
        <div className={styles.subpageContainer}>
          <div className="section-header">
            <h2 className="section-title">Powerful <span className="gradient-text">AI Features</span></h2>
            <p className="section-subtitle">Everything you need to create a professional, interview-winning resume.</p>
          </div>
          <div className={styles.featureGrid}>
            {features.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureCardIcon}>
                  <EmojiImage emoji={f.icon} size={40} />
                </div>
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
            <p className="section-subtitle">Build your perfect resume in three simple steps.</p>
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
    </>
  );
}
