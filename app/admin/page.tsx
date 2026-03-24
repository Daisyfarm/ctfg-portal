"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/db/supabase';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [fields, setFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  const MASTER_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "change_me_in_vercel";

  useEffect(() => {
    if (isAuthorized) fetchFields();
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
    if (password === MASTER_PASSWORD) setIsAuthorized(true);
    else alert("ACCESS DENIED.");
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

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 font-mono">
        <div className="max-w-sm w-full border border-red-900/30 bg-red-900/5 p-8 text-center shadow-2xl">
          <h2 className="text-white font-black uppercase tracking-widest mb-6">Tactical Auth</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="ENCRYPTION KEY" 
              className="w-full bg-black border border-white/10 p-4 text-center text-sm outline-none focus:border-[#F5BD02] text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-[#F5BD02] text-black font-black py-4 uppercase text-xs">Authorize</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white antialiased font-sans">
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-black uppercase italic tracking-tighter">Command <span className="text-[#F5BD02]">Center</span></h1>
          <p className="text-[8px] text-gray-500 uppercase tracking-widest">Mobile Sync Active</p>
        </div>
        <button onClick={() => setIsAuthorized(false)} className="text-[10px] text-red-500 font-bold border border-red-500/20 px-3 py-1 uppercase">Lock</button>
      </header>

      <div className="p-2 sm:p-6 space-y-3">
        {fields.map((field) => (
          <div key={field.id} className="bg-white/[0.03] border border-white/5 rounded-sm p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-black italic">#{field.field_number}</span>
              <button 
                onClick={() => toggleOwned(field.id, field.is_owned)}
                className={`px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${
                  field.is_owned ? 'bg-green-600 text-white shadow-[0_0_15px_rgba(22,163,74,0.4)]' : 'bg-white/5 text-gray-500'
                }`}
              >
                {field.is_owned ? 'Captured' : 'Neutral'}
              </button>
            </div>
            
            <div className="relative">
              <span className="absolute -top-2 left-2 bg-[#050505] px-1 text-[8px] text-gray-500 uppercase tracking-widest">Benefactor</span>
              <input 
                type="text" 
                defaultValue={field.sponsor_name || ""}
                onBlur={(e) => updateSponsor(field.id, e.target.value)}
                className="w-full bg-transparent border border-white/10 rounded-sm px-3 py-3 text-xs text-white focus:border-[#F5BD02] outline-none"
                placeholder="Assign Sponsor..."
              />
            </div>
          </div>
        ))}
      </div>
      
      <footer className="p-10 opacity-20 text-[8px] font-mono uppercase tracking-[0.5em] text-center">
        Daisy Hill Tactical • v1.2 Mobile-Ready
      </footer>
    </div>
  );
}
