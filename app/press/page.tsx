export default function PressKit() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-12 font-sans selection:bg-[#F5BD02] selection:text-black antialiased">
      
      {/* Press Header */}
      <header className="mb-20 border-b border-white/5 pb-10">
        <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
          Daisy Hill <span className="text-[#F5BD02]"> Tactical</span>
        </h1>
        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em] mt-3">Brand Identity & Digital Assets</p>
      </header>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* The Master Logo (Edited Version) */}
        <div className="border border-white/5 bg-white/[0.02] p-10 rounded-sm relative overflow-hidden">
          {/* Subtle light effect behind the logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#F5BD02]/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-xs font-black uppercase text-[#F5BD02] mb-8 tracking-widest relative z-10">
            The Master Emblem • Trans-Atlantic Edition
          </h2>
          
          {/* Path must point to your edited version. */}
          <img 
            src="/edited-emblem.png" 
            alt="Daisy Hill Tactical Master Emblem (UK/USA Hybrid)" 
            className="w-full h-auto aspect-square object-contain shadow-2xl rounded-sm mb-8 relative z-10"
          />
          
          <div className="space-y-4 font-mono text-gray-400 text-xs relative z-10">
            <p><strong className="text-white">File Type:</strong> High-Res PNG (Transparent)</p>
            <p><strong className="text-white">Colors:</strong> Gold (#F5BD02) | Hybrid Union Jack Red/Blue | US Blue</p>
            <p><strong className="text-white">Description:</strong> A robust tactical badge featuring the 122 Field Challenge, the rugged Montana farmer, and hybrid UK/USA flags. Designed for maximum optimization on the GTX 1660 Super.</p>
          </div>
        </div>

        {/* Brand Specs (Single-Monitor Survival Guides) */}
        <div className="space-y-10">
          
          {/* Color Palette */}
          <div className="border border-white/5 bg-white/[0.02] p-10 rounded-sm">
            <h3 className="text-xs font-bold text-gray-300 uppercase mb-8 tracking-wider">Brand Palette</h3>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="space-y-3 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#F5BD02] rounded-full border border-black/20" />
                <span className="text-[10px] font-mono">Daisy Gold</span>
                <span className="text-[9px] font-mono text-gray-600">#F5BD02</span>
              </div>
              <div className="space-y-3 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#2D5A27] rounded-full border border-black/20" />
                <span className="text-[10px] font-mono">Conquest Green</span>
                <span className="text-[9px] font-mono text-gray-600">#2D5A27</span>
              </div>
              <div className="space-y-3 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#1a1a1a] rounded-full border border-black/20" />
                <span className="text-[10px] font-mono">Survival Gray</span>
                <span className="text-[9px] font-mono text-gray-600">#1A1A1A</span>
              </div>
            </div>
          </div>

          {/* Workflow optimization guide for single monitor */}
          <div className="border border-white/5 bg-white/[0.02] p-10 rounded-sm">
            <h3 className="text-xs font-bold text-gray-300 uppercase mb-8 tracking-wider">Survival Workflow</h3>
            <div className="space-y-4 text-xs font-mono text-gray-400 list-decimal pl-4">
              <p>1. Keep the Supabase Admin open on your primary screen. Update field status *before* you start the harvest. No distractions.</p>
              <p>2. Use OBS/Streamlabs 'Hide from Screen Capture' settings. Your viewers must only see Montana, not your Alt-Tabs.</p>
              <p>3. Text-to-Speech (TTS) for donations/chat is not a luxury—it’s your only way to interact without stopping the tractor.</p>
            </div>
          </div>

        </div>

      </div>

      <footer className="mt-24 pt-10 border-t border-white/5 opacity-30 text-[9px] font-mono uppercase tracking-[0.4em]">
        DAISY HILL FARMS • Press Kit • CONFIDENTIAL • v1.1
      </footer>
    </div>
  );
}
