import { openai } from "@/utils/openai/client";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const supabase = createClient();
    const searchQuery = requestBody.search_query;
    const queryEmbedding = await openai.embeddings.create({
      input: searchQuery,
      model: "text-embedding-ada-002",
    });

    const { data, error } = await supabase.rpc("search_profiles", {
      query_embedding: JSON.stringify(queryEmbedding.data[0].embedding),
      match_threshold: 0.5,
      match_count: 4,
    });
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
