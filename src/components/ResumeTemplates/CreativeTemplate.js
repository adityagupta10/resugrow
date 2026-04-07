import { parseBullets, normalizeData } from './TemplateConfig';
import styles from './creative.module.css';

export default function CreativeTemplate({ data: rawData }) {
  const data = normalizeData(rawData);
  const { personal, experience, education, skills } = data;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          {personal.showPhoto && personal.photo && (
            <img src={personal.photo} alt={personal.fullName || 'Profile'} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', marginRight: 16, border: '2px solid rgba(255,255,255,0.3)', flexShrink: 0 }} />
          )}
          <div>
            <h1 className={styles.name}>{personal.fullName || 'Your Name'}</h1>
            <p className={styles.title}>{personal.currentPosition || 'Professional Title'}</p>
          </div>
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

          {data.strengths?.length > 0 && (
            <section className={styles.sideSection}>
              <h3 className={styles.sideTitle}>Strengths</h3>
              <div className={styles.skillsList}>
                {data.strengths.map((s, i) => (
                  <span key={i} className={styles.skillBadge} style={{ background: '#ecfdf5', color: '#059669' }}>{s}</span>
                ))}
              </div>
            </section>
          )}

          {data.languages?.length > 0 && (
            <section className={styles.sideSection}>
              <h3 className={styles.sideTitle}>Languages</h3>
              <div className={styles.skillsList}>
                {data.languages.map((l, i) => (
                  <div key={i} style={{ fontSize: '12px', marginBottom: '4px' }}>
                    <strong>{l.name}</strong> <span style={{ opacity: 0.7 }}>({l.proficiency})</span>
                  </div>
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

          {data.projects?.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Projects</h3>
              {data.projects.map((proj, i) => (
                <div key={i} className={styles.item}>
                  <div className={styles.itemHeader}>
                    <span className={styles.company}>{proj.name}</span>
                    <span className={styles.dates}>{proj.link}</span>
                  </div>
                  <div className={styles.description}>{proj.description}</div>
                </div>
              ))}
            </section>
          )}

          {data.achievements?.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Achievements</h3>
              <ul className={styles.bullets}>
                {data.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </section>
          )}

          {data.certifications?.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Certifications</h3>
              <div className={styles.skillsList} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {data.certifications.map((c, i) => (
                  <span key={i} className={styles.skillBadge} style={{ background: '#fef2f2', color: '#dc2626' }}>
                    {c.title} {c.issuer && `(@ ${c.issuer})`}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.extracurricular?.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Activities</h3>
              <p className={styles.description}>{data.extracurricular.join(' · ')}</p>
            </section>
          )}

          {(data.customSection?.title || data.customSection?.content) && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>{data.customSection.title || 'Other'}</h3>
              <p className={styles.description} style={{ whiteSpace: 'pre-wrap' }}>{data.customSection.content}</p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
