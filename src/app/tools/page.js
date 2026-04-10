import Link from 'next/link';
import { createPageMetadata, getBreadcrumbJsonLd, getFaqJsonLd, SITE_URL } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'All Career Tools — Resume Builder, ATS Checker, LinkedIn & More | ResuGrow',
  description:
    'Every free AI career tool in one place. Resume builder, ATS checker, LinkedIn optimizer, cover letter builder, SAR rewriter, salary coach, interview prep and more.',
  path: '/tools',
  keywords: [
    'career tools', 'resume tools', 'AI career tools', 'job search tools',
    'ATS checker', 'resume builder', 'LinkedIn optimizer', 'cover letter builder',
    'salary negotiation', 'interview prep', 'career path planner',
  ],
});

const JOURNEY_STAGES = [
  {
    stage: '01',
    label: 'Build Your Foundation',
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe',
    tools: [
      {
        name: 'AI Resume Builder',
        href: '/resume/builder',
        icon: '📄',
        badge: 'Free',
        tagline: 'Build a job-ready resume in minutes',
        desc: 'Start from scratch or upload an existing resume. Our step-by-step builder guides you through every section — personal info, experience, skills, certifications — with AI suggestions at each step. Download as PDF when done.',
        impact: 'The foundation of every job application. A well-structured resume is what gets you past the first filter.',
      },
      {
        name: 'Resume Templates',
        href: '/resume/templates',
        icon: '🎨',
        badge: 'Free',
        tagline: '15 ATS-friendly layouts',
        desc: 'Choose from 15 professionally designed templates — from clean minimalist to bold executive. Every template is tested for ATS parsing so your content reaches recruiters intact.',
        impact: 'First impressions matter. The right layout signals professionalism before a recruiter reads a single word.',
      },
      {
        name: 'Cover Letter Builder',
        href: '/cover-letter/builder',
        icon: '✉️',
        badge: 'Free',
        tagline: 'Job-tailored letters in minutes',
        desc: 'A guided 6-step wizard that builds a personalized cover letter based on your role, experience level, strengths, and target company. Live A4 preview, PDF export, and 6 professional templates.',
        impact: 'Cover letters tip the balance when your resume alone isn\'t enough. A tailored letter shows genuine intent.',
      },
    ],
  },
  {
    stage: '02',
    label: 'Optimize for the Machine',
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    tools: [
      {
        name: 'ATS Resume Checker',
        href: '/resume/ats-checker',
        icon: '🔍',
        badge: 'Free',
        tagline: 'Score your resume in 30 seconds',
        desc: 'Upload your resume PDF and get an instant score out of 100 across 13 modules — contact info, keywords, formatting, action verbs, metrics, tense alignment, and more. Paste a job description for targeted keyword gap analysis.',
        impact: '98% of Fortune 500 companies use ATS to filter resumes before a human sees them. This tool shows you exactly what they see.',
      },
      {
        name: 'SAR Bullet Rewriter',
        href: '/tools/sar-rewriter',
        icon: '✨',
        badge: 'Free',
        tagline: 'Turn weak bullets into impact statements',
        desc: 'Paste any resume bullet and get 3 AI-rewritten versions in SAR format (Situation → Action → Result). Each variant is scored, with applied fixes and keyword injection shown clearly.',
        impact: 'Weak bullets are the #1 reason strong candidates get filtered out. Quantified, action-led bullets dramatically improve ATS scores and recruiter attention.',
      },
      {
        name: 'Resume Examples by Role',
        href: '/examples',
        icon: '📋',
        badge: 'Free',
        tagline: 'Real bullets and skills by job title',
        desc: 'Browse ATS-tested resume bullets, skills, and summary examples for Software Engineers, Product Managers, Data Analysts, Marketers, Sales Executives, HR Managers, and more.',
        impact: 'Knowing what top performers in your field write gives you a benchmark to write against — not a blank page.',
      },
    ],
  },
  {
    stage: '03',
    label: 'Maximize LinkedIn Visibility',
    color: '#0891b2',
    bg: '#f0f9ff',
    border: '#bae6fd',
    tools: [
      {
        name: 'LinkedIn Profile Review',
        href: '/linkedin-review',
        icon: '💼',
        badge: 'Free',
        tagline: 'Score every section of your profile',
        desc: 'Upload your LinkedIn PDF or paste your profile text for a section-by-section score across Identity (20pts), Content (30pts), Experience (35pts), and Credibility (15pts). Get specific fixes for each gap.',
        impact: 'Recruiters search LinkedIn before they post jobs. A weak profile means missing opportunities you never even knew existed.',
      },
      {
        name: 'LinkedIn Makeover',
        href: '/linkedin-makeover',
        icon: '🚀',
        badge: 'Premium',
        tagline: 'Full profile rewrite for recruiter visibility',
        desc: 'A complete AI-assisted rewrite of your headline, About section, and experience bullets — optimized for LinkedIn\'s search algorithm and recruiter conversion. Includes keyword strategy and profile structure guidance.',
        impact: 'A fully optimized LinkedIn profile generates 5x more recruiter messages. This is the highest-leverage career asset most people neglect.',
      },
    ],
  },
  {
    stage: '04',
    label: 'Prepare & Negotiate',
    color: '#059669',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    tools: [
      {
        name: 'Interview Question Generator',
        href: '/tools/interview-prep',
        icon: '🎯',
        badge: 'New',
        tagline: 'Role-specific questions with model answers',
        desc: 'Generate tailored interview questions for your specific role, experience level, and company type. Includes behavioral, technical, and situational questions with structured answer frameworks.',
        impact: 'Preparation is the only variable you fully control in an interview. Candidates who practice role-specific questions perform measurably better.',
      },
      {
        name: 'Salary Negotiation Coach',
        href: '/tools/salary-coach',
        icon: '💰',
        badge: '🔥',
        tagline: 'Scripts, benchmarks, and email templates',
        desc: 'Enter your offer details and get global salary benchmarks, a personalized negotiation script in 6 parts, and 4 ready-to-send email templates — initial response, counter offer, follow-up, and acceptance.',
        impact: 'The average person leaves $1M in lifetime earnings on the table by not negotiating. This tool gives you the exact words to use.',
      },
      {
        name: 'Career Path Simulator',
        href: '/tools/career-path',
        icon: '🗺️',
        badge: 'Free',
        tagline: 'Map your next 3 roles with skill gaps',
        desc: 'Enter your current role, years of experience, and skills. Get 4–5 realistic next moves with salary bands, skill gap analysis, a learning path, and a 6–12 month roadmap to become interview-ready.',
        impact: 'Most people apply for jobs reactively. This tool helps you build toward the role you actually want — with a concrete plan.',
      },
    ],
  },
  {
    stage: '05',
    label: 'Content & Resources',
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    tools: [
      {
        name: 'Blog & Career Guides',
        href: '/blog',
        icon: '📚',
        badge: 'Free',
        tagline: 'Practical guides from recruiters and coaches',
        desc: 'In-depth articles on ATS optimization, resume writing, LinkedIn strategy, salary negotiation, interview prep, and career change — written by recruiters and career coaches with real hiring experience.',
        impact: 'Knowledge compounds. Understanding how hiring actually works gives you a permanent edge over candidates who just apply and hope.',
      },
      {
        name: 'CV vs Resume Guide',
        href: '/cv-vs-resume',
        icon: '📖',
        badge: 'Free',
        tagline: 'Know which document to send and when',
        desc: 'A complete guide to the difference between a CV and a resume — when to use each, how long they should be, what to include, and how the rules differ by country and industry.',
        impact: 'Sending the wrong document type is an immediate red flag. This guide ensures you always send what the employer actually expects.',
      },
      {
        name: 'Community Template Marketplace',
        href: '/resume/template-marketplace',
        icon: '🎪',
        badge: 'Free',
        tagline: 'Designer-built resume templates',
        desc: 'Browse HTML/CSS resume templates submitted by the ResuGrow creator community — reviewed for ATS safety, export quality, and recruiter readability before publishing.',
        impact: 'Fresh design perspectives from real designers. Find a layout that fits your industry and personal brand.',
      },
    ],
  },
];

