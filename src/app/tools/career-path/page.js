'use client';

import { useMemo, useState } from 'react';
import { trackCTA } from '@/lib/analytics';
import styles from './page.module.css';

const LOCATION_OPTIONS = [
  { value: 'india', label: 'India' },
  { value: 'usa', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'singapore', label: 'Singapore' },
  { value: 'remote', label: 'Remote / Global' },
];

const TRACK_OPTIONS = [
  { value: 'open', label: 'Open to best fit' },
  { value: 'ic', label: 'Stay on IC track' },
  { value: 'management', label: 'Move toward management' },
  { value: 'specialist', label: 'Deep specialist path' },
  { value: 'hybrid', label: 'Hybrid / cross-functional' },
];

const SAMPLE_PROFILES = [
  {
    label: 'Backend Engineer · 4 years',
    currentRole: 'Backend Engineer',
    yearsExperience: '4',
    location: 'india',
    preferredTrack: 'ic',
    currentSkills: ['Node.js', 'APIs', 'AWS', 'SQL', 'Testing', 'Microservices'],
  },
  {
    label: 'Data Analyst · 3 years',
    currentRole: 'Data Analyst',
    yearsExperience: '3',
    location: 'usa',
    preferredTrack: 'ic',
    currentSkills: ['SQL', 'Excel', 'Tableau', 'Stakeholder Reporting', 'A/B Testing', 'Python'],
  },
  {
    label: 'Growth Marketer · 5 years',
    currentRole: 'Growth Marketing Manager',
    yearsExperience: '5',
    location: 'remote',
    preferredTrack: 'management',
    currentSkills: ['SEO', 'Performance Marketing', 'Lifecycle', 'Analytics', 'Copywriting', 'CRM'],
  },
];

function ScoreBar({ score }) {
  return (
    <div className={styles.scoreBarShell}>
      <div className={styles.scoreBarFill} style={{ width: `${score}%` }} />
    </div>
  );
}

