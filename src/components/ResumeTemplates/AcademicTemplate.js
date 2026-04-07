import { parseBullets, normalizeData } from './TemplateConfig';
import styles from './academic.module.css';

export default function AcademicTemplate({ data: rawData }) {
  const data = normalizeData(rawData);
  const { personal, experience, education, skills, certifications } = data;
  const projects = data.projects;

  return (
    <div className={styles.container}>
      {/* RESUGROW Watermark */}
      <div className={styles.watermark}>Built with RESUGROW</div>

      <header className={styles.header}>
        {personal.showPhoto && personal.photo && (
          <img src={personal.photo} alt={personal.fullName || 'Profile'} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', float: 'right', marginLeft: 16, border: '2px solid #e2e8f0' }} />
        )}
        <h1 className={styles.name}>{personal.fullName || 'Your Name'}</h1>
        <div className={styles.contactInfo}>
          {personal.email} | {personal.phone} | {personal.location}
          {personal.linkedin && ` | LinkedIn: ${personal.linkedin}`}
          {personal.website && ` | Web: ${personal.website}`}
        </div>
      </header>

      {personal.summary && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>I. PROFESSIONAL PROFILE</h2>
          <p className={styles.summary}>{personal.summary}</p>
        </section>
      )}

      {experience?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>II. RESEARCH & PROFESSIONAL EXPERIENCE</h2>
          {experience.map((exp, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.company}>{exp.company}</span>
                <span className={styles.dates}>{exp.startDate} – {exp.endDate}</span>
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
          <h2 className={styles.sectionTitle}>III. ACADEMIC QUALIFICATIONS</h2>
          {education.map((edu, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.company}>{edu.institution}</span>
                <span className={styles.dates}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <div className={styles.position}>{edu.degree} {edu.field && `in ${edu.field}`}</div>
              {edu.gpa && <div className={styles.gpa}>Cumulative GPA: {edu.gpa}</div>}
            </div>
          ))}
        </section>
      )}

      {skills?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>IV. TECHNICAL COMPETENCIES</h2>
          <p className={styles.skillsList}>{skills.join('; ')}</p>
        </section>
      )}

      {certifications?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>V. CERTIFICATIONS & HONORS</h2>
          <ul className={styles.bullets}>
            {certifications.map((c, i) => (
              <li key={i}>{typeof c === 'string' ? c : `${c.title} ${c.issuer ? `(@ ${c.issuer})` : ''}`}</li>
            ))}
          </ul>
        </section>
      )}

      {projects?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>VI. RESEARCH PROJECTS</h2>
          {projects.map((proj, i) => (
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

      {data.achievements?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>VII. KEY ACHIEVEMENTS</h2>
          <ul className={styles.bullets}>
            {data.achievements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      )}

      {data.strengths?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>VIII. PERSONAL STRENGTHS</h2>
          <p className={styles.summary}>{data.strengths.join('; ')}</p>
        </section>
      )}

      {(data.languages?.length > 0 || data.extracurricular?.length > 0) && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>IX. ADDITIONAL FIELDS</h2>
          {data.languages?.length > 0 && (
            <div className={styles.summary}>
              <strong>Languages:</strong> {data.languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}
            </div>
          )}
          {data.extracurricular?.length > 0 && (
            <div className={styles.summary}>
              <strong>Activities:</strong> {data.extracurricular.join('; ')}
            </div>
          )}
        </section>
      )}

      {(data.customSection?.title || data.customSection?.content) && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>X. {data.customSection.title?.toUpperCase() || 'ADDITIONAL INFORMATION'}</h2>
          <p className={styles.summary} style={{ whiteSpace: 'pre-wrap' }}>{data.customSection.content}</p>
        </section>
      )}
    </div>
  );
}
