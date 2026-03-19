import { NextResponse } from 'next/server';

export async function GET() {
  const SERVER_URL = "http://147.93.162.149:8170/feed/dedicated-server-stats.json?code=gm3bmu4jIlmo5zDt";

  try {
    // 1. Create a timeout (5 seconds) so the website doesn't hang
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(SERVER_URL, { 
      signal: controller.signal,
      cache: 'no-store' 
    });

    clearTimeout(timeoutId);

    if (!response.ok) throw new Error("Server Response Not OK");

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.log("FS Server Fetch Failed:", error);
    // 2. Return a "Safe" offline response instead of a 500 Error
    return NextResponse.json({ server: null, status: "offline" });
  }
}
