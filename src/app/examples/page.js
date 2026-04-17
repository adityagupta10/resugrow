import Link from 'next/link';
import Image from 'next/image';
import RelatedTools from '@/components/RelatedTools/RelatedTools';
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
  'software-engineer-resume':    { label: 'Software Engineer',        emoji: '/emoji/gear-resume-career-icon.png', desc: 'React, Node.js, AWS, TypeScript, Docker' },
  'product-manager-resume':      { label: 'Product Manager',          emoji: '/emoji/rocket-resume-career-icon.png', desc: 'Roadmapping, JIRA, A/B Testing, SQL' },
  'marketing-manager-resume':    { label: 'Marketing Manager',        emoji: '/emoji/chart-increasing-resume-career-icon.png', desc: 'SEO, Google Ads, HubSpot, Analytics' },
  'data-analyst-resume':         { label: 'Data Analyst',             emoji: '/emoji/bar-chart-resume-career-icon.png', desc: 'Python, SQL, Tableau, PowerBI, Pandas' },
  'sales-executive-resume':      { label: 'Sales Executive',          emoji: '/emoji/briefcase-resume-career-icon.png', desc: 'Salesforce, CRM, Pipeline Management' },
  'hr-manager-resume':           { label: 'HR Manager',               emoji: '/emoji/speech-balloon-resume-career-icon.png', desc: 'Workday, Talent Acquisition, HRIS' },
  'devops-engineer-resume':      { label: 'DevOps Engineer',          emoji: '/emoji/bolt-resume-career-icon.png', desc: 'Kubernetes, Terraform, AWS, CI/CD' },
  'ux-designer-resume':          { label: 'UX Designer',              emoji: '/emoji/magic-wand-resume-career-icon.png', desc: 'Figma, User Research, Design Systems' },
  'project-manager-resume':      { label: 'Project Manager',          emoji: '/emoji/clipboard-resume-career-icon.png', desc: 'Agile, JIRA, Risk Management, PMP' },
  'business-analyst-resume':     { label: 'Business Analyst',         emoji: '/emoji/magnifying-glass-resume-career-icon.png', desc: 'SQL, Requirements Gathering, Process Mapping' },
  'finance-analyst-resume':      { label: 'Finance Analyst',          emoji: '/emoji/credit-card-resume-career-icon.png', desc: 'Excel, Financial Modeling, FP&A, Python' },
  'operations-manager-resume':   { label: 'Operations Manager',       emoji: '/emoji/building-construction-resume-career-icon.png', desc: 'Lean Six Sigma, ERP, KPI Management' },
  'graphic-designer-resume':     { label: 'Graphic Designer',         emoji: '/emoji/puzzle-piece-resume-career-icon.png', desc: 'Adobe Illustrator, Figma, Brand Identity' },
  'customer-success-manager-resume': { label: 'Customer Success Manager', emoji: '/emoji/handshake-resume-career-icon.png', desc: 'Gainsight, Churn Analysis, NPS, QBR' },
  'data-scientist-resume':       { label: 'Data Scientist',           emoji: '/emoji/robot-resume-career-icon.png', desc: 'Python, TensorFlow, ML, SQL, Spark' },
  'content-writer-resume':       { label: 'Content Writer',           emoji: '/emoji/writing-hand-resume-career-icon.png', desc: 'SEO Writing, HubSpot, Ahrefs, Copywriting' },
  'cybersecurity-analyst-resume':{ label: 'Cybersecurity Analyst',    emoji: '/emoji/shield-resume-career-icon.png', desc: 'Splunk, SIEM, Penetration Testing, CISSP' },
};

export default function ExamplesIndexPage() {
  const roles = Object.keys(ROLE_SUGGESTIONS).filter(r => r !== 'general');

  return (
    <>
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
          const meta = roleLabels[role] || { label: role.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), emoji: '/emoji/page-facing-up-resume-career-icon.png', desc: ROLE_SUGGESTIONS[role].skills.slice(0, 3).join(', ') };
          return (
            <Link key={role} href={`/examples/${role}`} style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', textDecoration: 'none', transition: 'all 0.15s' }}>
              <Image src={meta.emoji} alt="" width={44} height={44} style={{ flexShrink: 0, objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(37, 99, 235, 0.1))' }} />
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

      <RelatedTools />
    </>
  );
}
