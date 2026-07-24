"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FileText, CheckCircle, Clock, DollarSign, Briefcase } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function ContractsPage() {
  const [u, setU] = useState<any>(null);
  const [contracts, setContracts] = useState<any[]>([]);
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: contractData } = await sb
      .from('contracts')
      .select('*, client:profiles!contracts_client_id_fkey(username), assigned:profiles!contracts_assigned_to_fkey(username)')
      .order('created_at', { ascending: false });

    setContracts(contractData || []);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const acceptContract = async (contract: any) => {
    if (!u) return;

    const { error } = await sb
      .from('contracts')
      .update({ assigned_to: u.id, status: 'in_progress' })
      .eq('id', contract.id);

    if (error) {
      return alert("Error accepting contract: " + error.message);
    }

    await fetch(HK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `📋 **CONTRACT ACCEPTED**\n**${u.username}** has accepted contract **"${contract.title}"** (Payout: $${contract.payout?.toLocaleString()})`
      })
    });

    alert("Contract accepted successfully.");
    load();
  };

  const completeContract = async (contract: any) => {
    if (!u) return;

    // Update contract status
    const { error } = await sb
      .from('contracts')
      .update({ status: 'completed' })
      .eq('id', contract.id);

    if (error) return alert("Error completing contract.");

    // Credit reward to user balance
    const newBalance = (u.balance || 0) + contract.payout;
    await sb.from('profiles').update({ balance: newBalance }).eq('id', u.id);

    await fetch(HK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `✅ **CONTRACT COMPLETED**\n**${u.username}** has fulfilled contract **"${contract.title}"** and received a payout of **$${contract.payout?.toLocaleString()}**!`
      })
    });

    alert(`Contract fulfilled! $${contract.payout?.toLocaleString()} has been credited to your balance.`);
    load();
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Secure Contracts Terminal...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>IRON DAISY AGRI</span>
        <span style={{color:'#fff', fontSize:'11px'}}>OPERATOR BALANCE: ${u.balance?.toLocaleString()}</span>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/accounting'}>Accounting</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/contracts'}><FileText size={16}/> Operational Contracts</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Operational Contracts</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              ACCEPT AND FULFILL LOGISTICAL, HARVESTING, AND TRANSPORT CONTRACTS ISSUED ACROSS THE IRON DAISY AGRI NETWORK.
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
              {contracts.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777' }}>
                  <FileText size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No operational contracts available at this time.</p>
                </div>
              ) : (
                contracts.map(c => (
                  <div key={c.id} style={{ background:'rgba(40,40,40,0.9)', padding:'25px', borderLeft:`6px solid ${c.status === 'completed' ? '#666' : c.status === 'in_progress' ? '#f59e0b' : '#22c55e'}`, borderRadius:'4px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div style={{flex:1}}>
                      <h3 style={{margin:'0 0 5px 0', fontSize:'20px'}}>{c.title}</h3>
                      <p style={{margin:'0 0 10px 0', fontSize:'12px', color:'#aaa'}}>Client: <b>{c.client?.username || 'Executive Board'}</b></p>
                      <p style={{margin:'0 0 15px 0', fontSize:'13px', color:'#ccc', fontStyle:'italic'}}>"{c.description}"</p>
                      <div style={{display:'flex', gap:'20px', fontSize:'14px'}}>
                        <span style={{color:'#22c55e', fontWeight:'bold'}}>Payout: ${c.payout?.toLocaleString()}</span>
                        {c.assigned?.username && <span style={{color:'#bbb'}}>Assigned to: <b>{c.assigned.username}</b></span>}
                      </div>
                    </div>

                    <div style={{display:'flex', flexDirection:'column', gap:'10px', alignItems:'flex-end'}}>
                      <span style={{fontSize:'10px', fontWeight:'bold', background: c.status === 'completed' ? '#444' : c.status === 'in_progress' ? '#f59e0b' : '#22c55e', color:'#fff', padding:'3px 8px', borderRadius:'3px'}}>
                        {c.status.toUpperCase()}
                      </span>

                      {c.status === 'open' && (
                        <button onClick={()=>acceptContract(c)} style={{padding:'8px 15px', background:'#4a7ab5', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'12px', borderRadius:'4px', marginTop:'10px'}}>
                          ACCEPT CONTRACT
                        </button>
                      )}

                      {c.status === 'in_progress' && c.assigned_to === u.id && (
                        <button onClick={()=>completeContract(c)} style={{padding:'8px 15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'12px', borderRadius:'4px', marginTop:'10px'}}>
                          FULFILL & CLAIM
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
