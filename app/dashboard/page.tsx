"use client";
import { useEffect, useState } from 'react';
import { sb } from "../../lib/supabase"; 
import { LogOut, Landmark, Flower2, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [p, setP] = useState<any>(null); 
  const [ld, setLd] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        // 1. Get the current user session
        const { data: { user }, error: authError } = await sb.auth.getUser();
        
        if (authError || !user) {
          window.location.href = '/';
          return;
        }

        // 2. Fetch the profile (using maybeSingle to prevent crashes if row is missing)
        const { data: profile, error: profError } = await sb
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (profError) {
          console.error("Profile fetch error:", profError);
        }

        setP(profile || { username: 'New Operator', balance: 0, rank: 'User' });
      } catch (err) {
        console.error("Dashboard Crash:", err);
        window.location.href = '/';
      } finally {
        setLd(false);
      }
    }
    checkAuth();
  }, []);

  if (ld) return (
    <div style={{background:'#1c1c1c', color:'#d4af37', height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:'serif'}}>
      <Loader2 className="animate-spin" size={24} />
      <p style={{marginTop:'15px', fontSize:'12px', letterSpacing:'2px'}}>SYNCHRONIZING WITH FARM NETWORK...</p>
    </div>
  );

  return (
    <div style={{ background:'#1c1c1c', minHeight:'100vh', color:'#f5f5dc', fontFamily:'serif' }}>
      {/* Navbar */}
      <div style={{ background:'#262626', padding:'15px 30px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #d4af37' }}>
        <div>
          <h2 style={{margin:0, fontSize:'16px', letterSpacing:'1px'}}>DAISY'S DREAM FARM</h2>
          <p style={{margin:0, fontSize:'9px', color:'#d4af37'}}>LOGGED IN: {p?.username?.toUpperCase()}</p>
        </div>
        <div style={{display:'flex', gap:'10px'}}>
          {p?.rank === 'Admin' && (
            <button onClick={()=>window.location.href='/admin/bank'} style={{background:'#d4af37', color:'#111', border:'none', padding:'5px 12px', cursor:'pointer', fontWeight:'bold', fontSize:'10px'}}>STAFF</button>
          )}
          <button onClick={() => sb.auth.signOut().then(() => window.location.href = '/')} style={{background:'none', border:'none', color:'#555', cursor:'pointer'}}><LogOut size={18}/></button>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ maxWidth:'500px', margin:'100px auto', textAlign:'center' }}>
        <Flower2 size={30} color="#d4af37" style={{marginBottom:'20px'}}/>
        <p style={{fontSize:'10px', color:'#555', letterSpacing:'2px', marginBottom:'5px'}}>AVAILABLE CREDITS</p>
        <h1 style={{fontSize:'60px', color:'#8da989', margin:0}}>${p?.balance?.toLocaleString() || '0'}</h1>
        
        <div style={{marginTop:'40px'}}>
          <button onClick={()=>window.location.href='/bank'} style={{background:'none', border:'1px solid #d4af37', color:'#d4af37', padding:'10px 25px', cursor:'pointer', fontSize:'14px', letterSpacing:'1px'}}>
            ACCESS VAULT
          </button>
        </div>
      </div>
    </div>
  );
}
