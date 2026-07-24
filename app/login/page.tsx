'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FSNLoginPortal() {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState('');
  const [role, setRole] = useState<'manager' | 'contractor'>('manager');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.trim().length > 0) {
      router.push('/dashboard/player');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-gray-900/60 border border-gray-800 rounded-lg p-8 shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-lg font-bold tracking-wider text-white">FSN SECURE // AUTH PORTAL</h1>
          <p className="text-xs text-gray-400 mt-1">Farm Managers & Authorized Contractors</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-950/40 border border-red-800 rounded p-3 text-center">
            <p className="text-xs text-red-400 font-medium">Invalid access token. Please verify credentials.</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Select Security Role</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('manager')}
                className={`py-2 text-xs font-semibold rounded border transition-colors ${role === 'manager' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'}`}
              >
                Farm Manager
              </button>
              <button
                type="button"
                onClick={() => setRole('contractor')}
                className={`py-2 text-xs font-semibold rounded border transition-colors ${role === 'contractor' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'}`}
              >
                Contractor
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Node Access Token / Code</label>
            <input 
              type="password" 
              required
              placeholder="Enter secure node key..."
              value={accessCode}
              onChange={(e) => {
                setAccessCode(e.target.value);
                setError(false);
              }}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-600"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors mt-2 cursor-pointer"
          >
            Authenticate & Access Command
          </button>
        </form>
      </div>
    </div>
  );
}
