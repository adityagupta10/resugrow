import { parseBullets } from './TemplateConfig';
import styles from './impact.module.css';

export default function ImpactTemplate({ data }) {
  const { personal, experience, education, skills, achievements } = data;

  return (
    <div className={styles.resumeDoc}>
      {/* ResuGrow Watermark */}
      <div className={styles.watermark}>Built with ResuGrow</div>

      <div className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.name}>{personal.fullName || 'Your Name'}</h1>
          <p className={styles.tagline}>{personal.currentPosition || 'High-Impact Professional'}</p>
        </header>

        {personal.summary && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Executive Summary</h2>
            <p className={styles.summary}>{personal.summary}</p>
          </section>
        )}

        {experience?.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Key Professional Impact</h2>
            {experience.map((exp) => (
              <div key={exp.id} className={styles.item}>
                <div className={styles.itemHeader}>
                  <div className={styles.companyInfo}>
                    <span className={styles.company}>{exp.company}</span>
                    <span className={styles.position}>{exp.position}</span>
                  </div>
                  <span className={styles.dates}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <ul className={styles.bullets}>
                  {parseBullets(exp.description).map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
      </div>

      <aside className={styles.sidebar}>
        <div className={styles.sideBlock}>
          <h3 className={styles.sideTitle}>Contact</h3>
          <div className={styles.contactItem}>{personal.email}</div>
          <div className={styles.contactItem}>{personal.phone}</div>
          <div className={styles.contactItem}>{personal.location}</div>
        </div>

        {skills?.length > 0 && (
          <div className={styles.sideBlock}>
            <h3 className={styles.sideTitle}>Top Competencies</h3>
            <div className={styles.skillsList}>
              {skills.map((s, i) => (
                <div key={i} className={styles.skillRow}>
                  <span className={styles.skillName}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {education?.length > 0 && (
          <div className={styles.sideBlock}>
            <h3 className={styles.sideTitle}>Education</h3>
            {education.map((edu) => (
              <div key={edu.id} className={styles.eduItem}>
                <div className={styles.eduDegree}>{edu.degree}</div>
                <div className={styles.eduInstitution}>{edu.institution}</div>
              </div>
            ))}
          </div>
        )}

        {achievements?.length > 0 && (
          <div className={styles.sideBlock}>
            <h3 className={styles.sideTitle}>Key Results</h3>
            <ul className={styles.achievements}>
              {achievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
