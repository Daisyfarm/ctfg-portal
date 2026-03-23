"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { 
  LogOut, Sprout, Loader2, 
  ArrowUpRight, ArrowDownLeft, 
  Tractor, FileText, ShieldCheck, 
  ShoppingCart, AlertTriangle, Map,
  TrendingUp, Gauge, Info
} from 'lucide-react';

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hub');
  
  // States for Wire Transfer
  const [recipientId, setRecipientId] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferStatus, setTransferStatus] = useState({ type: '', msg: '' });

  // Data parsed from your XML
  const marketData = [
    { name: 'SOYBEAN', stock: '216,382', price: 1244, trend: 'UP', peak: 'MID_SPRING' },
    { name: 'WHEAT', stock: '300,000', price: 540, trend: 'DOWN', peak: 'EARLY_SPRING' },
    { name: 'OAT', stock: '450,000', price: 852, trend: 'UP', peak: 'EARLY_SPRING' },
    { name: 'CANOLA', stock: '150,000', price: 883, trend: 'DOWN', peak: 'EARLY_SPRING' },
    { name: 'SUNFLOWER', stock: '150,000', price: 1174, trend: 'UP', peak: 'EARLY_SPRING' },
    { name: 'POTATO', stock: '722,317', price: 211, trend: 'STABLE', peak: 'LATE_AUTUMN' },
  ];

  const fields = [
    { id: 'F-101', crop: 'WHEAT', status: 'GROWING', yield: 'N/A' },
    { id: 'F-204', crop: 'CORN', status: 'READY', yield: '180 BU/AC' },
    { id: 'F-302', crop: 'SOYBEANS', status: 'HARVESTED', yield: '55 BU/AC' },
  ];

  const fetchData = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) { window.location.href = '/'; return; }
    
    const { data: pData } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
    setProfile(pData || { username: 'Operator', balance: 0 });
    
    const { data: tData } = await sb.from('transactions')
      .select('*')
      .eq('profile_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);
    setTransactions(tData || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);
    if (profile.balance < amount) return setTransferStatus({ type: 'error', msg: 'Insufficient Funds' });
    
    const { data: recp } = await sb.from('profiles').select('id, balance').eq('id', recipientId).single();
    if (!recp) return setTransferStatus({ type: 'error', msg: 'Recipient ID Not Found' });

    await sb.from('profiles').update({ balance: profile.balance - amount }).eq('id', profile.id);
    await sb.from('profiles').update({ balance: recp.balance + amount }).eq('id', recipientId);
    
    await sb.from('transactions').insert([
      { profile_id: profile.id, amount: -amount, description: `Transfer to ${recipientId.substring(0,5)}...` },
      { profile_id: recipientId, amount: amount, description: `Received from ${profile.username}` }
    ]);

    setTransferStatus({ type: 'success', msg: 'Transfer Successful' });
    setTransferAmount(''); setRecipientId('');
    fetchData();
  };

  if (loading) return (
    <div style={{ background: '#0a0a0a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 className="animate-spin" color="#d4af37" size={40} />
    </div>
  );

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', color: '#f5f5dc', fontFamily: 'monospace' }}>
      
      {/* SIDEBAR */}
      <aside style={{ width: '280px', background: '#0f0f0f', borderRight: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '40px 20px', borderBottom: '1px solid #1a1a1a', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sprout color="#d4af37" size={24} />
            <span style={{ letterSpacing: '4px', fontWeight: 'bold', color: '#d4af37', fontSize: '14px' }}>DAISY'S HUB</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[
            { id: 'hub', label: 'FIELD WORK', icon: <Tractor size={18} /> },
            { id: 'mgmt', label: 'MANAGEMENT', icon: <Map size={18} /> },
            { id: 'sales', label: 'MARKET PRICES', icon: <ShoppingCart size={18} /> },
            { id: 'insur', label: 'CROP INSURANCE', icon: <ShieldCheck size={18} /> },
            { id: 'permits', label: 'PERMITS', icon: <FileText size={18} /> },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 25px', 
                background: activeTab === item.id ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                border: 'none', color: activeTab === item.id ? '#d4af37' : '#444',
                cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', fontSize: '11px', letterSpacing: '2px',
                borderLeft: activeTab === item.id ? '3px solid #d4af37' : '3px solid transparent',
                transition: '0.2s'
              }}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={async () => { await sb.auth.signOut(); window.location.href = '/'; }}
          style={{ marginTop: 'auto', padding: '20px', background: 'none', border: 'none', color: '#444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px' }}
        >
          <LogOut size={16} /> LOGOUT SESSION
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ margin: 0, letterSpacing: '5px', fontSize: '12px', color: '#555' }}>
            DAISY_OS // {activeTab.toUpperCase()}
          </h2>
          <div style={{ fontSize: '10px', color: '#d4af37', border: '1px solid #d4af37', padding: '4px 10px' }}>
            ID: {profile.id?.substring(0,8)}
          </div>
        </header>

        {/* TAB: FIELD WORK (Dashboard Home) */}
        {activeTab === 'hub' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
            <div style={{ background: 'rgba(212, 175, 55, 0.02)', padding: '60px', border: '1px solid #d4af37', position: 'relative' }}>
              <p style={{ color: '#d4af37', fontSize: '10px', letterSpacing: '5px', margin: 0 }}>TOTAL OPERATOR CREDITS</p>
              <h1 style={{ fontSize: '72px', color: '#8da989', margin: '15px 0' }}>${profile.balance?.toLocaleString()}</h1>
              <div style={{ display: 'flex', gap: '20px', color: '#444', fontSize: '10px', letterSpacing: '2px' }}>
                <span>RANK: SENIOR OPERATOR</span>
                <span>STATUS: ACTIVE</span>
              </div>
            </div>
            
            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '30px' }}>
              <p style={{ fontSize: '10px', color: '#d4af37', letterSpacing: '2px', marginBottom: '20px' }}>WIRE TRANSFER SYSTEM</p>
              <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input placeholder="RECIPIENT OPERATOR ID" value={recipientId} onChange={e => setRecipientId(e.target.value)} style={{ background: '#000', border: '1px solid #222', padding: '15px', color: '#fff', fontSize: '12px' }} />
                <input placeholder="CREDIT AMOUNT" type="number" value={transferAmount} onChange={e => setTransferAmount(e.target.value)} style={{ background: '#000', border: '1px solid #222', padding: '15px', color: '#d4af37', fontSize: '12px' }} />
                <button style={{ background: '#d4af37', color: '#000', border: 'none', padding: '15px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '2px' }}>AUTHORIZE SEND</button>
                {transferStatus.msg && <p style={{ color: transferStatus.type === 'error' ? '#ff4d4d' : '#8da989', fontSize: '10px', textAlign: 'center' }}>{transferStatus.msg}</p>}
              </form>
            </div>
          </div>
        )}

        {/* TAB: MANAGEMENT */}
        {activeTab === 'mgmt' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px', background: '#111', padding: '15px', color: '#444', fontSize: '10px', letterSpacing: '2px' }}>
              <span>FIELD ID</span><span>CROP TYPE</span><span>STATUS</span><span>EST. YIELD</span>
            </div>
            {fields.map(field => (
              <div key={field.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px', background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '25px', alignItems: 'center' }}>
                <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '14px' }}>{field.id}</span>
                <span style={{ fontSize: '12px' }}>{field.crop}</span>
                <span style={{ color: field.status === 'READY' ? '#8da989' : '#555', fontSize: '11px' }}>{field.status}</span>
                <span style={{ fontSize: '12px' }}>{field.yield}</span>
              </div>
            ))}
          </div>
        )}

        {/* TAB: MARKET PRICES (Integrated XML Data) */}
        {activeTab === 'sales' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'rgba(212, 175, 55, 0.05)', borderLeft: '4px solid #d4af37', padding: '20px' }}>
              <p style={{ margin: 0, fontSize: '11px', fontWeight: 'bold', color: '#d4af37' }}>
                <AlertTriangle size={14} style={{ marginBottom: '-3px', marginRight: '8px' }} />
                HIGH DEMAND ALERT: ALFALFA_WINDROW (1.4x MULTIPLIER)
              </p>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#0f0f0f', border: '1px solid #1a1a1a' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #1a1a1a', color: '#444', fontSize: '10px', letterSpacing: '2px' }}>
                  <th style={{ padding: '20px' }}>COMMODITY</th>
                  <th style={{ padding: '20px' }}>GLOBAL STOCK</th>
                  <th style={{ padding: '20px' }}>MID_SPRING PRICE</th>
                  <th style={{ padding: '20px' }}>PEAK SEASON</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '12px' }}>
                {marketData.map((crop) => (
                  <tr key={crop.name} style={{ borderBottom: '1px solid #141414' }}>
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

        {/* TAB: INSURANCE */}
        {activeTab === 'insur' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {[
              { name: 'FSN NETWORK PROTECTION', coverage: '90%', cost: 'High' },
              { name: 'FIREBIRD AG AGENCY', coverage: '75%', cost: 'Moderate' }
            ].map(agency => (
              <div key={agency.name} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '40px', textAlign: 'center' }}>
                <ShieldCheck color="#d4af37" size={32} style={{ marginBottom: '20px' }} />
                <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>{agency.name}</h3>
                <p style={{ fontSize: '10px', color: '#555', marginBottom: '20px' }}>COVERAGE: {agency.coverage}</p>
                <button style={{ background: 'none', border: '1px solid #d4af37', color: '#d4af37', padding: '10px 20px', fontSize: '10px', cursor: 'pointer' }}>FILE CLAIM</button>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
