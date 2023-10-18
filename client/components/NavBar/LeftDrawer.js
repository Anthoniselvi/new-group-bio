import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { useMediaQuery } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Divider from "@mui/material/Divider";
import { useUserAuth } from "@/context/GroupContext";

export default function LeftDrawer({ open, onClose }) {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const { logout, isAdminLoggedIn, isMemberLoggedIn } = useUserAuth();
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
  const list = (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        zIndex: 1200,
        padding: 2,
        backgroundColor: "#f0f1f4",
      }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <List
        sx={{ backgroundColor: "#ffffff", borderRadius: 6, height: "100%" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "5%",
            paddingBottom: "10%",
          }}
        >
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
          <IoMdClose style={{ fontSize: 24 }} onClick={onClose} />
        </div>

        {isMobile && isAdminLoggedIn ? (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={navigateToDashboard}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ paddingBottom: "20px" }}>
              <ListItemButton onClick={navigateToGroupsPage}>
                <ListItemIcon>
                  <GroupWorkIcon />
                </ListItemIcon>
                <ListItemText>Groups</ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding sx={{ paddingTop: "20px" }}>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            {" "}
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
          </>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={onClose}
          onOpen={onClose}
        >
          {list}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
