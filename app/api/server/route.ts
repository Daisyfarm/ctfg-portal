import { NextResponse } from 'next/server';

export async function GET() {
  const URL = "http://147.93.162.149:8170/feed/dedicated-server-stats.json?code=gm3bmu4jIlmo5zDt";
  
  try {
    // Standard timeout method that works everywhere
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 4000);

    const r = await fetch(URL, { 
      signal: controller.signal, 
      cache: 'no-store' 
    });
    
    clearTimeout(id);
    const d = await r.json();
    return NextResponse.json(d);
  } catch (e) {
    // If server is slow or offline, don't crash, just return null
    return NextResponse.json({ server: null });
  }
}
