import Link from 'next/link';
import { createPageMetadata, getFaqJsonLd, getBreadcrumbJsonLd, SITE_URL } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Skills for Resume Guide (2026) | Best Resume Skills Examples by Role',
  description:
    'Learn which hard skills and soft skills to add to your resume, where to place them, and how to make them ATS-friendly with examples by role and industry.',
  path: '/blog/skills-for-resume-guide',
  keywords: [
    'skills for resume',
    'resume skills examples',
    'best skills for resume',
    'hard skills for resume',
    'soft skills for resume',
    'technical skills resume',
    'what skills to put on resume',
    'ATS resume skills',
  ],
  imageAlt: 'Skills for resume guide with ATS-friendly examples and resume optimization tips',
});

const faqs = [
  {
    q: 'What skills should I put on a resume?',
    a: 'The best skills for a resume are the ones that match the target role. Prioritize job-specific hard skills first, then add a smaller number of supporting soft skills that you can prove through outcomes.',
  },
  {
    q: 'Should soft skills go on a resume?',
    a: 'Yes, but only when they are supported by evidence. Instead of listing "leadership" or "communication" alone, show them inside your bullet points through team outcomes, presentations, stakeholder management, or cross-functional work.',
  },
  {
    q: 'How many skills should be on a resume?',
    a: 'For most roles, 8 to 16 strong and relevant skills are enough. Too many generic skills reduce credibility and make the resume harder for recruiters and ATS tools to interpret clearly.',
  },
  {
    q: 'Where should skills appear on a resume?',
    a: 'Skills should appear in a dedicated skills section, but the strongest skills should also appear inside your summary, experience bullets, and project descriptions so they are tied to real work.',
  },
];

const roleExamples = [
  {
    title: 'Software Engineer',
    skills: ['JavaScript', 'React', 'Node.js', 'REST APIs', 'System Design', 'AWS', 'SQL', 'Git'],
  },
  {
    title: 'Data Analyst',
    skills: ['SQL', 'Python', 'Excel', 'Tableau', 'Power BI', 'Data Cleaning', 'A/B Testing', 'Forecasting'],
  },
  {
    title: 'Product Manager',
    skills: ['Roadmapping', 'User Research', 'Experimentation', 'Analytics', 'Stakeholder Management', 'Product Strategy', 'Figma', 'SQL'],
  },
  {
    title: 'Marketing Manager',
    skills: ['SEO', 'Content Strategy', 'Paid Ads', 'GA4', 'Email Marketing', 'Conversion Optimization', 'Brand Positioning', 'CRM'],
  },
];

