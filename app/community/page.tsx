"use client";
import React from 'react';
import { Book, Download, Server, ArrowLeft, Shield } from 'lucide-react';

export default function CommunityHub() {
  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '40px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        <button onClick={() => window.location.href = '/dashboard'} style={{ background: 'none', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '20px' }}><ArrowLeft size={18} /> Dashboard</button>

        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>CTFG <span style={{ color: '#22c55e' }}>Community Hub</span></h1>
        <p style={{ color: '#94a3b8', marginBottom: '40px' }}>Everything you need to play on the Montana Map.</p>

        {/* SERVER INFO */}
        <div style={{ backgroundColor: '#131926', padding: '25px', borderRadius: '24px', border: '1px solid #1e293b', marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '10px', color: '#22c55e' }}><Server size={20}/> Server Details</h3>
          <p style={{ margin: '5px 0' }}><b>Server Name:</b> CTFG Montana 4x Realism</p>
          <p style={{ margin: '5px 0' }}><b>Server IP:</b> 147.93.162.149:8170</p>
          <p style={{ margin: '5px 0' }}><b>Password:</b> Ask Samuel in Discord</p>
        </div>

        {/* MODS */}
        <div style={{ backgroundColor: '#131926', padding: '25px', borderRadius: '24px', border: '1px solid #1e293b', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: '0 0 5px 0' }}><Download size={20} style={{verticalAlign:'middle', marginRight:'10px'}}/> Required Mod Pack</h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>Version 1.2 • Updated March 2026</p>
          </div>
          <button onClick={() => window.open('https://google.com', '_blank')} style={{ backgroundColor: '#22c55e', border: 'none', color: 'white', padding: '12px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Download Mods</button>
        </div>

        {/* RULES */}
        <div style={{ backgroundColor: '#131926', padding: '25px', borderRadius: '24px', border: '1px solid #1e293b' }}>
          <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '10px' }}><Shield size={20} color="#f97316"/> Server Rules</h3>
          <ul style={{ paddingLeft: '20px', color: '#94a3b8', lineHeight: '1.8' }}>
            <li>Drive realistically (Roads & field edges only).</li>
            <li>No cutting through other players' fields.</li>
            <li>Listen to the Farm Manager during large harvests.</li>
            <li>Respect the equipment (No intentional flipping/crashing).</li>
            <li>Help other farmers when your tasks are finished!</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
