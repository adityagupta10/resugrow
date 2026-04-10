import Link from 'next/link';
import { createPageMetadata, getFaqJsonLd, getBreadcrumbJsonLd, SITE_URL } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Resume Summary Examples: How to Write a Summary (2026)',
  description:
    'Explore expert resume summary examples for all experience levels. Learn how to write a powerful resume summary that gets noticed by recruiters and passes ATS.',
  path: '/resume-summary-examples',
  keywords: [
    'resume summary examples', 'how to write a resume summary', 'professional summary for resume',
    'resume summary best practices', 'executive resume summary', 'entry level resume summary',
    'resume summary statement', 'career summary examples', 'objective vs summary',
  ],
  imageAlt: 'Resume Summary Examples Guide',
});

const faqs = [
  {
    q: 'What is a resume summary?',
    a: 'A resume summary is a 2-4 sentence paragraph at the top of your resume that briefly highlights your most relevant experience, key skills, and greatest achievements. It serves as your "elevator pitch" to capture the recruiter\'s attention.',
  },
  {
    q: 'Resume Summary vs Resume Objective: What\'s the difference?',
    a: 'A resume objective states what YOU want (e.g., "Seeking a challenging role in marketing"). A resume summary states what YOU OFFER the employer (e.g., "Data-driven marketing manager with 5+ years of experience increasing ROI"). Objective statements are outdated; always use a summary.',
  },
  {
    q: 'How long should a resume summary be?',
    a: 'Keep it to 2-4 sentences or 3-5 bullet points. Anything longer than that becomes a wall of text that recruiters will skip. The goal is to make it skimmable and impactful.',
  },
  {
    q: 'Do I really need a resume summary?',
    a: 'Yes, if you have more than 2 years of experience or are changing careers. For recent graduates with no experience, a highly tailored objective or a "Professional Profile" might be used, but generally, a strong summary helps frame your entire resume.',
  },
  {
    q: 'Should I write my summary in first or third person?',
    a: 'Write it in the first person but omit the pronouns (I, my, me). For example, instead of writing "I am a seasoned software engineer," write "Seasoned software engineer with a track record..."',
  },
];

const examples = [
  {
    role: 'Marketing Manager',
    level: 'Mid-Level',
    text: 'Data-driven Marketing Manager with 6+ years of experience leading cross-functional teams in B2B SaaS. Proven track record of increasing lead generation by 45% YoY through targeted SEO and paid acquisition campaigns. Adept at managing $500K+ ad budgets and driving marketing automation strategy.',
  },
  {
    role: 'Software Engineer',
    level: 'Senior',
    text: 'Senior Full-Stack Engineer with 8 years of experience architecting scalable web applications. Expert in React, Node.js, and AWS cloud infrastructure. Led the migration of a legacy monolithic application to microservices, reducing deployment time by 60% and improving system uptime to 99.99%.',
  },
  {
    role: 'Customer Success Specialist',
    level: 'Entry-Level',
    text: 'Empathetic and solution-oriented Customer Success Specialist with 2 years of experience in high-volume technical support. Recognized for maintaining a 98% CSAT score and resolving escalated tickets 20% faster than the team average. Skilled in Zendesk, Salesforce, and client onboarding.',
  },
  {
    role: 'Financial Analyst',
    level: 'Mid-Level',
    text: 'Detail-oriented Financial Analyst with 4+ years of experience in corporate finance, budgeting, and variance analysis. Built automated financial models in Excel and Python that reduced month-end reporting time by 15 hours. Strong background in M&A due diligence and risk assessment.',
  },
];

