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
  const MONITOR_GOAL = 150;

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
    else alert("UNAUTHORIZED.");
  };

  async function updateField(id: string, updates: any) {
    const { error } = await supabase.from('montana_conquest').update(updates).eq('id', id);
    if (!error) {
      setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
    }
  }

  // Financial Calculations
  const totalEarnings = fields.reduce((sum, f) => sum + (Number(f.sponsor_amount) || 0), 0);
  const remaining = Math.max(0, MONITOR_GOAL - totalEarnings);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 font-mono">
        <form onSubmit={handleLogin} className="max-w-sm w-full border border-red-900/30 bg-red-900/5 p-8 text-center">
          <h2 className="text-white font-black uppercase tracking-widest mb-6">Command Auth</h2>
          <input 
            type="password" 
            className="w-full bg-black border border-white/10 p-4 mb-4 text-center text-white outline-none focus:border-[#F5BD02]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="ACCESS KEY"
          />
          <button className="w-full bg-[#F5BD02] text-black font-black py-4 uppercase text-xs">Authorize</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans antialiased">
      
      {/* FINANCIAL OVERLAY - STICKY TOP */}
      <div className="sticky top-0 z-50 bg-black/95 border-b border-white/10 backdrop-blur-md">
        <div className="max-w-5xl mx-auto p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
             <div className="text-left">
                <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest">Total Revenue</p>
                <p className="text-2xl font-black italic text-[#F5BD02]">£{totalEarnings}</p>
             </div>
             <div className="h-8 w-px bg-white/10 mx-2" />
             <div className="text-left">
                <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest">Remaining Goal</p>
                <p className="text-2xl font-black italic text-white">£{remaining}</p>
             </div>
          </div>
          <button onClick={() => setIsAuthorized(false)} className="text-[9px] font-mono text-red-500 border border-red-500/20 px-4 py-2 uppercase">Log Out</button>
        </div>
        {/* Progress bar */}
        <div className="w-full h-1 bg-white/5">
          <div className="h-full bg-[#F5BD02] transition-all duration-1000" style={{ width: `${(totalEarnings / MONITOR_GOAL) * 100}%` }} />
        </div>
      </div>

      <main className="max-w-5xl mx-auto p-4 sm:p-8 space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="bg-white/[0.03] border border-white/5 p-5 rounded-sm flex flex-col sm:flex-row items-center gap-6">
            
            <div className="flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-1 min-w-[80px]">
              <span className="text-3xl font-black italic">#{field.field_number}</span>
              <button 
                onClick={() => updateField(field.id, { is_owned: !field.is_owned, updated_at: new Date() })}
                className={`text-[9px] font-black uppercase px-2 py-1 rounded-sm ${field.is_owned ? 'bg-green-600 text-white' : 'bg-white/10 text-gray-500'}`}
              >
                {field.is_owned ? 'Captured' : 'Neutral'}
              </button>
            </div>

            <div className="flex-1 w-full space-y-4">
              <div className="relative">
                <span className="absolute -top-2 left-2 bg-[#050505] px-1 text-[8px] text-gray-500 uppercase font-bold">Sponsor Name</span>
                <input 
                  type="text" 
                  defaultValue={field.sponsor_name || ""}
                  onBlur={(e) => updateField(field.id, { sponsor_name: e.target.value })}
                  className="w-full bg-transparent border border-white/10 p-3 text-sm focus:border-[#F5BD02] outline-none rounded-sm"
                  placeholder="Anonymous"
                />
              </div>
            </div>

            <div className="w-full sm:w-32 relative">
              <span className="absolute -top-2 left-2 bg-[#050505] px-1 text-[8px] text-gray-500 uppercase font-bold">Amount (£)</span>
              <input 
                type="number" 
                defaultValue={field.sponsor_amount || 0}
                onBlur={(e) => updateField(field.id, { sponsor_amount: Number(e.target.value) })}
                className="w-full bg-transparent border border-white/10 p-3 text-sm text-[#F5BD02] font-mono focus:border-[#F5BD02] outline-none rounded-sm"
              />
            </div>

          </div>
        ))}
      </main>

      <footer className="p-20 text-center opacity-20 text-[8px] font-mono uppercase tracking-[0.5em]">
        Daisy Hill Tactical • Financial Suite v1.3
      </footer>
    </div>
  );
}
