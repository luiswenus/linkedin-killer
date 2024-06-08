import { Profile, ProfileConnection } from "@/types/models";
import { openai } from "./client";

export const createEmbeddings = async (
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

  return input;
};
