"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JudithGapMap() {
  const [timestamp, setTimestamp] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [logs, setLogs] = useState(["SYSTEM_BOOT_COMPLETE", "SATELLITE_LINK_ESTABLISHED"]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    setLogs(prev => [`[${timestamp}] ${inputValue.toUpperCase()}`, ...prev.slice(0, 4)]);
    setInputValue("");
  };

  return (
    <div className="min-h-screen bg-black text-[#00ff41] font-mono p-4 overflow-hidden">
      <div className="max-w-7xl mx-auto border-4 border-[#003b11] h-[90vh] flex flex-col relative bg-[#050505]">
        
        {/* TOP HUD */}
        <div className="flex justify-between items-center bg-black p-4 border-b-2 border-[#003b11] z-10">
          <div>
            <h1 className="text-xl font-black text-white italic">IDA_TACTICAL_MAP</h1>
            <p className="text-[10px] text-green-700">WHEATLAND_UNIT // SRT_COMMAND</p>
          </div>
          <button 
            onClick={() => setIsLocked(!isLocked)}
            className={`px-4 py-2 border-2 font-black text-xs ${isLocked ? 'bg-red-600 text-white' : 'text-red-900 border-red-900'}`}
          >
            {isLocked ? 'TARGET_LOCKED' : 'ENGAGE_LOCK'}
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* RADAR DISPLAY */}
          <div className="flex-[3] relative bg-zinc-950 border-r-2 border-[#003b11] overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            {/* SRT MARKER */}
            <div className="absolute top-[25%] left-[60%] flex flex-col items-center">
              <div className="w-3 h-3 bg-blue-600 border border-white animate-pulse shadow-[0_0_15px_#2563eb]"></div>
              <span className="text-[8px] font-black text-blue-500 mt-1 uppercase">P-01: SRT</span>
            </div>

            {/* GEN LEE MARKER */}
            <div className="absolute top-[45%] left-[45%] flex flex-col items-center">
              <div className="w-4 h-4 bg-orange-600 rotate-45 border border-white"></div>
              <span className="text-[8px] font-black text-orange-600 mt-1 uppercase">R-01: LEE</span>
            </div>

            {isLocked && (
               <svg className="absolute inset-0 w-full h-full pointer-events-none">
                 <line x1="45%" y1="45%" x2="60%" y2="25%" stroke="#ef4444" strokeWidth="1" strokeDasharray="5,5" />
               </svg>
            )}
          </div>

          {/* MISSION LOG SIDEBAR */}
          <div className="flex-1 bg-black p-4 flex flex-col border-l-2 border-[#003b11]">
            <section className="flex-grow">
              <h2 className="text-[10px] font-black text-zinc-600 uppercase mb-4 border-b border-zinc-900 pb-1">Mission_Comms</h2>
              <div className="space-y-2 mb-4">
                {logs.map((log, i) => (
                  <p key={i} className="text-[10px] text-green-400 font-bold leading-tight uppercase italic">{log}</p>
                ))}
              </div>
            </section>

            {/* INPUT BOX */}
            <form onSubmit={addLog} className="mt-auto">
              <label className="text-[8px] text-zinc-700 font-black uppercase mb-1 block">Input_Message</label>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="TYPE_HERE..."
                className="w-full bg-zinc-950 border border-green-900 p-2 text-[10px] text-white focus:outline-none focus:border-green-400"
              />
            </form>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-black border-t-2 border-[#003b11] flex justify-between items-center">
          <Link href="/dashboard" className="text-[10px] text-green-900 font-black uppercase underline hover:text-white">← HQ</Link>
          <span className="text-[10px] text-zinc-800 font-black italic">{timestamp} MT</span>
        </div>
      </div>
    </div>
  );
}