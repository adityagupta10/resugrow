import Link from 'next/link';
import { ROLE_SUGGESTIONS } from '@/lib/ai-suggestions';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Resume Examples by Job Title (2026) | RESUGROW',
  description:
    'Browse ATS-optimized resume examples for every role — Software Engineer, Product Manager, Marketing, Data Analyst, Sales, HR and more. Free AI resume builder included.',
  path: '/examples',
  keywords: [
    'resume examples', 'cv examples', 'resume example', 'sample resume',
    'resume samples', 'professional resume examples', 'resume by job title',
  ],
});

const roleLabels = {
  developer: { label: 'Software Developer', emoji: '💻', desc: 'React, Node.js, AWS, Docker' },
  product_manager: { label: 'Product Manager', emoji: '📦', desc: 'Roadmapping, JIRA, A/B Testing' },
  marketing: { label: 'Marketing Manager', emoji: '📣', desc: 'SEO, Google Ads, HubSpot' },
  data_analyst: { label: 'Data Analyst', emoji: '📊', desc: 'Python, SQL, Tableau, PowerBI' },
  sales: { label: 'Sales Executive', emoji: '💼', desc: 'Salesforce, CRM, Pipeline Management' },
  hr: { label: 'HR Manager', emoji: '🧩', desc: 'Workday, Talent Acquisition, HRIS' },
};

export default function ExamplesIndexPage() {
  const roles = Object.keys(ROLE_SUGGESTIONS).filter(r => r !== 'general');

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <nav style={{ fontSize: '13px', color: '#64748b', marginBottom: '32px' }}>
        <Link href="/" style={{ color: '#2563eb' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <span>Resume Examples</span>
      </nav>

      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'inline-block', padding: '4px 12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: '#2563eb', marginBottom: '16px' }}>
          2026 Edition
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '16px' }}>
          Resume Examples by Job Title
        </h1>
        <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.75, maxWidth: '640px' }}>
          ATS-tested resume bullets, skills, and summary examples for every role. Pick your job title and get a ready-to-use template in minutes.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px', marginBottom: '56px' }}>
        {roles.map((role) => {
          const meta = roleLabels[role] || { label: role.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), emoji: '📄', desc: ROLE_SUGGESTIONS[role].skills.slice(0, 3).join(', ') };
          return (
            <Link key={role} href={`/examples/${role}`} style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', textDecoration: 'none', transition: 'all 0.15s' }}>
              <span style={{ fontSize: '32px' }}>{meta.emoji}</span>
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>{meta.label} Resume</h2>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{meta.desc}</p>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#2563eb', marginTop: 'auto' }}>View examples →</span>
            </Link>
          );
        })}
      </div>

      <div style={{ background: 'linear-gradient(135deg, #1e40af, #2563eb)', borderRadius: '16px', padding: '36px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>Ready to build yours?</h2>
        <p style={{ color: '#bfdbfe', fontSize: '14px', marginBottom: '20px' }}>Free AI resume builder with real-time ATS scoring.</p>
        <Link href="/resume/builder" className="btn btn-primary" style={{ background: 'white', color: '#1d4ed8', fontWeight: 700 }}>
          Build My Resume Free
        </Link>
      </div>
    </div>
  );
}
