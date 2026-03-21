import Link from 'next/link';
import styles from '../../subpage.module.css';
import Image from 'next/image';
import { templates as templateData } from '../../../data/templates';
import Testimonials from '@/components/Testimonials/Testimonials';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'ATS-Friendly Resume Templates | Modern & Recruiter-Tested',
  description:
    'Browse resume templates optimized for ATS parsing and clean recruiter readability across industries.',
  path: '/resume/templates',
  keywords: ['resume templates', 'ATS templates', 'professional resume layout']
});

const templates = templateData;

export default function Templates() {
  return (
    <>
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
              <div key={t.name} className={styles.galleryCard}>
                <div className={styles.galleryPreview}>
                  <div className={styles.galleryDoc}>
                    <Image
                      src={t.image}
                      alt={`${t.name} modern ATS resume template for professional job applications and recruiter screening`}
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

      <Testimonials 
        title="Templates that Get Hired" 
        subtitle="See how our ATS-optimized layouts helped these professionals land interviews at top companies." 
      />
    </>
  );
}
