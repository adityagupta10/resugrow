import React from 'react';
import Image from 'next/image';
import { RESUME_TEMPLATES } from './TemplateConfig';
import styles from './switcher.module.css';

export default function TemplateSwitcherModal({ activeId, onSelect, onClose }) {
  const templates = Object.values(RESUME_TEMPLATES);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Choose a Template</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        </div>
        <p className={styles.subtitle}>Select a design for your resume. Your typed data stays safe.</p>
        <div className={styles.content}>
          <div className={styles.grid}>
            {templates.map((tmpl, index) => (
              <button
                type="button"
                key={tmpl.id}
                className={`${styles.card} ${activeId === tmpl.id ? styles.active : ''}`}
                onClick={() => {
                  onSelect(tmpl.id);
                  onClose();
                }}
              >
                <div className={styles.thumbnail}>
                  {tmpl.preview ? (
                    <Image
                      src={tmpl.preview}
                      alt={`${tmpl.name} resume template preview`}
                      fill
                      className={styles.thumbnailImage}
                      sizes="(max-width: 768px) 86vw, (max-width: 1200px) 40vw, 320px"
                      priority={index < 3}
                    />
                  ) : (
                    <span className={styles.noPreview}>Preview unavailable</span>
                  )}
                </div>
                <div className={styles.cardInfo}>
                  <span className={styles.name}>{tmpl.name}</span>
                  <p className={styles.category}>{tmpl.category || 'Professional'}</p>
                  <div className={styles.tagRow}>
                    {(tmpl.tags || []).slice(0, 2).map((tag) => (
                      <span key={`${tmpl.id}-${tag}`} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
