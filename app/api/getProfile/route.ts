import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const queryParams = Object.fromEntries(url.searchParams);
  const supabase = createClient();

  try {
    if (queryParams.hasOwnProperty('name')) {
      const { data: profiles } = await supabase.from("profiles").select().eq('name', queryParams.name);
      return NextResponse.json({ profiles }, { status: 200 });

    } else {
      const { data: profiles } = await supabase.from("profiles").select();
      return NextResponse.json({ profiles }, { status: 200 });

    }

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}