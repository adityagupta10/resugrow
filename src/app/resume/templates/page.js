import Link from 'next/link';
import styles from '../../subpage.module.css';
import Image from 'next/image';
import { templates as templateData } from '../../../data/templates';
import Testimonials from '@/components/Testimonials/Testimonials';
import { SITE_URL, createPageMetadata, getSoftwareAppJsonLd } from '@/lib/seo';
import TemplateGallery from './client-gallery';

export const metadata = createPageMetadata({
  title: 'Free Resume Templates — ATS-Friendly & Recruiter-Tested (2026)',
  description:
    '15 free ATS-friendly resume templates designed by career experts. Clean layouts that pass applicant tracking systems and impress recruiters. Download as PDF instantly.',
  path: '/resume/templates',
  keywords: [
    'free resume templates', 'ATS resume templates', 'professional resume templates',
    'resume templates 2026', 'modern resume templates', 'resume layout',
    'resume format', 'cv templates', 'resume template free download',
  ]
});

const templates = templateData;

export default function Templates() {
  const softwareJsonLd = getSoftwareAppJsonLd({
    name: 'ResuGrow Resume Templates',
    description:
      'Browse ATS-friendly resume templates optimized for recruiter readability across industries.',
    url: `${SITE_URL}/resume/templates`,
    price: '0.00',
  });

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

      <TemplateGallery templates={templates} />

      <Testimonials 
        title="Templates that Get Hired" 
        subtitle="See how our ATS-optimized layouts helped these professionals land interviews at top companies." 
      />
    </>
  );
}
