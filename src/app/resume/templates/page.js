import Link from 'next/link';
import styles from '../../subpage.module.css';
import Image from 'next/image';
import { templates as templateData } from '../../../data/templates';
import Testimonials from '@/components/Testimonials/Testimonials';
import { SITE_URL, createPageMetadata, getSoftwareAppJsonLd } from '@/lib/seo';
import TemplateGallery from './client-gallery';
import { listApprovedCommunityTemplates } from '@/lib/communityTemplatesDb';

export const dynamic = 'force-dynamic';

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

export default async function Templates() {
  const communityTemplates = await listApprovedCommunityTemplates();
  const softwareJsonLd = getSoftwareAppJsonLd({
    name: 'RESUGROW Resume Templates',
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

      <section className={styles.subpage}>
        <div className={styles.subpageContainer}>
          <div
            style={{
              background: 'linear-gradient(135deg, #111827 0%, #312e81 100%)',
              borderRadius: '32px',
              padding: '36px',
              color: 'white',
              boxShadow: '0 26px 60px rgba(17, 24, 39, 0.18)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '20px',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ maxWidth: '760px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '8px 14px',
                    borderRadius: '999px',
                    background: 'rgba(255,255,255,0.12)',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '14px',
                  }}
                >
                  Community Marketplace
                </div>
                <h2 style={{ margin: '0 0 12px', fontSize: '34px', lineHeight: 1.1 }}>
                  Want fresh layouts beyond the first-party library?
                </h2>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.82)', lineHeight: 1.8, fontSize: '16px' }}>
                  We now support a creator marketplace where designers and frontend developers can
                  submit HTML/CSS resume templates for review. Browse approved community layouts or
                  contribute your own template pipeline.
                </p>
              </div>

              <div
                style={{
                  minWidth: '220px',
                  padding: '18px 20px',
                  borderRadius: '24px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.76 }}>
                  Approved community templates
                </div>
                <div style={{ fontSize: '42px', fontWeight: 900, marginTop: '6px' }}>
                  {communityTemplates.length}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
              <Link href="/resume/template-marketplace" className="btn btn-primary">
                Browse Marketplace
              </Link>
              <Link href="/resume/template-marketplace/submit" className="btn btn-secondary">
                Submit a Template
              </Link>
            </div>
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
