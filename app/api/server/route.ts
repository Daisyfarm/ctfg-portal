import { supabase } from '@/db/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data: fields } = await supabase
    .from('montana_conquest')
    .select('is_owned');

  const ownedCount = fields?.filter((f: any) => f.is_owned).length || 0;

  // This returns just the number or a short string for the bot to read
  return new NextResponse(`${ownedCount}/122`);
}
