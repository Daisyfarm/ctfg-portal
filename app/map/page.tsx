"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

export default function LiveMap() {
  const [data, setData] = useState<any>(null);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    import('leaflet').then((leaflet) => {
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
      setL(leaflet);
    });

    const fetchStatus = () => {
      fetch('/api/server').then(r => r.json()).then(d => setData(d)).catch(() => null);
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  if (!L) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',padding:'20px',textAlign:'center'}}>Loading Montana Map...</div>;

  // Conversion: Montana 4x is 4096 units.
  const convert = (val: number) => ((val + 2048) / 4096) * 100;

  return (
    <div style={{ background:'#000', minHeight:'100vh' }}>
      <button onClick={()=>window.location.href='/dashboard'} style={{position:'absolute', zIndex:1000, top:10, left:10, padding:'10px', borderRadius:'8px', border:'none', background:'#1e293b', color:'#fff', cursor:'pointer'}}>Back</button>
      
      <MapContainer crs={L.CRS.Simple} bounds={[[0,0],[100,100]]} style={{ height: '100vh', width: '100%' }}>
        <ImageOverlay url="https://i.postimg.cc/qR086X8m/montana-pda.png" bounds={[[0,0],[100,100]]} />
        
        {/* FIELDS */}
        {data?.fields?.map((f:any) => (
          <Marker key={`f-${f.id}`} position={[100 - convert(f.z), convert(f.x)]}>
            <Popup>
              <div style={{textAlign:'center', color:'#000'}}>
                <strong>Field {f.id}</strong><br/>
                {f.isOwned ? "✅ Owned" : "💰 Available"}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* LIVE TRACTORS */}
        {data?.vehicles?.filter((v:any) => v.category !== "MISC").map((v:any, i:number) => (
          <Marker 
            key={`v-${i}`} 
            position={[100 - convert(v.z), convert(v.x)]}
            icon={L.divIcon({
              html: `<div style="background:#22c55e; border:2px solid #fff; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:14px; box-shadow:0 0 10px #000;">🚜</div>`,
              className: '',
              iconSize: [24, 24]
            })}
          >
            <Popup>
              <div style={{textAlign:'center', color:'#000'}}>
                <strong>{v.name}</strong><br/>
                <span>{v.category}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
