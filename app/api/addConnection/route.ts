import { computeEmbedding } from "@/utils/openai/service";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = createClient();

  // TODO: search for profile_name: get all information about that person and combine the strings

  const user = await supabase.auth.getUser();

  if (!user?.data?.user?.email) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }

  try {
    const profileConnection = {
      profile_email: user.data.user.email,
      other_profile_email: body.email,
      note: body.note,
    };

    const { data: supabaseProfileConnections = [] } = await supabase
      .from("profile_connections")
      .select()
      .eq("other_profile_email", profileConnection.other_profile_email);

    const { data: supabaseOtherProfile } = await supabase
      .from("profiles")
      .select()
      .eq("email", profileConnection.other_profile_email)
      .maybeSingle();

    const otherProfile = {
      ...supabaseOtherProfile,
      name: supabaseOtherProfile?.name ?? undefined,
      about_me: supabaseOtherProfile?.about_me ?? "",
    };

    const profileConnections = supabaseProfileConnections
      ? [...supabaseProfileConnections, profileConnection]
      : [profileConnection];

    const embedding = await computeEmbedding(otherProfile, profileConnections);

    if (!!supabaseOtherProfile) {
      console.log(
        "AAA updating profile",
        supabaseOtherProfile.email,
        embedding
      );
      await supabase
        .from("profiles")
        .update({ embedding })
        .eq("email", supabaseOtherProfile.email);
    } else {
      console.log(
        "AAA inserting profile",
        profileConnection.other_profile_email
      );
      await supabase.from("profiles").insert({
        email: profileConnection.other_profile_email,
        name: profileConnection.other_profile_email,
        about_me: "",
        embedding,
      });
    }

    await supabase.from("profile_connections").upsert(profileConnection);

    return NextResponse.json(
      { message: "added connection successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
