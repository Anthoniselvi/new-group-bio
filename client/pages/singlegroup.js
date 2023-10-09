import * as React from "react";
import { useRouter } from "next/router";
import SingleGroupProfiles from "@/components/Members/SingleGroupProfiles";

export default function SingleGroup() {
  const router = useRouter();
  const { id: groupId, name } = router.query;
  const navigateToCreateProfile = (groupId) => {
    router.push({
      pathname: "/form",
      query: { id: groupId },
    });
  };
  return (
    <div style={{ padding: "1rem", marginTop: "6rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "1rem",
        }}
      >
        <h2>{name}</h2>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#00b4d8",
            color: "#fff",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => navigateToCreateProfile(groupId)}
        >
          + Add
        </button>
      </div>
      <SingleGroupProfiles />
    </div>
  );
}
