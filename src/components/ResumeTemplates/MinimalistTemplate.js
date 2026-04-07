import { parseBullets, normalizeData } from './TemplateConfig';
import styles from './minimalist.module.css';

export default function MinimalistTemplate({ data: rawData }) {
  const data = normalizeData(rawData);
  const { personal, experience, education, skills } = data;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {personal.showPhoto && personal.photo && (
          <img src={personal.photo} alt={personal.fullName || 'Profile'} style={{ width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', float: 'right', marginLeft: 12, border: '2px solid #e2e8f0' }} />
        )}
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

          {data.strengths?.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Strengths</h3>
              <ul className={styles.skillsList}>
                {data.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>
          )}

          {data.languages?.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Languages</h3>
              <ul className={styles.skillsList}>
                {data.languages.map((l, i) => (
                  <li key={i}>{l.name} <span style={{ opacity: 0.6 }}>({l.proficiency})</span></li>
                ))}
              </ul>
            </section>
          )}

          {data.certifications?.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Certs</h3>
              <ul className={styles.skillsList}>
                {data.certifications.map((c, i) => (
                  <li key={i}>
                    <strong>{c.title}</strong>
                    {c.issuer && <div style={{ fontSize: '11px', color: '#888' }}>{c.issuer}</div>}
                  </li>
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
              <div className={styles.description}>
                {data.achievements.map((a, i) => (
                  <p key={i}>• {a}</p>
                ))}
              </div>
            </section>
          )}

          {data.extracurricular?.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Activities</h3>
              <div className={styles.description}>
                <p>{data.extracurricular.join(' · ')}</p>
              </div>
            </section>
          )}

          {(data.customSection?.title || data.customSection?.content) && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>{data.customSection.title || 'Other'}</h3>
              <div className={styles.description} style={{ whiteSpace: 'pre-wrap' }}>{data.customSection.content}</div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
