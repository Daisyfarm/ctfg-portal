"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { ShieldAlert, ArrowUpCircle, ArrowDownCircle, Search, Loader2, User } from 'lucide-react';

export default function AdminBank() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    const { data } = await sb.from('profiles').select('*').order('username', { ascending: true });
    if (data) setUsers(data);
    setLoading(false);
  };

  useEffect(() => { loadUsers(); }, []);

  const adjustBalance = async (u: any, amount: number) => {
    const newBalance = (u.balance || 0) + amount;
    
    // 1. Update Profile Balance
    await sb.from('profiles').update({ balance: newBalance }).eq('id', u.id);

    // 2. Log the Transaction for the User's History
    await sb.from('transactions').insert([{ 
      profile_id: u.id, 
      amount: amount, 
      description: amount > 0 ? "Bank Deposit" : "Bank Withdrawal" 
    }]);

    loadUsers(); // Refresh UI
  };

  const filteredUsers = users.filter(u => 
    u.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div style={{background:'#0a0a0a', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}><Loader2 className="animate-spin" color="#d4af37"/></div>;

  return (
    <div style={{ background: '#050505', minHeight: '100vh', color: '#fff', padding: '40px', fontFamily: 'serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #d4af37', paddingBottom: '20px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <ShieldAlert color="#d4af37" size={28} />
            <h1 style={{ letterSpacing: '4px', margin: 0, fontSize: '20px' }}>CENTRAL BANK TERMINAL</h1>
          </div>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#555' }} />
            <input 
              type="text" 
              placeholder="Search Operators..." 
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ background: '#111', border: '1px solid #333', padding: '8px 10px 8px 35px', color: '#fff', borderRadius: '4px', fontSize: '13px' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: '15px' }}>
          {filteredUsers.map((u) => (
            <div key={u.id} style={{ background: '#111', border: '1px solid #222', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: '#1a1a1a', padding: '10px', borderRadius: '50%', border: '1px solid #333' }}>
                  <User size={20} color="#d4af37" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px' }}>{u.username}</h3>
                  <p style={{ margin: 0, color: '#8da989', fontWeight: 'bold' }}>${(u.balance || 0).toLocaleString()}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => adjustBalance(u, 1000)} style={{ background: 'transparent', border: '1px solid #8da989', color: '#8da989', padding: '8px 15px', cursor: 'pointer', borderRadius: '4px', fontSize: '12px' }}>
                  + DEPOSIT $1K
                </button>
                <button onClick={() => adjustBalance(u, -1000)} style={{ background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '8px 15px', cursor: 'pointer', borderRadius: '4px', fontSize: '12px' }}>
                  - WITHDRAW $1K
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
