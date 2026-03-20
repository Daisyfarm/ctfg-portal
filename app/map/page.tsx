"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(m => m.CircleMarker), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

export default function LiveMap() {
  const [data, setData] = useState<any>(null);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    import('leaflet').then((leaflet) => { setL(leaflet); });
    const fetchStatus = () => {
      fetch('/api/server').then(r => r.json()).then(d => setData(d)).catch(() => null);
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000); 
    return () => clearInterval(interval);
  }, []);

  if (!L) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>Loading Judith Plains...</div>;

  // Conversion: Montana 4x is 4096 units (-2048 to 2048).
  const convert = (val: number) => ((val + 2048) / 4096) * 100;

  return (
    <div style={{ background:'#000', minHeight:'100vh' }}>
      <button onClick={()=>window.location.href='/dashboard'} style={{position:'absolute', zIndex:1000, top:10, left:10, padding:'10px 15px', borderRadius:'8px', border:'none', background:'#1e293b', color:'#fff', cursor:'pointer', fontWeight:'bold', fontSize:'14px', boxShadow:'0 4px 15px rgba(0,0,0,0.5)'}}>← Dashboard</button>
      
      <MapContainer crs={L.CRS.Simple} bounds={[[0,0],[100,100]]} style={{ height: '100vh', width: '100%', background: '#111' }}>
        {/* THIS MUST MATCH THE FILENAME map.PNG EXACTLY */}
        <ImageOverlay url="/map.PNG" bounds={[[0,0],[100,100]]} opacity={1} zIndex={1} />
        
        {/* FIELD DOTS */}
        {data?.fields?.map((f:any) => (
          <CircleMarker 
            key={`f-${f.id}`} 
            center={[100 - convert(f.z), convert(f.x)]}
            radius={2}
            pathOptions={{ color: f.isOwned ? '#3b82f6' : '#22c55e', fillColor: f.isOwned ? '#3b82f6' : '#22c55e', fillOpacity: 0.5 }}
          >
            <Popup><div style={{color:'#000', textAlign:'center'}}><strong>Field {f.id}</strong><br/>{f.isOwned ? "Owned" : "Available"}</div></Popup>
          </CircleMarker>
        ))}

        {/* LIVE VEHICLES WITH PLAYER NAMES */}
        {data?.vehicles?.filter((v:any) => v.category !== "MISC").map((v:any, i:number) => {
          const player = data?.slots?.players?.find((p:any) => 
            p.isUsed && Math.abs(p.x - v.x) < 12 && Math.abs(p.z - v.z) < 12
          );

          return (
            <Marker 
              key={`v-${i}`} 
              position={[100 - convert(v.z), convert(v.x)]}
              icon={L.divIcon({
                html: `
                  <div style="position:relative; display:flex; flex-direction:column; align-items:center;">
                    ${player ? `<div style="background:rgba(34,197,94,0.9); color:#fff; padding:2px 6px; border-radius:4px; font-size:10px; font-weight:bold; margin-bottom:4px; border:1px solid #fff; white-space:nowrap; box-shadow:0 2px 4px #000;">${player.name}</div>` : ''}
                    <div style="background:#22c55e; border:2px solid #fff; border-radius:50%; width:22px; height:22px; display:flex; align-items:center; justify-content:center; font-size:12px; box-shadow:0 0 10px #000;">🚜</div>
                  </div>`,
                className: '',
                iconSize: [22, 22]
              })}
            >
              <Popup>
                <div style={{textAlign:'center', color:'#000'}}>
                  <strong>{v.name}</strong><br/>
                  <span style={{fontSize:'12px', color:'#666'}}>{v.category}</span>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
