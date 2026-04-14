import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ROLE_SUGGESTIONS } from '@/lib/ai-suggestions';
import { DEFAULT_OG_IMAGE, getBreadcrumbJsonLd, getFaqJsonLd, SITE_URL } from '@/lib/seo';

// ── Helpers ───────────────────────────────────────────────────────────────
function formatRole(slug) {
  return slug.replace('-resume', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ── Static params — one page per role ────────────────────────────────────
export function generateStaticParams() {
  return Object.keys(ROLE_SUGGESTIONS).map((role) => ({ role }));
}

// ── Dynamic metadata ──────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { role } = await params;
  const data = ROLE_SUGGESTIONS[role];
  const formattedRole = formatRole(role);

  if (!data) {
    return {
      title: 'Professional Resume Examples & Templates | RESUGROW',
      description: 'Browse professional resume examples for various industries and roles.',
    };
  }

  const topSkills = data.skills.slice(0, 3).join(', ');

  return {
    title: `Best ${formattedRole} Resume Example & Skills for 2026 | RESUGROW`,
    description: `Create a winning ${formattedRole} resume with AI-backed examples. Featuring ${topSkills} and high-impact experience bullets proven to pass ATS filters.`,
    keywords: [
      `${role} resume`, `${role} cv`, `${role} resume example`,
      `${role} skills`, `${formattedRole} resume template`,
      'resume builder', 'ats resume', 'ai resume',
    ],
    alternates: { canonical: `${SITE_URL}/examples/${role}` },
    openGraph: {
      title: `How to Write a ${formattedRole} Resume in 2026`,
      description: `Expert-vetted resume examples and skills for ${formattedRole} professionals. Built for ATS.`,
      url: `${SITE_URL}/examples/${role}`,
      siteName: 'RESUGROW',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${formattedRole} resume example — ResuGrow` }],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${formattedRole} Resume Guide 2026`,
      description: `AI-powered resume examples and skills for ${formattedRole} professionals.`,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────
export default async function RoleExamplePage({ params }) {
  const { role } = await params;
  const data = ROLE_SUGGESTIONS[role];
  if (!data) notFound();

  const formattedRole = formatRole(role);
  const allBullets = [
    ...(data.experience.impact || []),
    ...(data.experience.technical || []),
    ...(data.experience.ownership || []),
  ];

  const faqs = [
    {
      q: `What skills should a ${formattedRole} put on their resume?`,
      a: `The most important skills for a ${formattedRole} resume are: ${data.skills.join(', ')}. Prioritise the ones that appear in the job description and back each one with a measurable result.`,
    },
    {
      q: `How do I write a ${formattedRole} resume summary?`,
      a: data.summary[0] + ' Tailor it to the specific role by mirroring keywords from the job description.',
    },
    {
      q: `What metrics should a ${formattedRole} include on their resume?`,
      a: `${formattedRole} resumes perform best when they quantify impact using metrics like: ${data.metrics.join(', ')}. Every bullet point should answer "so what?" with a number.`,
    },
    {
      q: `How long should a ${formattedRole} resume be?`,
      a: 'For most industry roles, 1 page for under 5 years of experience and 2 pages for 5+ years. Academic or research roles may use a longer CV format.',
    },
  ];

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Resume Examples', url: `${SITE_URL}/examples` },
    { name: `${formattedRole} Resume`, url: `${SITE_URL}/examples/${role}` },
  ]);
  const faqSchema = getFaqJsonLd(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '60px 24px 80px' }}>

        {/* Breadcrumb */}
        <nav style={{ fontSize: '13px', color: '#64748b', marginBottom: '32px' }}>
          <Link href="/" style={{ color: '#2563eb' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <Link href="/examples" style={{ color: '#2563eb' }}>Resume Examples</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>{formattedRole}</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: '#2563eb', marginBottom: '16px' }}>
            Resume Example · 2026
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '16px' }}>
            {formattedRole} Resume Example & Writing Guide
          </h1>
          <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.75, maxWidth: '680px', marginBottom: '24px' }}>
            Real, ATS-tested resume bullets, skills, and summary examples for {formattedRole} professionals — built from patterns that consistently pass recruiter screening in 2026.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/resume/builder" className="btn btn-primary">Build My {formattedRole} Resume</Link>
            <Link href="/resume/ats-checker" className="btn btn-secondary">Check ATS Score</Link>
          </div>
        </div>

        {/* Skills section */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
            Top Skills for a {formattedRole} Resume
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '20px' }}>
            Include these in your Skills section and weave the most relevant ones into your experience bullets.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {data.skills.map((skill) => (
              <span key={skill} style={{ padding: '6px 14px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '999px', fontSize: '14px', fontWeight: 600, color: '#1d4ed8' }}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Summary examples */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
            {formattedRole} Resume Summary Examples
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '20px' }}>
            Pick the one closest to your level and tailor it with your years of experience and top achievement.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data.summary.map((s, i) => (
              <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px 20px', fontSize: '15px', color: '#334155', lineHeight: 1.7, position: 'relative' }}>
                <span style={{ position: 'absolute', top: '12px', right: '14px', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Example {i + 1}</span>
                {s}
              </div>
            ))}
          </div>
        </section>

        {/* Experience bullets */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
            High-Impact {formattedRole} Resume Bullets
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '20px' }}>
            Copy, adapt, and replace the placeholders with your real numbers. Every bullet follows the SAR format: Situation → Action → Result.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {allBullets.map((bullet, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px 16px' }}>
                <span style={{ width: '22px', height: '22px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#2563eb', flexShrink: 0, marginTop: '1px' }}>
                  {i + 1}
                </span>
                <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.65, margin: 0 }}>{bullet}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key metrics */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
            Metrics That Matter for {formattedRole} Resumes
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '20px' }}>
            Recruiters and ATS systems both reward quantified impact. These are the metrics that resonate most for {formattedRole} roles.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {data.metrics.map((m) => (
              <span key={m} style={{ padding: '6px 14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '999px', fontSize: '14px', fontWeight: 600, color: '#15803d', textTransform: 'capitalize' }}>
                {m}
              </span>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq) => (
              <div key={faq.q} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px 22px', background: 'white' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{faq.q}</h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related roles */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
            More Resume Examples
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {Object.keys(ROLE_SUGGESTIONS).filter(r => r !== role && r !== 'general').map((r) => (
              <Link key={r} href={`/examples/${r}`} style={{ padding: '7px 16px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#374151', textDecoration: 'none', transition: 'border-color 0.15s' }}>
                {formatRole(r)} Resume →
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1e40af, #2563eb)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '10px' }}>
            Build your {formattedRole} resume now
          </h2>
          <p style={{ color: '#bfdbfe', fontSize: '15px', marginBottom: '24px' }}>
            Use our free AI builder to create an ATS-optimized {formattedRole} resume in minutes. Real-time scoring included.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/resume/builder" className="btn btn-primary" style={{ background: 'white', color: '#1d4ed8', fontWeight: 700 }}>
              Start Building Free
            </Link>
            <Link href="/resume/ats-checker" className="btn btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white', background: 'rgba(255,255,255,0.1)' }}>
              Check ATS Score
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
