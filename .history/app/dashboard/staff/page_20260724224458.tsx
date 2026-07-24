"use client";

import { useState, useEffect } from "react";

interface GameStats {
  totalUsers: number;
  totalCrops: number;
  activePlots: number;
}

export default function StaffDashboard() {
  const [stats, setStats] = useState<GameStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStats({
      totalUsers: 142,
      totalCrops: 8,
      activePlots: 350,
    });
    setLoading(false);
  }, []);

  if (loading) return <div className="p-8 text-indigo-400">Loading admin console...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div>
          <h1 className="text-3xl font-bold text-indigo-400">Staff Control Panel</h1>
          <p className="text-slate-400 text-sm">Platform Management & Server Overseer</p>
        </div>
        <span className="bg-indigo-950 text-indigo-300 border border-indigo-700/50 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
          Authorized Admin
        </span>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Registered Players</h3>
          <p className="text-4xl font-extrabold text-white mt-2">{stats?.totalUsers}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Configured Crops</h3>
          <p className="text-4xl font-extrabold text-white mt-2">{stats?.totalCrops}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Active Plots</h3>
          <p className="text-4xl font-extrabold text-white mt-2">{stats?.activePlots}</p>
        </div>
      </div>

      {/* Management Actions */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-indigo-300">Management Controls</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow">
            + Add New Crop Type
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors border border-slate-700 shadow">
            Manage Item Store
          </button>
          <button className="bg-red-950/60 hover:bg-red-900 text-red-300 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors border border-red-800/80 shadow">
            Trigger Economy Reset
          </button>
        </div>
      </div>
    </div>
  );
}