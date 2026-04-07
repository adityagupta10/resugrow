'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

const FILTERS = ['ALL', 'PENDING', 'APPROVED', 'REJECTED'];

function statusStyles(status) {
  if (status === 'APPROVED') {
    return { background: '#ecfdf3', color: '#027a48', border: '1px solid #abefc6' };
  }
  if (status === 'REJECTED') {
    return { background: '#fef3f2', color: '#b42318', border: '1px solid #fecdca' };
  }
  return { background: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa' };
}

export default function CommunityTemplatesAdminPage() {
  const [filter, setFilter] = useState('ALL');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notes, setNotes] = useState({});
  const [savingId, setSavingId] = useState('');

  async function loadTemplates(activeFilter = filter) {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/community-templates?status=${encodeURIComponent(activeFilter)}`);
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || 'Failed to load template submissions.');
        return;
      }
      setTemplates(data.templates || []);
      setNotes(
        Object.fromEntries(
          (data.templates || []).map((template) => [template.id, template.moderationNotes || '']),
        ),
      );
    } catch (requestError) {
      console.error('Failed to load template submissions:', requestError);
      setError('Failed to load template submissions.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTemplates(filter);
  }, [filter]);

  const counts = useMemo(() => ({
    all: templates.length,
    pending: templates.filter((item) => item.status === 'PENDING').length,
    approved: templates.filter((item) => item.status === 'APPROVED').length,
    rejected: templates.filter((item) => item.status === 'REJECTED').length,
  }), [templates]);

  async function moderateTemplate(id, status) {
    setSavingId(id);
    try {
      const res = await fetch(`/api/admin/community-templates/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          moderationNotes: notes[id] || '',
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        alert(data.error || 'Unable to update template status.');
        return;
      }
      await loadTemplates(filter);
    } catch (requestError) {
      console.error('Template moderation failed:', requestError);
      alert('Unable to update template status.');
    } finally {
      setSavingId('');
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>Moderate Community Templates</h1>
          <p style={{ margin: '0.5rem 0 0', color: '#64748b', maxWidth: '820px', lineHeight: 1.7 }}>
            Review every creator submission, inspect the rendered preview, and approve or reject it with notes.
            Approved templates go live in the public marketplace immediately.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href="/resume/template-marketplace" className="btn btn-secondary">Marketplace</Link>
          <Link href="/resume/template-marketplace/submit" className="btn btn-primary">Submit Flow</Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          ['Visible in list', counts.all],
          ['Pending', counts.pending],
          ['Approved', counts.approved],
          ['Rejected', counts.rejected],
        ].map(([label, value]) => (
          <div key={label} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem 1.1rem' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7c3aed', fontWeight: 800 }}>{label}</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, marginTop: '0.35rem', color: '#0f172a' }}>{value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              style={{
                borderRadius: '999px',
                padding: '0.6rem 0.95rem',
                border: filter === item ? '1px solid #4f46e5' : '1px solid #cbd5e1',
                background: filter === item ? '#eef2ff' : 'white',
                color: filter === item ? '#4338ca' : '#334155',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <button type="button" className="btn btn-secondary" onClick={() => loadTemplates(filter)}>
          Refresh
        </button>
      </div>

      {error ? (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '14px', padding: '1rem', marginBottom: '1rem' }}>
          {error}
        </div>
      ) : null}

      {loading ? (
        <div style={{ color: '#64748b' }}>Loading template submissions...</div>
      ) : templates.length === 0 ? (
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '2rem', color: '#64748b' }}>
          No template submissions found for this filter.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {templates.map((template) => (
            <div key={template.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '1rem', display: 'grid', gridTemplateColumns: '330px minmax(0, 1fr)', gap: '1rem' }}>
              <div style={{ border: '1px solid #dbe4ff', borderRadius: '16px', overflow: 'hidden', background: '#f8fafc' }}>
                <iframe
                  title={`${template.name} admin preview`}
                  srcDoc={template.previewHtml}
                  sandbox=""
                  style={{ width: '100%', height: '420px', border: 'none', background: 'white' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#0f172a' }}>{template.name}</h2>
                    <p style={{ margin: '0.4rem 0 0', color: '#64748b', lineHeight: 1.7 }}>
                      {template.description}
                    </p>
                  </div>
                  <span style={{ ...statusStyles(template.status), borderRadius: '999px', padding: '0.45rem 0.7rem', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em' }}>
                    {template.status}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.9rem' }}>
                  <span style={{ background: '#f5f3ff', color: '#6d28d9', borderRadius: '999px', padding: '0.45rem 0.65rem', fontSize: '0.72rem', fontWeight: 800 }}>
                    {template.category}
                  </span>
                  {(template.tags || []).map((tag) => (
                    <span key={tag} style={{ background: '#eff6ff', color: '#1d4ed8', borderRadius: '999px', padding: '0.45rem 0.65rem', fontSize: '0.72rem', fontWeight: 700 }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.8rem', marginBottom: '1rem' }}>
                  <div style={{ padding: '0.85rem', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7c3aed', fontWeight: 800 }}>Author</div>
                    <div style={{ marginTop: '0.35rem', color: '#0f172a', fontWeight: 700 }}>{template.authorName}</div>
                    <div style={{ color: '#475569', fontSize: '0.85rem', marginTop: '0.2rem' }}>{template.authorEmail}</div>
                  </div>
                  <div style={{ padding: '0.85rem', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7c3aed', fontWeight: 800 }}>Slug</div>
                    <div style={{ marginTop: '0.35rem', color: '#0f172a', fontWeight: 700 }}>{template.slug}</div>
                  </div>
                  <div style={{ padding: '0.85rem', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7c3aed', fontWeight: 800 }}>Submitted</div>
                    <div style={{ marginTop: '0.35rem', color: '#0f172a', fontWeight: 700 }}>{new Date(template.createdAt).toLocaleString()}</div>
                  </div>
                </div>

                {template.notes ? (
                  <div style={{ marginBottom: '1rem', background: '#eef2ff', color: '#4338ca', border: '1px solid #c7d2fe', borderRadius: '14px', padding: '0.9rem', lineHeight: 1.7 }}>
                    <strong style={{ display: 'block', marginBottom: '0.3rem' }}>Creator notes</strong>
                    {template.notes}
                  </div>
                ) : null}

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#475569', marginBottom: '0.45rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Moderation Notes
                  </label>
                  <textarea
                    value={notes[template.id] || ''}
                    onChange={(event) => setNotes((prev) => ({ ...prev, [template.id]: event.target.value }))}
                    placeholder="Add approval rationale or revision guidance for the creator."
                    style={{ width: '100%', minHeight: '90px', borderRadius: '14px', border: '1px solid #cbd5e1', padding: '0.8rem 0.9rem', fontFamily: 'inherit', fontSize: '0.95rem' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => moderateTemplate(template.id, 'APPROVED')}
                    disabled={savingId === template.id}
                    className="btn btn-primary"
                    style={{ opacity: savingId === template.id ? 0.7 : 1 }}
                  >
                    {savingId === template.id ? 'Saving...' : 'Approve'}
                  </button>
                  <button
                    type="button"
                    onClick={() => moderateTemplate(template.id, 'REJECTED')}
                    disabled={savingId === template.id}
                    className="btn btn-secondary"
                    style={{
                      opacity: savingId === template.id ? 0.7 : 1,
                      background: '#fff1f2',
                      color: '#be123c',
                      borderColor: '#fda4af',
                    }}
                  >
                    Reject
                  </button>
                  {template.status === 'APPROVED' ? (
                    <Link href={`/resume/template-marketplace/${template.slug}`} target="_blank" className="btn btn-secondary">
                      Open Public Page
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
