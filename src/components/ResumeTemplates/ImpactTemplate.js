import { parseBullets, normalizeData } from './TemplateConfig';
import styles from './impact.module.css';

export default function ImpactTemplate({ data: rawData }) {
  const data = normalizeData(rawData);
  const { personal, experience, education, skills, achievements } = data;

  return (
    <div className={styles.resumeDoc}>
      {/* RESUGROW Watermark */}
      <div className={styles.watermark}>Built with RESUGROW</div>

      <div className={styles.mainContent}>
        <header className={styles.header}>
          {personal.showPhoto && personal.photo && (
            <img src={personal.photo} alt={personal.fullName || 'Profile'} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', float: 'right', marginLeft: 16, border: '2px solid rgba(255,255,255,0.2)' }} />
          )}
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

        {data.projects?.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Strategic Projects</h2>
            {data.projects.map((proj, i) => (
              <div key={i} className={styles.item}>
                <div className={styles.itemHeader}>
                  <span className={styles.company}>{proj.name}</span>
                  <span className={styles.dates}>{proj.link}</span>
                </div>
                <p className={styles.summary}>{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {(data.customSection?.title || data.customSection?.content) && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{data.customSection.title || 'Additional Value'}</h2>
            <p className={styles.summary} style={{ whiteSpace: 'pre-wrap' }}>{data.customSection.content}</p>
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

        {data.strengths?.length > 0 && (
          <div className={styles.sideBlock}>
            <h3 className={styles.sideTitle}>Strengths</h3>
            <div className={styles.skillsList}>
              {data.strengths.map((s, i) => (
                <div key={i} className={styles.skillRow}>
                  <span className={styles.skillName}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.certifications?.length > 0 && (
          <div className={styles.sideBlock}>
            <h3 className={styles.sideTitle}>Certifications</h3>
            {data.certifications.map((c, i) => (
              <div key={i} style={{ fontSize: '11px', marginBottom: '6px' }}>
                <div style={{ fontWeight: 600, color: '#fff' }}>{c.title}</div>
                {c.issuer && <div style={{ opacity: 0.7 }}>{c.issuer}</div>}
              </div>
            ))}
          </div>
        )}

        {data.languages?.length > 0 && (
          <div className={styles.sideBlock}>
            <h3 className={styles.sideTitle}>Languages</h3>
            <div style={{ fontSize: '11px', lineHeight: 1.4 }}>
              {data.languages.map(l => `${l.name} (${l.proficiency})`).join(' • ')}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
