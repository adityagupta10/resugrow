import Link from 'next/link';
import { createPageMetadata, getFaqJsonLd, getBreadcrumbJsonLd, SITE_URL } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'RESUGROW vs Canva, Zety, Resume.io & Other Resume Builders',
  description:
    'Compare RESUGROW to other popular resume builders like Canva, Zety, Novoresume, Enhancv, and Resume.io. Learn why RESUGROW is the best ATS-friendly choice for 2026.',
  path: '/resume-builder-comparison',
  keywords: [
    'RESUGROW vs Canva', 'RESUGROW vs Zety', 'RESUGROW vs Resume.io', 'RESUGROW vs Novoresume',
    'RESUGROW vs Enhancv', 'RESUGROW vs Google Docs', 'best resume builder 2026',
    'ATS friendly resume builder', 'free resume builder comparison',
  ],
  imageAlt: 'Resume Builder Comparison Guide',
});

const faqs = [
  {
    q: 'Can I just use Canva to make my resume?',
    a: 'While Canva produces visually stunning resumes, it is notorious for creating documents that Applicant Tracking Systems (ATS) cannot read. The text is often exported as an image layer rather than selectable text. Using Canva risks automatic rejection from corporate jobs.',
  },
  {
    q: 'How does RESUGROW compare to Zety or Resume.io?',
    a: 'Zety and Resume.io are excellent, popular platforms, but they often lock your final PDF behind a paywall after you have spent time building it. RESUGROW aims to offer true transparency with an emphasis on strict ATS parsing and detailed AI analytics that other builders lack.',
  },
  {
    q: 'Why should I use a resume builder instead of Google Docs or Microsoft Word?',
    a: 'You can absolutely use Word or Google Docs! However, a dedicated builder like RESUGROW handles the formatting automatically so your margins don\'t break when you add a new line. Plus, RESUGROW offers integrated AI rewriting, ATS scoring, and keyword optimization builtin.',
  },
  {
    q: 'Is RESUGROW actually ATS-friendly?',
    a: 'Yes. Every template offered by RESUGROW is tested across major Applicant Tracking Systems (like Workday, Taleo, Greenhouse, and Lever) to ensure 100% text parseability, proper heading structures, and correct reading order.',
  },
];

