import prisma from '@/lib/prisma';
import BlogEditor from '../BlogEditor';
import { notFound } from 'next/navigation';

export default async function EditBlogPostPage({ params }) {
  const { id } = await params;

  const blog = await prisma.blogPost.findUnique({
    where: { id }
  });

  if (!blog) {
    notFound();
  }

  // Convert Date objects to strings for Client Component
  const initialData = {
    ...blog,
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Edit Blog Post</h1>
      <BlogEditor initialData={initialData} />
    </div>
  );
}
