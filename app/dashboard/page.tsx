import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
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
          <h2 className="font-bold text-4xl mb-4 ">Add connection</h2>
          <form className="flex flex-col gap-4">
            <label htmlFor="name" className="text-md font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Name of person"
            />

            <label htmlFor="about" className="text-md font-medium">
              About
            </label>
            <textarea
              id="about"
              name="about"
              className="p-2 border border-gray-300 rounded-md h-32"
              placeholder="Give a natural language description of the person"
            />

            <button
              type="submit"
              className="bg-gray-700 text-white p-2 rounded-md mt-4"
            >
              Submit
            </button>
          </form>

          <h2 className="font-bold text-4xl mb-4 mt-32">Own connections</h2>
          <div className="flex flex-col border border-gray-300 rounded-xl shadow overflow-hidden">
            <input
              type="text"
              className="p-2 flex-grow"
              placeholder="Search connections..."
            />
            <button className="bg-gray-700 text-white p-2">Search</button>
          </div>
          <div className="flex items-center border border-gray-300 rounded-3xl p-4 shadow">
            <img
              src="https://picsum.photos/200"
              alt="Search Result"
              className="w-1/5 rounded-2xl"
            />
            <div className="w-4/5 pl-4">
              <h3 className="font-bold text-2xl mb-3">Luis Wenus</h3>
              <p className="text-gray-600">
                Luis Wenus is a software engineer and product designer based in
                Berlin. He is a product designer at Google and a software
                engineer at Apple. He is a product designer at Google and a
                software engineer at Apple, and a product designer at Microsoft.
                He also has a lot of connections.
              </p>
            </div>
          </div>
          <div className="flex items-center border border-gray-300 rounded-3xl p-4 shadow">
            <img
              src="https://picsum.photos/200"
              alt="Search Result"
              className="w-1/5 rounded-2xl"
            />
            <div className="w-4/5 pl-4">
              <h3 className="font-bold text-2xl mb-3">Luis Wenus</h3>
              <p className="text-gray-600">
                Luis Wenus is a software engineer and product designer based in
                Berlin. He is a product designer at Google and a software
                engineer at Apple. He is a product designer at Google and a
                software engineer at Apple, and a product designer at Microsoft.
                He also has a lot of connections.
              </p>
            </div>
          </div>
          <h2 className="font-bold text-4xl mb-4 mt-32">Other connections</h2>
          <div className="flex flex-col border border-gray-300 rounded-xl shadow overflow-hidden">
            <input
              type="text"
              className="p-2 flex-grow"
              placeholder="Try searching something like: 'Someone who is an AI researcher'"
            />
            <button className="bg-gray-700 text-white p-2">Search</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-gray-300 rounded-xl shadow p-4">
              <h3 className="font-bold text-2xl mb-3">Connection 1</h3>
              <p className="text-gray-600">
                This is a brief description of Connection 1. It provides some
                details about the connection.
              </p>
              <br></br>
              <span className="text-gray-600">Connection: </span>
              <a href="/connections/1" className="underline">
                Name
              </a>
            </div>
            <div className="border border-gray-300 rounded-xl shadow p-4">
              <h3 className="font-bold text-2xl mb-3">Connection 2</h3>
              <p className="text-gray-600">
                This is a brief description of Connection 2. It provides some
                details about the connection.
              </p>
              <br></br>
              <span className="text-gray-600">Connection: </span>
              <a href="/connections/1" className="underline">
                Name
              </a>
            </div>
            <div className="border border-gray-300 rounded-xl shadow p-4">
              <h3 className="font-bold text-2xl mb-3">Connection 3</h3>
              <p className="text-gray-600">
                This is a brief description of Connection 3. It provides some
                details about the connection.
              </p>
              <br></br>
              <span className="text-gray-600">Connection: </span>
              <a href="/connections/1" className="underline">
                Name
              </a>
            </div>
          </div>
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs font-bold">
        <p>The New LinkedIn</p>
      </footer>
    </div>
  );
}
