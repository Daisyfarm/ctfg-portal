"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminApplication() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#05070a] text-white p-8 flex items-center justify-center font-sans">
      <div className="max-w-md w-full bg-[#0f1117] border border-zinc-800 p-10 rounded-2xl shadow-2xl border-t-4 border-t-yellow-500">
        
        <h2 className="text-2xl font-black italic uppercase mb-2">Operator_Application</h2>
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-8 border-b border-zinc-800 pb-4">Secure Intake // IDA_CONGLOMERATE</p>

        {!submitted ? (
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <div>
              <label className="text-[9px] font-black uppercase text-zinc-500 block mb-2">Discord Username</label>
              <input required type="text" placeholder="User#0000" className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm font-bold focus:border-yellow-500 outline-none transition-all" />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase text-zinc-500 block mb-2">Primary Specialization</label>
              <select className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm font-bold focus:border-yellow-500 outline-none">
                <option>FS22 Montana Farmer</option>
                <option>FS25 East Asia Specialist</option>
                <option>ATS Long-Haul Trucker</option>
                <option>Logistics Dispatcher</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 uppercase italic tracking-tighter transition-all shadow-lg">
              Submit_Credentials
            </button>
          </form>
        ) : (
          <div className="text-center py-10">
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <h3 className="font-black italic uppercase">Application Received</h3>
            <p className="text-xs text-zinc-500 mt-2">Stand by for uplink confirmation on Discord.</p>
            <Link href="/dashboard" className="inline-block mt-8 text-[10px] font-black text-yellow-500 underline">Return to Hub</Link>
          </div>
        )}
      </div>
    </div>
  );
}