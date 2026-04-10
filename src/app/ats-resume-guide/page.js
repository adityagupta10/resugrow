import Link from 'next/link';
import { createPageMetadata, getFaqJsonLd, getBreadcrumbJsonLd, SITE_URL } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'What is an ATS Resume? The Complete ATS Resume Guide (2026)',
  description:
    'Learn what an Applicant Tracking System (ATS) is, how ATS formatting works, and exactly how to write an ATS-friendly resume to beat the bots and get hired.',
  path: '/ats-resume-guide',
  keywords: [
    'ATS resume', 'applicant tracking system resume', 'ATS friendly resume',
    'how to beat ATS', 'ATS resume format', 'ATS optimization',
    'what is ATS', 'pass ATS scan', 'ATS keywords',
  ],
  imageAlt: 'ATS Resume Guide',
});

const faqs = [
  {
    q: 'What does ATS mean?',
    a: 'ATS stands for Applicant Tracking System. It is software used by employers to collect, scan, sort, and rank job applications. Over 98% of Fortune 500 companies use an ATS.',
  },
  {
    q: 'Why do companies use ATS?',
    a: 'Corporate job postings frequently receive hundreds or thousands of applicants. Human recruiters physically cannot read every resume. An ATS parses the resumes and filters out unqualified candidates automatically.',
  },
  {
    q: 'What is an ATS-friendly resume?',
    a: 'An ATS-friendly resume uses standard formatting (no complex columns, images, or weird fonts) and includes specific keywords from the job description, ensuring the software can accurately read and rank your experience.',
  },
  {
    q: 'Do ATS robots "auto-reject" resumes?',
    a: 'Not technically. The software parses your resume and ranks it based on relevance (keyword matching). If your resume format is too complex or lacks required keywords, you score low and the recruiter simply never looks at your profile. This acts as an effective "auto-rejection."',
  },
  {
    q: 'Can an ATS read PDF files?',
    a: 'Modern ATS software (like Workday, Greenhouse, and Taleo) can easily read PDF files, provided the PDF contains selectable text. Never upload a scanned image of a resume as a PDF.',
  },
];

export default function AtsResumeGuidePage() {
  const faqSchema = getFaqJsonLd(faqs);
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'ATS Resume Guide', url: `${SITE_URL}/ats-resume-guide` },
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
          <span>ATS Resume Guide</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: '#2563eb', marginBottom: '16px' }}>
            Ultimate Guide
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '16px' }}>
            The Complete ATS Resume Guide (2026)
          </h1>
          <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, maxWidth: '680px' }}>
            Up to 75% of resumes are rejected by Applicant Tracking Systems before a human ever sees them. Learn exactly how the "bots" work and how to format your resume to beat them.
          </p>
        </div>

        {/* The Problem */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>How an ATS Actually Works</h2>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.8, marginBottom: '16px' }}>
            When you apply for a job online, your resume does not go to an inbox. It goes into a database. The <strong>Applicant Tracking System (ATS)</strong> essentially acts as a search engine for recruiters.
          </p>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.8, marginBottom: '16px' }}>
            The parser reads your document top-to-bottom, tries to identify sections (Experience, Education, Skills), extracts the text, and stores your data. Recuiters then search that database for keywords—if the ATS couldn't read your resume, or you didn't include the keywords, you don't appear in the search results.
          </p>
        </section>

        {/* Requirements */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>The 5 Golden Rules of ATS Formatting</h2>

          <div style={{ display: 'grid', gap: '20px' }}>
            <div style={{ background: '#f8fafc', borderLeft: '4px solid #2563eb', padding: '24px', borderRadius: '0 8px 8px 0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>1. No Columns or Tables</h3>
              <p style={{ fontSize: '15px', color: '#475569', margin: 0, lineHeight: 1.6 }}>ATS parsers read left-to-right, top-to-bottom. Multi-column layouts get scrambled, mixing your dates with your bullet points and mangling your experience.</p>
            </div>
            <div style={{ background: '#f8fafc', borderLeft: '4px solid #2563eb', padding: '24px', borderRadius: '0 8px 8px 0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>2. Use Standard Section Headings</h3>
              <p style={{ fontSize: '15px', color: '#475569', margin: 0, lineHeight: 1.6 }}>Use standard titles like "Work Experience", "Education", and "Skills". Don't use cute titles like "My Journey" or "Places I've Conquered"—the ATS won't recognize them.</p>
            </div>
            <div style={{ background: '#f8fafc', borderLeft: '4px solid #2563eb', padding: '24px', borderRadius: '0 8px 8px 0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>3. Avoid Graphics and Icons</h3>
              <p style={{ fontSize: '15px', color: '#475569', margin: 0, lineHeight: 1.6 }}>Icons next to headers or rating bars next to skills are entirely invisible to the ATS. Only text matters.</p>
            </div>
            <div style={{ background: '#f8fafc', borderLeft: '4px solid #2563eb', padding: '24px', borderRadius: '0 8px 8px 0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>4. Mirror Job Description Keywords</h3>
              <p style={{ fontSize: '15px', color: '#475569', margin: 0, lineHeight: 1.6 }}>If the job asks for "Customer Relationship Management," write that exact phrase instead of "CRM". The ATS looks for exact keyword matches.</p>
            </div>
            <div style={{ background: '#f8fafc', borderLeft: '4px solid #2563eb', padding: '24px', borderRadius: '0 8px 8px 0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>5. Stick to standard fonts</h3>
              <p style={{ fontSize: '15px', color: '#475569', margin: 0, lineHeight: 1.6 }}>Use standard Unicode fonts (Arial, Times New Roman, Calibri, Helvetica). Custom or obscure fonts map characters differently and can turn your resume into gibberish.</p>
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
            Generate a 100% ATS-Compliant Resume
          </h2>
          <p style={{ color: '#bfdbfe', fontSize: '15px', marginBottom: '24px' }}>
            All our resume templates are vigorously tested to parse correctly across Workday, Greenhouse, Taleo, and other leading ATS systems.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/resume/builder" className="btn btn-primary" style={{ background: 'white', color: '#1d4ed8', fontWeight: 700 }}>
              Build an ATS Resume
            </Link>
            <Link href="/resume/ats-checker" className="btn btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white', background: 'rgba(255,255,255,0.1)' }}>
              Scan Existing Resume
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
