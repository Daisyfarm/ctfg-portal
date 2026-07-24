"use client";
import React from 'react';
import { supabase } from '../../db/supabase'; 

export default function AlertPage() {
  return (
    <div style={{ background: '#111', minHeight: '100vh', color: '#fff', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
      {/* TOP BAR */}
      <div style={{ background: '#222', padding: '12px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #4a7ab5' }}>
        <span onClick={() => window.location.href='/dashboard'} style={{ color: '#22c55e', fontWeight: '900', fontSize: '20px', fontStyle: 'italic', cursor: 'pointer' }}>IRON DAISY AGRI</span>
        <span style={{ color: '#fff', fontSize: '11px' }}>SYSTEM: ONLINE</span>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* SIDEBAR */}
        <div style={{ width: '240px', background: '#222', padding: '20px', borderRight: '1px solid #000' }}>
          <button style={{ width: '100%', padding: '12px 15px', background: 'transparent', color: '#aaa', border: 'none', marginBottom: '8px', textAlign: 'left', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', borderRadius: '4px' }} onClick={() => window.location.href='/dashboard'}>Dashboard</button>
          <button style={{ width: '100%', padding: '12px 15px', background: 'transparent', color: '#aaa', border: 'none', marginBottom: '8px', textAlign: 'left', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', borderRadius: '4px' }} onClick={() => window.location.href='/accounting'}>Accounting</button>
          <button style={{ width: '100%', padding: '12px 15px', background: '#333', color: '#fff', border: 'none', marginBottom: '8px', textAlign: 'left', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', borderRadius: '4px' }} onClick={() => window.location.href='/alert'}>IDA Dispatch Alert</button>
          <button style={{ width: '100%', padding: '12px 15px', background: 'transparent', color: '#aaa', border: 'none', marginBottom: '8px', textAlign: 'left', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', borderRadius: '4px' }} onClick={() => supabase.auth.signOut().then(() => window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT AREA */}
        <div style={{ flex: 1, background: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize: 'cover', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }}></div>
          
          <div style={{ position: 'relative', zIndex: 1, border: '2px solid #F2C94C', padding: '40px', background: '#161b22', textAlign: 'center', maxWidth: '500px', width: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
            <h2 style={{ color: '#F2C94C', margin: '0 0 15px 0', textTransform: 'uppercase' }}>IDA DISPATCH ALERT</h2>
            <p style={{ color: '#8b949e', margin: 0, fontSize: '14px' }}>SYSTEM ACTIVE: Monitoring Montana Field Comms...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
