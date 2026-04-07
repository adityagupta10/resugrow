'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { trackCTA } from '@/lib/analytics';
import { APPLICATION_STATUS_META, APPLICATION_STATUS_ORDER } from '@/lib/applicationTracker';
import styles from './tracker.module.css';

const DEFAULT_FORM = {
  company: '',
  role: '',
  jobUrl: '',
  jdSource: '',
  location: '',
  salaryMin: '',
  salaryMax: '',
  salaryCurrency: 'USD',
  notes: '',
  status: 'DRAFTING',
};

function formatDate(value) {
  if (!value) return 'Not set';
  return new Date(value).toLocaleDateString();
}

function formatSalary(application) {
  if (!application.salaryMin && !application.salaryMax) return 'Salary not added';
  const currency = application.salaryCurrency || 'USD';
  const left = application.salaryMin ? `${application.salaryMin}` : '?';
  const right = application.salaryMax ? `${application.salaryMax}` : '?';
  return `${currency} ${left}-${right}`;
}

function MetricCard({ label, value, helper }) {
  return (
    <div className={styles.metricCard}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{helper}</small>
    </div>
  );
}

export default function ApplicationTrackerClient() {
  const [applications, setApplications] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(DEFAULT_FORM);
  const [selectedId, setSelectedId] = useState(null);
  const [draggedId, setDraggedId] = useState(null);
  const editorRef = useRef(null);
  const shouldScrollToEditorRef = useRef(false);

  const selectedApplication = useMemo(
    () => applications.find((application) => application.id === selectedId) || null,
    [applications, selectedId],
  );

  async function loadApplications() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/applications');
      const data = await response.json();
      if (!response.ok || data.error) {
        setError(data.error || 'Failed to load your applications.');
        return;
      }
      setApplications(data.applications || []);
      setAnalytics(data.analytics || null);
      if (!selectedId && data.applications?.length) {
        setSelectedId(data.applications[0].id);
      }
    } catch (requestError) {
      console.error('Load applications failed:', requestError);
      setError('Unable to load applications right now.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    if (!selectedId || !shouldScrollToEditorRef.current) return;

    shouldScrollToEditorRef.current = false;
    requestAnimationFrame(() => {
      editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [selectedId]);

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSelectApplication(id, scrollToEditor = false) {
    shouldScrollToEditorRef.current = scrollToEditor;
    setSelectedId(id);
  }

  async function handleCreate() {
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        setError(data.error || 'Failed to create application.');
        return;
      }
      setForm(DEFAULT_FORM);
      await loadApplications();
      handleSelectApplication(data.application.id, true);
      trackCTA('application_created', 'Application Tracker', 'create_form');
    } catch (requestError) {
      console.error('Create application failed:', requestError);
      setError('Unable to create application right now.');
    } finally {
      setSubmitting(false);
    }
  }

  async function updateApplication(id, patch, trackingName = 'application_updated') {
    setError('');
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        setError(data.error || 'Failed to update application.');
        return false;
      }
      setApplications((prev) =>
        prev.map((application) => (application.id === id ? data.application : application)),
      );
      await loadApplications();
      trackCTA(trackingName, 'Application Tracker', 'kanban');
      return true;
    } catch (requestError) {
      console.error('Update application failed:', requestError);
      setError('Unable to update application right now.');
      return false;
    }
  }

  async function handleDelete(id) {
    setError('');
    try {
      const response = await fetch(`/api/applications/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok || data.error) {
        setError(data.error || 'Failed to delete application.');
        return;
      }
      setApplications((prev) => prev.filter((application) => application.id !== id));
      if (selectedId === id) {
        setSelectedId(null);
      }
      await loadApplications();
      trackCTA('application_deleted', 'Application Tracker', 'editor');
    } catch (requestError) {
      console.error('Delete application failed:', requestError);
      setError('Unable to delete application right now.');
    }
  }

  const groupedApplications = useMemo(() => {
    const map = Object.fromEntries(APPLICATION_STATUS_ORDER.map((status) => [status, []]));
    applications.forEach((application) => {
      if (!map[application.status]) map[application.status] = [];
      map[application.status].push(application);
    });
    return map;
  }, [applications]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <p className={styles.kicker}>Job Search OS</p>
          <h1>Application Tracker Dashboard</h1>
          <p className={styles.subtitle}>
            Track every role like a pipeline, move applications across stages, and measure the health
            of your job search with real funnel analytics.
          </p>
        </div>
        <a href="/resume/builder" className={`btn btn-primary ${styles.headerCta}`}>
          Build New Resume
        </a>
      </div>

      {analytics ? (
        <div className={styles.metricsGrid}>
          <MetricCard label="Applications tracked" value={analytics.totalTracked} helper="All cards across your board" />
          <MetricCard label="Response rate" value={`${analytics.responseRate}%`} helper="Reached screening or beyond" />
          <MetricCard label="Interview rate" value={`${analytics.interviewRate}%`} helper="Reached interview or offer" />
          <MetricCard label="Win rate" value={`${analytics.winRate}%`} helper="Offers per submitted application" />
          <MetricCard label="Time to response" value={analytics.avgTimeToResponse ? `${analytics.avgTimeToResponse} days` : '—'} helper="Average first response time" />
        </div>
      ) : null}

      {error ? <p className={styles.error}>{error}</p> : null}

      <div className={styles.topGrid}>
        <section className={styles.formPanel}>
          <div className={styles.sectionHeader}>
            <h2>Add application</h2>
            <p>Log each application once, then update status by drag and drop.</p>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>Company</label>
              <input value={form.company} onChange={(event) => setField('company', event.target.value)} className={styles.input} placeholder="e.g. Stripe" />
            </div>
            <div className={styles.field}>
              <label>Role</label>
              <input value={form.role} onChange={(event) => setField('role', event.target.value)} className={styles.input} placeholder="e.g. Product Manager" />
            </div>
            <div className={styles.field}>
              <label>Status</label>
              <select value={form.status} onChange={(event) => setField('status', event.target.value)} className={styles.input}>
                {APPLICATION_STATUS_ORDER.map((status) => (
                  <option key={status} value={status}>{APPLICATION_STATUS_META[status].label}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label>Location</label>
              <input value={form.location} onChange={(event) => setField('location', event.target.value)} className={styles.input} placeholder="Remote / Bangalore / London" />
            </div>
            <div className={styles.field}>
              <label>JD Link</label>
              <input value={form.jobUrl} onChange={(event) => setField('jobUrl', event.target.value)} className={styles.input} placeholder="https://..." />
            </div>
            <div className={styles.field}>
              <label>Source</label>
              <input value={form.jdSource} onChange={(event) => setField('jdSource', event.target.value)} className={styles.input} placeholder="LinkedIn / Careers page" />
            </div>
            <div className={styles.field}>
              <label>Salary Min</label>
              <input value={form.salaryMin} onChange={(event) => setField('salaryMin', event.target.value)} className={styles.input} type="number" placeholder="20" />
            </div>
            <div className={styles.field}>
              <label>Salary Max</label>
              <input value={form.salaryMax} onChange={(event) => setField('salaryMax', event.target.value)} className={styles.input} type="number" placeholder="35" />
            </div>
            <div className={styles.field}>
              <label>Currency</label>
              <select value={form.salaryCurrency} onChange={(event) => setField('salaryCurrency', event.target.value)} className={styles.input}>
                {['USD', 'INR', 'GBP', 'EUR', 'SGD'].map((currency) => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
            <div className={`${styles.field} ${styles.fullSpan}`}>
              <label>Notes</label>
              <textarea value={form.notes} onChange={(event) => setField('notes', event.target.value)} className={styles.textarea} rows={4} placeholder="Add recruiter notes, role angle, interview reminders, or follow-up context." />
            </div>
          </div>

          <button type="button" className={styles.primaryBtn} onClick={handleCreate} disabled={submitting}>
            {submitting ? 'Saving...' : 'Add to Tracker'}
          </button>
        </section>

        <section className={styles.insightsPanel}>
          <div className={styles.sectionHeader}>
            <h2>What this board helps you do</h2>
            <p>Use your search funnel like a product system, not a spreadsheet graveyard.</p>
          </div>
          <div className={styles.insightList}>
            <div className={styles.insightCard}>
              <strong>Daily visibility</strong>
              <span>See where momentum is real and where applications are getting stuck.</span>
            </div>
            <div className={styles.insightCard}>
              <strong>Status history</strong>
              <span>Every move is logged, so response-rate and time-to-response metrics stay meaningful.</span>
            </div>
            <div className={styles.insightCard}>
              <strong>Offer funnel</strong>
              <span>Track how many applied roles become actual interviews and offers over time.</span>
            </div>
          </div>
        </section>
      </div>

      <section className={styles.boardSection}>
        <div className={styles.sectionHeader}>
          <h2>Kanban pipeline</h2>
          <p>Drag cards between stages to keep your funnel current.</p>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading your applications...</div>
        ) : (
          <div className={styles.board}>
            {APPLICATION_STATUS_ORDER.map((status) => (
              <div
                key={status}
                className={styles.column}
                data-status={status}
                onDragOver={(event) => event.preventDefault()}
                onDrop={async () => {
                  if (!draggedId) return;
                  await updateApplication(draggedId, {
                    status,
                    statusNote: `Moved to ${APPLICATION_STATUS_META[status].label} from board`,
                  }, 'application_status_dragged');
                  setDraggedId(null);
                }}
              >
                <div className={styles.columnHeader}>
                  <div>
                    <strong>{APPLICATION_STATUS_META[status].label}</strong>
                    <span>{APPLICATION_STATUS_META[status].description}</span>
                  </div>
                  <b>{groupedApplications[status]?.length || 0}</b>
                </div>

                <div className={styles.cardStack}>
                  {(groupedApplications[status] || []).map((application) => (
                    <button
                      key={application.id}
                      type="button"
                      draggable
                      className={`${styles.applicationCard} ${selectedId === application.id ? styles.applicationCardActive : ''}`}
                      data-status={application.status}
                      onDragStart={() => setDraggedId(application.id)}
                      onClick={() => handleSelectApplication(application.id, true)}
                    >
                      <div className={styles.cardTop}>
                        <div>
                          <h3>{application.company}</h3>
                          <p>{application.role}</p>
                        </div>
                        <span>{application.statusLabel}</span>
                      </div>
                      <div className={styles.cardMeta}>
                        <span>{application.location || 'Location not set'}</span>
                        <span>{formatSalary(application)}</span>
                      </div>
                      <div className={styles.cardFooter}>
                        <small>Updated {formatDate(application.updatedAt)}</small>
                        {application.jdSource ? <small>{application.jdSource}</small> : null}
                      </div>
                    </button>
                  ))}

                  {(groupedApplications[status] || []).length === 0 ? (
                    <div className={styles.emptyColumn}>No applications here yet.</div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {selectedApplication ? (
        <section className={styles.editorSection} ref={editorRef}>
          <div className={styles.editorHeader}>
            <div>
              <p className={styles.kicker}>Selected application</p>
              <h2>{selectedApplication.company} · {selectedApplication.role}</h2>
            </div>
            <button type="button" className={styles.deleteBtn} onClick={() => handleDelete(selectedApplication.id)}>
              Delete application
            </button>
          </div>

          <div className={styles.editorGrid}>
            <div className={styles.editorCard}>
              <h3>Edit details</h3>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label>Company</label>
                  <input
                    className={styles.input}
                    defaultValue={selectedApplication.company}
                    onBlur={(event) => updateApplication(selectedApplication.id, { ...selectedApplication, company: event.target.value })}
                  />
                </div>
                <div className={styles.field}>
                  <label>Role</label>
                  <input
                    className={styles.input}
                    defaultValue={selectedApplication.role}
                    onBlur={(event) => updateApplication(selectedApplication.id, { ...selectedApplication, role: event.target.value })}
                  />
                </div>
                <div className={styles.field}>
                  <label>Status</label>
                  <select
                    className={styles.input}
                    value={selectedApplication.status}
                    onChange={(event) => updateApplication(selectedApplication.id, { ...selectedApplication, status: event.target.value }, 'application_status_changed')}
                  >
                    {APPLICATION_STATUS_ORDER.map((status) => (
                      <option key={status} value={status}>{APPLICATION_STATUS_META[status].label}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label>Location</label>
                  <input
                    className={styles.input}
                    defaultValue={selectedApplication.location || ''}
                    onBlur={(event) => updateApplication(selectedApplication.id, { ...selectedApplication, location: event.target.value })}
                  />
                </div>
                <div className={styles.field}>
                  <label>JD Link</label>
                  <input
                    className={styles.input}
                    defaultValue={selectedApplication.jobUrl || ''}
                    onBlur={(event) => updateApplication(selectedApplication.id, { ...selectedApplication, jobUrl: event.target.value })}
                  />
                </div>
                <div className={styles.field}>
                  <label>Source</label>
                  <input
                    className={styles.input}
                    defaultValue={selectedApplication.jdSource || ''}
                    onBlur={(event) => updateApplication(selectedApplication.id, { ...selectedApplication, jdSource: event.target.value })}
                  />
                </div>
                <div className={styles.field}>
                  <label>Salary Min</label>
                  <input
                    className={styles.input}
                    type="number"
                    defaultValue={selectedApplication.salaryMin || ''}
                    onBlur={(event) => updateApplication(selectedApplication.id, { ...selectedApplication, salaryMin: event.target.value })}
                  />
                </div>
                <div className={styles.field}>
                  <label>Salary Max</label>
                  <input
                    className={styles.input}
                    type="number"
                    defaultValue={selectedApplication.salaryMax || ''}
                    onBlur={(event) => updateApplication(selectedApplication.id, { ...selectedApplication, salaryMax: event.target.value })}
                  />
                </div>
                <div className={styles.field}>
                  <label>Currency</label>
                  <select
                    className={styles.input}
                    value={selectedApplication.salaryCurrency || 'USD'}
                    onChange={(event) => updateApplication(selectedApplication.id, { ...selectedApplication, salaryCurrency: event.target.value })}
                  >
                    {['USD', 'INR', 'GBP', 'EUR', 'SGD'].map((currency) => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                </div>
                <div className={`${styles.field} ${styles.fullSpan}`}>
                  <label>Notes</label>
                  <textarea
                    className={styles.textarea}
                    rows={5}
                    defaultValue={selectedApplication.notes || ''}
                    onBlur={(event) => updateApplication(selectedApplication.id, { ...selectedApplication, notes: event.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className={styles.timelineCard}>
              <h3>Status history</h3>
              <div className={styles.timeline}>
                {(selectedApplication.events || []).slice().reverse().map((event) => (
                  <div key={event.id} className={styles.timelineItem}>
                    <strong>{APPLICATION_STATUS_META[event.toStatus]?.label || event.toStatus}</strong>
                    <span>{event.note || 'Status updated'}</span>
                    <small>{formatDate(event.createdAt)}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
