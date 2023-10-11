import GroupsList from "@/components/Dashboard/GroupsList";
import * as React from "react";
import { useState } from "react";
import AddGroup from "@/components/Dashboard/AddGroup";
import HomePage from "@/components/Home/HomePage";
import { Typography } from "@mui/material";
import Groups from "@/components/Home/Groups";
import SingleGroupPage from "@/components/Home/SingleGroupPage";

export default function AdminSingleGroup() {
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);

  const handleCreateGroup = () => {
    setCreateGroupModalOpen(true);
  };
  return (
    <div style={{ padding: "1rem", marginTop: "6rem" }}>
      {/* <GroupsList /> */}
      {/* <HomePage /> */}
      <SingleGroupPage />
    </div>
  );
}
