import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, note } = await request.json();

  const supabase = createClient();
  
  try {
    const { error } = await supabase.from("profile_connections").insert(
      {
        profile_email: "luis@wenus.com",
        other_profile_email: email,
        note: note,
      }
    );
    return NextResponse.json({ message: "user added successfully" }, { status: 200 });
  } catch(error) {
    return NextResponse.json({ error }, { status: 500 });
  }

}
