"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { LogOut, Sprout, Landmark, Loader2, History, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) {
        window.location.href = '/';
        return;
      }

      // 1. Fetch Profile
      const { data: profileData } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
      setProfile(profileData || { username: 'Operator', balance: 0 });

      // 2. Fetch Transactions (Assumes you have a 'transactions' table)
      const { data: transData } = await sb
        .from('transactions')
        .select('*')
        .eq('profile_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
      
      setTransactions(transData || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return (
    <div style={{ background: '#0a0a0a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 className="animate-spin" color="#d4af37" size={40} />
    </div>
  );

  return (
    <div style={{ 
      background: '#0a0a0a', 
      minHeight: '100vh', 
      color: '#f5f5dc', 
      fontFamily: 'serif',
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.96)), url("/image_1451a7.jpg")',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    }}>
      {/* Top Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 40px', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sprout color="#d4af37" size={24} />
          <span style={{ letterSpacing: '3px', fontWeight: 'bold', color: '#d4af37' }}>DAISY'S HUB</span>
        </div>
        <button onClick={() => sb.auth.signOut().then(() => window.location.href = '/')} style={{ background: 'none', border: '1px solid #333', color: '#666', padding: '8px 15px', cursor: 'pointer', borderRadius: '4px', fontSize: '12px' }}>
          DISCONNECT
        </button>
      </nav>

      <main style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* Balance Card */}
        <div style={{ background: 'rgba(20, 20, 20, 0.9)', padding: '40px', border: '1px solid #d4af37', marginBottom: '30px', position: 'relative' }}>
          <p style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '4px', margin: '0 0 10px 0' }}>CURRENT ASSETS</p>
          <h1 style={{ fontSize: '64px', color: '#8da989', margin: 0 }}>
            <span style={{ fontSize: '28px', marginRight: '5px' }}>$</span>
            {profile?.balance?.toLocaleString()}
          </h1>
          <div style={{ position: 'absolute', top: '20px', right: '20px', color: '#222' }}>
            <Landmark size={80} />
          </div>
        </div>

        {/* Transaction History */}
        <div style={{ background: 'rgba(15, 15, 15, 0.8)', border: '1px solid #222', padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>
            <History size={18} color="#d4af37" />
            <h3 style={{ margin: 0, fontSize: '14px', letterSpacing: '2px', color: '#d4af37' }}>RECENT ACTIVITY</h3>
          </div>

          {transactions.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {transactions.map((t) => (
                <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a1a1a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {t.amount > 0 ? <ArrowUpRight color="#8da989" size={20} /> : <ArrowDownLeft color="#ff4d4d" size={20} />}
                    <div>
                      <p style={{ margin: 0, fontSize: '14px' }}>{t.description || 'Network Transaction'}</p>
                      <p style={{ margin: 0, fontSize: '10px', color: '#555' }}>{new Date(t.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span style={{ color: t.amount > 0 ? '#8da989' : '#ff4d4d', fontWeight: 'bold' }}>
                    {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#444', fontSize: '13px', padding: '20px' }}>No recent ledger entries found.</p>
          )}
        </div>

      </main>
    </div>
  );
}
