import { ProfileConnection } from "@/types/models";
import { openai } from "./client";

export const computeEmbedding = async (
  profile: { name?: string; about_me: string },
  profile_connections: ProfileConnection[]
) => {
  if (profile_connections == null) {
    profile_connections = [];
  }
  const input = `
This is a description of ${profile.name ?? "this person"}:
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
    model: "text-embedding-ada-002",
  });

  const stringifiedEmbedding = JSON.stringify(result.data[0].embedding);

  return stringifiedEmbedding;
};
