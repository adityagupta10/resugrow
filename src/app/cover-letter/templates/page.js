import Link from 'next/link';
import Image from 'next/image';
import styles from '../../subpage.module.css';
import { coverLetters } from '../../../data/coverLetters';

export const metadata = {
  title: 'Cover Letter Templates | ResuGrow',
  description: 'Browse professional cover letter templates designed for every industry. ATS-friendly, customizable, and paired with matching resume templates.',
};

const templates = coverLetters;

export default function CoverLetterTemplates() {
  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.subpageContainer}>
          <div className={styles.subpageHeroBadge}>Templates</div>
          <h1 className={styles.subpageTitle}>
            Cover Letter <span className="gradient-text">Templates</span>
          </h1>
          <p className={styles.subpageDesc}>
            Professional cover letter templates for every industry and career level.
            Pair with our matching resume templates for a cohesive application.
          </p>
          <div className={styles.subpageBtn}>
            <Link href="/cover-letter/builder" className="btn btn-primary">Start Customizing</Link>
          </div>
        </div>
      </section>

      <section className={styles.subpage}>
        <div className={styles.subpageContainer}>
          <div className={styles.templatesGallery}>
            {templates.map((t) => (
              <div key={t.name} className={styles.galleryCard}>
                <div className={styles.galleryPreview}>
                  <div className={styles.galleryDoc}>
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className={styles.templateImg}
                      style={{ objectFit: 'cover' }}
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
    </>
  );
}
