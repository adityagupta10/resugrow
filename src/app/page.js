import Link from 'next/link';
import TrackedLink from '@/components/UI/TrackedLink';
import Image from 'next/image';
import styles from './page.module.css';
import { templates as templateData } from '../data/templates';
import { platformFaqs } from '../data/faqs';
import FaqAccordion from '@/components/Home/FaqAccordion';
import Hero from '@/components/Home/Hero';
import Testimonials from '@/components/Testimonials/Testimonials';

const productPillars = [
  {
    tag: 'Resume', emoji: '📄', score: '94',
    title: 'Resume Excellence',
    desc: 'Build an ATS-optimized resume with AI guidance and professional styling in minutes.',
    points: ['Real-time ATS scoring', 'Smart section suggestions', 'One-click PDF export'],
    href: '/resume/builder', cta: 'Build My Resume',
    tagBg: '#f5f3ff', tagColor: '#7c3aed', tagBorder: '#ddd6fe',
    ctaFrom: '#8b5cf6', ctaTo: '#7c3aed',
    visualFrom: '#f5f3ff', visualTo: '#ede9fe',
  },
  {
    tag: 'LinkedIn', emoji: '💼', score: '88',
    title: 'LinkedIn Power',
    desc: 'Optimize your professional visibility with section-wise scores and direct profile audits.',
    points: ['Visibility bottleneck scan', 'Section-by-section audit', 'Keyword mapping'],
    href: '/linkedin-review', cta: 'Scan LinkedIn Profile',
    tagBg: '#eff6ff', tagColor: '#2563eb', tagBorder: '#bfdbfe',
    ctaFrom: '#3b82f6', ctaTo: '#2563eb',
    visualFrom: '#eff6ff', visualTo: '#dbeafe',
  },
  {
    tag: 'Letters', emoji: '✉️', score: '91',
    title: 'Cover Letter Hub',
    desc: 'Generate tailored cover letters for every application using AI that matches your resume and the job.',
    points: ['Job description matching', 'Tailored tone & style', 'High-impact templates'],
    href: '/cover-letter/builder', cta: 'Build Cover Letter',
    tagBg: '#f0fdf4', tagColor: '#16a34a', tagBorder: '#bbf7d0',
    ctaFrom: '#22c55e', ctaTo: '#16a34a',
    visualFrom: '#f0fdf4', visualTo: '#dcfce7',
  },
  {
    tag: 'SAR', emoji: '✨', score: '87',
    title: 'AI SAR Rewriter',
    desc: 'Transform weak bullet points into high-impact SAR (Situation, Action, Result) achievements.',
    points: ['Impact quantification', 'Action-verb injection', 'Recruiter-ready phrasing'],
    href: '/tools/sar-rewriter', cta: 'Optimize Bullets',
    tagBg: '#fff1f2', tagColor: '#dc2626', tagBorder: '#fecaca',
    ctaFrom: '#ef4444', ctaTo: '#dc2626',
    visualFrom: '#fff1f2', visualTo: '#ffe4e6',
  },
  {
    tag: 'Coach', emoji: '🎯', score: '92',
    title: 'Interview Mastery',
    desc: 'Prepare for any interview with an AI-powered coach that provides real-time feedback.',
    points: ['Section-wise rehearsal', 'Industry-specific Q&A', 'Performance tips'],
    href: '/tools/interview-prep', cta: 'Start Coaching',
    tagBg: '#eff6ff', tagColor: '#0284c7', tagBorder: '#bae6fd',
    ctaFrom: '#0ea5e9', ctaTo: '#0284c7',
    visualFrom: '#f0f9ff', visualTo: '#e0f2fe',
  },
  {
    tag: 'Track', emoji: '📊', score: '85',
    title: 'Smart Dashboard',
    desc: 'Manage your entire job search from one place with a centralized application tracker.',
    points: ['Centralized app history', 'Interview scheduling', 'Search analytics'],
    href: '/dashboard/applications', cta: 'Track Applications',
    tagBg: '#f8fafc', tagColor: '#475569', tagBorder: '#cbd5e1',
    ctaFrom: '#64748b', ctaTo: '#475569',
    visualFrom: '#f8fafc', visualTo: '#f1f5f9',
  },
  {
    tag: 'Market', emoji: '🎨', score: '90',
    title: 'Template Marketplace',
    desc: 'Browse and use premium, community-driven resume layouts designed for specific industries.',
    points: ['Verified ATS-safe designs', 'Industry-specific layouts', 'Community-vetted styles'],
    href: '/resume/template-marketplace', cta: 'Explore Designs',
    tagBg: '#fdf4ff', tagColor: '#a21caf', tagBorder: '#f0abfc',
    ctaFrom: '#c026d3', ctaTo: '#a21caf',
    visualFrom: '#fdf4ff', visualTo: '#fae8ff',
  },
  {
    tag: 'Salary', emoji: '💰', score: '89',
    title: 'Salary Negotiator',
    desc: 'Maximize your offer with AI-led negotiation scripts and market data for your role.',
    points: ['Custom script generation', 'Market value analysis', 'Counter-offer strategies'],
    href: '/tools/salary-coach', cta: 'Negotiate Better',
    tagBg: '#f0fdf4', tagColor: '#059669', tagBorder: '#a7f3d0',
    ctaFrom: '#10b981', ctaTo: '#059669',
    visualFrom: '#f0fdf4', visualTo: '#d1fae5',
  },
  {
    tag: 'Path', emoji: '🗺️', score: '86',
    title: 'Careerpath Simulator',
    desc: 'Map your future with an AI that simulates different career trajectories based on your skills.',
    points: ['Trajectory forecasting', 'Skill-gap analysis', 'Future role requirements'],
    href: '/tools/career-path', cta: 'Simulate My Path',
    tagBg: '#ecfeff', tagColor: '#0891b2', tagBorder: '#a5f3fc',
    ctaFrom: '#06b6d4', ctaTo: '#0891b2',
    visualFrom: '#ecfeff', visualTo: '#cffafe',
  },
];