export default function SkillsForResumeGuidePage() {
  const faqSchema = getFaqJsonLd(faqs);
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: 'Skills for Resume Guide', url: `${SITE_URL}/blog/skills-for-resume-guide` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div style={{ maxWidth: '920px', margin: '0 auto', padding: '56px 24px 88px' }}>
        <nav style={{ fontSize: '13px', color: '#64748b', marginBottom: '30px' }}>
          <Link href="/" style={{ color: '#2563eb' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <Link href="/blog" style={{ color: '#2563eb' }}>Blog</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>Skills for Resume Guide</span>
        </nav>

        <header style={{ marginBottom: '40px' }}>
          <div style={{ display: 'inline-block', padding: '5px 12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: '#2563eb', marginBottom: '16px' }}>
            Resume Strategy · 2026
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 850, color: '#0f172a', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px' }}>
            Skills for Resume Guide: What to Add, What to Remove, and What Recruiters Actually Notice
          </h1>
          <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.8, maxWidth: '760px' }}>
            Most resumes do not fail because the candidate lacks ability. They fail because the skills section is generic, overcrowded, or disconnected from real outcomes. This guide shows you how to choose the right skills, place them correctly, and make them ATS-friendly.
          </p>
          <div style={{ marginTop: '16px', fontSize: '13px', color: '#64748b' }}>
            By <strong style={{ color: '#334155' }}>RESUGROW Editorial Team</strong> · Updated April 2026
          </div>
        </header>

        <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', borderRadius: '18px', padding: '26px 28px', marginBottom: '42px' }}>
          <p style={{ color: '#93c5fd', fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
            Quick rule
          </p>
          <p style={{ color: 'white', fontSize: '18px', lineHeight: 1.7, margin: 0 }}>
            Put only skills on your resume that are both <strong>relevant to the target role</strong> and <strong>visible somewhere in your experience</strong>. A keyword without proof is weak. A proven skill without the keyword is often invisible to ATS.
          </p>
        </div>

        <section style={{ marginBottom: '42px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>The Two Types of Resume Skills</h2>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.8, marginBottom: '14px' }}>
            Resume skills usually fall into two buckets: hard skills and soft skills. Hard skills are role-specific and easier to verify. Soft skills matter too, but they should usually be shown through experience instead of listed by themselves.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '22px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Hard skills</h3>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, marginBottom: '12px' }}>
                These are technical or job-specific skills such as software, tools, frameworks, platforms, certifications, and methods.
              </p>
              <p style={{ fontSize: '14px', color: '#334155', margin: 0 }}>
                Examples: `SQL`, `React`, `Excel`, `Figma`, `Financial Modeling`, `Salesforce`, `GA4`
              </p>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '22px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Soft skills</h3>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, marginBottom: '12px' }}>
                These describe how you work with people, solve problems, make decisions, and lead execution.
              </p>
              <p style={{ fontSize: '14px', color: '#334155', margin: 0 }}>
                Examples: `Leadership`, `Communication`, `Stakeholder Management`, `Problem Solving`, `Ownership`
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '42px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>How to Choose the Right Skills</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              'Start with the job description. Highlight repeated tools, platforms, methods, and capabilities.',
              'Match those terms against your real experience. If you have done the work, include the skill using the recruiter’s language.',
              'Prioritize skills that affect hiring decisions. In most roles, the top 5 to 8 skills matter much more than the next 20.',
              'Remove weak filler like “hardworking,” “team player,” or “fast learner” unless the resume proves them through results.',
            ].map((item) => (
              <div key={item} style={{ padding: '16px 18px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white', fontSize: '15px', lineHeight: 1.7, color: '#475569' }}>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '42px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '18px' }}>Resume Skills Examples by Role</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
            {roleExamples.map((role) => (
              <div key={role.title} style={{ border: '1px solid #dbeafe', background: '#f8fbff', borderRadius: '16px', padding: '22px' }}>
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#1d4ed8', marginBottom: '14px' }}>{role.title}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {role.skills.map((skill) => (
                    <span key={skill} style={{ padding: '8px 12px', borderRadius: '999px', background: 'white', border: '1px solid #bfdbfe', color: '#1e3a8a', fontSize: '13px', fontWeight: 700 }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '42px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>Where Skills Should Appear on a Resume</h2>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.8, marginBottom: '14px' }}>
            The strongest resumes do not isolate skills into one boxed section. They distribute them strategically.
          </p>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Skills section: best for scanners, ATS parsing, and recruiters skimming quickly.',
                'Summary: best for surfacing your most valuable core skills near the top of the page.',
                'Experience bullets: best place to prove skills with metrics, scope, and business outcomes.',
                'Projects and certifications: best for supporting technical skills and specialized domains.',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', gap: '10px', fontSize: '15px', color: '#475569', lineHeight: 1.7 }}>
                  <span style={{ color: '#2563eb', fontWeight: 800 }}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: '42px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>Common Mistakes to Avoid</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              {
                title: 'Listing too many generic skills',
                text: 'A bloated skills section makes your resume look copied and reduces focus. Relevance matters more than volume.',
              },
              {
                title: 'Using vague soft skills',
                text: 'Terms like communication or leadership are weak if they do not appear in evidence-based bullets.',
              },
              {
                title: 'Ignoring ATS language',
                text: 'If the job description says “stakeholder management” and your resume says “worked with teams,” you may miss a keyword match.',
              },
              {
                title: 'Separating skills from results',
                text: 'A skill becomes more believable when the resume shows what it helped you achieve.',
              },
            ].map((item) => (
              <div key={item.title} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '22px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '46px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>A Better Way to Write Resume Skills</h2>
          <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '14px', padding: '24px' }}>
            <p style={{ fontSize: '14px', fontWeight: 800, color: '#c2410c', marginBottom: '8px' }}>Weak version</p>
            <p style={{ fontSize: '15px', color: '#7c2d12', lineHeight: 1.8, marginBottom: '16px' }}>
              Skills: Communication, Leadership, Teamwork, Problem Solving
            </p>
            <p style={{ fontSize: '14px', fontWeight: 800, color: '#166534', marginBottom: '8px' }}>Stronger version</p>
            <p style={{ fontSize: '15px', color: '#14532d', lineHeight: 1.8, margin: 0 }}>
              Led a cross-functional team of 6 across product, engineering, and marketing to launch a new onboarding flow that increased activation by 22%.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '46px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq) => (
              <div key={faq.q} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px 22px', background: 'white' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>{faq.q}</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: 1.7 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', borderRadius: '18px', padding: '38px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 850, color: 'white', marginBottom: '10px' }}>
            Want to check whether your resume skills are actually helping?
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
            Run an ATS scan, find missing keywords, and improve how your skills are positioned before you apply.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/resume/ats-checker" className="btn btn-primary">
              Check My Resume Score
            </Link>
            <Link href="/resume/builder" className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.06)', color: '#e2e8f0', borderColor: '#475569' }}>
              Build My Resume
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
