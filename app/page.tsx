"use client";

import { useEffect, useState } from 'react';
import { sb } from '@/db/supabase';

export default function Home() {
  const [fields, setFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFields = async () => {
      const { data } = await sb
        .from('montana_conquest')
        .select('*')
        .order('field_number', { ascending: true });
      if (data) setFields(data);
      setLoading(false);
    };
    fetchFields();
  }, []);

  async function handleFieldClick(fieldNumber: number, currentStatus: boolean) {
    const { error } = await sb
      .from('montana_conquest')
      .update({ is_owned: !currentStatus, updated_at: new Date().toISOString() })
      .eq('field_number', fieldNumber);

    if (!error) {
      setFields(prev => prev.map(f => 
        f.field_number === fieldNumber ? { ...f, is_owned: !currentStatus } : f
      ));
    }
  }

  const ownedCount = fields.filter((f: any) => f.is_owned).length || 0;
  const progressPercentage = ((ownedCount / 122) * 100).toFixed(1);
  const totalRaised = fields?.reduce((sum, f) => sum + (f.sponsor_amount || 0), 0) || 0;

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#F5BD02] font-black italic text-3xl">LOADING...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black italic mb-8">DAISY HILL <span className="text-[#F5BD02]">FARMS</span></h1>
        
        <div className="bg-white/5 p-6 rounded-sm mb-12 border border-white/10">
          <p className="text-[#F5BD02] font-bold uppercase tracking-widest text-xs mb-2">Total Conquest</p>
          <p className="text-6xl font-black italic">{progressPercentage}%</p>
          <div className="w-full bg-white/10 h-2 mt-4">
            <div className="bg-[#F5BD02] h-full" style={{ width: `${progressPercentage}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 gap-2">
          {fields.map((field: any) => (
            <button 
              key={field.field_number}
              onClick={() => handleFieldClick(field.field_number, field.is_owned)}
              className={`aspect-square flex items-center justify-center text-[10px] font-bold border transition-all ${
                field.is_owned 
                ? 'bg-[#2D5A27] border-[#2D5A27] text-white shadow-lg' 
                : 'bg-transparent border-white/10 text-gray-700 hover:border-white/40'
              }`}
            >
              {field.field_number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
