"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase";
import { 
  Shield, Radio, Clock, LogOut, Terminal, 
  Send, Navigation, Zap, LayoutDashboard, MapPin, Truck, Wrench, Timer, DollarSign
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
      checkPayday(); // Auto-check for completed jobs
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
      const startTime = new Date(job.started_at).getTime();
      const elapsed = Date.now() - startTime;
      
      if (elapsed >= 300000) { // 5 minutes (300,000ms)
        const truck = trucks.find(t => t.status === 'ON_JOB'); // Simplified for this logic
        if (truck) {
          const { error } = await sb.rpc('complete_mission', { m_id: job.id, t_id: truck.id });
          if (!error) {
            setStatus(`PAYDAY_COLLECTED: +$${job.payout.toLocaleString()}`);
            fetchAllData(session.user.id);
          }
        }
      }
    }
  };

  const deployTruck = async (truckId: string) => {
    if (!selectedMission) return;
    const { error } = await sb.rpc('accept_mission', { m_id: selectedMission.id, t_id: truckId });
    if (!error) {
      setStatus("UNIT_DEPLOYED_5MIN_ETA");
      setSelectedMission(null);
      fetchAllData(session.user.id);
    }
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
          title: val, payout: 50000, expires_at: new Date(Date.now() + 15 * 60000).toISOString(), status: 'AVAILABLE'
        }]);
      }
      setCommand("");
      fetchAllData(session.user.id);
    } catch (err) { setStatus("CMD_ERR"); }
  };

  if (!session) return <div style={{background:'#000', height:'100vh'}} />;

  return (
    <div style={{ 
      height: '100vh', background: '#050505', color: 'white', fontFamily: 'monospace',
      backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80")',
      backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.94)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', height: '100%' }}>
        
        {/* SIDEBAR */}
        <div style={{ width: '260px', borderRight: '1px solid #111', padding: '40px 20px', background: 'rgba(0,0,0,0.9)' }}>
          <div style={{ color: '#d4af37', fontSize: '12px', letterSpacing: '4px', marginBottom: '50px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={20} /> CTFG_TERMINAL
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', color: '#666', fontSize: '11px' }}>
            <div onClick={() => setView('MAP')} style={{ color: view === 'MAP' ? '#fff' : '#666', cursor:'pointer', display:'flex', alignItems:'center', gap:'10px' }}><LayoutDashboard size={14} /> MAP_GRID</div>
            <div onClick={() => setView('FIELD')} style={{ color: view === 'FIELD' ? '#fff' : '#666', cursor:'pointer', display:'flex', alignItems:'center', gap:'10px' }}><Navigation size={14} /> CONTRACTS</div>
            <div onClick={() => setView('GARAGE')} style={{ color: view === 'GARAGE' ? '#fff' : '#666', cursor:'pointer', display:'flex', alignItems:'center', gap:'10px' }}><Truck size={14} /> GARAGE</div>
            <div onClick={() => sb.auth.signOut()} style={{ marginTop: 'auto', cursor: 'pointer', display:'flex', alignItems:'center', gap:'10px' }}><LogOut size={14} /> LOGOUT</div>
          </div>
        </div>

        {/* MAIN DISPLAY */}
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '30px', padding: '20px', background: '#0a0a0a', borderLeft: '4px solid #d4af37', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#444' }}>CHIEF_OPERATOR: {profile?.username}</div>
              <div style={{ fontSize: '32px', color: '#22c55e', fontWeight: 'bold' }}>${profile?.balance?.toLocaleString()}</div>
            </div>
            <div style={{ color: '#d4af37', fontSize: '10px' }}>{status}</div>
          </div>

          <div style={{ flex: 1, background: 'rgba(0,0,0,0.8)', border: '1px solid #111', overflowY: 'auto' }}>
            {view === 'MAP' && (
              <div style={{ height: '100%', width: '100%', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                {trucks.filter(t => t.status === 'ON_JOB').map((t, i) => (
                   <div key={t.id} style={{ position: 'absolute', top: `${40 + (i*5)}%`, left: `${45 + (i*10)}%` }}>
                    <MapPin color="#d4af37" size={20} className="pulse" />
                    <div style={{ fontSize: '8px', color: '#fff', background: '#000', padding: '2px' }}>{t.truck_name} (TRUCKING)</div>
                   </div>
                ))}
              </div>
            )}

            {view === 'FIELD' && !selectedMission && (
              <div style={{ padding: '30px' }}>
                {missions.filter(m => m.status === 'AVAILABLE').map((m) => (
                  <div key={m.id} style={{ padding: '20px', border: '1px solid #1a1a1a', background: '#0d0d0d', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#fff' }}>{m.title}</div>
                      <div style={{ fontSize: '9px', color: '#444' }}>PAYOUT: ${m.payout.toLocaleString()}</div>
                    </div>
                    <button onClick={() => setSelectedMission(m)} style={{ background: '#d4af37', color: '#000', border: 'none', padding: '5px 15px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>DEPLOY</button>
                  </div>
                ))}
              </div>
            )}

            {selectedMission && (
              <div style={{ padding: '40px' }}>
                <div style={{ color: '#d4af37', fontSize: '12px', marginBottom: '20px' }}>SELECT UNIT FOR DEPLOYMENT:</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                  {trucks.filter(t => t.status === 'AVAILABLE').map(t => (
                    <div key={t.id} onClick={() => deployTruck(t.id)} style={{ padding: '15px', border: '1px solid #d4af37', cursor: 'pointer', textAlign: 'center' }}>
                      <Truck size={16} color="#d4af37" />
                      <div style={{ fontSize: '10px', marginTop: '10px' }}>{t.truck_name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {view === 'GARAGE' && (
              <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {trucks.map((t) => (
                  <div key={t.id} style={{ padding: '20px', border: '1px solid #222', background: '#050505' }}>
                    <Truck size={18} color={t.status === 'AVAILABLE' ? '#22c55e' : '#d4af37'} />
                    <div style={{ fontSize: '12px', marginTop: '10px' }}>{t.truck_name}</div>
                    <div style={{ fontSize: '9px', color: '#444' }}>{t.status} | {t.condition_pct}% HP</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* DISPATCH SIDEBAR */}
        <div style={{ width: '350px', borderLeft: '1px solid #111', padding: '30px', background: '#000' }}>
          <div style={{ fontSize: '10px', color: '#d4af37', marginBottom: '30px' }}><Radio size={12} className="pulse" /> LIVE_COMMS</div>
          {news.map((item, i) => (
            <div key={i} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #111', fontSize: '11px', color: '#888' }}>{item.headline}</div>
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
            placeholder="SYSTEM_CMD: /dispatch, /balance, /contract"
            style={{ flex: 1, background: 'none', border: 'none', color: '#fff', fontSize: '11px', outline: 'none' }}
          />
        </form>
      </div>

      <style jsx>{`
        .pulse { animation: pulse-red 2s infinite; }
        @keyframes pulse-red { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
}
