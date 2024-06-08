import { updateEmbedding } from '@/utils/openai/service';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const url = new URL(request.url);
  const queryParams = Object.fromEntries(url.searchParams);
  const supabase = createClient();
  
  try {
    const { error } = await supabase.from("profiles").insert(
      {
        user_id: queryParams.user_id,
        email: queryParams.email,
        name: queryParams.name,
        about_me: queryParams.about_me,
      }
    );
    console.log("insert profile: ", error);
  } catch(error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  try {
    const embeddingResponse = await updateEmbedding(queryParams.email);
    const embedding = embeddingResponse?.data[0].embedding;
    console.log(embedding);
    const embeddingStr = JSON.stringify(embeddingResponse?.data[0].embedding);
    console.log(embeddingStr);
    const { error } = await supabase.from("profiles").update({ embedding: embeddingStr }).eq("name", queryParams.name);
    //const error = await supabase.from("profiles").select().eq("name", queryParams.name);
    console.log("insert embedding: ", error);
  } catch(error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ message: "user added successfully" }, { status: 200 });
}