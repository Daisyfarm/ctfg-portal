"use client";

import React from 'react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F5BD02] selection:text-black antialiased relative overflow-hidden">
      
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
        <div className="absolute inset-0 bg-[#F5BD02]/5 z-0" />
      </div>

      <main className="relative z-20 max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-6xl font-black italic tracking-tighter uppercase mb-4">
          CONTACT <span className="text-[#F5BD02]">HQ</span>
        </h1>
        <p className="text-gray-500 font-mono tracking-widest uppercase text-sm mb-12">
          Montana Simulation Division / Support Comms
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="p-8 bg-white/[0.03] border border-white/10 rounded-sm">
            <h3 className="text-[#F5BD02] font-black uppercase text-xs tracking-widest mb-4">Email Dispatch</h3>
            <p className="font-mono text-sm text-gray-300">ADMIN@DAISYHILLFARMS.COM</p>
          </div>
          <div className="p-8 bg-white/[0.03] border border-white/10 rounded-sm">
            <h3 className="text-[#F5BD02] font-black uppercase text-xs tracking-widest mb-4">Social Frequency</h3>
            <p className="font-mono text-sm text-gray-300">@DAISYHILLFARMS</p>
          </div>
        </div>

        <div className="mt-12">
          <a 
            href="/" 
            className="inline-block bg-white text-black px-8 py-3 font-black uppercase text-sm hover:bg-[#F5BD02] transition-colors"
          >
            Return to Command
          </a>
        </div>
      </main>
    </div>
  );
}
