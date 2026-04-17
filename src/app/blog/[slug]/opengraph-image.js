import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'RESUGROW Blog Post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }) {
  const { slug } = await params;

  // Dynamic import to avoid bundling all post data in the edge function
  const { posts } = await import('../data');
  const post = posts.find((p) => p.slug === slug);

  const title = post?.title || 'RESUGROW Blog';
  const category = post?.category || 'Career Tips';
  const emoji = post?.coverEmoji || '📝';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 72px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              padding: '6px 16px',
              background: 'rgba(59,130,246,0.2)',
              border: '1px solid rgba(59,130,246,0.3)',
              borderRadius: '999px',
              fontSize: '14px',
              fontWeight: 700,
              color: '#93c5fd',
              letterSpacing: '0.05em',
            }}
          >
            {category}
          </div>
        </div>

        {/* Emoji */}
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>{emoji}</div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? '40px' : '48px',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            maxWidth: '960px',
          }}
        >
          {title}
        </div>

        {/* Bottom branding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: 'auto',
            paddingTop: '32px',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 800,
              color: '#60a5fa',
              letterSpacing: '-0.02em',
            }}
          >
            RESUGROW
          </div>
          <div style={{ color: '#475569', fontSize: '16px' }}>•</div>
          <div style={{ color: '#64748b', fontSize: '16px' }}>
            resugrow.com/blog
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
