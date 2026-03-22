"use client";
import { useEffect, useState } from 'react';
import { sb } from "../../lib/supabase"; // Use ../../ if in app/staff/page.tsx
import { ShieldAlert, ArrowLeft, Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function StaffPanel() {
  const [reqs, setReqs] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const DISCORD_URL = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

  const load = async () => {
    try {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) {
        window.location.href = '/';
        return;
      }

      const { data: p } = await sb.from('profiles').select('rank').eq('id', user.id).single();
      if (p?.rank !== 'Admin') {
        window.location.href = '/dashboard';
        return;
      }

      const { data, error } = await sb.from('transactions')
        .select('*, profiles(username, balance)')
        .eq('status', 'pending');
      
      if (error) throw error;
      setReqs(data || []);
    } catch (e) {
      console.error("Load error:", e);
    } finally {
      setLd(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAction = async (id: string, userId: string, amt: number, bal: number, name: string, action: 'completed' | 'denied') => {
    try {
      if (action === 'completed') {
        const newBal = (bal || 0) - amt;
        await sb.from('profiles').update({ balance: newBal }).eq('id', userId);
      }
      
      await sb.from('transactions').update({ status: action }).eq('id', id);

      await fetch(DISCORD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: "Daisy's Dream Authority",
          embeds: [{
            title: action === 'completed' ? "✅ LOG APPROVED" : "❌ LOG DENIED",
            description: `**Operator:** ${name}\n**Amount:** $${amt.toLocaleString()}\n**Result:** ${action.toUpperCase()}`,
            color: action === 'completed' ? 9283977 : 14423100,
            timestamp: new Date()
          }]
        })
      });
      load();
    } catch (e) {
      alert("Error processing request.");
    }
  };

  if (ld) return (
    <div style={{background:'#111', color:'#d4af37', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'serif'}}>
      <Loader2 className="animate-spin" size={24} />
      <span style={{marginLeft:'10px'}}>VERIFYING CREDENTIALS...</span>
    </div>
  );

  return (
    <div style={{ background: '#111', minHeight: '100vh', color: '#f5f5dc', padding: '40px', fontFamily:'serif' }}>
      <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', border:'none', color:'#555', cursor:'pointer', marginBottom:'20px', display:'flex', alignItems:'center', gap:'5px'}}>
        <ArrowLeft size={16}/> BACK TO HUB
      </button>

      <div style={{display:'flex', alignItems:'center', gap:'15px', borderBottom:'1px solid #d4af37', paddingBottom:'20px', marginBottom:'40px'}}>
        <ShieldAlert size={32} color="#d4af37"/>
        <div>
          <h1 style={{margin:0, letterSpacing:'2px', fontSize:'24px'}}>STAFF AUTHORITY</h1>
          <p style={{margin:0, fontSize:'10px', color:'#d4af37'}}>DAISY'S DREAM FARM NETWORK • ADMIN ONLY</p>
        </div>
      </div>

      {reqs.length === 0 ? (
        <div style={{textAlign:'center', padding:'100px 0', border:'1px dashed #333', borderRadius:'8px'}}>
          <p style={{color:'#444', margin:0}}>All logs are currently synced and clear.</p>
        </div>
      ) : (
        reqs.map((r: any) => (
          <div key={r.id} style={{ background: '#1a1a1a', padding: '20px', marginBottom: '15px', display:'flex', justifyContent:'space-between', alignItems:'center', border:'1px solid #262626', borderRadius:'4px' }}>
            <div>
              <p style={{margin:0, color:'#555', fontSize:'9px', letterSpacing:'1px'}}>OPERATOR</p>
              <p style={{fontSize:'16px', fontWeight:'bold', margin:0, color:'#fff'}}>{r.profiles?.username || "Unknown"}</p>
            </div>
            
            <div style={{textAlign:'center'}}>
              <p style={{margin:0, color:'#555', fontSize:'9px', letterSpacing:'1px'}}>CREDITS</p>
              <p style={{fontSize:'20px', fontWeight:'bold', color:'#d4af37', margin:0}}>${r.amount?.toLocaleString()}</p>
            </div>

            <div style={{display:'flex', gap:'10px'}}>
              <button 
                onClick={()=>handleAction(r.id, r.user_id, r.amount, r.profiles?.balance || 0, r.profiles?.username || 'User', 'completed')} 
                style={{background:'#8da989', color:'#111', padding:'8px 16px', border:'none', fontWeight:'bold', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px'}}
              >
                <CheckCircle size={14}/> APPROVE
              </button>
              <button 
                onClick={()=>handleAction(r.id, r.user_id, r.amount, r.profiles?.balance || 0, r.profiles?.username || 'User', 'denied')} 
                style={{background:'#800000', color:'#fff', padding:'8px 16px', border:'none', fontWeight:'bold', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px'}}
              >
                <XCircle size={14}/> DENY
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
