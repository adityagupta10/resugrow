export default function Loading() {
  return (
    <main style={{ minHeight: '70vh', background: '#f7fbff', padding: '76px 24px' }}>
      <section style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div
          style={{
            width: 190,
            height: 18,
            borderRadius: 999,
            background: '#bfdbfe',
            marginBottom: 22
          }}
        />
        <div
          style={{
            width: 'min(620px, 90vw)',
            height: 54,
            borderRadius: 18,
            background: '#e2e8f0',
            marginBottom: 42
          }}
        />
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            style={{
              height: 74,
              borderRadius: 20,
              background: '#ffffff',
              border: '1px solid #dbe6f6',
              marginBottom: 14
            }}
          />
        ))}
      </section>
    </main>
  );
}
