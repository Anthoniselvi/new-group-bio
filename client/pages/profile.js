import GroupsList from "@/components/Dashboard/GroupsList";
import * as React from "react";
import { useState } from "react";
import AddGroup from "@/components/Dashboard/AddGroup";
import HomePage from "@/components/Home/HomePage";
import { Typography } from "@mui/material";
import Groups from "@/components/Home/Groups";
import ProfilePage from "@/components/Profile";
export default function Profile() {
  return (
    <div style={{ padding: "1rem", marginTop: "6rem" }}>
      <ProfilePage />
    </div>
  );
}
