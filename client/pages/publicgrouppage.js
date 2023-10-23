import * as React from "react";
import PublicSingleGroupPage from "@/components/AdminPages/AdminGroupPages/PubicSingleGroupPage";
import { useMediaQuery } from "@mui/material";

export default function PublicGroupPage() {
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <div style={{ padding: "1rem", marginTop: isMobile ? "3rem" : "6rem" }}>
      <PublicSingleGroupPage />
    </div>
  );
}
