
"use client";
import React, { useState } from 'react';

export default function EventCenterPage() {
  const [rsvps, setRsvps] = useState<{ [key: string]: boolean }>({});

  const handleRsvp = (id: string) => {
    setRsvps(prev => ({ ...prev, [id]: true }));
  };

  const events = [
    {
      id: 'event-1',
      title: 'Global Multiplayer Harvest Convoys',
      server: 'Server 19',
      date: 'July 28, 2026 - 18:00 EST',
      host: 'Cool Brook Farms & FSN Admin',
      description: 'Join the community-wide convoy transporting thousands of metric tons of grain across servers to central sellpoints.'
    },
    {
      id: 'event-2',
      title: 'Server 8 Weekly Forestry Cleanup & Logging Challenge',
      server: 'Server 8',
      date: 'August 2, 2026 - 15:00 EST',
      host: 'Riverview Logistics',
      description: 'Collaborative timber management event. Clear marked plots and feed the regional sawmills for bonus payouts.'
    },
    {
      id: 'event-3',
      title: 'New Season 25 Opening Ceremony & Q&A',
      server: 'All Servers',
      date: 'August 10, 2026 - 20:00 EST',
      host: 'FSN Management Team',
      description: 'Discussion panel regarding upcoming map resets, new economic balancing updates, and features for Season 25.'
    }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Navigation Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #cbd5e1', padding: '12px 30px' }}>
        <div style={{ display: 'flex', gap: '25px', maxWidth: '1400px', margin: '0 auto', fontSize: '13px', fontWeight: 'bold', color: '#2563eb', flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer' }}>Myself ▾</span>
          <span style={{ cursor: 'pointer' }}>Interactions ▾</span>
          <span style={{ cursor: 'pointer' }}>Finances ▾</span>
          <span style={{ cursor: 'pointer' }}>Data ▾</span>
          <span style={{ cursor: 'pointer' }}>Market ▾</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Wiki</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Support</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Settings</span>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '30px auto', padding: '0 30px' }}>
        
        {/* Page Title */}
        <div style={{ marginBottom: '25px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
            Event Center
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
            Check upcoming community gatherings, server convoys, and official game events.
          </p>
        </div>

        {/* Events List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {events.map((item) => (
            <div key={item.id} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', display: 'grid', gridTemplateColumns: '1fr 220px', gap: '25px', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              
              {/* Details */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase', marginBottom: '4px' }}>
                  📅 {item.date} • {item.server}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>
                  {item.title}
                </h3>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px' }}>
                  Hosted by: <strong>{item.host}</strong>
                </div>
                <p style={{ fontSize: '13px', color: '#334155', margin: '0', lineHeight: '1.5' }}>
                  {item.description}
                </p>
              </div>

              {/* Action Button */}
              <div>
                <button 
                  onClick={() => handleRsvp(item.id)}
                  style={{ width: '100%', background: rsvps[item.id] ? '#16a34a' : '#0284c7', color: '#fff', border: 'none', padding: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                >
                  {rsvps[item.id] ? 'RSVP CONFIRMED' : 'RSVP TO EVENT'}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
