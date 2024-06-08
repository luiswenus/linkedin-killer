"use client";
import { Profile } from "@/types/models";
import { useState } from "react";

export default function OwnConnections() {
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfiles = async (searchTerm: string) => {
    try {
      const response = await fetch(`/api/searchProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search_query: searchTerm }),
      });
      const data = await response.json();
      return data as Profile[];
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  const handleSearch = async () => {
    setProfiles(undefined);
    setIsLoading(true);
    const data = await fetchProfiles(searchTerm);
    setProfiles(data);
    setIsLoading(false);
  };

  return (
    <>
      <h2 className="font-bold text-4xl mb-4 mt-32">Search</h2>
      <div className="flex flex-col border border-gray-300 rounded-xl shadow overflow-hidden">
        <input
          type="text"
          className="p-2 flex-grow outline-none"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-gray-700 text-white p-2"
          onClick={() => {
            setSearchTerm(searchTerm);
            handleSearch();
          }}
        >
          Search
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {profiles?.map((profile, index) => (
        <div
          key={index}
          className="flex items-center border border-gray-300 rounded-3xl p-4 shadow"
        >
          <img
            src="https://picsum.photos/200"
            alt="Search Result"
            className="w-1/5 rounded-2xl"
          />
          <div className="w-4/5 pl-4">
            <h3 className="font-bold text-2xl mb-3">{profile.name}</h3>
            <h4 className="font-bold text-2xl mb-3">{profile.email}</h4>
            <p className="text-gray-600">{profile.about_me}</p>
          </div>
        </div>
      ))}
    </>
  );
}
