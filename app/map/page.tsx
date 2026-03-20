"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { createClient } from '@supabase/supabase-js';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(m => m.CircleMarker), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function LiveMap() {
  const [data, setData] = useState<any>(null);
  const [dbLand, setDbLand] = useState<any[]>([]);
  const [myProfile, setMyProfile] = useState<any>(null);
  const [L, setL] = useState<any>(null);

  const loadAll = async () => {
    const res = await fetch('/api/server');
    const sData = await res.json();
    setData(sData);

    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: prof } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setMyProfile(prof);
    }

    const { data: land } = await sb.from('land_registry').select('*, profiles(username)');
    setDbLand(land || []);
  };

  const handleBuy = async (field: any, dbInfo: any) => {
    if (!myProfile) return alert("Please log in first.");
    if (!dbInfo) return alert("Land info not found in database.");
    if (myProfile.balance < dbInfo.price) return alert("Insufficient funds!");

    if (confirm(`Purchase Field ${field.id} for $${dbInfo.price.toLocaleString()}?`)) {
      // 1. Deduct Money
      await sb.from('profiles').update({ balance: myProfile.balance - dbInfo.price }).eq('id', myProfile.id);
      // 2. Set Owner
      await sb.from('land_registry').update({ owner_id: myProfile.id }).eq('id', dbInfo.id);
      // 3. Log Activity
      await sb.from('transactions').insert([{ user_id: myProfile.id, amount: dbInfo.price, type: 'expense', description: `Purchased Field ${field.id}` }]);
      
      alert("Purchase successful!");
      loadAll(); // Refresh map
    }
  };

  useEffect(() => {
    import('leaflet').then((leaflet) => { setL(leaflet); });
    loadAll();
    const interval = setInterval(loadAll, 10000); 
    return () => clearInterval(interval);
  }, []);

  if (!L) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Syncing Montana Map...</div>;

  const convert = (val: number) => ((val + 2048) / 4096) * 100;

  return (
    <div style={{ background:'#000', minHeight:'100vh' }}>
      <button onClick={()=>window.location.href='/dashboard'} style={{position:'absolute', zIndex:1001, top:10, left:10, padding:'10px 15px', borderRadius:'8px', border:'none', background:'#1e293b', color:'#fff', cursor:'pointer', fontWeight:'bold', boxShadow:'0 4px 15px #000'}}>← Back</button>
      
      <MapContainer crs={L.CRS.Simple} bounds={[[0,0],[100,100]]} style={{ height: '100vh', width: '100%' }} zoom={3} center={[50,50]}>
        <ImageOverlay url="/map.PNG" bounds={[[0,0],[100,100]]} />
        
        {data?.fields?.map((f:any) => {
          const info = dbLand.find(l => l.field_number === f.id);
          const isOwned = info?.owner_id || f.isOwned;

          return (
            <CircleMarker 
              key={`f-${f.id}`} 
              center={[100 - convert(f.z), convert(f.x)]}
              radius={isOwned ? 2 : 4}
              pathOptions={{ color: isOwned ? '#3b82f6' : '#22c55e', fillColor: isOwned ? '#3b82f6' : '#22c55e', fillOpacity: 0.7 }}
            >
              <Popup>
                <div style={{color:'#000', textAlign:'center', fontFamily:'sans-serif'}}>
                  <strong style={{fontSize:'16px'}}>Field {f.id}</strong><br/>
                  <span style={{fontSize:'12px', color:'#666'}}>{info?.acres || '??'} Acres</span>
                  <div style={{margin:'8px 0', fontWeight:'bold', color: isOwned ? '#3b82f6' : '#166534'}}>
                    {isOwned ? `Owner: ${info?.profiles?.username || 'In-Game'}` : `$${info?.price?.toLocaleString() || 'N/A'}`}
                  </div>
                  {!isOwned && <button onClick={() => handleBuy(f, info)} style={{background:'#22c55e', color:'#fff', border:'none', padding:'8px 12px', borderRadius:'8px', cursor:'pointer', fontWeight:'bold'}}>Buy This Field</button>}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {/* LIVE VEHICLES */}
        {data?.vehicles?.filter((v:any) => v.category !== "MISC").map((v:any, i:number) => {
          const player = data?.slots?.players?.find((p:any) => p.isUsed && Math.abs(p.x - v.x) < 15 && Math.abs(p.z - v.z) < 15);
          return (
            <Marker key={`v-${i}`} position={[100 - convert(v.z), convert(v.x)]} icon={L.divIcon({
                html: `<div style="position:relative; display:flex; flex-direction:column; align-items:center;">
                    ${player ? `<div style="background:rgba(34,197,94,0.9); color:#fff; padding:2px 6px; border-radius:4px; font-size:10px; font-weight:bold; margin-bottom:4px; border:1px solid #fff; white-space:nowrap; box-shadow:0 2px 4px #000;">${player.name}</div>` : ''}
                    <div style="background:#fff; border:2px solid #22c55e; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center; font-size:12px; box-shadow:0 0 10px #000;">🚜</div>
                  </div>`,
                className: '', iconSize: [22, 22]
              })}>
              <Popup><div style={{textAlign:'center', color:'#000'}}><strong>{v.name}</strong><br/>{player ? 'Status: Active' : 'Status: Parked'}</div></Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
