/**
 * Lightweight GA4 event tracking for CTA clicks.
 *
 * Usage:
 *   import { trackCTA } from '@/lib/analytics';
 *   <button onClick={() => { trackCTA('generate_rewrite', 'SAR Rewriter'); handleRewrite(); }}>
 *
 * Events flow to:  GA4 → Reports → Engagement → Events → "cta_click"
 * Custom dimensions: cta_name, cta_page, cta_location
 */

export function trackCTA(ctaName, pageName, location = 'main') {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'cta_click', {
      cta_name: ctaName,
      cta_page: pageName,
      cta_location: location,
    });
  }
}

/**
 * Track outbound / navigation link clicks.
 */
export function trackNavClick(destination, source = 'navbar') {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'nav_click', {
      nav_destination: destination,
      nav_source: source,
    });
  }
}

/**
 * Track tool usage completion (e.g. ATS scan done, rewrite complete).
 */
export function trackToolComplete(toolName, metadata = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'tool_complete', {
      tool_name: toolName,
      ...metadata,
    });
  }
}
