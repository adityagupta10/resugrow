'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideChrome = pathname === '/login' || pathname === '/resume/builder';

  return (
    <>
      {!hideChrome && <Navbar />}
      <main style={{ paddingTop: hideChrome ? '0' : '72px' }}>
        {children}
      </main>
      {!hideChrome && <Footer />}
    </>
  );
}
