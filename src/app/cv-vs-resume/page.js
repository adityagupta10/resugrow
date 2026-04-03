import Link from 'next/link';
import { createPageMetadata, getFaqJsonLd, getBreadcrumbJsonLd, SITE_URL } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'CV vs Resume: What\'s the Difference? (2025 Guide)',
  description:
    'CV vs resume — what\'s the difference and which one do you need? Complete guide covering CV meaning, CV format, resume vs CV for jobs, academic CVs, and when to use each.',
  path: '/cv-vs-resume',
  keywords: [
    'cv vs resume', 'resume vs cv', 'what is a cv', 'cv meaning', 'cv definition',
    'is a cv a resume', 'is cv a resume', 'what is cv resume', 'what is a cv vs resume',
    'cv format', 'academic cv', 'cv example', 'cv template', 'cv sample',
    'what does cv mean', 'cv resume', 'resume cv', 'international cv',
  ],
  imageAlt: 'CV vs Resume comparison guide — RESUGROW',
});

const faqs = [
  {
    q: 'Is a CV the same as a resume?',
    a: 'No. A CV (Curriculum Vitae) is a comprehensive document covering your full academic and professional history — typically 2+ pages. A resume is a concise 1–2 page summary tailored to a specific job. In the US and Canada, employers expect a resume. In the UK, Europe, and academia worldwide, a CV is standard.',
  },
  {
    q: 'What does CV stand for?',
    a: 'CV stands for Curriculum Vitae, a Latin phrase meaning "course of life." It is a detailed document listing your education, work experience, publications, awards, and other professional achievements.',
  },
  {
    q: 'When should I use a CV instead of a resume?',
    a: 'Use a CV when applying for academic positions, research roles, grants, fellowships, or jobs outside the US/Canada (especially in the UK, Europe, Australia, and the Middle East). Use a resume for most corporate and industry jobs in North America.',
  },
  {
    q: 'How long should a CV be?',
    a: 'A CV has no strict page limit — it grows with your career. Early-career academics typically have 2–3 page CVs. Senior researchers and professors may have CVs of 10+ pages. A resume, by contrast, should stay at 1–2 pages.',
  },
  {
    q: 'What is a CV in the context of a job application?',
    a: 'In most countries outside North America, "CV" and "resume" are used interchangeably to mean a document summarizing your work experience and qualifications for a job. In the US, "CV" specifically refers to the longer academic format.',
  },
];

const differences = [
  { aspect: 'Length', cv: '2–10+ pages', resume: '1–2 pages' },
  { aspect: 'Purpose', cv: 'Full academic & professional history', resume: 'Targeted snapshot for a specific job' },
  { aspect: 'Used in', cv: 'Academia, research, UK/Europe/Australia', resume: 'Corporate jobs, US/Canada' },
  { aspect: 'Tailored per job?', cv: 'Rarely — stays comprehensive', resume: 'Yes — customized each time' },
  { aspect: 'Includes publications?', cv: 'Yes', resume: 'No' },
  { aspect: 'Photo included?', cv: 'Sometimes (Europe)', resume: 'Never (US/Canada)' },
  { aspect: 'Objective/Summary', cv: 'Optional', resume: 'Recommended' },
];

