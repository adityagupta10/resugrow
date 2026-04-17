'use client';

import Link from 'next/link';

export default function GlobalError({ error, reset }) {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
        textAlign: 'center',
        fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
      }}
    >
      <div
        style={{
          fontSize: 56,
          marginBottom: 16,
        }}
      >
        ⚠️
      </div>
      <h1
        style={{
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 800,
          color: '#0f172a',
          margin: '0 0 12px',
          letterSpacing: '-0.02em',
        }}
      >
        Something went wrong
      </h1>
      <p
        style={{
          color: '#64748b',
          fontSize: 16,
          lineHeight: 1.6,
          maxWidth: 480,
          margin: '0 0 32px',
        }}
      >
        We hit an unexpected error. You can try again, or head back to a safe page.
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => reset()}
          className="btn btn-primary"
          style={{ cursor: 'pointer' }}
        >
          Try Again
        </button>
        <Link href="/" className="btn btn-secondary">
          Go Home
        </Link>
        <Link href="/resume/ai-builder" className="btn btn-secondary">
          Resume Builder
        </Link>
        <Link href="/tools" className="btn btn-secondary">
          All Tools
        </Link>
      </div>

      {process.env.NODE_ENV === 'development' && error?.message && (
        <pre
          style={{
            marginTop: 40,
            padding: 16,
            background: '#fef2f2',
            border: '1px solid #fca5a5',
            borderRadius: 8,
            color: '#b91c1c',
            fontSize: 12,
            maxWidth: 600,
            overflow: 'auto',
            textAlign: 'left',
          }}
        >
          {error.message}
        </pre>
      )}
    </div>
  );
}
