import { updateEmbedding } from '@/utils/openai/service';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const url = new URL(request.url);
  const queryParams = Object.fromEntries(url.searchParams);
  const supabase = createClient();
  
  try {
    const embedding = await updateEmbedding(queryParams.name);
    const { error } = await supabase.from("profiles").insert(
      {
        name: queryParams.name,
        note: queryParams.about_me,
        embedding: embedding,
      }
    );
    return NextResponse.json({ message: "user added successfully" }, { status: 200 });
  } catch(error) {
    return NextResponse.json({ error }, { status: 500 });
  }

}