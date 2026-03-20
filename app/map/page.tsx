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
    try {
      const res = await fetch('/api/server');
      const sData = await res.json();
      if (sData) setData(sData);

      const { data: { user } } = await sb.auth.getUser();
      if (user) {
        const { data: prof } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
        setMyProfile(prof);
      }

      const { data: land } = await sb.from('land_registry').select('*');
      setDbLand(land || []);
    } catch (e) { console.log("Updating..."); }
  };

  const buy = async (fId: number, price: number, dbId: string) => {
    if (!myProfile) return alert("Log in first!");
    if (myProfile.balance < price) return alert("Insufficient funds!");
    if (confirm(`Buy Field ${fId} for $${price.toLocaleString()}?`)) {
      await sb.from('profiles').update({ balance: myProfile.balance - price }).eq('id', myProfile.id);
      await sb.from('land_registry').update({ owner_id: myProfile.id }).eq('id', dbId);
      await sb.from('transactions').insert([{ user_id: myProfile.id, amount: price, type: 'expense', description: `Purchased Field ${fId}` }]);
      alert("Field Purchased!");
      loadAll();
    }
  };

  useEffect(() => {
    import('leaflet').then((l) => setL(l));
    loadAll();
    const inv = setInterval(loadAll, 10000);
    return () => clearInterval(inv);
  }, []);

  if (!L) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Connecting to Montana...</div>;
  const conv = (v: number) => ((v + 2048) / 4096) * 100;

  return (
    <div style={{ background:'#000', minHeight:'100vh' }}>
      <button onClick={()=>window.location.href='/dashboard'} style={{position:'absolute', zIndex:1001, top:10, left:10, padding:'10px', background:'#1e293b', color:'#fff', border:'none', borderRadius:'8px'}}>← Back</button>
      
      <MapContainer crs={L.CRS.Simple} bounds={[[0,0],[100,100]]} style={{ height: '100vh', width: '100%' }} zoom={3} center={[50,50]}>
        <ImageOverlay url="/map.PNG" bounds={[[0,0],[100,100]]} />
        
        {data?.fields?.map((f:any) => {
          const info = dbLand.find(l => l.field_number === f.id);
          const isOwned = info?.owner_id || f.isOwned;
          return (
            <CircleMarker key={f.id} center={[100 - conv(f.z), conv(f.x)]} radius={isOwned ? 2 : 5} pathOptions={{ color: isOwned ? '#3b82f6' : '#22c55e', fillColor: isOwned ? '#3b82f6' : '#22c55e', fillOpacity: 0.7 }}>
              <Popup>
                <div style={{color:'#000', textAlign:'center', fontFamily:'sans-serif'}}>
                  <strong>Field {f.id}</strong><br/>
                  <p style={{margin:'5px 0'}}>{isOwned ? "Status: Occupied" : `$${info?.price?.toLocaleString() || 'Contact Admin'}`}</p>
                  {!isOwned && info && <button onClick={() => buy(f.id, info.price, info.id)} style={{background:'#22c55e', color:'#fff', border:'none', padding:'5px 10px', borderRadius:'5px', fontWeight:'bold', cursor:'pointer'}}>Buy Now</button>}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {data?.vehicles?.filter((v:any) => v.category !== "MISC").map((v:any, i:number) => (
          <Marker key={i} position={[100 - conv(v.z), conv(v.x)]} icon={L.divIcon({ html: `<div style="background:#22c55e; border:2px solid #fff; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center; font-size:12px; box-shadow:0 0 10px #000;">🚜</div>`, className: '', iconSize: [20, 20] })}>
            <Popup><div style={{color:'#000', textAlign:'center'}}><strong>{v.name}</strong><br/>{v.category}</div></Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
