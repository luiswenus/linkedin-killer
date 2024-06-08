import { createEmbeddings } from "@/utils/openai/service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await createEmbeddings(
      {
        name: "John Doe",
        created_at: "2021-10-10",
        embedding: null,
        id: "1",
        about_me: "I am a software engineer",
      },
      [
        {
          profile_name: "Jane Doe",
          other_profile_name: "John Doe",
          note: "He is a really good software engineer",
        },
      ]
    );

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
