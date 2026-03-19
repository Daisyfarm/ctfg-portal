"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function LiveMap() {
  const [fields, setFields] = useState<any[]>([]);
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
    sb.from('land_registry').select('*, profiles(username)').then(({data}) => setFields(data || []));
  }, []);

  if (!L) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',padding:'20px'}}>Loading Montana Map...</div>;

  const bounds: [[number, number], [number, number]] = [[0, 0], [100, 100]];

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', fontFamily:'sans-serif' }}>
      <div style={{ padding:'10px', display:'flex', justifyContent:'space-between' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'#1e293b', color:'#fff', border:'none', padding:'8px 15px', borderRadius:'8px', cursor:'pointer'}}>Back</button>
        <h2 style={{margin:0, color:'#22c55e'}}>Montana Live Map</h2>
      </div>
      <div style={{ height:'calc(100vh - 60px)', width:'100%' }}>
        <MapContainer crs={L.CRS.Simple} bounds={bounds} style={{ height: '100%', width: '100%', background:'#000' }}>
          <ImageOverlay url="https://i.imgur.com/8K5QZ6u.png" bounds={bounds} />
          {fields.map(f => (
            <Marker key={f.id} position={[f.y_pos, f.x_pos]}>
              <Popup>
                <div style={{textAlign:'center', color:'#000'}}>
                    <strong>Field {f.field_number}</strong><br/>
                    {f.owner_id ? `Owner: ${f.profiles?.username}` : `$${f.price?.toLocaleString()}`}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
