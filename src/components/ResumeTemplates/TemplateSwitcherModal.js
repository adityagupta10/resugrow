import React from 'react';
import { RESUME_TEMPLATES } from './TemplateConfig';
import styles from './switcher.module.css';

export default function TemplateSwitcherModal({ activeId, onSelect, onClose }) {
  const getIcon = (id) => {
    switch (id) {
      case 'classic': return '📄';
      case 'modern': return '✨';
      case 'executive': return '👔';
      case 'minimalist': return '▫️';
      case 'creative': return '🎨';
      case 'startup': return '🚀';
      case 'tech': return '💻';
      case 'academic': return '🎓';
      case 'impact': return '📈';
      case 'swiss': return '🇨🇭';
      default: return '📝';
    }
  };
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Choose a Template</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        </div>
        <p className={styles.subtitle}>Select a design for your resume. Your typed data stays safe.</p>
        <div className={styles.grid}>
          {Object.values(RESUME_TEMPLATES).map((tmpl) => (
            <button
              key={tmpl.id}
              className={`${styles.card} ${activeId === tmpl.id ? styles.active : ''}`}
              onClick={() => {
                onSelect(tmpl.id);
                onClose();
              }}
            >
              <div className={styles.thumbnailPlaceholder}>
                 {getIcon(tmpl.id)}
              </div>
              <span className={styles.name}>{tmpl.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
