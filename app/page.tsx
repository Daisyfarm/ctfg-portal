"use client";
import React from 'react';
import { Radio, DollarSign, User, Send, FileText, Shield } from 'lucide-react';

export default function CommandDashboard() {
  return (
    <div style={{ 
      background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop") no-repeat center center fixed',
      backgroundSize: 'cover',
      minHeight: '100vh', 
      color: '#fff', 
      fontFamily: 'Arial, sans-serif', 
      padding: '40px' 
    }}>
      {/* Top Header with FSN Logo Area */}
      <div style={{ background: 'rgba(26, 26, 26, 0.85)', backdropFilter: 'blur(5px)', border: '1px solid #333', padding: '20px', borderRadius: '8px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* Logo Badge Container (Replace src with your actual logo asset path when ready) */}
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: 'linear-gradient(135deg, #111 0%, #222 100%)', 
            border: '2px solid #f59e0b', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
            overflow: 'hidden'
          }}>
            {/* You can swap this span out with: <img src="/your-logo.png" alt="FSN Logo" style={{width: '100%', height: '100%', objectFit: 'cover'}} /> */}
            <span style={{ color: '#f59e0b', fontWeight: 900, fontSize: '14px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>FSN</span>
          </div>
          <div>
            <h1 style={{ fontSize: '24px', textTransform: 'uppercase', margin: 0, fontWeight: 900, color: '#f59e0b', letterSpacing: '0.5px' }}>
              FSN Farm Simulator Network
            </h1>
            <p style={{ fontSize: '11px', color: '#aaa', margin: '4px 0 0', letterSpacing: '1px' }}>COMMUNITY MULTIPLAYER PORTAL | SYSTEM INTEGRITY: ACTIVE</p>
          </div>
        </div>
        <button 
          onClick={() => window.location.href = '/contact'}
          style={{ background: '#22c55e', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}
        >
          Secure Contact
        </button>
      </div>

      {/* Live Dispatch Alert */}
      <div style={{ background: 'rgba(26, 26, 26, 0.85)', backdropFilter: 'blur(5px)', border: '1px solid #333', padding: '20px', borderRadius: '8px', marginBottom: '30px', borderLeft: '4px solid #f59e0b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f59e0b', fontSize: '14px', fontWeight: 'bold' }}>
          <Radio size={18} /> LIVE DISPATCH BROADCAST
        </div>
        <p style={{ margin: '8px 0 0', fontSize: '15px', color: '#ddd' }}>&ldquo;Standby&rdquo; — Sector 4-G Plowing Ops Protected.</p>
      </div>

      {/* User Stats Card */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: 'rgba(26, 26, 26, 0.85)', backdropFilter: 'blur(5px)', border: '1px solid #333', padding: '20px', borderRadius: '8px' }}>
          <div style={{ color: '#888', fontSize: '12px', textTransform: 'uppercase' }}>Chief Operator / Founder</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={20} color="#22c55e" /> Samuel_Founder
          </div>
          <div style={{ fontSize: '13px', color: '#aaa', marginTop: '5px' }}>Rank: <strong style={{ color: '#fff' }}>Executive</strong></div>
          <div style={{ fontSize: '12px', color: '#22c55e', marginTop: '8px' }}>EID Status: Verified</div>
        </div>

        <div style={{ background: 'rgba(26, 26, 26, 0.85)', backdropFilter: 'blur(5px)', border: '1px solid #333', padding: '20px', borderRadius: '8px' }}>
          <div style={{ color: '#888', fontSize: '12px', textTransform: 'uppercase' }}>Treasury Reserves</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '5px', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <DollarSign size={24} /> 9,459,000
          </div>
          <div style={{ fontSize: '12px', color: '#aaa', marginTop: '8px' }}>FSN Operational Reserve Fund</div>
        </div>
      </div>

      {/* Action Buttons Grid */}
      <h2 style={{ fontSize: '18px', textTransform: 'uppercase', marginBottom: '15px', borderBottom: '1px solid #333', paddingBottom: '10px', color: '#f59e0b' }}>Terminal Access</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
        <button onClick={() => window.location.href = '/dispatch'} style={{ background: 'rgba(26, 26, 26, 0.85)', color: '#fff', border: '1px solid #22c55e', padding: '15px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
          <Send size={18} color="#22c55e" /> Request Dispatch
        </button>
        <button onClick={() => window.location.href = '/contracts'} style={{ background: 'rgba(26, 26, 26, 0.85)', color: '#fff', border: '1px solid #22c55e', padding: '15px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
          <FileText size={18} color="#f59e0b" /> View Contracts
        </button>
        <button onClick={() => window.location.href = '/directory'} style={{ background: 'rgba(26, 26, 26, 0.85)', color: '#fff', border: '1px solid #22c55e', padding: '15px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
          <Shield size={18} color="#22c55e" /> Personnel Directory
        </button>
        <button onClick={() => window.location.href = '/contact'} style={{ background: 'rgba(26, 26, 26, 0.85)', color: '#fff', border: '1px solid #f59e0b', padding: '15px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
          Contact Board
        </button>
      </div>

      {/* Footer Terminal ID */}
      <div style={{ marginTop: '50px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', textAlign: 'center', fontSize: '11px', color: '#aaa' }}>
        FSN (FARM SIMULATOR NETWORK) | SECURE TERMINAL V2.0.26
      </div>
    </div>
  );
}
