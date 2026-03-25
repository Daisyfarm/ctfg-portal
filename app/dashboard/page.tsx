"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase";
import { 
  Shield, Radio, Clock, LogOut, Terminal, 
  Send, Navigation, Zap, LayoutDashboard, MapPin, Truck, Wrench, AlertTriangle
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

  useEffect(() => {
    sb.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchAllData(session.user.id);
    });
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchAllData(session.user.id);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchAllData = async (uid: string) => {
    const { data: prof } = await sb.from('profiles').select('*').eq('id', uid).single();
    if (prof) setProfile(prof);
    const { data: intel } = await sb.from('tactical_news').select('*').order('created_at', { ascending: false }).limit(5);
    if (intel) setNews(intel);
    const { data: jobs } = await sb.from('active_missions').select('*').order('created_at', { ascending: false });
    if (jobs) setMissions(jobs);
    const { data: fleet } = await sb.from('garage').select('*').order('truck_name', { ascending: true });
    if (fleet) setTrucks(fleet);
  };

  const handleRepair = async (truckId: string, currentCondition: number) => {
    const needed = 100 - currentCondition;
    const cost = needed * 500; // $500 per 1% repair cost

    if (profile.balance < cost) {
      setStatus("INSUFFICIENT_FUNDS");
      return;
    }

    setStatus("INITIATING_REPAIRS...");
    const { error } = await sb.rpc('repair_truck', { 
      truck_id: truckId, 
      repair_cost: cost, 
      new_condition: 100 
    });

    if (error) {
      setStatus("REPAIR_FAILED");
    } else {
      setStatus(`REPAIRED_FOR_$${cost.toLocaleString()}`);
      fetchAllData(session.user.id);
    }
    setTimeout(() => setStatus("SYSTEM_READY"), 3000);
  };

  const executeCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.startsWith("/")) return;
    const [action, ...args] = command.split(" ");
    const val = args.join(" ");

    try {
      if (action === "/dispatch") await sb.from('tactical_news').insert([{ headline: val }]);
      if (action === "/balance") {
        const amt = parseInt(val.replace(/,/g, ''));
        await sb.from('profiles').update({ balance: amt }).eq('id', session.user.id);
      }
      if (action === "/buy_truck") {
        await sb.from('garage').insert([{ truck_name: val, model: 'Heavy_Duty', owner_id: session.user.id, condition_pct: 100 }]);
      }
      setCommand("");
      setStatus("CMD_EXECUTED");
      setTimeout(() => { setStatus("SYSTEM_READY"); fetchAllData(session.user.id); }, 2000);
    } catch (err) { setStatus("ERROR"); }
  };

  if (!session) return <div style={{background:'#000', height:'100vh'}} />;

  return (
    <div style={{ 
      height: '100vh', background: '#050505', color: 'white', fontFamily: 'monospace',
      backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80")',
      backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', height: '100%' }}>
        
        {/* SIDEBAR */}
        <div style={{ width: '260px', borderRight: '1px solid #1a1a1a', padding: '40px 20px', background: 'rgba(5,5,5,0.9)' }}>
          <div style={{ color: '#d4af37', fontSize: '12px', letterSpacing: '4px', marginBottom: '50px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={20} /> CTFG_ADMIN
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', color: '#666', fontSize: '11px' }}>
            <div onClick={() => setView('MAP')} style={{ color: view === 'MAP' ? '#fff' : '#666', cursor:'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}><LayoutDashboard size={14} /> STRATEGIC_MAP</div>
            <div onClick={() => setView('FIELD')} style={{ color: view === 'FIELD' ? '#fff' : '#666', cursor:'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}><Navigation size={14} /> FIELD_WORK</div>
            <div onClick={() => setView('GARAGE')} style={{ color: view === 'GARAGE' ? '#fff' : '#666', cursor:'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}><Truck size={14} /> GARAGE_FLEET</div>
            <div onClick={() => sb.auth.signOut()} style={{ marginTop: 'auto', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}><LogOut size={14} /> DISCONNECT</div>
          </div>
        </div>

        {/* MAIN PANEL */}
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '30px', padding: '20px', background: 'rgba(15,15,15,0.9)', borderLeft: '4px solid #d4af37', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#d4af37' }}>OPERATOR: {profile?.username || 'Samuel_Founder'}</div>
              <div style={{ fontSize: '32px', color: '#22c55e', fontWeight: 'bold' }}>${profile?.balance?.toLocaleString()}</div>
            </div>
          </div>

          <div style={{ flex: 1, background: 'rgba(0,0,0,0.7)', border: '1px solid #1a1a1a', borderRadius: '4px', overflowY: 'auto' }}>
            {view === 'MAP' && (
              <div style={{ height: '100%', width: '100%', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                <div style={{ padding: '20px', color: '#d4af37', fontSize: '10px' }}>[ SATELLITE_UPLINK: ACTIVE ]</div>
                {trucks.filter(t => t.status === 'ON_JOB').map((t, i) => (
                   <div key={t.id} style={{ position: 'absolute', top: `${40 + (i*10)}%`, left: `${45 + (i*5)}%` }}>
                    <MapPin color="#d4af37" size={20} className="pulse" />
                    <div style={{ fontSize: '8px', color: '#fff', background: '#000', padding: '2px' }}>{t.truck_name}</div>
                   </div>
                ))}
              </div>
            )}

            {view === 'FIELD' && (
              <div style={{ padding: '30px', display: 'grid', gap: '15px' }}>
                {missions.map((m) => (
                  <div key={m.id} style={{ padding: '20px', border: '1px solid #1a1a1a', background: 'rgba(20,20,20,0.6)', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#fff' }}>{m.title}</div>
                      <div style={{ fontSize: '9px', color: '#444' }}>{m.origin} ➔ {m.destination}</div>
                    </div>
                    <div style={{ color: '#22c55e' }}>+${m.payout.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}

            {view === 'GARAGE' && (
              <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {trucks.map((t) => (
                  <div key={t.id} style={{ padding: '20px', border: '1px solid #222', background: 'rgba(25,25,25,0.9)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                      <Truck size={18} color={t.condition_pct > 80 ? '#22c55e' : '#d4af37'} />
                      <div style={{ fontSize: '9px', color: t.status === 'REPAIR' ? '#ff4444' : '#666' }}>{t.status}</div>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{t.truck_name}</div>
                    <div style={{ fontSize: '10px', color: '#444', marginBottom: '15px' }}>{t.model}</div>
                    
                    <div style={{ height: '2px', background: '#111', width: '100%', marginBottom: '5px' }}>
                      <div style={{ height: '100%', background: '#d4af37', width: `${t.condition_pct}%` }} />
                    </div>
                    <div style={{ fontSize: '9px', color: '#666', marginBottom: '15px' }}>CONDITION: {t.condition_pct}%</div>

                    {t.condition_pct < 100 && (
                      <button 
                        onClick={() => handleRepair(t.id, t.condition_pct)}
                        style={{ width: '100%', padding: '8px', background: 'none', border: '1px solid #d4af37', color: '#d4af37', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                      >
                        <Wrench size={12} /> REPAIR (${((100 - t.condition_pct) * 500).toLocaleString()})
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* INTEL SIDEBAR */}
        <div style={{ width: '350px', borderLeft: '1px solid #1a1a1a', padding: '30px', background: 'rgba(2,2,2,0.98)' }}>
          <div style={{ fontSize: '10px', color: '#d4af37', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Radio size={14} className="pulse" /> LIVE_DISPATCH
          </div>
          {news.map((item, i) => (
            <div key={i} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #111' }}>
              <div style={{ fontSize: '11px', color: '#ccc' }}>{item.headline}</div>
              <div style={{ fontSize: '8px', color: '#444', marginTop: '5px' }}>{new Date(item.created_at).toLocaleTimeString()}</div>
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
            placeholder="SYSTEM_CMD: /dispatch, /balance, /buy_truck"
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
