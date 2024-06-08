import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, about_me } = await request.json();

  const supabase = createClient();
  
  try {
    const { error } = await supabase.from("profiles").insert(
      {
        name: name,
        about_me: about_me,
      }
    );
    return NextResponse.json({ message: "user added successfully" }, { status: 200 });
  } catch(error) {
    return NextResponse.json({ error }, { status: 500 });
  }

}
