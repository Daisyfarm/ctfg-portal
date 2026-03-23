"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { 
  LogOut, Sprout, Landmark, Loader2, History, 
  ArrowUpRight, ArrowDownLeft, Send, UserCircle, 
  Trophy, Tractor, FileText, ShieldCheck, ClipboardList, ShoppingCart, Settings
} from 'lucide-react';

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hub');
  
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
    await sb.from('profiles').update({ balance: profile.balance - amount }).eq('id', profile.id);
    const { data: recp } = await sb.from('profiles').select('balance').eq('id', recipientId).single();
    if (!recp) return setTransferStatus({ type: 'error', msg: 'Recipient ID Not Found' });
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

  const navItems = [
    { id: 'hub', label: 'FIELD WORK', icon: <Tractor size={18} /> },
    { id: 'mgmt', label: 'MANAGEMENT', icon: <Settings size={18} /> },
    { id: 'sales', label: 'CROP SALES', icon: <ShoppingCart size={18} /> },
    { id: 'insur', label: 'CROP INSURANCE', icon: <ShieldCheck size={18} /> },
    { id: 'permits', label: 'PERMITS', icon: <FileText size={18} /> },
    { id: 'tasks', label: 'TASK MGMT', icon: <ClipboardList size={18} /> },
  ];

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', color: '#f5f5dc', fontFamily: 'serif' }}>
      
      {/* SIDEBAR (Matches Image 1 & 2) */}
      <aside style={{ width: '260px', background: '#111', borderRight: '1px solid #d4af37', display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
        <div style={{ padding: '0 20px 30px 20px', textAlign: 'center' }}>
          <Sprout color="#d4af37" size={30} />
          <p style={{ letterSpacing: '3px', fontSize: '12px', color: '#d4af37', marginTop: '10px' }}>DAISY'S HUB</p>
        </div>

        {navItems.map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 25px', 
              background: activeTab === item.id ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
              border: 'none', color: activeTab === item.id ? '#d4af37' : '#666',
              cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', fontSize: '11px', letterSpacing: '1px',
              transition: '0.3s', borderLeft: activeTab === item.id ? '4px solid #d4af37' : '4px solid transparent'
            }}
          >
            {item.icon} {item.label}
          </button>
        ))}

        <button 
          onClick={() => sb.auth.signOut().then(() => window.location.href = '/')}
          style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 25px', background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '11px' }}
        >
          <LogOut size={18} /> LOGOUT
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, padding: '40px' }}>
        {/* Top Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', marginBottom: '40px' }}>
          <button onClick={() => window.location.href='/leaderboard'} style={{ background: '#d4af37', border: 'none', color: '#000', padding: '10px 20px', cursor: 'pointer', borderRadius: '2px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trophy size={14} /> LEADERBOARD
          </button>
        </div>

        {activeTab === 'hub' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
            {/* Balance & Transfer */}
            <div>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '50px', border: '1px solid #d4af37', position: 'relative', marginBottom: '30px' }}>
                <p style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '4px', margin: '0' }}>TOTAL ASSETS</p>
                <h1 style={{ fontSize: '72px', color: '#8da989', margin: '10px 0' }}>${profile.balance?.toLocaleString()}</h1>
                <Landmark size={80} style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.1 }} />
              </div>

              <div style={{ background: 'rgba(15, 15, 15, 0.8)', border: '1px solid #222', padding: '30px' }}>
                <h3 style={{ fontSize: '12px', letterSpacing: '2px', color: '#d4af37', marginBottom: '20px' }}>CREDIT TRANSFER</h3>
                <form onSubmit={handleTransfer} style={{ display: 'flex', gap: '10px' }}>
                  <input placeholder="RECIPIENT ID" value={recipientId} onChange={e => setRecipientId(e.target.value)} style={{ background: '#000', border: '1px solid #333', padding: '12px', color: '#fff', flex: 1 }} />
                  <input placeholder="AMOUNT" type="number" value={transferAmount} onChange={e => setTransferAmount(e.target.value)} style={{ background: '#000', border: '1px solid #333', padding: '12px', color: '#d4af37', flex: 1 }} />
                  <button style={{ background: '#d4af37', border: 'none', padding: '0 30px', fontWeight: 'bold', cursor: 'pointer' }}>SEND</button>
                </form>
                {transferStatus.msg && <p style={{ color: transferStatus.type === 'error' ? '#ff4d4d' : '#8da989', fontSize: '11px', marginTop: '10px' }}>{transferStatus.msg}</p>}
              </div>
            </div>

            {/* Sidebar Stats */}
            <aside>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #222', padding: '25px', marginBottom: '20px' }}>
                <p style={{ fontSize: '10px', color: '#555', marginBottom: '15px' }}>OPERATOR</p>
                <h3 style={{ margin: 0, color: '#d4af37' }}>{profile.username?.toUpperCase()}</h3>
                <p style={{ fontSize: '10px', color: '#333', marginTop: '10px' }}>ID: {profile.id}</p>
              </div>
              <div style={{ background: '#000', border: '1px solid #111', padding: '20px' }}>
                <h4 style={{ fontSize: '10px', color: '#d4af37', marginBottom: '15px' }}>RECENT HISTORY</h4>
                {transactions.map(t => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #111', fontSize: '11px' }}>
                    <span style={{ color: '#555' }}>{t.description}</span>
                    <span style={{ color: t.amount > 0 ? '#8da989' : '#ff4d4d' }}>{t.amount > 0 ? '+' : ''}{t.amount}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        )}

        {activeTab !== 'hub' && (
          <div style={{ padding: '100px', textAlign: 'center', border: '1px dashed #222' }}>
            <p style={{ color: '#444', letterSpacing: '5px' }}>SYSTEM UNDER MAINTENANCE</p>
            <p style={{ fontSize: '10px', marginTop: '10px', color: '#222' }}>ACCESS DENIED FOR {activeTab.toUpperCase()}</p>
          </div>
        )}
      </main>
    </div>
  );
}