const faqs = [
  {
    q: 'Are all ResuGrow tools free?',
    a: 'Most tools are completely free with no sign-up required — including the Resume Builder, ATS Checker, SAR Rewriter, LinkedIn Review, Career Path Simulator, and Interview Prep. The LinkedIn Makeover is a premium service.',
  },
  {
    q: 'What order should I use these tools?',
    a: 'The recommended sequence: Build your resume → Run ATS Check → Rewrite weak bullets → Optimize LinkedIn → Prepare for interviews → Negotiate your offer. Each tool builds on the previous one.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No account is required for most tools. Creating an account lets you save your resume, track ATS scan history, and access your cover letters across devices.',
  },
];

const breadcrumbSchema = getBreadcrumbJsonLd([
  { name: 'Home', url: SITE_URL },
  { name: 'All Tools', url: `${SITE_URL}/tools` },
]);
const faqSchema = getFaqJsonLd(faqs);

export default function AllToolsPage() {
  const totalTools = JOURNEY_STAGES.reduce((sum, s) => sum + s.tools.length, 0);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
        {/* ── Hero ── */}
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '72px 24px 64px', textAlign: 'center' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ display: 'inline-block', padding: '5px 14px', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 999, fontSize: 12, fontWeight: 700, color: '#93c5fd', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>
              {totalTools} Free Career Tools
            </div>
            <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 20px' }}>
              Every Tool You Need to<br />
              <span style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Land Your Next Role
              </span>
            </h1>
            <p style={{ fontSize: 17, color: '#94a3b8', lineHeight: 1.75, margin: '0 0 36px' }}>
              From building your resume to negotiating your offer — every step of your professional journey, covered by one platform.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/resume/builder" className="btn btn-primary">Start Building Free</Link>
              <Link href="/resume/ats-checker" className="btn btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#e2e8f0', background: 'rgba(255,255,255,0.06)' }}>Check My Resume</Link>
            </div>
          </div>
        </div>

        {/* ── Journey stages ── */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 80px' }}>

          {/* Breadcrumb */}
          <nav style={{ fontSize: 13, color: '#64748b', marginBottom: 48 }}>
            <Link href="/" style={{ color: '#2563eb' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <span>All Tools</span>
          </nav>

          {JOURNEY_STAGES.map((stage) => (
            <div key={stage.stage} style={{ marginBottom: 64 }}>
              {/* Stage header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: stage.bg, border: `1px solid ${stage.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: stage.color, flexShrink: 0 }}>
                  {stage.stage}
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>{stage.label}</h2>
                </div>
              </div>

              {/* Tools grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                {stage.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    style={{ display: 'flex', flexDirection: 'column', background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                  >
                    {/* Icon + badge */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: stage.bg, border: `1px solid ${stage.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                        {tool.icon}
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: tool.badge === 'Premium' ? '#fef3c7' : tool.badge === 'New' ? '#dcfce7' : tool.badge === '🔥' ? '#fff7ed' : '#f1f5f9', color: tool.badge === 'Premium' ? '#92400e' : tool.badge === 'New' ? '#166534' : tool.badge === '🔥' ? '#c2410c' : '#475569', border: '1px solid', borderColor: tool.badge === 'Premium' ? '#fde68a' : tool.badge === 'New' ? '#bbf7d0' : tool.badge === '🔥' ? '#fed7aa' : '#e2e8f0' }}>
                        {tool.badge}
                      </span>
                    </div>

                    {/* Name + tagline */}
                    <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>{tool.name}</h3>
                    <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: stage.color }}>{tool.tagline}</p>

                    {/* Description */}
                    <p style={{ margin: '0 0 16px', fontSize: 13.5, color: '#475569', lineHeight: 1.7, flex: 1 }}>{tool.desc}</p>

                    {/* Impact */}
                    <div style={{ background: stage.bg, border: `1px solid ${stage.border}`, borderRadius: 10, padding: '10px 14px', fontSize: 12.5, color: stage.color, lineHeight: 1.6 }}>
                      <strong>Why it matters:</strong> {tool.impact}
                    </div>

                    {/* CTA */}
                    <div style={{ marginTop: 16, fontSize: 13, fontWeight: 700, color: stage.color, display: 'flex', alignItems: 'center', gap: 4 }}>
                      Open {tool.name} →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* FAQ */}
          <div style={{ marginTop: 16 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 20, letterSpacing: '-0.02em' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {faqs.map(faq => (
                <div key={faq.q} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '18px 22px' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>{faq.q}</h3>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