export default function ResumeSummaryExamplesPage() {
  const faqSchema = getFaqJsonLd(faqs);
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Resume Summary Examples', url: `${SITE_URL}/resume-summary-examples` },
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
          <span>Resume Summary Examples</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: '#2563eb', marginBottom: '16px' }}>
            Resume Guide
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '16px' }}>
            Resume Summary Examples & Writing Guide
          </h1>
          <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, maxWidth: '680px' }}>
            Recruiters spend an average of 7 seconds reviewing a resume. Your summary is the first thing they see. Here's how to write a powerful professional summary that grabs attention, passes the ATS, and lands interviews.
          </p>
        </div>

        {/* Formula */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '24px 28px', marginBottom: '48px' }}>
          <p style={{ fontWeight: 700, color: '#166534', marginBottom: '8px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Winning Formula</p>
          <p style={{ color: '#15803d', fontSize: '16px', lineHeight: 1.7, margin: 0 }}>
            <strong>[Professional Title]</strong> with <strong>[Years of Experience]</strong> in <strong>[Top 2-3 Skills]</strong>. Proven track record of <strong>[Major Achievement/Metric]</strong>. Adept at <strong>[Value you bring to the company]</strong>.
          </p>
        </div>

        {/* Content Section */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>Why You Need a Resume Summary</h2>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.8, marginBottom: '16px' }}>
            Gone are the days of the "Resume Objective" where you state what you want from the employer. Today's competitive job market requires a <strong>Professional Summary</strong>—a concise overview that highlights your most impressive, relevant achievements.
          </p>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.8, marginBottom: '16px' }}>
            A strong resume summary acts as a hook. It provides context to your career history and connects the dots for the hiring manager, proving immediately that you have the qualifications they are looking for.
          </p>
          <ul style={{ listStyle: 'disc', paddingLeft: '24px', color: '#334155', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
            <li>It immediately highlights your biggest accomplishments.</li>
            <li>It weaves in essential ATS keywords naturally.</li>
            <li>It helps career changers explain their transition.</li>
          </ul>
        </section>

        {/* Examples Section */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>Top Resume Summary Examples by Industry</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {examples.map((ex, idx) => (
              <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>{ex.role}</h3>
                  <span style={{ fontSize: '12px', background: '#e2e8f0', color: '#475569', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>{ex.level}</span>
                </div>
                <p style={{ margin: 0, fontSize: '15px', color: '#334155', lineHeight: 1.6, fontStyle: 'italic', borderLeft: '3px solid #2563eb', paddingLeft: '16px' }}>
                  "{ex.text}"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How to write one */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>How to Write a Perfect Summary (4 Steps)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '24px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#0284c7', color: 'white', borderRadius: '50%', fontWeight: 'bold', marginBottom: '12px' }}>1</span>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0369a1', marginBottom: '12px' }}>Start with your title</h3>
              <p style={{ fontSize: '14px', color: '#0c4a6e', lineHeight: 1.6 }}>Begin with a strong identity trait and your professional title (e.g., "Creative Graphic Designer" or "Strategic Financial Analyst").</p>
            </div>
            <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '24px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#0284c7', color: 'white', borderRadius: '50%', fontWeight: 'bold', marginBottom: '12px' }}>2</span>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0369a1', marginBottom: '12px' }}>List your experience</h3>
              <p style={{ fontSize: '14px', color: '#0c4a6e', lineHeight: 1.6 }}>Mention the number of years of experience you have, specifically in areas related to the job description.</p>
            </div>
            <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '24px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#0284c7', color: 'white', borderRadius: '50%', fontWeight: 'bold', marginBottom: '12px' }}>3</span>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0369a1', marginBottom: '12px' }}>Highlight top achievements</h3>
              <p style={{ fontSize: '14px', color: '#0c4a6e', lineHeight: 1.6 }}>Use numbers and metrics to quantify your success. Mention your biggest win right here at the top.</p>
            </div>
            <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '24px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#0284c7', color: 'white', borderRadius: '50%', fontWeight: 'bold', marginBottom: '12px' }}>4</span>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0369a1', marginBottom: '12px' }}>Add key skills</h3>
              <p style={{ fontSize: '14px', color: '#0c4a6e', lineHeight: 1.6 }}>Weave in 2-4 hard skills that the ATS and recruiter are explicitly looking for in the job description.</p>
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
            Let AI write your summary in seconds
          </h2>
          <p style={{ color: '#bfdbfe', fontSize: '15px', marginBottom: '24px' }}>
            Our free resume builder features AI that generates highly tailored, ATS-friendly summaries based on your experience.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/resume/builder" className="btn btn-primary" style={{ background: 'white', color: '#1d4ed8', fontWeight: 700 }}>
              Build My Resume Free
            </Link>
            <Link href="/tools/sar-rewriter" className="btn btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white', background: 'rgba(255,255,255,0.1)' }}>
              Try AI Rewriter
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
