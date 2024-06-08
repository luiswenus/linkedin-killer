import { Database } from "./supabase";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileConnection =
  Database["public"]["Tables"]["profile_connections"]["Row"];
