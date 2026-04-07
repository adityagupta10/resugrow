import { parseBullets, normalizeData } from './TemplateConfig';
import styles from './tech.module.css';

export default function TechTemplate({ data: rawData }) {
  const data = normalizeData(rawData);
  const { personal, experience, education, skills, projects } = data;

  return (
    <div className={styles.resumeDoc}>
      {/* RESUGROW Watermark */}
      <div className={styles.watermark}>Built with RESUGROW</div>

      <header className={styles.header}>
        <div className={styles.nameBlock}>
          {personal.showPhoto && personal.photo && (
            <img src={personal.photo} alt={personal.fullName || 'Profile'} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', marginBottom: 8, border: '2px solid rgba(255,255,255,0.2)', display: 'block' }} />
          )}
          <h1 className={styles.name}>{personal.fullName || 'Your Name'}</h1>
          <p className={styles.jobTitle}>{personal.currentPosition || 'Software Engineer'}</p>
        </div>
        <div className={styles.contactBlock}>
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.linkedin && <div>linkedin.com/in/{personal.linkedin}</div>}
          {personal.website && <div>{personal.website}</div>}
        </div>
      </header>

      <div className={styles.gridContainer}>
        <div className={styles.mainCol}>
          {experience?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>[ Experience ]</h2>
              {experience.map((exp) => (
                <div key={exp.id} className={styles.item}>
                  <div className={styles.itemHeader}>
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

          {projects?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>[ Projects ]</h2>
              {projects.map((proj, i) => (
                <div key={i} className={styles.item}>
                  <div className={styles.itemHeader}>
                    <span className={styles.company}>{proj.name}</span>
                    <span className={styles.link}>{proj.link}</span>
                  </div>
                  <p className={styles.projDesc}>{proj.description}</p>
                </div>
              ))}
            </section>
          )}

          {data.achievements?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>[ Achievements ]</h2>
              <ul className={styles.bullets}>
                {data.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </section>
          )}

          {(data.customSection?.title || data.customSection?.content) && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>[ {data.customSection.title || 'System Information'} ]</h2>
              <p className={styles.terminalText}>$ cat custom_data.log</p>
              <p className={styles.bio} style={{ whiteSpace: 'pre-wrap' }}>{data.customSection.content}</p>
            </section>
          )}
        </div>

        <aside className={styles.sidebar}>
          {skills?.length > 0 && (
            <section className={styles.sideSection}>
              <h2 className={styles.sideTitle}>Technical Stack</h2>
              <div className={styles.skillsGrid}>
                {skills.map((s, i) => (
                  <span key={i} className={styles.skillBadge}>{s}</span>
                ))}
              </div>
            </section>
          )}

          {education?.length > 0 && (
            <section className={styles.sideSection}>
              <h2 className={styles.sideTitle}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className={styles.eduItem}>
                  <div className={styles.eduInstitution}>{edu.institution}</div>
                  <div className={styles.eduDegree}>{edu.degree}</div>
                  <div className={styles.eduDates}>{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </section>
          )}

          {data.strengths?.length > 0 && (
            <section className={styles.sideSection}>
              <h2 className={styles.sideTitle}>Attributes</h2>
              <div className={styles.skillsGrid}>
                {data.strengths.map((s, i) => (
                  <span key={i} className={styles.skillBadge} style={{ borderColor: '#f59e0b', color: '#f59e0b' }}>{s}</span>
                ))}
              </div>
            </section>
          )}

          {data.certifications?.length > 0 && (
            <section className={styles.sideSection}>
              <h2 className={styles.sideTitle}>Certificates</h2>
              {data.certifications.map((c, i) => (
                <div key={i} style={{ fontSize: '11px', marginBottom: '6px', color: '#888' }}>
                  <div style={{ color: '#fff', fontWeight: 600 }}>{c.title}</div>
                  {c.issuer && <div>&gt; {c.issuer}</div>}
                </div>
              ))}
            </section>
          )}

          {data.languages?.length > 0 && (
            <section className={styles.sideSection}>
              <h2 className={styles.sideTitle}>Locales</h2>
              <div style={{ fontSize: '11px', color: '#888' }}>
                {data.languages.map(l => `${l.name}: ${l.proficiency}`).join('; ')}
              </div>
            </section>
          )}

          {personal.summary && (
            <section className={styles.sideSection}>
              <h2 className={styles.sideTitle}>Terminal</h2>
              <p className={styles.terminalText}>$ cat profile.txt</p>
              <p className={styles.bio}>{personal.summary}</p>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
