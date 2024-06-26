import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET(request: Request) {
  const supabase = createClient();
  const openai = new OpenAI({
    apiKey: process.env.NEXT_OPENAI_KEY,
  });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Fetch first degree connections
    const { data: firstDegreeConnections, error: firstDegreeError } = await supabase
      .from("profile_connections")
      .select("other_profile_email")
      .eq("profile_email", user.email);
    if (firstDegreeError) {
      return NextResponse.json({ error: firstDegreeError.message }, { status: 500 });
    }

    // Fetch second degree connections
    const { data: secondDegreeConnections, error: secondDegreeError } = await supabase
      .from("profile_connections")
      .select("other_profile_email, note")
      .in("other_profile_email", firstDegreeConnections.map(conn => conn.other_profile_email));

    if (secondDegreeError) {
      return NextResponse.json({ error: secondDegreeError.message }, { status: 500 });
    }

    // Fetch profiles that are within second degree connections
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("email, about_me")
      .in("email", secondDegreeConnections.map(conn => conn.other_profile_email));

    if (profilesError) {
      throw profilesError;
    }

    // Group notes, about_me, and mutual connections by email
    const groupedData: {
      [key: string]: { notes: string[]; about_me: string; summary?: string; mutual_connections: string[] };
    } = {};
    secondDegreeConnections.forEach((connection) => {
      if (!groupedData[connection.other_profile_email]) {
        groupedData[connection.other_profile_email] = {
          notes: [],
          about_me: "",
          mutual_connections: [],
        };
      }
      groupedData[connection.other_profile_email].notes.push(connection.note);
    });

    profiles.forEach((profile) => {
      if (!groupedData[profile.email]) {
        groupedData[profile.email] = { notes: [], about_me: "", mutual_connections: [] };
      }
      groupedData[profile.email].about_me = profile.about_me ?? "";
    });

    // Add mutual connections to grouped data
    for (const connection of firstDegreeConnections) {
      const { data: mutualConnections, error: mutualConnectionsError } = await supabase
        .from("profile_connections")
        .select("profile_email")
        .eq("other_profile_email", connection.other_profile_email);

      if (mutualConnectionsError) {
        return NextResponse.json({ error: mutualConnectionsError.message }, { status: 500 });
      }

      mutualConnections.forEach((mutualConnection) => {
        if (groupedData[connection.other_profile_email]) {
          groupedData[connection.other_profile_email].mutual_connections.push(
            mutualConnection.profile_email === user.email ? "Yourself" : mutualConnection.profile_email
          );
        }
      });
    }

    // Generate summaries using OpenAI SDK
    for (const email in groupedData) {
      const personData = groupedData[email];
      const prompt = `Create a very short summary about the person based on the following notes and about_me:\nNotes: ${personData.notes.join(
        ", "
      )}\nAbout Me: ${personData.about_me}`;

      const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
        max_tokens: 200,
      });

      personData.summary = response.choices[0].message.content?.trim();
    }

    return NextResponse.json({ groupedData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
