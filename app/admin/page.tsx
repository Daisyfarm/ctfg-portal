"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; // Using the @ alias we set up
import { ShieldAlert, ArrowUpCircle, ArrowDownCircle, Users, Loader2 } from 'lucide-react';

export default function AdminBank() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch all users from the DB
  const loadUsers = async () => {
    const { data } = await sb.from('profiles').select('*').order('username', { ascending: true });
    if (data) setUsers(data);
    setLoading(false);
  };

  useEffect(() => { loadUsers(); }, []);

  // 2. Function to update balance
  const adjustBalance = async (userId: string, currentBalance: number, amount: number) => {
    const newBalance = currentBalance + amount;
    const { error } = await sb
      .from('profiles')
      .update({ balance: newBalance })
      .eq('id', userId);

    if (error) alert("Error updating balance");
    else loadUsers(); // Refresh the list
  };

  if (loading) return <div style={{background:'#111', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}><Loader2 className="animate-spin" color="#d4af37"/></div>;

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', padding: '40px', fontFamily: 'serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '2px solid #d4af37', paddingBottom: '20px', marginBottom: '30px' }}>
        <ShieldAlert color="#d4af37" size={32} />
        <h1 style={{ letterSpacing: '3px', margin: 0 }}>CENTRAL BANK AUTHORITY</h1>
      </div>

      <div style={{ display: 'grid', gap: '15px' }}>
        {users.map((u) => (
          <div key={u.id} style={{ background: '#1a1a1a', border: '1px solid #333', padding: '20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#d4af37', fontSize: '12px', margin: 0 }}>OPERATOR</p>
              <h3 style={{ margin: '5px 0' }}>{u.username}</h3>
              <span style={{ color: '#8da989', fontWeight: 'bold', fontSize: '20px' }}>${u.balance?.toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => adjustBalance(u.id, u.balance, 1000)}
                style={{ background: '#222', border: '1px solid #8da989', color: '#8da989', padding: '10px', cursor: 'pointer', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <ArrowUpCircle size={18} /> +$1k
              </button>
              <button 
                onClick={() => adjustBalance(u.id, u.balance, -1000)}
                style={{ background: '#222', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '10px', cursor: 'pointer', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <ArrowDownCircle size={18} /> -$1k
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
