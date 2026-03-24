"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/db/supabase';

export default function Home() {
  const [fields, setFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Load Data
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

  // 2. Update Function (The "Click" Logic)
  async function handleFieldClick(fieldNumber: number, currentStatus: boolean) {
    const { error } = await supabase
      .from('montana_conquest')
      .update({ is_owned: !currentStatus, updated_at: new Date().toISOString() })
      .eq('field_number', fieldNumber);

    if (!error) {
      // Update the UI immediately without a full page reload
      setFields(prev => prev.map(f => 
        f.field_number === fieldNumber ? { ...f, is_owned: !currentStatus } : f
      ));
    }
  }

  const ownedCount = fields.filter((f: any) => f.is_owned).length || 0;
  const progressPercentage = ((ownedCount / 122) * 100).toFixed(1);

  // Survival Goal Data
  const goalCurrent = 12; 
  const goalTarget = 150;
  const goalProgress = ((goalCurrent / goalTarget) * 100).toFixed(1);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#F5BD02] font-black tracking-tighter text-3xl italic">LOADING INTEL...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F5BD02] selection:text-black relative overflow-x-hidden">
      
      {/* BACKGROUND IMAGE OVERLAY */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <img 
          src="/hero-bg.jpg" 
          alt="Montana Landscape" 
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      {/* SURVIVAL GOAL TOP BAR */}
      <div className="bg-[#F5BD02] text-black py-1.5 px-4 text-center font-black text-[10px] uppercase tracking-[0.3em] z-[60] relative shadow-xl">
        MISSION CRITICAL: SECOND MONITOR FUND — £{goalCurrent} / £{goalTarget} ({goalProgress}%)
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
            <a href="https://youtube.com/@DaisyHillFarms" className="bg-white text-black px-5 py-2.5 rounded-sm font-black uppercase text-xs hover:bg-[#F5BD02] transition-all transform hover:-translate-y-0.5">
              YT LIVE
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* DASHBOARD GRID */}
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
              <div className="h-full bg-gradient-to-r from-[#2D5A27] to-[#F5BD02]" style={{ width: `${progressPercentage}%` }} />
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-sm p-6 backdrop-blur-md">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#F5BD02] mb-4">Latest Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-bold text-gray-300 italic uppercase">System State</span>
                <span className="text-[9px] font-mono text-green-500 uppercase">Live & Interactive</span>
              </div>
            </div>
          </div>
        </div>

        {/* 122-FIELD GRID */}
        <section className="mb-20">
          <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 mb-8 flex items-center gap-4">
            Tactical Map (Click to Toggle) <div className="h-px flex-1 bg-white/10"></div>
          </h3>
          <div className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 xl:grid-cols-[repeat(15,minmax(0,1fr))] gap-2">
            {fields.map((field: any) => (
              <button 
                key={field.field_number}
                onClick={() => handleFieldClick(field.field_number, field.is_owned)}
                className={`aspect-square flex items-center justify-center text-[10px] font-mono font-bold border transition-all duration-300 transform active:scale-90 ${
                  field.is_owned 
                  ? 'bg-[#2D5A27] border-[#2D5A27] text-white shadow-[0_0_15px_rgba(45,90,39,0.3)]' 
                  : 'bg-transparent border-white/10 text-gray-700 hover:border-white/40 hover:text-white'
                }`}
              >
                {field.field_number}
              </button>
            ))}
          </div>
        </section>

        {/* BOTTOM INTEL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="p-6 bg-white/[0.02] border border-white/5">
            <h4 className="text-[10px] font-black text-[#F5BD02] uppercase mb-4 tracking-widest">Active Fleet</h4>
            <ul className="text-xs font-mono space-y-2 text-gray-400">
              <li>JD 3650 (Primary Power)</li>
              <li>Claas Lexion 8900 (Harvest)</li>
              <li>MAN TGS 18.510 (Logistics)</li>
            </ul>
          </div>
          <div className="p-6 bg-white/[0.02] border border-white/5">
            <h4 className="text-[10px] font-black text-[#F5BD02] uppercase mb-4 tracking-widest">Rig Optimization</h4>
            <ul className="text-xs font-mono space-y-2 text-gray-400">
              <li>Ryzen 5 3600 (Stable)</li>
              <li>GTX 1660 Super (60FPS Cap)</li>
            </ul>
          </div>
          <div className="p-6 bg-gradient-to-br from-[#F5BD02]/10 to-transparent border border-[#F5BD02]/20">
            <h4 className="text-[10px] font-black text-[#F5BD02] uppercase mb-4 tracking-widest italic">The Seed Fund</h4>
            <a href="https://streamelements.com/daisyhillfarms/tip" className="block text-center py-2 bg-[#F5BD02] text-black text-[10px] font-black uppercase tracking-tighter hover:bg-white transition-colors">
              CONTRIBUTE
            </a>
          </div>
        </div>

        <footer className="py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
          <p className="text-[9px] font-mono tracking-widest uppercase">© 2026 DAISY HILL FARMS • MONTANA CONQUEST</p>
        </footer>
      </main>
    </div>
  );
}
