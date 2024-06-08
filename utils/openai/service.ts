import { Profile, ProfileConnection } from "@/types/models";
import { openai } from "./client";
import { createClient } from "../supabase/server";


export const updateEmbedding = async (name: string) => {
  const supabase = createClient();
  const { data: profiles } = await supabase.from("profiles").select().eq('name', name);
  const { data: profile_connections } = await supabase.from("profile_connections").select().eq('other_profile_name', name);
  if (profiles && profiles.length == 1 && profile_connections != null) {
    const embedding = await computeEmbedding(profiles[0], profile_connections);
    return embedding;
  }
}

export const computeEmbedding = async (
  profile: Profile,
  profile_connections: ProfileConnection[]
) => {
  const input = `
This is a description of ${profile.name}:
${profile.about_me}

${profile_connections
  .map(
    (connection) =>
      `
This is what ${connection.profile_name} said about ${connection.other_profile_name}:
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
