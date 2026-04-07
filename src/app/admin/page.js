import Link from 'next/link';

const sections = [
  {
    href: '/admin/blog',
    icon: '✍️',
    title: 'Blog Manager',
    desc: 'Create, edit, and publish blog posts. Manage categories, authors, and SEO metadata.',
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe',
    stats: 'Posts · Drafts · Published',
  },
  {
    href: '/admin/community-templates',
    icon: '🎨',
    title: 'Community Templates',
    desc: 'Review, approve, and manage user-submitted resume and cover letter templates.',
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    stats: 'Pending · Approved · Rejected',
  },
];

export default function AdminDashboard() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px' }}>
          Admin Panel
        </p>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
          Welcome back 👋
        </h1>
        <p style={{ fontSize: 15, color: '#64748b', margin: 0 }}>
          Select a section to manage.
        </p>
      </div>

      {/* Section cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 48 }}>
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              background: 'white',
              border: `1px solid ${s.border}`,
              borderRadius: 16,
              padding: 28,
              textDecoration: 'none',
              transition: 'all 0.15s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ width: 52, height: 52, borderRadius: 14, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>
              {s.icon}
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>{s.title}</h2>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, margin: '0 0 14px' }}>{s.desc}</p>
              <span style={{ fontSize: 12, fontWeight: 600, color: s.color, background: s.bg, padding: '4px 10px', borderRadius: 999, border: `1px solid ${s.border}` }}>
                {s.stats}
              </span>
            </div>
            <div style={{ marginTop: 'auto', fontSize: 13, fontWeight: 700, color: s.color, display: 'flex', alignItems: 'center', gap: 4 }}>
              Open {s.title} →
            </div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 14px' }}>
          Quick Links
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {[
            { label: '← Back to Site', href: '/' },
            { label: 'User Dashboard', href: '/dashboard' },
            { label: 'Resume Builder', href: '/resume/builder' },
            { label: 'ATS Checker', href: '/resume/ats-checker' },
            { label: 'Blog (public)', href: '/blog' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ fontSize: 13, fontWeight: 600, color: '#374151', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 14px', textDecoration: 'none' }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
