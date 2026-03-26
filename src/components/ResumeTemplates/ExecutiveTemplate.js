import { parseBullets } from './TemplateConfig';
import styles from './executive.module.css';

export default function ExecutiveTemplate({ data }) {
  const p = data.personal;
  return (
    <div className={styles.resumeDoc}>
      {/* ResuGrow Watermark */}
      <div className={styles.watermark}>Built with ResuGrow</div>

      <header className={styles.header}>
        <h1 className={styles.name}>{p.fullName || 'Your Name'}</h1>
        <div className={styles.contactRow}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span> • {p.phone}</span>}
          {p.location && <span> • {p.location}</span>}
        </div>
        {p.linkedin && <div className={styles.link}>{p.linkedin}</div>}
      </header>

      {p.summary && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Professional Summary</h2>
          <p className={styles.bodyText}>{p.summary}</p>
        </section>
      )}

      {data.experience?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className={styles.entry}>
              <div className={styles.entryTop}>
                <strong>{exp.position}</strong>
                <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <div className={styles.company}>{exp.company}</div>
              <ul className={styles.list}>
                {parseBullets(exp.description).map((b, bi) => (
                  <li key={bi}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {data.education?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className={styles.entry}>
              <div className={styles.entryTop}>
                <strong>{edu.institution}</strong>
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className={styles.company}>{edu.degree}</div>
            </div>
          ))}
        </section>
      )}

      {data.skills?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Technical Skills</h2>
          <p className={styles.bodyText}>{data.skills.join(', ')}</p>
        </section>
      )}
    </div>
  );
}
