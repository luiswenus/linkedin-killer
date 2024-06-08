import { updateEmbedding } from "@/utils/openai/service"
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams);
    const supabase = createClient();

    // TODO: search for profile_name: get all information about that person and combine the strings


    try {
        const profile_connection = {
            profile_name: queryParams.profile_name,
            other_profile_name: queryParams.other_profile_name,
            note: queryParams.note,
          }

        let { error } = await supabase.from("profile_connections").insert(profile_connection);
        const new_embedding = await updateEmbedding(queryParams.other_profile_name)
        await supabase.from("profiles").update({embedding: new_embedding}).eq("name", queryParams.other_profile_name)
        if (error?.code === "23503") {
            console.log("error", "23503")
            const profile = {
                name: queryParams.other_profile_name,
                about_me: "",
            }

            let error_insert_profile = (await supabase.from("profiles").insert(profile));
            console.log("error_insert_profile", error_insert_profile)
            let error_insert_profile_connection = await supabase.from("profile_connections").insert(profile_connection);
            const new_embedding = await updateEmbedding(queryParams.other_profile_name)
            await supabase.from("profiles").update({embedding: new_embedding}).eq("name", queryParams.other_profile_name)
            console.log("error_insert_profile_connection", error_insert_profile_connection)
        }
        
        return NextResponse.json({ message: "added connection successfully" }, { status: 200 });
      } catch(error) {
        return NextResponse.json({ error }, { status: 500 });
      }
}
