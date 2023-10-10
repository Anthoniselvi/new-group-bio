import * as React from "react";
import { useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import AddedMembers from "../Members/AddedMembers";
import MembersList from "../Members/MembersList";
import ActiveMembers from "./ActiveMembers";
import PendingMembers from "./PendingMembers";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: "common.white",
  bgcolor: green[500],
  "&:hover": {
    bgcolor: green[600],
  },
};

export default function SingleGroupPage() {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: "primary",
      sx: fabStyle,
      icon: <AddIcon />,
      label: "Add",
    },
    {
      color: "secondary",
      sx: fabStyle,
      icon: <EditIcon />,
      label: "Edit",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "background.paper",

        position: "relative",
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        width: "calc(100vw - 250px)",
        padding: isMobile ? 0 : "2rem 4rem",
        "& .MuiButtonBase-root-MuiTab-root": {
          backgroundColor: "none",
        },
        "& .MuiButtonBase-root-MuiTab-root.Mui-selected": {
          color: "red",
        },
      }}
    >
      <Typography sx={{ fontSize: 24, fontWeight: 600, fontFamily: "Poppins" }}>
        Members
      </Typography>
      <AppBar position="static" color="default" sx={{ boxShadow: "none" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          //   indicatorColor="primary"
          textColor="primary"
          //   variant="fullWidth"
          aria-label="action tabs example"
          sx={{
            backgroundColor: "#ffffff",
            boxShadow: "none !important",
            borderBottom: "1px solid #e1e2e5",
          }}
        >
          <Tab label="Active" {...a11yProps(0)} />
          <Tab label="Pending" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ActiveMembers />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <PendingMembers />
        </TabPanel>
      </SwipeableViews>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              value === index ? transitionDuration.exit : 0
            }ms`,
          }}
          unmountOnExit
        >
          <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </Box>
  );
}
