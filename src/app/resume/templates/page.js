import Link from 'next/link';
import styles from '../../subpage.module.css';
import Image from 'next/image';
import { templates as templateData } from '../../../data/templates';
import Testimonials from '@/components/Testimonials/Testimonials';
import { SITE_URL, createPageMetadata, getSoftwareAppJsonLd } from '@/lib/seo';
import TemplateGallery from './client-gallery';
import { listApprovedCommunityTemplates } from '@/lib/communityTemplatesDb';
import { ROLE_SUGGESTIONS } from '@/lib/ai-suggestions';

export const revalidate = 3600;

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

function formatRole(slug) {
  return slug
    .replace(/-resume$/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function listFrom(value) {
  return Array.isArray(value) ? value : [];
}

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
              background: 'linear-gradient(135deg, #f8fbff 0%, #eef2ff 100%)',
              border: '1px solid #dbe6f6',
              borderRadius: '32px',
              padding: '34px',
              boxShadow: '0 22px 60px rgba(15, 23, 42, 0.08)',
            }}
          >
            <div style={{ maxWidth: '760px', marginBottom: '24px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  padding: '7px 13px',
                  borderRadius: '999px',
                  background: 'white',
                  border: '1px solid #bfdbfe',
                  color: '#2563eb',
                  fontSize: '12px',
                  fontWeight: 900,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '14px',
                }}
              >
                Templates By Job Title
              </div>
              <h2 style={{ margin: '0 0 10px', color: '#0f172a', fontSize: 'clamp(28px, 4vw, 42px)', letterSpacing: '-0.04em' }}>
                Pick a resume template built for your exact role
              </h2>
              <p style={{ margin: 0, color: '#64748b', fontSize: '16px', lineHeight: 1.75 }}>
                Each role page combines an ATS-friendly template with the matching resume example data:
                top skills, metrics, summaries, and bullet patterns.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '12px',
              }}
            >
              {Object.keys(ROLE_SUGGESTIONS)
                .filter((role) => role !== 'general')
                .map((role) => (
                  <Link
                    key={role}
                    href={`/templates/${role}`}
                    style={{
                      background: 'rgba(255,255,255,0.86)',
                      border: '1px solid #dbe6f6',
                      borderRadius: '18px',
                      padding: '16px',
                      textDecoration: 'none',
                      color: '#0f172a',
                      boxShadow: '0 10px 28px rgba(15,23,42,0.045)',
                    }}
                  >
                    <span style={{ display: 'block', fontSize: '15px', fontWeight: 850, marginBottom: '5px' }}>
                      {formatRole(role)} Resume Template
                    </span>
                    <span style={{ display: 'block', fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>
                      {listFrom(ROLE_SUGGESTIONS[role].skills).slice(0, 3).join(', ')}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

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
