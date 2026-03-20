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
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function LiveMap() {
  const [data, setData] = useState<any>(null);
  const [land, setLand] = useState<any[]>([]);
  const [u, setU] = useState<any>(null);
  const [L, setL] = useState<any>(null);

  const load = async () => {
    try {
      const res = await fetch('/api/server');
      const sData = await res.json();
      const { data: { user } } = await sb.auth.getUser();
      const { data: dbL } = await sb.from('land_registry').select('*');
      
      setU(user);
      setData(sData);
      setLand(dbL || []);
    } catch (e) { console.log("error"); }
  };

  const buy = async (fId: number, price: number, rowId: string) => {
    const { data: prof } = await sb.from('profiles').select('balance, username').eq('id', u.id).single();
    if (prof.balance < price) return alert("No money!");
    if (confirm(`Buy Field ${fId}?`)) {
      await sb.from('profiles').update({ balance: prof.balance - price }).eq('id', u.id);
      await sb.from('land_registry').update({ owner_id: u.id }).eq('id', rowId);
      await fetch(HK, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({content:`🏡 ${prof.username} bought Field ${fId}!`}) }).catch(()=>0);
      alert("Bought!"); load();
    }
  };

  useEffect(() => {
    import('leaflet').then(l => setL(l));
    load();
  }, []);

  if (!L || !land.length) return <div style={{background:'#000',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading Map Data...</div>;
  const conv = (v: number) => ((v + 2048) / 4096) * 100;

  return (
    <div style={{ background:'#000', minHeight:'100vh' }}>
      <button onClick={()=>window.location.href='/dashboard'} style={{position:'absolute',zIndex:1001,top:10,left:10,padding:'10px',background:'#1e293b',color:'#fff',border:'none',borderRadius:'8px'}}>Back</button>
      <MapContainer crs={L.CRS.Simple} bounds={[[0,0],[100,100]]} style={{ height:'100vh', width:'100%' }} zoom={3} center={[50,50]}>
        <ImageOverlay url="/map.PNG" bounds={[[0,0],[100,100]]} />
        {data?.fields?.map((f:any) => {
          const info = land.find(l => Number(l.field_number) === Number(f.id));
          const owned = info?.owner_id ? true : false;
          return (
            <CircleMarker key={f.id} center={[100-conv(f.z), conv(f.x)]} radius={owned ? 3 : 6} pathOptions={{ color: owned ? '#3b82f6' : '#22c55e', fillColor: owned ? '#3b82f6' : '#22c55e', fillOpacity: 0.7 }}>
              <Popup><div style={{color:'#000',textAlign:'center'}}>
                <strong>Field {f.id}</strong><br/>
                {owned ? "OWNED" : `$${info?.price?.toLocaleString() || '150,000'}`}<br/>
                {!owned && info && <button onClick={()=>buy(f.id, info.price, info.id)} style={{background:'#22c55e',color:'#fff',border:'none',padding:'5px',borderRadius:'5px',marginTop:'5px'}}>Buy Now</button>}
              </div></Popup>
            </CircleMarker>
          );
        })}
        {data?.vehicles?.filter((v:any)=>v.category!=="MISC").map((v:any,i:number)=>(
          <Marker key={i} position={[100-conv(v.z), conv(v.x)]} icon={L.divIcon({ html:`<div style="background:#22c55e;border:2px solid #fff;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:12px;">🚜</div>`, className:'', iconSize:[20,20] })}>
            <Popup><div style={{color:'#000'}}>{v.name}</div></Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
