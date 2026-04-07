import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdminEmail } from '@/lib/admin';

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();
  
  const isAdmin = isAdminEmail(user?.email);

  if (!isAdmin) {
    redirect(`/login?callbackUrl=/admin/community-templates`);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: '#0f172a', padding: '1rem 2rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/admin" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem', textDecoration: 'none' }}>
          RESUGROW <span style={{ color: '#3b82f6', fontSize: '0.8rem' }}>ADMIN</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/admin/blog" style={{ color: 'white', textDecoration: 'none' }}>Blogs</Link>
          <Link href="/admin/community-templates" style={{ color: 'white', textDecoration: 'none' }}>Templates</Link>
          <Link href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>User Dashboard</Link>
        </div>
      </nav>
      <main style={{ padding: '2rem', flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
