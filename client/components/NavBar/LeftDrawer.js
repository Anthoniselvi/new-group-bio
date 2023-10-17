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

export default function LeftDrawer({ open, onClose }) {
  const list = (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        zIndex: 1200,
        padding: 2,
        paddingLeft: 7,
        backgroundColor: "#f0f1f4",
      }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <List
        sx={{ backgroundColor: "#ffffff", borderRadius: 6, height: "100%" }}
      >
        <IoMdClose
          style={{ marginLeft: "90%", fontSize: 20 }}
          onClick={onClose}
        />

        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: 16,
            paddingLeft: "5%",
            paddingBottom: "10%",
          }}
          noWrap
          component="div"
        >
          Group Bio
        </Typography>
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
