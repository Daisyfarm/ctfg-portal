"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase";
import { 
  Shield, Radio, Clock, LogOut, Terminal, 
  Send, Navigation, Zap, LayoutDashboard, MapPin
} from 'lucide-react';

export default function MasterDashboard() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [missions, setMissions] = useState<any[]>([]);
  const [view, setView] = useState('MAP'); // MAP or FIELD_WORK
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
  };

  const executeCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.startsWith("/")) return;
    const [action, ...args] = command.split(" ");
    const val = args.join(" ");

    try {
      if (action === "/dispatch") {
        await sb.from('tactical_news').insert([{ headline: val }]);
        setStatus("DISPATCH_SENT");
      } 
      if (action === "/balance") {
        const amt = parseInt(val.replace(/,/g, ''));
        await sb.from('profiles').update({ balance: amt }).eq('id', session.user.id);
        setProfile({...profile, balance: amt});
        setStatus("FUNDS_SYNCED");
      }
      if (action === "/contract") {
        await sb.from('active_missions').insert([{ title: val, payout: 25000 }]);
        setStatus("JOB_POSTED");
      }
      setCommand("");
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
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', height: '100%' }}>
        
        {/* SIDEBAR */}
        <div style={{ width: '260px', borderRight: '1px solid #111', padding: '40px 20px', background: 'rgba(5,5,5,0.8)' }}>
          <div style={{ color: '#d4af37', fontSize: '12px', letterSpacing: '4px', marginBottom: '50px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={20} /> CTFG_ADMIN
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', color: '#666', fontSize: '11px' }}>
            <div onClick={() => setView('MAP')} style={{ color: view === 'MAP' ? '#fff' : '#666', cursor:'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}><LayoutDashboard size={14} /> STRATEGIC_MAP</div>
            <div onClick={() => setView('FIELD')} style={{ color: view === 'FIELD' ? '#fff' : '#666', cursor:'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}><Navigation size={14} /> FIELD_WORK</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Zap size={14} /> EQUIPMENT</div>
            <div onClick={() => sb.auth.signOut()} style={{ marginTop: 'auto', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}><LogOut size={14} /> DISCONNECT</div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '30px', padding: '20px', background: 'rgba(10,10,10,0.9)', borderLeft: '4px solid #d4af37' }}>
            <div style={{ fontSize: '10px', color: '#d4af37' }}>OPERATOR: {profile?.username || 'Samuel_Founder'}</div>
            <div style={{ fontSize: '32px', color: '#22c55e', fontWeight: 'bold', marginTop: '5px' }}>
              ${profile?.balance?.toLocaleString() || '0'}
            </div>
          </div>

          <div style={{ flex: 1, background: 'rgba(0,0,0,0.6)', border: '1px solid #111', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
            {view === 'MAP' ? (
              <div style={{ height: '100%', width: '100%', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#111 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <div style={{ padding: '20px', color: '#d4af37', fontSize: '10px' }}>[ LIVE_MAP_FEED: MONTANA_SECTOR ]</div>
                <div style={{ position: 'absolute', top: '40%', left: '50%' }}>
                  <MapPin color="#d4af37" size={24} />
                  <div style={{ fontSize: '9px', background: '#000', padding: '2px' }}>UNIT_01</div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '30px', display: 'grid', gap: '15px' }}>
                {missions.map((m) => (
                  <div key={m.id} style={{ padding: '15px', border: '1px solid #222', background: 'rgba(20,20,20,0.5)', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#fff' }}>{m.title}</div>
                      <div style={{ fontSize: '9px', color: '#444' }}>{m.origin} ➔ {m.destination}</div>
                    </div>
                    <div style={{ color: '#22c55e', fontSize: '12px' }}>+${m.payout.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* INTEL SIDEBAR */}
        <div style={{ width: '350px', borderLeft: '1px solid #111', padding: '30px', background: 'rgba(2,2,2,0.95)' }}>
          <div style={{ fontSize: '10px', color: '#d4af37', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Radio size={14} /> LIVE_INTELLIGENCE
          </div>
          {news.map((item, i) => (
            <div key={i} style={{ marginBottom: '20px', padding: '12px', border: '1px solid #1a1a1a' }}>
              <div style={{ fontSize: '11px', color: '#ccc' }}>{item.headline}</div>
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
            placeholder="CMDS: /dispatch [msg], /balance [val], /contract [name]"
            style={{ flex: 1, background: 'none', border: 'none', color: '#fff', fontSize: '11px', outline: 'none' }}
          />
          <div style={{ fontSize: '9px', color: '#d4af37' }}>{status}</div>
        </form>
      </div>
    </div>
  );
}
