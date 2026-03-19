import { NextResponse } from 'next/server';

export async function GET() {
  const SERVER_URL = "http://147.93.162.149:8170/feed/dedicated-server-stats.json?code=gm3bmu4jIlmo5zDt";
  try {
    const r = await fetch(SERVER_URL, { cache: 'no-store', signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    return NextResponse.json(d);
  } catch (e) {
    return NextResponse.json({ server: null }, { status: 200 });
  }
}
