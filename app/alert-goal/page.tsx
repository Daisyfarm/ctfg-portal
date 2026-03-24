"use client";
import { useEffect, useState } from 'react';
import { sb } from '@/db/supabase'; // Swapped from supabase to sb

export default function GoalAlert() {
  const [isReached, setIsReached] = useState(false);
  const [total, setTotal] = useState(0);
  const GOAL_TARGET = 150;

  useEffect(() => {
    // Initial Fetch
    const fetchTotal = async () => {
      const { data } = await sb.from('montana_conquest').select('sponsor_amount');
      const currentTotal = data?.reduce((sum, f) => sum + (f.sponsor_amount || 0), 0) || 0;
      setTotal(currentTotal);
      if (currentTotal >= GOAL_TARGET) setIsReached(true);
    };

    fetchTotal();

    // Real-time listener for sponsorship updates
    const channel = sb
      .channel('goal-tracking')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'montana_conquest' },
        () => {
          fetchTotal();
        }
      )
      .subscribe();

    return () => { sb.removeChannel(channel); };
  }, []);

  if (!isReached) return null;

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-transparent font-sans overflow-hidden">
      {/* Cinematic Flash Overlay */}
      <div className="absolute inset-0 bg-[#F5BD02] animate-ping opacity-20" />
      
      <div className="relative z-10 bg-black/90 border-4 border-[#F5BD02] p-12 text-center shadow-[0_0_100px_rgba(245,189,2,0.4)] animate-in zoom-in duration-700">
        <div className="flex justify-center gap-4 mb-6">
           <div className="h-1 w-12 bg-[#F5BD02] self-center" />
           <span className="text-[#F5BD02] text-xs font-black uppercase tracking-[0.6em]">Hardware Objective Secured</span>
           <div className="h-1 w-12 bg-[#F5BD02] self-center" />
        </div>

        <h1 className="text-8xl font-black italic uppercase tracking-tighter text-white mb-2">
          GOAL <span className="text-[#F5BD02]">REACHED</span>
        </h1>
        
        <p className="text-2xl font-mono font-bold text-gray-400 mb-8">
          £{total} / £{GOAL_TARGET} — SECOND MONITOR ACQUIRED
        </p>

        <div className="flex flex-col items-center">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#F5BD02] animate-bounce">
            Mission Efficiency Increased by 100%
          </div>
          
          {/* Visual Progress Bar Fixed at 100% */}
          <div className="mt-6 w-80 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#F5BD02] w-full" />
          </div>
        </div>
      </div>

      {/* Background Spark Effects */}
      <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-[#F5BD02]/20 to-transparent animate-pulse" />
      <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-transparent via-[#F5BD02]/20 to-transparent animate-pulse delay-500" />
    </div>
  );
}
