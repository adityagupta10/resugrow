import Link from 'next/link';
import Image from 'next/image';
import styles from '../../subpage.module.css';
import { coverLetters } from '../../../data/coverLetters';
import { createPageMetadata } from '@/lib/seo';
import TemplateGallery from './client-gallery';

export const metadata = createPageMetadata({
  title: 'Cover Letter Templates for Every Industry | ResuGrow',
  description:
    'Browse ATS-friendly cover letter templates and choose a design that matches your resume and target role.',
  path: '/cover-letter/templates',
  keywords: ['cover letter templates', 'professional cover letter format', 'ATS cover letter']
});

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

      <TemplateGallery templates={templates} />
    </>
  );
}
