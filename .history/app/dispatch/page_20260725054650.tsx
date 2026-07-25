'use client';

import React from 'react';
import Link from 'next/link';

export default function DispatchPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#05070a', 
      color: '#ffffff', 
      fontFamily: 'sans-serif',
      backgroundImage: 'linear-gradient(rgba(5, 7, 10, 0.55), rgba(5, 7, 10, 0.65)), url("/hero-farm.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Top Header Nav */}
      <header style={{ backgroundColor: 'rgba(11, 14, 20, 0.65)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#71717a' }}>|</span>
            <span style={{ color: '#34d399' }}>Enterprise Command System v2.4</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '11px' }}>
            <Link href="/market" style={{ color: '#d4d4d8', textDecoration: 'none' }}>Market Index</Link>
            <Link href="/contracts" style={{ color: '#d4d4d8', textDecoration: 'none' }}>Contracts</Link>
            <Link href="/fleet" style={{ color: '#d4d4d8', textDecoration: 'none' }}>Fleet</Link>
            <Link href="/dispatch" style={{ color: '#34d399', textDecoration: 'none', fontWeight: 900 }}>Dispatch</Link>
            <Link href="/event-center" style={{ color: '#d4d4d8', textDecoration: 'none' }}>Events</Link>
            <Link href="/field-work" style={{ color: '#d4d4d8', textDecoration: 'none' }}>Fields</Link>
            <Link href="/import-export" style={{ color: '#d4d4d8', textDecoration: 'none' }}>Imports</Link>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <div style={{ color: '#34d399', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              Logistics & Supply Chain • Active Routing
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 900, textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em', textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>
              Task Dispatch
            </h1>
          </div>
          <Link href="/" style={{ backgroundColor: 'rgba(11, 14, 20, 0.75)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '12px 20px', borderRadius: '8px', fontSize: '12px', color: '#ffffff', textDecoration: 'none', fontWeight: 900, textTransform: 'uppercase' }}>
            ← Back to Command Center
          </Link>
        </div>

        {/* Dispatch Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {[
            { task: 'Grain Haul #102', destination: 'Northern Silos', tonnage: '1,200T', progress: '75%' },
            { task: 'Fertilizer Delivery', destination: 'Sector Alpha Fields', tonnage: '450T', progress: '30%' },
            { task: 'Seed Transport', destination: 'Western Depot', tonnage: '300T', progress: '100%' },
          ].map((item, idx) => (
            <div key={idx} style={{ backgroundColor: 'rgba(11, 14, 20, 0.75)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '10px', fontWeight: 900, color: '#34d399', textTransform: 'uppercase', marginBottom: '8px' }}>Destination: {item.destination}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: '0 0 12px 0', textTransform: 'uppercase' }}>{item.task}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                <span style={{ color: '#a1a1aa' }}>Volume:</span>
                <span style={{ color: '#ffffff', fontWeight: 900 }}>{item.tonnage}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ color: '#a1a1aa' }}>Progress:</span>
                <span style={{ color: '#60a5fa', fontWeight: 900 }}>{item.progress}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}