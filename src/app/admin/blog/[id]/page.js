import { supabase } from '@/lib/supabase';
import BlogEditor from '../BlogEditor';
import { notFound } from 'next/navigation';

export default async function EditBlogPostPage({ params }) {
  const { id } = await params;

  const { data: blog, error } = await supabase
    .from('BlogPost')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !blog) {
    notFound();
  }

  // Supabase returns dates as strings, no need to call .toISOString()
  const initialData = {
    ...blog,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Edit Blog Post</h1>
      <BlogEditor initialData={initialData} />
    </div>
  );
}
