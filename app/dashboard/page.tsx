"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase";
import { 
  Shield, Radio, Clock, LogOut, Terminal, 
  Send, Navigation, Zap, DollarSign, LayoutDashboard 
} from 'lucide-react';
import LiveMap from '../components/LiveMap'; 

export default function MontanaTerminal() {
  const [session, setSession] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [news, setNews] = useState<any[]>([]);
  const [command, setCommand] = useState("");
  const [status, setStatus] = useState("SYSTEM_READY");
  const [profile, setProfile] = useState<any>(null);

  // 1. Initial Uplink & Session Check
  useEffect(() => {
    setMounted(true);
    sb.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (uid: string) => {
    const { data } = await sb.from('profiles').select('*').eq('id', uid).single();
    if (data) setProfile(data);
  };

  // 2. Controlled Intel Fetch
  useEffect(() => {
    if (session && news.length === 0) {
      const fetchIntel = async () => {
        const { data } = await sb.from('tactical_news').select('*').order('created_at', { ascending: false }).limit(5);
        if (data) setNews(data);
      };
      fetchIntel();
    }
  }, [session, news.length]);

  // 3. Command Execution Logic (/dispatch and /balance)
  const executeCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.startsWith("/")) return;

    const [action, ...args] = command.split(" ");
    const message = args.join(" ");

    try {
      if (action === "/dispatch") {
        setStatus("UPLOADING_INTEL...");
        const { error } = await sb.from('tactical_news').insert([{ headline: message }]);
        if (error) throw error;
        setNews([{ headline: message, created_at: new Date().toISOString() }, ...news]);
      } 
      
      if (action === "/balance") {
        setStatus("SYNCING_FUNDS...");
        const newBalance = parseInt(message.replace(/,/g, ''));
        const { error } = await sb.from('profiles').update({ balance: newBalance }).eq('id', session.user.id);
        if (error) throw error;
        setProfile({ ...profile, balance: newBalance });
      }

      setCommand("");
      setStatus("COMMAND_SUCCESS");
      setTimeout(() => setStatus("SYSTEM_READY"), 3000);
    } catch (err) {
      setStatus("EXECUTION_FAILED");
      console.error(err);
    }
  };

  if (!mounted || !session) return <div style={{ background: '#000', height: '100vh' }} />;

  return (
    <div style={{ 
      height: '100vh', background: '#050505', display: 'flex', color: 'white', fontFamily: 'monospace',
      backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80")',
      backgroundSize: 'cover', backgroundPosition: 'center'
    }}>
      {/* Dark Overlay for Readability */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', zIndex: 1 }} />

      {/* Main UI Container */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', width: '100%', height: '100%' }}>
        
        {/* Left Sidebar: Navigation */}
        <div style={{ width: '260px', borderRight: '1px solid #111', padding: '40px 20px', background: 'rgba(5,5,5,0.5)' }}>
          <div style={{ color: '#d4af37', fontSize: '12px', fontWeight: 'bold', letterSpacing: '4px', marginBottom: '50px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={20} /> CTFG_PORTAL
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#666', fontSize: '11px' }}>
            <div style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}><LayoutDashboard size={14} /> Dashboard</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Navigation size={14} /> Field Work</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Zap size={14} /> Equipment</div>
            <div onClick={() => sb.auth.signOut()} style={{ marginTop: 'auto', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}><LogOut size={14} /> Sign Out</div>
          </div>
        </div>

        {/* Center: Main Dashboard & Map */}
        <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
          <div style={{ marginBottom: '40px', padding: '20px', background: 'rgba(10,10,10,0.8)', borderLeft: '4px solid #d4af37' }}>
            <div style={{ fontSize: '10px', color: '#d4af37', letterSpacing: '2px' }}>OPERATOR</div>
            <div style={{ fontSize: '24px', color: '#fff', margin: '5px 0' }}>{profile?.username || 'Samuel_Founder'}</div>
            <div style={{ fontSize: '32px', color: '#22c55e', fontWeight: 'bold' }}>
              ${profile?.balance?.toLocaleString() || '9,459,000'}
            </div>
          </div>

          {/* Real-Time Map Component */}
          <LiveMap />
        </div>

        {/* Right Sidebar: Live Intelligence */}
        <div style={{ width: '380px', borderLeft: '1px solid #111', padding: '30px', background: 'rgba(2,2,2,0.9)' }}>
          <div style={{ fontSize: '10px', color: '#d4af37', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '3px' }}>
            <Radio size={14} className="pulse" /> LIVE_DISPATCH
          </div>
          {news.map((item, i) => (
            <div key={i} style={{ marginBottom: '20px', padding: '15px', background: 'rgba(255,0,0,0.03)', border: '1px solid rgba(255,0,0,0.1)' }}>
              <div style={{ fontSize: '9px', color: '#444' }}><Clock size={10} style={{ verticalAlign: 'middle' }} /> {new Date(item.created_at).toLocaleTimeString()}</div>
              <div style={{ fontSize: '12px', color: '#eee', marginTop: '5px' }}>{item.headline}</div>
            </div>
          ))}
        </div>
      </div>

      {/* COMMAND TERMINAL OVERLAY */}
      <div style={{ position: 'fixed', bottom: '20px', left: '300px', right: '420px', zIndex: 100 }}>
        <form onSubmit={executeCommand} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#000', padding: '12px 20px', border: '1px solid #d4af3733', borderRadius: '4px' }}>
          <Terminal size={14} color="#d4af37" />
          <input 
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="SYSTEM_CMD: /dispatch [msg] or /balance [val]"
            style={{ flex: 1, background: 'none', border: 'none', color: '#fff', fontSize: '11px', outline: 'none' }}
          />
          <div style={{ fontSize: '9px', color: '#d4af37', opacity: 0.5 }}>{status}</div>
          <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d4af37' }}><Send size={14} /></button>
        </form>
      </div>

      <style jsx>{`
        .pulse { animation: pulse-red 2s infinite; }
        @keyframes pulse-red { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
}
