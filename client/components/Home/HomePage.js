import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Groups from "./Groups";
import SingleGroupPage from "./SingleGroupPage";
import { FiChevronDown } from "react-icons/fi";
import { useMediaQuery } from "@mui/material";
import { FiMenu } from "react-icons/fi";
import LeftDrawer from "./LeftDrawer";

const drawerWidth = 240;

export default function HomePage() {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = React.useState(false);

  // Function to open the left drawer
  const openLeftDrawer = () => {
    setIsLeftDrawerOpen(true);
  };
  return (
    <Box sx={{ display: "flex", backgroundColor: "#ffffff" }}>
      <CssBaseline />
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
            {isMobile ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 16 }}
                  noWrap
                  component="div"
                >
                  Group Bio
                </Typography>
                <FiMenu onClick={openLeftDrawer} />
              </div>
            ) : (
              <Typography
                sx={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 16 }}
                noWrap
                component="div"
              >
                Group Bio
              </Typography>
            )}

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box
            sx={{
              overflow: "auto",
              paddingLeft: "2rem",
              paddingTop: "4rem",
              "& .MuiTypography-root": {
                fontFamily: "Poppins",
                color: "#91918D",
                fontSize: 16,
                fontWeight: 500,
              },
              "& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
                borderRight: "none !important", // Override the existing rule
              },
            }}
          >
            <List>
              {["Home", "Groups", "Members", "Support"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // p: "0 4rem",
        }}
      >
        {/* <Groups /> */}

        <SingleGroupPage />
      </Box>
      <LeftDrawer
        open={isLeftDrawerOpen}
        onClose={() => setIsLeftDrawerOpen(false)}
      />
    </Box>
  );
}
