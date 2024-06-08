import { SubmitButton } from "@/components/submit-button";
import { computeEmbedding } from "@/utils/openai/service";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const aboutMe = formData.get("aboutMe") as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error || !data?.user) {
      console.log(error);
      return redirect("/login?message=Could not authenticate user");
    }

    const { data: profileConnections } = await supabase
      .from("profile_connections")
      .select()
      .eq("other_profile_email", email);

    const profile = {
      email,
      name,
      user_id: data?.user?.id,
      about_me: aboutMe,
    };

    const embedding = await computeEmbedding(profile, profileConnections ?? []);

    await supabase.from("profiles").upsert({ ...profile, embedding });

    return redirect("/dashboard");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="name">
          Name
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="name"
          placeholder="Your Name"
          required
        />
        <label className="text-md" htmlFor="aboutMe">
          About me
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="aboutMe"
          placeholder="About me"
          required
        />
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signUp}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing up..."
        >
          Sign Up
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
