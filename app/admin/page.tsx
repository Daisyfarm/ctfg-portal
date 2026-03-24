"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/db/supabase';

export default function AdminDashboard() {
  const [fields, setFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  // 1. Load all fields on mount
  useEffect(() => {
    fetchFields();
  }, []);

  async function fetchFields() {
    const { data } = await supabase
      .from('montana_conquest')
      .select('*')
      .order('field_number', { ascending: true });
    if (data) setFields(data);
    setLoading(false);
  }

  // 2. Toggle Owned Status
  async function toggleOwned(id: string, currentStatus: boolean) {
    setUpdating(parseInt(id));
    const { error } = await supabase
      .from('montana_conquest')
      .update({ is_owned: !currentStatus, updated_at: new Date() })
      .eq('id', id);
    
    if (!error) await fetchFields();
    setUpdating(null);
  }

  // 3. Update Sponsor Name
  async function updateSponsor(id: string, name: string) {
    const { error } = await supabase
      .from('montana_conquest')
      .update({ sponsor_name: name })
      .eq('id', id);
    
    if (!error) {
      // Soft update local state so we don't have to refetch everything
      setFields(fields.map(f => f.id === id ? { ...f, sponsor_name: name } : f));
    }
  }

  if (loading) return <div className="p-10 bg-black text-[#F5BD02] font-mono">INITIALIZING SYSTEM...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-10 font-sans antialiased">
      
      <header className="mb-10 flex justify-between items-center border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-black uppercase italic tracking-tighter">
            Command <span className="text-[#F5BD02]">Center</span>
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Single-Monitor Field Management</p>
        </div>
        <div className="text-right text-[10px] font-mono">
          <p className="text-green-500 uppercase">System: Online</p>
          <p className="text-gray-600">GTX 1660 Super Optimization Active</p>
        </div>
      </header>

      {/* TABLE SECTION */}
      <div className="overflow-x-auto bg-white/[0.02] border border-white/5 rounded-sm">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-white/5 uppercase text-[9px] text-gray-400 tracking-widest">
            <tr>
              <th className="p-4">Field #</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4">Sponsor / Benefactor</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {fields.map((field) => (
              <tr key={field.id} className="hover:bg-white/[0.01] transition-colors">
                <td className="p-4 font-black text-lg text-white">#{field.field_number}</td>
                
                <td className="p-4 text-center">
                  <button 
                    onClick={() => toggleOwned(field.id, field.is_owned)}
                    disabled={updating === field.id}
                    className={`px-3 py-1 rounded-sm text-[9px] font-black uppercase tracking-tighter transition-all ${
                      field.is_owned 
                      ? 'bg-green-600 text-white' 
                      : 'bg-white/5 text-gray-500 hover:bg-white/10'
                    }`}
                  >
                    {updating === field.id ? 'Updating...' : field.is_owned ? 'Captured' : 'Neutral'}
                  </button>
                </td>

                <td className="p-4">
                  <input 
                    type="text" 
                    defaultValue={field.sponsor_name || ""}
                    placeholder="No Sponsor"
                    onBlur={(e) => updateSponsor(field.id, e.target.value)}
                    className="bg-black/40 border border-white/10 rounded-sm px-3 py-2 w-full text-white placeholder:text-gray-700 focus:border-[#F5BD02] outline-none transition-colors"
                  />
                </td>

                <td className="p-4 text-right">
                   <span className="text-[9px] text-gray-600 italic">
                     Last Update: {field.updated_at ? new Date(field.updated_at).toLocaleDateString() : 'Never'}
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="mt-10 opacity-20 text-[8px] font-mono uppercase tracking-[0.5em] text-center">
        Daisy Hill Tactical • Admin Access Only • © 2026
      </footer>
    </div>
  );
}
