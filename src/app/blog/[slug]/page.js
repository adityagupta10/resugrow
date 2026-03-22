import { notFound } from 'next/navigation';
import Link from 'next/link';
import { posts } from '../data';
import { createPageMetadata } from '@/lib/seo';
import styles from './post.module.css';

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return createPageMetadata({
    title: `${post.title} | ResuGrow Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
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
    // Inline bold within paragraph
    const parts = block.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
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

export default function BlogPost({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t))).slice(0, 3);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
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
            <span className={styles.coverEmoji}>{post.coverEmoji}</span>
          </div>

          {/* Body */}
          <div className={styles.body}>
            {renderContent(post.content)}
          </div>

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
              <p className={styles.ctaDesc}>Run your resume through our ATS checker and see exactly what to fix — in under 30 seconds.</p>
            </div>
            <div className={styles.ctaBtns}>
              <Link href="/resume/ats-checker" className="btn btn-primary">Check My Resume</Link>
              <Link href="/resume/builder" className="btn btn-secondary">Build a New Resume</Link>
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
