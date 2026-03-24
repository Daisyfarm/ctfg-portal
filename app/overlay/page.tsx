import { supabase } from '@/db/supabase';

export default async function Overlay() {
  // 1. Fetch live data from your Supabase DB
  const { data: fields } = await supabase
    .from('montana_conquest')
    .select('is_owned');

  const ownedCount = fields?.filter((f: any) => f.is_owned).length || 0;

  // 2. Your Survival Goal (Update 'goalCurrent' when you get a tip)
  const goalName = "Monitor Fund";
  const goalCurrent = 12; 
  const goalTarget = 150;
  const progressPercentage = ((goalCurrent / goalTarget) * 100).toFixed(1);

  return (
    // The h-screen/w-screen ensures the background stays transparent in Streamlabs
    <div className="h-screen w-screen bg-transparent p-4 font-sans antialiased">
      
      {/* THE HUD BOX */}
      <div className="w-[320px] bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-2xl">
        
        {/* TOP ROW: GOAL INFO */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F5BD02]">
            {goalName}
          </span>
          <span className="text-xs font-mono font-bold text-white">
            £{goalCurrent} <span className="text-gray-500 text-[10px]">/ £{goalTarget}</span>
          </span>
        </div>

        {/* PROGRESS BAR */}
        <div className="relative w-full h-3 bg-white/5 rounded-full border border-white/5 overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-[#F5BD02] to-[#ffda5c] transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(245,189,2,0.4)]"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* BOTTOM ROW: CONQUEST STATS */}
        <div className="flex items-center justify-between border-t border-white/5 pt-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
              Montana 4X Progress
            </span>
          </div>
          <span className="text-sm font-mono font-black text-white italic">
            {ownedCount}<span className="text-[10px] text-gray-600 not-italic">/122</span>
          </span>
        </div>

      </div>

      {/* SUBTLE BRANDING (Bottom corner of the HUD) */}
      <div className="mt-1 ml-1">
        <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em]">
          Daisy Hill Tactical Systems
        </p>
      </div>
    </div>
  );
}
