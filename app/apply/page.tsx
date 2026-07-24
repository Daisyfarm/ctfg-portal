'use client';

import React, { useState } from 'react';

export default function FSNApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    discordHandle: '',
    farmName: '',
    experience: 'Intermediate',
    platform: 'PC',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-gray-900/60 border border-gray-800 rounded-lg p-8 shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-lg font-bold tracking-wider text-white">FSN SECTOR UK // PRE-WHITELIST</h1>
          <p className="text-xs text-gray-400 mt-1">Court Farm Operator Registration Portal</p>
        </div>

        {submitted ? (
          <div className="bg-green-950/40 border border-green-800 rounded p-4 text-center">
            <h2 className="text-sm font-bold text-green-400 mb-1">Registration Logged</h2>
            <p className="text-xs text-gray-300">Your pre-whitelist application has been securely routed to FSN network dispatch.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Discord Handle</label>
              <input 
                type="text" 
                required
                placeholder="e.g. username#0000"
                value={formData.discordHandle}
                onChange={(e) => setFormData({...formData, discordHandle: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Farm / Enterprise Name</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Court Farm Holdings"
                value={formData.farmName}
                onChange={(e) => setFormData({...formData, farmName: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Farming Sim Experience Level</label>
              <select 
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-600"
              >
                <option value="Beginner">Beginner / New Operator</option>
                <option value="Intermediate">Intermediate Management</option>
                <option value="Veteran">Veteran / Multi-Farm Operator</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors mt-2 cursor-pointer"
            >
              Submit Pre-Whitelist Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
