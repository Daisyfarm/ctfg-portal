
"use client";
import React, { useState } from 'react';

export default function CompetitionCenterPage() {
  const [joined, setJoined] = useState<{ [key: string]: boolean }>({});

  const handleJoin = (id: string) => {
    setJoined(prev => ({ ...prev, [id]: true }));
  };

  const competitions = [
    {
      id: 'comp-1',
      title: 'Spring Harvest Speedrun Championship',
      category: 'Harvesting',
      reward: '$50,000.00',
      server: 'Server 19',
      participants: 12,
      deadline: '2 Days Left',
      description: 'Compete to harvest 100 hectares of wheat in the shortest amount of time using standard tier-3 equipment.'
    },
    {
      id: 'comp-2',
      title: 'Precision Plowing Derby',
      category: 'Cultivation',
      reward: '$25,000.00',
      server: 'Server 8',
      participants: 8,
      deadline: '5 Days Left',
      description: 'Straightest lines and highest score efficiency win the grand prize. All contestants must use tracked tractors.'
    },
    {
      id: 'comp-3',
      title: 'Forestry Logging Marathon',
      category: 'Logging',
      reward: '$35,000.00',
      server: 'Server 14',
      participants: 15,
      deadline: 'Active Now',
      description: 'Deliver the highest volume of Spruce logs to the central sawmill within the 3-hour window.'
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
        
        {/* Page Title & Description */}
        <div style={{ marginBottom: '25px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
            Competition Center
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
            Enter active community tournaments, showcase your farming skills, and win lucrative prize pools.
          </p>
        </div>

        {/* Competitions List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {competitions.map((comp) => (
            <div key={comp.id} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', display: 'grid', gridTemplateColumns: '1fr 220px', gap: '25px', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              
              {/* Details */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {comp.category} • {comp.server} • ⏳ {comp.deadline}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 10px 0' }}>
                  {comp.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 15px 0', lineHeight: '1.5' }}>
                  {comp.description}
                </p>
                <div style={{ display: 'flex', gap: '25px', fontSize: '13px', color: '#64748b' }}>
                  <div>Prize Pool: <strong style={{ color: '#16a34a' }}>{comp.reward}</strong></div>
                  <div>Participants: <strong>{comp.participants} Registered</strong></div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button 
                  onClick={() => handleJoin(comp.id)}
                  style={{ width: '100%', background: joined[comp.id] ? '#16a34a' : '#0284c7', color: '#fff', border: 'none', padding: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                >
                  {joined[comp.id] ? 'COMPETITION JOINED' : 'JOIN COMPETITION'}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
