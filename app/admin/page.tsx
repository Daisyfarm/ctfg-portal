"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/db/supabase';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [fields, setFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  // This matches the variable you set in Vercel
  const MASTER_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "change_me_in_vercel";

  useEffect(() => {
    if (isAuthorized) {
      fetchFields();
    }
  }, [isAuthorized]);

  async function fetchFields() {
    const { data } = await supabase
      .from('montana_conquest')
      .select('*')
      .order('field_number', { ascending: true });
    if (data) setFields(data);
    setLoading(false);
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === MASTER_PASSWORD) {
      setIsAuthorized(true);
    } else {
      alert("UNAUTHORIZED ACCESS DETECTED.");
    }
  };

  async function toggleOwned(id: string, currentStatus: boolean) {
    setUpdating(parseInt(id));
    const { error } = await supabase
      .from('montana_conquest')
      .update({ is_owned: !currentStatus, updated_at: new Date() })
      .eq('id', id);
    if (!error) await fetchFields();
    setUpdating(null);
  }

  async function updateSponsor(id: string, name: string) {
    await supabase.from('montana_conquest').update({ sponsor_name: name }).eq('id', id);
    setFields(fields.map(f => f.id === id ? { ...f, sponsor_name: name } : f));
  }

  // --- LOCK SCREEN ---
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 font-mono">
        <div className="max-w-sm w-full border border-red-900/30 bg-red-900/5 p-8 text-center shadow-2xl">
          <div className="w-12 h-12 bg-red-600 mx-auto mb-6 flex items-center justify-center rounded-full animate-pulse">
            <span className="text-black font-black">!</span>
          </div>
          <h2 className="text-white font-black uppercase tracking-widest mb-2">Restricted Access</h2>
          <p className="text-[10px] text-gray-500 uppercase mb-8">Daisy Hill Tactical Command Only</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="ENTER ENCRYPTION KEY" 
              className="w-full bg-black border border-white/10 p-3 text-center text-sm outline-none focus:border-red-600 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-white text-black font-black py-3 uppercase text-xs hover:bg-red-600 hover:text-white transition-colors">
              Authorize
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD (Only visible after login) ---
  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-10 font-sans antialiased">
      <header className="mb-10 flex justify-between items-center border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-black uppercase italic tracking-tighter">
            Command <span className="text-[#F5BD02]">Center</span>
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Status: Authorized</p>
        </div>
        <button onClick={() => setIsAuthorized(false)} className="text-[10px] font-mono text-red-500 uppercase border border-red-500/20 px-3 py-1 hover:bg-red-500 hover:text-white transition-all">
          Logout
        </button>
      </header>

      <div className="overflow-x-auto bg-white/[0.02] border border-white/5 rounded-sm">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-white/5 uppercase text-[9px] text-gray-400 tracking-widest">
            <tr>
              <th className="p-4">Field #</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4">Sponsor Name</th>
              <th className="p-4 text-right">Last Sync</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {fields.map((field) => (
              <tr key={field.id} className="hover:bg-white/[0.01]">
                <td className="p-4 font-black text-lg">#{field.field_number}</td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => toggleOwned(field.id, field.is_owned)}
                    className={`px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-tighter ${
                      field.is_owned ? 'bg-green-600' : 'bg-white/5 text-gray-500'
                    }`}
                  >
                    {field.is_owned ? 'Captured' : 'Neutral'}
                  </button>
                </td>
                <td className="p-4">
                  <input 
                    type="text" 
                    defaultValue={field.sponsor_name || ""}
                    onBlur={(e) => updateSponsor(field.id, e.target.value)}
                    className="bg-black/40 border border-white/10 rounded-sm px-3 py-2 w-full text-white placeholder:text-gray-800 focus:border-[#F5BD02] outline-none"
                    placeholder="None"
                  />
                </td>
                <td className="p-4 text-right opacity-30 italic">
                  {field.updated_at ? new Date(field.updated_at).toLocaleTimeString() : '--:--'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
