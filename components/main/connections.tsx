"use client";

import AddPerson from "@/components/main/addPerson";
import OtherConnections from "@/components/main/otherConnections";
import OwnConnections from "@/components/main/ownConnections";

export default function Connections() {
  return (
    <>
      <AddPerson />
      <OwnConnections />
      <OtherConnections />
    </>
  );
}
