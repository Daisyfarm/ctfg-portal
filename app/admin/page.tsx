Adding an Export to CSV button is a great move for "Audit Season." It allows you to pull all your operator data into Excel or Google Sheets with one click, giving you a snapshot of the entire network's wealth.

🛠️ The Completed Admin Terminal (app/admin/page.tsx)
I’ve added the Download icon and the exportToCSV function. This will grab every user's ID, Username, and Balance, format it into a spreadsheet file, and trigger a download in your browser.

TypeScript
"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { ShieldAlert, Plus, Minus, Search, Loader2, User, Download } from 'lucide-react';

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

  // --- NEW: EXPORT FUNCTION ---
  const exportToCSV = () => {
    const headers = ["User ID", "Username", "Balance"];
    const rows = users.map(u => [u.id, u.username, u.balance || 0]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `daisy_network_audit_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const adjustBalance = async (u: any, isDeposit: boolean) => {
    const rawAmount = amounts[u.id] || "0";
    const amount = parseFloat(rawAmount);
    if (isNaN(amount) || amount <= 0) return alert("Enter a valid amount.");

    const change = isDeposit ? amount : -amount;
    const newBalance = (u.balance || 0) + change;
    
    await sb.from('profiles').update({ balance: newBalance }).eq('id', u.id);
    await sb.from('transactions').insert([{ 
      profile_id: u.id, 
      amount: change, 
      description: isDeposit ? "Bank Credit" : "Bank Debit" 
    }]);

    setAmounts({ ...amounts, [u.id]: '' });
    loadUsers(); 
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
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #d4af37', paddingBottom: '20px', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d4af37', marginBottom: '5px' }}>
              <ShieldAlert size={20} />
              <span style={{ fontSize: '10px', letterSpacing: '3px' }}>SYSTEM AUDIT ACTIVE</span>
            </div>
            <h1 style={{ letterSpacing: '5px', margin: 0, fontSize: '24px' }}>BANKING TERMINAL</h1>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button 
              onClick={exportToCSV}
              style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '10px 15px', borderRadius: '2px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Download size={14} /> EXPORT LEDGER
            </button>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '12px', top: '12px', color: '#555' }} />
              <input 
                type="text" 
                placeholder="Filter..." 
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: '#111', border: '1px solid #333', padding: '10px 10px 10px 35px', color: '#fff', borderRadius: '2px', width: '200px' }}
              />
            </div>
          </div>
        </div>

        {/* User Rows */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {filteredUsers.map((u) => (
            <div key={u.id} style={{ background: 'rgba(20,20,20,0.5)', border: '1px solid #222', padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <User size={24} color="#d4af37" />
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#eee' }}>{u.username}</h3>
                  <p style={{ margin: 0, color: '#8da989', fontSize: '20px', fontWeight: 'bold' }}>
                    ${(u.balance || 0).toLocaleString()}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '10px', top: '10px', color: '#444', fontSize: '14px' }}>$</span>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    value={amounts[u.id] || ''}
                    onChange={(e) => setAmounts({ ...amounts, [u.id]: e.target.value })}
                    style={{ background: '#000', border: '1px solid #444', color: '#d4af37', padding: '10px 10px 10px 25px', width: '120px', borderRadius: '2px' }}
                  />
                </div>
                <button onClick={() => adjustBalance(u, true)} style={{ background: '#8da989', color: '#000', border: 'none', padding: '10px 15px', cursor: 'pointer', fontWeight: 'bold' }}>
                  <Plus size={18} />
                </button>
                <button onClick={() => adjustBalance(u, false)} style={{ background: '#ff4d4d', color: '#000', border: 'none', padding: '10px 15px', cursor: 'pointer', fontWeight: 'bold' }}>
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
