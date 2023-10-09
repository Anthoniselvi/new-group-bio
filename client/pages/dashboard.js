import GroupsList from "@/components/Dashboard/GroupsList";
import * as React from "react";
import { useState } from "react";
import AddGroup from "@/components/Dashboard/AddGroup";

export default function Dashboard() {
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);

  const handleCreateGroup = () => {
    setCreateGroupModalOpen(true);
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
        <h2>Groups List</h2>
        <button
          onClick={handleCreateGroup}
          style={{
            padding: "10px 20px",
            backgroundColor: "#00b4d8",
            color: "#fff",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
          }}
        >
          + Add
        </button>
        {createGroupModalOpen ? (
          <AddGroup
            open={createGroupModalOpen}
            onClose={() => setCreateGroupModalOpen(false)}
          />
        ) : (
          <></>
        )}
      </div>
      <GroupsList />
    </div>
  );
}
