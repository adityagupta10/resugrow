'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
    src: '/hero-images/ats-optimized-resume-builder-preview.webp',
    alt: 'AI resume builder sample with ATS-optimized professional resume layout for job seekers'
  },
  {
    src: '/hero-images/professional-resume-template-ats-friendly.webp',
    alt: 'ATS-friendly resume template example designed to pass applicant tracking systems'
  },
  {
    src: '/hero-images/ai-resume-builder-job-application-template.webp',
    alt: 'Professional resume format template for high-converting job applications and recruiter screening'
  },
  {
    src: '/hero-images/resume-template-interview-call-rate-boost.webp',
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

export default function Hero() {
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
              with <span className="gradient-text">RESUGROW</span> Platform
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
                    width={304}
                    height={304}
                    sizes="(max-width: 768px) 304px, 520px"
                    quality={index === 0 ? 85 : 75}
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
  );
}
