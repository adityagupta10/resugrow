import Link from 'next/link';
import { createPageMetadata, getFaqJsonLd, getBreadcrumbJsonLd, SITE_URL } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'ResuGrow vs Canva vs Google Docs Resume Builder (2025 Comparison)',
  description:
    'Comparing ResuGrow, Canva resume, Google Docs resume templates, and Indeed resume builder. Which free resume builder actually gets you hired in 2025?',
  path: '/blog/resugrow-vs-canva-google-docs',
  keywords: [
    'canva resume', 'google docs resume', 'indeed resume', 'resume builder free',
    'free resume builder', 'ai resume builder', 'best resume builder',
    'google docs resume template', 'canva resume template', 'resume maker',
    'resume now', 'resume builder comparison',
  ],
  imageAlt: 'ResuGrow vs Canva vs Google Docs resume builder comparison 2025',
});

const faqs = [
  {
    q: 'Is Canva good for making a resume?',
    a: 'Canva produces visually attractive resumes, but most Canva templates use multi-column layouts, text boxes, and graphics that ATS systems cannot parse. If you\'re applying through an online portal, a Canva resume will likely be rejected before a human sees it.',
  },
  {
    q: 'Can I use Google Docs to make a resume?',
    a: 'Yes, and Google Docs resumes are ATS-safe because they export as clean text. The limitation is that Google Docs offers no keyword analysis, no ATS scoring, and no AI suggestions — you\'re on your own for content quality.',
  },
  {
    q: 'Is Indeed resume builder free?',
    a: 'Indeed\'s resume builder is free and creates a basic resume stored on Indeed\'s platform. The downside is that it\'s tied to Indeed\'s ecosystem and offers limited customization and no ATS optimization feedback.',
  },
  {
    q: 'What is the best free AI resume builder in 2025?',
    a: 'ResuGrow offers a free AI resume builder with real-time ATS scoring, keyword gap analysis, and AI-powered bullet suggestions — features that Canva, Google Docs, and Indeed do not provide.',
  },
];

const tools = [
  {
    name: 'ResuGrow',
    tagline: 'AI-powered, ATS-optimized',
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe',
    pros: [
      'Real-time ATS score (0–100) as you type',
      'AI bullet suggestions and SAR rewriter',
      'Keyword gap analysis vs job description',
      'ATS-safe single-column templates',
      'LinkedIn profile scorer included',
      'Free to use — no credit card',
    ],
    cons: [
      'Fewer purely decorative design options',
      'Best for job applications, not portfolios',
    ],
    verdict: 'Best for getting past ATS filters and landing interviews',
    href: '/resume/builder',
    cta: 'Try ResuGrow Free',
  },
  {
    name: 'Canva Resume',
    tagline: 'Design-first, ATS-last',
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    pros: [
      'Beautiful visual templates',
      'Easy drag-and-drop editor',
      'Good for creative portfolios',
    ],
    cons: [
      'Multi-column layouts fail ATS parsing',
      'Text boxes and graphics are unreadable by bots',
      'No keyword analysis or ATS scoring',
      'No AI content suggestions',
      'PDFs often export with scrambled text order',
    ],
    verdict: 'Good for design portfolios, risky for corporate job applications',
    href: '/resume/builder',
    cta: 'Switch to ATS-Safe Builder',
  },
  {
    name: 'Google Docs Resume',
    tagline: 'Safe but manual',
    color: '#059669',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    pros: [
      'ATS-safe plain text output',
      'Free and universally accessible',
      'Easy to share and collaborate',
    ],
    cons: [
      'No ATS scoring or keyword feedback',
      'No AI content suggestions',
      'Limited template variety',
      'Manual formatting is time-consuming',
      'No job description matching',
    ],
    verdict: 'Safe choice but leaves all the hard work to you',
    href: '/resume/builder',
    cta: 'Upgrade to AI Builder',
  },
  {
    name: 'Indeed Resume',
    tagline: 'Convenient but locked in',
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    pros: [
      'Free and quick to set up',
      'Directly visible to Indeed recruiters',
      'Simple interface',
    ],
    cons: [
      'Locked to Indeed\'s platform',
      'Very limited customization',
      'No ATS optimization tools',
      'Not portable to other job boards',
      'No AI suggestions or scoring',
    ],
    verdict: 'Convenient for Indeed applications only — not a full resume strategy',
    href: '/resume/builder',
    cta: 'Build a Portable Resume',
  },
];

