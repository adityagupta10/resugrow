'use client';

import { useState } from 'react';
import styles from '../subpage.module.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.subpageContainer}>
          <div className={styles.subpageHeroBadge}>📧 Get in Touch</div>
          <h1 className={styles.subpageTitle}>
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className={styles.subpageDesc}>
            Have questions or feedback? We&apos;d love to hear from you. Our team is here
            to help you succeed in your job search.
          </p>
        </div>
      </section>

      <section className={styles.subpage}>
        <div className={styles.subpageContainer}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>
                  Let&apos;s <span className="gradient-text">Talk</span>
                </h2>
                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '32px' }}>
                  Whether you have a question about features, pricing, or anything else,
                  our team is ready to answer all your questions.
                </p>
              </div>

              <div className={styles.contactInfoItem}>
                <div className={styles.contactIcon}>📧</div>
                <div>
                  <div className={styles.contactLabel}>Email</div>
                  <div className={styles.contactValue}>support@resugrow.com</div>
                </div>
              </div>

              <div className={styles.contactInfoItem}>
                <div className={styles.contactIcon}>📍</div>
                <div>
                  <div className={styles.contactLabel}>Office</div>
                  <div className={styles.contactValue}>123 Innovation Drive<br />San Francisco, CA 94105</div>
                </div>
              </div>

              <div className={styles.contactInfoItem}>
                <div className={styles.contactIcon}>🕐</div>
                <div>
                  <div className={styles.contactLabel}>Business Hours</div>
                  <div className={styles.contactValue}>Monday – Friday: 9:00 AM – 6:00 PM PST<br />Weekend: Limited Support</div>
                </div>
              </div>

              <div className={styles.contactInfoItem}>
                <div className={styles.contactIcon}>💬</div>
                <div>
                  <div className={styles.contactLabel}>Live Chat</div>
                  <div className={styles.contactValue}>Available during business hours for instant help.</div>
                </div>
              </div>
            </div>

            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Full Name</label>
                <input type="text" className={styles.formInput} placeholder="John Doe" required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email Address</label>
                <input type="email" className={styles.formInput} placeholder="john@example.com" required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Subject</label>
                <input type="text" className={styles.formInput} placeholder="How can we help?" required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Message</label>
                <textarea className={styles.formTextarea} placeholder="Tell us more about your question..." required></textarea>
              </div>
              <button type="submit" className={`btn btn-primary ${styles.formBtn}`}>
                {submitted ? '✓ Message Sent!' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
