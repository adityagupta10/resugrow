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
    tag: 'Resume',
    title: 'Resume Excellence',
    desc: 'Build an ATS-optimized resume with AI guidance and professional styling in minutes.',
    points: ['Real-time ATS scoring', 'Smart section suggestions', 'One-click PDF export'],
    href: '/resume/builder',
    cta: 'Build My Resume'
  },
  {
    tag: 'LinkedIn',
    title: 'LinkedIn Power',
    desc: 'Optimize your professional visibility with section-wise scores and direct profile audits.',
    points: ['Visibility bottleneck scan', 'Section-by-section audit', 'keyword mapping'],
    href: '/linkedin-review',
    cta: 'Scan LinkedIn Profile'
  },
  {
    tag: 'Letters',
    title: 'Cover Letter Hub',
    desc: 'Generate tailored cover letters for every application using AI that matches your resume and the job.',
    points: ['Job description matching', 'Tailored tone & style', 'High-impact templates'],
    href: '/cover-letter/builder',
    cta: 'Build Cover Letter'
  },
  {
    tag: 'SAR',
    title: 'AI SAR Rewriter',
    desc: 'Transform weak bullet points into high-impact SAR (Situation, Action, Result) achievements.',
    points: ['Impact quantification', 'Action-verb injection', 'Recruiter-ready phrasing'],
    href: '/tools/sar-rewriter',
    cta: 'Optimize Bullets'
  },
  {
    tag: 'Coach',
    title: 'Interview Mastery',
    desc: 'Prepare for any interview with an AI-powered coach that provides real-time feedback.',
    points: ['Section-wise rehearsal', 'Industry-specific Q&A', 'Performance tips'],
    href: '/tools/interview-prep',
    cta: 'Start Coaching'
  },
  {
    tag: 'Track',
    title: 'Smart Dashboard',
    desc: 'Manage your entire job search from one place with a centralized application tracker.',
    points: ['Centralized app history', 'Interview scheduling', 'Search analytics'],
    href: '/dashboard/applications',
    cta: 'Track Applications'
  },
  {
    tag: 'Market',
    title: 'Template Marketplace',
    desc: 'Browse and use premium, community-driven resume layouts designed for specific industries.',
    points: ['Verified ATS-safe designs', 'Industry-specific layouts', 'Community-vetted styles'],
    href: '/resume/template-marketplace',
    cta: 'Explore Designs'
  },
  {
    tag: 'Salary',
    title: 'Salary Negotiator',
    desc: 'Maximize your offer with AI-led negotiation scripts and market data for your role.',
    points: ['Custom script generation', 'Market value analysis', 'Counter-offer strategies'],
    href: '/tools/salary-coach',
    cta: 'Negotiate Better'
  },
  {
    tag: 'Path',
    title: 'Careerpath Simulator',
    desc: 'Map your future with an AI that simulates different career trajectories based on your skills.',
    points: ['Trajectory forecasting', 'Skill-gap analysis', 'Future role requirements'],
    href: '/tools/career-path',
    cta: 'Simulate My Path'
  }
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
            <h2>Everything You Need to Win the First Recruiter Pass</h2>
          </div>

          <div className={styles.pillarGrid}>
            {productPillars.map((pillar) => (
              <article
                key={pillar.title}
                className={`${styles.pillarCard} ${styles[`pillarCard${pillar.tag}`] || ''}`}
              >
                <span className={styles.pillarTag}>{pillar.tag}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
                <ul>
                  {pillar.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <TrackedLink
                  href={pillar.href}
                  ctaName={pillar.cta.toLowerCase().replace(/\s+/g, '_')}
                  ctaPage="Homepage"
                  ctaLocation="product_pillars"
                  className={`btn btn-secondary ${styles.pillarCtaBtn} ${pillar.tag === 'Resume' ? styles.pillarCtaResume : ''}`}
                >
                  {pillar.cta}
                </TrackedLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.workflowSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p>How It Works</p>
            <h2>A Clean Workflow From Raw Profile to Interview-Ready Assets</h2>
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
