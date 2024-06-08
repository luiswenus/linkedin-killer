import { NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/server';
import { openai } from "@/utils/openai/client";


export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams);
    const supabase = createClient();

    const searchQuery = queryParams["search_query"]
    const queryEmbedding = await openai.embeddings.create({
      input: searchQuery,
      model: "text-embedding-3-small",
    });

    const { data: documents } = await supabase.rpc('search_profiles', {
      query_embedding: JSON.stringify(queryEmbedding.data[0].embedding),
      match_threshold: -0.99,
      match_count: 10,
    })
    return NextResponse.json({ documents }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
