'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogEditor({ initialData = null }) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData || {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Career Advice',
    coverImage: '',
    coverEmoji: '📝',
    coverAlt: '',
    author: 'RESUGROW Team',
    authorRole: 'Career Expert',
    authorInitials: 'RG',
    authorColor: '#2563eb',
    readTime: '5 min read',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    tags: '',
    isPublished: true,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const payload = {
      ...formData,
      tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : formData.tags
    };

    try {
      const url = initialData ? `/api/admin/blogs/${initialData.id}` : '/api/admin/blogs';
      const method = initialData ? 'PATCH' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (res.ok) {
        setMessage('Successfully saved!');
        if (!initialData) {
          router.push('/admin/blog');
        }
      } else {
        const errorDetail = result.details ? `: ${result.details}` : result.error ? `: ${result.error}` : '';
        setMessage(`Error${errorDetail}`);
      }
    } catch (err) {
      console.error('Error saving blog:', err);
      setMessage('Error saving blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {message && <div style={{ padding: '1rem', background: message.startsWith('Error') ? '#fee2e2' : '#dcfce7', color: message.startsWith('Error') ? '#dc2626' : '#166534', borderRadius: '4px' }}>{message}</div>}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Title*</label>
          <input required name="title" value={formData.title} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="e.g. How to optimize your resume" />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Slug* (URL identifier)</label>
          <input required name="slug" value={formData.slug} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="e.g. how-to-optimize-resume" />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Excerpt* (Short preview text)</label>
        <textarea required name="excerpt" value={formData.excerpt} onChange={handleChange} rows="2" style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="Brief summary of the article..." />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Content* (Markdown format: ## Headings, **Bold**)</label>
        <textarea required name="content" value={formData.content} onChange={handleChange} rows="15" style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontFamily: 'monospace' }} placeholder="Write your blog post here using markdown-like syntax..." />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Category</label>
          <input name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Read Time</label>
          <input name="readTime" value={formData.readTime} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Tags (comma separated)</label>
          <input name="tags" value={typeof formData.tags === 'string' ? formData.tags : formData.tags.join(', ')} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Cover Emoji</label>
          <input name="coverEmoji" value={formData.coverEmoji} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Cover Image URL (Optional)</label>
          <input name="coverImage" value={formData.coverImage} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="https://..." />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', paddingTop: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} />
            Published Live
          </label>
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '1rem', width: '200px' }}>
        {loading ? 'Saving...' : initialData ? 'Update Post' : 'Publish Blog'}
      </button>
    </form>
  );
}
