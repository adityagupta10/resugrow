'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import LoadMorePosts from './LoadMorePosts';
import styles from './blog.module.css';

export default function BlogGrid({ allPosts }) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';

  const filteredPosts = activeCategory === 'All'
    ? allPosts
    : allPosts.filter((p) => p.category === activeCategory);

  const displayPosts = filteredPosts.length > 0 ? filteredPosts : allPosts;
  const featured = displayPosts[0];
  const rest = displayPosts.slice(1);

  return (
    <>
      {/* Active filter indicator */}
      {activeCategory !== 'All' && filteredPosts.length > 0 && (
        <div className={styles.filterIndicator}>
          Showing <strong>{filteredPosts.length}</strong> {filteredPosts.length === 1 ? 'article' : 'articles'} in <strong>{activeCategory}</strong>
          <Link href="/blog" className={styles.clearFilter}>Clear filter ✕</Link>
        </div>
      )}

      {/* Featured Section */}
      {featured && (
        <div className={styles.featuredSection}>
          <Link href={`/blog/${featured.slug}`} className={styles.featuredCard}>
            <div className={styles.featuredCover}>
              {featured.coverImage && (
                <Image
                  src={featured.coverImage}
                  alt={featured.coverAlt || featured.title}
                  fill
                  className={styles.coverImg}
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              )}
              <div className={styles.coverOverlay}>
                <h2 className={styles.coverTitle}>{featured.title}</h2>
              </div>
            </div>
            <div className={styles.featuredInfo}>
              <div className={styles.postMeta}>
                <span className={styles.category}>{featured.category}</span>
                <span className={styles.dot}></span>
                <span>{featured.readTime}</span>
              </div>
              <p className={styles.excerpt}>{featured.excerpt}</p>
              <div className={styles.authorRow}>
                <div className={styles.avatar} style={{ background: featured.authorColor }}>
                  {featured.authorInitials}
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{featured.author}</span>
                  <span className={styles.date}>{featured.date}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Blog Grid — progressively loaded */}
      <LoadMorePosts posts={rest} />
    </>
  );
}
