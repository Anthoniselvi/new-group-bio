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
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaLink } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ShowAlert from "./ShowAlert";
import ListOfMembers from "./ListOfMembers";
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
  const router = useRouter();
  const { id } = router.query;

  const [singleGroupMembers, setSingleGroupMembers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState({});
  const profileCardsRef = useRef(null);

  const navigateToCreateMember = (item) => {
    router.push({
      pathname: "/createmember",
      query: { id: id },
    });
  };
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/member/all/${id}`)

        .then((response) => {
          setSingleGroupMembers(response.data);
          console.log("singleGroup :" + JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/group/single/${id}`)

      .then((response) => {
        setSelectedGroup(response.data);
        console.log("selectedGroup :" + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const shareViaWhatsApp = () => {
    const currentUrl = window.location.origin; // Get the base URL
    const sharedUrl = `${currentUrl}/memberloginpage?id=${id}`; // Append the id query parameter
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      sharedUrl
    )}`;
    window.open(whatsappUrl, "_blank");
  };
  const [alertVisible, setAlertVisible] = useState(false);
  const handleDelete = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_BASE_URL}/group/${id}`)

      .then((response) => {
        console.log("deleteGroup :" + JSON.stringify(response.data));
        setAlertVisible(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    return <ShowAlert />;
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  // const transitionDuration = {
  //   enter: theme.transitions.duration.enteringScreen,
  //   exit: theme.transitions.duration.leavingScreen,
  // };

  // const fabs = [
  //   {
  //     color: "primary",
  //     sx: fabStyle,
  //     icon: <AddIcon />,
  //     label: "Add",
  //   },
  //   {
  //     color: "secondary",
  //     sx: fabStyle,
  //     icon: <EditIcon />,
  //     label: "Edit",
  //   },
  // ];

  return (
    <Box
      sx={{
        bgcolor: "background.paper",

        position: "relative",
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        width: isMobile ? "100vw" : "calc(100vw - 250px)",
        padding: isMobile ? 0 : "2rem 4rem",
        "& .MuiButtonBase-root-MuiTab-root": {
          backgroundColor: "none",
        },
        "& .MuiButtonBase-root-MuiTab-root.Mui-selected": {
          color: "red",
        },
      }}
    >
      {alertVisible && <ShowAlert />}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "left" : "center",
          justifyContent: isMobile ? "left" : "space-between",
        }}
      >
        <Typography
          sx={{ fontSize: 24, fontWeight: 600, fontFamily: "Poppins" }}
        >
          Members - {selectedGroup.groupName}
        </Typography>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <MdDelete
            onClick={handleDelete}
            style={{ color: "#fe3640", fontSize: 20, cursor: "pointer" }}
          />
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#25d366", // WhatsApp green
              color: "#fff",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
            onClick={shareViaWhatsApp}
          >
            <FaLink /> Share Link
          </button>
          <button
            onClick={navigateToCreateMember}
            style={{
              backgroundColor: "#FBC91B",
              color: "#222222",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "Poppins",
              textTransform: "none",
              borderRadius: 20,
              padding: "8px 12px",
              border: "none",
              cursor: "pointer",
            }}
          >
            + Add Member
          </button>
        </div>
      </div>
      <AppBar
        position="static"
        color="default"
        sx={{ boxShadow: "none", padding: 0 }}
      >
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
          {/* <ActiveMembers
            singleGroup={singleGroupMembers}
            selectedGroup={selectedGroup}
          /> */}
          <ListOfMembers
            singleGroup={singleGroupMembers}
            selectedGroup={selectedGroup}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <PendingMembers singleGroup={singleGroupMembers} />
        </TabPanel>
      </SwipeableViews>
      {/* {fabs.map((fab, index) => (
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
      ))} */}
    </Box>
  );
}
