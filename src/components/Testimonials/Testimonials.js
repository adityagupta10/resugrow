import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Sarah J.',
    role: 'Software Engineer',
    situation: 'Applying to 50+ roles with zero response despite 5 years of experience.',
    action: "Ran my resume through ResuGrow's ATS Checker and discovered my 'Skills' section was unreadable to bots.",
    result: 'Fixed it in 10 minutes, reached a 95% match score, and landed 4 interviews the next week.'
  },
  {
    name: 'Mark D.',
    role: 'Marketing Manager',
    situation: 'Struggled to articulate impact and missing key industry keywords like SaaS and Growth Hacking.',
    action: 'Used the AI Builder to rewrite my bullet points based on the exact suggestions from the ATS scanner.',
    result: 'Immediate 40% jump in LinkedIn profile views and an offer from a top-tier tech firm.'
  },
  {
    name: 'Emily R.',
    role: 'Product Designer',
    situation: 'Beautiful resume design was getting zero traction because of non-standard section headers.',
    action: "The ATS Results Dashboard pointed out that my 'Creations' header was invisible to the parser.",
    result: "Renamed it to 'Experience' as suggested, and got my first callback within 48 hours."
  },
  {
    name: 'James L.',
    role: 'Senior Project Manager',
    situation: 'Transitioning careers and felt my experience didn\'t translate well to a new industry.',
    action: 'Used the One-Click Tailoring tool to align my past projects with specific job descriptions.',
    result: 'Matched with 92% accuracy on a dream job posting and secured the role with a 20% salary increase.'
  },
  {
    name: 'Amina K.',
    role: 'Data Analyst',
    situation: 'Constantly getting auto-rejections despite having all technical requirements.',
    action: 'Found that my critical technical tags were missing from the machine-readable layer of my PDF.',
    result: 'ResuGrow\'s ATS-optimized template fixed the encoding issue, leading to a job at a Fortune 500 company.'
  },
  {
    name: 'Marcus V.',
    role: 'HR Specialist',
    situation: 'Knew the hiring systems from the inside but still struggled to optimize my own personal resume for automated filters.',
    action: 'Applied the AI-driven keyword density suggestions from ResuGrow to my professional summary and experience sections.',
    result: 'Landed a Head of HR role with a 30% salary hike after my first application with the updated resume.'
  }
];

export default function Testimonials({ title = "Success Stories", subtitle = "Real results from job seekers who beat the bots." }) {
  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.sarBadge}>SAR Method</div>
              <div className={styles.section}>
                <span className={styles.label}>Situation:</span>
                <p className={styles.text}>{t.situation}</p>
              </div>
              <div className={styles.section}>
                <span className={styles.label}>Action:</span>
                <p className={styles.text}>{t.action}</p>
              </div>
              <div className={styles.section}>
                <span className={styles.label}>Result:</span>
                <p className={styles.text} style={{ color: 'var(--success)', fontWeight: '700' }}>{t.result}</p>
              </div>
              <div className={styles.footer}>
                <div className={styles.avatar}>{t.name[0]}</div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
