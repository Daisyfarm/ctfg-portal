import { supabase } from '@/db/supabase';

export default async function Overlay() {
  // 1. Fetch the data to keep it in sync with the site
  const { data: fields } = await supabase
    .from('montana_conquest')
    .select('is_owned');

  const ownedCount = fields?.filter((f: any) => f.is_owned).length || 0;

  // 2. Your Survival Goal (Keep these matched to your Home Page)
  const goalCurrent = 12; 
  const goalTarget = 150;
  const progress = ((goalCurrent / goalTarget) * 100).toFixed(1);

  return (
    <div className="p-4 w-[350px] font-sans bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
      {/* Goal Header */}
      <div className="flex justify-between items-end mb-2">
        <span className="text-[10px] text-[#F5BD02] font-black uppercase tracking-widest">Monitor Fund</span>
        <span className="text-[10px] text-white font-mono leading-none">£{goalCurrent} / £{goalTarget}</span>
      </div>

      {/* Goal Bar */}
      <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden border border-white/5 mb-4">
        <div 
          className="h-full bg-[#F5BD02] shadow-[0_0_10px_rgba(245,189,2,0.5)] transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Field Conquest Mini-Stat */}
      <div className="flex items-center justify-between border-t border-white/5 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[9px] text-gray-400 uppercase font-bold">Montana Conquest</span>
        </div>
        <span className="text-xs font-mono text-white font-bold">{ownedCount} / 122</span>
      </div>
    </div>
  );
}
