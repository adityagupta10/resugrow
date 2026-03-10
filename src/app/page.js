'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

const features = [
  {
    icon: '🎨',
    color: 'blue',
    title: 'Pick a template',
    desc: 'ATS-friendly, recruiter-approved resume templates.',
    items: ['ATS-friendly, recruiter-approved', 'Flexible layouts', 'Job and industry match'],
  },
  {
    icon: '🤖',
    color: 'purple',
    title: 'Add content with AI',
    desc: 'Let AI write your resume content for you.',
    items: ["Writer's block solution", 'Enhance skills and bullets with AI', 'Quick updates for skills, work history, and more'],
  },
  {
    icon: '📤',
    color: 'amber',
    title: 'Download & send',
    desc: 'Export in popular formats and share instantly.',
    items: ['Popular file formats (ie. Word, PDF)', 'Instant digital profile', 'Unlimited versions'],
  },
  {
    icon: '⚡',
    color: 'green',
    title: 'Finish resume in minutes',
    desc: 'Fast, guided builder gets you results quickly.',
    items: ['Step-by-step guidance', 'Pre-written phrases', 'Real-time preview'],
  },
];

const templates = [
  { name: 'Executive Blue', category: 'Professional', color: '#2563eb', badge: 'popular' },
  { name: 'Modern Minimal', category: 'Creative', color: '#7c3aed', badge: null },
  { name: 'Classic Elegant', category: 'Traditional', color: '#0f766e', badge: 'new' },
  { name: 'Bold Impact', category: 'Modern', color: '#dc2626', badge: null },
];

const whyFeatures = [
  { icon: '🎯', title: 'Beat the ATS', desc: 'Our templates are designed to pass Applicant Tracking Systems used by 98% of Fortune 500 companies.' },
  { icon: '⚡', title: 'AI-Powered Writing', desc: 'Get intelligent suggestions for your professional summary, skills, and work experience descriptions.' },
  { icon: '🔄', title: 'One-Click Tailoring', desc: 'Instantly customize your resume for any job posting with our AI job-matching technology.' },
  { icon: '📊', title: 'Real-Time Scoring', desc: 'See your resume score improve in real-time as you make changes and optimizations.' },
];

const testimonials = [
  {
    text: "ResuGrow completely transformed my job search. I went from zero callbacks to 5 interviews in my first week after using their AI builder. The ATS optimization is incredible!",
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    avatar: '#2563eb',
    initials: 'SC',
  },
  {
    text: "The AI writing suggestions are spot-on. It helped me articulate my experience in ways I never could have on my own. Landed my dream job within a month!",
    name: 'Marcus Johnson',
    role: 'Marketing Director at Spotify',
    avatar: '#7c3aed',
    initials: 'MJ',
  },
  {
    text: "I was skeptical about AI resume builders, but ResuGrow blew me away. The templates are beautiful and the ATS checker gave me confidence that my resume would actually be seen.",
    name: 'Emily Rodriguez',
    role: 'Product Manager at Meta',
    avatar: '#059669',
    initials: 'ER',
  },
];

