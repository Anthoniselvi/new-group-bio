import GroupsList from "@/components/Dashboard/GroupsList";
import * as React from "react";
import { useState } from "react";
import AddGroup from "@/components/Dashboard/AddGroup";

export default function Dashboard() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEditEvent = () => {
    setAnchorEl(null);
    setEditModalOpen(true);
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
          onClick={handleEditEvent}
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
        {editModalOpen ? (
          <AddGroup
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
          />
        ) : (
          <></>
        )}
      </div>
      <GroupsList />
    </div>
  );
}
