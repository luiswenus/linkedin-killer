"use client";

import { useState } from "react";
import AddPerson from "@/components/main/addPerson";
import OwnConnections from "@/components/main/ownConnections";
import OtherConnections from "@/components/main/otherConnections";

export default function Connections() {
  const [profiles, setProfiles] = useState([]);

  const fetchConnections = async () => {
    try {
      const response = await fetch(`/api/getProfileConnection`);
      const data = await response.json();
      setProfiles(data.profiles || []);
    } catch (error) {
      console.error("Error fetching connections:", error);
      setProfiles([]);
    }
  };

  return (
    <>
      <AddPerson fetchConnections={fetchConnections} />
      <OwnConnections fetchConnections={fetchConnections} profiles={profiles} />
      <OtherConnections />
    </>
  );
}