const faqData = [
  {
    q: 'Is ResuGrow free to use?',
    a: 'ResuGrow offers a free plan that includes basic resume building features. Our premium plans unlock AI-powered writing, ATS optimization, unlimited templates, and more. You can start building your resume for free and upgrade whenever you need more features.',
  },
  {
    q: 'How does the AI resume builder work?',
    a: 'Our AI analyzes your experience, skills, and target job to generate professional content. Simply enter your basic information, and the AI will suggest optimized bullet points, professional summaries, and skills that match your industry and target role.',
  },
  {
    q: 'What is an ATS and why does it matter?',
    a: 'An Applicant Tracking System (ATS) is software used by employers to filter resumes before a human ever sees them. Over 90% of large companies use ATS. ResuGrow ensures your resume is formatted correctly and contains the right keywords to pass these systems.',
  },
  {
    q: 'Can I download my resume in different formats?',
    a: 'Yes! You can download your resume as a PDF, Word document (.docx), or plain text file. Our PDF exports are pixel-perfect and our Word documents maintain full formatting for easy editing.',
  },
  {
    q: 'How is ResuGrow different from other resume builders?',
    a: 'ResuGrow combines AI-powered content generation, real-time ATS scoring, one-click job tailoring, and recruiter-approved templates in one platform. Our AI learns from millions of successful resumes to give you the best possible results.',
  },
  {
    q: 'Can I create multiple versions of my resume?',
    a: 'Absolutely! With ResuGrow, you can create unlimited versions of your resume, each tailored to different job applications. Our one-click tailoring feature makes it easy to customize your resume for specific job postings.',
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              ✨ <span>#1 AI Resume Builder</span>
            </div>
            <h1 className={styles.heroTitle}>
              Land more interviews with{' '}
              <span className={styles.heroHighlight}>ResuGrow&apos;s</span> Resume Builder
            </h1>
            <p className={styles.heroDesc}>
              ATS Check, AI Writer, and One-Click Job Tailoring make your resume stand out to recruiters.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/resume/ai-builder" className="btn btn-primary">
                Build your resume →
              </Link>
              <Link href="/resume/ats-checker" className="btn btn-secondary">
                📊 Get your resume Score
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statIcon}>⭐</span>
                <div className={styles.statText}>
                  <strong>5,126</strong> Reviews
                </div>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statIcon}>💬</span>
                <div className={styles.statText}>
                  <strong>21,452</strong> users landed interviews last month
                </div>
              </div>
            </div>
          </div>

          <div className={styles.heroImage}>
            <div className={styles.heroImageWrapper}>
              <Image
                src="/hero-resume.png"
                alt="ResuGrow AI Resume Builder - Professional resume with AI writing assistance"
                width={520}
                height={520}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Make a Resume That Gets You Hired */}
      <section className={styles.features}>
        <div className={styles.featuresContainer}>
          <div className={styles.featuresHeader}>
            <h2 className={styles.featuresTitle}>
              Make a Resume That Gets You <span className="gradient-text">Hired</span>
            </h2>
            <p className={styles.featuresSubtitle}>
              Our step-by-step process makes it easy to create a winning resume in minutes.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature) => (
              <div key={feature.title} className={styles.featureCard}>
                <div className={`${styles.featureIcon} ${styles[feature.color]}`}>
                  {feature.icon}
                </div>
                <h3 className={styles.featureCardTitle}>{feature.title}</h3>
                <p className={styles.featureCardDesc}>{feature.desc}</p>
                <div className={styles.featureList}>
                  {feature.items.map((item) => (
                    <div key={item} className={styles.featureListItem}>
                      <span className={styles.featureCheck}>✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className={styles.templates}>
        <div className={styles.templatesContainer}>
          <div className={styles.templatesHeader}>
            <h2 className={styles.templatesTitle}>
              Tested Resume <span className="gradient-text">Templates</span>
            </h2>
            <p className={styles.templatesSubtitle}>
              Use the templates recruiters like. Download to Word or PDF.
            </p>
          </div>

          <div className={styles.templatesGrid}>
            {templates.map((template) => (
              <div key={template.name} className={styles.templateCard}>
                <div className={styles.templatePreview}>
                  <div className={styles.templateDoc}>
                    <div className={styles.templateDocHeader} style={{ background: template.color }} />
                    <div className={`${styles.templateDocLine} ${styles.long}`} />
                    <div className={`${styles.templateDocLine} ${styles.medium}`} />
                    <div className={`${styles.templateDocLine} ${styles.short}`} />
                    <div className={styles.templateDocSection} style={{ background: template.color + '40' }} />
                    <div className={`${styles.templateDocLine} ${styles.long}`} />
                    <div className={`${styles.templateDocLine} ${styles.medium}`} />
                    <div className={`${styles.templateDocLine} ${styles.long}`} />
                    <div className={styles.templateDocSection} style={{ background: template.color + '40' }} />
                    <div className={`${styles.templateDocLine} ${styles.medium}`} />
                    <div className={`${styles.templateDocLine} ${styles.long}`} />
                    <div className={`${styles.templateDocLine} ${styles.short}`} />
                  </div>
                  {template.badge && (
                    <span className={`${styles.templateBadge} ${styles[template.badge]}`}>
                      {template.badge}
                    </span>
                  )}
                </div>
                <div className={styles.templateInfo}>
                  <h3 className={styles.templateName}>{template.name}</h3>
                  <p className={styles.templateCategory}>{template.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.templatesBtn}>
            <Link href="/resume/templates" className="btn btn-primary">
              View All Templates →
            </Link>
          </div>
        </div>
      </section>

      {/* Why ResuGrow Section */}
      <section className={styles.whySection}>
        <div className={styles.whyContainer}>
          <div className={styles.whyGrid}>
            <div className={styles.whyContent}>
              <div className={styles.whyBadge}>💡 Why ResuGrow?</div>
              <h2 className={styles.whyTitle}>
                Why Use ResuGrow&apos;s <span className="gradient-text">AI Powered</span> Resume Builder
              </h2>
              <p className={styles.whyDesc}>
                Our AI-powered platform combines cutting-edge technology with recruiter insights
                to help you create the perfect resume that lands more interviews.
              </p>
              <div className={styles.whyFeatures}>
                {whyFeatures.map((f) => (
                  <div key={f.title} className={styles.whyFeature}>
                    <div className={styles.whyFeatureIcon}>{f.icon}</div>
                    <div className={styles.whyFeatureText}>
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.whyImage}>
              <div className={styles.whyImageWrapper}>
                <div className={styles.whyImageBg}>
                  <svg className={styles.whyIllustration} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Resume Document */}
                    <rect x="80" y="30" width="240" height="240" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="2"/>
                    <rect x="100" y="55" width="200" height="8" rx="4" fill="#2563eb"/>
                    <rect x="100" y="75" width="160" height="6" rx="3" fill="#e2e8f0"/>
                    <rect x="100" y="90" width="180" height="6" rx="3" fill="#e2e8f0"/>
                    <rect x="100" y="105" width="120" height="6" rx="3" fill="#e2e8f0"/>
                    <rect x="100" y="130" width="80" height="6" rx="3" fill="#2563eb" opacity="0.3"/>
                    <rect x="100" y="145" width="190" height="6" rx="3" fill="#e2e8f0"/>
                    <rect x="100" y="160" width="170" height="6" rx="3" fill="#e2e8f0"/>
                    <rect x="100" y="175" width="200" height="6" rx="3" fill="#e2e8f0"/>
                    <rect x="100" y="200" width="80" height="6" rx="3" fill="#2563eb" opacity="0.3"/>
                    <rect x="100" y="215" width="180" height="6" rx="3" fill="#e2e8f0"/>
                    <rect x="100" y="230" width="150" height="6" rx="3" fill="#e2e8f0"/>
                    {/* AI sparkle */}
                    <circle cx="340" cy="60" r="24" fill="#7c3aed" opacity="0.1"/>
                    <text x="332" y="67" fontSize="20">✨</text>
                    {/* Check mark */}
                    <circle cx="340" cy="140" r="20" fill="#10b981" opacity="0.15"/>
                    <text x="332" y="147" fontSize="18">✓</text>
                    {/* Score indicator */}
                    <rect x="60" y="180" width="50" height="28" rx="14" fill="#2563eb"/>
                    <text x="72" y="199" fontSize="12" fill="white" fontWeight="bold">98%</text>
                  </svg>
                </div>
              </div>
              <div className={styles.whyStats}>
                <div className={styles.whyStatsIcon}>📈</div>
                <div>
                  <div className={styles.whyStatsNumber}>3x</div>
                  <div className={styles.whyStatsLabel}>More Interview Calls</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - 92% Recommend */}
      <section className={styles.testimonials}>
        <div className={styles.testimonialsContainer}>
          <div className={styles.testimonialsHeader}>
            <h2 className={styles.testimonialsTitle}>
              <span className="gradient-text">92%</span> of customers recommend us
            </h2>
          </div>
          <div className={styles.ratingOverall}>
            <div className={styles.ratingStars}>
              {'★★★★★'.split('').map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </div>
            <span className={styles.ratingScore}>4.8/5</span>
            <span className={styles.ratingCount}>Based on 5,126 reviews</span>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((t) => (
              <div key={t.name} className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar} style={{ background: t.avatar }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className={styles.testimonialName}>{t.name}</div>
                    <div className={styles.testimonialRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faq}>
        <div className={styles.faqContainer}>
          <div className={styles.faqHeader}>
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            <p className={styles.faqSubtitle}>Everything you need to know about ResuGrow</p>
          </div>

          <div className={styles.faqList}>
            {faqData.map((faq, i) => (
              <div key={i} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <svg
                    className={`${styles.faqChevron} ${openFaq === i ? styles.open : ''}`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <div className={styles.faqAnswer}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Ready to Build Your Perfect Resume?</h2>
          <p className={styles.ctaDesc}>
            Join 21,000+ professionals who landed their dream jobs with ResuGrow
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/resume/ai-builder" className={`btn ${styles.ctaBtnWhite}`}>
              Start Building for Free →
            </Link>
            <Link href="/resume/templates" className={`btn ${styles.ctaBtnOutline}`}>
              Browse Templates
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
