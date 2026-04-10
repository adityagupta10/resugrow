import Link from 'next/link';
import { createPageMetadata, getFaqJsonLd, getBreadcrumbJsonLd, SITE_URL } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Resume Skills Guide: Hard Skills vs Soft Skills (2025)',
  description:
    'Discover the best skills to put on a resume in 2025. Learn the difference between hard and soft skills, and how to format your skills section for ATS systems.',
  path: '/resume-skills-guide',
  keywords: [
    'resume skills', 'hard skills vs soft skills', 'skills to put on a resume',
    'good skills for resume', 'technical skills for resume', 'ATS resume skills',
    'best resume skills', 'how to list skills on resume',
  ],
  imageAlt: 'Resume Skills Guide',
});

const faqs = [
  {
    q: 'What are hard skills?',
    a: 'Hard skills are teachable, measurable abilities such as coding, using specific software, foreign languages, or statistical analysis. They are often specific to your industry or role.',
  },
  {
    q: 'What are soft skills?',
    a: 'Soft skills are interpersonal or behavioral traits such as communication, leadership, problem-solving, and adaptability. While harder to quantify, they are highly valued by employers.',
  },
  {
    q: 'How many skills should I list on my resume?',
    a: 'Aim for 8-15 highly relevant skills. Listing too many can clutter your resume and make you look like a "jack of all trades, master of none." Focus on the skills specifically requested in the job description.',
  },
  {
    q: 'Do ATS systems look for skills?',
    a: 'Yes! Applicant Tracking Systems (ATS) scan your resume specifically for keyword matches. If a job description asks for "Google Analytics," the ATS will look for that exact phrase in your skills section.',
  },
  {
    q: 'Should I include proficiency levels (e.g., "Expert," "Beginner")?',
    a: 'Generally, no. Self-assessed proficiency levels or rating bars (like 4/5 stars) can be subjective and confusing. It is better to just list the skill, or categorize them into "Familiar," "Proficient," and "Expert" if strictly necessary.',
  },
];

export default function ResumeSkillsGuidePage() {
  const faqSchema = getFaqJsonLd(faqs);
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Resume Skills Guide', url: `${SITE_URL}/resume-skills-guide` },
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
          <span>Resume Skills Guide</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: '#2563eb', marginBottom: '16px' }}>
            Career Guide
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '16px' }}>
            The Ultimate Resume Skills Guide for 2025
          </h1>
          <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, maxWidth: '680px' }}>
            Your skills section isn't just a list—it's the primary way Applicant Tracking Systems (ATS) filter candidates. Learn how to strategically feature the right hard and soft skills to land more interviews.
          </p>
        </div>

        {/* Quick answer box */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '24px 28px', marginBottom: '48px' }}>
          <p style={{ fontWeight: 700, color: '#166534', marginBottom: '8px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pro Tip for ATS</p>
          <p style={{ color: '#15803d', fontSize: '16px', lineHeight: 1.7, margin: 0 }}>
            Don't just hide your skills in a bulleted list at the bottom! For maximum ATS impact, you must also <strong>contextualize your skills</strong> by weaving those exact keywords into your work experience bullet points.
          </p>
        </div>

        {/* Hard vs Soft */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>Hard Skills vs Soft Skills</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Hard Skills</h3>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, marginBottom: '16px' }}>Specific, teachable abilities that can be defined and measured.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Python programming', 'SEO optimization', 'Financial modeling', 'Copywriting', 'Foreign languages', 'Adobe Creative Suite'].map(item => (
                  <li key={item} style={{ fontSize: '14px', color: '#334155', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#2563eb', fontWeight: 700 }}>•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Soft Skills</h3>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, marginBottom: '16px' }}>Interpersonal attributes that describe how you work and interact.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Clear communication', 'Team leadership', 'Adaptability', 'Problem solving', 'Time management', 'Conflict resolution'].map(item => (
                  <li key={item} style={{ fontSize: '14px', color: '#334155', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#2563eb', fontWeight: 700 }}>•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>How to Format Your Skills Section</h2>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.8, marginBottom: '16px' }}>
            The days of graphical skill bars and pie charts are over. Applicant Tracking Systems cannot read images or complex visual elements. To ensure your skills are parsed correctly, use a clean, comma-separated list or simple bullet points.
          </p>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderLeft: '4px solid #2563eb', padding: '20px', borderRadius: '8px', marginBottom: '16px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Example Format:</h4>
            <div style={{ fontSize: '15px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong>Languages:</strong> JavaScript, Python, SQL, HTML/CSS</div>
              <div><strong>Frameworks:</strong> React, Node.js, Next.js, Express</div>
              <div><strong>Tools:</strong> Git, Docker, AWS, Figma</div>
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
            Is your resume missing critical skills?
          </h2>
          <p style={{ color: '#bfdbfe', fontSize: '15px', marginBottom: '24px' }}>
            Scan your resume with our ATS Checker. We'll identify missing keywords based on the job you want.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/resume/ats-checker" className="btn btn-primary" style={{ background: 'white', color: '#1d4ed8', fontWeight: 700 }}>
              Scan My Resume
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
