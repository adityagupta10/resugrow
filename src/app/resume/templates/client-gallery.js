'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from '../../subpage.module.css';

export default function TemplateGallery({ templates }) {
  return (
    <section className={styles.subpage}>
      <div className={styles.subpageContainer}>
        <div className={styles.templatesGallery}>
          {templates.map((t) => (
            <Link
              key={t.slug}
              href={`/templates/${t.slug}`}
              className={styles.galleryCard}
              style={{ textDecoration: 'none' }}
            >
              <div className={styles.galleryPreview}>
                <div className={styles.galleryDoc}>
                  <Image
                    src={t.image}
                    alt={`${t.name} ATS-friendly resume template — ${t.category} style for professional job applications`}
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
