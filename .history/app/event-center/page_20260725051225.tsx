'use client';

import React from 'react';
import Link from 'next/link';

interface ServerEvent {
  id: string;
  title: string;
  date: string;
  category: 'Auction' | 'Competition' | 'Community';
  prize: string;
  status: 'Upcoming' | 'Live' | 'Concluded';
}

const events: ServerEvent[] = [
  { id: 'EVT-01', title: 'District 2 Vintage Tractor Auction', date: 'Tonight, 8:00 PM EST', category: 'Auction', prize: 'Rare Equipment Access', status: 'Upcoming' },
  { id: 'EVT-02', title: 'Fall Harvest Speed Challenge', date: 'This Saturday', category: 'Competition', prize: '$250,000 Server Bounty', status: 'Upcoming' },
  { id: 'EVT-03', title: 'Mayoral Town Hall & Zoning Review', date: 'Active Now', category: 'Community', prize: 'Policy Votes', status: 'Live' },
  { id: 'EVT-04', title: 'Spring Planting Drag Race', date: 'Last Week', category: 'Competition', prize: '$100,000', status: 'Concluded' },
];

export default function EventCenterPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Regional Event Center</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '11px' }}>
            <Link href="/market" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Market Index</Link>
            <Link href="/contracts" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Contracts</Link>
            <Link href="/event-center" style={{ color: '#34d399', textDecoration: 'none', fontWeight: 900 }}>Events</Link>
            <Link href="/fleet" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Fleet</Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <div style={{ color: '#34d399', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em' }}>
              Community & Competition Hub
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Server Event Center
            </h1>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {events.map((evt) => (
            <div key={evt.id} style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 900, color: '#71717a', textTransform: 'uppercase' }}>{evt.id} • {evt.category}</span>
                  <span style={{ 
                    fontSize: '10px', 
                    fontWeight: 900, 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    textTransform: 'uppercase',
                    backgroundColor: evt.status === 'Live' ? 'rgba(52, 211, 153, 0.1)' : evt.status === 'Upcoming' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(113, 113, 122, 0.1)',
                    color: evt.status === 'Live' ? '#34d399' : evt.status === 'Upcoming' ? '#eab308' : '#71717a',
                    border: `1px solid ${evt.status === 'Live' ? 'rgba(52, 211, 153, 0.2)' : evt.status === 'Upcoming' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(113, 113, 122, 0.2)'}`
                  }}>
                    {evt.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: '0 0 12px 0', textTransform: 'uppercase' }}>{evt.title}</h3>

                <div style={{ fontSize: '12px', color: '#a1a1aa', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div><strong style={{ color: '#ffffff' }}>Schedule:</strong> {evt.date}</div>
                  <div><strong style={{ color: '#ffffff' }}>Prizes / Stakes:</strong> {evt.prize}</div>
                </div>
              </div>

              <button 
                style={{ 
                  width: '100%', 
                  backgroundColor: 'rgba(52, 211, 153, 0.1)', 
                  color: '#34d399', 
                  border: '1px solid rgba(52, 211, 153, 0.2)', 
                  padding: '10px', 
                  borderRadius: '6px', 
                  fontSize: '11px', 
                  fontWeight: 900, 
                  textTransform: 'uppercase', 
                  cursor: 'pointer',
                  letterSpacing: '0.05em'
                }}>
                View Details / RSVP
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}