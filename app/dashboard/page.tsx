"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { 
  LogOut, Sprout, Loader2, Tractor, Activity, 
  ShieldCheck, ShoppingCart, TrendingUp, Users,
  Coins, Fuel, Map as MapIcon, Database
} from 'lucide-react';

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ops');

  // Mapped from your latest <farms> XML
  const farmData = [
    {
      id: 1,
      name: "Daisy Farmz",
      money: 1313639.75,
      loan: 0,
      stats: {
        distance: "631.87 km",
        fuel: "3811.12 L",
        animals: { cows: 5, sheep: 61 },
        topPlayer: "CHUNK"
      }
    },
    {
      id: 2,
      name: "Mayor Tim's Farm",
      money: 181032.93,
      loan: 0,
      stats: {
        distance: "1132.49 km",
        fuel: "6882.78 L",
        animals: { cows: 0, sheep: 0 },
        topPlayer: "mihaly090"
      }
    }
  ];

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
            { id: 'ops', label: 'FARM OVERVIEW', icon: <Activity size={18} /> },
            { id: 'fin', label: 'FINANCIALS', icon: <TrendingUp size={18} /> },
            { id: 'land', label: 'LAND REGISTRY', icon: <MapIcon size={18} /> },
            { id: 'users', label: 'PLAYER PERMS', icon: <Users size={18} /> },
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
        
        <header style={{ marginBottom: '40px', borderBottom: '1px solid #1a1a1a', paddingBottom: '20px' }}>
          <h2 style={{ margin: 0, letterSpacing: '5px', fontSize: '11px', color: '#555' }}>SYSTEM // {activeTab.toUpperCase()}</h2>
        </header>

        {/* TAB: FARM OVERVIEW */}
        {activeTab === 'ops' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {farmData.map(farm => (
              <div key={farm.id} style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', padding: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h3 style={{ margin: 0, color: '#d4af37', fontSize: '14px' }}>{farm.name.toUpperCase()}</h3>
                  <span style={{ fontSize: '10px', color: '#444' }}>ID: {farm.id}</span>
                </div>
                
                <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                  <div>
                    <p style={{ fontSize: '9px', color: '#444', margin: 0 }}>BALANCE</p>
                    <p style={{ fontSize: '18px', color: '#fff' }}>${farm.money.toLocaleString()}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '9px', color: '#444', margin: 0 }}>DISTANCE</p>
                    <p style={{ fontSize: '18px', color: '#fff' }}>{farm.stats.distance}</p>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #141414', paddingTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Fuel size={14} color="#d4af37" />
                      <span style={{ fontSize: '11px' }}>{farm.stats.fuel}</span>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Users size={14} color="#8da989" />
                      <span style={{ fontSize: '11px' }}>{farm.stats.topPlayer}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: FINANCIALS (XML DATA) */}
        {activeTab === 'fin' && (
           <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', padding: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                 <Coins color="#d4af37" />
                 <h3 style={{ margin: 0 }}>FINANCIAL AUDIT</h3>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                 <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #1a1a1a', color: '#444' }}>
                       <th style={{ padding: '10px' }}>ENTITY</th>
                       <th style={{ padding: '10px' }}>CASH ON HAND</th>
                       <th style={{ padding: '10px' }}>LOANS</th>
                       <th style={{ padding: '10px' }}>STATUS</th>
                    </tr>
                 </thead>
                 <tbody>
                    {farmData.map(farm => (
                       <tr key={farm.id} style={{ borderBottom: '1px solid #141414' }}>
                          <td style={{ padding: '15px' }}>{farm.name}</td>
                          <td style={{ padding: '15px' }}>${farm.money.toLocaleString()}</td>
                          <td style={{ padding: '15px', color: farm.loan > 0 ? '#ff4d4d' : '#8da989' }}>${farm.loan}</td>
                          <td style={{ padding: '15px' }}>
                             <span style={{ background: '#1a1a1a', padding: '3px 10px', fontSize: '10px', borderRadius: '2px' }}>ACTIVE</span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        )}
      </main>
    </div>
  );
}
