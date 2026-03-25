import React from 'react';

export default function RulesPage() {
  return (
    <div style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ color: '#ff4d4d', fontSize: '3rem', fontWeight: 900, marginBottom: '10px' }}>
          [ICE] COMPLIANCE
        </h1>
        <div style={{ height: '2px', background: '#ff4d4d', width: '100px', margin: '0 auto' }}></div>
        <p style={{ marginTop: '20px', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Iron Compliance & Enforcement | Standard Operating Procedures
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={ruleBox}>
          <h3 style={{ color: 'white', marginBottom: '10px' }}>01. FLEET CONDUCT</h3>
          <p style={{ color: '#8b949e' }}>Speed limits are strictly enforced: 50MPH (Roads) / 20MPH (Farm). Machinery must be repaired and cleaned after every shift. Abandoned gear will result in an immediate Tier 1 fine.</p>
        </div>

        <div style={ruleBox}>
          <h3 style={{ color: 'white', marginBottom: '10px' }}>02. FINANCIAL INTEGRITY</h3>
          <p style={{ color: '#8b949e' }}>The 5% Treasury Tax is mandatory. All sales must be screenshot and posted to #harvest-reports. Tax evasion will lead to permanent seizure of all business licenses.</p>
        </div>

        <div style={ruleBox}>
          <h3 style={{ color: 'white', marginBottom: '10px' }}>03. DISCIPLINARY SCALE</h3>
          <ul style={{ color: '#ff4d4d', paddingLeft: '20px' }}>
            <li><strong>TIER 1 ($5,000):</strong> Negligence, Speeding, Bad Parking.</li>
            <li><strong>TIER 2 ($15,000):</strong> Unpaid Tax, Repeated Damage.</li>
            <li><strong>TIER 3 (EXCLUSION):</strong> Theft, Griefing, Contract Violation.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const ruleBox = {
  background: 'rgba(255, 77, 77, 0.05)',
  border: '1px solid rgba(255, 77, 77, 0.2)',
  padding: '30px',
  borderRadius: '4px'
};
