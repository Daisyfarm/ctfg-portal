"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function TopNav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <div style={{ background: '#fff', borderBottom: '1px solid #cbd5e1', padding: '12px 30px', position: 'relative', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', gap: '25px', maxWidth: '1400px', margin: '0 auto', fontSize: '13px', fontWeight: 'bold', color: '#2563eb', flexWrap: 'wrap', alignItems: 'center' }}>
        
        {/* Myself Dropdown */}
        <div style={{ position: 'relative' }}>
          <span onClick={() => toggleDropdown('myself')} style={{ cursor: 'pointer', userSelect: 'none' }}>
            Myself ▾
          </span>
          {openDropdown === 'myself' && (
            <div style={{ position: 'absolute', top: '25px', left: 0, background: '#fff', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '4px', zIndex: 100, minWidth: '160px', display: 'flex', flexDirection: 'column' }}>
              <Link href="/myself" style={{ padding: '10px 15px', color: '#334155', textDecoration: 'none', borderBottom: '1px solid #f1f5f9', fontSize: '12px' }}>Profile</Link>
              <Link href="/myself" style={{ padding: '10px 15px', color: '#334155', textDecoration: 'none', fontSize: '12px' }}>Fleet & Equipment</Link>
            </div>
          )}
        </div>

        {/* Interactions Dropdown */}
        <div style={{ position: 'relative' }}>
          <span onClick={() => toggleDropdown('interactions')} style={{ cursor: 'pointer', userSelect: 'none' }}>
            Interactions ▾
          </span>
          {openDropdown === 'interactions' && (
            <div style={{ position: 'absolute', top: '25px', left: 0, background: '#fff', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '4px', zIndex: 100, minWidth: '180px', display: 'flex', flexDirection: 'column' }}>
              <Link href="/interactions" style={{ padding: '10px 15px', color: '#334155', textDecoration: 'none', borderBottom: '1px solid #f1f5f9', fontSize: '12px' }}>Contracts Board</Link>
              <Link href="/interactions" style={{ padding: '10px 15px', color: '#334155', textDecoration: 'none', borderBottom: '1px solid #f1f5f9', fontSize: '12px' }}>Permit Center</Link>
              <Link href="/interactions/auction-house" style={{ padding: '10px 15px', color: '#334155', textDecoration: 'none', fontSize: '12px' }}>Auction House</Link>
            </div>
          )}
        </div>

        {/* Finances Dropdown */}
        <div style={{ position: 'relative' }}>
          <span onClick={() => toggleDropdown('finances')} style={{ cursor: 'pointer', userSelect: 'none' }}>
            Finances ▾
          </span>
          {openDropdown === 'finances' && (
            <div style={{ position: 'absolute', top: '25px', left: 0, background: '#fff', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '4px', zIndex: 100, minWidth: '160px', display: 'flex', flexDirection: 'column' }}>
              <Link href="/finances" style={{ padding: '10px 15px', color: '#334155', textDecoration: 'none', borderBottom: '1px solid #f1f5f9', fontSize: '12px' }}>Overview & Loans</Link>
              <Link href="/finances" style={{ padding: '10px 15px', color: '#334155', textDecoration: 'none', fontSize: '12px' }}>Transactions</Link>
            </div>
          )}
        </div>

        {/* Data Dropdown */}
        <div style={{ position: 'relative' }}>
          <span onClick={() => toggleDropdown('data')} style={{ cursor: 'pointer', userSelect: 'none' }}>
            Data ▾
          </span>
          {openDropdown === 'data' && (
            <div style={{ position: 'absolute', top: '25px', left: 0, background: '#fff', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '4px', zIndex: 100, minWidth: '160px', display: 'flex', flexDirection: 'column' }}>
              <Link href="/data" style={{ padding: '10px 15px', color: '#334155', textDecoration: 'none', borderBottom: '1px solid #f1f5f9', fontSize: '12px' }}>Server Logs</Link>
              <Link href="/data" style={{ padding: '10px 15px', color: '#334155', textDecoration: 'none', fontSize: '12px' }}>Economy Stats</Link>
            </div>
          )}
        </div>

        {/* Direct Links */}
        <Link href="/market" style={{ color: '#2563eb', textDecoration: 'none' }}>Market</Link>
        <Link href="/marketplace" style={{ color: '#2563eb', textDecoration: 'none' }}>Marketplace</Link>
        <Link href="/settings" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 'normal' }}>Settings</Link>
        
      </div>
    </div>
  );
}
