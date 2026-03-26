import { parseBullets } from './TemplateConfig';
import styles from './academic.module.css';

export default function AcademicTemplate({ data }) {
  const { personal, experience, education, skills, certifications, summary } = data;

  return (
    <div className={styles.container}>
      {/* ResuGrow Watermark */}
      <div className={styles.watermark}>Built with ResuGrow</div>

      <header className={styles.header}>
        <h1 className={styles.name}>{personal.fullName || 'Your Name'}</h1>
        <div className={styles.contactInfo}>
          {personal.email} | {personal.phone} | {personal.location}
          {personal.linkedin && ` | LinkedIn: ${personal.linkedin}`}
          {personal.website && ` | Web: ${personal.website}`}
        </div>
      </header>

      {personal.summary && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>I. PROFESSIONAL PROFILE</h2>
          <p className={styles.summary}>{personal.summary}</p>
        </section>
      )}

      {experience?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>II. RESEARCH & PROFESSIONAL EXPERIENCE</h2>
          {experience.map((exp, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.company}>{exp.company}</span>
                <span className={styles.dates}>{exp.startDate} – {exp.endDate}</span>
              </div>
              <div className={styles.position}>{exp.position}</div>
              <ul className={styles.bullets}>
                {parseBullets(exp.description).map((b, bi) => (
                  <li key={bi}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {education?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>III. ACADEMIC QUALIFICATIONS</h2>
          {education.map((edu, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.company}>{edu.institution}</span>
                <span className={styles.dates}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <div className={styles.position}>{edu.degree} {edu.field && `in ${edu.field}`}</div>
              {edu.gpa && <div className={styles.gpa}>Cumulative GPA: {edu.gpa}</div>}
            </div>
          ))}
        </section>
      )}

      {skills?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>IV. TECHNICAL COMPETENCIES</h2>
          <p className={styles.skillsList}>{skills.join('; ')}</p>
        </section>
      )}

      {certifications?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>V. CERTIFICATIONS & HONORS</h2>
          <ul className={styles.bullets}>
            {certifications.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
