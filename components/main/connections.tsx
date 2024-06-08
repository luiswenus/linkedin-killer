"use client";

import { useState } from "react";
import AddPerson from "@/components/main/addPerson";
import OtherConnections from "@/components/main/otherConnections";
import OwnConnections from "@/components/main/ownConnections";

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
      <AddPerson />
      <OwnConnections />
      <OtherConnections />
    </>
  );
}
