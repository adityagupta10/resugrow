import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { RESUME_TEMPLATES } from '@/components/ResumeTemplates/TemplateConfig';
import Link from 'next/link';
import { Download, FileText, Send } from 'lucide-react';
import styles from './shared.module.css';

export const dynamic = 'force-dynamic';

async function getResume(shareId) {
  const resume = await prisma.resume.findUnique({
    where: { shareId },
  });
  return resume;
}

export default async function SharedResumePage({ params }) {
  const { id } = await params;
  const resume = await getResume(id);

  if (!resume || !resume.isPublic) {
    return notFound();
  }

  const resumeData = resume.data;
  const templateId = resumeData?.meta?.templateId;
  const TemplateComponent =
    (templateId && RESUME_TEMPLATES[templateId]?.component) ||
    RESUME_TEMPLATES['modern']?.component ||
    RESUME_TEMPLATES.modern.component; // Fallback

  return (
    <div className={styles.container}>
      {/* ── Viral Growth Banner ────────────────────────────────────────── */}
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <FileText className={styles.logoIcon} />
          <span>RESUGROW</span>
        </div>
        <div className={styles.cta}>
          <span>Create a winning resume like this in 5 minutes.</span>
          <Link href="/resume/builder" className={styles.ctaBtn}>
            Build Yours Free
          </Link>
        </div>
      </div>

      <main className={styles.main}>
        {/* ── Resume Header/Actions ────────────────────────────────────── */}
        <div className={styles.resumeHeader}>
          <h1 className={styles.resumeTitle}>{resume.title || `Resume of ${resumeData.personal.fullName}`}</h1>
          <div className={styles.actions}>
            <a href={resume.sharedPdfUrl} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
              <Download size={18} />
              <span>Download PDF</span>
            </a>
            <button className={styles.actionBtn}>
              <Send size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* ── High-Fidelity Resume Render ──────────────────────────────── */}
        <div className={styles.resumeWrapper}>
          <div className={styles.resumePaper}>
             <TemplateComponent data={resumeData} />
          </div>
        </div>
      </main>

      {/* ── Footer / CTA ──────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerBrand}>Powered by RESUGROW</div>
        <p>Get AI-powered optimization, ATS-score tracking, and 15+ premium templates.</p>
        <Link href="/resume/builder" className={styles.footerCta}>
          Create My Resume
        </Link>
      </footer>
    </div>
  );
}
