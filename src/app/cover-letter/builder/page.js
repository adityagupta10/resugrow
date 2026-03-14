import Link from 'next/link';
import styles from '../../subpage.module.css';

export const metadata = {
  title: 'Cover Letter Builder | ResuGrow',
  description: 'Create professional cover letters with ResuGrow\'s AI-powered builder. Tailored content, professional formatting, and instant downloads.',
};

const features = [
  { icon: '✍️', title: 'AI Writing Assistant', desc: 'Our AI crafts compelling cover letters tailored to your target position. Just provide the job details and let AI do the heavy lifting.' },
  { icon: '🎨', title: 'Professional Templates', desc: 'Choose from a variety of professionally designed cover letter templates that complement your resume style.' },
  { icon: '🎯', title: 'Job-Specific Tailoring', desc: 'Paste any job description and our AI will customize your cover letter to match the requirements and company culture.' },
  { icon: '📝', title: 'Paragraph Suggestions', desc: 'Get AI-powered suggestions for each paragraph — from the opening hook to the compelling closing statement.' },
  { icon: '🔗', title: 'Resume Matching', desc: 'Your cover letter is automatically coordinated with your resume for a consistent, professional application package.' },
  { icon: '📤', title: 'Easy Export', desc: 'Download your cover letter as PDF or Word. Share directly via email or copy the text for online applications.' },
];

export default function CoverLetterBuilder() {
  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.subpageContainer}>
          <div className={styles.subpageHeroBadge}>AI-Powered</div>
          <h1 className={styles.subpageTitle}>
            Cover Letter <span className="gradient-text">Builder</span>
          </h1>
          <p className={styles.subpageDesc}>
            Create compelling, personalized cover letters that complement your resume and
            help you stand out from the competition.
          </p>
          <div className={styles.subpageBtn}>
            <Link href="/coming-soon" className="btn btn-primary">Build Your Cover Letter</Link>
            <Link href="/cover-letter/templates" className="btn btn-secondary">Browse Templates</Link>
          </div>
        </div>
      </section>

      <section className={styles.subpage}>
        <div className={styles.subpageContainer}>
          <div className="section-header">
            <h2 className="section-title">Smart <span className="gradient-text">Features</span></h2>
            <p className="section-subtitle">Everything you need to write the perfect cover letter.</p>
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
            <p className="section-subtitle">Write a winning cover letter in minutes.</p>
          </div>
          <div className={styles.stepsGrid}>
            {[
              { num: '1', title: 'Select a Template', desc: 'Choose from our collection of professional cover letter templates designed for every industry.' },
              { num: '2', title: 'Add Job Details', desc: 'Paste the job description and let our AI generate tailored content for your application.' },
              { num: '3', title: 'Download & Send', desc: 'Review, customize, and download your cover letter. Apply with confidence.' },
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
