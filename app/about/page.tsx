import React from 'react';

export default function AboutPage() {
  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
      <h1 style={{ color: '#F2C94C', fontSize: '2.5rem', marginBottom: '30px' }}>OUR HISTORY</h1>
      
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ color: 'white', borderBottom: '1px solid #30363d', pb: '10px' }}>The Iron Will</h3>
        <p style={{ color: '#c9d1d9' }}>
          Founded on the rugged plains of Montana, Iron Daisy Agri began with a simple philosophy: 
          Industrial power meets agricultural precision. We don't just farm; we engineer success.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ color: 'white', borderBottom: '1px solid #30363d', pb: '10px' }}>The [ICE] Standard</h3>
        <p style={{ color: '#c9d1d9' }}>
          In 2026, the IDA Board established the Iron Compliance & Enforcement division to ensure 
          that every contractor represents the brand with total professionalism.
        </p>
      </section>

      <div style={{ background: '#161b22', padding: '20px', borderLeft: '4px solid #F2C94C' }}>
        <p style={{ margin: 0, fontStyle: 'italic', color: '#8b949e' }}>
          "Precision in the Field. Power in the Fleet." — The IDA Board
        </p>
      </div>
    </div>
  );
}