export default function ResumeBuilderComparisonPage() {
  const faqSchema = getFaqJsonLd(faqs);
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'RESUGROW vs Other Builders', url: `${SITE_URL}/resume-builder-comparison` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '60px 24px 80px' }}>

        {/* Breadcrumb */}
        <nav style={{ fontSize: '13px', color: '#64748b', marginBottom: '32px' }}>
          <Link href="/" style={{ color: '#2563eb' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>RESUGROW vs Other Builders</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: '#2563eb', marginBottom: '16px' }}>
            Comparison Guide
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '16px' }}>
            RESUGROW vs Canva, Zety, Resume.io <wbr />& Other Resume Builders
          </h1>
          <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, maxWidth: '680px' }}>
            Are you using the right tool for your next career move? See how RESUGROW stacks up against the biggest names in the industry—from graphic design tools to traditional document editors.
          </p>
        </div>

        {/* Content Section */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>Why the Tool You Use Matters</h2>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.8, marginBottom: '16px' }}>
            The resume builder market is crowded with names like <strong>Zety, Canva, Resume.io, Novoresume, Enhancv</strong>, and of course, the traditional <strong>Google Docs</strong> and <strong>Microsoft Word</strong>.
          </p>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.8, marginBottom: '16px' }}>
            However, not all resumes are created equal. Some focus heavily on visual design at the expense of automated parseability. Others are great for standard text but lack the AI tools needed to optimize your content for modern job postings.
          </p>
        </section>

        {/* Comparison Breakdowns */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>How RESUGROW Compares to the Competition</h2>

          <div style={{ display: 'grid', gap: '24px' }}>
            {/* Canva */}
            <div style={{ background: '#f8fafc', borderLeft: '4px solid #2563eb', padding: '24px', borderRadius: '0 8px 8px 0' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>RESUGROW vs Canva</h3>
              <p style={{ fontSize: '15px', color: '#475569', margin: '0 0 12px 0', lineHeight: 1.6 }}>
                <strong>Canva</strong> is a premier graphic design tool, incredibly popular for its beautiful, highly-styled resume templates.
              </p>
              <p style={{ fontSize: '15px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                <strong>The Difference:</strong> Canva is design-first. Because it treats text as graphics on a canvas, the PDFs it exports often fail Applicant Tracking Systems (ATS). The software scrambles the text or misses sections entirely. <strong>RESUGROW</strong> is engineering-first—it generates perfectly structured HTML-to-PDF that guarantees 100% ATS readability, while still looking professional.
              </p>
            </div>

            {/* Zety & Resume.io */}
            <div style={{ background: '#f8fafc', borderLeft: '4px solid #0891b2', padding: '24px', borderRadius: '0 8px 8px 0' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>RESUGROW vs Zety & Resume.io</h3>
              <p style={{ fontSize: '15px', color: '#475569', margin: '0 0 12px 0', lineHeight: 1.6 }}>
                <strong>Zety</strong> and <strong>Resume.io</strong> are massive, highly polished commercial resume builders with millions of users and great template libraries.
              </p>
              <p style={{ fontSize: '15px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                <strong>The Difference:</strong> The most common complaint about these platforms is their aggressive paywalls—often restricting you from downloading the resume you just spent an hour building unless you pay a subscription fee. <strong>RESUGROW</strong> focuses on a transparent, AI-driven experience heavily geared toward modern technical, corporate, and executive roles.
              </p>
            </div>

            {/* Novoresume & Enhancv */}
            <div style={{ background: '#f8fafc', borderLeft: '4px solid #16a34a', padding: '24px', borderRadius: '0 8px 8px 0' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>RESUGROW vs Novoresume & Enhancv</h3>
              <p style={{ fontSize: '15px', color: '#475569', margin: '0 0 12px 0', lineHeight: 1.6 }}>
                <strong>Novoresume</strong> and <strong>Enhancv</strong> offer unique, colorful, single-page formats with progress bars, icons, and non-traditional layouts.
              </p>
              <p style={{ fontSize: '15px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                <strong>The Difference:</strong> Both platforms lean into modern, European-style CV aesthetics. However, many US-based corporate recruiters and ATS systems specifically advise against rating bars (e.g., "4/5 stars in Python") and multi-column icon layouts. <strong>RESUGROW</strong> strictly enforces formats that align with North American hiring standard practices.
              </p>
            </div>

            {/* Google Docs & Word */}
            <div style={{ background: '#f8fafc', borderLeft: '4px solid #d97706', padding: '24px', borderRadius: '0 8px 8px 0' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>RESUGROW vs Google Docs / MS Word</h3>
              <p style={{ fontSize: '15px', color: '#475569', margin: '0 0 12px 0', lineHeight: 1.6 }}>
                <strong>Google Docs</strong> and <strong>Microsoft Word</strong> are the traditional standards. They are free, universally accessible, and naturally ATS friendly (if formatted correctly).
              </p>
              <p style={{ fontSize: '15px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                <strong>The Difference:</strong> Formatting a resume in Word or Docs is famously frustrating; adding one line or changing a font can break the entire layout, spilling your resume onto an ugly second page. <strong>RESUGROW</strong> handles all layout, spacing, and pagination mathematically behind the scenes, so you just type content. Plus, you gain access to our integrated AI ATS scorer.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq) => (
              <div key={faq.q} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px 24px', background: 'white' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{faq.q}</h3>
                <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1e40af, #2563eb)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'white', marginBottom: '12px' }}>
            Stop fighting with formatting.
          </h2>
          <p style={{ color: '#bfdbfe', fontSize: '15px', marginBottom: '24px' }}>
            Create an expertly structured, ATS-compliant resume in less than 15 minutes with RESUGROW.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/resume/builder" className="btn btn-primary" style={{ background: 'white', color: '#1d4ed8', fontWeight: 700 }}>
              Try RESUGROW Free
            </Link>
            <Link href="/resume/templates" className="btn btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white', background: 'rgba(255,255,255,0.1)' }}>
              View Templates
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
