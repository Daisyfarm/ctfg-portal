"use client";
import React from 'react';
import { Shield, Tractor, Map, Scale, MessageSquare, ArrowLeft } from 'lucide-react';

export default function RulesPage() {
  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <button onClick={() => window.location.href = '/dashboard'} style={{ background: 'none', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}>
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Shield size={48} color="#22c55e" style={{ marginBottom: '10px' }} />
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>CTFG <span style={{ color: '#22c55e' }}>Rulebook</span></h1>
          <p style={{ color: '#94a3b8' }}>Expectations for all Montana 4x Operators</p>
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          
          {/* SECTION 1 */}
          <div style={{ backgroundColor: '#131926', padding: '25px', borderRadius: '24px', border: '1px solid #1e293b' }}>
            <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '10px', color: '#22c55e' }}>
              <Tractor size={20} /> Realism & Driving
            </h3>
            <ul style={{ color: '#94a3b8', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>Always drive on designated roads and field paths.</li>
              <li><b>Strictly No cutting across fields</b> unless you are currently harvesting that field.</li>
              <li>Respect speed limits when driving through town or near the shop.</li>
              <li>Use indicators (turn signals) when turning onto main roads.</li>
            </ul>
          </div>

          {/* SECTION 2 */}
          <div style={{ backgroundColor: '#131926', padding: '25px', borderRadius: '24px', border: '1px solid #1e293b' }}>
            <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '10px', color: '#f97316' }}>
              <Scale size={20} /> Economy & Portal
            </h3>
            <ul style={{ color: '#94a3b8', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>All payments must be processed through the CTFG Portal.</li>
              <li>Do not claim a job unless you intend to start it within 30 minutes.</li>
              <li>Marking a job "Finished" without doing the work is grounds for an immediate ban.</li>
            </ul>
          </div>

          {/* SECTION 3 */}
          <div style={{ backgroundColor: '#131926', padding: '25px', borderRadius: '24px', border: '1px solid #1e293b' }}>
            <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '10px', color: '#3b82f6' }}>
              <MessageSquare size={20} /> Etiquette
            </h3>
            <ul style={{ color: '#94a3b8', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>Be respectful in Discord and In-Game chat.</li>
              <li>If you borrow another farmer's equipment, return it with a full tank of fuel.</li>
              <li>Communicate via radio (Discord) during large scale harvests.</li>
            </ul>
          </div>

        </div>

        <p style={{ textAlign: 'center', marginTop: '40px', color: '#475569', fontSize: '13px' }}>
          Violation of these rules may lead to fines or removal from the CTFG community.
        </p>
      </div>
    </div>
  );
}
