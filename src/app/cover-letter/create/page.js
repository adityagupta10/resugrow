'use client';

import dynamic from 'next/dynamic';

const CoverLetterBuilderClient = dynamic(
  () => import('../builder/CoverLetterBuilderClient'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px', height: '48px', margin: '0 auto 16px',
            border: '4px solid #e2e8f0', borderTopColor: '#2563eb',
            borderRadius: '50%', animation: 'spin 0.8s linear infinite'
          }} />
          <p style={{ color: '#64748b', fontWeight: 600 }}>Loading Cover Letter Studio…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }
);

export default function CoverLetterCreatePage() {
  return <CoverLetterBuilderClient />;
}
