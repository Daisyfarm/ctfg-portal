"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await sb.from('profiles').select('*');
      if (data) setUsers(data);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#F5BD02] p-10 font-mono">
      <div className="flex justify-between items-center mb-8 border-b border-[#F5BD02]/30 pb-4">
        <div>
          <h1 className="text-3xl font-black italic">ADMIN TERMINAL</h1>
          <p className="text-gray-500 text-xs mt-1">IRON DAISY AGRI — SYSTEM SECURE. OVERLAY ACTIVE.</p>
        </div>
        <button 
          onClick={() => window.location.href = '/accounting'} 
          className="bg-[#F5BD02] text-black font-bold px-4 py-2 text-xs rounded hover:bg-yellow-400 transition"
        >
          Back to Accounting
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-white">Registered Operatives / Profiles</h2>
        
        {loading ? (
          <p className="text-gray-500 animate-pulse">Decrypting database records...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500">No profiles found in the network.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-700 text-xs text-gray-400 uppercase">
                  <th className="p-3">User ID</th>
                  <th className="p-3">Balance</th>
                  <th className="p-3">Credit Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-sm">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-800/50">
                    <td className="p-3 font-mono text-gray-300">{user.id}</td>
                    <td className="p-3 text-green-400 font-bold">${user.balance?.toLocaleString() || 0}</td>
                    <td className="p-3 text-blue-400">{user.credit_score || 600}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
