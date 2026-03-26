import { parseBullets } from './TemplateConfig';
import styles from './startup.module.css';

export default function StartupTemplate({ data }) {
  const { personal, experience, education, skills } = data;

  return (
    <div className={styles.resumeDoc}>
      {/* ResuGrow Watermark */}
      <div className={styles.watermark}>Built with ResuGrow</div>

      <div className={styles.mainColumn}>
        <header className={styles.header}>
          <h1 className={styles.heroName}>{personal.fullName || 'Your Name'}</h1>
          <p className={styles.jobTitle}>{personal.currentPosition || 'Professional Title'}</p>
          <div className={styles.contactInfo}>
            {personal.email} {personal.phone && `• ${personal.phone}`} {personal.location && `• ${personal.location}`}
          </div>
        </header>

        {personal.summary && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>About Me</h3>
            <p className={styles.bio}>{personal.summary}</p>
          </section>
        )}

        {experience?.length > 0 && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Experience</h3>
            {experience.map((exp) => (
              <div key={exp.id} className={styles.experienceItem}>
                <div className={styles.expHeader}>
                  <span className={styles.company}>{exp.company}</span>
                  <span className={styles.dates}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
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
            {education.map((edu) => (
              <div key={edu.id} className={styles.experienceItem}>
                <div className={styles.expHeader}>
                  <span className={styles.company}>{edu.institution}</span>
                  <span className={styles.dates}>{edu.startDate} - {edu.endDate}</span>
                </div>
                <div className={styles.position}>{edu.degree}</div>
              </div>
            ))}
          </section>
        )}
      </div>

      <div className={styles.sidebar}>
        {skills?.length > 0 && (
          <div className={styles.sideBlock}>
            <h3 className={styles.sideTitle}>Skills</h3>
            <div className={styles.skillsGrid}>
              {skills.map((s, i) => (
                <span key={i} className={styles.tag}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {personal.linkedin && (
          <div className={styles.sideBlock}>
            <h3 className={styles.sideTitle}>Connect</h3>
            <div className={styles.sideLink}>LinkedIn: {personal.linkedin}</div>
            {personal.website && <div className={styles.sideLink}>Portfolio: {personal.website}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
