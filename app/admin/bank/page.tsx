"use client";
import { useEffect, useState } from 'react';
import { sb } from "../../../lib/supabase"; // 3 steps back to root
import { ShieldAlert, ArrowLeft, Loader2 } from 'lucide-react';

export default function StaffPanel() {
  const [reqs, setReqs] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const DISCORD_URL = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

  const load = async () => {
    try {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';

      const { data: p } = await sb.from('profiles').select('rank').eq('id', user.id).single();
      if (p?.rank !== 'Admin') return window.location.href = '/dashboard';

      // We add the '?' to profiles to ensure it doesn't crash if a profile is missing
      const { data } = await sb.from('transactions')
        .select('*, profiles(username, balance)')
        .eq('status', 'pending');
        
      setReqs(data || []);
      setLd(false);
    } catch (e) {
      console.error("Staff Load Error:", e);
      setLd(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAction = async (id: string, userId: string, amt: number, bal: number, name: string, action: 'completed' | 'denied') => {
    try {
      if (action === 'completed') {
        await sb.from('profiles').update({ balance: (bal || 0) - amt }).eq('id', userId);
      }
      await sb.from('transactions').update({ status: action }).eq('id', id);
      
      await fetch(DISCORD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: "Daisy's Authority",
          embeds: [{
            title: action === 'completed' ? "✅ LOG APPROVED" : "❌ LOG DENIED",
            description: `**Operator:** ${name}\n**Amount:** $${amt.toLocaleString()}\n**Protocol:** Network Sync`,
            color: action === 'completed' ? 9283977 : 14423100,
            timestamp: new Date()
          }]
        })
      });
      load();
    } catch (e) {
      alert("Action failed. Check console.");
    }
  };

  if (ld) return (
    <div style={{background:'#111', color:'#d4af37', height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:'serif'}}>
      <Loader2 className="animate-spin" size={32} />
      <p style={{marginTop:'10px'}}>AUTHORIZING ACCESS...</p>
    </div>
  );

  return (
    <div style={{ background: '#111', minHeight: '100vh', color: '#f5f5dc', padding: '40px', fontFamily:'serif' }}>
      <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', border:'none', color:'#444', cursor:'pointer', marginBottom:'20px', display:'flex', alignItems:'center', gap:'5px'}}>
        <ArrowLeft size={16}/> BACK TO HUB
      </button>

      <div style={{display:'flex', alignItems:'center', gap:'15px', borderBottom:'1px solid #d4af37', paddingBottom:'20px', marginBottom:'40px'}}>
        <ShieldAlert size={32} color="#d4af37"/>
        <h1 style={{margin:0, letterSpacing:'2px'}}>STAFF AUTHORITY PANEL</h1>
      </div>

      {reqs.length === 0 ? (
        <p style={{textAlign:'center', color:'#333', marginTop:'50px'}}>No pending network logs found.</p>
      ) : (
        reqs.map((r: any) => (
          <div key={r.id} style={{ background: '#1a1a1a', padding: '25px', marginBottom: '15px', display:'flex', justifyContent:'space-between', alignItems:'center', border:'1px solid #333', borderRadius:'8px' }}>
            <div>
              <p style={{margin:0, color:'#555', fontSize:'10px', letterSpacing:'1px'}}>OPERATOR</p>
              <p style={{fontSize:'18px', fontWeight:'bold', margin:0}}>{r.profiles?.username || "Unknown"}</p>
            </div>
            
            <div style={{textAlign:'center'}}>
              <p style={{margin:0, color:'#555', fontSize:'10px', letterSpacing:'1px'}}>CREDITS</p>
              <p style={{fontSize:'22px', fontWeight:'bold', color:'#d4af37', margin:0}}>${r.amount?.toLocaleString()}</p>
            </div>

            <div style={{display:'flex', gap:'10px'}}>
              <button 
                onClick={()=>handleAction(r.id, r.user_id, r.amount, r.profiles?.balance || 0, r.profiles?.username || 'User', 'completed')} 
                style={{background:'#8da989', color:'#111', padding:'10px 20px', border:'none', fontWeight:'bold', cursor:'pointer', borderRadius:'4px'}}
              >
                APPROVE
              </button>
              <button 
                onClick={()=>handleAction(r.id, r.user_id, r.amount, r.profiles?.balance || 0, r.profiles?.username || 'User', 'denied')} 
                style={{background:'#800000', color:'#fff', padding:'10px 20px', border:'none', fontWeight:'bold', cursor:'pointer', borderRadius:'4px'}}
              >
                DENY
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
