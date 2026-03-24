"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-black text-[#F5BD02] p-20 font-mono">
      <h1 className="text-3xl font-black italic">ADMIN TERMINAL</h1>
      <p className="mt-4 text-gray-500">SYSTEM SECURE. OVERLAY ACTIVE.</p>
    </div>
  );
}
