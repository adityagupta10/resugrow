'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../subpage.module.css';

export default function TemplateGallery({ templates }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    if (selectedTemplate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedTemplate]);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const closeModal = () => {
    setSelectedTemplate(null);
  };

  return (
    <>
      <section className={styles.subpage}>
        <div className={styles.subpageContainer}>
          <div className={styles.templatesGallery}>
            {templates.map((t) => (
              <div key={t.name} className={styles.galleryCard} onClick={() => handleTemplateClick(t)}>
                <div className={styles.galleryPreview}>
                  <div className={styles.galleryDoc}>
                    <Image
                      src={t.image}
                      alt={`${t.name} professional cover letter template for job applications and interview callbacks`}
                      fill
                      className={styles.templateImg}
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 900px) 100vw, 25vw"
                    />
                  </div>
                </div>
                <div className={styles.galleryInfo}>
                  <h3 className={styles.galleryName}>{t.name}</h3>
                  <p className={styles.galleryCategory}>{t.category}</p>
                  <div className={styles.galleryTags}>
                    {t.tags.map((tag) => (
                      <span key={tag} className={styles.galleryTag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for enlarged template view */}
      {selectedTemplate && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>×</button>
            <div className={styles.modalImage}>
              <Image
                src={selectedTemplate.image}
                alt={`${selectedTemplate.name} enlarged cover letter template view`}
                fill
                style={{ objectFit: 'contain' }}
                sizes="90vw"
              />
            </div>
            <div className={styles.modalInfo}>
              <h3>{selectedTemplate.name}</h3>
              <p>{selectedTemplate.category}</p>
              <div className={styles.modalTags}>
                {selectedTemplate.tags.map((tag) => (
                  <span key={tag} className={styles.galleryTag}>{tag}</span>
                ))}
              </div>
              <div className={styles.modalActions}>
                <Link href="/cover-letter/builder" className="btn btn-primary">
                  Use This Template
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
