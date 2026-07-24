{/* ACTION GRID - FORCED CLICKABLE */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
  
  {/* 1. DISPATCH (DISABLED) */}
  <div className="bg-zinc-900/30 border border-zinc-800 p-5 font-black text-[10px] uppercase tracking-widest opacity-30 cursor-not-allowed flex items-center justify-center rounded">
    Request Dispatch
  </div>
  
  {/* 2. LOG FUEL */}
  <Link 
    href="/manifest" 
    className="bg-[#1a1c23] border border-zinc-800 p-5 font-black text-[10px] uppercase tracking-widest text-center hover:bg-blue-900/40 hover:border-blue-500 transition-all flex items-center justify-center cursor-pointer rounded group"
  >
     <span className="group-hover:text-blue-400">LOG FUEL</span>
  </Link>

  {/* 3. VIEW SATELLITE (THE ONE YOU NEED) */}
  <Link 
    href="/map" 
    className="bg-[#1a1c23] border border-zinc-800 p-5 font-black text-[10px] uppercase tracking-widest text-center hover:bg-green-900/40 hover:border-green-400 transition-all flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.1)] cursor-pointer rounded group"
  >
    <span className="text-green-500 group-hover:text-green-300">VIEW SATELLITE</span>
  </Link>

  {/* 4. STAFF PANEL / ADMIN */}
  <Link 
    href="/admin" 
    className="bg-[#fbbf24] text-black p-5 font-black text-[10px] uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-lg flex items-center justify-center cursor-pointer rounded"
  >
    Staff Panel
  </Link>

</div>