"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase";
import { 
  Shield, Radio, Clock, LogOut, Terminal, 
  Send, Navigation, Zap, LayoutDashboard, MapPin, Truck, Wrench, Timer, Droplets
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
    const interval = setInterval(() => {
      setNow(new Date());
      checkPayday();
    }, 1000);
    return () => clearInterval(interval);
  }, [missions, trucks]);

  const fetchAllData = async (uid: string) => {
    const { data: prof } = await sb.from('profiles').select('*').eq('id', uid).single();
    if (prof) setProfile(prof);
    const { data: intel } = await sb.from('tactical_news').select('*').order('created_at', { ascending: false }).limit(5);
    if (intel) setNews(intel);
    const { data: jobs } = await sb.from('active_missions').select('*').neq('status', 'COMPLETED').order('expires_at', { ascending: true });
    if (jobs) setMissions(jobs);
    const { data: fleet } = await sb.from('garage').select('*').order('truck_name', { ascending: true });
    if (fleet) setTrucks(fleet);
  };

  const checkPayday = async () => {
    const activeJobs = missions.filter(m => m.status === 'ACTIVE');
    for (const job of activeJobs) {
      if (Date.now() - new Date(job.started_at).getTime() >= 300000) { // 5 min
        const truck = trucks.find(t => t.status === 'ON_JOB');
        if (truck) {
          await sb.rpc('complete_mission', { m_id: job.id, t_id: truck.id });
          setStatus(`MISSION_COMPLETE: +$${job.payout.toLocaleString()}`);
          fetchAllData(session.user.id);
        }
      }
    }
  };

  const handleRefuel = async (truckId: string, currentFuel: number) => {
    const cost = (100 - currentFuel) * 150; // $150 per 1% fuel
    if (profile.balance < cost) return setStatus("LOW_FUNDS_FOR_FUEL");
    setStatus("REFUELING_UNIT...");
    const { error } = await sb.rpc('refuel_truck', { truck_id: truckId, fuel_cost: cost });
    if (!error) { setStatus("TANK_FULL"); fetchAllData(session.user.id); }
  };

  const deployTruck = async (truckId: string) => {
    const truck = trucks.find(t => t.id === truckId);
    if (truck.fuel_level < 30) return setStatus("INSUFFICIENT_FUEL_TO_START");
    
    const { error } = await sb.rpc('accept_mission', { m_id: selectedMission.id, t_id: truckId });
    if (!error) {
      setStatus("UNIT_DEPLOYED");
      setSelectedMission(null);
      fetchAllData(session.user.id);
    }
  };

  const executeCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.startsWith("/")) return;
    const [action, ...args] = command.split(" ");
    try {
      if (action === "/dispatch") await sb.from('tactical_news').insert([{ headline: args.join(" ") }]);
      if (action === "/balance") await sb.from('profiles').update({ balance: parseInt(args[0]) }).eq('id', session.user.id);
      setCommand("");
      fetchAllData(session.user.id);
    } catch (err) { setStatus("CMD_ERR"); }
  };

  if (!session) return <div style={{background:'#000', height:'100vh'}} />;

  return (
    <div style={{ height: '100vh', background: '#050505', color: 'white', fontFamily: 'monospace', backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', height: '100%' }}>
        
        {/* SIDEBAR */}
        <div style={{ width: '260px', borderRight: '1px solid #111', padding: '40px 20px', background: 'rgba(0,0,0,0.9)' }}>
          <div style={{ color: '#d4af37', fontSize: '12px', letterSpacing: '4px', marginBottom: '50px', display: 'flex', alignItems: 'center', gap: '10px' }}><Shield size={20} /> CTFG_OS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', color: '#666', fontSize: '11px' }}>
            <div onClick={() => setView('MAP')} style={{ color: view === 'MAP' ? '#fff' : '#666', cursor:'pointer', display:'flex', alignItems:'center', gap:'10px' }}><LayoutDashboard size={14} /> TACTICAL_MAP</div>
            <div onClick={() => setView('FIELD')} style={{ color: view === 'FIELD' ? '#fff' : '#666', cursor:'pointer', display:'flex', alignItems:'center', gap:'10px' }}><Navigation size={14} /> MISSIONS</div>
            <div onClick={() => setView('GARAGE')} style={{ color: view === 'GARAGE' ? '#fff' : '#666', cursor:'pointer', display:'flex', alignItems:'center', gap:'10px' }}><Truck size={14} /> GARAGE</div>
            <div onClick={() => sb.auth.signOut()} style={{ marginTop: 'auto', cursor: 'pointer', display:'flex', alignItems:'center', gap:'10px' }}><LogOut size={14} /> TERMINATE</div>
          </div>
        </div>

        {/* MAIN PANEL */}
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '30px', padding: '20px', background: '#080808', borderLeft: '4px solid #d4af37', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#444' }}>CHIEF: {profile?.username}</div>
              <div style={{ fontSize: '32px', color: '#22c55e', fontWeight: 'bold' }}>${profile?.balance?.toLocaleString()}</div>
            </div>
            <div style={{ color: '#d4af37', fontSize: '10px' }}>{status}</div>
          </div>

          <div style={{ flex: 1, background: 'rgba(0,0,0,0.85)', border: '1px solid #111', overflowY: 'auto' }}>
            {view === 'MAP' && (
              <div style={{ height: '100%', width: '100%', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#111 1px, transparent 1px)', backgroundSize: '25px 25px' }} />
                {trucks.filter(t => t.status === 'ON_JOB').map((t, i) => (
                   <div key={t.id} style={{ position: 'absolute', top: `${45 + (i*4)}%`, left: `${50 + (i*8)}%` }}>
                    <MapPin color="#d4af37" size={22} className="pulse" />
                    <div style={{ fontSize: '8px', color: '#fff', background: '#000', padding: '2px' }}>{t.truck_name}</div>
                   </div>
                ))}
              </div>
            )}

            {view === 'FIELD' && (
              <div style={{ padding: '30px' }}>
                {!selectedMission ? (
                  missions.filter(m => m.status === 'AVAILABLE').map((m) => (
                    <div key={m.id} style={{ padding: '20px', border: '1px solid #1a1a1a', background: '#0d0d0d', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: '12px' }}>{m.title} <span style={{color:'#444'}}>➔</span> ${m.payout.toLocaleString()}</div>
                      <button onClick={() => setSelectedMission(m)} style={{ background: '#d4af37', color: '#000', border: 'none', padding: '5px 15px', fontSize: '10px', cursor: 'pointer' }}>ASSIGN</button>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: '#d4af37', marginBottom: '20px' }}>SELECT UNIT FOR: {selectedMission.title}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '15px' }}>
                      {trucks.filter(t => t.status === 'AVAILABLE').map(t => (
                        <div key={t.id} onClick={() => deployTruck(t.id)} style={{ padding: '15px', border: '1px solid #d4af37', cursor: 'pointer', opacity: t.fuel_level < 30 ? 0.3 : 1 }}>
                          <Truck size={16} color="#d4af37" />
                          <div style={{ fontSize: '10px', marginTop: '10px' }}>{t.truck_name}</div>
                          <div style={{ fontSize: '8px', color: t.fuel_level < 30 ? '#ff4444' : '#666' }}>FUEL: {t.fuel_level}%</div>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setSelectedMission(null)} style={{ marginTop: '30px', background:'none', border:'none', color:'#444', cursor:'pointer' }}>CANCEL</button>
                  </div>
                )}
              </div>
            )}

            {view === 'GARAGE' && (
              <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                {trucks.map((t) => (
                  <div key={t.id} style={{ padding: '20px', border: '1px solid #222', background: '#080808' }}>
                    <div style={{ display:'flex', justifyContent:'space-between' }}>
                      <Truck size={18} color={t.status === 'AVAILABLE' ? '#22c55e' : '#d4af37'} />
                      <div style={{ fontSize: '9px', color: '#444' }}>{t.status}</div>
                    </div>
                    <div style={{ fontSize: '13px', margin: '15px 0 5px 0' }}>{t.truck_name}</div>
                    
                    {/* Fuel Bar */}
                    <div style={{ fontSize: '8px', color: '#666', marginBottom: '4px', display:'flex', alignItems:'center', gap:'5px' }}><Droplets size={10} /> FUEL: {t.fuel_level}%</div>
                    <div style={{ height: '3px', background: '#111', width: '100%', marginBottom: '15px' }}>
                      <div style={{ height: '100%', background: t.fuel_level < 30 ? '#ff4444' : '#3b82f6', width: `${t.fuel_level}%` }} />
                    </div>

                    {t.fuel_level < 100 && t.status === 'AVAILABLE' && (
                      <button onClick={() => handleRefuel(t.id, t.fuel_level)} style={{ width: '100%', padding: '8px', background: 'none', border: '1px solid #3b82f6', color: '#3b82f6', fontSize: '10px', cursor: 'pointer' }}>
                        REFUEL UNIT (${((100 - t.fuel_level) * 150).toLocaleString()})
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* COMMS SIDEBAR */}
        <div style={{ width: '350px', borderLeft: '1px solid #111', padding: '30px', background: '#000' }}>
          <div style={{ fontSize: '10px', color: '#d4af37', marginBottom: '30px' }}><Radio size={12} className="pulse" /> COMMS_LINK</div>
          {news.map((item, i) => (
            <div key={i} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #111', fontSize: '11px', color: '#777' }}>{item.headline}</div>
          ))}
        </div>
      </div>

      <form onSubmit={executeCommand} style={{ position: 'fixed', bottom: '20px', left: '300px', right: '400px', display: 'flex', background: '#000', padding: '12px', border: '1px solid #d4af3733' }}>
        <Terminal size={14} color="#d4af37" style={{ marginRight: '15px' }} />
        <input value={command} onChange={(e) => setCommand(e.target.value)} placeholder="ENTER_COMMAND..." style={{ flex: 1, background: 'none', border: 'none', color: '#fff', fontSize: '11px', outline: 'none' }} />
      </form>

      <style jsx>{`
        .pulse { animation: pulse-red 2s infinite; }
        @keyframes pulse-red { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
}
