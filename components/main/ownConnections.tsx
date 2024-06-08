"use client";
import { useState, useEffect } from 'react';

interface Profile {
  name: string;
  about_me: string;
}

export default function OwnConnections() {
  const [searchTerm, setSearchTerm] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch(`/api/getProfile${searchTerm ? `?name=${searchTerm}` : ''}`);
        const data = await response.json();
        setProfiles(data.profiles || []);
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    };

    fetchConnections();
  }, [searchTerm]);

  return (
    <>
      <h2 className="font-bold text-4xl mb-4 mt-32">Own connections</h2>
      <div className="flex flex-col border border-gray-300 rounded-xl shadow overflow-hidden">
        <input
          type="text"
          className="p-2 flex-grow"
          placeholder="Search connections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-gray-700 text-white p-2" onClick={() => setSearchTerm(searchTerm)}>Search</button>
      </div>
      {profiles.map((profile, index) => (
        <div key={index} className="flex items-center border border-gray-300 rounded-3xl p-4 shadow">
          <img
            src="https://picsum.photos/200"
            alt="Search Result"
            className="w-1/5 rounded-2xl"
          />
          <div className="w-4/5 pl-4">
            <h3 className="font-bold text-2xl mb-3">{profile.name}</h3>
            <p className="text-gray-600">{profile.about_me}</p>
          </div>
        </div>
      ))}
    </>
  );
}
