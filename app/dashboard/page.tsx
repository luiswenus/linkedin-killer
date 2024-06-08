import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import AddPerson from "@/components/main/addPerson";
import OwnConnections from "@/components/main/ownConnections";
import OtherConnections from "@/components/main/otherConnections";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";



export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 w-full max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <AddPerson />
          <OwnConnections />
          <OtherConnections />
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs font-bold">
        <p>The New LinkedIn</p>
      </footer>
    </div>
  );
}

