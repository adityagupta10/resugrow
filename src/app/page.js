'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { templates as templateData } from '../data/templates';

// Dynamic imports for components below the fold
const Hero = dynamic(() => import('@/components/Home/Hero'), {
  ssr: false,
  loading: () => <div className="bg-gray-50 h-[600px] w-full animate-pulse" />
});

const Testimonials = dynamic(() => import('@/components/Testimonials/Testimonials'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-50 h-96 rounded-2xl" />
});

const productPillars = [
  {
    tag: 'ATS',
    title: 'ATS Resume Checker',
    desc: 'Scan your resume like a recruiter system and pinpoint keyword, structure, and formatting leaks instantly.',
    points: ['Deterministic scoring', 'Industry-aware keyword mapping', 'Priority fixes in one view'],
    href: '/resume/ats-checker',
    cta: 'Run ATS Check'
  },
  {
    tag: 'Resume',
    title: 'AI powered Resume builder',
    desc: 'Create a job-ready resume with AI guidance, clean formatting, and ATS-safe structure in minutes.',
    points: ['Smart section suggestions', 'ATS-friendly formatting', 'One-click export workflow'],
    href: '/resume/ai-builder',
    cta: 'Build My Resume'
  },
  {
    tag: 'LinkedIn',
    title: 'LinkedIn Profile Reviewer',
    desc: 'Upload PDF or paste profile text for a strict, section-wise score that highlights visibility blockers.',
    points: ['PDF + direct paste modes', 'Core pillar breakdown', 'Action-ready optimization path'],
    href: '/linkedin-review',
    cta: 'Scan LinkedIn Profile'
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

const faqData = [
  {
    q: 'Is ResuGrow beginner-friendly?',
    a: 'Yes. ResuGrow is designed as a guided workflow, not a blank editor. You can start with your existing resume, run a scan, and apply fixes in priority order without needing professional writing experience.'
  },
  {
    q: 'What should I use first: Builder, ATS Checker, or LinkedIn tools?',
    a: 'For most users, the best sequence is: build or upload your resume, run ATS Checker, then optimize LinkedIn. This creates alignment across documents so recruiters see a consistent professional narrative across every touchpoint.'
  },
  {
    q: 'How accurate are the scores?',
    a: 'Scores are deterministic and rule-based, so the same input returns the same result. That makes progress trackable because each content change has a clear impact on specific scoring modules.'
  },
  {
    q: 'Can I optimize for a specific industry?',
    a: 'Yes. Industry targeting is built into ATS analysis, so your report prioritizes keywords and language patterns relevant to your target sector instead of generic advice.'
  },
  {
    q: 'How is this different from a normal resume template website?',
    a: 'Most template websites stop at design. ResuGrow combines templates with scoring, rewrite logic, and keyword gap analysis so you can improve quality with data-backed direction rather than guesswork.'
  },
  {
    q: 'Can ResuGrow help me improve weak bullet points quickly?',
    a: 'Yes. The SAR Rewriter transforms weak responsibility-style bullets into measurable achievement statements. You can then tune them with your exact numbers for stronger recruiter impact.'
  },
  {
    q: 'Will this help with both ATS and human recruiters?',
    a: 'That is the core goal. ResuGrow improves machine readability for ATS while also strengthening clarity, positioning, and quantified outcomes for human decision-makers.'
  },
  {
    q: 'Do I need to rewrite everything manually after scanning?',
    a: 'No. The platform highlights highest-impact fixes first and provides rewrite support so you can focus only on sections that materially improve your score and conversion quality.'
  }
];

const templates = templateData.slice(0, 4);

const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ResuGrow',
  alternateName: 'ResuGrow AI',
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

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
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
                className={`${styles.pillarCard} ${pillar.tag === 'Resume' ? styles.pillarCardResume : ''}`}
              >
                <span className={styles.pillarTag}>{pillar.tag}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
                <ul>
                  {pillar.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Link
                  href={pillar.href}
                  className={`btn btn-secondary ${styles.pillarCtaBtn} ${pillar.tag === 'Resume' ? styles.pillarCtaResume : ''}`}
                >
                  {pillar.cta}
                </Link>
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
          <div className={styles.faqList}>
            {faqData.map((faq, idx) => (
              <div key={faq.q} className={styles.faqItem}>
                <button
                  className={styles.faqButton}
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  type="button"
                >
                  <span>{faq.q}</span>
                  <span className={styles.faqIcon}>{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && <p className={styles.faqAnswer}>{faq.a}</p>}
              </div>
            ))}
          </div>
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
              <Link href="/resume/ats-checker" className="btn btn-primary">
                Start Free ATS Check
              </Link>
              <Link href="/linkedin-review" className="btn btn-secondary">
                Analyze LinkedIn Profile
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
