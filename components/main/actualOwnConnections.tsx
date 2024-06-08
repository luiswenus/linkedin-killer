"use client";
import { useState, useEffect } from 'react';

interface Profile {
  other_profile_email: string;
  note: string;
}
interface OwnConnectionsProps {
  fetchConnections: () => void;
  profiles: Profile[];
}

export default function ActualOwnConnections({ fetchConnections, profiles }: OwnConnectionsProps) {

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <>
      <h2 className="font-bold text-4xl mb-4 mt-32">Own connections</h2>

      {profiles.map((profile, index) => (
        <div key={index} className="flex items-center border border-gray-300 rounded-3xl p-4 shadow">
          <img
            src="https://picsum.photos/200"
            alt="Search Result"
            className="w-1/5 rounded-2xl"
          />
          <div className="w-4/5 pl-4">
            <h3 className="font-bold text-2xl mb-3">{profile.other_profile_email}</h3>
            <p className="text-gray-600">{profile.note}</p>
          </div>
        </div>
      ))}
    </>
  );
}
