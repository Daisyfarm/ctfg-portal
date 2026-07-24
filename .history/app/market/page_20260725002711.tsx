"use client";
import React from 'react';
import Link from 'next/link';

export default function GenericModulePage() {
  return (
    <div className="min-h-screen bg-[#05070a] text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-[#0f1117] border border-zinc-800 p-8 rounded-2xl">
        <h1 className="text-2xl font-black uppercase italic mb-4">Module_Online</h1>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-8">This operational sector is active and ready for data synchronization.</p>
        <Link href="/" className="bg-white text-black px-6 py-3 font-black text-[10px] uppercase tracking-tighter rounded">
          Return_to_Command
        </Link>
      </div>
    </div>
  );
}

