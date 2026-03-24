import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F5BD02] selection:text-black antialiased relative overflow-hidden">
      
      {/* VIDEO BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover grayscale opacity-20 scale-105"
        >
          <source src="/montana-b-roll.mp4" type="video/mp4" />
        </video>
        {/* Dark Vignette Over Video */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* NAVIGATION STICKY */}
      <nav className="border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-50">
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

      <main className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        
        {/* HEADER */}
        <header className="mb-16 border-l-4 border-[#F5BD02] pl-8">
          <span className="text-[10px] font-black text-[#F5BD02] uppercase tracking-[0.5em] block mb-2 underline decoration-1 underline-offset-4">Partnership Division</span>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none mb-4">
            Professional <span className="text-[#F5BD02]">Inquiries</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-lg leading-relaxed uppercase tracking-widest font-medium italic opacity-70">
            Expanding the Montana Conquest through strategic collaboration.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* LEFT: SPONSORSHIP TIERS */}
          <div className="space-y-8 bg-black/20 backdrop-blur-sm p-6 rounded-sm border border-white/5">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white border-b border-white/10 pb-4">Integration Tiers</h3>
            
            <div className="space-y-8">
              <div className="group">
                <h4 className="text-[#F5BD02] text-[11px] font-black uppercase mb-1 tracking-widest">01 / Fleet Branding</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed uppercase font-mono">Logo placement on primary equipment and live dashboard integration.</p>
              </div>

              <div className="group">
                <h4 className="text-[#F5BD02] text-[11px] font-black uppercase mb-1 tracking-widest">02 / Technical Partnership</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed uppercase font-mono">Hardware/Software reviews and dedicated "Optimization" segments.</p>
              </div>

              <div className="group">
                <h4 className="text-[#F5BD02] text-[11px] font-black uppercase mb-1 tracking-widest">03 / Field Ownership</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed uppercase font-mono">Naming rights for specific fields within the 122-field conquest grid.</p>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM / INFO */}
          <div className="bg-white/[0.03] border border-white/10 p-10 rounded-sm shadow-2xl relative backdrop-blur-md">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <img src="/logo.png" alt="" className="w-16 h-16 grayscale" />
            </div>

            <h3 className="text-xs font-black uppercase tracking-widest text-white mb-10">Direct Channel</h3>
            
            <div className="space-y-10">
              <div>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.4em] mb-3">Official Dispatch</p>
                <a href="mailto:daisyhilltactical@gmail.com" className="text-lg font-mono font-bold text-[#F5BD02] hover:text-white transition-colors block border-b border-[#F5BD02]/20 pb-2">
                  DAISYHILLTACTICAL@GMAIL.COM
                </a>
              </div>

              <div>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.4em] mb-3">Communications Hub</p>
                <ul className="text-[11px] font-mono space-y-3 uppercase text-gray-400">
                  <li className="flex justify-between border-b border-white/5 pb-1">
                    <span>Discord</span>
                    <a href="#" className
