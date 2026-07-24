"use client";
import React, { useState } from 'react';
import { Shield, Radio, DollarSign, User, Send, FileText, ExternalLink, Calendar, HelpCircle, Award } from 'lucide-react';

export default function FSNPortal() {
  const [activeTab, setActiveTab] = useState('Myself');

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
          {/* Logo Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '18px', fontStyle: 'italic', letterSpacing: '-0.5px' }}>
            <span style={{ color: '#fff' }}>FSN</span>
            <span style={{ color: '#22c55e', background: '#111', padding: '0 4px', border: '1px solid #22c55e', borderRadius: '3px', fontSize: '12px' }}>FARM</span>
            <span style={{ fontSize: '11px', color: '#888', fontStyle: 'normal', fontWeight: 'normal' }}>FARM SIM NETWORK</span>
          </div>

          {/* User Quick Info */}
          <div style={{ color: '#aaa' }}>
            <strong style={{ color: '#fff' }}>Samuel_Founder</strong> (#001) &bull; <span style={{ color: '#f59e0b' }}>FSN Command Farm</span> <span style={{ color: '#22c55e' }}>$9,459,000 (IG)</span>
          </div>
        </div>

        {/* Top Right Icons & Date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#888', fontSize: '12px' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <span title="Gold Coins">🪙 3</span>
            <span title="Packages">📦 0</span>
            <span title="Crates">🧰 0</span>
            <span title="Badges">🎖️ 0</span>
            <span title="Reputation">💪 0</span>
          </div>
          <span>2026-07-24 13:23:27</span>
        </div>
      </div>

      {/* Sub-Navigation Menu Bar */}
      <div style={{ background: '#181818', borderBottom: '2px solid #333', padding: '8px 20px', display: 'flex', gap: '25px', fontSize: '14px', fontWeight: 'bold' }}>
        {['Myself', 'Interactions', 'Finances', 'Data', 'Market', 'Wiki', 'Settings'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: activeTab === tab ? '#22c55e' : '#bbb', 
              cursor: 'pointer', 
              padding: '4px 0',
              borderBottom: activeTab === tab ? '2px solid #22c55e' : 'none'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Grid (3-Column Layout) */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 320px', gap: '20px', padding: '20px', maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Left Sidebar: Level & Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: 'rgba(20, 20, 20, 0.9)', border: '1px solid #333', borderRadius: '6px', padding: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>FSN LEVEL</span>
              <span style={{ background: '#f59e0b', color: '#000', fontSize: '11px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '4px' }}>REWARDS</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ background: '#ef4444', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>2</span>
              <span style={{ fontSize: '12px', color: '#aaa' }}>XP 3750/4500</span>
            </div>
            <div style={{ background: '#333', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
              <div style={{ background: '#22c55e', width: '83%', height: '100%' }}></div>
            </div>
          </div>

          <div style={{ background: 'rgba(20, 20, 20, 0.9)', border: '1px solid #333', borderRadius: '6px', padding: '15px' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#aaa', marginBottom: '10px' }}>FSN v2.0.26 ALPHA</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <a href="#dropbox" style={{ color: '#60a5fa', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}><ExternalLink size={14} /> Dropbox Integration</a>
              <a href="#donator" style={{ color: '#f59e0b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}><Award size={14} /> Donator Club</a>
              <a href="#calendar" style={{ color: '#22c55e', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> Server Calendar</a>
            </div>
          </div>

          <div style={{ background: 'rgba(20, 20, 20, 0.9)', border: '1px solid #333', borderRadius: '6px', padding: '15px' }}>
            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', margin: '0 0 10px 0', color: '#ef4444' }}>Alerts</h3>
            <p style={{ fontSize: '13px', color: '#ccc', margin: 0 }}>System active. Sector 4-G harvest operations protected under network protocol.</p>
          </div>
        </div>

        {/* Center Section: Global Market & Community Goals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Global Market Banner Carousel Box */}
          <div style={{ background: 'linear-gradient(135deg, #b45309 0%, #78350f 100%)', border: '1px solid #d97706', borderRadius: '8px', padding: '30px', textAlign: 'center', position: 'relative', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 10px 0', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Global Market</h2>
            <p style={{ fontSize: '16px', margin: '0 0 15px 0', fontWeight: 'bold' }}>PRE-1 Released! Click to visit!</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '15px' }}>
              <span style={{ width: '10px', height: '10px', background: '#fff', borderRadius: '50%' }}></span>
              <span style={{ width: '10px', height: '10px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%' }}></span>
              <span style={{ width: '10px', height: '10px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%' }}></span>
              <span style={{ width: '10px', height: '10px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%' }}></span>
            </div>
          </div>

          {/* Donations Progress Tracker */}
          <div style={{ background: 'rgba(20, 20, 20, 0.9)', border: '1px solid #333', borderRadius: '6px', padding: '20px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>Operational Funding Progress</div>
            <div style={{ background: '#333', borderRadius: '4px', height: '16px', overflow: 'hidden', position: 'relative', marginBottom: '15px' }}>
              <div style={{ background: '#2563eb', width: '15%', height: '100%', display: 'flex', alignItems: 'center', paddingLeft: '8px', fontSize: '11px', fontWeight: 'bold' }}>15%</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#aaa' }}>
                <span>🔒</span> FSN Certified Tier
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#aaa' }}>
                <span>🔒</span> Supervisor Program Access
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#aaa' }}>
                <span>🔒</span> Feature Request Priority Queue
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Sync Button, Swear Jar, Auction */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Sync Button Card */}
          <div style={{ background: 'rgba(20, 20, 20, 0.9)', border: '1px solid #333', borderRadius: '6px', padding: '15px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Sync Button <HelpCircle size={14} color="#60a5fa" />
            </h3>
            <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '5px' }}>Server?</label>
            <select style={{ width: '100%', background: '#111', color: '#fff', border: '1px solid #444', padding: '8px', borderRadius: '4px', marginBottom: '12px', fontSize: '13px' }}>
              <option>#1 - Midwest Horizon</option>
              <option>#2 - Pacific Northwest</option>
            </select>
            <button style={{ width: '100%', background: '#ef4444', color: '#fff', border: 'none', padding: '10px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }}>
              SYNC INCOMING
            </button>
          </div>

          {/* Swear Jar & Support Widgets */}
          <div style={{ background: 'rgba(20, 20, 20, 0.9)', border: '1px solid #333', borderRadius: '6px', padding: '15px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '24px' }}>🫙</div>
              <div style={{ fontSize: '11px', color: '#aaa', fontWeight: 'bold' }}>FSN Swear Jar</div>
              <div style={{ fontSize: '13px', color: '#22c55e', fontWeight: 'bold', margin: '4px 0' }}>$4,520.00</div>
              <button style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '4px 10px', fontSize: '11px', borderRadius: '3px', cursor: 'pointer' }}>Pay $1000</button>
            </div>
            <div>
              <div style={{ fontSize: '24px' }}>🎟️</div>
              <div style={{ fontSize: '11px', color: '#aaa', fontWeight: 'bold', marginTop: '6px' }}>DC Raffle</div>
            </div>
            <div>
              <div style={{ fontSize: '24px' }}>❓</div>
              <div style={{ fontSize: '11px', color: '#aaa', fontWeight: 'bold', marginTop: '6px' }}>Support Ticket</div>
            </div>
          </div>

          {/* FSN Live Auction Widget */}
          <div style={{ background: 'rgba(20, 20, 20, 0.9)', border: '1px solid #333', borderRadius: '6px', padding: '20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}>
            <Radio size={20} color="#ef4444" />
            <span style={{ fontWeight: 'bold', fontSize: '15px', letterSpacing: '0.5px' }}>FSN LIVE <span style={{ color: '#ef4444' }}>Auction</span></span>
          </div>
        </div>

      </div>
    </div>
  );
}
