import Link from 'next/link';
import styles from '../../subpage.module.css';
import Image from 'next/image';
import { templates as templateData } from '../../../data/templates';
import Testimonials from '@/components/Testimonials/Testimonials';
import { SITE_URL, createPageMetadata, getSoftwareAppJsonLd } from '@/lib/seo';
import { useState } from 'react';

'use client';

export const metadata = createPageMetadata({
  title: 'ATS-Friendly Resume Templates | Modern & Recruiter-Tested',
  description:
    'Browse resume templates optimized for ATS parsing and clean recruiter readability across industries.',
  path: '/resume/templates',
  keywords: ['resume templates', 'ATS templates', 'professional resume layout']
});

const templates = templateData;

export default function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  const softwareJsonLd = getSoftwareAppJsonLd({
    name: 'ResuGrow Resume Templates',
    description:
      'Browse ATS-friendly resume templates optimized for recruiter readability across industries.',
    url: `${SITE_URL}/resume/templates`,
    price: '0.00',
  });

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const closeModal = () => {
    setSelectedTemplate(null);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <section className={styles.subpageHero}>
        <div className={styles.subpageContainer}>
          <div className={styles.subpageHeroBadge}>Templates</div>
          <h1 className={styles.subpageTitle}>
            High Impact <span className="gradient-text">Resume Templates</span>
          </h1>
          <p className={styles.subpageDesc}>
            Professional templates designed by resume experts and tested with real recruiters.
            ATS-friendly and fully customizable.
          </p>
          <div className={styles.subpageBtn}>
            <Link href="/resume/ai-builder" className="btn btn-primary">Start Customizing</Link>
          </div>
        </div>
      </section>

      <section className={styles.subpage}>
        <div className={styles.subpageContainer}>
          <div className={styles.templatesGallery}>
            {templates.map((t) => (
              <div key={t.name} className={styles.galleryCard} onClick={() => handleTemplateClick(t)}>
                <div className={styles.galleryPreview}>
                  <div className={styles.galleryDoc}>
                    <Image
                      src={t.image}
                      alt={`${t.name} modern ATS resume template for professional job applications and recruiter screening`}
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
                alt={`${selectedTemplate.name} enlarged resume template view`}
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
                <Link href="/resume/ai-builder" className="btn btn-primary">
                  Use This Template
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Testimonials 
        title="Templates that Get Hired" 
        subtitle="See how our ATS-optimized layouts helped these professionals land interviews at top companies." 
      />
    </>
  );
}
