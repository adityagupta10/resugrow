export default function GlossaryLoading() {
  return (
    <main style={{ minHeight: '60vh', background: '#f8fbff', padding: '80px 24px' }}>
      <section style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ width: 120, height: 14, borderRadius: 999, background: '#dbeafe', marginBottom: 16 }} />
        <div style={{ width: 'min(500px, 80vw)', height: 42, borderRadius: 14, background: '#e2e8f0', marginBottom: 16 }} />
        <div style={{ width: 'min(380px, 70vw)', height: 16, borderRadius: 999, background: '#e5eefb', marginBottom: 40 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 72,
                borderRadius: 14,
                background: 'linear-gradient(180deg, #fff 0%, #edf4ff 100%)',
                border: '1px solid #dbe6f6',
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
