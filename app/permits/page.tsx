import React from 'react';

export default function PermitsPage() {
  return (
    <div style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ borderLeft: '4px solid #F2C94C', paddingLeft: '24px', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>
          Permit Office
        </h1>
        <p style={{ color: '#8b949e', marginTop: '10px', fontSize: '1.1rem' }}>
          Authorized Operating Licenses for Iron Daisy Agri Personnel.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
        
        <div style={cardStyle}>
          <div style={tagStyle}>LOGISTICS</div>
          <h2 style={{ color: '#F2C94C', marginTop: '15px' }}>CLASS A CDL</h2>
          <p style={descStyle}>Mandatory for all heavy hauling and grain transport units.</p>
          <div style={reqHeader}>REQUIREMENTS:</div>
          <ul style={listStyle}>
            <li>Advanced 53ft Reverse Docking</li>
            <li>Zero-Damage Safety Rating</li>
            <li>$5,000 Application Fee</li>
          </ul>
        </div>

        <div style={cardStyle}>
          <div style={tagStyle}>LIVESTOCK</div>
          <h2 style={{ color: '#F2C94C', marginTop: '15px' }}>LAS CERTIFICATION</h2>
          <p style={descStyle}>Authorized for Cattle, Sheep, and Pig management.</p>
          <div style={reqHeader}>REQUIREMENTS:</div>
          <ul style={listStyle}>
            <li>100% Health Maintenance Record</li>
            <li>TMR Feed Ratio Mastery</li>
            <li>$7,500 Application Fee</li>
          </ul>
        </div>

        <div style={cardStyle}>
          <div style={tagStyle}>INDUSTRIAL</div>
          <h2 style={{ color: '#F2C94C', marginTop: '15px' }}>HEP CLEARANCE</h2>
          <p style={descStyle}>Specialized permit for Forestry and Construction assets.</p>
          <div style={reqHeader}>REQUIREMENTS:</div>
          <ul style={listStyle}>
            <li>Precision Load Stabilization Test</li>
            <li>Safe Logging Protocol</li>
            <li>$10,000 Application Fee</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

const cardStyle = {
  background: '#161b22',
  padding: '30px',
  borderRadius: '4px',
  border: '1px solid #30363d',
  boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
};

const tagStyle = {
  fontSize: '0.7rem',
  background: '#30363d',
  padding: '4px 8px',
  display: 'inline-block',
  borderRadius: '2px',
  letterSpacing: '1px'
};

const descStyle = { color: '#8b949e', fontSize: '0.95rem', marginBottom: '20px' };
const reqHeader = { fontSize: '0.8rem', fontWeight: 'bold', color: 'white', borderBottom: '1px solid #30363d', paddingBottom: '5px' };
const listStyle = { marginTop: '10px', fontSize: '0.9rem', color: '#c9d1d9', paddingLeft: '20px' };
