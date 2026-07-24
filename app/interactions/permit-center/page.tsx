
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Shield, FileText } from 'lucide-react';

export default function PermitCenterPage() {
  const [interactionsDropdownOpen, setInteractionsDropdownOpen] = useState(false);
  const [financeDropdownOpen, setFinanceDropdownOpen] = useState(false);

  return (
    <div style={{ 
      background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop") no-repeat center center fixed',
      backgroundSize: 'cover',
      minHeight: '100vh', 
      color: '#fff', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      {/* Top Utility / Navigation Bar */}
      <div style={{ background: '#111', borderBottom: '1px solid #333', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '18px', fontStyle: 'italic', letterSpacing: '-0.5px' }}>
            <span style={{ color: '#fff' }}>FSN</span>
            <span style={{ color: '#22c55e', background: '#111', padding: '0 4px', border: '1px solid #22c55e', borderRadius: '3px', fontSize: '12px' }}>FARM</span>
            <span style={{ fontSize: '11px', color: '#888', fontStyle: 'normal', fontWeight: 'normal' }}>FARM SIM NETWORK</span>
          </div>
          <div style={{ color: '#aaa' }}>
            <strong style={{ color: '#fff' }}>ReubyJuice</strong> (#474) &bull; <span style={{ color: '#f59e0b' }}>Cool Brook Farms</span> <span style={{ color: '#22c55e' }}>$3,212.08 (IG) $0.00 (M)</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#888', fontSize: '12px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span>🪙 3</span>
            <span>📦 0</span>
            <span>🧰 0</span>
            <span>🎖️ 0</span>
            <span>💪 0</span>
            <span style={{ color: '#22c55e' }}>🌴 Year 18</span>
          </div>
          <span>2026-07-24 13:41:00</span>
        </div>
      </div>

      {/* Sub-Navigation Menu Bar */}
      <div style={{ background: '#181818', borderBottom: '2px solid #333', padding: '8px 20px', display: 'flex', gap: '25px', fontSize: '14px', fontWeight: 'bold', position: 'relative' }}>
        
        <Link href="/myself" style={{ color: '#bbb', textDecoration: 'none', padding: '4px 0' }}>
          Myself
        </Link>

        {/* Interactions Dropdown Wrapper */}
        <div style={{ position: 'relative' }} onMouseLeave={() => setInteractionsDropdownOpen(false)}>
          <button 
            onClick={() => setInteractionsDropdownOpen(!interactionsDropdownOpen)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#22c55e', 
              cursor: 'pointer', 
              padding: '4px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 'bold',
              borderBottom: '2px solid #22c55e',
              fontSize: '14px'
            }}
          >
            Interactions <ChevronDown size={14} />
          </button>

          {interactionsDropdownOpen && (
            <div style={{ 
              position: 'absolute', 
              top: '32px', 
              left: 0, 
              background: '#1c1c1c', 
              border: '1px solid #444', 
              borderRadius: '4px', 
              boxShadow: '0 8px 16px rgba(0,0,0,0.5)', 
              zIndex: 100,
              width: '200px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Link href="/interactions/auction-house" style={{ color: '#ddd', padding: '10px 15px', textDecoration: 'none', fontSize: '13px' }}>Auction House</Link>
              <Link href="/interactions/contract-center" style={{ color: '#ddd', padding: '10px 15px', textDecoration: 'none', fontSize: '13px' }}>Contract Center</Link>
              <Link href="/interactions/event-center" style={{ color: '#ddd', padding: '10px 15px', textDecoration: 'none', fontSize: '13px' }}>Event Center</Link>
              <Link href="/interactions/investment-center" style={{ color: '#ddd', padding: '10px 15px', textDecoration: 'none', fontSize: '13px' }}>Investment Center</Link>
              <Link href="/interactions/import-export-center" style={{ color: '#ddd', padding: '10px 15px', textDecoration: 'none', fontSize: '13px' }}>Import/Export Center</Link>
              <Link href="/interactions/competition-center" style={{ color: '#ddd', padding: '10px 15px', textDecoration: 'none', fontSize: '13px' }}>Competition Center</Link>
              <Link href="/interactions/permit-center" style={{ color: '#22c55e', background: '#2a2a2a', padding: '10px 15px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>Permit Center</Link>
              <Link href="/interactions/lotto-center" style={{ color: '#ddd', padding: '10px 15px', textDecoration: 'none', fontSize: '13px' }}>Lotto Center</Link>
            </div>
          )}
        </div>

        {/* Finances Dropdown Wrapper */}
        <div style={{ position: 'relative' }} onMouseLeave={() => setFinanceDropdownOpen(false)}>
          <button 
            onClick={() => setFinanceDropdownOpen(!financeDropdownOpen)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#bbb', 
              cursor: 'pointer', 
              padding: '4px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '14px'
            }}
          >
            Finances <ChevronDown size={14} />
          </button>

          {financeDropdownOpen && (
            <div style={{ 
              position: 'absolute', 
              top: '32px', 
              left: 0, 
              background: '#1c1c1c', 
              border: '1px solid #444', 
              borderRadius: '4px', 
              boxShadow: '0 8px 16px rgba(0,0,0,0.5)', 
              zIndex: 100,
              width: '160px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Link href="/finances/accounting" style={{ color: '#ddd', padding: '10px 15px', textDecoration: 'none', fontSize: '13px' }}>Accounting</Link>
              <Link href="/finances/banking" style={{ color: '#ddd', padding: '10px 15px', textDecoration: 'none', fontSize: '13px' }}>Banking</Link>
              <Link href="/finances/checkbook" style={{ color: '#ddd', padding: '10px 15px', textDecoration: 'none', fontSize: '13px' }}>Checkbook</Link>
              <Link href="/finances/invoices" style={{ color: '#ddd', padding: '10px 15px', textDecoration: 'none', fontSize: '13px' }}>Invoices</Link>
              <Link href="/finances/ledger" style={{ color: '#ddd', padding: '10px 15px', textDecoration: 'none', fontSize: '13px' }}>Ledger</Link>
            </div>
          )}
        </div>

        <Link href="/data" style={{ color: '#bbb', textDecoration: 'none', padding: '4px 0' }}>Data</Link>
        <Link href="/market" style={{ color: '#bbb', textDecoration: 'none', padding: '4px 0' }}>Market</Link>
        <Link href="/wiki" style={{ color: '#bbb', textDecoration: 'none', padding: '4px 0' }}>Wiki</Link>
        <Link href="/settings" style={{ color: '#bbb', textDecoration: 'none', padding: '4px 0' }}>Settings</Link>

      </div>

      {/* Main Content Area */}
      <div style={{ padding: '30px 40px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Permits Header */}
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 10px 0', color: '#1e3a8a', letterSpacing: '0.5px', background: 'rgba(255,255,255,0.9)', display: 'inline-block', padding: '4px 12px', borderRadius: '4px' }}>
          Permits
        </h1>
        <p style={{ fontSize: '12px', color: '#ddd', background: 'rgba(0,0,0,0.7)', padding: '10px 15px', borderRadius: '4px', marginBottom: '30px', borderLeft: '4px solid #2563eb', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
          This is the permits area, this is where you will purchase permits and renew them as necessary. If you have any questions about this area, refer to the knowledgebase!
        </p>

        {/* Permit Category Buttons Panel */}
        <div style={{ background: 'rgba(20, 20, 20, 0.85)', padding: '30px', borderRadius: '8px', border: '1px solid #333' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
            <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '15px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', textAlign: 'center', fontSize: '14px', letterSpacing: '0.5px', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>
              ANIMALS
            </button>
            <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '15px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', textAlign: 'center', fontSize: '14px', letterSpacing: '0.5px', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>
              LOGGING
            </button>
            <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '15px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', textAlign: 'center', fontSize: '14px', letterSpacing: '0.5px', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>
              PROPERTY
            </button>
            <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '15px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', textAlign: 'center', fontSize: '14px', letterSpacing: '0.5px', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>
              SKILLED TRADE
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
