import { parseBullets, normalizeData } from './TemplateConfig';
import styles from './startup.module.css';

export default function StartupTemplate({ data: rawData }) {
  const data = normalizeData(rawData);
  const { personal, experience, education, skills } = data;

  return (
    <div className={styles.resumeDoc}>
      {/* RESUGROW Watermark */}
      <div className={styles.watermark}>Built with RESUGROW</div>

      <div className={styles.mainColumn}>
        <header className={styles.header}>
          {personal.showPhoto && personal.photo && (
            <img src={personal.photo} alt={personal.fullName || 'Profile'} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', float: 'right', marginLeft: 12, border: '2px solid #e2e8f0' }} />
          )}
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

        {data.projects?.length > 0 && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Projects</h3>
            {data.projects.map((proj, i) => (
              <div key={i} className={styles.experienceItem}>
                <div className={styles.expHeader}>
                  <span className={styles.company}>{proj.name}</span>
                  <span className={styles.dates}>{proj.link}</span>
                </div>
                <p className={styles.bio}>{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {data.achievements?.length > 0 && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Key Achievements</h3>
            <ul className={styles.bullets}>
              {data.achievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </section>
        )}

        {(data.customSection?.title || data.customSection?.content) && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>{data.customSection.title || 'Other Info'}</h3>
            <p className={styles.bio} style={{ whiteSpace: 'pre-wrap' }}>{data.customSection.content}</p>
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

        {data.strengths?.length > 0 && (
          <div className={styles.sideBlock}>
            <h3 className={styles.sideTitle}>Strengths</h3>
            <div className={styles.skillsGrid}>
              {data.strengths.map((s, i) => (
                <span key={i} className={styles.tag} style={{ borderColor: '#10b981', color: '#10b981' }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {data.languages?.length > 0 && (
          <div className={styles.sideBlock}>
            <h3 className={styles.sideTitle}>Languages</h3>
            {data.languages.map((l, i) => (
              <div key={i} style={{ fontSize: '12px', marginBottom: '4px', color: '#666' }}>
                {l.name} ({l.proficiency})
              </div>
            ))}
          </div>
        )}

        {data.certifications?.length > 0 && (
          <div className={styles.sideBlock}>
            <h3 className={styles.sideTitle}>Certs</h3>
            {data.certifications.map((c, i) => (
              <div key={i} style={{ fontSize: '12px', marginBottom: '8px', borderLeft: '2px solid #3b82f6', paddingLeft: '8px' }}>
                <div style={{ fontWeight: 600, color: '#333' }}>{c.title}</div>
                {c.issuer && <div style={{ fontSize: '10px' }}>{c.issuer}</div>}
              </div>
            ))}
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