export default function CareerPathPage() {
  const [currentRole, setCurrentRole] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [location, setLocation] = useState('india');
  const [preferredTrack, setPreferredTrack] = useState('open');
  const [skillInput, setSkillInput] = useState('');
  const [currentSkills, setCurrentSkills] = useState([]);
  const [results, setResults] = useState(null);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const activeRole = results?.recommendations?.[activeRoleIndex] || null;

  const marketLabel = useMemo(
    () => LOCATION_OPTIONS.find((option) => option.value === location)?.label || 'India',
    [location],
  );

  function addSkill(rawValue) {
    const value = rawValue.trim();
    if (!value) return;
    if (currentSkills.some((skill) => skill.toLowerCase() === value.toLowerCase())) return;
    setCurrentSkills((prev) => [...prev, value]);
    setSkillInput('');
  }

  function handleSkillKeyDown(event) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      addSkill(skillInput.replace(/,$/, ''));
    }
  }

  function removeSkill(skill) {
    setCurrentSkills((prev) => prev.filter((item) => item !== skill));
  }

  function applySample(sample) {
    setCurrentRole(sample.currentRole);
    setYearsExperience(sample.yearsExperience);
    setLocation(sample.location);
    setPreferredTrack(sample.preferredTrack);
    setCurrentSkills(sample.currentSkills);
    setSkillInput('');
    setResults(null);
    setError('');
  }

  async function handleAnalyze() {
    if (!currentRole.trim()) {
      setError('Please enter your current role.');
      return;
    }
    if (!yearsExperience) {
      setError('Please enter your years of experience.');
      return;
    }
    if (currentSkills.length < 3) {
      setError('Please add at least 3 skills so the analyzer has enough signal.');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await fetch('/api/career-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentRole,
          yearsExperience,
          location,
          preferredTrack,
          currentSkills,
        }),
      });
      const data = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || 'Unable to analyze your career path right now.');
        return;
      }

      setResults(data);
      setActiveRoleIndex(0);
      trackCTA('career_path_analyzed', 'Career Path Simulator', 'tool_submit');
    } catch (requestError) {
      console.error('Career path request failed:', requestError);
      setError('Something went wrong while generating your roadmap. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div data-theme="path" className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Career Intelligence : Growth Planning</p>
          <h1 className={styles.title}>Career Path Simulator & Skill Gap Analyzer</h1>
          <p className={styles.subtitle}>
            Map your realistic next moves, see market salary bands, uncover skill gaps, and get a
            practical 6-12 month roadmap before you start applying.
          </p>
        </section>

        <section className={styles.container}>
          <div className={styles.inputPanel}>
            <div className={styles.formPanel}>
              <div className={styles.panelHeader}>
                <h2>Current profile</h2>
                <p>Tell ResuGrow where you are now so we can model the smartest next step.</p>
              </div>

              <div className={styles.field}>
                <label htmlFor="current-role">Current role</label>
                <input
                  id="current-role"
                  className={styles.textInput}
                  placeholder="e.g. Backend Engineer"
                  value={currentRole}
                  onChange={(event) => setCurrentRole(event.target.value)}
                />
              </div>

              <div className={styles.twoCol}>
                <div className={styles.field}>
                  <label htmlFor="experience-years">Years of experience</label>
                  <input
                    id="experience-years"
                    className={styles.textInput}
                    type="number"
                    min="0"
                    max="30"
                    placeholder="4"
                    value={yearsExperience}
                    onChange={(event) => setYearsExperience(event.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="market">Market</label>
                  <select
                    id="market"
                    className={styles.selectInput}
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                  >
                    {LOCATION_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="track-preference">Preferred track</label>
                <select
                  id="track-preference"
                  className={styles.selectInput}
                  value={preferredTrack}
                  onChange={(event) => setPreferredTrack(event.target.value)}
                >
                  {TRACK_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="skills-input">Current skills</label>
                <div className={styles.skillComposer}>
                  <input
                    id="skills-input"
                    className={styles.textInput}
                    placeholder="Add a skill and press Enter"
                    value={skillInput}
                    onChange={(event) => setSkillInput(event.target.value)}
                    onKeyDown={handleSkillKeyDown}
                  />
                  <button type="button" className={styles.addSkillBtn} onClick={() => addSkill(skillInput)}>
                    Add
                  </button>
                </div>

                <div className={styles.skillCloud}>
                  {currentSkills.map((skill) => (
                    <span key={skill} className={styles.skillChip}>
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <button className={styles.primaryBtn} onClick={handleAnalyze} disabled={loading}>
                {loading ? <span className={styles.spinner} /> : 'Simulate My Next Roles'}
              </button>

              {error ? <p className={styles.errorMsg}>{error}</p> : null}

              <div className={styles.samples}>
                <p>Quick start profiles</p>
                <div className={styles.sampleList}>
                  {SAMPLE_PROFILES.map((sample) => (
                    <button key={sample.label} type="button" className={styles.sampleChip} onClick={() => applySample(sample)}>
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.outputPanel}>
            {!results ? (
              <div className={`${styles.formPanel} ${styles.placeholder}`}>
                <span className={styles.placeholderBadge}>What you will get</span>
                <h3>4-5 realistic next roles with salary bands and a roadmap</h3>
                <p>
                  ResuGrow scores your current profile, finds adjacent career moves, highlights
                  missing capabilities, and turns the gap into a structured growth plan.
                </p>
                <div className={styles.placeholderGrid}>
                  <div className={styles.placeholderCard}>
                    <strong>Role fit</strong>
                    <span>Prioritized next moves, not random titles</span>
                  </div>
                  <div className={styles.placeholderCard}>
                    <strong>Skill gaps</strong>
                    <span>Exact capabilities blocking the jump</span>
                  </div>
                  <div className={styles.placeholderCard}>
                    <strong>Salary view</strong>
                    <span>{marketLabel} market ranges for each move</span>
                  </div>
                  <div className={styles.placeholderCard}>
                    <strong>Roadmap</strong>
                    <span>6-12 month plan to become interview-ready</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.summaryPanel}>
                  <div className={styles.summaryHero}>
                    <div>
                      <p className={styles.summaryKicker}>Current lane</p>
                      <h2>{results.currentProfile.lane}</h2>
                      <p className={styles.summaryText}>
                        Based on your {results.currentProfile.currentRole} background in {results.currentProfile.market},
                        the best immediate move is <strong>{results.summary.bestFitRole}</strong>.
                      </p>
                    </div>
                    <div className={styles.scoreBadge}>
                      <span>{results.summary.bestFitScore}</span>
                      <small>Fit</small>
                    </div>
                  </div>

                  <div className={styles.summaryGrid}>
                    <div className={styles.metricCard}>
                      <span>Best fit role</span>
                      <strong>{results.summary.bestFitRole}</strong>
                    </div>
                    <div className={styles.metricCard}>
                      <span>Biggest gap</span>
                      <strong>{results.summary.biggestGap}</strong>
                    </div>
                    <div className={styles.metricCard}>
                      <span>Estimated move window</span>
                      <strong>{results.summary.timeToMove}</strong>
                    </div>
                  </div>

                  <div className={styles.strengthStrip}>
                    {results.currentProfile.strengths.map((strength) => (
                      <span key={strength}>{strength}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.roleCards}>
                  {results.recommendations.map((role, index) => (
                    <button
                      key={role.title}
                      type="button"
                      className={`${styles.roleCard} ${index === activeRoleIndex ? styles.roleCardActive : ''}`}
                      onClick={() => setActiveRoleIndex(index)}
                    >
                      <div className={styles.roleCardHeader}>
                        <div>
                          <h3>{role.title}</h3>
                          <p>{role.track}</p>
                        </div>
                        <span className={styles.roleScore}>{role.fitScore}</span>
                      </div>
                      <ScoreBar score={role.fitScore} />
                      <div className={styles.roleSalary}>{role.salaryBand}</div>
                    </button>
                  ))}
                </div>

                {activeRole ? (
                  <div className={styles.detailPanel}>
                    <div className={styles.detailHeader}>
                      <div>
                        <p className={styles.summaryKicker}>Selected path</p>
                        <h2>{activeRole.title}</h2>
                        <p className={styles.detailSubtext}>
                          Salary band: <strong>{activeRole.salaryBand}</strong> · Track: <strong>{activeRole.track}</strong>
                        </p>
                      </div>
                      <div className={styles.detailScore}>
                        <span>{activeRole.fitScore}%</span>
                        <small>Readiness</small>
                      </div>
                    </div>

                    <div className={styles.detailGrid}>
                      <div className={styles.detailCard}>
                        <h3>Why this fits</h3>
                        <ul>
                          {activeRole.whyItFits.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className={styles.detailCard}>
                        <h3>What this role expects</h3>
                        <ul>
                          {activeRole.outcomes.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className={styles.skillSection}>
                      <div className={styles.skillPanel}>
                        <h3>Skills already working for you</h3>
                        <div className={styles.tagWrap}>
                          {activeRole.skillsPresent.length ? activeRole.skillsPresent.map((skill) => (
                            <span key={skill} className={styles.goodTag}>{skill}</span>
                          )) : <span className={styles.muted}>No strong overlaps detected yet.</span>}
                        </div>
                      </div>
                      <div className={styles.skillPanel}>
                        <h3>Core gaps to close</h3>
                        <div className={styles.tagWrap}>
                          {activeRole.skillGaps.length ? activeRole.skillGaps.map((skill) => (
                            <span key={skill} className={styles.gapTag}>{skill}</span>
                          )) : <span className={styles.muted}>Your core gaps are already relatively small.</span>}
                        </div>
                      </div>
                    </div>

                    <div className={styles.learningSection}>
                      <h3>Suggested learning path</h3>
                      <div className={styles.learningGrid}>
                        {activeRole.learningPath.map((item) => (
                          <div key={item.title} className={styles.learningCard}>
                            <div className={styles.learningHeader}>
                              <strong>{item.title}</strong>
                              <span>{item.priority}</span>
                            </div>
                            <p>{item.why}</p>
                            <small>{item.proof}</small>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.roadmapSection}>
                      <h3>6-12 month roadmap</h3>
                      <div className={styles.roadmapList}>
                        {activeRole.roadmap.map((phase) => (
                          <div key={phase.phase} className={styles.roadmapCard}>
                            <div className={styles.roadmapPhase}>{phase.phase}</div>
                            <h4>{phase.title}</h4>
                            <ul>
                              {phase.objectives.map((objective) => (
                                <li key={objective}>{objective}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
