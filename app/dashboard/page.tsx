"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { 
  LogOut, Sprout, Landmark, Loader2, History, 
  ArrowUpRight, ArrowDownLeft, Send, Trophy, 
  Tractor, FileText, ShieldCheck, ClipboardList, 
  ShoppingCart, Settings, AlertTriangle, CheckCircle
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
    const { data: tData } = await sb.from('transactions').select('*').eq('profile_id', user.id).order('created_at', { ascending: false }).limit(8);
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
            { id: 'sales', label: 'CROP SALES', icon: <ShoppingCart size={18} /> },
            { id: 'insur', label: 'CROP INSURANCE', icon: <ShieldCheck size={18} /> },
            { id: 'permits', label: 'PERMITS', icon: <FileText size={18} /> },
            { id: 'tasks', label: 'TASK MGMT', icon: <ClipboardList size={18} /> },
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

        <button 
          onClick={() => sb.auth.signOut().then(() => window.location.href = '/')}
          style={{ marginTop: 'auto', padding: '25px', background: 'transparent', border: 'none', color: '#333', cursor: 'pointer', fontSize: '11px', letterSpacing: '2px', textAlign: 'left' }}
        >
          <LogOut size={16} style={{ marginRight: '10px' }} /> LOGOUT
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h2 style={{ margin: 0, letterSpacing: '5px', fontSize: '14px', color: '#555' }}>
              SYSTEM / {activeTab.toUpperCase()}
            </h2>
          </div>
          <button onClick={() => window.location.href='/leaderboard'} style={{ background: 'none', border: '1px solid #d4af37', color: '#d4af37', padding: '10px 20px', cursor: 'pointer', fontSize: '11px', letterSpacing: '2px' }}>
            <Trophy size={14} style={{ marginBottom: '-3px', marginRight: '8px' }} /> HALL OF HARVEST
          </button>
        </div>

        {/* --- TAB: FIELD WORK (Dashboard) --- */}
        {activeTab === 'hub' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
            <div>
              <div style={{ background: 'rgba(212, 175, 55, 0.02)', padding: '60px', border: '1px solid #d4af37', position: 'relative', marginBottom: '30px' }}>
                <p style={{ color: '#d4af37', fontSize: '10px', letterSpacing: '5px', margin: 0 }}>OPERATOR ASSETS</p>
                <h1 style={{ fontSize: '72px', color: '#8da989', margin: '15px 0', fontFamily: 'serif' }}>
                  ${profile.balance?.toLocaleString()}
                </h1>
                <Landmark size={100} style={{ position: 'absolute', bottom: '20px', right: '20px', opacity: 0.03 }} />
              </div>

              <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
                  <Send size={16} color="#d4af37" />
                  <span style={{ fontSize: '12px', letterSpacing: '2px' }}>WIRE TRANSFER</span>
                </div>
                <form onSubmit={handleTransfer} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px' }}>
                  <input placeholder="RECIPIENT ID" value={recipientId} onChange={e => setRecipientId(e.target.value)} style={{ background: '#000', border: '1px solid #222', padding: '15px', color: '#fff' }} />
                  <input placeholder="AMOUNT" type="number" value={transferAmount} onChange={e => setTransferAmount(e.target.value)} style={{ background: '#000', border: '1px solid #222', padding: '15px', color: '#d4af37' }} />
                  <button style={{ background: '#d4af37', color: '#000', border: 'none', padding: '0 30px', fontWeight: 'bold', cursor: 'pointer' }}>INITIATE</button>
                </form>
                {transferStatus.msg && <p style={{ color: transferStatus.type === 'error' ? '#ff4d4d' : '#8da989', fontSize: '10px', marginTop: '15px', letterSpacing: '1px' }}>{transferStatus.msg.toUpperCase()}</p>}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '25px' }}>
                <p style={{ fontSize: '10px', color: '#444', letterSpacing: '2px', marginBottom: '15px' }}>OPERATOR CODENAME</p>
                <h3 style={{ margin: 0, color: '#d4af37', letterSpacing: '2px' }}>{profile.username?.toUpperCase()}</h3>
                <div style={{ marginTop: '20px', padding: '10px', background: '#000', border: '1px solid #222', fontSize: '10px', color: '#333', wordBreak: 'break-all' }}>
                  UID: {profile.id}
                </div>
              </div>

              <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '25px' }}>
                <p style={{ fontSize: '10px', color: '#444', letterSpacing: '2px', marginBottom: '15px' }}>RECENT LOGS</p>
                {transactions.map(t => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #1a1a1a', fontSize: '11px' }}>
                    <span style={{ color: '#666' }}>{t.description.toUpperCase()}</span>
                    <span style={{ color: t.amount > 0 ? '#8da989' : '#ff4d4d', fontWeight: 'bold' }}>
                      {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: CROP SALES (Matches Image 4) --- */}
        {activeTab === 'sales' && (
          <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '60px', textAlign: 'center' }}>
            <div style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid #d4af37', padding: '30px', maxWidth: '600px', margin: '0 auto' }}>
              <AlertTriangle color="#d4af37" size={32} style={{ marginBottom: '15px' }} />
              <h2 style={{ letterSpacing: '3px', margin: '0 0 10px 0' }}>EXPORT CENTER OFFLINE</h2>
              <p style={{ color: '#666', fontSize: '12px', lineHeight: '1.6' }}>
                SORRY OPERATOR. THE EXPORT CENTER IS TEMPORARILY CLOSED FOR MAINTENANCE. CHECK BACK SOON FOR UPDATED MARKET PRICES!
              </p>
            </div>
          </div>
        )}

        {/* --- TAB: CROP INSURANCE (Matches Image 5) --- */}
        {activeTab === 'insur' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {[
              { name: 'FSN NETWORK', credit: 700, color: '#8da989' },
              { name: 'FIREBIRD PROTECTION', credit: 600, color: '#ff4d4d' },
              { name: 'B&B INSURANCE', credit: 600, color: '#d4af37' }
            ].map(agency => (
              <div key={agency.name} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', letterSpacing: '1px' }}>{agency.name}</h4>
                  <p style={{ margin: 0, fontSize: '10px', color: '#444' }}>MINIMUM CREDIT: {agency.credit}</p>
                </div>
                <button style={{ background: 'none', border: '1px solid #d4af37', color: '#d4af37', padding: '8px 15px', fontSize: '10px', cursor: 'pointer' }}>GET QUOTE</button>
              </div>
            ))}
          </div>
        )}

        {/* --- OTHER TABS --- */}
        {['permits', 'tasks'].includes(activeTab) && (
          <div style={{ padding: '60px', textAlign: 'center', border: '1px dashed #1a1a1a' }}>
            <p style={{ color: '#222', letterSpacing: '10px', fontSize: '18px' }}>DATA_ENCRYPTED</p>
            <p style={{ color: '#444', fontSize: '11px', marginTop: '10px' }}>SELECT AN AUTHORIZED TERMINAL TO VIEW THESE RECORDS.</p>
          </div>
        )}

      </main>
    </div>
  );
}
