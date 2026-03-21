'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { templates as templateData } from '../data/templates';

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
  { value: '< 30 sec', label: 'Average first score generation' }
];

const testimonials = [
  {
    text: 'I stopped guessing. The ATS checker showed exactly what was missing and my response rate changed within one week.',
    name: 'Sarah Chen',
    role: 'Software Engineer',
    initials: 'SC'
  },
  {
    text: 'LinkedIn review made the gaps obvious. After rewriting my About and headline, recruiter messages picked up fast.',
    name: 'Marcus Johnson',
    role: 'Marketing Director',
    initials: 'MJ'
  },
  {
    text: 'The SAR rewriter is practical, not generic. It transformed my vague bullets into strong impact statements I could use directly.',
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    initials: 'ER'
  }
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

const heroPhrases = [
  'Get hired faster',
  'Unlock the dream job',
  'Increase your salary',
  'Level up your career',
  'Ace your job search',
  'Beat the hiring bots',
  'Secure your future',
  'Land more interviews',
  'Skip the waitlist'
];

const heroResumeSlides = [
  {
    src: '/hero-images/hero-resume1.png',
    alt: 'AI resume builder sample with ATS-optimized professional resume layout for job seekers'
  },
  {
    src: '/hero-images/hero-resume2.png',
    alt: 'ATS-friendly resume template example designed to pass applicant tracking systems'
  },
  {
    src: '/hero-images/hero-resume3.png',
    alt: 'Professional resume format template for high-converting job applications and recruiter screening'
  },
  {
    src: '/hero-images/hero-resume4.png',
    alt: 'Best resume template preview to improve interview call rate and hiring visibility'
  }
];

const targetCompanies = [
  {
    name: 'Meta',
    logo: '/company-logos/meta.svg',
    alt: 'Meta company for top tech job targeting with ATS optimized resumes'
  },
  {
    name: 'Google',
    logo: '/company-logos/google.svg',
    alt: 'Google company for software engineering and product role applications'
  },
  {
    name: 'Amazon',
    logo: '/company-logos/amazon.svg',
    alt: 'Amazon company for competitive resume and interview preparation'
  },
  {
    name: 'Microsoft',
    logo: '/company-logos/microsoft.svg',
    alt: 'Microsoft company for AI resume builder and ATS profile optimization'
  },
  {
    name: 'Stripe',
    logo: '/company-logos/stripe.svg',
    alt: 'Stripe company for fintech career opportunities and recruiter visibility'
  },
  {
    name: 'Apple',
    logo: '/company-logos/apple.svg',
    alt: 'Apple company for premium tech resume targeting and hiring pipelines'
  },
  {
    name: 'Netflix',
    logo: '/company-logos/netflix.svg',
    alt: 'Netflix company for product and engineering job seeker targeting'
  },
  {
    name: 'Salesforce',
    logo: '/company-logos/salesforce.svg',
    alt: 'Salesforce company for cloud and SaaS career resume optimization'
  },
  {
    name: 'Adobe',
    logo: '/company-logos/adobe.svg',
    alt: 'Adobe company for design, marketing, and product role applications'
  },
  {
    name: 'Uber',
    logo: '/company-logos/uber.svg',
    alt: 'Uber company for operations and engineering hiring target companies'
  }
];

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
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const phrase = heroPhrases[currentPhraseIndex];
    const speed = isDeleting ? 32 : 58;

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === phrase) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && currentText.length === 0) {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % heroPhrases.length);
        return;
      }

      const nextText = isDeleting
        ? phrase.substring(0, currentText.length - 1)
        : phrase.substring(0, currentText.length + 1);
      setCurrentText(nextText);
    }, currentText === phrase && !isDeleting ? 1300 : speed);

    return () => clearTimeout(timer);
  }, [currentText, currentPhraseIndex, isDeleting]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroResumeSlides.length);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />

      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <p className={styles.heroKicker}>#1 AI Career Advancement Platform</p>
              <h1 className={styles.heroTitle}>
                <span className={styles.typewriterWrap}>
                  <span className={styles.typewriterText}>{currentText}</span>
                  <span className={styles.typewriterCursor}>|</span>
                </span>
                <br />
                with <span className="gradient-text">ResuGrow</span> Platform
              </h1>
              <p className={styles.heroSubtitle}>
                The AI-powered career engine trusted by 25M+ pros to get hired at Google, Tesla, Microsoft and beyond.
                <br />
                Build ATS-optimized resumes in 5 minutes with one-click job tailoring, AI-driven scoring, and a LinkedIn profile that ranks in the top 2%.
              </p>

              <div className={styles.heroActions}>
                <Link href="/resume/ai-builder" className={`btn btn-primary ${styles.heroPrimaryBtn}`}>
                  Build my AI Powered resume
                </Link>
                <div className={styles.heroSecondaryActions}>
                  <Link href="/resume/ats-checker" className={`btn btn-secondary ${styles.heroSecondaryBtn}`}>
                    ATS-Pro Resume Score
                  </Link>
                </div>
                <div className={styles.heroSecondaryActions}>
                  <Link href="/linkedin-makeover" className={`btn btn-secondary ${styles.heroSecondaryBtn}`}>
                    Linkedin Profile Makeover
                  </Link>
                </div>
              </div>

              <div className={styles.heroSignals}>
                <span>Trusted by candidates targeting:</span>
                <div className={styles.signalChips}>
                  {targetCompanies.map((company) => (
                    <span key={company.name} className={styles.signalLogo} title={company.name}>
                      <Image src={company.logo} alt={company.alt} width={22} height={22} />
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="https://www.linkedin.com/company/resugrow-com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkedinHint}
              >
                Follow product updates on LinkedIn →
              </a>
            </div>

            <div className={styles.heroPanel}>
              <div className={styles.panelTop}>
                <span>ResuGrow Overview</span>
                <span>Live</span>
              </div>

              <div className={styles.panelScoreCard}>
                <div>
                  <p>Composite Readiness</p>
                  <h3>89/100</h3>
                </div>
                <div className={styles.scoreRing}>+18</div>
              </div>

              <div className={styles.panelImageWrap}>
                <div className={styles.panelSlides}>
                  {heroResumeSlides.map((slide, index) => (
                    <Image
                      key={slide.src}
                      src={slide.src}
                      alt={slide.alt}
                      width={520}
                      height={620}
                      className={`${styles.panelImage} ${index === activeSlide ? styles.panelImageActive : ''}`}
                      priority={index === 0}
                    />
                  ))}
                </div>
                <div className={styles.slideDots}>
                  {heroResumeSlides.map((slide, index) => (
                    <button
                      key={slide.src}
                      type="button"
                      className={`${styles.slideDot} ${index === activeSlide ? styles.slideDotActive : ''}`}
                      onClick={() => setActiveSlide(index)}
                      aria-label={`Show resume preview ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

          <div className={styles.testimonialGrid}>
            {testimonials.map((item) => (
              <article key={item.name} className={styles.testimonialCard}>
                <p>{item.text}</p>
                <div className={styles.testimonialAuthor}>
                  <span>{item.initials}</span>
                  <div>
                    <h4>{item.name}</h4>
                    <small>{item.role}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
