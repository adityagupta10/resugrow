'use client';

import { useEffect, useRef } from 'react';

const AD_CLIENT = 'ca-pub-3570928751495304';

/**
 * BlogAd — Google AdSense ad unit for blog post pages only.
 *
 * @param {string}  slot       - Ad unit slot ID from AdSense dashboard
 * @param {string}  format     - 'fixed' | 'auto'
 * @param {boolean} responsive - Enable full-width responsive (ignored for fixed)
 * @param {number}  width      - Fixed ad width (only used when format='fixed')
 * @param {number}  height     - Fixed ad height (only used when format='fixed')
 * @param {string}  className  - Optional extra CSS class
 */
export default function BlogAd({
  slot,
  format = 'auto',
  responsive = true,
  width,
  height,
  className = '',
}) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;

    const tryPush = () => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          window.adsbygoogle.push({});
          pushed.current = true;
        }
      } catch {
        // Silently ignore — ad blockers may prevent this
      }
    };

    // Small delay to ensure the script has loaded via lazyOnload
    const timer = setTimeout(tryPush, 300);
    return () => clearTimeout(timer);
  }, []);

  const isFixed = format === 'fixed' && width && height;

  return (
    <div
      className={className}
      style={{
        textAlign: 'center',
        margin: '28px 0',
        minHeight: isFixed ? `${height}px` : '90px',
        overflow: 'hidden',
      }}
    >
      <ins
        className="adsbygoogle"
        style={
          isFixed
            ? { display: 'inline-block', width: `${width}px`, height: `${height}px` }
            : { display: 'block' }
        }
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        {...(!isFixed && { 'data-ad-format': 'auto' })}
        {...(!isFixed && responsive && { 'data-full-width-responsive': 'true' })}
      />
    </div>
  );
}
