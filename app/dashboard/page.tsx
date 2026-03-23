"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { 
  LogOut, Sprout, Landmark, Loader2, History, 
  ArrowUpRight, ArrowDownLeft, Send, Trophy, 
  Tractor, FileText, ShieldCheck, ClipboardList, 
  ShoppingCart, Settings, AlertTriangle, CheckCircle, Map
} from 'lucide-react';

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hub');
  
  // Field Management Data (Mock data based on reference images)
  const [fields] = useState([
    { id: 'F-101', crop: 'WHEAT', status: 'GROWING', yield: 'N/A' },
    { id: 'F-204', crop: 'CORN', status: 'READY', yield: '180 BU/AC' },
    { id: 'F-302', crop: 'SOYBEANS', status: 'HARVESTED', yield: '55 BU/AC' },
  ]);

  // Transfer States
  const [recipientId, setRecipientId] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferStatus, setTransferStatus] = useState({ type: '', msg: '' });

  const fetchData = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) { window.location.href = '/'; return; }
    const { data: pData } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
    setProfile(pData || { username: 'Operator', balance: 0 });
    const { data: tData } = await sb.from('transactions').select('*').eq('profile_id', user.id).order('created_at', { ascending: false }).limit(5);
    setTransactions(tData || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);
    if (profile.balance < amount) return setTransferStatus({ type: 'error', msg: 'Insufficient Funds' });
    const { data: recp } = await sb.from('profiles').select('balance').eq('id', recipientId).single();
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
    <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', color: '#f5f5dc', fontFamily: 'serif' }}>
      
      {/* SIDEBAR */}
      <aside style={{ width: '260px', background: '#0f0f0f', borderRight: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '40px 20px', borderBottom: '1px solid #1a1a1a', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sprout color="#d4af37" size={24} />
            <span style={{ letterSpacing: '4px', fontWeight: 'bold', color: '#d4af37', fontSize: '14px' }}>DAISY'S HUB</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[
            { id: 'hub', label: 'FIELD WORK', icon: <Tractor size={18} /> },
            { id: 'mgmt', label: 'MANAGEMENT', icon: <Map size={18} /> },
            { id: 'sales', label: 'CROP SALES', icon: <ShoppingCart size={18} /> },
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
                borderLeft: activeTab === item.id ? '3px solid #d4af37' : '3px solid transparent'
              }}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ margin: 0, letterSpacing: '5px', fontSize: '14px', color: '#555' }}>
            DAISY_OS / {activeTab.toUpperCase()}
          </h2>
        </div>

        {/* --- TAB: FIELD WORK (Main Stats) --- */}
        {activeTab === 'hub' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
            <div style={{ background: 'rgba(212, 175, 55, 0.02)', padding: '60px', border: '1px solid #d4af37' }}>
              <p style={{ color: '#d4af37', fontSize: '10px', letterSpacing: '5px', margin: 0 }}>OPERATOR ASSETS</p>
              <h1 style={{ fontSize: '72px', color: '#8da989', margin: '15px 0' }}>${profile.balance?.toLocaleString()}</h1>
            </div>
            
            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '25px' }}>
              <p style={{ fontSize: '10px', color: '#444', letterSpacing: '2px', marginBottom: '15px' }}>WIRE TRANSFER</p>
              <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input placeholder="RECIPIENT ID" value={recipientId} onChange={e => setRecipientId(e.target.value)} style={{ background: '#000', border: '1px solid #222', padding: '12px', color: '#fff' }} />
                <input placeholder="AMOUNT" type="number" value={transferAmount} onChange={e => setTransferAmount(e.target.value)} style={{ background: '#000', border: '1px solid #222', padding: '12px', color: '#d4af37' }} />
                <button style={{ background: '#d4af37', color: '#000', border: 'none', padding: '12px', fontWeight: 'bold', cursor: 'pointer' }}>SEND CREDITS</button>
              </form>
            </div>
          </div>
        )}

        {/* --- TAB: MANAGEMENT (Field List) --- */}
        {activeTab === 'mgmt' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 style={{ fontSize: '12px', letterSpacing: '2px', marginBottom: '20px' }}>ACTIVE FIELD INVENTORY</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px', background: '#111', padding: '15px', color: '#444', fontSize: '10px', letterSpacing: '2px' }}>
              <span>FIELD ID</span><span>CROP TYPE</span><span>STATUS</span><span>EST. YIELD</span>
            </div>
            {fields.map(field => (
              <div key={field.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px', background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '20px', alignItems: 'center' }}>
                <span style={{ color: '#d4af37', fontWeight: 'bold' }}>{field.id}</span>
                <span>{field.crop}</span>
                <span style={{ color: field.status === 'READY' ? '#8da989' : '#555' }}>{field.status}</span>
                <span>{field.yield}</span>
              </div>
            ))}
          </div>
        )}

        {/* --- TAB: CROP SALES (Maintenance) --- */}
        {activeTab === 'sales' && (
          <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '60px', textAlign: 'center' }}>
            <AlertTriangle color="#d4af37" size={32} style={{ marginBottom: '15px' }} />
            <h2 style={{ letterSpacing: '3px' }}>EXPORT CENTER OFFLINE</h2>
            <p style={{ color: '#666', fontSize: '12px' }}>SYSTEM UNDERGOING SCHEDULED PRICING UPDATES.</p>
          </div>
        )}

        {/* --- TAB: CROP INSURANCE (Agencies) --- */}
        {activeTab === 'insur' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {['FSN NETWORK', 'FIREBIRD PROTECTION'].map(name => (
              <div key={name} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0 }}>{name}</h4>
                  <p style={{ fontSize: '10px', color: '#444', marginTop: '5px' }}>CLICK FOR COVERAGE DETAILS</p>
                </div>
                <button style={{ background: 'none', border: '1px solid #d4af37', color: '#d4af37', padding: '10px', fontSize: '10px' }}>VIEW POLICY</button>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
