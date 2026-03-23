"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { 
  LogOut, Sprout, Landmark, Loader2, History, 
  ArrowUpRight, ArrowDownLeft, Send, UserCircle, 
  Save, CheckCircle2, AlertCircle, Trophy 
} from 'lucide-react';

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Transfer States
  const [recipientId, setRecipientId] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferStatus, setTransferStatus] = useState({ type: '', msg: '' });

  // Profile States
  const [newUsername, setNewUsername] = useState('');
  const [profileStatus, setProfileStatus] = useState({ type: '', msg: '' });

  const fetchData = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) { window.location.href = '/'; return; }

    const { data: pData } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
    setProfile(pData || { username: 'Operator', balance: 0 });
    setNewUsername(pData?.username || '');

    const { data: tData } = await sb.from('transactions')
      .select('*').eq('profile_id', user.id).order('created_at', { ascending: false }).limit(5);
    setTransactions(tData || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);
    if (profile.balance < amount) return setTransferStatus({ type: 'error', msg: 'Insufficient Funds' });

    // Deduct & Add
    await sb.from('profiles').update({ balance: profile.balance - amount }).eq('id', profile.id);
    const { data: recp } = await sb.from('profiles').select('balance').eq('id', recipientId).single();
    
    if (!recp) return setTransferStatus({ type: 'error', msg: 'Recipient ID Not Found' });
    await sb.from('profiles').update({ balance: recp.balance + amount }).eq('id', recipientId);

    // Log Transactions
    await sb.from('transactions').insert([
      { profile_id: profile.id, amount: -amount, description: `Sent to ${recipientId.substring(0,5)}...` },
      { profile_id: recipientId, amount: amount, description: `Received from ${profile.username}` }
    ]);

    setTransferStatus({ type: 'success', msg: 'Transfer Successful' });
    setTransferAmount(''); setRecipientId('');
    fetchData();
  };

  const handleUpdateProfile = async () => {
    const { error } = await sb.from('profiles').update({ username: newUsername }).eq('id', profile.id);
    if (error) setProfileStatus({ type: 'error', msg: 'Update Failed' });
    else { setProfileStatus({ type: 'success', msg: 'Identity Updated' }); fetchData(); }
  };

  if (loading) return (
    <div style={{ background: '#0a0a0a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 className="animate-spin" color="#d4af37" size={40} />
    </div>
  );

  return (
    <div style={{ 
      background: '#0a0a0a', minHeight: '100vh', color: '#f5f5dc', fontFamily: 'serif',
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.97)), url("/image_1451a7.jpg")',
      backgroundSize: 'cover', backgroundAttachment: 'fixed'
    }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 40px', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sprout color="#d4af37" size={24} />
          <span style={{ letterSpacing: '3px', fontWeight: 'bold', color: '#d4af37' }}>DAISY'S HUB</span>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button onClick={() => window.location.href='/leaderboard'} style={{ background: 'none', border: '1px solid #d4af37', color: '#d4af37', padding: '8px 15px', cursor: 'pointer', borderRadius: '4px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Trophy size={14} /> LEADERBOARD
          </button>
          <button onClick={() => sb.auth.signOut().then(() => window.location.href = '/')} style={{ background: 'none', border: '1px solid #333', color: '#666', padding: '8px 15px', cursor: 'pointer', borderRadius: '4px', fontSize: '11px' }}>
            LOGOUT
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        
        {/* Left Column: Money & Transfers */}
        <section>
          {/* Balance Card */}
          <div style={{ background: 'rgba(20, 20, 20, 0.9)', padding: '40px', border: '1px solid #d4af37', marginBottom: '30px', position: 'relative' }}>
            <p style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '4px', margin: '0 0 10px 0' }}>TOTAL ASSETS</p>
            <h1 style={{ fontSize: '64px', color: '#8da989', margin: 0 }}>${profile.balance?.toLocaleString()}</h1>
            <Landmark size={80} style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.1 }} />
          </div>

          {/* Transfer Box */}
          <div style={{ background: 'rgba(15, 15, 15, 0.8)', border: '1px solid #222', padding: '30px', marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Send size={18} color="#d4af37" />
              <h3 style={{ margin: 0, fontSize: '13px', letterSpacing: '2px' }}>TRANSFER CREDITS</h3>
            </div>
            <form onSubmit={handleTransfer} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px' }}>
              <input placeholder="RECIPIENT ID" value={recipientId} onChange={e => setRecipientId(e.target.value)} style={{ background: '#000', border: '1px solid #333', padding: '12px', color: '#fff' }} />
              <input placeholder="AMOUNT" type="number" value={transferAmount} onChange={e => setTransferAmount(e.target.value)} style={{ background: '#000', border: '1px solid #333', padding: '12px', color: '#d4af37' }} />
              <button style={{ background: '#d4af37', border: 'none', padding: '0 20px', fontWeight: 'bold', cursor: 'pointer' }}>SEND</button>
            </form>
            {transferStatus.msg && <p style={{ color: transferStatus.type === 'error' ? '#ff4d4d' : '#8da989', fontSize: '11px', marginTop: '10px' }}>{transferStatus.msg}</p>}
          </div>

          {/* Activity List */}
          <div style={{ background: 'rgba(15, 15, 15, 0.8)', border: '1px solid #222', padding: '30px' }}>
            <h3 style={{ fontSize: '12px', letterSpacing: '2px', color: '#d4af37', marginBottom: '20px' }}>RECENT ACTIVITY</h3>
            {transactions.map(t => (
              <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #1a1a1a' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {t.amount > 0 ? <ArrowUpRight color="#8da989" size={16} /> : <ArrowDownLeft color="#ff4d4d" size={16} />}
                  <div>
                    <p style={{ margin: 0, fontSize: '13px' }}>{t.description}</p>
                    <p style={{ margin: 0, fontSize: '9px', color: '#555' }}>{new Date(t.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <span style={{ color: t.amount > 0 ? '#8da989' : '#ff4d4d' }}>{t.amount > 0 ? '+' : ''}{t.amount}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Profile & Info */}
        <aside>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #222', padding: '25px', marginBottom: '20px' }}>
            <p style={{ fontSize: '10px', color: '#555', marginBottom: '15px' }}>IDENTITY MANAGEMENT</p>
            <input value={newUsername} onChange={e => setNewUsername(e.target.value)} style={{ background: '#000', border: '1px solid #333', padding: '10px', color: '#fff', width: '100%', marginBottom: '10px' }} />
            <button onClick={handleUpdateProfile} style={{ width: '100%', background: '#333', color: '#fff', border: 'none', padding: '10px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>UPDATE CODENAME</button>
            {profileStatus.msg && <p style={{ fontSize: '10px', color: '#8da989', marginTop: '10px', textAlign: 'center' }}>{profileStatus.msg}</p>}
          </div>

          <div style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.2)', padding: '25px' }}>
            <p style={{ fontSize: '10px', color: '#d4af37', marginBottom: '5px' }}>NETWORK ID</p>
            <code style={{ fontSize: '11px', wordBreak: 'break-all', color: '#8da989' }}>{profile.id}</code>
            <p style={{ fontSize: '9px', color: '#444', marginTop: '10px' }}>Share this ID to receive transfers from other operators.</p>
          </div>
        </aside>

      </main>
    </div>
  );
}
