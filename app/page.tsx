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
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic flex items-center gap-2">
              <span className="text-[#F5BD02]">Daisy Hill</span> Farms
            </h1>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Montana 4X • Borderline Conquest</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase font-bold">Land Captured</p>
              <p className="text-2xl font-mono font-bold text-[#F5BD02]">{ownedCount}<span className="text-gray-600 text-sm">/122</span></p>
            </div>
            <a 
              href="https://youtube.com/@DaisyHillFarms" 
              className="bg-[#F5BD02] text-black px-4 py-2 rounded font-black uppercase text-sm hover:bg-white transition-colors"
            >
              Watch Live
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* PROGRESS DASHBOARD */}
        <section className="mb-16">
          <div className="bg-[#111] border border-white/5 rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-xl font-bold uppercase tracking-tight">Conquest Progress</h2>
              <span className="text-[#F5BD02] font-mono font-bold">{progressPercentage}%</span>
            </div>
            {/* Progress Bar Container */}
            <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-[#2D5A27] to-[#F5BD02] transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(245,189,2,0.3)]"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </section>

        {/* 122-FIELD GRID */}
        <section>
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
                
                {/* Status Indicator */}
                <div className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${field.is_owned ? 'bg-green-400 animate-pulse' : 'bg-transparent'}`} />
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER INFO */}
        <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 text-gray-500 text-sm">
          <div>
            <p className="font-bold text-white mb-2 uppercase tracking-tighter">Rig Specs</p>
            <p>Ryzen 5 3600 | GTX 1660 Super</p>
            <p>AMD FSR 3.0 Quality Mode</p>
          </div>
          <div className="text-right">
            <p className="italic">"One acre at a time."</p>
            <p>© 2026 Daisy Hill Farms</p>
          </div>
        </footer>

      </main>
    </div>
  );
}
