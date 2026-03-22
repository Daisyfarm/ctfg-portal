"use client";
import { useEffect, useState } from 'react';
import { sb } from '@/lib/supabase'; 
import { CheckCircle2, XCircle, Clock, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function AdminBank() {
  const [reqs, setReqs] = useState<any[]>([]);
  const [ld, setLd] = useState(true);

  // 1. LOAD ALL PENDING SYNC REQUESTS
  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    const { data: profile } = await sb.from('profiles').select('rank').eq('id', user?.id).single();
    
    if (profile?.rank !== 'Admin') return window.location.href = '/dashboard';

    const { data } = await sb.from('transactions')
      .select('*, profiles(username, balance)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
      
    setReqs(data || []);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  // 2. APPROVE OR DENY HANDLER
  const handleAction = async (id: string, userId: string, amount: number, currentBalance: number, action: 'completed' | 'denied') => {
    if (action === 'completed') {
      // Subtract money from Portal Balance
      const newBalance = currentBalance - amount;
      await sb.from('profiles').update({ balance: newBalance }).eq('id', userId);
    }

    // Update Transaction Status
    const { error } = await sb.from('transactions').update({ status: action }).eq('id', id);

    if (!error) {
      alert(`Request ${action.toUpperCase()}`);
      load(); // Refresh the list
    }
  };

  if (ld) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>ACCESSING SECURE TERMINAL...</div>;

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <button onClick={() => window.location.href = '/dashboard'} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', display: 'flex', alignItems:'center', gap:'8px', marginBottom:'20px' }}>
          <ArrowLeft size={16} /> RETURN TO PERIMETER
        </button>

        <div style={{ display:'flex', alignItems:'center', gap:'15px', borderBottom:'2px solid #dc2626', paddingBottom:'20px', marginBottom:'40px' }}>
          <ShieldAlert size={32} color="#dc2626" />
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing:'1px' }}>BANKING AUTHORITY TERMINAL</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {reqs.map(r => (
            <div key={r.id} style={{ background: '#111', border: '1px solid #222', padding: '25px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: 0, fontSize: '10px', color: '#555', fontWeight: 'bold' }}>OPERATOR</p>
                <p style={{ margin: '5px 0', fontSize: '18px', fontWeight: 'bold' }}>{r.profiles?.username}</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#22c55e' }}>Portal Bal: ${r.profiles?.balance?.toLocaleString()}</p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '10px', color: '#555', fontWeight: 'bold' }}>SYNC REQUEST</p>
                <p style={{ margin: '5px 0', fontSize: '24px', fontWeight: 'bold', color: '#eab308' }}>${r.amount?.toLocaleString()}</p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => handleAction(r.id, r.user_id, r.amount, r.profiles.balance, 'completed')} 
                  style={{ background: '#22c55e', color: '#000', border: 'none', padding: '12px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  APPROVE & SYNC
                </button>
                <button 
                  onClick={() => handleAction(r.id, r.user_id, r.amount, r.profiles.balance, 'denied')} 
                  style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  DENY
                </button>
              </div>
            </div>
          ))}

          {reqs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', border: '2px dashed #222', borderRadius: '8px' }}>
              <Clock size={40} color="#222" style={{ marginBottom: '10px' }} />
              <p style={{ color: '#444', fontSize: '14px' }}>No pending sync requests in the queue.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
