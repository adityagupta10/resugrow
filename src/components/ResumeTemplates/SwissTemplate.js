import { parseBullets, normalizeData } from './TemplateConfig';
import styles from './swiss.module.css';

export default function SwissTemplate({ data: rawData }) {
  const data = normalizeData(rawData);
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

          {data.strengths?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionHeader}>Attributes</h2>
              <div className={styles.skillsList}>
                {data.strengths.map((s, i) => (
                  <div key={i} className={styles.skillItem} style={{ borderLeftColor: '#059669' }}>{s}</div>
                ))}
              </div>
            </section>
          )}

          {data.languages?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionHeader}>Languages</h2>
              {data.languages.map((l, i) => (
                <div key={i} style={{ fontSize: '11px', marginBottom: '4px' }}>
                  <strong>{l.name}</strong> <span style={{ opacity: 0.6 }}>({l.proficiency})</span>
                </div>
              ))}
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

          {data.achievements?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionHeader}>Achievements</h2>
              <ul className={styles.bullets} style={{ listStyle: 'none', paddingLeft: 0 }}>
                {data.achievements.map((a, i) => (
                  <li key={i} style={{ marginBottom: '8px', fontSize: '12px' }}>• {a}</li>
                ))}
              </ul>
            </section>
          )}

          {data.certifications?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionHeader}>Certifications</h2>
              {data.certifications.map((c, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 600, fontSize: '12px' }}>{c.title}</div>
                  {c.issuer && <div style={{ fontSize: '11px', opacity: 0.7 }}>{c.issuer}</div>}
                </div>
              ))}
            </section>
          )}

          {data.extracurricular?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionHeader}>Activities</h2>
              <p className={styles.projectDesc}>{data.extracurricular.join(' · ')}</p>
            </section>
          )}

          {(data.customSection?.title || data.customSection?.content) && (
            <section className={styles.section}>
              <h2 className={styles.sectionHeader}>{data.customSection.title || 'Other'}</h2>
              <p className={styles.projectDesc} style={{ whiteSpace: 'pre-wrap' }}>{data.customSection.content}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
