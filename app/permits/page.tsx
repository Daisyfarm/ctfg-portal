import React from 'react';

export default function PermitsPage() {
  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ borderLeft: '5px solid #F2C94C', paddingLeft: '20px', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Permit Office
        </h1>
        <p style={{ color: '#8b949e' }}>Official Certification for Iron Daisy Agri Operations</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* CDL CARD */}
        <div style={cardStyle}>
          <h2 style={{ color: '#F2C94C' }}>🚛 CLASS A CDL</h2>
          <p>Required for all Semi-Truck and Grain Logistics operations.</p>
          <ul style={listStyle}>
            <li>Pass: 53ft Reverse Docking Test</li>
            <li>Pass: Montana Road Safety Exam</li>
            <li>Cost: $5,000 Application Fee</li>
          </ul>
        </div>

        {/* LAS CARD */}
        <div style={cardStyle}>
          <h2 style={{ color: '#F2C94C' }}>🐾 LIVESTOCK (LAS)</h2>
          <p>Required for handling Cattle, Sheep, and Pig assets.</p>
          <ul style={listStyle}>
            <li>Requirement: Maintain 100% Health</li>
            <li>Knowledge: TMR Feed Ratios</li>
            <li>Cost: $7,500 Application Fee</li>
          </ul>
        </div>

        {/* HEP CARD */}
        <div style={cardStyle}>
          <h2 style={{ color: '#F2C94C' }}>🏗️ HEAVY EQUIPMENT (HEP)</h2>
          <p>Required for Forestry, Cranes, and Construction gear.</p>
          <ul style={listStyle}>
            <li>Test: Precision Load Stabilization</li>
            <li>Test: Clean-Cut Forestry Standards</li>
            <li>Cost: $10,000 Application Fee</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

const cardStyle = {
  background: '#161b22',
  padding: '25px',
  borderRadius: '5px',
  border: '1px solid #30363d'
};

const listStyle = {
  marginTop: '15px',
  fontSize: '0.9rem',
  lineHeight: '1.6',
  color: '#c9d1d9'
};
