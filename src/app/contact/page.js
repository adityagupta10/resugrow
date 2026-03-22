'use client';

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import EmojiImage from '@/components/UI/EmojiImage';
import styles from '../subpage.module.css';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setStatus('success');
        form.current.reset();
        setTimeout(() => setStatus('idle'), 5000);
      }, (error) => {
        console.error('EmailJS Error:', error);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.subpageContainer}>
          <div className={styles.subpageHeroBadge}>Get in Touch</div>
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
                <div className={styles.contactIcon}>
                  <EmojiImage emoji="📧" size={24} alt="Email ResuGrow at info@resugrow.com for career product support" />
                </div>
                <div>
                  <div className={styles.contactLabel}>Email</div>
                  <div className={styles.contactValue}>info@resugrow.com</div>
                </div>
              </div>

              <div className={styles.contactInfoItem}>
                <div className={styles.contactIcon}>
                  <EmojiImage emoji="📍" size={24} alt="ResuGrow office location pin for New Delhi India headquarters" />
                </div>
                <div>
                  <div className={styles.contactLabel}>Office</div>
                  <div className={styles.contactValue}>New Delhi, India</div>
                </div>
              </div>

              <div className={styles.contactInfoItem}>
                <div className={styles.contactIcon}>
                  <EmojiImage emoji="🕐" size={24} alt="Business hours clock for ResuGrow customer support availability" />
                </div>
                <div>
                  <div className={styles.contactLabel}>Business Hours</div>
                  <div className={styles.contactValue}>9:00 AM – 6:00 PM UCT</div>
                </div>
              </div>

              <div className={styles.contactInfoItem}>
                <div className={styles.contactIcon}>
                  <EmojiImage emoji="💬" size={24} alt="Live chat balloon icon for instant help during business hours" />
                </div>
                <div>
                  <div className={styles.contactLabel}>Live Chat</div>
                  <div className={styles.contactValue}>Available during business hours for instant help.</div>
                </div>
              </div>
            </div>

            <form className={styles.contactForm} ref={form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Full Name</label>
                <input type="text" name="user_name" className={styles.formInput} placeholder="John Doe" required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email Address</label>
                <input type="email" name="user_email" className={styles.formInput} placeholder="john@example.com" required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Subject</label>
                <input type="text" name="subject" className={styles.formInput} placeholder="How can we help?" required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Message</label>
                <textarea name="message" className={styles.formTextarea} placeholder="Tell us more about your question..." required></textarea>
              </div>
              <button
                type="submit"
                className={`btn btn-primary ${styles.formBtn}`}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' :
                  status === 'success' ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <EmojiImage emoji="✓" size={18} alt="Message sent successfully to ResuGrow support" />
                      Message Sent!
                    </span>
                  ) :
                    status === 'error' ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <EmojiImage emoji="❌" size={18} alt="Contact form failed to send — please try again or email info@resugrow.com" />
                        Error Sending
                      </span>
                    ) :
                      'Send Message'}
              </button>
              {status === 'error' && (
                <p style={{ color: '#dc2626', fontSize: '14px', marginTop: '8px' }}>
                  There was an error sending your message. Please try again or email us directly at info@resugrow.com.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
