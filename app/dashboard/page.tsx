"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase";
import { 
  Shield, Radio, Clock, LogOut, Terminal, 
  Send, Navigation, Zap, LayoutDashboard, MapPin, Truck, Wrench, Timer, CheckCircle
} from 'lucide-react';

export default function MasterDashboard() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [missions, setMissions] = useState<any[]>([]);
  const [trucks, setTrucks] = useState<any[]>([]);
  const [view, setView] = useState('MAP'); 
  const [command, setCommand] = useState("");
  const [status, setStatus] = useState("SYSTEM_READY");
  const [now, setNow] = useState(new Date());
  const [selectedMission, setSelectedMission] = useState<any>(null);

  useEffect(() => {
    sb.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchAllData(session.user.id);
    });
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchAllData = async (uid: string) => {
    const { data: prof } = await sb.from('profiles').select('*').eq('id', uid).single();
    if (prof) setProfile(prof);
    const { data: intel } = await sb.from('tactical_news').select('*').order('created_at', { ascending: false }).limit(5);
    if (intel) setNews(intel);
    const { data: jobs } = await sb.from('available_missions').select('*').order('expires_at', { ascending: true });
    if (jobs) setMissions(jobs);
    const { data: fleet } = await sb.from('garage').select('*').order('truck_name', { ascending: true });
    if (fleet) setTrucks(fleet);
  };

  const getTimeLeft = (expiryStr: string) => {
    const diff = new Date(expiryStr).getTime() - now.getTime();
    if (diff <= 0) return "EXPIRED";
    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    return `${mins}m ${secs}s`;
  };

  const deployTruck = async (truckId: string) => {
    if (!selectedMission) return;
    setStatus("INITIATING_DEPLOYMENT...");
    const { error } = await sb.rpc('accept_mission', { m_id: selectedMission.id, t_id: truckId });
    
    if (error) {
      setStatus(`DEPLOY_ERROR: ${error.message}`);
    } else {
      setStatus("UNIT_EN_ROUTE");
      setSelectedMission(null);
      fetchAllData(session.user.id);
    }
    setTimeout(() => setStatus("SYSTEM_READY"), 3000);
  };

  const handleRepair = async (truckId: string, currentCondition: number) => {
    const cost = (100 - currentCondition) * 500;
    if (profile.balance < cost) return setStatus("INSUFFICIENT_FUNDS");
    setStatus("REPAIRING...");
    const { error } = await sb.rpc('repair_truck', { truck_id: truckId, repair_cost: cost, new_condition: 100 });
    if (!error) { setStatus("REPAIR_COMPLETE"); fetchAllData(session.user.id); }
  };

  const executeCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.startsWith("/")) return;
    const [action, ...args] = command.split(" ");
    const val = args.join(" ");

    try {
      if (action === "/dispatch") await sb.from('tactical_news').insert([{ headline: val }]);
      if (action === "/balance") await sb.from('profiles').update({ balance: parseInt(val) }).eq('id', session.user.id);
      if (action === "/contract") {
        await sb.from('active_missions').insert([{ 
          title: val, payout: 40000, expires_at: new Date(Date.now() + 20 * 60000).toISOString() 
        }]);
      }
      setCommand("");
      setStatus("CMD_PROCESSED");
      setTimeout(() => { setStatus("SYSTEM_READY"); fetchAllData(session.user.id); }, 1500);
    } catch (err) { setStatus("CMD_ERROR"); }
  };

  if (!session) return <div style={{background:'#000', height:'100vh'}} />;

  return (
    <div style={{ 
      height: '100vh', background: '#050505', color: 'white', fontFamily: 'monospace',
      backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80")',
      backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', height: '100%' }}>
        
        {/* SIDEBAR */}
        <div style={{ width: '260px', borderRight: '1px solid #1a1a1a', padding: '40px 20px', background: 'rgba(0,0,0,0.9)' }}>
          <div style={{ color: '#d4af37', fontSize: '12px', letterSpacing: '4px', marginBottom: '50px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={20} /> CTFG_ADMIN
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', color: '#666', fontSize: '11px' }}>
            <div onClick={() => {setView('MAP'); setSelectedMission(null);}} style={{ color: view === 'MAP' ? '#fff' : '#666', cursor:'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}><LayoutDashboard size={14} /> STRATEGIC_MAP</div>
            <div onClick={() => {setView('FIELD'); setSelectedMission(null);}} style={{ color: view === 'FIELD' ? '#fff' : '#666', cursor:'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}><Navigation size={14} /> FIELD_WORK</div>
            <div onClick={() => {setView('GARAGE'); setSelectedMission(null);}} style={{ color: view === 'GARAGE' ? '#fff' : '#666', cursor:'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}><Truck size={14} /> GARAGE_FLEET</div>
            <div onClick={() => sb.auth.signOut()} style={{ marginTop: 'auto', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}><LogOut size={14} /> DISCONNECT</div>
          </div>
        </div>

        {/* MAIN PANEL */}
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '30px', padding: '20px', background: 'rgba(10,10,10,0.95)', borderLeft: '4px solid #d4af37', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#d4af37' }}>OPERATOR: {profile?.username || 'Samuel_Founder'}</div>
              <div style={{ fontSize: '32px', color: '#22c55e', fontWeight: 'bold' }}>${profile?.balance?.toLocaleString()}</div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '10px', color: '#444' }}>
              <div>FLEET_STATUS: ACTIVE</div>
              <div style={{ color: '#d4af37' }}>{now.toLocaleTimeString()}</div>
            </div>
          </div>

          <div style={{ flex: 1, background: 'rgba(0,0,0,0.8)', border: '1px solid #1a1a1a', borderRadius: '4px', overflowY: 'auto' }}>
            {view === 'MAP' && (
              <div style={{ height: '100%', width: '100%', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#222 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.2 }} />
                {trucks.filter(t => t.status === 'ON_JOB').map((t, i) => (
                   <div key={t.id} style={{ position: 'absolute', top: `${30 + (i*12)}%`, left: `${40 + (i*8)}%` }}>
                    <MapPin color="#d4af37" size={24} className="pulse" />
                    <div style={{ fontSize: '8px', color: '#fff', background: '#000', padding: '2px' }}>{t.truck_name} (EN_ROUTE)</div>
                   </div>
                ))}
              </div>
            )}

            {view === 'FIELD' && !selectedMission && (
              <div style={{ padding: '30px', display: 'grid', gap: '15px' }}>
                {missions.map((m) => (
                  <div key={m.id} style={{ padding: '20px', border: '1px solid #1a1a1a', background: 'rgba(15,15,15,0.6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#fff', letterSpacing: '1px' }}>{m.title}</div>
                      <div style={{ fontSize: '9px', color: '#444' }}>{m.origin} ➔ {m.destination}</div>
                      <div style={{ color: '#ff4444', fontSize: '9px', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Timer size={10} /> {getTimeLeft(m.expires_at)}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#22c55e', fontSize: '16px', marginBottom: '10px' }}>+${m.payout.toLocaleString()}</div>
                      <button 
                        onClick={() => setSelectedMission(m)}
                        style={{ background: '#d4af37', color: '#000', border: 'none', padding: '8px 15px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        DEPLOY_UNIT
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedMission && (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ color: '#d4af37', fontSize: '12px', marginBottom: '20px' }}>SELECT_TRUCK_FOR: {selectedMission.title}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                  {trucks.filter(t => t.status === 'AVAILABLE').map(t => (
                    <div key={t.id} onClick={() => deployTruck(t.id)} style={{ padding: '15px', border: '1px solid #d4af37', cursor: 'pointer', background: 'rgba(212, 175, 55, 0.05)' }}>
                      <Truck size={20} color="#d4af37" style={{ marginBottom: '10px' }} />
                      <div style={{ fontSize: '11px' }}>{t.truck_name}</div>
                      <div style={{ fontSize: '8px', color: '#666' }}>{t.condition_pct}% INTEGRITY</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setSelectedMission(null)} style={{ marginTop: '30px', color: '#444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '10px' }}>ABORT_SELECTION</button>
              </div>
            )}

            {view === 'GARAGE' && (
              <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {trucks.map((t) => (
                  <div key={t.id} style={{ padding: '20px', border: '1px solid #222', background: 'rgba(10,10,10,0.9)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                      <Truck size={18} color={t.status === 'AVAILABLE' ? '#22c55e' : '#d4af37'} />
                      <div style={{ fontSize: '9px', color: t.status === 'ON_JOB' ? '#d4af37' : '#666' }}>{t.status}</div>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{t.truck_name}</div>
                    <div style={{ height: '2px', background: '#111', width: '100%', margin: '15px 0' }}>
                      <div style={{ height: '100%', background: '#d4af37', width: `${t.condition_pct}%` }} />
                    </div>
                    {t.condition_pct < 100 && (
                      <button onClick={() => handleRepair(t.id, t.condition_pct)} style={{ width: '100%', padding: '8px', background: 'none', border: '1px solid #d4af37', color: '#d4af37', fontSize: '10px', cursor: 'pointer' }}>
                        <Wrench size={10} /> REPAIR_UNIT
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* INTEL SIDEBAR */}
        <div style={{ width: '350px', borderLeft: '1px solid #1a1a1a', padding: '30px', background: 'rgba(0,0,0,1)' }}>
          <div style={{ fontSize: '10px', color: '#d4af37', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Radio size={14} className="pulse" /> LIVE_DISPATCH
          </div>
          {news.map((item, i) => (
            <div key={i} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #111' }}>
              <div style={{ fontSize: '11px', color: '#eee' }}>{item.headline}</div>
            </div>
          ))}
        </div>
      </div>

      {/* COMMAND BAR */}
      <div style={{ position: 'fixed', bottom: '20px', left: '300px', right: '400px', zIndex: 100 }}>
        <form onSubmit={executeCommand} style={{ display: 'flex', background: '#000', padding: '12px', border: '1px solid #d4af3733' }}>
          <Terminal size={14} color="#d4af37" style={{ marginRight: '15px' }} />
          <input 
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="SYSTEM_READY: /dispatch, /balance, /contract"
            style={{ flex: 1, background: 'none', border: 'none', color: '#fff', fontSize: '11px', outline: 'none' }}
          />
          <div style={{ fontSize: '9px', color: '#d4af37' }}>{status}</div>
        </form>
      </div>

      <style jsx>{`
        .pulse { animation: pulse-red 2s infinite; }
        @keyframes pulse-red { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
}
