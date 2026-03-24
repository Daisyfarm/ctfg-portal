import { NextResponse } from 'next/server';
import { sb } from '@/db/supabase'; // Changed to sb

export async function GET() {
  try {
    const { data, error } = await sb
      .from('montana_conquest')
      .select('*');

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
