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

  const load = async () => {
    try {
      const res = await fetch('/api/server');
      const sData = await res.json();
      setData(sData);

      const { data: { user } } = await sb.auth.getUser();
      if (user) {
        const { data: prof } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
        setMyProfile(prof);
      }

      const { data: land } = await sb.from('land_registry').select('*, profiles(username)');
      setDbLand(land || []);
    } catch (e) { console.log("Waiting for data..."); }
  };

  useEffect(() => {
    import('leaflet').then((leaflet) => { setL(leaflet); });
    load();
    const interval = setInterval(load, 10000); 
    return () => clearInterval(interval);
  }, []);

  if (!L) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',padding:'20px'}}>Connecting...</div>;
  const convert = (val: number) => ((val + 2048) / 4096) * 100;

  return (
    <div style={{ background:'#000', minHeight:'100vh' }}>
      <button onClick={()=>window.location.href='/dashboard'} style={{position:'absolute', zIndex:1001, top:10, left:10, padding:'10px', background:'#1e293b', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer'}}>← Back</button>
      
      <MapContainer crs={L.CRS.Simple} bounds={[[0,0],[100,100]]} style={{ height: '100vh', width: '100%' }} zoom={3} center={[50,50]}>
        <ImageOverlay url="/map.PNG" bounds={[[0,0],[100,100]]} />
        
        {data?.fields?.map((f:any) => {
          const info = dbLand.find(l => l.field_number === f.id);
          const isOwned = info?.owner_id || f.isOwned;
          return (
            <CircleMarker key={`f-${f.id}`} center={[100 - convert(f.z), convert(f.x)]} radius={isOwned ? 2 : 4} pathOptions={{ color: isOwned ? '#3b82f6' : '#22c55e', fillColor: isOwned ? '#3b82f6' : '#22c55e', fillOpacity: 0.7 }}>
              <Popup>
                <div style={{color:'#000', textAlign:'center'}}>
                  <strong>Field {f.id}</strong><br/>
                  {isOwned ? `Owner: ${info?.profiles?.username || 'System'}` : `$${info?.price?.toLocaleString() || 'N/A'}`}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {data?.vehicles?.filter((v:any) => v.category !== "MISC").map((v:any, i:number) => (
          <Marker key={`v-${i}`} position={[100 - convert(v.z), convert(v.x)]} icon={L.divIcon({ html: `<div style="background:#22c55e; border:2px solid #fff; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center; font-size:12px; box-shadow:0 0 10px #000;">🚜</div>`, className: '', iconSize: [20, 20] })}>
            <Popup><div style={{color:'#000'}}>{v.name}</div></Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
