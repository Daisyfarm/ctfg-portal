'use client';
import React, { useState } from 'react';

export default function StaffPanel() {
  const [cash, setCash] = useState('9,459,000');
  const [dispatch, setDispatch] = useState('Standby');

  return (
    <div style={{ padding: '40px', background: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#f85149', borderBottom: '2px solid #f85149', paddingBottom: '10px' }}>INTERNAL STAFF CONTROL</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '30px' }}>
        <div style={adminBox}>
          <h3 style={{ color: '#F2C94C' }}>💰 FINANCE OVERRIDE</h3>
          <input type="text" value={cash} onChange={(e) => setCash(e.target.value)} style={adminInput} />
          <button style={saveButton}>UPDATE BALANCE</button>
        </div>

        <div style={adminBox}>
          <h3 style={{ color: '#F2C94C' }}>📡 DISPATCH BROADCAST</h3>
          <input type="text" value={dispatch} onChange={(e) => setDispatch(e.target.value)} style={adminInput} />
          <button style={saveButton}>PUSH TO LIVE</button>
        </div>
      </div>
      <br /><a href="/" style={{ color: '#8b949e', textDecoration: 'none' }}>← RETURN TO MAIN TERMINAL</a>
    </div>
  );
}

const adminBox = { background: '#161b22', padding: '25px', borderRadius: '8px', border: '1px solid #30363d' };
const adminInput = { width: '100%', padding: '12px', background: '#0b0f1a', border: '1px solid #30363d', color: 'white', marginBottom: '15px', borderRadius: '4px' };
const saveButton = { width: '100%', padding: '12px', background: '#f85149', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' };