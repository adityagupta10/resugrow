import Link from 'next/link';
import styles from '../../subpage.module.css';

export const metadata = {
  title: 'Cover Letter Templates | ResuGrow',
  description: 'Browse professional cover letter templates designed for every industry. ATS-friendly, customizable, and paired with matching resume templates.',
};

const templates = [
  { name: 'Professional Standard', category: 'Professional', color: '#2563eb', tags: ['Corporate', 'Formal'] },
  { name: 'Creative Flair', category: 'Creative', color: '#7c3aed', tags: ['Design', 'Creative'] },
  { name: 'Modern Minimal', category: 'Minimal', color: '#0f766e', tags: ['Clean', 'Modern'] },
  { name: 'Executive Bold', category: 'Executive', color: '#dc2626', tags: ['Leadership', 'Senior'] },
  { name: 'Entry Level Fresh', category: 'Entry Level', color: '#d97706', tags: ['Graduate', 'Intern'] },
  { name: 'Tech Industry', category: 'Technology', color: '#0891b2', tags: ['Tech', 'Engineering'] },
];

export default function CoverLetterTemplates() {
  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.subpageContainer}>
          <div className={styles.subpageHeroBadge}>📝 Templates</div>
          <h1 className={styles.subpageTitle}>
            Cover Letter <span className="gradient-text">Templates</span>
          </h1>
          <p className={styles.subpageDesc}>
            Professional cover letter templates for every industry and career level.
            Pair with our matching resume templates for a cohesive application.
          </p>
          <div className={styles.subpageBtn}>
            <Link href="/cover-letter/builder" className="btn btn-primary">Start Customizing →</Link>
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
                    <div className={styles.galleryDocHeader} style={{ background: t.color }} />
                    <div className={`${styles.galleryDocLine}`} style={{ width: '60%' }} />
                    <div className={`${styles.galleryDocLine}`} style={{ width: '40%' }} />
                    <div style={{ height: '12px' }} />
                    <div className={`${styles.galleryDocLine}`} style={{ width: '90%' }} />
                    <div className={`${styles.galleryDocLine}`} style={{ width: '95%' }} />
                    <div className={`${styles.galleryDocLine}`} style={{ width: '85%' }} />
                    <div className={`${styles.galleryDocLine}`} style={{ width: '92%' }} />
                    <div style={{ height: '8px' }} />
                    <div className={`${styles.galleryDocLine}`} style={{ width: '88%' }} />
                    <div className={`${styles.galleryDocLine}`} style={{ width: '90%' }} />
                    <div className={`${styles.galleryDocLine}`} style={{ width: '70%' }} />
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
