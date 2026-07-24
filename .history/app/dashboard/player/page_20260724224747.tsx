"use client";

import { useState, useEffect } from "react";

interface Plot {
  id: string;
  plotNumber: number;
  isReady: boolean;
  cropType?: { name: string; growthTimeSec: number } | null;
}

interface UserProfile {
  username: string;
  coins: number;
  level: number;
  exp: number;
  plots: Plot[];
}

export default function PlayerDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProfile({
      username: "FarmerJoe",
      coins: 1250,
      level: 2,
      exp: 150,
      plots: [
        { id: "1", plotNumber: 1, isReady: true, cropType: { name: "Golden Wheat", growthTimeSec: 30 } },
        { id: "2", plotNumber: 2, isReady: false, cropType: { name: "Mystic Tomato", growthTimeSec: 60 } },
        { id: "3", plotNumber: 3, isReady: false, cropType: null },
        { id: "4", plotNumber: 4, isReady: false, cropType: null },
      ],
    });
    setLoading(false);
  }, []);

  if (loading) return <div className="p-8 text-emerald-400">Loading your farm...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header Stats */}
      <div className="bg-emerald-900/40 border border-emerald-700/50 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 backdrop-blur-sm">
        <div>
          <h1 className="text-3xl font-bold text-emerald-300">{profile?.username}&apos;s Homestead</h1>
          <p className="text-emerald-400 text-sm">Level {profile?.level} Farmer • EXP: {profile?.exp}</p>
        </div>
        <div className="bg-emerald-950 px-5 py-2.5 rounded-xl border border-emerald-600/50 flex items-center gap-3 shadow-inner">
          <span className="text-yellow-400 text-lg">🪙</span>
          <div>
            <p className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">Coins</p>
            <p className="text-xl font-extrabold text-emerald-100">{profile?.coins}</p>
          </div>
        </div>
      </div>

      {/* Farm Grid */}
      <h2 className="text-xl font-semibold mb-4 text-emerald-200">Active Farm Plots</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {profile?.plots.map((plot) => (
          <div 
            key={plot.id}
            className={`p-5 rounded-xl border flex flex-col justify-between h-44 shadow-lg transition-all ${
              plot.cropType 
                ? plot.isReady 
                  ? "bg-amber-950/40 border-amber-500/80 animate-pulse" 
                  : "bg-emerald-900/30 border-emerald-700" 
                : "bg-emerald-950/20 border-dashed border-emerald-800 hover:bg-emerald-900/20 cursor-pointer"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Plot #{plot.plotNumber}</span>
              {plot.isReady && <span className="text-xs bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded shadow">Ready!</span>}
            </div>

            <div className="text-center my-auto">
              {plot.cropType ? (
                <>
                  <p className="font-bold text-lg text-emerald-100">{plot.cropType.name}</p>
                  <p className="text-xs text-emerald-400">{plot.isReady ? "Ready to harvest" : "Growing..."}</p>
                </>
              ) : (
                <p className="text-sm text-emerald-600 italic">Empty Plot</p>
              )}
            </div>

            {plot.cropType && plot.isReady ? (
              <button className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 rounded-lg text-sm transition-colors shadow">
                Harvest Crop
              </button>
            ) : !plot.cropType ? (
              <button className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2 rounded-lg text-sm transition-colors shadow">
                Plant Seed
              </button>
            ) : (
              <div className="w-full bg-emerald-950/50 text-emerald-500 text-center text-xs py-2 rounded-lg border border-emerald-900">
                In Progress
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}