export default function CVvsResumePage() {
  const faqSchema = getFaqJsonLd(faqs);
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'CV vs Resume', url: `${SITE_URL}/cv-vs-resume` },
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
          <span>CV vs Resume</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: '#2563eb', marginBottom: '16px' }}>
            Career Guide
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '16px' }}>
            CV vs Resume: What's the Difference?
          </h1>
          <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, maxWidth: '680px' }}>
            The terms are used interchangeably in some countries and mean completely different things in others. Here's exactly when to use each — and how to build one that gets you hired.
          </p>
        </div>

        {/* Quick answer box */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '24px 28px', marginBottom: '48px' }}>
          <p style={{ fontWeight: 700, color: '#166534', marginBottom: '8px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Answer</p>
          <p style={{ color: '#15803d', fontSize: '16px', lineHeight: 1.7, margin: 0 }}>
            <strong>In the US and Canada:</strong> a resume is a 1–2 page targeted document; a CV is a long academic document. <strong>Outside North America:</strong> CV and resume mean the same thing — a job application document. Use whichever term the employer uses.
          </p>
        </div>

        {/* What is a CV */}
        <section id="what-is-a-cv" style={{ marginBottom: '48px', scrollMarginTop: '80px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>What is a CV?</h2>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.8, marginBottom: '16px' }}>
            CV stands for <strong>Curriculum Vitae</strong> — Latin for "course of life." It is a comprehensive document that covers your entire academic and professional history: education, work experience, research, publications, presentations, awards, grants, and professional memberships.
          </p>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.8, marginBottom: '16px' }}>
            Unlike a resume, a CV is not tailored to a specific job. It grows throughout your career and can run 2–10+ pages for senior academics and researchers.
          </p>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.8 }}>
            CVs are standard in academia, medicine, research, and for international job applications — particularly in the UK, Europe, Australia, New Zealand, and the Middle East.
          </p>
        </section>

        {/* What is a Resume */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>What is a Resume?</h2>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.8, marginBottom: '16px' }}>
            A resume (from the French <em>résumé</em>, meaning "summary") is a concise 1–2 page document tailored to a specific job application. It highlights your most relevant experience, skills, and achievements — and nothing else.
          </p>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.8 }}>
            Resumes are the standard in the US and Canada for virtually all corporate, tech, marketing, finance, and industry roles. They are designed to pass Applicant Tracking Systems (ATS) and be read in under 10 seconds by a recruiter.
          </p>
        </section>

        {/* Comparison table */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>CV vs Resume: Side-by-Side Comparison</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0' }}>Aspect</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: '#0891b2', borderBottom: '2px solid #e2e8f0' }}>CV</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: '#2563eb', borderBottom: '2px solid #e2e8f0' }}>Resume</th>
                </tr>
              </thead>
              <tbody>
                {differences.map((row, i) => (
                  <tr key={row.aspect} style={{ background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#374151', borderBottom: '1px solid #f1f5f9' }}>{row.aspect}</td>
                    <td style={{ padding: '12px 16px', color: '#475569', borderBottom: '1px solid #f1f5f9' }}>{row.cv}</td>
                    <td style={{ padding: '12px 16px', color: '#475569', borderBottom: '1px solid #f1f5f9' }}>{row.resume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* When to use which */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>When to Use a CV vs a Resume</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0369a1', marginBottom: '12px' }}>Use a CV when...</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Applying for academic or faculty positions', 'Applying for research grants or fellowships', 'Applying for jobs in the UK, Europe, or Australia', 'Applying to medical or scientific institutions', 'Submitting to international organizations'].map(item => (
                  <li key={item} style={{ fontSize: '14px', color: '#0c4a6e', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#0891b2', fontWeight: 700, flexShrink: 0 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1d4ed8', marginBottom: '12px' }}>Use a Resume when...</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Applying for corporate jobs in the US or Canada', 'Applying to tech, finance, or marketing roles', 'Submitting through an ATS or online portal', 'Responding to a job posting that says "resume"', 'Targeting roles at startups or private companies'].map(item => (
                  <li key={item} style={{ fontSize: '14px', color: '#1e3a8a', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#2563eb', fontWeight: 700, flexShrink: 0 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
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
            Ready to build your resume or CV?
          </h2>
          <p style={{ color: '#bfdbfe', fontSize: '15px', marginBottom: '24px' }}>
            Use our free AI resume builder to create an ATS-optimized resume in minutes — or run your existing one through our ATS checker.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/resume/builder" className="btn btn-primary" style={{ background: 'white', color: '#1d4ed8', fontWeight: 700 }}>
              Build My Resume Free
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
