'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './blog.module.css';

const BATCH_SIZE = 18;

export default function LoadMorePosts({ posts }) {
  const [visible, setVisible] = useState(BATCH_SIZE);

  const showMore = useCallback(() => {
    setVisible((prev) => prev + BATCH_SIZE);
  }, []);

  const displayed = posts.slice(0, visible);
  const hasMore = visible < posts.length;

  return (
    <>
      <div className={styles.blogGrid}>
        {displayed.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.blogCard}>
            <div className={styles.cardCover}>
              {post.coverImage && (
                <Image
                  src={post.coverImage}
                  alt={post.coverAlt || post.title}
                  fill
                  className={styles.coverImg}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
              <div className={styles.coverOverlay}>
                <h3 className={styles.coverTitleSmall}>{post.title}</h3>
              </div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.postMeta}>
                <span className={styles.category}>{post.category}</span>
                <span className={styles.dot}></span>
                <span>{post.readTime}</span>
              </div>
              <p className={styles.excerptSmall}>{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className={styles.loadMoreWrap}>
          <button onClick={showMore} className={styles.loadMoreBtn}>
            Show More Articles ({posts.length - visible} remaining)
          </button>
        </div>
      )}
    </>
  );
}
