"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Flag, Shield, Sword, MapPin, Trophy, DollarSign } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function ConquestPage() {
  const [u, setU] = useState<any>(null);
  const [territories, setTerritories] = useState<any[]>([]);
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: terrData } = await sb
      .from('territories')
      .select('*, owner:profiles!territories_owner_id_fkey(username), company:companies!territories_company_id_fkey(name, tag)')
      .order('name', { ascending: true });

    setTerritories(terrData || []);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const claimTerritory = async (terr: any) => {
    if (!u) return;
    const claimCost = terr.cost || 10000;

    if (u.balance < claimCost) {
      return alert(`Insufficient funds. Claiming ${terr.name} requires $${claimCost.toLocaleString()}.`);
    }

    if (!confirm(`Are you sure you want to claim ${terr.name} for $${claimCost.toLocaleString()}?`)) return;

    // Update territory owner
    const { error } = await sb
      .from('territories')
      .update({ owner_id: u.id, status: 'controlled' })
      .eq('id', terr.id);

    if (error) {
      return alert("Error claiming territory: " + error.message);
    }

    // Deduct balance
    await sb.from('profiles').update({ balance: u.balance - claimCost }).eq('id', u.id);

    // Discord Alert
    await fetch(HK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `⚔️ **TERRITORY CONQUEST**\n**${u.username}** has successfully claimed and secured **${terr.name}** within the Iron Daisy Agri network!`
      })
    });

    alert(`Successfully conquered ${terr.name}!`);
    load();
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Regional Conquest Feed...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/conquest'}><Sword size={16}/> Regional Conquest</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Regional Conquest</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              SECURE AGRICULTURAL SECTORS, ESTABLISH REGIONAL DOMINANCE, AND EXPAND YOUR SPHERE OF INFLUENCE ACROSS MONTANA FIELD OPERATIONS.
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'20px' }}>
              {territories.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777', gridColumn:'1 / -1' }}>
                  <MapPin size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No regional territories configured in the sector database yet.</p>
                </div>
              ) : (
                territories.map(t => (
                  <div key={t.id} style={{ background:'rgba(35,35,35,0.95)', padding:'25px', borderLeft:`6px solid ${t.owner_id === u.id ? '#22c55e' : '#4a7ab5'}`, borderRadius:'4px', display:'flex', flexDirection:'column', gap:'12px' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <h3 style={{margin:0, fontSize:'20px'}}>{t.name}</h3>
                      <span style={{fontSize:'10px', background:'#222', padding:'3px 8px', borderRadius:'3px', color: t.owner_id ? '#22c55e' : '#f59e0b', fontWeight:'bold'}}>
                        {t.owner_id ? 'SECURED' : 'UNCLAIMED'}
                      </span>
                    </div>

                    <p style={{margin:0, fontSize:'13px', color:'#aaa', fontStyle:'italic'}}>"{t.description || 'Strategic agricultural land sector.'}"</p>

                    <div style={{borderTop:'1px solid #444', paddingTop:'10px', display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#ccc'}}>
                      <span>Controller: <b>{t.owner?.username || 'None'}</b></span>
                      <span style={{color:'#22c55e', fontWeight:'bold'}}>Cost: ${t.cost?.toLocaleString() || '10,000'}</span>
                    </div>

                    {t.owner_id !== u.id && (
                      <button 
                        onClick={()=>claimTerritory(t)}
                        style={{ marginTop:'5px', padding:'10px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', borderRadius:'4px', fontSize:'12px' }}
                      >
                        CLAIM SECTOR (${t.cost?.toLocaleString() || '10,000'})
                      </button>
                    )}
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
