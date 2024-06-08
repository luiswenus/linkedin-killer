import { NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/server';
import { openai } from "@/utils/openai/client";

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const supabase = createClient();
    const searchQuery = requestBody.search_query;
    const queryEmbedding = await openai.embeddings.create({
      input: searchQuery,
      model: "text-embedding-3-small",
    });

    const result = await supabase.rpc('search_profiles', {
      query_embedding: JSON.stringify(queryEmbedding.data[0].embedding),
      match_threshold: -0.5,
      match_count: 10,
    })
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
