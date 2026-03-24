import { supabase } from '@/db/supabase';

export default async function Home() {
  // 1. Fetch the conquest data from Supabase
  const { data: fields, error } = await supabase
    .from('montana_conquest')
    .select('*')
    .order('field_number', { ascending: true });

  if (error) {
    console.error('Error fetching fields:', error);
  }

  // 2. Calculate Stats
  const ownedCount = fields?.filter((f: any) => f.is_owned).length || 0;
  const totalFields = 122;
  const progressPercentage = ((ownedCount / totalFields) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#F5BD02] selection:text-black">
      
      {/* HEADER SECTION */}
      <header className="border-b border-white/10 bg-[#0f0f0f]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase italic flex items-center gap-2">
                <span className="text-[#F5BD02]">Daisy Hill</span> Farms
              </h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Montana Borderline Conquest</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Land Captured</p>
              <p className="text-2xl font-mono font-bold text-[#F5BD02]">{ownedCount}<span className="text-gray-600 text-sm">/122</span></p>
            </div>
            <a 
              href="https://youtube.com/@DaisyHillFarms" 
              className="bg-[#F5BD02] text-black px-6 py-2 rounded font-black uppercase text-sm hover:bg-white transition-all hover:scale-105 active:scale-95"
            >
              Watch Live
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* PROGRESS DASHBOARD */}
        <section className="mb-16">
          <div className="bg-[#111] border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-end mb-4 relative z-10">
              <h2 className="text-xl font-bold uppercase tracking-tight">Total Conquest</h2>
              <span className="text-[#F5BD02] font-mono font-bold text-2xl">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden border border-white/5 relative z-10">
              <div 
                className="h-full bg-gradient-to-r from-[#2D5A27] to-[#F5BD02] transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(245,189,2,0.3)]"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5BD02]/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
          </div>
        </section>

        {/* 122-FIELD GRID */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Field Registry</h3>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
            {fields?.map((field: any) => (
              <div 
                key={field.field_number}
                className={`group relative aspect-square flex flex-col items-center justify-center rounded-lg border transition-all duration-300 ${
                  field.is_owned 
                  ? 'bg-[#2D5A27]/20 border-[#2D5A27] text-white shadow-[inset_0_0_15px_rgba(45,90,39,0.4)]' 
                  : 'bg-white/[0.02] border-white/10 text-gray-600 hover:border-white/30'
                }`}
              >
                <span className="text-[10px] uppercase font-bold opacity-40 mb-1">Fld</span>
                <span className={`text-xl font-bold font-mono ${field.is_owned ? 'text-green-400' : ''}`}>
                  {field.field_number}
                </span>
                <div className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${field.is_owned ? 'bg-green-400 animate-pulse' : 'bg-transparent'}`} />
              </div>
            ))}
          </div>
        </section>

        {/* NEW: EQUIPMENT & SUPPORT SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="bg-[#111] border border-white/5 rounded-2xl p-8">
            <h3 className="text-[#F5BD02] font-black uppercase text-sm mb-6 tracking-widest flex items-center gap-2">
              <span className="w-4 h-[2px] bg-[#F5BD02]"></span> Active Fleet
            </h3>
            <div className="space-y-4 font-mono">
              {[
                { label: 'Heavy Power', val: 'John Deere 3650' },
                { label: 'Harvesting', val: 'Claas Lexion 8900' },
                { label: 'Logistics', val: 'MAN TGS 18.510' },
                { label: 'Map Mod', val: 'Montana 4x Borderline' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span className="text-gray-500 uppercase text-xs">{item.label}</span>
                  <span className="text-gray-200">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#F5BD02]/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center group">
            <h3 className="text-2xl font-bold mb-2 group-hover:text-[#F5BD02] transition-colors">The Seed Fund</h3>
            <p className="text-gray-500 text-sm mb-8 max-w-[300px]">
              Fuel the conquest. Every donation goes toward expanding Daisy Hill Farms across all 122 fields.
            </p>
            <a 
              href="https://streamelements.com/daisyhillfarms/tip" 
              className="w-full py-4 bg-[#F5BD02] text-black font-black uppercase rounded-xl hover:bg-white transition-all shadow-[0_0_30px_rgba(245,189,2,0.1)] active:scale-95"
            >
              Contribute to the Legacy 🚜
            </a>
          </div>
        </section>

        {/* FOOTER INFO */}
        <footer className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 text-gray-500 text-xs">
          <div className="space-y-1">
            <p className="font-bold text-white mb-2 uppercase tracking-tighter text-sm">Rig Specs</p>
            <p>AMD Ryzen 5 3600 | NVIDIA GTX 1660 Super</p>
            <p>AMD FSR 3.0 • Optimized for 60FPS Fidelity</p>
          </div>
          <div className="md:text-right">
            <p className="italic text-gray-400">"One acre at a time, until the map is green."</p>
            <p className="mt-2 uppercase tracking-widest font-bold">© 2026 Daisy Hill Farms</p>
          </div>
        </footer>

      </main>
    </div>
  );
}
