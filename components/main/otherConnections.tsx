import { useState, useEffect } from "react";

interface Connection {
  notes: string[];
  about_me: string;
  summary?: string;
}

export default function OtherConnections() {
  const [connections, setConnections] = useState<{ [key: string]: Connection }>(
    {}
  );

  useEffect(() => {
    const fetchConnections = async () => {
      const response = await fetch("/api/getSecondDegreeProfiles");
      const data = await response.json();
      setConnections(data.groupedData);
    };

    fetchConnections();
  }, []);

  return (
    <>
      <h2 className="font-bold text-4xl mb-4 mt-32">Other connections</h2>
      <div className="flex flex-col border border-gray-300 rounded-xl shadow overflow-hidden">
        <input
          type="text"
          className="p-2 flex-grow outline-none"
          placeholder="Try searching something like: 'Someone who is an AI researcher'"
        />
        <button className="bg-gray-700 text-white p-2">Search</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(connections).map((email) => (
          <div
            key={email}
            className="border border-gray-300 rounded-xl shadow p-4"
          >
            <h3 className="font-bold text-2xl mb-3">
              <a href={`/dashboard/profile/${email}`} className="underline">
                {email}
              </a>
            </h3>
            <p className="text-gray-600">
              {connections[email].summary || "No description available."}
            </p>
            <br></br>
            <span className="text-gray-600">Connection: </span>
            <a href={`/connections/${email}`} className="underline">
              {email}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
