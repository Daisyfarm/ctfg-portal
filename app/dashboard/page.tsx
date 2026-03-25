"use client";
export const dynamic = "force-dynamic";

import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase";
import { 
  Shield, LogOut, Terminal, Truck, Navigation, 
  Activity, List, LayoutDashboard, MapPin
} from 'lucide-react';

export default function MasterDashboard() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [trucks, setTrucks] = useState<any[]>([]);
  const [missions, setMissions] = useState<any[]>([]);
  const [view, setView] = useState('MAP');
  const [status, setStatus] = useState("SYSTEM_BOOT");

  useEffect(() => {
    sb.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        loadUserAssets(session.user.id);
      }
    });
  }, []);

  const loadUserAssets = async (uid: string) => {
    setStatus("SYNCING_DATA...");
    try {
      // Parallel fetch for speed
      const [pRes, tRes, mRes] = await Promise.all([
        sb.from('profiles').select('*').eq('id', uid).single(),
        sb.from('garage').select('*').eq('owner_id', uid),
        sb.from('active_missions').select('*').eq('status', 'AVAILABLE').limit(5)
      ]);

      if (pRes.data) setProfile(pRes.data);
      if (tRes.data) setTrucks(tRes.data);
      if (mRes.data) setMissions(mRes.data);
      
      setStatus("LINK_STABLE");
    } catch (err) {
      setStatus("UPLINK_CRITICAL_FAILURE");
    }
  };

  if (!session) return (
    <div style={{background:'#000', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', color:'#d4af37', fontFamily:'monospace'}}>
      <Activity className="pulse" /> <span style={{marginLeft:'15px'}}>HANDSHAKE_IN_PROGRESS...</span>
    </div>
  );

  return (
    <div style={{ height: '100vh', background: '#050505', color: 'white', fontFamily: 'monospace', display: 'flex' }}>
      
      {/* SIDEBAR */}
      <div style={{ width: '250px', borderRight: '1px solid #111', padding: '30px', background: '#000' }}>
        <div style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '3px', marginBottom: '40px', display:'flex', alignItems:'center', gap:'10px' }}>
          <Shield size={16} /> DAISY_HILL_TAC
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'20px', fontSize:'11px', color:'#444' }}>
          <div onClick={() => setView('MAP')} style={{ color: view === 'MAP' ? '#fff' : '#444', cursor:'pointer' }}>TACTICAL_MAP</div>
          <div onClick={() => setView('FLEET')} style={{ color: view === 'FLEET' ? '#fff' : '#444', cursor:'pointer' }}>FLEET_STATUS</div>
          <div onClick={() => setView('JOBS')} style={{ color: view === 'JOBS' ? '#fff' : '#444', cursor:'pointer' }}>CONTRACTS</div>
          <div onClick={() => sb.auth.signOut()} style={{ marginTop:'40px', color:'#ff4444', cursor:'pointer' }}>TERMINATE_UPLINK</div>
        </div>
      </div>

      {/* MAIN VIEW */}
      <div style={{ flex: 1, padding: '40px', display:'flex', flexDirection:'column' }}>
        <div style={{ background: '#0a0a0a', padding: '20px', borderLeft: '3px solid #d4af37', marginBottom: '30px', display:'flex', justifyContent:'space-between' }}>
          <div>
            <div style={{fontSize:'10px', color:'#444'}}>OPERATOR_ID: {profile?.farm_name || 'SAMUEL'}</div>
            <div style={{fontSize:'28px', color:'#22c55e', fontWeight:'bold'}}>${profile?.balance?.toLocaleString()}</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:'9px', color: status.includes('CRITICAL') ? '#ff4444' : '#d4af37'}}>{status}</div>
            <div style={{fontSize:'12px', marginTop:'5px', color:'#333'}}>{profile?.rank?.toUpperCase()}</div>
          </div>
        </div>

        <div style={{ flex:1, border:'1px solid #111', background:'#070707', borderRadius:'2px', overflowY:'auto' }}>
          {view === 'MAP' && (
            <div style={{ height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:'#111' }}>
              <Navigation size={60} />
            </div>
          )}

          {view === 'JOBS' && (
            <div style={{ padding:'30px' }}>
              {missions.map(m => (
                <div key={m.id} style={{ padding:'15px', border:'1px solid #111', background:'#000', marginBottom:'10px', display:'flex', justifyContent:'space-between' }}>
                  <span>{m.title}</span>
                  <span style={{color:'#22c55e'}}>${m.payout.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}

          {view === 'FLEET' && (
            <div style={{ padding:'30px', display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'20px' }}>
              {trucks.map(t => (
                <div key={t.id} style={{ padding:'20px', border:'1px solid #111', background:'#000' }}>
                  <Truck size={16} color="#d4af37" />
                  <div style={{marginTop:'10px'}}>{t.truck_name}</div>
                  <div style={{fontSize:'9px', color:'#444'}}>{t.status}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
}
