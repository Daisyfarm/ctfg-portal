"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase";
import { Terminal, Send, ShieldCheck } from 'lucide-react';

export default function StaffDashboard() {
  const [command, setCommand] = useState("");
  const [status, setStatus] = useState("SYSTEM_READY");
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    sb.auth.getSession().then(({ data: { session } }) => setSession(session));
  }, []);

  const executeCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.startsWith("/")) return;

    const [action, ...args] = command.split(" ");
    const message = args.join(" ");

    try {
      if (action === "/dispatch") {
        setStatus("UPLOADING_INTEL...");
        const { error } = await sb.from('tactical_news').insert([{ headline: message }]);
        if (error) throw error;
        setStatus("DISPATCH_SENT");
      } 
      
      if (action === "/balance") {
        setStatus("SYNCING_FUNDS...");
        const { error } = await sb.from('profiles')
          .update({ balance: parseInt(message) })
          .eq('id', session.user.id);
        if (error) throw error;
        setStatus("FUNDS_VERIFIED");
      }
      
      setCommand("");
      setTimeout(() => setStatus("SYSTEM_READY"), 3000);
    } catch (err) {
      setStatus("COMMAND_FAILED");
      console.error(err);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '280px', right: '40px', zIndex: 100 }}>
      <form onSubmit={executeCommand} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(0,0,0,0.8)', padding: '10px 20px', borderRadius: '4px', border: '1px solid #d4af3722', backdropFilter: 'blur(10px)' }}>
        <Terminal size={16} color="#d4af37" />
        <input 
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="ENTER COMMAND (/dispatch [msg] or /balance [amount])"
          style={{ flex: 1, background: 'none', border: 'none', color: '#fff', fontFamily: 'monospace', fontSize: '11px', outline: 'none' }}
        />
        <div style={{ fontSize: '9px', color: '#444', letterSpacing: '2px' }}>{status}</div>
        <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d4af37' }}>
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
