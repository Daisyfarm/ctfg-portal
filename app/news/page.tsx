import Link from 'next/link';

export default function NewsPage() {
  // Manual Progress for the Monitor Fund (Update this as tips come in)
  const goalCurrent = 12;
  const goalTarget = 150;
  const progressPercentage = ((goalCurrent / goalTarget) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F5BD02] selection:text-black antialiased">
      
      {/* NAVIGATION STICKY */}
      <nav className="border-b border-white/5 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-[#F5BD02] rounded-sm flex items-center justify-center font-black text-black text-xs group-hover:bg-white transition-colors">DH</div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] hidden sm:block">Back to Command Center</span>
          </Link>
          <div className="flex gap-6">
            <a href="https://youtube.com/@DaisyHillFarms" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#F5BD02]">YouTube</a>
            <Link href="/press" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#F5BD02]">Press Kit</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16">
        
        {/* HERO SECTION */}
        <header className="mb-20 text-center max-w-3xl mx-auto">
          <span className="text-[10px] font-black text-[#F5BD02] uppercase tracking-[0.6em] mb-4 block">Official Dispatch // 001</span>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9] mb-8">
            The <span className="text-[#F5BD02]">Conquest</span> is Live.
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed font-medium uppercase tracking-widest opacity-60">
            Glasgow to Montana: The International 122-Field Mission.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* LEFT SIDEBAR: MISSION STATS */}
          <aside className="lg:col-span-1 space-y-12 order-2 lg:order-1">
            <div className="border-t border-white/10 pt-6">
              <h4 className="text-[10px] font-black text-[#F5BD02] uppercase tracking-widest mb-4">Survival Fund</h4>
              <p className="text-xs text-gray-500 mb-2 font-mono italic">Target: 2nd Monitor</p>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-[#F5BD02]" style={{ width: `${progressPercentage}%` }} />
              </div>
              <p className="text-[10px] font-mono text-white">£{goalCurrent} / £{goalTarget} ({progressPercentage}%)</p>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Tactical Gear</h4>
              <ul className="text-[10px] font-mono space-y-2 uppercase text-gray-400">
                <li>CPU: Ryzen 5 3600</li>
                <li>GPU: GTX 1660 Super</li>
                <li>Display: Single Unit</li>
                <li>Optimization: FSR 3.0</li>
              </ul>
            </div>
          </aside>

          {/* MAIN ARTICLE CONTENT */}
          <div className="lg:col-span-3 space-y-10 order-1 lg:order-2">
            
            {/* Featured Image */}
            <div className="relative border border-white/5 rounded-sm overflow-hidden bg-[#0a0a0a] p-12 flex justify-center shadow-2xl">
              <img src="/edited-emblem.png" alt="Daisy Hill Master Emblem" className="max-w-md w-full h-auto drop-shadow-[0_0_50px_rgba(245,189,2,0.1)]" />
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] pointer-events-none" />
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-xl font-bold leading-relaxed text-white italic border-l-4 border-[#F5BD02] pl-6 py-2">
                Daisy Hill Tactical is officially operational. This isn’t just a simulation; it’s a career-defining mission to capture 122 fields on the Montana Borderline.
              </p>

              <div className="h-8" /> {/* Spacer */}

              <div className="space-y-6 text-gray-400 text-sm leading-7">
                <p>
                  In an era where the cost of living is putting pressure on creators across the UK, Daisy Hill is turning to the soil—digital soil. Using a focused single-monitor setup, we are proving that professional branding and high-stakes content can be built from the ground up without a massive budget.
                </p>

                <h3 className="text-white font-black uppercase tracking-tighter text-lg pt-4">The Montana Doctrine</h3>
                <p>
                  Our strategy is built on data. Every harvest, every investment, and every land acquisition is logged directly into our real-time database. Our community can watch the map turn green, field-by-field, in a transparent display of the daily grind.
                </p>

                <p>
                  This rebrand represents the "Tactical" side of farming. Efficiency is our only metric for success. With the Claas Lexion 8900 ready for the first harvest and the JD 3650 handling the heavy power, we are positioned for total map saturation.
                </p>
                
                <div className="bg-white/[0.02] border border-white/5 p-8 my-8 rounded-sm">
                  <h4 className="text-[#F5BD02] font-black uppercase text-[10px] tracking-[0.3em] mb-4 underline decoration-1 underline-offset-8">Join the Frontline</h4>
                  <p className="text-xs italic leading-relaxed">
                    Subscribe to the YouTube channel to witness the conquest live. Watch the "Seed Fund" grow alongside our fields as we work toward our first major hardware milestone.
                  </p>
                  <a href="https://streamelements.com/daisyhillfarms/tip" className="inline-block mt-6 text-[10px] font-black text-black bg-[#F5BD02] px-6 py-3 uppercase hover:bg-white transition-colors">
                    Support the Mission
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-32 pt-10 border-t border-white/5 text-center opacity-20">
          <p className="text-[9px] font-mono uppercase tracking-[0.5em]">
            Daisy Hill Tactical • Dispatch 001 • © 2026
          </p>
        </footer>
      </main>
    </div>
  );
}
