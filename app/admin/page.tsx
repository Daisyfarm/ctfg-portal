"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { Plus, Minus, Search, Loader2, Download, ShieldCheck } from 'lucide-react';

export default function AdminBank() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [amounts, setAmounts] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    const { data } = await sb.from('profiles').select('*').order('username', { ascending: true });
    if (data) setUsers(data);
    setLoading(false);
  };

  useEffect(() => { loadUsers(); }, []);

  const exportToCSV = () => {
    const headers = ["User ID", "Username", "Balance"];
    const rows = users.map(u => [u.id, u.username, u.balance || 0]);
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "daisys_audit.csv");
    link.click();
  };

  const adjustBalance = async (u: any, isDeposit: boolean) => {
    const amount = parseFloat(amounts[u.id] || "0");
    if (isNaN(amount) || amount <= 0) return alert("Enter valid amount");
    const change = isDeposit ? amount : -amount;
    
    // Update Profile
    const { error } = await sb.from('profiles').update({ balance: (u.balance || 0) + change }).eq('id', u.id);
    
    if (error) {
      alert("Error updating balance: " + error.message);
    } else {
      // Log the Admin action in transactions
      await sb.from('transactions').insert([{ 
        profile_id: u.id, 
        amount: change, 
        description: `Admin Adjustment: ${isDeposit ? 'Deposit' : 'Withdrawal'}` 
      }]);
      setAmounts({ ...amounts, [u.id]: '' });
      loadUsers();
    }
  };

  if (loading) return (
    <div style={{background:'#050505', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <Loader2 className="animate-spin" color="#d4af37" size={40} />
    </div>
  );

  return (
    <div style={{ background: '#050505', minHeight: '100vh', color: '#fff', padding: '40px', fontFamily: 'serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', borderBottom: '1px solid #d4af37', paddingBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <ShieldCheck color="#d4af37" size={32} />
            <h1 style={{ letterSpacing: '5px', margin: 0 }}>CENTRAL BANKING TERMINAL</h1>
          </div>
          <button onClick={exportToCSV} title="Export Ledger" style={{ background: 'none', border: '1px solid #d4af37', color: '#d4af37', padding: '10px 20px', cursor: 'pointer', borderRadius: '4px', fontSize: '11px' }}>
            <Download size={16} /> EXPORT CSV
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', marginBottom: '30px' }}>
          <Search size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: '#444' }} />
          <input 
            type="text" 
            placeholder="SEARCH OPERATOR BY CODENAME..." 
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ background: '#111', border: '1px solid #222', padding: '15px 15px 15px 45px', color: '#fff', width: '100%', borderRadius: '4px', letterSpacing: '1px' }}
          />
        </div>

        {/* User List */}
        {users.filter(u => u.username?.toLowerCase().includes(searchTerm.toLowerCase())).map(u => (
          <div key={u.id} style={{ 
            background: 'rgba(255,255,255,0.02)', border: '1px solid #1a1a1a', padding: '20px', 
            marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderRadius: '4px'
          }}>
            <div>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#d4af37' }}>{u.username?.toUpperCase() || 'UNKNOWN'}</p>
              <p style={{ margin: 0, fontSize: '10px', color: '#555' }}>ID: {u.id.substring(0,18)}...</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '18px', color: '#8da989' }}>${u.balance?.toLocaleString()}</p>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: '#444' }}>ADJUST:</span>
              <input 
                type="number" 
                placeholder="0.00"
                value={amounts[u.id] || ''} 
                onChange={e => setAmounts({...amounts, [u.id]: e.target.value})} 
                style={{ background: '#000', border: '1px solid #333', color: '#d4af37', width: '100px', padding: '10px', textAlign: 'right' }} 
              />
              <button 
                onClick={() => adjustBalance(u, true)} 
                style={{ background: '#8da989', color: '#000', border: 'none', padding: '10px 15px', cursor: 'pointer', borderRadius: '2px' }}
              >
                <Plus size={16}/>
              </button>
              <button 
                onClick={() => adjustBalance(u, false)} 
                style={{ background: '#ff4d4d', color: '#000', border: 'none', padding: '10px 15px', cursor: 'pointer', borderRadius: '2px' }}
              >
                <Minus size={16}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
