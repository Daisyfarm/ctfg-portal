"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/db/supabase';

export default function Home() {
  const [fields, setFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  async function handleFieldClick(fieldNumber: number, currentStatus: boolean) {
    const { error } = await supabase
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

  // Survival Goal Data
  const goalTarget = 150;
  const goalProgress = ((totalRaised / goalTarget) * 100).toFixed(1);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-[#F5BD02] font-black tracking-tighter text-3xl italic">
        LOADING INTEL...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F5BD02] selection:text-black relative overflow-x-hidden antialiased">
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 opacity-15 pointer-events-none">
        <img 
          src="/hero-bg.jpg" 
          alt="Montana Landscape" 
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      {/* SURVIVAL GOAL TOP BAR */}
      <div className="bg-[#F5BD02] text-black py-1.5 px-4 text-center font-black text-[10px] uppercase tracking-[0.3em] z-[60] relative shadow-xl">
        MISSION CRITICAL: SECOND MONITOR FUND — £{totalRaised} / £{goalTarget} ({goalProgress}%)
        <div className="absolute bottom-0 left-0 h-[3px] bg-black/10 w-full">
          <div className="h-full bg-black/40" style={{ width: `${goalProgress}%` }}></div>
        </div>
      </div>

      <header className="border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-[28px] z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Daisy Hill Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase italic leading-none">
                DAISY HILL <span className="text-[#F5BD02]">FARMS</span>
              </h1>
              <p className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.4em] mt-1">Montana Simulation Division</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:block text-right">
              <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Efficiency Rating</p>
              <p className="text-xl font-mono font-bold text-green-500">OPTIMIZED</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-sm p-8 backdrop-blur-md">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">Total Conquest</h2>
                <p className="text-5xl font-black italic tracking-tighter text-[#F5BD02]">{progressPercentage}%</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase font-bold">Fields Owned</p>
                <p className="text-2xl font-mono font-bold">{ownedCount} <span className="text-gray-700">/ 122</span></p>
              </div>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-[#F5BD02]" style={{ width: `${progressPercentage}%` }} />
            </div>
          </div>
        </div>

        <section className="mb-20">
          <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 mb-8 flex items-center gap-4">
            Tactical Map <div className="h-px flex-1 bg-white/10"></div>
          </h3>
          <div className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 xl:grid-cols-[repeat(15,minmax(0,1fr))] gap-2">
            {fields.map((field: any) => (
              <button 
                key={field.field_number}
                onClick={() => handleFieldClick(field.field_number, field.is_owned)}
                className={`aspect-square flex items-center justify-center text-[10px] font-mono font-bold border transition-all duration-300 ${
                  field.is_owned 
                  ? 'bg-[#2D5A27] border-[#2D5A27] text-white shadow-[0_0_15px_rgba(45,90,39,0.3)]' 
                  : 'bg-transparent border-white/10 text-gray-700 hover:border-white/40'
                }`}
              >
                {field.field_number}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
