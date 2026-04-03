import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { posts } from '../data';
import { createPageMetadata, getArticleJsonLd, getBreadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import styles from './post.module.css';

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return createPageMetadata({
    title: `${post.title} | ResuGrow Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
    type: 'article',
    image: post.coverImage || undefined,
    imageAlt: post.coverAlt || undefined,
  });
}

// Minimal markdown-like renderer: ## headings, **bold**, paragraphs
function renderContent(content) {
  const blocks = content.trim().split(/\n\n+/);
  return blocks.map((block, i) => {
    if (block.startsWith('## ')) {
      return <h2 key={i} className={styles.h2}>{block.slice(3)}</h2>;
    }
    if (block.startsWith('**') && block.endsWith('**') && !block.slice(2).includes('\n')) {
      return <h3 key={i} className={styles.h3}>{block.slice(2, -2)}</h3>;
    }
    // Inline bold + markdown links within paragraph
    const parts = block.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        if (href.startsWith('/')) {
          return <Link key={j} href={href}>{label}</Link>;
        }
        return (
          <a key={j} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        );
      }
      return part;
    });
    // Italic lines (lines starting with *)
    if (block.startsWith('*') && block.endsWith('*') && !block.startsWith('**')) {
      return <p key={i} className={styles.pullQuote}>{block.slice(1, -1)}</p>;
    }
    return <p key={i} className={styles.p}>{rendered}</p>;
  });
}

const defaultToolLinks = [
  { label: 'Check Resume Score', href: '/resume/ats-checker' },
  { label: 'Build Resume', href: '/resume/builder' },
  { label: 'Review LinkedIn', href: '/linkedin-review' },
  { label: 'Create Cover Letter', href: '/cover-letter/builder' }
];

const defaultScreenshots = [
  {
    src: '/templates/executive-leadership-resume-design-3.png',
    alt: 'ATS-friendly resume template screenshot with clean one-column format',
    caption: 'ATS-friendly resume layout example'
  },
  {
    src: '/linkedin-makeover.png',
    alt: 'LinkedIn profile optimization example from ResuGrow tool experience',
    caption: 'LinkedIn optimization workflow preview'
  }
];

function buildFaqSchema(post) {
  const fallbackFaqs = [
    {
      q: `How does this ${post.category.toLowerCase()} strategy improve interview chances?`,
      a: 'It improves clarity, keyword alignment, and recruiter confidence, which typically increases first-pass response rates.'
    },
    {
      q: 'Which ResuGrow tool should I use first after reading this?',
      a: 'Start with ATS Checker for diagnostics, then apply edits in Resume Builder and validate again before applying.'
    }
  ];

  const faqs = post.faqs?.length ? post.faqs : fallbackFaqs;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };
}

function buildHowToSchema(post) {
  const fallbackSteps = [
    { title: 'Run ATS score check', text: 'Upload your resume and inspect weak sections before rewriting.' },
    { title: 'Apply high-impact edits', text: 'Update summary, bullets, and keyword alignment based on scan output.' },
    { title: 'Re-validate and submit', text: 'Scan again, then apply with the highest-quality version.' }
  ];

  const steps = post.howToSteps?.length ? post.howToSteps : fallbackSteps;
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: post.title,
    description: post.excerpt,
    step: steps.map((step, idx) => ({
      '@type': 'HowToStep',
      name: step.title,
      text: step.text,
      url: `https://www.resugrow.com/blog/${post.slug}#step-${idx + 1}`
    }))
  };
}

function ToolCtaStrip({ title, links }) {
  return (
    <div className={styles.inlineCta}>
      <p>{title}</p>
      <div className={styles.inlineCtaLinks}>
        {links.map((item) => (
          <Link key={item.href + item.label} href={item.href} className="btn btn-secondary">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t))).slice(0, 3);
  const toolLinks = post.toolLinks?.length ? post.toolLinks : defaultToolLinks;
  const screenshots = post.screenshots?.length ? post.screenshots : defaultScreenshots;
  const faqSchema = buildFaqSchema(post);
  const howToSchema = buildHowToSchema(post);

  const articleSchema = getArticleJsonLd({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    date: post.date,
    authorName: post.author,
    authorRole: post.authorRole,
    imageUrl: post.coverImage ? `${SITE_URL}${post.coverImage}` : undefined,
    imageAlt: post.coverAlt || post.title,
  });

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: post.category, url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/blog">Blog</Link>
          <span>›</span>
          <span>{post.category}</span>
        </nav>

        <article className={styles.article}>
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.headerMeta}>
              <span className={styles.catBadge}>{post.category}</span>
              <span className={styles.metaDot}>·</span>
              <span className={styles.metaText}>{post.readTime}</span>
              <span className={styles.metaDot}>·</span>
              <span className={styles.metaText}>{post.date}</span>
            </div>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <div className={styles.authorBlock}>
              <div className={styles.authorAvatar} style={{ background: post.authorColor }}>
                {post.authorInitials}
              </div>
              <div>
                <span className={styles.authorName}>{post.author}</span>
                <span className={styles.authorRole}>{post.authorRole}</span>
              </div>
            </div>
          </header>

          {/* Cover emoji banner */}
          <div className={styles.coverBanner}>
            {post.coverImage ? (
              <div className={styles.coverMedia}>
                {/* Use a responsive img here to preserve each cover image's natural aspect ratio (no cropping). */}
                <img
                  src={post.coverImage}
                  alt={post.coverAlt || `${post.title} cover image`}
                  className={styles.coverImg}
                  loading="eager"
                  decoding="async"
                />
              </div>
            ) : (
              <span className={styles.coverEmoji}>{post.coverEmoji}</span>
            )}
          </div>

          <ToolCtaStrip title="Apply this guide immediately with ResuGrow tools" links={toolLinks} />

          <div className={styles.screenshotGrid}>
            {screenshots.map((shot) => (
              <figure key={shot.src + shot.caption} className={styles.screenshotCard}>
                <div className={styles.screenshotMedia}>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className={styles.screenshotImage}
                    sizes="(max-width: 800px) 100vw, 340px"
                  />
                </div>
                <figcaption>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>

          {/* Body */}
          <div className={styles.body}>
            {renderContent(post.content)}
          </div>

          <ToolCtaStrip title="Ready to improve your score?" links={toolLinks.slice(0, 3)} />

          {/* Tags */}
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </article>

        {/* CTA */}
        <div className={styles.cta}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaEmoji}>🚀</div>
            <div>
              <h3 className={styles.ctaTitle}>Put this into practice</h3>
              <p className={styles.ctaDesc}>Run your resume through our ATS checker and see exactly what to fix in under 30 seconds.</p>
            </div>
            <div className={styles.ctaBtns}>
              <Link href="/resume/ats-checker" className="btn btn-primary">Check My Resume</Link>
              <Link href="/resume/builder" className="btn btn-secondary">Build a New Resume</Link>
              <Link href="/linkedin-review" className="btn btn-secondary">Scan LinkedIn</Link>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className={styles.related}>
            <h2 className={styles.relatedTitle}>More from the blog</h2>
            <div className={styles.relatedGrid}>
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className={styles.relatedCard}>
                  <span className={styles.relatedEmoji}>{p.coverEmoji}</span>
                  <div>
                    <span className={styles.catBadge}>{p.category}</span>
                    <h4 className={styles.relatedCardTitle}>{p.title}</h4>
                    <span className={styles.metaText}>{p.readTime} · {p.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className={styles.backRow}>
          <Link href="/blog" className={styles.backLink}>← Back to all articles</Link>
        </div>
      </div>
    </div>
  );
}
