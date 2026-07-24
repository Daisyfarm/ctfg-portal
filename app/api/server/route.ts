import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  'https://dlwhztcqntalrhfrefsk.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY'
);

export async function GET(request: Request) {
  try {
    // Fetch system metrics from Supabase for Iron Daisy Agri
    const { count: userCount, error: userError } = await sb
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    const { data: serverStatus, error: statusError } = await sb
      .from('system_status')
      .select('*')
      .single();

    return NextResponse.json({
      success: true,
      network: "Iron Daisy Agri",
      status: "ONLINE",
      timestamp: new Date().toISOString(),
      metrics: {
        registered_operatives: userCount || 0,
        server_state: serverStatus || { operational: true, region: "Montana 4X" }
      }
    });
  } catch (err: any) {
    return NextResponse.json({ 
      success: false, 
      error: err.message || "Internal Server Error" 
    }, { status: 500 });
  }
}
