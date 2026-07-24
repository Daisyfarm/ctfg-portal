
"use client";
import React, { useState } from 'react';

export default function LottoCenterPage() {
  const [tickets, setTickets] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<{ [key: string]: boolean }>({});

  const handleTicketChange = (id: string, value: string) => {
    setTickets(prev => ({ ...prev, [id]: value }));
  };

  const handleBuyTicket = (id: string) => {
    setSuccess(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setSuccess(prev => ({ ...prev, [id]: false }));
    }, 3000);
  };

  const lotteries = [
    {
      id: 'lotto-1',
      title: 'Mega Farm Jackpot Draw #412',
      jackpot: '$250,000.00',
      ticketPrice: '$5,000.00 per ticket',
      drawingDate: 'July 30, 2026',
      server: 'Server 19',
      description: 'The biggest weekly community lottery pool. Winner takes all or shares based on syndicate entries.'
    },
    {
      id: 'lotto-2',
      title: 'Mid-Week Lucky Harvester Sweepstakes',
      jackpot: '$75,000.00',
      ticketPrice: '$1,500.00 per ticket',
      drawingDate: 'July 27, 2026',
      server: 'Server 8',
      description: 'Quick-turnaround community sweepstakes designed to reward active daily farmers and contractors.'
    },
    {
      id: 'lotto-3',
      title: 'Forestry & Equipment Mystery Draw',
      jackpot: '$120,000.00 Value',
      ticketPrice: '$3,000.00 per ticket',
      drawingDate: 'August 3, 2026',
      server: 'Server 14',
      description: 'Win high-tier forestry machinery, heavy transport semi-trucks, or cash equivalents.'
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
        
        {/* Page Title & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
              Lotto Center
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
              Purchase lottery tickets, check active jackpots, and test your luck in community draws.
            </p>
          </div>
          <button style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px 20px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
            My Ticket History
          </button>
        </div>

        {/* Lotteries List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {lotteries.map((item) => (
            <div key={item.id} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', display: 'grid', gridTemplateColumns: '1fr 250px', gap: '25px', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              
              {/* Details */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {item.server} • Draw Date: <strong>{item.drawingDate}</strong>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 15px 0', lineHeight: '1.5' }}>
                  {item.description}
                </p>
                <div style={{ display: 'flex', gap: '25px', fontSize: '13px', color: '#64748b' }}>
                  <div>Current Jackpot: <strong style={{ color: '#16a34a' }}>{item.jackpot}</strong></div>
                  <div>Cost: <strong>{item.ticketPrice}</strong></div>
                </div>
              </div>

              {/* Purchase Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input 
                  type="number" 
                  min="1"
                  placeholder="Number of tickets" 
                  value={tickets[item.id] || ''}
                  onChange={(e) => handleTicketChange(item.id, e.target.value)}
                  style={{ width: '100%', padding: '10px', background: '#fff', color: '#000', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
                />
                <button 
                  onClick={() => handleBuyTicket(item.id)}
                  style={{ width: '100%', background: success[item.id] ? '#16a34a' : '#0284c7', color: '#fff', border: 'none', padding: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                >
                  {success[item.id] ? 'TICKETS PURCHASED!' : 'BUY TICKETS'}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