export default function ComparisonPage() {
  const faqSchema = getFaqJsonLd(faqs);
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: 'ResuGrow vs Canva vs Google Docs', url: `${SITE_URL}/blog/resugrow-vs-canva-google-docs` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px 80px' }}>

        <nav style={{ fontSize: '13px', color: '#64748b', marginBottom: '32px' }}>
          <Link href="/" style={{ color: '#2563eb' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <Link href="/blog" style={{ color: '#2563eb' }}>Blog</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>ResuGrow vs Canva vs Google Docs</span>
        </nav>

        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: '#2563eb', marginBottom: '16px' }}>
            Tool Comparison · 2025
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '16px' }}>
            ResuGrow vs Canva vs Google Docs Resume Builder: Which One Actually Gets You Hired?
          </h1>
          <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.75, maxWidth: '720px' }}>
            Most job seekers pick a resume tool based on how it looks. But in 2025, 98% of Fortune 500 companies use ATS software that never sees your design — it only reads your text. Here's how the most popular free resume builders stack up where it actually matters.
          </p>
          <div style={{ marginTop: '16px', fontSize: '13px', color: '#64748b' }}>
            By <strong style={{ color: '#374151' }}>Kavya Sharma</strong> · Product Lead, ResuGrow · Updated April 2025
          </div>
        </div>

        {/* The core problem */}
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '24px 28px', marginBottom: '48px' }}>
          <p style={{ fontWeight: 700, color: '#991b1b', marginBottom: '8px', fontSize: '14px' }}>⚠ The Problem Most Resume Builders Ignore</p>
          <p style={{ color: '#7f1d1d', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
            A resume that looks great in Canva or Google Docs can score 0 on an ATS scan. Multi-column layouts, text boxes, icons, and graphics are invisible to ATS parsers. Your beautiful resume gets filed as blank — and you never hear back.
          </p>
        </div>

        {/* Tool cards */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', marginBottom: '28px' }}>The Full Comparison</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {tools.map((tool) => (
              <div key={tool.name} style={{ border: `1px solid ${tool.border}`, borderRadius: '14px', padding: '28px', background: tool.bg }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: tool.color, margin: '0 0 4px' }}>{tool.name}</h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{tool.tagline}</p>
                  </div>
                  <Link href={tool.href} style={{ padding: '8px 18px', background: tool.color, color: 'white', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    {tool.cta}
                  </Link>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Pros</p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {tool.pros.map(p => <li key={p} style={{ fontSize: '13.5px', color: '#374151', display: 'flex', gap: '6px' }}><span style={{ color: '#16a34a', flexShrink: 0 }}>✓</span>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Cons</p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {tool.cons.map(c => <li key={c} style={{ fontSize: '13.5px', color: '#374151', display: 'flex', gap: '6px' }}><span style={{ color: '#dc2626', flexShrink: 0 }}>✗</span>{c}</li>)}
                    </ul>
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', fontWeight: 600, color: tool.color }}>
                  Verdict: {tool.verdict}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq) => (
              <div key={faq.q} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px 22px', background: 'white' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{faq.q}</h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '10px' }}>
            Stop guessing. Start scoring.
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '24px' }}>
            Build an ATS-optimized resume with real-time scoring — free, no sign-up required.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/resume/builder" className="btn btn-primary">Build My Resume Free</Link>
            <Link href="/resume/ats-checker" className="btn btn-secondary" style={{ borderColor: '#475569', color: '#e2e8f0', background: 'rgba(255,255,255,0.05)' }}>
              Check My ATS Score
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
