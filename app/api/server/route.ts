import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const r = await fetch("http://147.93.162.149:8170/feed/dedicated-server-stats.json?code=gm3bmu4jIlmo5zDt", { cache: 'no-store' });
    const d = await r.json();
    return NextResponse.json(d);
  } catch (e) {
    return NextResponse.json({ server: null });
  }
}
