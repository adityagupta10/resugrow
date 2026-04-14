export default function Loading() {
  return (
    <main style={{ minHeight: '70vh', background: '#f8fbff', padding: '80px 24px' }}>
      <section style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div
          style={{
            width: 160,
            height: 18,
            borderRadius: 999,
            background: '#dbeafe',
            marginBottom: 20
          }}
        />
        <div
          style={{
            width: 'min(680px, 90vw)',
            height: 56,
            borderRadius: 18,
            background: '#e2e8f0',
            marginBottom: 18
          }}
        />
        <div
          style={{
            width: 'min(520px, 82vw)',
            height: 18,
            borderRadius: 999,
            background: '#e5eefb',
            marginBottom: 44
          }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 22
          }}
        >
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              style={{
                height: 320,
                borderRadius: 28,
                background: 'linear-gradient(180deg, #ffffff 0%, #edf4ff 100%)',
                border: '1px solid #dbe6f6'
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
