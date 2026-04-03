'use client';

import Link from 'next/link';
import { trackCTA } from '@/lib/analytics';

/**
 * A Link component that automatically fires a GA4 cta_click event on click.
 * Drop-in replacement for next/link with tracking.
 *
 * <TrackedLink href="/resume/builder" ctaName="build_resume" ctaPage="homepage">
 *   Build My Resume
 * </TrackedLink>
 */
export default function TrackedLink({ href, ctaName, ctaPage, ctaLocation = 'main', children, onClick, ...props }) {
  const handleClick = (e) => {
    trackCTA(ctaName, ctaPage, ctaLocation);
    if (onClick) onClick(e);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
