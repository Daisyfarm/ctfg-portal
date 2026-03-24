export default function PressKit() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-12 font-sans selection:bg-[#F5BD02] selection:text-black">
      
      {/* Press Header */}
      <header className="mb-16 border-b border-white/5 pb-8">
        <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
          Daisy Hill <span className="text-[#F5BD02]"> Tactical</span>
        </h1>
        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em] mt-2">Brand Identity & Digital Assets</p>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* The Master Logo (Edited Version) */}
        <div className="border border-white/5 bg-white/[0.02] p-8 rounded-sm">
          <h2 className="text-xs font-black uppercase text-[#F5BD02] mb-6 tracking-widest">Master Emblem • UK/USA Hybrid</h2>
          
          {/* This is the SLOT for the edited image_7.png. The path must point to your edited version. */}
          <img 
            src="/edited-emblem.png" 
            alt="Daisy Hill Tactical Master Emblem (Edited)" 
            className="w-full h-auto aspect-square object-contain shadow-2xl rounded-sm mb-6"
          />
          
          <div className="space-y-3 font-mono text-gray-400 text-xs">
            <p><strong className="text-white">File Type:</strong> High-Res PNG (Transparent)</p>
            <p><strong className="text-white">Colors:</strong> F5BD02 (Gold) | Union Jack Red/Blue | US Blue</p>
            <p><strong className="text-white">Description:</strong> A high-detail badge blending UK/USA national symbols with Montana agri-tech visuals.</p>
          </div>
        </div>

        {/* Brand Specs (Based on your single-monitor optimization) */}
        <div className="border border-white/5 bg-white/[0.02] p-8 rounded-sm space-y-8">
          <div>
            <h3 className="text-xs font-bold text-gray-300 uppercase mb-4">Core Philosophy</h3>
            <p className="text-sm italic">"International optimization for local survival. Cross-border gaming with a mission."</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-300 uppercase mb-4">Color Palette</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#F5BD02] rounded-full border border-black/20" />
                <span className="text-[10px] font-mono">#F5BD02</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#2D5A27] rounded-full border border-black/20" />
                <span className="text-[10px] font-mono">#2D5A27</span>
              </div>
              {/* Optional: Add UK/USA flag colors here */}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-300 uppercase mb-4">Optimization</h3>
            <p className="text-xs font-mono">Assets must be ultra-light. The 1660 Super cannot handle heavy web rendering during streams.</p>
          </div>
        </div>

      </div>

      <footer className="mt-20 pt-8 border-t border-white/5 opacity-30 text-[9px] font-mono uppercase tracking-[0.4em]">
        DAISY HILL FARMS • Press Kit • CONFIDENTIAL • v1.0
      </footer>
    </div>
  );
}
