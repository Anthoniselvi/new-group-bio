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
import PersonIcon from "@mui/icons-material/Person";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useRouter } from "next/router";
import MemberMenu from "./MemberMenu";
import { useUserAuth } from "@/context/GroupContext";
import { useState, useEffect } from "react";
import axios from "axios";
import MemberMobileMenu from "./MemberMobileMenu";

const drawerWidth = 240;

const MemberTopBar = () => {
  const { logout } = useUserAuth();

  const isMobile = useMediaQuery("(max-width: 900px)");
  const [selectedMember, setSelectedMember] = useState({});
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
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
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Function to open the left drawer
  const openLeftDrawer = () => {
    setIsLeftDrawerOpen(true);
  };
  const navigateToDashboard = () => {
    router.push({
      pathname: "/membergrouppage",
      query: { id: groupId, memberId },
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
      pathname: "/memberloginpage",
      query: { id: groupId },
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/member/${memberId}`)
      .then((response) => {
        setSelectedMember(response.data);
        // console.log(
        //   "selected member in form: " + JSON.stringify(response.data)
        // );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the case where the member is not found
        setSelectedMember({ message: "Member not found" });
      });
  }, [memberId, groupId, selectedMember]);

  // if (selectedMember.message === "Member not found") {
  //   return (
  //     <div>
  //       {/* Render an error message or handle the "Member not found" case */}
  //       <p>Member not found. Please check your data.</p>
  //     </div>
  //   );
  // }

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
                  {/* {console.log("name:" + selectedMember.name)} */}
                  {!selectedMember.name ? (
                    <PersonIcon />
                  ) : (
                    selectedMember.name[0]
                  )}
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
                  {!selectedMember.name ? (
                    <PersonIcon />
                  ) : (
                    selectedMember.name[0]
                  )}
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
                borderRight: "none !important", // Override the existing rule
              },
            }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={navigateToDashboard}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText>Dashboard</ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
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
      <MemberMenu
        open={open}
        onClose={handleClose}
        handleLogout={handleLogout}
        anchorEl={anchorEl}
        memberId={memberId}
        groupId={groupId}
      />
      {isMobile && (
        <MemberMobileMenu
          open={menuOpen}
          setOpen={setMenuOpen}
          onClose={handleLogout}
          toggleDrawer={toggleDrawer}
          selectedMember={selectedMember}
        />
      )}
    </Box>
  );
};

export default MemberTopBar;
