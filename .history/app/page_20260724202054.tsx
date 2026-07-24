import Image from 'next/image';
import { DollarSign, Tractor, Wheat, Zap } from 'lucide-react';

const SiteHeader = () => (
  <header className="border-b border-gray-800 bg-gray-900 p-4 flex justify-between items-center mb-8">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center font-bold text-gray-950">DH</div>
      <span className="text-xl font-bold tracking-tight text-white">Daisy Hill Farms Network</span>
    </div>
    <div className="flex items-center gap-4 text-sm text-gray-400">
      <span>Sector UK Operator</span>
      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">U</div>
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
                FIELD HUB STATUS // DAISY HILL FARMS // SECTOR UK
              </p>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter drop-shadow-xl leading-[1.05] mt-1">
                DAISY HILL FARMS // OPERATIONAL COMMAND
              </h1>
              <p className="text-xl text-gray-200 mt-4 max-w-4xl leading-relaxed font-medium drop-shadow-sm">
                Centralized telemetry and logistics dashboard. Monitoring all active UK operations under the Daisy Hill Farms banner.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0 bg-gray-950/70 border border-green-800/50 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-inner">
              <div className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
              </div>
              <span className="text-green-300 font-bold text-lg tracking-wide">SYSTEMS NOMINAL</span>
              <span className="text-gray-400 text-sm ml-3 border-l border-gray-700 pl-3">Unit ID: DHF-UK01</span>
            </div>
          </div>
        </section>

        {/* === BUSINESS MODULES GRID === */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 col-span-1 lg:col-span-2 shadow-inner space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div className='flex items-center gap-4'>
                    <div className="p-3 rounded-2xl bg-lime-950 text-lime-400 border border-lime-800">
                        <Wheat className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Crop Yield & Harvest Logistics</h2>
                        <p className="text-gray-400 mt-1">Track field performance, silo storage, and bulk transport fleet status.</p>
                    </div>
                </div>
                <button className="bg-lime-600 hover:bg-lime-500 text-lime-950 px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition">
                    <Zap size={16}/>
                    Run Logistics Report
                </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 h-48">
                <div className="bg-gray-950 rounded-xl border border-gray-800 p-4 flex flex-col justify-between">
                    <span className='text-gray-500 text-sm'>Active Fields</span>
                    <span className='text-4xl font-bold text-lime-300'>14</span>
                </div>
                <div className="bg-gray-950 rounded-xl border border-gray-800 p-4 flex flex-col justify-between">
                    <span className='text-gray-500 text-sm'>Silo Capacity (Wheat)</span>
                    <span className='text-4xl font-bold text-white'>84% <span className='text-lg text-gray-600'>/ 250k L</span></span>
                </div>
                <div className="bg-gray-950 rounded-xl border border-gray-800 p-4 flex flex-col justify-between">
                    <span className='text-gray-500 text-sm'>Fleet Status (Active)</span>
                    <span className='text-4xl font-bold text-green-400'>3/3 Trucks</span>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 col-span-1">
            <StatCard 
              icon={DollarSign} 
              label="Net Profit (This Week)" 
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
            Daisy Hill Farms Network // Sector UK Operations Portal v0.1.0 // Admin Access Only
        </footer>

      </div>
    </main>
  );
}