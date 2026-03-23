"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { ShieldAlert, Plus, Minus, Search, Loader2, User, Landmark } from 'lucide-react';

export default function AdminBank() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [amounts, setAmounts] = useState<{[key: string]: string}>({}); // Tracks input per user
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    const { data } = await sb.from('profiles').select('*').order('username', { ascending: true });
    if (data) setUsers(data);
    setLoading(false);
  };

  useEffect(() => { loadUsers(); }, []);

  const adjustBalance = async (u: any, isDeposit: boolean) => {
    const rawAmount = amounts[u.id] || "0";
    const amount = parseFloat(rawAmount);
    
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid positive number.");
      return;
    }

    const change = isDeposit ? amount : -amount;
    const newBalance = (u.balance || 0) + change;
    
    // 1. Update Profile Balance
    const { error: pError } = await sb.from('profiles').update({ balance: newBalance }).eq('id', u.id);

    // 2. Log Transaction
    const { error: tError } = await sb.from('transactions').insert([{ 
      profile_id: u.id, 
      amount: change, 
      description: isDeposit ? "Administrative Credit" : "Administrative Debit" 
    }]);

    if (pError || tError) {
      alert("Transaction failed. Check database columns.");
    } else {
      setAmounts({ ...amounts, [u.id]: '' }); // Clear input
      loadUsers(); 
    }
  };

  const filteredUsers = users.filter(u => 
    u.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div style={{background:'#050505', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <Loader2 className="animate-spin" color="#d4af37" size={40} />
    </div>
  );

  return (
    <div style={{ background: '#050505', minHeight: '100vh', color: '#fff', padding: '40px', fontFamily: 'serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #d4af37', paddingBottom: '20px', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d4af37', marginBottom: '5px' }}>
              <ShieldAlert size={20} />
              <span style={{ fontSize: '10px', letterSpacing: '3px' }}>AUTHORITY LEVEL: HIGH</span>
            </div>
            <h1 style={{ letterSpacing: '5px', margin: 0, fontSize: '24px' }}>BANKING TERMINAL</h1>
          </div>
          
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '12px', color: '#555' }} />
            <input 
              type="text" 
              placeholder="Filter Operators..." 
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ background: '#111', border: '1px solid #333', padding: '10px 10px 10px 35px', color: '#fff', borderRadius: '2px', width: '250px' }}
            />
          </div>
        </div>

        {/* User List */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {filteredUsers.map((u) => (
            <div key={u.id} style={{ background: 'rgba(20,20,20,0.5)', border: '1px solid #222', padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '4px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ border: '1px solid #333', padding: '12px', borderRadius: '2px' }}>
                  <User size={24} color="#d4af37" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#eee' }}>{u.username}</h3>
                  <p style={{ margin: 0, color: '#8da989', fontSize: '20px', fontWeight: 'bold' }}>
                    <span style={{ fontSize: '12px', color: '#555', marginRight: '5px' }}>BAL:</span>
                    ${(u.balance || 0).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '10px', top: '10px', color: '#444', fontSize: '14px' }}>$</span>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    value={amounts[u.id] || ''}
                    onChange={(e) => setAmounts({ ...amounts, [u.id]: e.target.value })}
                    style={{ background: '#000', border: '1px solid #444', color: '#d4af37', padding: '10px 10px 10px 25px', width: '120px', textAlign: 'right', borderRadius: '2px' }}
                  />
                </div>
                
                <button 
                  onClick={() => adjustBalance(u, true)}
                  style={{ background: '#8da989', color: '#000', border: 'none', padding: '10px 15px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '2px' }}
                >
                  <Plus size={18} />
                </button>
                
                <button 
                  onClick={() => adjustBalance(u, false)}
                  style={{ background: '#ff4d4d', color: '#000', border: 'none', padding: '10px 15px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '2px' }}
                >
                  <Minus size={18} />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
