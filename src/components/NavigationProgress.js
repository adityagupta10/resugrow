'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(false);
  const prevPath = useRef(pathname + searchParams.toString());
  const timer = useRef(null);

  useEffect(() => {
    const current = pathname + searchParams.toString();
    if (current !== prevPath.current) {
      prevPath.current = current;
      setActive(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setActive(false), 700);
    }
  }, [pathname, searchParams]);

  useEffect(() => () => clearTimeout(timer.current), []);

  if (!active) return null;

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99999,
        height: '3px', background: 'rgba(37,99,235,0.1)',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: '-60%',
          width: '60%', height: '100%',
          background: 'linear-gradient(90deg, transparent, #2563eb, #7c3aed, transparent)',
          animation: 'navSweep 1.1s ease-in-out infinite',
        }} />
      </div>
      <style>{`
        @keyframes navSweep {
          0%   { left: -60%; }
          100% { left: 110%; }
        }
      `}</style>
    </>
  );
}
