import { parseBullets } from './TemplateConfig';
import styles from './creative.module.css';

export default function CreativeTemplate({ data }) {
  const { personal, experience, education, skills, summary } = data;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.name}>{personal.fullName || 'Your Name'}</h1>
          <p className={styles.title}>{personal.currentPosition || 'Professional Title'}</p>
        </div>
        <div className={styles.headerRight}>
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
        </div>
      </header>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          {personal.summary && (
            <section className={styles.sideSection}>
              <h3 className={styles.sideTitle}>Profile</h3>
              <p className={styles.summary}>{personal.summary}</p>
            </section>
          )}

          {skills?.length > 0 && (
            <section className={styles.sideSection}>
              <h3 className={styles.sideTitle}>Expertise</h3>
              <div className={styles.skillsList}>
                {skills.map((s, i) => (
                  <span key={i} className={styles.skillBadge}>{s}</span>
                ))}
              </div>
            </section>
          )}
        </aside>

        <main className={styles.main}>
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
        </main>
      </div>
    </div>
  );
}
