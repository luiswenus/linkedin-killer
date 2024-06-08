import { openai } from "@/utils/openai/client";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

interface EnrichedProfile {
  notes: any[];
  about_me: string | null;
  created_at: string;
  email: string;
  name: string | null;
  user_id: string | null;
  summary?: string; // Add the summary property
}


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

    let enrichedData: EnrichedProfile[] = [];
    if (data) {
      for (const item of data) {
        const { data: notesData, error: notesError } = await supabase
          .from("profile_connections")
          .select("note")
          .eq("other_profile_email", item.email);

        if (notesError) {
          return NextResponse.json({ error: notesError.message }, { status: 500 });
        }

        const { embedding, ...itemWithoutEmbedding } = item;

        enrichedData.push({
          ...itemWithoutEmbedding,
          notes: notesData.map((noteItem: any) => noteItem.note),
        });
      }
    }

    for (const item of enrichedData) {
      const prompt = `Create a very short summary about the person based on the following notes and about_me:\nNotes: ${item.notes.join(
        ", "
      )}\nAbout Me: ${item.about_me} \n All other peoples' notes about me: ${item.notes.join(", ")}`;

      const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
        max_tokens: 200,
      });

      item.summary = response.choices[0].message.content?.trim();
    }

    console.log(enrichedData);
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json(enrichedData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
