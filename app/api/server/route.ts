import { NextResponse } from 'next/server';

export async function GET() {
  // PASTE YOUR SERVER WEB-API LINK BELOW
  const SERVER_URL = "http://147.93.162.149:8170/feed/dedicated-server-stats.xml?code=gm3bmu4jIlmo5zDt";

  try {
    const response = await fetch(SERVER_URL, { next: { revalidate: 30 } }); // Refresh every 30s
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Server Offline" }, { status: 500 });
  }
}
