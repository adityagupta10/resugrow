import { auth } from "@/lib/auth";
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({ children }) {
  const session = await auth();
  
  const adminEmail = "aditya.gupta10jan@gmail.com";
  
  const isDev = process.env.NODE_ENV === 'development';
  const isAdmin = session?.user?.email?.toLowerCase() === adminEmail.toLowerCase();

  if (!isDev && !isAdmin) {
    redirect('/login');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: '#0f172a', padding: '1rem 2rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem', textDecoration: 'none' }}>
          RESUGROW <span style={{ color: '#3b82f6', fontSize: '0.8rem' }}>ADMIN</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/admin/blog" style={{ color: 'white', textDecoration: 'none' }}>Blogs</Link>
          <Link href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>User Dashboard</Link>
        </div>
      </nav>
      <main style={{ padding: '2rem', flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
