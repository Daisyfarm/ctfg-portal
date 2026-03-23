"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { 
  LogOut, Sprout, Loader2, Tractor, FileText, 
  ShieldCheck, ShoppingCart, AlertTriangle, Map as MapIcon,
  CloudRain, Sun, Wind, Info, Search, Database
} from 'lucide-react';

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hub');
  const [searchTerm, setSearchTerm] = useState('');

  // XML DATA: Farmlands (Mapped from your XML)
  const farmlands = [
    { id: 1, farmId: 6, npc: "Brandon" },
    { id: 7, farmId: 2, npc: "Brandon" },
    { id: 14, farmId: 5, npc: "George" },
    { id: 48, farmId: 1, npc: "David" },
    { id: 71, farmId: 3, npc: "Maria" },
    { id: 125, farmId: 0, npc: "PLAYER" },
    { id: 136, farmId: 4, npc: "Brandon" },
    // ... representing the 149 entries in your XML
  ];

  // XML DATA: Environment
  const envStatus = { day: 51, season: 'SUMMER', dayTime: '08:15' };

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) { window.location.href = '/'; return; }
      const { data: pData } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
      setProfile(pData || { username: 'Operator', balance: 0 });
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return (
    <div style={{ background: '#0a0a0a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 className="animate-spin" color="#d4af37" size={40} />
    </div>
  );

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', color: '#f5f5dc', fontFamily: 'monospace' }}>
      
      {/* SIDEBAR */}
      <aside style={{ width: '260px', background: '#0d0d0d', borderRight: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '40px 20px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sprout color="#d4af37" size={24} />
            <span style={{ letterSpacing: '4px', fontWeight: 'bold', color: '#d4af37', fontSize: '13px' }}>DAISY'S HUB</span>
          </div>
        </div>

        <nav style={{ flex: 1, paddingTop: '10px' }}>
          {[
            { id: 'hub', label: 'OPERATIONS', icon: <Tractor size={18} /> },
            { id: 'land', label: 'FARMLAND REGISTRY', icon: <MapIcon size={18} /> },
            { id: 'sales', label: 'MARKET PRICES', icon: <ShoppingCart size={18} /> },
            { id: 'logs', label: 'SYSTEM LOGS', icon: <Database size={18} /> },
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 25px', width: '100%',
                background: activeTab === item.id ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                border: 'none', color: activeTab === item.id ? '#d4af37' : '#444',
                cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', fontSize: '11px', letterSpacing: '2px',
                borderLeft: activeTab === item.id ? '3px solid #d4af37' : '3px solid transparent',
              }}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        {/* HEADER */}
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', borderBottom: '1px solid #1a1a1a', paddingBottom: '20px' }}>
          <div>
            <h2 style={{ margin: 0, letterSpacing: '5px', fontSize: '11px', color: '#555' }}>TERMINAL // {activeTab.toUpperCase()}</h2>
            <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
              <span style={{ fontSize: '10px', color: '#d4af37' }}>DAY: {envStatus.day}</span>
              <span style={{ fontSize: '10px', color: '#d4af37' }}>SEASON: {envStatus.season}</span>
              <span style={{ fontSize: '10px', color: '#8da989' }}>TIME: {envStatus.dayTime}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '10px', color: '#444' }}>CREDITS: ${profile.balance?.toLocaleString()}</span>
          </div>
        </header>

        {/* TAB: OPERATIONS (Summary) */}
        {activeTab === 'hub' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ background: 'rgba(212,175,55,0.03)', border: '1px solid #d4af37', padding: '40px' }}>
              <p style={{ color: '#d4af37', fontSize: '10px', letterSpacing: '3px' }}>ACTIVE OPERATOR</p>
              <h1 style={{ fontSize: '32px', margin: '10px 0' }}>{profile.username}</h1>
              <p style={{ fontSize: '12px', color: '#666' }}>Authorized access to Node 01. No current field alerts.</p>
            </div>
            <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', padding: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#ff4d4d' }}>
                <AlertTriangle size={20} />
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>SYSTEM NOTICE</span>
              </div>
              <p style={{ fontSize: '11px', color: '#444', marginTop: '10px' }}>
                XML environment loaded. 149 Farmlands indexed. Market volatility is currently LOW.
              </p>
            </div>
          </div>
        )}

        {/* TAB: FARMLAND REGISTRY (New XML Content) */}
        {activeTab === 'land' && (
          <div>
            <div style={{ marginBottom: '20px', display: 'flex', background: '#0d0d0d', border: '1px solid #1a1a1a', padding: '10px 15px', alignItems: 'center', gap: '10px' }}>
              <Search size={16} color="#444" />
              <input 
                placeholder="SEARCH FARMLAND ID..." 
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', fontSize: '12px', width: '100%' }}
              />
            </div>
            <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #1a1a1a', color: '#444', fontSize: '10px' }}>
                    <th style={{ padding: '15px' }}>LAND ID</th>
                    <th style={{ padding: '15px' }}>FARM ID</th>
                    <th style={{ padding: '15px' }}>OWNER INDEX</th>
                    <th style={{ padding: '15px' }}>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {farmlands.filter(f => f.id.toString().includes(searchTerm)).map((farm) => (
                    <tr key={farm.id} style={{ borderBottom: '1px solid #141414', fontSize: '11px' }}>
                      <td style={{ padding: '15px', color: '#d4af37' }}>ID_{farm.id.toString().padStart(3, '0')}</td>
                      <td style={{ padding: '15px' }}>GRP_{farm.farmId}</td>
                      <td style={{ padding: '15px', color: '#8da989' }}>{farm.npc}</td>
                      <td style={{ padding: '15px' }}>
                         <span style={{ background: farm.farmId === 6 ? '#1a1a1a' : '#1e291e', color: farm.farmId === 6 ? '#444' : '#8da989', padding: '2px 8px', fontSize: '9px' }}>
                           {farm.farmId === 6 ? 'AI_MANAGED' : 'OWNED'}
                         </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: MARKET PRICES */}
        {activeTab === 'sales' && (
          <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a' }}>
             <div style={{ padding: '20px', borderBottom: '1px solid #1a1a1a', fontSize: '10px', color: '#d4af37' }}>
               LIVE ECONOMY STREAM // DATA_SOURCE: economy.xml
             </div>
             {/* Add market table logic here
