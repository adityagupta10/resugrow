import { parseBullets, normalizeData } from './TemplateConfig';
import styles from './photo.module.css';

export default function PhotoTemplate({ data: rawData }) {
  const data = normalizeData(rawData);
  const p = data.personal;

  return (
    <div className={styles.doc}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          {p.showPhoto && p.photo && (
            <img
              src={p.photo}
              alt={`${p.fullName || 'Profile'} photo`}
              className={styles.photo}
            />
          )}
          <div className={styles.nameBlock}>
            <h1 className={styles.name}>{p.fullName || 'Your Name'}</h1>
            {p.currentPosition && (
              <p className={styles.position}>{p.currentPosition}</p>
            )}
          </div>
        </div>
        <div className={styles.contact}>
          {p.email    && <span>{p.email}</span>}
          {p.phone    && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
          {p.website  && <span>{p.website}</span>}
        </div>
      </div>

      {/* ── Body ── */}
      <div className={styles.body}>
        {/* Summary */}
        {p.summary && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Professional Summary</h2>
            <p className={styles.text}>{p.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Work Experience</h2>
            {data.experience.map((exp) => {
              const bullets = parseBullets(exp.description);
              return (
                <div key={exp.id} className={styles.entry}>
                  <div className={styles.entryHeader}>
                    <div>
                      <strong className={styles.entryTitle}>{exp.position || 'Position'}</strong>
                      {exp.company && <span className={styles.entryCompany}> @ {exp.company}</span>}
                    </div>
                    <span className={styles.entryDate}>
                      {exp.startDate}{(exp.startDate || exp.endDate || exp.current) ? ' – ' : ''}
                      {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {bullets.length > 0 && (
                    <ul className={styles.bullets}>
                      {bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <div>
                    <strong className={styles.entryTitle}>{edu.institution || 'Institution'}</strong>
                    <span className={styles.entryCompany}> — {edu.degree}{edu.field ? `, ${edu.field}` : ''}</span>
                  </div>
                  <span className={styles.entryDate}>
                    {edu.startDate}{(edu.startDate || edu.endDate) ? ' – ' : ''}{edu.endDate}
                  </span>
                </div>
                {edu.gpa && <p className={styles.text} style={{ marginTop: 2 }}>GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Projects</h2>
            {data.projects.map((proj) => {
              const bullets = parseBullets(proj.description);
              return (
                <div key={proj.id} className={styles.entry}>
                  <div className={styles.entryHeader}>
                    <strong className={styles.entryTitle}>{proj.name || 'Project'}</strong>
                    {proj.link && <span className={styles.entryDate}>{proj.link}</span>}
                  </div>
                  {bullets.length > 0 && (
                    <ul className={styles.bullets}>
                      {bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Skills</h2>
            <div className={styles.tags}>
              {data.skills.map((s, i) => <span key={i} className={styles.tag}>{s}</span>)}
            </div>
          </div>
        )}

        {/* Strengths */}
        {data.strengths.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Strengths</h2>
            <div className={styles.tags}>
              {data.strengths.map((s, i) => <span key={i} className={styles.tag}>{s}</span>)}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Certifications</h2>
            {data.certifications.map((c, i) => (
              <div key={c.id || i} className={styles.certEntry}>
                <strong className={styles.certTitle}>{c.title || 'Certification'}</strong>
                {c.issuer && <span className={styles.certIssuer}> — {c.issuer}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Achievements */}
        {data.achievements.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Key Achievements</h2>
            <div className={styles.tags}>
              {data.achievements.map((a, i) => <span key={i} className={styles.tag}>{a}</span>)}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Languages</h2>
            <div className={styles.tags}>
              {data.languages.map((l, i) => (
                <span key={i} className={styles.tag}>{l.name}{l.proficiency ? ` (${l.proficiency})` : ''}</span>
              ))}
            </div>
          </div>
        )}

        {/* Extra-curricular */}
        {data.extracurricular.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Activities</h2>
            <p className={styles.text}>{data.extracurricular.join(' · ')}</p>
          </div>
        )}

        {/* Custom */}
        {(data.customSection.title || data.customSection.content) && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{data.customSection.title || 'Additional'}</h2>
            <p className={styles.text} style={{ whiteSpace: 'pre-wrap' }}>{data.customSection.content}</p>
          </div>
        )}
      </div>
    </div>
  );
}
