import { parseBullets } from './TemplateConfig';
import styles from './swiss.module.css';

export default function SwissTemplate({ data }) {
  const { personal, experience, education, skills, projects } = data;

  return (
    <div className={styles.resumeDoc}>
      {/* ResuGrow Watermark */}
      <div className={styles.watermark}>Built with ResuGrow</div>

      <div className={styles.topSection}>
        <div className={styles.nameCard}>
          <h1 className={styles.name}>{personal.fullName || 'Your Name'}</h1>
          <p className={styles.title}>{personal.currentPosition || 'Professional'}</p>
        </div>
        <div className={styles.contactCard}>
          <div className={styles.contactItem}>Email: {personal.email}</div>
          <div className={styles.contactItem}>Phone: {personal.phone}</div>
          <div className={styles.contactItem}>Loc: {personal.location}</div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.leftCol}>
          {personal.summary && (
            <section className={styles.section}>
              <h2 className={styles.sectionHeader}>Profile</h2>
              <p className={styles.summary}>{personal.summary}</p>
            </section>
          )}

          {education?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionHeader}>Education</h2>
              {education.map((edu, i) => (
                <div key={i} className={styles.eduItem}>
                  <div className={styles.eduYear}>{edu.endDate}</div>
                  <div className={styles.eduInfo}>
                    <div className={styles.eduInstitution}>{edu.institution}</div>
                    <div className={styles.eduDegree}>{edu.degree}</div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {skills?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionHeader}>Expertise</h2>
              <div className={styles.skillsList}>
                {skills.map((s, i) => (
                  <div key={i} className={styles.skillItem}>{s}</div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className={styles.rightCol}>
          {experience?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionHeader}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className={styles.experienceItem}>
                  <div className={styles.expLabel}>
                    <span className={styles.expDates}>{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <div className={styles.expContent}>
                    <div className={styles.expTitle}>{exp.position}</div>
                    <div className={styles.expCompany}>{exp.company}</div>
                    <ul className={styles.bullets}>
                      {parseBullets(exp.description).map((b, bi) => (
                        <li key={bi}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </section>
          )}

          {projects?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionHeader}>Projects</h2>
              {projects.map((proj, i) => (
                <div key={i} className={styles.projectItem}>
                  <div className={styles.projectTitle}>{proj.name}</div>
                  <p className={styles.projectDesc}>{proj.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
