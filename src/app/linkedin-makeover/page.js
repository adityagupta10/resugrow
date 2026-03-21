'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

const heroPhrases = [
  "Optimize your Profile",
  "Boost your Network",
  "Expand your Reach",
  "Maximize Visibility",
  "Refresh your Brand",
  "Upgrade your Status",
  "Polish your Presence",

];

const painPoints = [
  { icon: '😕', title: 'Incomplete or Outdated', desc: "You've added your job titles, but it doesn't truly represent who you are or the impact you've made." },
  { icon: '👁️', title: 'Zero Profile Views', desc: "Despite being active on the platform, your profile isn't attracting recruiters or inbound opportunities." },
  { icon: '✍️', title: 'Writer\'s Block', desc: "You're unsure how to write a compelling 'About' section. Writing about yourself is hard—and generic templates don't cut it." },
  { icon: '⏳', title: 'Too Busy', desc: "Between meetings and deadlines, optimizing your LinkedIn always gets pushed to \"someday.\"" },
];

const processSteps = [
  { step: '1', title: 'Share Your Link', desc: 'Just send us your current LinkedIn URL. No lengthy forms or uploads—we keep it simple.' },
  { step: '2', title: 'Expert Assigned', desc: 'A dedicated expert studies your current content and identifies exactly what\'s missing or needs a revamp (takes up to 2 days).' },
  { step: '3', title: 'Complete Makeover', desc: 'We rewrite your headline, about, banner ideas, and experience sections to make your profile magnetic (takes up to 5 days).' },
];

const features = [
  { title: 'Stand Out at First Glance', desc: 'We revamp your headline, banner ideas, and profile layout to grab attention in seconds.' },
  { title: 'Speak to Dream Recruiters', desc: 'Content rewritten by experts to showcase your strengths and align with recruiter searches.' },
  { title: 'Show Up in Searches', desc: 'We optimize every detail—from skills to keywords—so you get discovered by the right people.' },
];

const testimonials = [
  { text: "Before my LinkedIn felt outdated and inconsistent. Now, it feels modern, aligned with my personal brand, and I actually enjoy using it.", name: "Alex P.", role: "Product Manager", avatar: "#2563eb", initials: "AP" },
  { text: "Exceptional job! Worth every penny spent. Before I wasn't sure what to write in my achievements. Your expert rewrote it so well...", name: "Sarah M.", role: "Marketing Director", avatar: "#7c3aed", initials: "SM" },
  { text: "Before my profile was just a copy-paste of my resume. You made it conversational, strategic, and sharp. It finally speaks to my audience.", name: "David K.", role: "Software Engineer", avatar: "#059669", initials: "DK" }
];

export default function LinkedinMakeover() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 80;
    const currentPhrase = heroPhrases[currentPhraseIndex];

    let timer;
    if (isDeleting) {
      if (currentText === "") {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % heroPhrases.length);
        }, 500); // pause before starting to type new phrase
      } else {
        timer = setTimeout(() => {
          setCurrentText(currentPhrase.substring(0, currentText.length - 1));
        }, typeSpeed);
      }
    } else {
      if (currentText === currentPhrase) {
        timer = setTimeout(() => setIsDeleting(true), 2000); // pause before deleting
      } else {
        timer = setTimeout(() => {
          setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        }, typeSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex]);

  return (
    <div className={styles.makeoverPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span>Expert LinkedIn Service</span>
            </div>
            <h1 className={styles.heroTitle}>
              <span className={styles.typewriterText}>
                {currentText}
                <span className={styles.cursor}>|</span>
              </span>
              <br />
              with <span className="gradient-text">ResuGrow&apos;s</span> LinkedIn Optimizer
            </h1>
            <p className={styles.heroDesc}>
              Your LinkedIn profile is either opening doors—or being ignored. We completely rewrite every section so your profile sells your value and gets you noticed.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/payment?service=linkedin-makeover&source=makeover-hero" className="btn btn-primary btn-lg">
                Yes, I want a Professional makeover
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.imageStack}>
              <Image
                src="/linkedin-makeover.png"
                alt="LinkedIn profile makeover example with AI optimization for headline, about section, and recruiter visibility"
                width={500}
                height={500}
                className={styles.bouncingImage}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className={styles.painPoints}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            Struggling to Make Your LinkedIn Profile Stand Out?
          </h2>
          <p className={styles.sectionSubtitle}>
            The reason might be one of these common pitfalls.
          </p>
          <div className={styles.painGrid}>
            {painPoints.map((point) => (
              <div key={point.title} className={styles.painCard}>
                <div className={styles.painIcon}>{point.icon}</div>
                <h3 className={styles.painCardTitle}>{point.title}</h3>
                <p className={styles.painCardDesc}>{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition / Features */}
      <section className={styles.valueProp}>
        <div className={styles.sectionContainer}>
          <div className={styles.valueGrid}>
            <div className={styles.valueContent}>
              <h2 className={styles.sectionTitleLeft}>
                We Turn Your LinkedIn Into a <span className="gradient-text">Magnet</span> for Opportunities
              </h2>
              <p className={styles.sectionSubtitleLeft}>
                You&apos;ve got the experience, the skills, and the potential. But your profile isn&apos;t showing it—and that&apos;s where we come in. At ResuGrow, we completely transform it.
              </p>
            </div>
            <div className={styles.featuresList}>
              {features.map((feature) => (
                <div key={feature.title} className={styles.featureItem}>
                  <div>
                    <h4 className={styles.featureTitle}>{feature.title}</h4>
                    <p className={styles.featureDesc}>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.process}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            How It Works
          </h2>
          <p className={styles.sectionSubtitle}>
            Transform your LinkedIn in just 3 simple steps.
          </p>
          <div className={styles.processGrid}>
            {processSteps.map((step) => (
              <div key={step.step} className={styles.processCard}>
                <div className={styles.stepNumber}>{step.step}</div>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Real People. Real Results.</h2>
          <div className={styles.testiGrid}>
            {testimonials.map((t) => (
              <div key={t.name} className={styles.testiCard}>
                <div className={styles.testiStars}>★★★★★</div>
                <p className={styles.testiText}>&ldquo;{t.text}&rdquo;</p>
                <div className={styles.testiAuthor}>
                  <div className={styles.testiAvatar} style={{ background: t.avatar }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className={styles.testiName}>{t.name}</div>
                    <div className={styles.testiRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Ready to Become a Recruiter Magnet?</h2>
          <p className={styles.ctaDesc}>
            Don&apos;t let a poor LinkedIn profile be the reason you miss out on your dream job.
          </p>
          <Link href="/payment?service=linkedin-makeover&source=makeover-bottom-cta" className={`btn btn-lg ${styles.ctaBtnWhite}`}>
            Claim Your Makeover Now
          </Link>
        </div>
      </section>
    </div>
  );
}
