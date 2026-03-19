import { NextResponse } from 'next/server';

export async function GET() {
  const URL = "http://147.93.162.149:8170/feed/dedicated-server-stats.json?code=gm3bmu4jIlmo5zDt";
  
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // 3 second limit

    const r = await fetch(URL, { signal: controller.signal, cache: 'no-store' });
    clearTimeout(timeout);

    if (!r.ok) return NextResponse.json({ server: null });

    const d = await r.json();
    return NextResponse.json(d);
  } catch (e) {
    // Return a healthy empty response instead of an error
    return NextResponse.json({ server: null });
  }
}
