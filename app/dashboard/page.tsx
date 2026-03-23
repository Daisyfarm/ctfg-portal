"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { 
  LogOut, Sprout, Loader2, 
  Tractor, FileText, ShieldCheck, 
  ShoppingCart, AlertTriangle, Map,
  CloudRain, Sun, Wind, CloudLightning, Info, 
  TrendingUp, User, Landmark
} from 'lucide-react';

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hub');
  
  // States for Wire Transfer
  const [recipientId, setRecipientId] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferStatus, setTransferStatus] = useState({ type: '', msg: '' });

  // Data parsed from your environment XML
  const envInfo = {
    day: 51,
    season: 'SUMMER',
    visibility: '0.09 (9%)',
    fogEnd: '584 mins',
    lastRain: '1700'
  };

  const marketData = [
    { name: 'SOYBEAN', stock: '216,382', price: 1244, peak: 'MID_SPRING' },
    { name: 'WHEAT', stock: '300,000', price: 540, peak: 'EARLY_SPRING' },
    { name: 'OAT', stock: '450,000', price: 852, peak: 'EARLY_SPRING' },
    { name: 'POTATO', stock: '722,317', price: 211, peak: 'LATE_AUTUMN' },
  ];

  const weatherForecast = [
    { type: 'RAIN', day: 51, time: '18:00', icon: <CloudRain size={16}/> },
    { type: 'SUN', day: 51, time: '21:00', icon: <Sun size={16}/> },
    { type: 'CLOUDY', day: 52, time: '18:00', icon: <CloudLightning size={16}/> },
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

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);
    if (profile.balance < amount) return setTransferStatus({ type: 'error', msg: 'Insufficient Funds' });
    
    const { data: recp } = await sb.from('profiles').select('id, balance').eq('id', recipientId).single();
    if (!recp) return setTransferStatus({ type: 'error', msg: 'Recipient Not Found' });

    await sb.from('profiles').update({ balance: profile.balance - amount }).eq('id', profile.id);
    await sb.from('profiles').update({ balance: recp.balance + amount }).eq('id', recipientId);
    
    await sb.from('transactions').insert([
      { profile_id: profile.id, amount: -amount, description: `Transfer to ${recipientId.substring(0,5)}` },
      { profile_id: recipientId, amount: amount, description: `From ${profile.username}` }
    ]);

    setTransferStatus({ type: 'success', msg: 'Authorized Successfully' });
    setTransferAmount(''); setRecipientId('');
    window.location.reload(); // Refresh balance
  };

  if (loading) return (
    <div style={{ background: '#0a0a0a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 className="animate-spin" color="#d4af37" size={40} />
    </div>
  );

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', color: '#f5f5dc', fontFamily: 'monospace' }}>
      
      {/* SIDEBAR NAVIGATION */}
      <aside style={{ width: '260px', background: '#0f0f0f', borderRight: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '40px 20px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sprout color="#d4af37" size={24} />
            <span style={{ letterSpacing: '4px', fontWeight: 'bold', color: '#d4af37', fontSize: '13px' }}>DAISY'S HUB</span>
          </div>
        </div>

        <nav style={{ flex: 1, paddingTop: '10px' }}>
          {[
            { id: 'hub', label: 'FIELD WORK', icon: <Tractor size={18} /> },
            { id: 'meteo', label: 'METEOROLOGY', icon: <CloudRain size={18} /> },
            { id: 'sales', label: 'MARKET PRICES', icon: <ShoppingCart size={18} /> },
            { id: 'mgmt', label: 'MANAGEMENT', icon: <Map size={18} /> },
            { id: 'insur', label: 'INSURANCE', icon: <ShieldCheck size={18} /> },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
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

        <button 
          onClick={async () => { await sb.auth.signOut(); window.location.href = '/'; }}
          style={{ padding: '20px', background: 'none', border: 'none', color: '#444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px' }}
        >
          <LogOut size={16} /> TERMINATE SESSION
        </button>
      </aside>

      {/* CONTENT AREA */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', borderBottom: '1px solid #1a1a1a', paddingBottom: '20px' }}>
          <div>
            <h2 style={{ margin: 0, letterSpacing: '5px', fontSize: '11px', color: '#555' }}>FSN_SYSTEM_NODE_01</h2>
            <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
              <span style={{ fontSize: '10px', color: '#d4af37' }}>CURRENT DAY: {envInfo.day}</span>
              <span style={{ fontSize: '10px', color: '#d4af37' }}>SEASON: {envInfo.season}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '10px', color: '#444' }}>
            OPERATOR: {profile.username.toUpperCase()} <br/>
            UID: {profile.id?.substring(0,8)}
          </div>
        </header>

        {activeTab === 'hub' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '30px' }}>
            {/* Balance Card */}
            <div style={{ background: 'rgba(212, 175, 55, 0.02)', padding: '60px', border: '1px solid #d4af37' }}>
              <p style={{ color: '#d4af37', fontSize: '10px', letterSpacing: '5px', margin: 0 }}>TOTAL OPERATOR CREDITS</p>
              <h1 style={{ fontSize: '72px', color: '#8da989', margin: '15px 0' }}>${profile.balance?.toLocaleString()}</h1>
              <div style={{ display: 'flex', gap: '15px', color: '#444', fontSize: '9px', letterSpacing: '2px' }}>
                <span style={{ border: '1px solid #222', padding: '2px 8px' }}>LVL: SENIOR</span>
                <span style={{ border: '1px solid #222', padding: '2px 8px' }}>STATUS: ONLINE</span>
              </div>
            </div>

            {/* Wire Transfer Form */}
            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '30px' }}>
              <h3 style={{ fontSize: '10px', color: '#d4af37', letterSpacing: '2px', marginBottom: '20px' }}>WIRE TRANSFER (SECURE)</h3>
              <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input placeholder="RECIPIENT OPERATOR ID" value={recipientId} onChange={e => setRecipientId(e.target.value)} style={{ background: '#000', border: '1px solid #222', padding: '15px', color: '#fff', fontSize: '12px' }} />
                <input placeholder="CREDIT AMOUNT" type="number" value={transferAmount} onChange={e => setTransferAmount(e.target.value)} style={{ background: '#000', border: '1px solid #222', padding: '15px', color: '#d4af37', fontSize: '12px' }} />
                <button style={{ background: '#d4af37', color: '#000', border: 'none', padding: '15px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '2px' }}>AUTHORIZE SEND</button>
                {transferStatus.msg && <p style={{ color: transferStatus.type === 'error' ? '#ff4d4d' : '#8da989', fontSize: '10px', textAlign: 'center' }}>{transferStatus.msg}</p>}
              </form>
            </div>
          </div>
        )}

        {activeTab === 'meteo' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#1a0f0f', border: '1px solid #ff4d4d', padding: '20px' }}>
              <p style={{ margin: 0, fontSize: '11px', color: '#ff4d4d', fontWeight: 'bold' }}>
                <Wind size={14} style={{ marginBottom: '-3px', marginRight: '8px' }}/>
                TWISTER ALERT: PREVIOUS ACTIVITY DETECTED AT COORDS (-370.1, -561.3)
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
              {weatherForecast.map((f, i) => (
                <div key={i} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#444', fontSize: '10px', marginBottom: '10px' }}>
                    <span>DAY {f.day} // {f.time}</span>
                    {f.icon}
                  </div>
                  <h4 style={{ margin: 0, color: '#d4af37' }}>{f.type}</h4>
                </div>
              ))}
            </div>

            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '25px' }}>
              <h4 style={{ fontSize: '10px', color: '#444', letterSpacing: '2px' }}>FOG DENSITY LOG</h4>
              <p style={{ fontSize: '12px' }}>Visibility: {envInfo.visibility} // Burn-off expected in {envInfo.fogEnd}</p>
            </div>
          </div>
        )}

        {activeTab === 'sales' && (
          <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#444', fontSize: '10px', borderBottom: '1px solid #1a1a1a' }}>
                  <th style={{ padding: '20px' }}>COMMODITY</th>
                  <th style={{ padding: '20px' }}>GLOBAL STOCK</th>
                  <th style={{ padding: '20px' }}>PRICE PER UNIT</th>
                  <th style={{ padding: '20px' }}>PEAK WINDOW</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((crop) => (
                  <tr key={crop.name} style={{ borderBottom: '1px solid #141414', fontSize: '12px' }}>
                    <td style={{ padding: '20px', color: '#d4af37', fontWeight: 'bold' }}>{crop.name}</td>
                    <td style={{ padding: '20px', color: '#666' }}>{crop.stock}</td>
                    <td style={{ padding: '20px' }}>${crop.price}</td>
                    <td style={{ padding: '20px', color: '#8da989' }}>{crop.peak}</td>
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
