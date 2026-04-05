'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isUploading, setIsUploading] = useState(false);

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

  const handleBulkUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { read, utils } = await import('xlsx');
      const reader = new FileReader();

      reader.onload = async (event) => {
        try {
          const data = new Uint8Array(event.target.result);
          const workbook = read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = utils.sheet_to_json(worksheet);

          if (jsonData.length === 0) {
            alert('The Excel file appears to be empty.');
            setIsUploading(false);
            return;
          }

          // Map headers to database fields
          const formattedBlogs = jsonData.map(row => {
            // Helper to find case-insensitive key
            const getVal = (possibleKeys) => {
              const key = Object.keys(row).find(k => possibleKeys.includes(k.trim().toLowerCase()));
              return key ? row[key] : undefined;
            };

            return {
              title: getVal(['title']),
              slug: getVal(['slug']),
              excerpt: getVal(['excerpt']),
              content: getVal(['content']),
              category: getVal(['category']),
              readTime: getVal(['read time', 'readtime', 'read_time']),
              tags: getVal(['tags']),
              coverEmoji: getVal(['cover emoji', 'coveremoji', 'cover_emoji']),
              coverImage: getVal(['cover image url', 'coverimageurl', 'cover_image_url', 'coverimage']),
              isPublished: true // Default to published
            };
          });

          // Validate required fields
          const invalid = formattedBlogs.filter(b => !b.title || !b.slug || !b.content);
          if (invalid.length > 0) {
            alert(`Found ${invalid.length} entries with missing required fields (Title, Slug, or Content). Please check your file.`);
            setIsUploading(false);
            return;
          }

          const res = await fetch('/api/admin/blogs/bulk', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ blogs: formattedBlogs }),
          });

          const result = await res.json();

          if (res.ok) {
            const skipCount = result.skipped ? result.skipped.length : 0;
            let msg = `Successfully uploaded ${result.count || 0} blog posts!`;
            if (skipCount > 0) {
              msg += `\n\nSkipped ${skipCount} entries (check the console for details on duplicates).`;
              console.log('[Bulk Upload] Skipped entries:', result.skipped);
            }
            alert(msg);
            
            // Refresh blog list
            const refreshRes = await fetch('/api/admin/blogs');
            const refreshData = await refreshRes.json();
            if (!refreshData.error) setBlogs(refreshData);
          } else {
            console.error('[Bulk Error]', result.error, result.details);
            const skipCount = result.skipped ? result.skipped.length : 0;
            if (result.message && skipCount > 0) {
               alert(`${result.message}\n\nSkipped ${skipCount} entries due to duplicates.`);
            } else {
               alert(`Upload failed: ${result.error}${result.details ? ` (${result.details})` : ''}`);
            }
          }
        } catch (err) {
          console.error('[Bulk Error]', err);
          alert('Error processing file. Please ensure it is a valid .xlsx file.');
        } finally {
          setIsUploading(false);
          e.target.value = ''; // Reset input
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error('[Bulk Error]', err);
      alert('Error loading Excel parser.');
      setIsUploading(false);
    }
  };

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
        <div style={{ display: 'flex', gap: '1rem' }}>
          <label className={`btn ${isUploading ? 'btn-disabled' : 'btn-secondary'}`} style={{ cursor: isUploading ? 'not-allowed' : 'pointer' }}>
            {isUploading ? 'Uploading...' : 'Bulk Upload (.xlsx)'}
            <input 
              type="file" 
              accept=".xlsx" 
              style={{ display: 'none' }} 
              onChange={handleBulkUpload}
              disabled={isUploading}
            />
          </label>
          <Link href="/admin/blog/new" className="btn btn-primary">Create New Post</Link>
        </div>
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
