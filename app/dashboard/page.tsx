"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase";
import { 
  Shield, Radio, LogOut, Terminal, ShoppingCart,
  Navigation, LayoutDashboard, MapPin, Truck, 
  Droplets, Star, ClipboardList, Activity
} from 'lucide-react';

const TRUCK_MODELS = [
  { id: 'scout', name: 'Lite-Scout', price: 50000, fuel: 100, desc: 'High efficiency, low maintenance.' },
  { id: 'hauler', name: 'Iron-Hauler', price: 150000, fuel: 80, desc: 'The industry standard.' },
  { id: 'titan', name: 'Goliath-Titan', price: 500000, fuel: 60, desc: 'High-Tier heavy transport.' }
];

export default function MasterDashboard() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [missions, setMissions] = useState<any[]>([]);
  const [trucks, setTrucks] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [view, setView] = useState('MAP'); 
  const [command, setCommand] = useState("");
  const [status, setStatus] = useState("SYSTEM_CONNECTED");
  const [selectedMission, setSelectedMission] = useState<any>(null);

  useEffect(() => {
    sb.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchAllData(session.user.id);
    });
    const interval = setInterval(() => checkPayday(), 5000);
    return () => clearInterval(interval);
  }, [missions, trucks]);

  const fetchAllData = async (uid: string) => {
    const { data: prof } = await sb.from('profiles').select('*').eq('id', uid).single();
    if (prof) setProfile(prof);
    
    const { data: intel } = await sb.from('tactical_news').select('*').order('created_at', { ascending: false }).limit(5);
    if (intel) setNews(intel);
    
    const { data: jobs } = await sb.from('active_missions').select('*').neq('status', 'COMPLETED');
    if (jobs) setMissions(jobs);
    
    const { data: fleet } = await sb.from('garage').select('*').order('truck_name', { ascending: true });
    if (fleet) setTrucks(fleet);

    const { data: logs } = await sb.from('mission_history').select('*').order('completed_at', { ascending: false }).limit(10);
    if (logs) setHistory(logs);
  };

  const checkPayday = async () => {
    const activeJobs = missions.filter(m => m.status === 'ACTIVE');
    for (const job of activeJobs) {
      const elapsed = Date.now() - new Date(job.started_at).getTime();
      if (elapsed >= 300000) { // 5 Minute Wait
        const truck = trucks.find(t => t.status === 'ON_JOB');
        if (truck) {
          await sb.rpc('complete_mission', { m_id: job.id, t_id: truck.id });
          setStatus("MISSION_SUCCESS_FUNDS_TRANSFERED");
          fetchAllData(session.user.id);
        }
      }
    }
  };

  const handlePurchase = async (model: any) => {
    if (profile.balance < model.price) return setStatus("INSUFFICIENT_CREDITS");
    const { error } = await sb.rpc('buy_truck', { 
        truck_name: `${model.name}_#${Math.floor(100 + Math.random() * 900)}`, 
        truck_model: model.id, price: model.price, start_fuel: model.fuel
    });
    if (!error) { setStatus("ASSET_ACQUIRED"); fetchAllData(session.user.id); }
  };

  const deployTruck = async (truckId: string) => {
    const { error } = await sb.rpc('accept_mission', { m_id: selectedMission.id, t_id: truckId });
    if (!error) { setStatus("UNIT_DEPLOYED"); setSelectedMission(null); fetchAllData(session.user.id); }
  };

  const executeCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.startsWith("/")) return;
    const [action, ...args] = command.split(" ");
    if (action === "/contract") {
      await sb.from('active_missions').insert([{ 
        title: args.join(" "), payout: 25000, status: 'AVAILABLE'
      }]);
    }
    setCommand(""); fetchAllData(session.user.id);
  };

  if (!session) return <div style={{background:'#000', height:'100vh'}} />;

  const xpProgress = ((profile?.xp || 0) % 1000) / 10; // Simple 0-100% logic

  return (
    <div style={{ height: '100vh', background: '#050505', color: 'white', fontFamily: 'monospace', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url("https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80")', backgroundSize:'cover', zIndex: 1 }} />
      
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', height: '100%' }}>
        {/* SIDEBAR */}
        <div style={{ width: '260px', borderRight: '1px solid #111', padding: '40px 20px', background: 'rgba(0,0,0,1)' }}>
          <div style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '4px', marginBottom: '40px' }}><Shield size={18} /> CTFG_OS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#444', fontSize: '11px' }}>
            <div onClick={() => setView('MAP')} style={{ color: view === 'MAP' ? '#fff' : '#444', cursor:'pointer' }}>TACTICAL_MAP</div>
            <div onClick={() => setView('FIELD')} style={{ color: view === 'FIELD' ? '#fff' : '#444', cursor:'pointer' }}>CONTRACTS</div>
            <div onClick={() => setView('GARAGE')} style={{ color: view === 'GARAGE' ? '#fff' : '#444', cursor:'pointer' }}>GARAGE</div>
            <div onClick={() => setView('MARKET')} style={{ color: view === 'MARKET' ? '#d4af37' : '#444', cursor:'pointer' }}>FLEET_MARKET</div>
            <div onClick={() => setView('LOGS')} style={{ color: view === 'LOGS' ? '#fff' : '#444', cursor:'pointer' }}>MISSION_LOGS</div>
            <div onClick={() => sb.auth.signOut()} style={{ marginTop:'auto', cursor:'pointer' }}><LogOut size={14} /> LOGOUT</div>
          </div>
        </div>

        {/* MAIN CONSOLE */}
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '30px', padding: '20px', background: '#080808', borderLeft: '4px solid #d4af37', display:'flex', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#d4af37' }}>{profile?.rank?.toUpperCase() || 'OPERATOR'} STATUS</div>
              <div style={{ fontSize: '32px', color: '#22c55e', fontWeight: 'bold' }}>${profile?.balance?.toLocaleString()}</div>
              <div style={{ width: '200px', height: '2px', background: '#111', marginTop: '10px' }}>
                <div style={{ height: '100%', background: '#d4af37', width: `${xpProgress}%` }} />
              </div>
            </div>
            <div style={{ textAlign: 'right', color: '#ff4444', fontSize: '10px' }}>{status}</div>
          </div>

          <div style={{ flex: 1, background: 'rgba(5,5,5,0.95)', border: '1px solid #111', overflowY: 'auto' }}>
            {view === 'MAP' && (
              <div style={{ height: '100%', width: '100%', position: 'relative' }}>
                {trucks.filter(t => t.status === 'ON_JOB').map((t, i) => (
                   <div key={t.id} style={{ position: 'absolute', top: `${40 + (i*5)}%`, left: `${45 + (i*10)}%` }}>
                    <MapPin color="#d4af37" size={24} className="pulse" />
                    <div style={{ fontSize: '8px', color: '#fff', background: '#000', padding: '2px' }}>{t.truck_name}</div>
                   </div>
                ))}
              </div>
            )}

            {view === 'FIELD' && (
              <div style={{ padding: '30px' }}>
                {!selectedMission ? (
                  missions.filter(m => m.status === 'AVAILABLE').map((m) => (
                    <div key={m.id} style={{ padding: '20px', border: '1px solid #111', background: '#090909', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: '13px' }}>{m.title} <span style={{color:'#22c55e', marginLeft:'10px'}}>${m.payout.toLocaleString()}</span></div>
                      <button onClick={() => setSelectedMission(m)} style={{ background: '#d4af37', border: 'none', padding: '5px 15px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>ASSIGN</button>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '20px', textAlign:'center' }}>
                    <div style={{ fontSize: '12px', color: '#d4af37', marginBottom: '20px' }}>SELECT TRUCK FOR: {selectedMission.title}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                      {trucks.filter(t => t.status === 'AVAILABLE').map(t => (
                        <div key={t.id} onClick={() => deployTruck(t.id)} style={{ padding: '15px', border: '1px solid #222', cursor: 'pointer' }}>
                          <Truck size={20} color="#d4af37" />
                          <div style={{ fontSize: '10px', marginTop: '10px' }}>{t.truck_name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {view === 'GARAGE' && (
              <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {trucks.map((t) => (
                  <div key={t.id} style={{ padding: '20px', border: '1px solid #1a1a1a', background: '#070707' }}>
                    <Truck size={18} color={t.status === 'AVAILABLE' ? '#22c55e' : '#d4af37'} />
                    <div style={{ fontSize: '13px', margin: '15px 0' }}>{t.truck_name}</div>
                    <div style={{ fontSize: '9px', color: '#444' }}>STATUS: {t.status} | FUEL: {t.fuel_level}%</div>
                  </div>
                ))}
              </div>
            )}

            {view === 'MARKET' && (
              <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                {TRUCK_MODELS.map((m) => (
                  <div key={m.id} style={{ padding: '25px', border: '1px solid #1a1a1a', background: '#080808' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{m.name}</div>
                    <div style={{ fontSize: '18px', color: '#22c55e', margin: '10px 0' }}>${m.price.toLocaleString()}</div>
                    <button onClick={() => handlePurchase(m)} style={{ width: '100%', padding: '10px', background: '#d4af37', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '10px' }}>BUY ASSET</button>
                  </div>
                ))}
              </div>
            )}

            {view === 'LOGS' && (
              <div style={{ padding: '30px' }}>
                {history.map((log) => (
                  <div key={log.id} style={{ padding:'12px', borderBottom:'1px solid #111', display:'flex', justifyContent:'space-between', fontSize:'11px', color:'#666' }}>
                    <span>{log.title} [UNIT: {log.truck_name}]</span>
                    <span style={{color:'#22c55e'}}>+${log.payout.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={executeCommand} style={{ position: 'fixed', bottom: '20px', left: '300px', right: '350px', display: 'flex', background: '#000', padding: '12px', border: '1px solid #d4af3733', zIndex: 100 }}>
        <Terminal size={14} color="#d4af37" style={{ marginRight: '15px' }} />
        <input value={command} onChange={(e) => setCommand(e.target.value)} placeholder="ENTER_CMD..." style={{ flex: 1, background: 'none', border: 'none', color: '#fff', fontSize: '11px', outline: 'none' }} />
      </form>

      <style jsx>{`
        .pulse { animation: pulse-red 2s infinite; }
        @keyframes pulse-red { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
}
