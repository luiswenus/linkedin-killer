import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const queryParams = Object.fromEntries(url.searchParams);
  const supabase = createClient();

  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user?.email) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }
    const { data: profiles } = await supabase
      .from("profile_connections")
      .select()
      .eq("profile_email", user.email);
    return NextResponse.json({ profiles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
