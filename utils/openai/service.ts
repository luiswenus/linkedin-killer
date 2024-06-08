import { Profile, ProfileConnection } from "@/types/models";
import { openai } from "./client";
import { createClient } from "../supabase/server";


export const updateEmbedding = async (email: string) => {
  const supabase = createClient();
  const { data: profiles } = await supabase.from("profiles").select().eq('email', email);
  const { data: profile_connections } = await supabase.from("profile_connections").select().eq('other_profile_email', email);
  if (profiles && profiles.length == 1 && profile_connections != null) {
    const embedding = await computeEmbedding(profiles[0], profile_connections);
    return embedding;
  }
}

export const computeEmbedding = async (
  profile: Profile,
  profile_connections: ProfileConnection[]
) => {
  if (profile_connections == null) {
    profile_connections = [];
  }
  const input = `
This is a description of ${profile.name}:
${profile.about_me}

${profile_connections
  .map(
    (connection) =>
      `
This is what ${connection.profile_email} said about ${connection.other_profile_email}:
${connection.note}
`
  )
  .join("\n")}
`;

  const result = await openai.embeddings.create({
    input: input,
    model: "text-embedding-3-small",
  });

  return result;
};
