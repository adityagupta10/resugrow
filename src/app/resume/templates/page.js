import Link from 'next/link';
import styles from '../../subpage.module.css';

export const metadata = {
  title: 'High Impact Resume Templates | ResuGrow',
  description: 'Browse ResuGrow\'s collection of professional, ATS-friendly resume templates. Designed by experts and tested with real recruiters.',
};

const templates = [
  { name: 'Executive Pro', category: 'Professional', color: '#2563eb', tags: ['ATS-Friendly', 'Top Rated'] },
  { name: 'Modern Creative', category: 'Creative', color: '#7c3aed', tags: ['Design', 'Portfolio'] },
  { name: 'Classic Standard', category: 'Traditional', color: '#0f766e', tags: ['Conservative', 'Corporate'] },
  { name: 'Bold Impact', category: 'Modern', color: '#dc2626', tags: ['Stand Out', 'Bold'] },
  { name: 'Clean Simple', category: 'Minimal', color: '#475569', tags: ['Minimal', 'Clean'] },
  { name: 'Tech Forward', category: 'Technology', color: '#0891b2', tags: ['Tech', 'Developer'] },
  { name: 'Graduate Start', category: 'Entry Level', color: '#d97706', tags: ['Entry Level', 'Fresh Grad'] },
  { name: 'Creative Director', category: 'Creative', color: '#be185d', tags: ['Creative', 'Director'] },
  { name: 'Federal Resume', category: 'Government', color: '#1e40af', tags: ['Government', 'Federal'] },
];

export default function Templates() {
  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.subpageContainer}>
          <div className={styles.subpageHeroBadge}>📄 Templates</div>
          <h1 className={styles.subpageTitle}>
            High Impact <span className="gradient-text">Resume Templates</span>
          </h1>
          <p className={styles.subpageDesc}>
            Professional templates designed by resume experts and tested with real recruiters.
            ATS-friendly and fully customizable.
          </p>
          <div className={styles.subpageBtn}>
            <Link href="/resume/ai-builder" className="btn btn-primary">Start Customizing →</Link>
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
                    <div className={`${styles.galleryDocLine}`} style={{ width: '90%' }} />
                    <div className={`${styles.galleryDocLine}`} style={{ width: '70%' }} />
                    <div className={`${styles.galleryDocLine}`} style={{ width: '50%' }} />
                    <div className={styles.galleryDocSection} style={{ background: t.color + '30' }} />
                    <div className={`${styles.galleryDocLine}`} style={{ width: '85%' }} />
                    <div className={`${styles.galleryDocLine}`} style={{ width: '75%' }} />
                    <div className={`${styles.galleryDocLine}`} style={{ width: '90%' }} />
                    <div className={styles.galleryDocSection} style={{ background: t.color + '30' }} />
                    <div className={`${styles.galleryDocLine}`} style={{ width: '60%' }} />
                    <div className={`${styles.galleryDocLine}`} style={{ width: '80%' }} />
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
