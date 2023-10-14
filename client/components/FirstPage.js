import HomePage from "./Home/HomePage";
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
import { FiChevronDown } from "react-icons/fi";
import { useMediaQuery } from "@mui/material";
import { FiMenu } from "react-icons/fi";
import LeftDrawer from "./Home/LeftDrawer";
import ProfileMenu from "./Home/ProfileMenu";

const drawerWidth = 240;

const FirstPage = ({ children }) => {
  //   const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Function to open the left drawer
  const openLeftDrawer = () => {
    setIsLeftDrawerOpen(true);
  };
  const navigateToDashboard = (item) => {
    router.push({
      pathname: "/dashboard",
    });
  };
  const handleMenuItemClick = (menuItem) => {
    // Handle the click event based on the menuItem
    switch (menuItem) {
      case "Home":
        {
          navigateToDashboard;
        }
        break;
      case "Groups":
        {
          navigateToDashboard;
        }
        break;
      case "Members":
        // Handle click for Members
        break;
      case "Support":
        // Handle click for Support
        break;
      default:
        // Handle any other items or provide a default action
        break;
    }
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#ffffff" }}>
      <CssBaseline />
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
                  <ListItemButton onClick={() => handleMenuItemClick(text)}>
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
        {children}
        {/* <Groups /> */}

        {/* <SingleGroupPage /> */}
      </Box>
      <LeftDrawer
        open={isLeftDrawerOpen}
        onClose={() => setIsLeftDrawerOpen(false)}
      />
      <ProfileMenu open={open} onClose={handleClose} anchorEl={anchorEl} />
    </Box>
  );
};

export default FirstPage;
