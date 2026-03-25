"use client";
export const dynamic = "force-dynamic";

import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase";
import { 
  Shield, LogOut, Terminal, ShoppingCart,
  Navigation, LayoutDashboard, MapPin, Truck, 
  ClipboardList, Activity, AlertTriangle
} from 'lucide-react';

export default function MasterDashboard() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [missions, setMissions] = useState<any[]>([]);
  const [trucks, setTrucks] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [view, setView] = useState('MAP'); 
  const [command, setCommand] = useState("");
  const [status, setStatus] = useState("SYSTEM_READY");

  useEffect(() => {
    sb.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        fetchAllData(session.user.id);
      }
    });
  }, []);

  const fetchAllData = async (uid: string) => {
    try {
      // Fetch Profile
      const { data: prof } = await sb.from('profiles').select('*').eq('id', uid).single();
      if (prof) setProfile(prof);
      
      // Fetch Trucks
      const { data: fleet } = await sb.from('garage').select('*').eq('owner_id', uid);
      if (fleet) setTrucks(fleet);
      
      // Fetch Available Jobs
      const { data: jobs } = await sb.from('active_missions').select('*').eq('status', 'AVAILABLE');
      if (jobs) setMissions(jobs);

      // Fetch History (Fixed the 403 target)
      const { data: logs, error: logErr } = await sb.from('mission_history').select('*').eq('owner_id', uid).limit(10);
      if (!logErr) setHistory(logs || []);
      
    } catch (err) {
      console.error("Link Failure:", err);
      setStatus("CONNECTION_ERROR");
    }
  };

  const executeCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.startsWith("/")) return;
    const [action, ...args] = command.split(" ");
    
    if (action === "/contract") {
      await sb.from('active_missions').insert([{ 
        title: args.join(" ") || "Classified Ops", payout: 50000, status: 'AVAILABLE'
      }]);
      setStatus("CONTRACT_GENERATED");
    }
    setCommand("");
    if (session) fetchAllData(session.user.id);
  };

  if (!session) return (
    <div style={{background:'#000', height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#d4af37', fontFamily:'monospace'}}>
      <Activity className="pulse" style={{marginBottom:'20px'}} />
      <div style={{letterSpacing:'5px'}}>ESTABLISHING_UPLINK...</div>
    </div>
  );

  return (
    <div style={{ height: '100vh', background: '#050505', color: 'white', fontFamily: 'monospace', display: 'flex', overflow: 'hidden' }}>
      
      {/* SIDE NAVIGATION */}
      <div style={{ width: '260px', borderRight: '1px solid #111', padding: '40px 20px', background: '#000' }}>
        <div style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '4px', marginBottom: '50px', display:'flex', alignItems:'center', gap:'10px' }}>
          <Shield size={18} /> DAISY_HILL_TAC
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', color: '#444', fontSize: '11px' }}>
          <div onClick={() => setView('MAP')} style={{ color: view === 'MAP' ? '#fff' : '#444', cursor:'pointer' }}>RADAR_MAP</div>
          <div onClick={() => setView('FIELD')} style={{ color: view === 'FIELD' ? '#fff' : '#444', cursor:'pointer' }}>ACTIVE_JOBS</div>
          <div onClick={() => setView('GARAGE')} style={{ color: view === 'GARAGE' ? '#fff' : '#444', cursor:'pointer' }}>FLEET_GARAGE</div>
          <div onClick={() => setView('MARKET')} style={{ color: view === 'MARKET' ? '#d4af37' : '#444', cursor:'pointer' }}>REQUISITION</div>
          <div onClick={() => sb.auth.signOut()} style={{ marginTop: '40px', color: '#ff4444', cursor: 'pointer' }}><LogOut size={12} /> DISCONNECT</div>
        </div>
      </div>

      {/* MAIN INTERFACE */}
      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ marginBottom: '30px', padding: '20px', background: '#0a0a0a', borderLeft: '4px solid #d4af37', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#444' }}>IDENT: {profile?.farm_name || 'UNKNOWN_OPERATOR'}</div>
            <div style={{ fontSize: '32px', color: '#22c55e', fontWeight: 'bold' }}>${profile?.balance?.toLocaleString()}</div>
            <div style={{ fontSize: '9px', color: '#d4af37', marginTop: '5px' }}>RANK: {profile?.rank || 'RECRUIT'}</div>
          </div>
          <div style={{ textAlign: 'right', color: '#333', fontSize: '10px' }}>
            STATUS: <span style={{color: status === 'CONNECTION_ERROR' ? '#ff4444' : '#22c55e'}}>{status}</span>
          </div>
        </div>

        <div style={{ flex: 1, background: '#070707', border: '1px solid #111', borderRadius: '4px', position: 'relative', overflowY: 'auto' }}>
          {view === 'MAP' && (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}>
              <div style={{ textAlign: 'center' }}>
                <Navigation size={48} />
                <div style={{ marginTop: '10px', fontSize: '10px' }}>GRID_COORDINATES_LOCKED</div>
              </div>
            </div>
          )}

          {view === 'FIELD' && (
            <div style={{ padding: '30px' }}>
              {missions.length === 0 && <div style={{color:'#222'}}>NO_ACTIVE_CONTRACTS_FOUND</div>}
              {missions.map(m => (
                <div key={m.id} style={{ padding: '20px', border: '1px solid #111', background: '#000', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>{m.title}</div>
                  <div style={{color:'#22c55e'}}>${m.payout.toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}

          {view === 'GARAGE' && (
            <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
              {trucks.map(t => (
                <div key={t.id} style={{ padding: '20px', border: '1px solid #111', background: '#000' }}>
                  <Truck size={16} color="#d4af37" />
                  <div style={{ marginTop: '10px', fontSize: '12px' }}>{t.truck_name}</div>
                  <div style={{ fontSize: '9px', color: '#444' }}>{t.status}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TERMINAL INPUT */}
        <form onSubmit={executeCommand} style={{ marginTop: '20px', display: 'flex', background: '#000', padding: '15px', border: '1px solid #111' }}>
          <Terminal size={14} color="#d4af37" style={{ marginRight: '15px' }} />
          <input 
            value={command} 
            onChange={(e) => setCommand(e.target.value)} 
            placeholder="SYSTEM_COMMAND_LOG..." 
            style={{ flex: 1, background: 'none', border: 'none', color: '#fff', fontSize: '11px', outline: 'none' }} 
          />
        </form>
      </div>

      <style jsx>{`
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
}
