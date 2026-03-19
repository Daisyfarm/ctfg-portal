"use client";
import React from 'react';
import { Shield, Tractor, Scale, MessageSquare, ArrowLeft } from 'lucide-react';

export default function Rules() {
  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'40px 20px', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:'600px', margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{ background:'none', border:'none', color:'#94a3b8', cursor:'pointer', marginBottom:'20px', display:'flex', alignItems:'center', gap:'5px' }}><ArrowLeft size={16}/> Back</button>
        <h1 style={{ textAlign:'center', color:'#22c55e' }}>CTFG Rulebook</h1>
        <div style={{ display:'flex', flexDirection:'column', gap:'15px', marginTop:'20px' }}>
          <div style={{ background:'#131926', padding:'20px', borderRadius:'15px', border:'1px solid #1e293b' }}>
            <h3 style={{ margin:0, color:'#22c55e' }}>1. Realism</h3>
            <p style={{ fontSize:'14px', color:'#94a3b8' }}>Stay on roads. No cutting across fields. Use turn signals on main roads.</p>
          </div>
          <div style={{ background:'#131926', padding:'20px', borderRadius:'15px', border:'1px solid #1e293b' }}>
            <h3 style={{ margin:0, color:'#f97316' }}>2. Economy</h3>
            <p style={{ fontSize:'14px', color:'#94a3b8' }}>All work must be claimed on the Job Board. Faking jobs results in a ban.</p>
          </div>
          <div style={{ background:'#131926', padding:'20px', borderRadius:'15px', border:'1px solid #1e293b' }}>
            <h3 style={{ margin:0, color:'#3b82f6' }}>3. Etiquette</h3>
            <p style={{ fontSize:'14px', color:'#94a3b8' }}>Respect other farmers. Return equipment refueled and repaired.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
