import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import SingleGroupProfiles from "@/components/Members/SingleGroupProfiles";
import AddMember from "@/components/Members/AddMember";

export default function SingleGroup() {
  const [createMemberModalOpen, setCreateMemberModalOpen] = useState(false);
  const router = useRouter();
  const { id: groupId, name } = router.query;
  const navigateToCreateMember = (groupId) => {
    setCreateMemberModalOpen(true);
    // router.push({
    //   pathname: "/createmember",
    //   query: { id: groupId },
    // });
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
          onClick={() => navigateToCreateMember(groupId)}
        >
          + Add
        </button>
        {createMemberModalOpen ? (
          <AddMember
            open={createMemberModalOpen}
            onClose={() => setCreateMemberModalOpen(false)}
            name={name}
            groupId={groupId}
          />
        ) : (
          <></>
        )}
      </div>
      <SingleGroupProfiles />
    </div>
  );
}
