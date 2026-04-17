export default function TemplatesLoading() {
  return (
    <main style={{ minHeight: '60vh', background: '#f8fbff', padding: '80px 24px' }}>
      <section style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ width: 140, height: 14, borderRadius: 999, background: '#dbeafe', marginBottom: 16 }} />
        <div style={{ width: 'min(520px, 80vw)', height: 42, borderRadius: 14, background: '#e2e8f0', marginBottom: 16 }} />
        <div style={{ width: 'min(400px, 70vw)', height: 16, borderRadius: 999, background: '#e5eefb', marginBottom: 40 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 340,
                borderRadius: 20,
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
