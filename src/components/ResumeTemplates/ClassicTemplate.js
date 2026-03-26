import styles from './classic.module.css';
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

export default function ClassicTemplate({ data }) {
  const p = data.personal;
  const hasAdditionalInfo = data.languages.length > 0 || data.extracurricular.length > 0;

  return (
    <div className={styles.resumeDoc}>
      <Watermark />
      {/* Header */}
      <div className={styles.resumeHeader}>
        <h1 className={styles.resumeName}>{p.fullName || 'Your Name'}</h1>
        {p.currentPosition && (
          <p className={styles.resumePosition}>{p.currentPosition}</p>
        )}
        <div className={styles.resumeContact}>
          {p.location && <span>{p.location}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.email && <span>{p.email}</span>}
          {p.website && <span>{p.website}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
        </div>
      </div>

      {p.summary && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Summary</h2>
          <p className={styles.resumeText}>{p.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Professional Experience</h2>
          {data.experience.map((exp) => {
            const bullets = parseBullets(exp.description);
            return (
              <div key={exp.id} className={styles.resumeEntry}>
                <div className={styles.resumeEntryHeader}>
                  <div>
                    <strong style={{ fontSize: '13.5px', color: '#1a1a1a' }}>{exp.position || 'Position'}</strong>
                    {exp.company && (
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#2563eb', marginLeft: '6px' }}>
                        @ {exp.company}
                      </span>
                    )}
                  </div>
                  <span className={styles.resumeDate}>
                    {exp.startDate}{(exp.startDate || exp.endDate || exp.current) ? ' — ' : ''}
                    {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {bullets.length > 0 && (
                  <ul className={styles.resumeBulletList}>
                    {bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}

      {data.education.length > 0 && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className={styles.resumeEntry}>
              <div className={styles.resumeEntryHeader}>
                <div>
                  <strong>{edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}</strong>
                </div>
                <span className={styles.resumeDate}>
                  {edu.startDate}{(edu.startDate || edu.endDate) ? ' — ' : ''}{edu.endDate}
                </span>
              </div>
              <div className={styles.resumeCompany}>
                {edu.institution || 'Institution'}
                {edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
              </div>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Technical Skills</h2>
          <div className={styles.resumeSkills}>
            {data.skills.map((skill, i) => (
              <span key={i} className={styles.resumeSkillTag}>{skill}</span>
            ))}
          </div>
        </div>
      )}

      {data.strengths.length > 0 && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Core Strengths</h2>
          <div className={styles.resumeSkills}>
            {data.strengths.map((s, i) => (
              <span key={i} className={styles.resumeSkillTag}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {data.projects.length > 0 && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Projects</h2>
          {data.projects.map((proj) => {
            const bullets = parseBullets(proj.description);
            return (
              <div key={proj.id} className={styles.resumeEntry}>
                <div className={styles.resumeEntryHeader}>
                  <strong>{proj.name || 'Project Name'}</strong>
                  {proj.link && <span className={styles.resumeDate}>{proj.link}</span>}
                </div>
                {bullets.length > 0 && (
                  <ul className={styles.resumeBulletList}>
                    {bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}

      {data.achievements.length > 0 && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Key Achievements</h2>
          <div className={styles.resumeSkills}>
            {data.achievements.map((a, i) => (
              <span key={i} className={styles.resumeSkillTag}>{a}</span>
            ))}
          </div>
        </div>
      )}

      {data.certifications.length > 0 && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Certifications</h2>
          {data.certifications.map((c, i) => (
            <div key={c.id || i} className={styles.resumeCertEntry}>
              <span className={styles.resumeCertTitle}>{c.title || 'Certification'}</span>
              {c.issuer && <span className={styles.resumeCertIssuer}>{c.issuer}</span>}
            </div>
          ))}
        </div>
      )}

      {hasAdditionalInfo && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>Additional Information</h2>
          {data.languages.length > 0 && (
            <div style={{ marginBottom: '6px' }}>
              <strong style={{ fontSize: '12px' }}>Languages: </strong>
              <span style={{ fontSize: '12px' }}>
                {data.languages.map((l, i) => (
                  <span key={i}>
                    {l.name}{l.proficiency ? ` (${l.proficiency})` : ''}{i < data.languages.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </span>
            </div>
          )}
          {data.extracurricular.length > 0 && (
            <div>
              <strong style={{ fontSize: '12px' }}>Activities: </strong>
              <span style={{ fontSize: '12px' }}>{data.extracurricular.join(' · ')}</span>
            </div>
          )}
        </div>
      )}

      {(data.customSection.title || data.customSection.content) && (
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeSectionTitle}>{data.customSection.title || 'Custom Section'}</h2>
          <p className={styles.resumeText} style={{ whiteSpace: 'pre-wrap' }}>{data.customSection.content}</p>
        </div>
      )}
    </div>
  );
}
