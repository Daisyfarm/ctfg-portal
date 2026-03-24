import { supabase } from '@/db/supabase';

export default async function Home() {
  // 1. Data Fetching
  const { data: fields, error } = await supabase
    .from('montana_conquest')
    .select('*')
    .order('field_number', { ascending: true });

  // 2. Calculate Leaderboard (Top 3 Sponsors)
  // We group by name and sum their total contributions
  const sponsorMap = fields?.reduce((acc: any, field: any) => {
    if (field.sponsor_name && field.sponsor_amount > 0) {
      acc[field.sponsor_name] = (acc[field.sponsor_name] || 0) + field.sponsor_amount;
    }
    return acc;
  }, {});

  const leaderboard = Object.entries(sponsorMap || {})
    .map(([name, amount]) => ({ name, amount: amount as number }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  const ownedCount = fields?.filter((f: any) => f.is_owned).length || 0;
  const progressPercentage = ((ownedCount / 122) * 100).toFixed(1);
  const totalRaised = fields?.reduce((sum, f) => sum + (f.sponsor_amount || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F5BD02] selection:text-black relative overflow-x-hidden antialiased">
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 opacity-15 pointer-events-none">
        <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      {/* MONITOR GOAL BAR */}
      <div className="bg-[#F5BD02] text-black py-1.5 px-4 text-center font-black text-[10px] uppercase tracking-[0.3em] z-[60] relative shadow-xl">
        MISSION CRITICAL: MONITOR FUND — £{totalRaised} / £150 ({((totalRaised / 150) * 100).toFixed(1)}%)
      </div>

      <header className="border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-[28px] z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Daisy Hill" className="w-12 h-12 object-contain" />
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">DAISY HILL <span className="text-[#F5BD02]">FARMS</span></h1>
          </div>
          <a href="/contact" className="bg-white text-black px-5 py-2.5 rounded-sm font-black uppercase text-xs hover:bg-[#F5BD02] transition-all">Sponsor</a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* LEADERBOARD SECTION */}
        <section className="mb-16">
          <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#F5BD02] mb-8 text-center">Top Division Benefactors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leaderboard.map((sponsor, index) => (
              <div key={sponsor.name} className={`p-6 rounded-sm border flex flex-col items-center justify-center text-center transition-all ${
                index === 0 ? 'bg-[#F5BD02]/10 border-[#F5BD02]/40 scale-105 shadow-[0_0_30px_rgba(245,189,2,0.1)]' : 'bg-white/[0.03] border-white/10'
              }`}>
                <span className={`text-[10px] font-black uppercase mb-2 ${index === 0 ? 'text-[#F5BD02]' : 'text-gray-500'}`}>
                  {index === 0 ? '🏆 Top Sponsor' : `Rank #${index + 1}`}
                </span>
                <p className="text-xl font-black italic uppercase tracking-tighter truncate w-full">{sponsor.name}</p>
                <p className="text-lg font-mono font-bold text-gray-400 mt-1">£{sponsor.amount}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROGRESS CARD */}
        <div className="bg-white/[0.03] border border-white/10 rounded-sm p-8 backdrop-blur-md mb-12">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">Territory Captured</h2>
              <p className="text-5xl font-black italic tracking-t
