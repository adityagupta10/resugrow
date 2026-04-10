'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from './blog.module.css';

const categories = [
  'All',
  'ATS Optimization',
  'Resume Guides',
  'Skills Optimization',
  'Templates',
  'Resume Writing',
  'LinkedIn Optimization',
  'LinkedIn',
  'Career Advice',
  'Job Search',
  'Interview Prep',
  'Cover Letters',
  'Career Change',
  'Reviews',
  'Comparison',
  'Guides',
  'Recruiter Insights',
  'Resume Formatting',
  'Advanced Strategy',
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('category') || 'All';

  function handleClick(cat) {
    if (cat === 'All') {
      router.push('/blog', { scroll: false });
    } else {
      router.push(`/blog?category=${encodeURIComponent(cat)}`, { scroll: false });
    }
  }

  // Only show categories that look clean — limit to ~10 visible, with the active one always shown
  const visible = categories.slice(0, 10);
  if (active !== 'All' && !visible.includes(active)) {
    visible.push(active);
  }

  return (
    <div className={styles.filterSection}>
      <div className={styles.categoryPills}>
        {visible.map((cat) => (
          <button
            key={cat}
            className={`${styles.pill} ${cat === active ? styles.pillActive : ''}`}
            onClick={() => handleClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
