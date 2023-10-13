import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { FiChevronDown } from "react-icons/fi";
import { Typography } from "@mui/material";

const TopBar = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  return (
    <div>
      {!isMobile ? (
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e1e2e5",
            boxShadow: "none",
            color: "#000000",
          }}
        >
          <Toolbar>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                sx={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 16 }}
                noWrap
                component="div"
              >
                Group Bio
              </Typography>

              <div
                onClick={handleClick}
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#79909d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    color: "#ffffff",
                  }}
                >
                  A
                </div>
                <FiChevronDown />
              </div>
            </div>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar
          position="fixed"
          sx={{
            zIndex: 1000,
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e1e2e5",
            boxShadow: "none",
            color: "#000000",
          }}
        >
          <Toolbar>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                  noWrap
                  component="div"
                >
                  Group Bio
                </Typography>
                <FiMenu onClick={openLeftDrawer} />
              </div>

              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#79909d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    color: "#ffffff",
                  }}
                >
                  A
                </div>
                <FiChevronDown />
              </div>
            </div>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
};

export default TopBar;
