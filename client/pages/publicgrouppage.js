import * as React from "react";
import PublicSingleGroupPage from "@/components/AdminPages/AdminGroupPages/PubicSingleGroupPage";
import { useMediaQuery } from "@mui/material";
import PublicTopBar from "@/components/NavBar/PublicTopBar";

export default function PublicGroupPage() {
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <div>
      <PublicTopBar />
      <div
        style={{
          padding: "1rem",
          paddingLeft: isMobile ? "1rem" : "8rem",
          marginTop: isMobile ? "3rem" : "6rem",
          marginLeft: isMobile ? 0 : "230px",
        }}
      >
        <PublicSingleGroupPage />
      </div>
    </div>
  );
}
