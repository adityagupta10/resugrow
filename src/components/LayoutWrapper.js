'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <>
      {!isLoginPage && <Navbar />}
      <main style={{ paddingTop: isLoginPage ? '0' : '72px' }}>
        {children}
      </main>
      {!isLoginPage && <Footer />}
    </>
  );
}
