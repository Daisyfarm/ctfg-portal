import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-[#0b0e14] border-b border-zinc-800 px-6 py-4 text-zinc-400 text-xs font-bold uppercase tracking-wider">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* LEFT BRAND / STATS */}
        <div className="flex items-center gap-6">
          <span className="text-white font-black">FARM NETWORK</span>
          <span className="text-zinc-600">|</span>
          <span>Samuel Founder (#001)</span>
          <span className="text-zinc-600">|</span>
          <span className="text-emerald-400">Judith Plains Network $8,100,000 (16 Slots)</span>
        </div>

        {/* RIGHT STATUS */}
        <div className="flex items-center gap-4 text-[10px]">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> NORTH: ONLINE</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> SOUTH: ONLINE</span>
          <span className="text-zinc-500">2026-07-24 18:24</span>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="max-w-7xl mx-auto flex gap-8 mt-6 border-t border-zinc-800/80 pt-4 overflow-x-auto">
        <Link href="/myself" className="hover:text-white transition-colors pb-1 border-b-2 border-transparent hover:border-blue-500">Myself</Link>
        <Link href="/interactions" className="hover:text-white transition-colors pb-1 border-b-2 border-transparent hover:border-blue-500">Interactions</Link>
        <Link href="/finances" className="hover:text-white transition-colors pb-1 border-b-2 border-transparent hover:border-blue-500">Finances</Link>
        <Link href="/data" className="hover:text-white transition-colors pb-1 border-b-2 border-transparent hover:border-blue-500">Data</Link>
        <Link href="/market" className="hover:text-white transition-colors pb-1 border-b-2 border-transparent hover:border-blue-500">Market</Link>
        <Link href="/wiki" className="hover:text-white transition-colors pb-1 border-b-2 border-transparent hover:border-blue-500">Wiki</Link>
        <Link href="/settings" className="hover:text-white transition-colors pb-1 border-b-2 border-transparent hover:border-blue-500">Settings</Link>
      </div>
    </header>
  );
}
