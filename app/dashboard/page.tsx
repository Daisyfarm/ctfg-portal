"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase";
import { 
  Shield, Radio, Clock, LogOut, Terminal, ShoppingCart,
  Navigation, Zap, LayoutDashboard, MapPin, Truck, Wrench, Timer, Droplets, Star
} from 'lucide-react';

const TRUCK_MODELS = [
  { id: 'scout', name: 'Lite-Scout', price: 50000, fuel: 100, desc: 'High fuel efficiency, low payout multiplier.' },
  { id: 'hauler', name: 'Iron-Hauler', price: 150000, fuel: 80, desc: 'The industry standard. Balanced stats.' },
  { id: 'titan', name: 'Goliath-Titan', price: 500000, fuel: 60, desc: 'Massive fuel eater, but unlocks Heavy contracts.' }
];

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
      if (Date.now() - new Date(job.started_at).getTime() >= 300000) {
        const truck = trucks.find(t => t.status === 'ON_JOB');
        if (truck) {
          await sb.rpc('complete_mission', { m_id: job.id, t_id: truck.id });
          setStatus("MISSION_COMPLETED_PAYDAY_RECEIVED");
          fetchAllData(session.user.id);
        }
      }
    }
  };

  const handlePurchase = async (model: any) => {
    if (profile.balance < model.price) return setStatus("INSUFFICIENT_CREDITS");
    setStatus(`ACQUIRING_${model.name}...`);
    const { error } = await sb.rpc('buy_truck', { 
        truck_name: `${model.name}_${Math.floor(Math.random() * 999)}`, 
        truck_model: model.id, 
        price: model.price,
        start_fuel: model.fuel
    });
    if (!error) {
        setStatus("ASSET_ACQUIRED");
        fetchAllData(session.user.id);
    } else {
        setStatus("TRANSACTION_FAILED");
    }
  };

  // ... (Other handlers for Refuel, Deploy, Command remain same)

  if (!session) return <div style={{background:'#000', height:'100vh'}} />;

  return (
    <div style={{ height: '100vh', background: '#050505', color: 'white', fontFamily: 'monospace', backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.96)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', height: '100%' }}>
        
        {/* SIDEBAR */}
        <div style={{ width: '260px', borderRight: '1px solid #111', padding: '40px 20px', background: 'rgba(0,0,0,1)' }}>
          <div style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '3px', marginBottom: '40px' }}><Shield size={18} /> CTFG_OS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', color: '#555', fontSize: '11px' }}>
            <div onClick={() => setView('MAP')} style={{ color: view === 'MAP' ? '#fff' : '#555', cursor:'pointer' }}>TACTICAL_MAP</div>
            <div onClick={() => setView('FIELD')} style={{ color: view === 'FIELD' ? '#fff' : '#555', cursor:'pointer' }}>CONTRACTS</div>
            <div onClick={() => setView('GARAGE')} style={{ color: view === 'GARAGE' ? '#fff' : '#555', cursor:'pointer' }}>GARAGE</div>
            <div onClick={() => setView('MARKET')} style={{ color: view === 'MARKET' ? '#d4af37' : '#555', cursor:'pointer', display:'flex', alignItems:'center', gap:'10px' }}><ShoppingCart size={14} /> FLEET_MARKET</div>
          </div>
        </div>

        {/* MAIN PANEL */}
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '30px', padding: '20px', background: '#080808', borderLeft: '4px solid #d4af37', display:'flex', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#444' }}>LEVEL {profile?.level} OPERATOR</div>
              <div style={{ fontSize: '28px', color: '#22c55e', fontWeight: 'bold' }}>${profile?.balance?.toLocaleString()}</div>
            </div>
            <div style={{ color: '#d4af37', fontSize: '10px', textAlign:'right' }}>{status}</div>
          </div>

          <div style={{ flex: 1, background: 'rgba(5,5,5,0.9)', border: '1px solid #111', overflowY: 'auto' }}>
            {view === 'MARKET' && (
              <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {TRUCK_MODELS.map((model) => (
                  <div key={model.id} style={{ padding: '25px', border: '1px solid #1a1a1a', background: '#080808', position: 'relative' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{model.name}</div>
                    <div style={{ fontSize: '18px', color: '#22c55e', margin: '10px 0' }}>${model.price.toLocaleString()}</div>
                    <div style={{ fontSize: '10px', color: '#666', marginBottom: '20px', lineHeight: '1.5' }}>{model.desc}</div>
                    <button 
                        onClick={() => handlePurchase(model)}
                        style={{ width: '100%', padding: '10px', background: '#d4af37', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '10px' }}
                    >
                        PURCHASE_ASSET
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* ... Other views (MAP, FIELD, GARAGE) remain identical to previous version ... */}
            {view === 'GARAGE' && (
               <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
               {trucks.map((t) => (
                 <div key={t.id} style={{ padding: '20px', border: '1px solid #1a1a1a', background: '#080808' }}>
                   <Truck size={16} color={t.status === 'AVAILABLE' ? '#22c55e' : '#d4af37'} />
                   <div style={{ fontSize: '12px', margin: '15px 0' }}>{t.truck_name}</div>
                   <div style={{ fontSize: '9px', color: '#444' }}>MODEL: {t.model.toUpperCase()}</div>
                 </div>
               ))}
             </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
