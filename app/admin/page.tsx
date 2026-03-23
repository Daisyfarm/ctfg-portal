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

  const exportToCSV = () => {
    const headers = ["User ID", "Username", "Balance"];
    const rows = users.map(u => [u.id, u.username, u.balance || 0]);
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "audit_ledger.csv");
    link.click();
  };

  const adjustBalance = async (u: any, isDeposit: boolean) => {
    const amount = parseFloat(amounts[u.id] || "0");
    if (isNaN(amount) || amount <= 0) return alert("Enter valid amount");
    const change = isDeposit ? amount : -amount;
    await sb.from('profiles').update({ balance: (u.balance || 0) + change }).eq('id', u.id);
    await sb.from('transactions').insert([{ profile_id: u.id, amount: change, description: "Admin Adjustment" }]);
    setAmounts({ ...amounts, [u.id]: '' });
    loadUsers();
  };

  if (loading) return <div style={{background:'#050505', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}><Loader2 className="animate-spin" color="#d4af37" size={40} /></div>;

  return (
    <div style={{ background: '#050505', minHeight: '100vh', color: '#fff', padding: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', borderBottom: '1px solid #d4af37', paddingBottom: '20px' }}>
          <h1 style={{ letterSpacing: '5px' }}>BANKING TERMINAL</h1>
          <button onClick={exportToCSV} style={{ background: 'none', border: '1px solid #d4af37', color: '#d4af37', padding: '10px', cursor: 'pointer' }}><Download size={16} /></button>
        </div>
        {users.filter(u => u.username?.toLowerCase().includes(searchTerm.toLowerCase())).map(u => (
          <div key={u.id} style={{ background: '#111', padding: '20px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{u.username} (${u.balance})</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="number" value={amounts[u.id] || ''} onChange={e => setAmounts({...amounts, [u.id]: e.target.value})} style={{ background: '#000', border: '1px solid #333', color: '#fff', width: '80px' }} />
              <button onClick={() => adjustBalance(u, true)} style={{ background: '#8da989', border: 'none', padding: '5px 10px' }}><Plus size={14}/></button>
              <button onClick={() => adjustBalance(u, false)} style={{ background: '#ff4d4d', border: 'none', padding: '5px 10px' }}><Minus size={14}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
