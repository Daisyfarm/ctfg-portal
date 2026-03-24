import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F5BD02] selection:text-black antialiased">
      
      {/* NAVIGATION STICKY */}
      <nav className="border-b border-white/5 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-[#F5BD02] rounded-sm flex items-center justify-center font-black text-black text-xs group-hover:bg-white transition-colors">DH</div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] hidden sm:block">Command Center</span>
          </Link>
          <div className="flex gap-6">
            <Link href="/news" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#F5BD02]">News</Link>
            <Link href="/press" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#F5BD02]">Press Kit</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20">
        
        {/* HEADER */}
        <header className="mb-16 border-l-4 border-[#F5BD02] pl-8">
          <span className="text-[10px] font-black text-[#F5BD02] uppercase tracking-[0.5em] block mb-2">Partnership Division</span>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none mb-4">
            Professional <span className="text-[#F5BD02]">Inquiries</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-lg leading-relaxed uppercase tracking-widest font-medium italic">
            Expanding the Montana Conquest through strategic collaboration.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* LEFT: SPONSORSHIP TIERS */}
          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-white border-b border-white/10 pb-4">Integration Opportunities</h3>
            
            <div className="space-y-6">
              <div className="group">
                <h4 className="text-[#F5BD02] text-xs font-bold uppercase mb-1">Equipment Branding</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed uppercase">Logo placement on primary fleet (JD 3650 / Claas 8900) and live dashboard integration.</p>
              </div>

              <div className="group">
                <h4 className="text-[#F5BD02] text-xs font-bold uppercase mb-1">Technical Partnership</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed uppercase">Hardware/Software reviews and dedicated "Rig Optimization" segments featuring your tech.</p>
              </div>

              <div className="group">
                <h4 className="text-[#F5BD02] text-xs font-bold uppercase mb-1">Field Sponsorship</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed uppercase">Naming rights for specific fields within the 122-field Montana conquest grid.</p>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM / INFO */}
          <div className="bg-white/[0.02] border border-white/5 p-10 rounded-sm shadow-2xl relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <img src="/logo.png" alt="" className="w-16 h-16 grayscale" />
            </div>

            <h3 className="text-xs font-black uppercase tracking-widest text-white mb-8">Direct Channel</h3>
            
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Official Email</p>
                <a href="mailto:your-email@example.com" className="text-lg font-mono font-bold text-[#F5BD02] hover:text-white transition-colors">
                  [Your Email Address Here]
                </a>
              </div>

              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Social Hubs</p>
                <ul className="text-xs font-mono space-y-2 uppercase text-gray-400">
                  <li><a href="#" className="hover:text-white">Discord // DaisyHill_Division</a></li>
                  <li><a href="#" className="hover:text-white">Twitter // @DaisyHillFarms</a></li>
                </ul>
              </div>

              <div className="pt-6 border-t border-white/5">
                <p className="text-[9px] italic text-gray-600 leading-relaxed uppercase tracking-tighter">
                  Please allow 24-48 hours for a response from the Command Center. For urgent mission-critical inquiries, use Discord.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-32 pt-10 border-t border-white/5 opacity-20 text-center">
          <p className="text-[9px] font-mono uppercase tracking-[0.5em]">
            Daisy Hill Farms • Glasgow to Montana • © 2026
          </p>
        </footer>

      </main>
    </div>
  );
}
