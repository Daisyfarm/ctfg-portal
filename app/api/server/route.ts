import { NextResponse } from 'next/server';

export async function GET() {
  const URL = "http://147.93.162.149:8170/feed/dedicated-server-stats.json?code=gm3bmu4jIlmo5zDt";
  
  try {
    const r = await fetch(URL, { 
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });
    
    if (!r.ok) return NextResponse.json({ server: null });
    
    const d = await r.json();
    return NextResponse.json(d);
  } catch (e) {
    return NextResponse.json({ server: null });
  }
}