const workflowSteps = [
  {
    step: '01',
    title: 'Start With a Scan',
    desc: 'Analyze your current resume or LinkedIn profile to identify bottlenecks first.'
  },
  {
    step: '02',
    title: 'Apply High-Impact Fixes',
    desc: 'Use targeted recommendations and AI rewrites to strengthen recruiter-facing signals.'
  },
  {
    step: '03',
    title: 'Ship Job-Ready Assets',
    desc: 'Export optimized documents and apply with a profile built for modern filters.'
  }
];

const proofStats = [
  { value: '21K+', label: 'Interview wins tracked monthly' },
  { value: '98%', label: 'ATS parser readability on premium templates' },
  { value: '5,126', label: 'Verified product reviews' },
  { value: '30 sec', label: 'Average score generation' }
];

const templates = templateData.slice(0, 4);

const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'RESUGROW',
  alternateName: 'RESUGROW AI',
  url: 'https://www.resugrow.com',
  logo: 'https://www.resugrow.com/resugrow-logo.png',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'An advanced AI-powered resume builder and ATS optimization platform for modern job seekers.',
  offers: {
    '@type': 'Offer',
    price: '0.00',
    priceCurrency: 'USD'
  }
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: platformFaqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a }
  }))
};

export default function Home() {

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', borderWidth: 0 }}>
        RESUGROW: Free AI Resume Builder, ATS Checker & LinkedIn Optimizer
      </h1>
      <Hero />

      <section className={styles.proofSection}>
        <div className={styles.container}>
          <div className={styles.proofGrid}>
            {proofStats.map((item) => (
              <div key={item.label} className={styles.proofCard}>
                <h3>{item.value}</h3>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.productSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p>Product Suite</p>
            <h2>Everything You Need in an AI Resume Builder & ATS Checker</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px 0 60px' }}>
            {productPillars.map((pillar, idx) => (
              <article
                key={pillar.title}
                style={{
                  display: 'flex',
                  flexDirection: idx % 2 !== 0 ? 'row-reverse' : 'row',
                  alignItems: 'stretch',
                  width: '100%',
                  minHeight: '360px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 16px rgba(15,23,42,0.06)',
                  background: 'white',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                }}
              >
                {/* ── Text side ── */}
                <div style={{
                  flex: '1 1 55%',
                  padding: '48px 52px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 0,
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '5px 14px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: pillar.tagBg,
                    color: pillar.tagColor,
                    border: `1px solid ${pillar.tagBorder}`,
                    width: 'fit-content',
                    marginBottom: '12px',
                  }}>
                    {pillar.tag}
                  </span>
                  <h3 style={{ margin: '0 0 12px', fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.025em' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ margin: '0 0 18px', color: '#475569', fontSize: '15px', lineHeight: 1.75, maxWidth: '400px' }}>
                    {pillar.desc}
                  </p>
                  <ul style={{ margin: '0 0 24px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {pillar.points.map((point) => (
                      <li key={point} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 600, color: '#334155' }}>
                        <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: pillar.tagBg, color: pillar.tagColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0, border: `1px solid ${pillar.tagBorder}` }}>✓</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <TrackedLink
                    href={pillar.href}
                    ctaName={pillar.cta.toLowerCase().replace(/\s+/g, '_')}
                    ctaPage="Homepage"
                    ctaLocation="product_pillars"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '12px 24px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      width: 'fit-content',
                      background: `linear-gradient(135deg, ${pillar.ctaFrom}, ${pillar.ctaTo})`,
                      color: 'white',
                      boxShadow: `0 4px 14px ${pillar.tagBorder}`,
                    }}
                  >
                    {pillar.cta} →
                  </TrackedLink>
                </div>

                {/* ── Visual side ── */}
                <div style={{
                  flex: '0 0 42%',
                  background: `linear-gradient(135deg, ${pillar.visualFrom} 0%, ${pillar.visualTo} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '40px',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Big emoji watermark */}
                  <span style={{ position: 'absolute', fontSize: '120px', opacity: 0.08, bottom: '-10px', right: '-10px', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
                    {pillar.emoji}
                  </span>

                  {/* Score card */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 1 }}>
                    <div style={{
                      width: '96px',
                      height: '96px',
                      borderRadius: '50%',
                      border: `4px solid ${pillar.tagColor}`,
                      background: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    }}>
                      <span style={{ fontSize: '26px', fontWeight: 900, color: pillar.tagColor, lineHeight: 1, letterSpacing: '-0.03em' }}>{pillar.score}</span>
                      <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: pillar.tagColor, opacity: 0.7, marginTop: '2px' }}>Score</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '220px' }}>
                      {pillar.points.map((point) => (
                        <span key={point} style={{
                          display: 'block',
                          padding: '7px 14px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          textAlign: 'center',
                          background: 'rgba(255,255,255,0.85)',
                          color: pillar.tagColor,
                          border: `1px solid ${pillar.tagBorder}`,
                          backdropFilter: 'blur(8px)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        }}>
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.workflowSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p>How It Works</p>
            <h2>How Our AI Career Tools & Resume Maker Work</h2>
          </div>
          <div className={styles.workflowGrid}>
            {workflowSteps.map((step) => (
              <div key={step.step} className={styles.workflowCard}>
                <span>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.templatesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p>Templates</p>
            <h2>Professional Resume Layouts, Built for ATS Parsing</h2>
          </div>

          <div className={styles.templateGrid}>
            {templates.map((template) => (
              <article key={template.id} className={styles.templateCard}>
                <div className={styles.templatePreview}>
                  <Image
                    src={template.image}
                    alt={`${template.name} ATS-friendly resume template for job applications and recruiter visibility`}
                    fill
                    className={styles.templateImage}
                    sizes="(max-width: 900px) 100vw, 25vw"
                  />
                </div>
                <div className={styles.templateMeta}>
                  <h3>{template.name}</h3>
                  <p>{template.category}</p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.centerAction}>
            <Link href="/resume/templates" className="btn btn-secondary">
              Browse All Templates
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.testimonialSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p>Proof</p>
            <h2>Used by Job Seekers Who Want Precise, Actionable Feedback</h2>
          </div>

          <Testimonials 
            title="Success Stories" 
            subtitle="Real results from job seekers who beat the bots." 
          />
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p>FAQ</p>
            <h2>Quick Answers Before You Start</h2>
          </div>
          <FaqAccordion faqs={platformFaqs} />
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className={styles.container}>
          <div className={styles.finalCard}>
            <h2>Start Optimizing the Assets Recruiters Actually See</h2>
            <p>
              Get a deterministic score, apply precision fixes, and ship stronger applications with
              confidence.
            </p>
            <div className={styles.finalActions}>
              <TrackedLink href="/resume/ats-checker" ctaName="start_ats_check" ctaPage="Homepage" ctaLocation="final_section" className="btn btn-primary">
                Start Free ATS Check
              </TrackedLink>
              <TrackedLink href="/linkedin-review" ctaName="analyze_linkedin" ctaPage="Homepage" ctaLocation="final_section" className="btn btn-secondary">
                Analyze LinkedIn Profile
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
