import { NextResponse } from 'next/server';

export async function GET() {
  // We use the .json version of your link for better compatibility
  const SERVER_URL = "http://147.93.162.149:8170/feed/dedicated-server-stats.json?code=gm3bmu4jIlmo5zDt";

  try {
    const response = await fetch(SERVER_URL, { cache: 'no-store' });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Offline" }, { status: 500 });
  }
}
