"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FileText, PenTool, CheckCircle, XCircle, Cloud, LogOut, Briefcase, Map, TrendingUp, Landmark, Tractor, ShieldCheck, UserCheck } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Agreements() {
  const [u, setU] = useState<any>(null);
  const [agreements, setAgreements] = useState<any[]>([]);
  const [w, setW] = useState("");
  const [ld, setLd] = useState(true);
  const [showDraft, setShowDraft] = useState(false);

  // Form State
  const [form, setForm] = useState({ partner: '', title: '', terms: '' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
        const { data: agData } = await sb.from('agreements')
            .select('*, creator:profiles!agreements_creator_id_fkey(username), partner:profiles!agreements_partner_id_fkey(username)')
            .or(`creator_id.eq.${user.id},partner_id.eq.${user.id}`)
            .order('created_at', { ascending: false });
        setAgreements(agData || []);
    }
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const submitDraft = async (e: any) => {
    e.preventDefault();
    const { data: target } = await sb.from('profiles').select('id').eq('username', form.partner).single();
    if (!target) return alert("Partner Username not found in CTFG Registry.");

    const { error } = await sb.from('agreements').insert([{
        creator_id: u.id,
        partner_id: target.id,
        title: form.title,
        terms: form.terms
    }]);

    if (!error) {
        await fetch(HK, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ 
            content: `📑 **NEW LEGAL AGREEMENT**\n**${u.username}** has proposed a contract to **${form.partner}**: *"${form.title}"*. Check the portal to sign.` 
        })});
        alert("Draft Sent to Partner."); setShowDraft(false); load();
    }
  };

  const signAgreement = async (id: string, title: string) => {
    await sb.from('agreements').update({ status: 'ACTIVE' }).eq('id', id);
    await fetch(HK, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ 
        content: `🖋️ **CONTRACT SIGNED**\nThe agreement *"${title}"* is now **OFFICIALLY ACTIVE** within the CTFG Network.` 
    })});
    alert("Agreement Signed."); load();
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading Legal Archive...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
        <span style={{color:'#fff', fontSize:'11px'}}>WEATHER: {w}</span>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}>Field Work</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/agreements'}><UserCheck size={16}/> Agreements</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Agreements</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
                CREATE AND MANAGE FORMAL PARTNERSHIPS, LEASES, AND SERVICE CONTRACTS WITH OTHER OPERATORS. ONCE SIGNED, THESE AGREEMENTS ARE CONSIDERED BINDING BY CTFG STAFF.
            </p>

            <button onClick={()=>setShowDraft(!showDraft)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
                {showDraft ? 'CANCEL DRAFT' : 'DRAFT NEW AGREEMENT'}
            </button>

            {showDraft && (
                <form onSubmit={submitDraft} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                    <h3 style={{marginTop:0}}>Contract Proposal</h3>
                    <input placeholder="Partner In-Game Name" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} onChange={e=>setForm({...form, partner: e.target.value})} />
                    <input placeholder="Agreement Title (e.g. Field 15 Lease)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} onChange={e=>setForm({...form, title: e.target.value})} />
                    <textarea placeholder="Detailed Terms and Conditions..." required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', minHeight:'100px'}} onChange={e=>setForm({...form, terms: e.target.value})} />
                    <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>SEND PROPOSAL</button>
                </form>
            )}

            <div style={{ display:'flex', flexDirection:'column', gap:'15px' }}>
                {agreements.length === 0 ? <p style={{color:'#666'}}>No active or proposed agreements found.</p> : agreements.map(a => (
                    <div key={a.id} style={{ background:'rgba(40,40,40,0.9)', padding:'25px', borderLeft: a.status === 'ACTIVE' ? '6px solid #22c55e' : '6px solid #f59e0b' }}>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                            <div>
                                <h3 style={{margin:0, fontSize:'20px'}}>{a.title}</h3>
                                <p style={{margin:'5px 0', fontSize:'12px', color:'#aaa'}}>PARTIES: <b>{a.creator?.username}</b> & <b>{a.partner?.username}</b></p>
                            </div>
                            <span style={{ fontSize:'12px', fontWeight:'bold', color: a.status === 'ACTIVE' ? '#22c55e' : '#f59e0b' }}>[{a.status}]</span>
                        </div>
                        <p style={{ background:'rgba(0,0,0,0.3)', padding:'15px', borderRadius:'4px', fontSize:'13px', color:'#ccc', marginTop:'15px', fontStyle:'italic' }}>
                            "{a.terms}"
                        </p>
                        {a.status === 'PROPOSED' && a.partner_id === u.id && (
                            <button onClick={()=>signAgreement(a.id, a.title)} style={{ marginTop:'15px', padding:'10px 30px', background:'#22c55e', border:'none', color:'#fff', fontWeight:'bold', cursor:'pointer', borderRadius:'2px' }}>
                                SIGN AND ACTIVATE
                            </button>
                        )}
                    </div>
                ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
