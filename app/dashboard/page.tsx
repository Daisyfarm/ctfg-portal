"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase";
import { 
  Shield, Radio, Clock, LogOut, Terminal, ShoppingCart,
  Navigation, Zap, LayoutDashboard, MapPin, Truck, Wrench, 
  Timer, Droplets, Star, ClipboardList, DollarSign, Activity
} from 'lucide-react';

const TRUCK_MODELS = [
  { id: 'scout', name: 'Lite-Scout', price: 50000, fuel: 100, desc: 'High efficiency, low maintenance. Ideal for rapid leveling.' },
  { id: 'hauler', name: 'Iron-Hauler', price: 150000, fuel: 80, desc: 'The industry standard. Balanced for long-distance hauls.' },
  { id: 'titan', name: 'Goliath-Titan', price: 500000, fuel: 60, desc: 'Massive payload capacity. Unlocks High-Tier contracts.' }
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
  const [status, setStatus] = useState("SYSTEM_ONLINE");
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

    const { data: logs } = await sb.from('mission_history').select('*').order('completed_at', { ascending: false }).limit(20);
    if (logs) setHistory(logs);
  };

  const checkPayday = async () => {
    const activeJobs = missions.filter(m => m.status === 'ACTIVE');
    for (const job of activeJobs) {
      const elapsed = Date.now() - new Date(job.started_at).getTime();
      if (elapsed >= 300000) { // 5 Minute Delivery Time
        const truck = trucks.find(t => t.status === 'ON_JOB');
        if (truck) {
          const { error } = await sb.rpc('complete_mission', { m_id: job.id, t_id: truck.id });
          if (!error) {
            setStatus(`PAYDAY_RECIEVED: +$${job.payout.toLocaleString()}`);
            fetchAllData(session.user.id);
          }
        }
      }
    }
  };

  const handlePurchase = async (model: any) => {
    if (profile.balance < model.price) return setStatus("INSUFFICIENT_FUNDS");
    const { error } = await sb.rpc('buy_truck', { 
        truck_name: `${model.name}_${Math.floor(100 + Math.random() * 900)}`, 
        truck_model: model.id, 
        price: model.price,
        start_fuel: model.fuel
    });
    if (!error) { setStatus("ASSET_PURCHASED"); fetchAllData(session.user.id); }
  };

  const handleRepair = async (truckId: string, currentCondition: number) => {
    const cost = (100 - currentCondition) * 500;
    if (profile.balance < cost) return setStatus("LOW_CREDITS");
    const { error } = await sb.rpc('repair_truck', { truck_id: truckId, repair_cost: cost, new_condition: 100 });
    if (!error) fetchAllData(session.user.id);
  };

  const handleRefuel = async (truckId: string, currentFuel: number) => {
    const cost = (100 - currentFuel) * 150;
    if (profile.balance < cost) return setStatus("LOW_CREDITS");
    const { error } = await sb.rpc('refuel_truck', { truck_id: truckId, fuel_cost: cost });
    if (!error) fetchAllData(session.user.id);
  };

  const deployTruck = async (truckId: string) => {
    const truck = trucks.find(t => t.id === truckId);
    if (truck.fuel_level < 30 || truck.condition_pct < 10) return setStatus("UNIT_UNFIT_FOR_SERVICE");
    const { error } = await sb.rpc('accept_mission', { m_id: selectedMission.id, t_id: truckId });
    if (!error) { setStatus("UNIT_EN_ROUTE"); setSelectedMission(null); fetchAllData(session.user.id); }
  };

  const executeCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.startsWith("/")) return;
    const [action, ...args] = command.split(" ");
    try {
      if (action === "/contract") {
        await sb.from('active_missions').insert([{ 
          title: args.join(" ") || "Field Transport", payout: (profile.level || 1) * 35000, 
          expires_at: new Date(Date.now() + 15 * 60000).toISOString(), status: 'AVAILABLE'
        }]);
      }
      if (action === "/balance") await sb.from('profiles').update({ balance: parseInt(args[0]) }).eq('id', session.user.id);
      setCommand(""); fetchAllData(session.user.id);
    } catch (err) { setStatus("CMD_ERR"); }
  };

  if (!session) return <div style={{background:'#000', height:'100vh'}} />;

  const xpReq = (profile?.level || 1) * 1000;
  const xpPct = ((profile?.xp || 0) / xpReq) * 100;
  const lifetime = history.reduce((acc, curr) => acc + curr.payout, 0);

  return (
    <div style={{ height: '100vh', background: '#050505', color: 'white', fontFamily: 'monospace', backgroundImage: 'url("https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.96)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', height: '100%' }}>
        
        {/* NAV SIDEBAR */}
        <div style={{ width: '280px', borderRight: '1px solid #111', padding: '40px 20px', background: '#000' }}>
          <div style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '4px', marginBottom: '50px', display:'flex', alignItems:'center', gap:'10px' }}><Shield size={18} /> CTFG_TERMINAL</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#444', fontSize: '11px' }}>
            <div onClick={() => setView('MAP')} style={{ color: view === 'MAP' ? '#fff' : '#444', cursor:'pointer', display:'flex', alignItems:'center', gap:'12px' }}><LayoutDashboard size={14} /> TACTICAL_MAP</div>
            <div onClick={() => setView('FIELD')} style={{ color: view === 'FIELD' ? '#fff' : '#444', cursor:'pointer', display:'flex', alignItems:'center', gap:'12px' }}><Navigation size={14} /> CONTRACTS</div>
            <div onClick={() => setView('GARAGE')} style={{ color: view === 'GARAGE' ? '#fff' : '#444', cursor:'pointer', display:'flex', alignItems:'center', gap:'12px' }}><Truck size={14} /> GARAGE</div>
            <div onClick={() => setView('MARKET')} style={{ color: view === 'MARKET' ? '#d4af37' : '#444', cursor:'pointer', display:'flex', alignItems:'center', gap:'12px' }}><ShoppingCart size={14} /> FLEET_MARKET</div>
            <div onClick={() => setView('LOGS')} style={{ color: view === 'LOGS' ? '#fff' : '#444', cursor:'pointer', display:'flex', alignItems:'center', gap:'12px' }}><ClipboardList size={14} /> MISSION_LOGS</div>
            <div onClick={() => sb.auth.signOut()} style={{ marginTop:'40px', cursor:'pointer', display:'flex', alignItems:'center', gap:'12px' }}><LogOut size={14} /> TERMINATE_SESSION</div>
          </div>
        </div>

        {/* MAIN CONSOLE */}
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '30px', padding: '20px', background: '#080808', borderLeft: '4px solid #d4af37', display:'flex', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#d4af37' }}>LEVEL_{profile?.level} OPERATOR</div>
              <div style={{ fontSize: '32px', color: '#22c55e', fontWeight: 'bold' }}>${profile?.balance?.toLocaleString()}</div>
              <div style={{ width: '200px', height: '2px', background: '#111', marginTop: '10px' }}>
                <div style={{ height: '100%', background: '#d4af37', width: `${xpPct}%` }} />
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '9px', color: '#444' }}>TOTAL_REVENUE</div>
              <div style={{ fontSize: '18px', color: '#d4af37' }}>${lifetime.toLocaleString()}</div>
              <div style={{ fontSize: '10px', color: '#ff4444', marginTop: '5px' }}>{status}</div>
            </div>
          </div>

          <div style={{ flex: 1, background: 'rgba(5,5,5,0.95)', border: '1px solid #111', overflowY: 'auto' }}>
            {view === 'MAP' && (
              <div style={{ height: '100%', width: '100%', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#111 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                {trucks.filter(t => t.status === 'ON_JOB').map((t, i) => (
                   <div key={t.id} style={{ position: 'absolute', top: `${40 + (i*6)}%`, left: `${45 + (i*10)}%` }}>
                    <MapPin color="#d4af37" size={24} className="pulse" />
                    <div style={{ fontSize: '8px', color: '#fff', background: '#000', padding: '2px' }}>{t.truck_name} (IN_TRANSIT)</div>
                   </div>
                ))}
              </div>
            )}

            {view === 'MARKET' && (
              <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                {TRUCK_MODELS.map((m) => (
                  <div key={m.id} style={{ padding: '25px', border: '1px solid #1a1a1a', background: '#080808' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{
