import { parseBullets } from './TemplateConfig';
import styles from './minimalist.module.css';

export default function MinimalistTemplate({ data }) {
  const { personal, experience, education, skills, summary } = data;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.name}>{personal.fullName || 'Your Name'}</h1>
        <div className={styles.contactRow}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </header>

      <div className={styles.mainGrid}>
        <div className={styles.leftCol}>
          {personal.summary && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>About</h3>
              <p className={styles.summary}>{personal.summary}</p>
            </section>
          )}

          {skills?.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Skills</h3>
              <ul className={styles.skillsList}>
                {skills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className={styles.rightCol}>
          {experience?.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Experience</h3>
              {experience.map((exp, i) => (
                <div key={i} className={styles.item}>
                  <div className={styles.itemHeader}>
                    <span className={styles.company}>{exp.company}</span>
                    <span className={styles.dates}>{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <div className={styles.position}>{exp.position}</div>
                  <div className={styles.description}>
                    {parseBullets(exp.description).map((b, bi) => (
                      <p key={bi}>• {b}</p>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {education?.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Education</h3>
              {education.map((edu, i) => (
                <div key={i} className={styles.item}>
                  <div className={styles.itemHeader}>
                    <span className={styles.company}>{edu.institution}</span>
                    <span className={styles.dates}>{edu.startDate} — {edu.endDate}</span>
                  </div>
                  <div className={styles.position}>{edu.degree}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
