import { NextResponse } from 'next/server';

export async function GET() {
  const URL = "http://147.93.162.149:8170/feed/dedicated-server-stats.json?code=gm3bmu4jIlmo5zDt";
  try {
    const r = await fetch(URL, { cache: 'no-store', signal: AbortSignal.timeout(3000) });
    const d = await r.json();
    return NextResponse.json(d);
  } catch (e) {
    // If the game server is slow/off, return this instead of an error
    return NextResponse.json({ server: { name: "Montana Server", slots: { used: 0, capacity: 0 } } });
  }
}
