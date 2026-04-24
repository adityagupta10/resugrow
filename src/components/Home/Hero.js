'use client';

import { useEffect, useState, useCallback, memo } from 'react';
import TrackedLink from '@/components/UI/TrackedLink';
import Image from 'next/image';
import styles from '@/app/page.module.css';

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
    src: '/hero-images/ats-optimized-resume-builder-preview.png',
    alt: 'AI resume builder sample with ATS-optimized professional resume layout for job seekers'
  },
  {
    src: '/hero-images/professional-resume-template-ats-friendly.png',
    alt: 'ATS-friendly resume template example designed to pass applicant tracking systems'
  },
  {
    src: '/hero-images/ai-resume-builder-job-application-template.png',
    alt: 'Professional resume format template for high-converting job applications and recruiter screening'
  },
  {
    src: '/hero-images/resume-template-interview-call-rate-boost.png',
    alt: 'Best resume template preview to improve interview call rate and hiring visibility'
  }
];

const targetCompanies = [
  { name: 'Meta', logo: '/company-logos/meta.svg', alt: 'Meta company for top tech job targeting' },
  { name: 'Google', logo: '/company-logos/google.svg', alt: 'Google company for software engineering' },
  { name: 'Amazon', logo: '/company-logos/amazon.svg', alt: 'Amazon company for competitive resume' },
  { name: 'Microsoft', logo: '/company-logos/microsoft.svg', alt: 'Microsoft company for AI resume' },
  { name: 'Stripe', logo: '/company-logos/stripe.svg', alt: 'Stripe company for fintech' },
  { name: 'Apple', logo: '/company-logos/apple.svg', alt: 'Apple company for premium tech' },
  { name: 'Netflix', logo: '/company-logos/netflix.svg', alt: 'Netflix company for product' },
  { name: 'Salesforce', logo: '/company-logos/salesforce.svg', alt: 'Salesforce company for cloud' },
  { name: 'Adobe', logo: '/company-logos/adobe.svg', alt: 'Adobe company for design' },
  { name: 'Uber', logo: '/company-logos/uber.svg', alt: 'Uber company for operations' }
];

function Hero() {
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

  const handleDotClick = useCallback((index) => {
    setActiveSlide(index);
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <p className={styles.heroKicker}>#1 AI Career Advancement Platform</p>
            <h2 className={styles.heroTitle}>
              <span className={styles.typewriterWrap}>
                <span className={styles.typewriterText}>{currentText}</span>
                <span className={styles.typewriterCursor}>|</span>
              </span>
              <br />
              with{' '}<span className="gradient-text">RESUGROW</span>{' '}Platform
            </h2>
            <p className={styles.heroSubtitle}>
              The AI-powered career engine trusted by 25M+ pros to get hired at Google, Tesla, Microsoft and beyond.
              <br />
              Build ATS-optimized resumes in 5 minutes with one-click job tailoring, AI-driven scoring, and a LinkedIn profile that ranks in the top 2%.
            </p>

            <div className={styles.heroActions}>
              <TrackedLink href="/resume/ai-builder" ctaName="build_ai_resume" ctaPage="Homepage" ctaLocation="hero" className={`btn btn-primary ${styles.heroPrimaryBtn}`}>
                Build my AI Powered resume
              </TrackedLink>
              <div className={styles.heroSecondaryActions}>
                <TrackedLink href="/resume/ats-checker" ctaName="ats_check" ctaPage="Homepage" ctaLocation="hero" className={`btn btn-secondary ${styles.heroSecondaryBtn}`}>
                  ATS-Pro Resume Score
                </TrackedLink>
              </div>
              <div className={styles.heroSecondaryActions}>
                <TrackedLink href="/tools" ctaName="all_tools" ctaPage="Homepage" ctaLocation="hero" className={`btn btn-secondary ${styles.heroSecondaryBtn}`}>
                  Explore All Career Tools
                </TrackedLink>
              </div>
            </div>

            <div className={styles.heroSignals}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '8px' }}>
                <span style={{ color: '#64748b', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Top Applicant Destinations</span>
                <span style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 500 }}>(We help candidates apply to these companies)</span>
              </div>
              <div className={styles.signalChips}>
                {targetCompanies.map((company) => (
                  <span key={company.name} className={styles.signalLogo} title={company.name}>
                    <Image src={company.logo} alt={company.alt} width={22} height={22} loading="lazy" />
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
              <span>RESUGROW Overview</span>
              <span>Live</span>
            </div>

            <div className={styles.panelScoreCard}>
              <div>
                <p>Composite Readiness</p>
                <p><b>89/100</b></p>
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
                    height={436}
                    sizes="(max-width: 768px) 100vw, 520px"
                    quality={index === 0 ? 80 : 65}
                    className={`${styles.panelImage} ${index === activeSlide ? styles.panelImageActive : ''}`}
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                ))}
              </div>
              <div className={styles.slideDots}>
                {heroResumeSlides.map((slide, index) => (
                  <button
                    key={slide.src}
                    type="button"
                    className={`${styles.slideDot} ${index === activeSlide ? styles.slideDotActive : ''}`}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Show resume preview ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
