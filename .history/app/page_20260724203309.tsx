import Image from 'next/image';
import { DollarSign, Tractor, Wheat, Globe, ArrowUpRight, ShieldCheck, Activity } from 'lucide-react';

const SiteHeader = () => (
  <header className="border-b border-gray-800 bg-gray-900 p-4 flex justify-between items-center mb-8">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center font-bold text-gray-950">DH</div>
      <span className="text-xl font-bold tracking-tight text-white">Daisy Hill Farms // FSN Network Node</span>
    </div>
    <div className="flex items-center gap-4 text-sm text-gray-400">
      <span>Sector UK Operator</span>
      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600 font-bold text-teal-400">U</div>
    </div>
  </header>
);

const StatCard = ({ icon: Icon, label, value, change, color = "text-teal-400" }: any) => (
  <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex flex-col gap-4 shadow-lg">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl bg-gray-800 ${color}`}>
        <Icon className="w-7 h-7" />
      </div>
      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${change.startsWith('+') ? 'bg-green-950 text-green-300' : 'bg-red-950 text-red-300'}`}>
        {change}
      </span>
    </div>
    <div>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
    </div>
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <SiteHeader />

      <div className="p-6 md:p-10 space-y-10">
        
        {/* === HERO COMMAND HUB SECTION === */}
        <section className="relative w-full h-[700px] rounded-3xl overflow-hidden border-2 border-gray-800 shadow-2xl shadow-black/50 group">
          
          <Image
            src="/hero-farm.jpg"
            alt="Daisy Hill Farms Aerial View - Sector UK"
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            priority
            quality={95}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 p-8 md:p-12 z-10 w-full flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-5xl">
              <p className="text-sm text-teal-400 tracking-widest uppercase mb-2 font-semibold bg-gray-950/50 px-3 py-1 rounded-full inline-block border border-teal-900">
                FSN INTEGRATION // DAISY HILL FARMS // SECTOR UK
              </p>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter drop-shadow-xl leading-[1.05] mt-1">
                DAISY HILL FARMS // FSN COMMAND
              </h1>
              <p className="text-xl text-gray-200 mt-4 max-w-4xl leading-relaxed font-medium drop-shadow-sm">
                Connected directly to the FSN network ecosystem. Monitoring cross-server trade routes, global market pricing, and automated export pipelines.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0 bg-gray-950/70 border border-green-800/50 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-inner">
              <div className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
              </div>
              <span className="text-green-300 font-bold text-lg tracking-wide">FSN NODE ONLINE</span>
              <span className="text-gray-400 text-sm ml-3 border-l border-gray-700 pl-3">Sync: Active</span>
            </div>
          </div>
        </section>

        {/* === FSN GLOBAL MARKET & EXPORT TICKER === */}
        <section className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-teal-950 text-teal-400 border border-teal-800">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">FSN Global Market & Export Board</h2>
                <p className="text-sm text-gray-400">Live commodity pricing across connected multiplayer export hubs.</p>
              </div>
            </div>
            <span className="text-xs bg-teal-950 text-teal-300 border border-teal-800 px-3 py-1.5 rounded-full font-semibold self-start md:self-auto">
              Updated 2m ago
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 flex flex-col justify-between">
              <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
                <span>Wheat (Export)</span>
                <ArrowUpRight className="text-green-400 w-4 h-4" />
              </div>
              <span className="text-2xl font-bold text-white">£1,420 <span className="text-xs text-gray-500">/ 1,000L</span></span>
              <span className="text-xs text-green-400 mt-1 font-medium">+4.2% global demand</span>
            </div>

            <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 flex flex-col justify-between">
              <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
                <span>Barley (Local Hub)</span>
                <Activity className="text-teal-400 w-4 h-4" />
              </div>
              <span className="text-2xl font-bold text-white">£1,180 <span className="text-xs text-gray-500">/ 1,000L</span></span>
              <span className="text-xs text-teal-400 mt-1 font-medium">Stable pricing</span>
            </div>

            <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 flex flex-col justify-between">
              <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
                <span>Canola (Bulk)</span>
                <ArrowUpRight className="text-green-400 w-4 h-4" />
              </div>
              <span className="text-2xl font-bold text-white">£2,150 <span className="text-xs text-gray-500">/ 1,000L</span></span>
              <span className="text-xs text-green-400 mt-1 font-medium">+8.5% high value</span>
            </div>

            <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 flex flex-col justify-between">
              <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
                <span>Milk (Contract)</span>
                <ShieldCheck className="text-blue-400 w-4 h-4" />
              </div>
              <span className="text-2xl font-bold text-white">£950 <span className="text-xs text-gray-500">/ 1,000L</span></span>
              <span className="text-xs text-blue-400 mt-1 font-medium">Locked contract</span>
            </div>
          </div>
        </section>

        {/* === CORE BUSINESS MODULES === */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 col-span-1 lg:col-span-2 shadow-inner space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div className='flex items-center gap-4'>
                    <div className="p-3 rounded-2xl bg-lime-950 text-lime-400 border border-lime-800">
                        <Wheat className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Crop Yield & FSN Contracts</h2>
                        <p className="text-gray-400 mt-1">Manage field assignments and collaborative contracts across connected network servers.</p>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 h-48">
                <div className="bg-gray-950 rounded-xl border border-gray-800 p-4 flex flex-col justify-between">
                    <span className='text-gray-500 text-sm'>Active Field Contracts</span>
                    <span className='text-4xl font-bold text-lime-300'>3</span>
                </div>
                <div className="bg-gray-950 rounded-xl border border-gray-800 p-4 flex flex-col justify-between">
                    <span className='text-gray-500 text-sm'>Silo Capacity (Wheat)</span>
                    <span className='text-4xl font-bold text-white'>84% <span className='text-lg text-gray-600'>/ 250k L</span></span>
                </div>
                <div className="bg-gray-950 rounded-xl border border-gray-800 p-4 flex flex-col justify-between">
                    <span className='text-gray-500 text-sm'>FSN Fleet Status</span>
                    <span className='text-4xl font-bold text-green-400'>Online</span>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 col-span-1">
            <StatCard 
              icon={DollarSign} 
              label="FSN Bank Balance" 
              value="£42,890" 
              change="+12.5%" 
              color="text-teal-400"
            />
            <StatCard 
              icon={Tractor} 
              label="Equipment Overhead" 
              value="£1,450" 
              change="-3.2% (Maint)" 
              color="text-yellow-400"
            />
          </div>
        </section>

         <footer className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-600 text-sm pb-8">
            Daisy Hill Farms Network // FSN Sector UK Integration v1.0.0
        </footer>

      </div>
    </main>
  );
}