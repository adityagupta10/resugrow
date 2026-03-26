import styles from './modern.module.css';
import { parseBullets } from './TemplateConfig';

function Watermark() {
  return (
    <div className={`${styles.watermark} ${styles.noPrint}`}>
      <span>RESUGROW</span>
      <span>RESUGROW</span>
      <span>RESUGROW</span>
    </div>
  );
}

export default function ModernTemplate({ data }) {
  const p = data.personal;

  return (
    <div className={styles.resumeDoc}>
      <Watermark />
      {/* LEFT COLUMN */}
      <div className={styles.leftColumn}>
        <h1 className={styles.name}>{p.fullName || 'Your Name'}</h1>
        {p.currentPosition && <p className={styles.position}>{p.currentPosition}</p>}

        <div className={styles.leftSection}>
          <h2 className={styles.leftTitle}>Contact</h2>
          {p.location && <div className={styles.contactItem}>{p.location}</div>}
          {p.phone && <div className={styles.contactItem}>{p.phone}</div>}
          {p.email && <div className={styles.contactItem}>{p.email}</div>}
          {p.linkedin && <div className={styles.contactItem}>{p.linkedin}</div>}
          {p.website && <div className={styles.contactItem}>{p.website}</div>}
        </div>

        {data.skills.length > 0 && (
          <div className={styles.leftSection}>
            <h2 className={styles.leftTitle}>Skills</h2>
            <div>
              {data.skills.map((skill, i) => (
                <span key={i} className={styles.skillTag}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {data.strengths.length > 0 && (
          <div className={styles.leftSection}>
            <h2 className={styles.leftTitle}>Strengths</h2>
            <div>
              {data.strengths.map((s, i) => (
                <span key={i} className={styles.skillTag}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div className={styles.leftSection}>
            <h2 className={styles.leftTitle}>Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className={styles.eduItem}>
                <div className={styles.eduDegree}>{edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}</div>
                <div className={styles.eduInst}>{edu.institution || 'Institution'}{edu.gpa ? ` (GPA: ${edu.gpa})` : ''}</div>
                <div className={styles.eduDate}>
                  {edu.startDate}{(edu.startDate || edu.endDate) ? ' — ' : ''}{edu.endDate}
                </div>
              </div>
            ))}
          </div>
        )}

        {data.languages.length > 0 && (
          <div className={styles.leftSection}>
            <h2 className={styles.leftTitle}>Languages</h2>
            {data.languages.map((l, i) => (
              <div key={i} className={styles.contactItem}>
                {l.name} {l.proficiency ? <span style={{ opacity: 0.7 }}>({l.proficiency})</span> : ''}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT COLUMN */}
      <div className={styles.rightColumn}>
        {p.summary && (
          <div className={styles.rightSection}>
            <h2 className={styles.rightTitle}>Profile</h2>
            <p className={styles.summaryText}>{p.summary}</p>
          </div>
        )}

        {data.experience.length > 0 && (
          <div className={styles.rightSection}>
            <h2 className={styles.rightTitle}>Experience</h2>
            {data.experience.map((exp) => {
              const bullets = parseBullets(exp.description);
              return (
                <div key={exp.id} className={styles.entry}>
                  <div className={styles.entryHeader}>
                    <div>
                      <span className={styles.entryTitle}>{exp.position || 'Position'}</span>
                      {exp.company && <span className={styles.entryCompany}>@ {exp.company}</span>}
                    </div>
                    <span className={styles.entryDate}>
                      {exp.startDate}{(exp.startDate || exp.endDate || exp.current) ? ' - ' : ''}
                      {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {bullets.length > 0 && (
                    <ul className={styles.bulletList}>
                      {bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {data.projects.length > 0 && (
          <div className={styles.rightSection}>
            <h2 className={styles.rightTitle}>Projects</h2>
            {data.projects.map((proj) => {
              const bullets = parseBullets(proj.description);
              return (
                <div key={proj.id} className={styles.entry}>
                  <div className={styles.entryHeader}>
                    <span className={styles.entryTitle}>{proj.name || 'Project Name'}</span>
                    {proj.link && <span className={styles.entryDate}>{proj.link}</span>}
                  </div>
                  {bullets.length > 0 && (
                    <ul className={styles.bulletList}>
                      {bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {data.achievements.length > 0 && (
          <div className={styles.rightSection}>
            <h2 className={styles.rightTitle}>Achievements</h2>
            <ul className={styles.bulletList} style={{ listStyleType: 'disc' }}>
              {data.achievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}

        {data.certifications.length > 0 && (
          <div className={styles.rightSection}>
            <h2 className={styles.rightTitle}>Certifications</h2>
            <ul className={styles.bulletList} style={{ listStyleType: 'none', paddingLeft: 0 }}>
              {data.certifications.map((c, i) => (
                <li key={c.id || i} style={{ marginBottom: '8px' }}>
                  <strong style={{ color: '#1e293b' }}>{c.title || 'Certification'}</strong>
                  {c.issuer && <div style={{ fontSize: '12px', color: '#64748b' }}>{c.issuer}</div>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.extracurricular.length > 0 && (
          <div className={styles.rightSection}>
            <h2 className={styles.rightTitle}>Activities</h2>
            <p className={styles.summaryText}>{data.extracurricular.join(' · ')}</p>
          </div>
        )}

        {(data.customSection.title || data.customSection.content) && (
          <div className={styles.rightSection}>
            <h2 className={styles.rightTitle}>{data.customSection.title || 'Custom Section'}</h2>
            <p className={styles.summaryText} style={{ whiteSpace: 'pre-wrap' }}>{data.customSection.content}</p>
          </div>
        )}
      </div>
    </div>
  );
}
