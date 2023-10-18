import GroupsList from "@/components/Dashboard/GroupsList";
import * as React from "react";
import { useState } from "react";
import AddGroup from "@/components/Dashboard/AddGroup";
// import HomePage from "@/components/Home/HomePage";
import { Typography } from "@mui/material";
import Groups from "@/components/AdminPages/AdminGroupPages/Groups";
import { useMediaQuery } from "@mui/material";
export default function Dashboard() {
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const handleCreateGroup = () => {
    setCreateGroupModalOpen(true);
  };
  return (
    <div style={{ padding: "1rem", marginTop: isMobile ? "3rem" : "6rem" }}>
      <Groups />
    </div>
  );
}
