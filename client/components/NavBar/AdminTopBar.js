// import HomePage from "../Home/HomePage";
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
import LeftDrawer from "./LeftDrawer";
import AdminMenu from "./AdminMenu";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import logo from "../img/logo-big.png";
import { useRouter } from "next/router";
import { useUserAuth } from "@/context/GroupContext";
import AdminMobileMenu from "./AdminMobileMenu";

const drawerWidth = 240;

const AdminTopBar = () => {
  const { logout } = useUserAuth();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { id: groupId, memberId } = router.query;

  const toggleDrawer = (newOpen) => () => {
    setMenuOpen(newOpen);
  };

  const handleClick = (event) => {
    if (!isMobile) {
      setAnchorEl(event.currentTarget);
    } else {
      setMenuOpen(true);
      // setEdgeMember(item);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // Function to open the left drawer
  const openLeftDrawer = () => {
    setIsLeftDrawerOpen(true);
  };
  const navigateToDashboard = () => {
    router.push({
      pathname: "/dashboard",
    });
  };
  const navigateToGroupsPage = () => {
    router.push({
      pathname: "/dashboard",
    });
  };
  const handleLogout = () => {
    logout();
    router.push({
      pathname: "/",
    });
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
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                {" "}
                {/* <img src={logo} /> */}
                <Typography
                  sx={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 16 }}
                  noWrap
                  component="div"
                >
                  Group Bio
                </Typography>
              </div>

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
              <FiMenu onClick={openLeftDrawer} />
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

              <div
                onClick={handleClick}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  cursor: "pointer",
                }}
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
            "& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
              borderRight: "none",
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
                borderRight: "none !important",
              },
            }}
          >
            <List>
              <ListItem disablePadding sx={{ marginLeft: "-20px" }}>
                <ListItemButton onClick={navigateToDashboard}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText>Dashboard</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                sx={{ marginLeft: "-20px", paddingBottom: "20px" }}
              >
                <ListItemButton onClick={navigateToGroupsPage}>
                  <ListItemIcon>
                    <GroupWorkIcon />
                  </ListItemIcon>
                  <ListItemText>Groups</ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                sx={{ marginLeft: "-20px", paddingTop: "20px" }}
              >
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}

      <LeftDrawer
        open={isLeftDrawerOpen}
        onClose={() => setIsLeftDrawerOpen(false)}
      />
      <AdminMenu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        handleLogout={handleLogout}
      />
      {isMobile && (
        <AdminMobileMenu
          open={menuOpen}
          setOpen={setMenuOpen}
          onClose={handleLogout}
          toggleDrawer={toggleDrawer}
        />
      )}
    </Box>
  );
};

export default AdminTopBar;
