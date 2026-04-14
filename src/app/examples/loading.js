export default function Loading() {
  return (
    <main style={{ minHeight: '70vh', background: '#f8fbff', padding: '78px 24px' }}>
      <section style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div
          style={{
            width: 180,
            height: 18,
            borderRadius: 999,
            background: '#dbeafe',
            marginBottom: 22
          }}
        />
        <div
          style={{
            width: 'min(700px, 90vw)',
            height: 58,
            borderRadius: 20,
            background: '#e2e8f0',
            marginBottom: 18
          }}
        />
        <div
          style={{
            width: 'min(560px, 82vw)',
            height: 18,
            borderRadius: 999,
            background: '#e5eefb',
            marginBottom: 42
          }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 18
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              style={{
                height: 150,
                borderRadius: 24,
                background: '#ffffff',
                border: '1px solid #dbe6f6'
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
