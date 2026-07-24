"use client";
import React from 'react';

export default function DashboardPage() {
  return (
    <div style={{ background: '#111827', minHeight: 'calc(100vh - 90px)', color: '#fff', fontFamily: 'Arial, sans-serif', padding: '30px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Top Grid: Level, Global Market, Sync */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '20px', marginBottom: '20px', alignItems: 'stretch' }}>
          
          {/* FSN Level Card */}
          <div style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>FSN LEVEL</span>
                <button style={{ background: '#d97706', color: '#fff', border: 'none', padding: '4px 10px', fontSize: '10px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>REWARDS</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ background: '#dc2626', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>2</span>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>XP 3750/4500</span>
              </div>
            </div>
            <div style={{ background: '#374151', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ background: '#16a34a', width: '83%', height: '100%' }}></div>
            </div>
          </div>

          {/* Global Market Banner */}
          <div style={{ background: 'linear-gradient(135deg, #b45309 0%, #78350f 100%)', border: '1px solid #d97706', borderRadius: '8px', padding: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', cursor: 'pointer' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#fff', margin: '0 0 8px 0' }}>Global Market</h2>
            <p style={{ fontSize: '13px', color: '#fef3c7', margin: '0' }}>PRE-1 Released! Click to visit!</p>
          </div>

          {/* Sync Button Card */}
          <div style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>Sync Button</div>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '10px' }}>Server?</div>
              <select style={{ width: '100%', padding: '8px', background: '#374151', color: '#fff', border: '1px solid #4b5563', borderRadius: '4px', fontSize: '12px', marginBottom: '12px' }}>
                <option>#1 - Midwest Horizon</option>
              </select>
            </div>
            <button style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '10px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', width: '100%' }}>
              SYNC INCOMING
            </button>
          </div>

        </div>

        {/* Bottom Grid: Alpha/Alerts, Operational Funding, Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '20px', alignItems: 'start' }}>
          
          {/* Left Column: Alpha & Alerts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#9ca3af', marginBottom: '10px' }}>FSN v2.0.26 ALPHA</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                <a href="#" style={{ color: '#60a5fa', textDecoration: 'none' }}>🔗 Dropbox Integration</a>
                <a href="#" style={{ color: '#fbbf24', textDecoration: 'none' }}>⭐ Donator Club</a>
                <a href="#" style={{ color: '#4ade80', textDecoration: 'none' }}>📅 Server Calendar</a>
              </div>
            </div>

            <div style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#ef4444', marginBottom: '8px' }}>ALERTS</div>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0', lineHeight: '1.4' }}>
                System active. Sector 4-G harvest operations protected under network protocol.
              </p>
            </div>
          </div>

          {/* Center Column: Operational Funding */}
          <div style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>Operational Funding Progress</div>
            <div style={{ background: '#374151', height: '10px', borderRadius: '5px', overflow: 'hidden', marginBottom: '15px' }}>
              <div style={{ background: '#2563eb', width: '15%', height: '100%' }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#9ca3af' }}>
              <div>🔒 FSN Certified Tier</div>
              <div>🔒 Supervisor Program Access</div>
              <div>🔒 Feature Request Priority Queue</div>
            </div>
          </div>

          {/* Right Column: Widgets & Live Auction */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '15px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '10px', color: '#9ca3af' }}>FSN Swear Jar</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#4ade80', margin: '4px 0' }}>$4,520.00</div>
                <button style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '2px 6px', fontSize: '10px', fontWeight: 'bold', borderRadius: '3px', cursor: 'pointer' }}>Pay $1000</button>
              </div>
              <div>
                <div style={{ fontSize: '14px' }}>🎟️</div>
                <div style={{ fontSize: '11px', color: '#fbbf24', marginTop: '4px' }}>DC Raffle</div>
              </div>
              <div>
                <div style={{ fontSize: '14px' }}>❓</div>
                <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>Support Ticket</div>
              </div>
            </div>

            <div style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '15px', textAlign: 'center', cursor: 'pointer' }}>
              <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '13px' }}>((📶)) FSN LIVE Auction</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
