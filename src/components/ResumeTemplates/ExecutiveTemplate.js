import { parseBullets, normalizeData } from './TemplateConfig';
import styles from './executive.module.css';

export default function ExecutiveTemplate({ data: rawData }) {
  const data = normalizeData(rawData);
  const p = data.personal;
  return (
    <div className={styles.resumeDoc}>
      {/* RESUGROW Watermark */}
      <div className={styles.watermark}>Built with RESUGROW</div>

      <header className={styles.header}>
        {p.showPhoto && p.photo && (
          <img src={p.photo} alt={p.fullName || 'Profile'} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', float: 'right', marginLeft: 16, border: '2px solid rgba(255,255,255,0.3)' }} />
        )}
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
          <p className={styles.bodyText}>{data.skills.join(' • ')}</p>
        </section>
      )}

      {data.strengths?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Core Strengths</h2>
          <p className={styles.bodyText}>{data.strengths.join(' • ')}</p>
        </section>
      )}

      {data.projects?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          {data.projects.map((proj, i) => (
            <div key={i} className={styles.entry}>
              <div className={styles.entryTop}>
                <strong>{proj.name}</strong>
                {proj.link && <span className={styles.link}>{proj.link}</span>}
              </div>
              <p className={styles.bodyText}>{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.achievements?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Key Achievements</h2>
          <ul className={styles.list}>
            {data.achievements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      )}

      {data.certifications?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Certifications</h2>
          {data.certifications.map((c, i) => (
            <div key={i} className={styles.entry}>
              <div className={styles.entryTop}>
                <strong>{c.title}</strong>
                {c.issuer && <span className={styles.company}>{c.issuer}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {(data.languages?.length > 0 || data.extracurricular?.length > 0) && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Additional Information</h2>
          {data.languages?.length > 0 && (
            <p className={styles.bodyText}>
              <strong>Languages:</strong> {data.languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}
            </p>
          )}
          {data.extracurricular?.length > 0 && (
            <p className={styles.bodyText}>
              <strong>Activities:</strong> {data.extracurricular.join(' • ')}
            </p>
          )}
        </section>
      )}

      {(data.customSection?.title || data.customSection?.content) && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{data.customSection.title || 'Other Information'}</h2>
          <p className={styles.bodyText} style={{ whiteSpace: 'pre-wrap' }}>{data.customSection.content}</p>
        </section>
      )}
    </div>
  );
}
