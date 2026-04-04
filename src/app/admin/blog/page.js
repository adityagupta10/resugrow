'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/blogs')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setBlogs(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blogs:', err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBlogs(blogs.filter(b => b.id !== id));
      } else {
        alert('Failed to delete blog post');
      }
    } catch (err) {
      console.error('Error deleting blog:', err);
      alert('Error deleting blog');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>Manage Blog Posts</h1>
        <Link href="/admin/blog/new" className="btn btn-primary">Create New Post</Link>
      </div>

      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
              <th style={{ padding: '1rem' }}>Title</th>
              <th style={{ padding: '1rem' }}>Slug</th>
              <th style={{ padding: '1rem' }}>Category</th>
              <th style={{ padding: '1rem' }}>Published</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No blogs found in database.</td>
              </tr>
            ) : (
              blogs.map(blog => (
                <tr key={blog.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem' }}>{blog.title}</td>
                  <td style={{ padding: '1rem' }}><code>{blog.slug}</code></td>
                  <td style={{ padding: '1rem' }}>{blog.category}</td>
                  <td style={{ padding: '1rem' }}>{blog.isPublished ? '✅' : '❌'}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <Link href={`/admin/blog/${blog.id}`} style={{ color: '#2563eb', textDecoration: 'none' }}>Edit</Link>
                      <button onClick={() => handleDelete(blog.id)} style={{ color: '#dc2626', background: 'none', border: 'none', padding: 0 }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
