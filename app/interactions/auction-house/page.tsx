
"use client";
import React, { useState } from 'react';

export default function AuctionHousePage() {
  const [bids, setBids] = useState([
    { id: 1, item: 'John Deere 7R 330', currentBid: '$145,000', timeRemaining: '2 hours', highestBidder: 'DaisyFarmer' },
    { id: 2, item: 'Case IH 340 Magnum', currentBid: '$92,000', timeRemaining: '5 hours', highestBidder: 'NorthPlainsCoop' },
    { id: 3, item: 'Large Fuel Tank Trailer', currentBid: '$18,500', timeRemaining: '1 day', highestBidder: 'AgriLogistics' }
  ]);

  const [bidAmount, setBidAmount] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bidAmount) return;
    setSuccessMsg(true);
    setBidAmount('');
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Navigation Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #cbd5e1', padding: '12px 30px' }}>
        <div style={{ display: 'flex', gap: '25px', maxWidth: '1400px', margin: '0 auto', fontSize: '13px', fontWeight: 'bold', color: '#2563eb', flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer' }}>Myself ▾</span>
          <span style={{ color: '#1e3a8a', borderBottom: '2px solid #2563eb', paddingBottom: '2px', cursor: 'pointer' }}>Interactions</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Finances</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Data ▾</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Market</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Marketplace</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Wiki</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Support</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Settings</span>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '30px auto', padding: '0 30px' }}>
        
        {/* Page Header */}
        <div style={{ marginBottom: '25px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
            Live Machinery Auction House
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
            Bid on seized, surplus, or player-consigned agricultural equipment and land plots.
          </p>
        </div>

        {successMsg && (
          <div style={{ background: '#dcfce7', color: '#16a34a', padding: '15px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', marginBottom: '20px' }}>
            Bid placed successfully! You are currently the highest bidder.
          </div>
        )}

        {/* Auction Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {bids.map((auction) => (
            <div key={auction.id} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '22px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase' }}>Active Auction</span>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#d97706', background: '#fef3c7', padding: '2px 8px', borderRadius: '4px' }}>Ends in {auction.timeRemaining}</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>{auction.item}</h3>
                <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>{auction.currentBid}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '15px' }}>Highest Bidder: <strong style={{ color: '#334155' }}>{auction.highestBidder}</strong></div>
              </div>
              
              <form onSubmit={handlePlaceBid} style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  placeholder="Enter bid ($)" 
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  style={{ flex: 1, padding: '8px', background: '#fff', color: '#000', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                  required
                />
                <button 
                  type="submit"
                  style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '8px 14px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                >
                  BID
                </button>
              </form>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
