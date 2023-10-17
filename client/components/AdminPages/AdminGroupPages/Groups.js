import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FaLink } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useUserAuth } from "@/context/GroupContext";
import { useState, useEffect } from "react";
import axios from "axios"; // Don't forget to import axios
import { CollectionsOutlined } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AdminMenu from "../../NavBar/AdminMenu";
import GroupMenu from "./GroupMenu";
import GroupCard from "./GroupCard";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const navigateToSingleGroupProfiles = (singleGroup, router) => {
  router.push({
    pathname: "/adminsinglegroup",
    query: { id: singleGroup.groupId },
  });
};

const shareViaWhatsApp = (singleGroup) => {
  const currentUrl = window.location.origin; // Get the base URL
  const sharedUrl = `${currentUrl}/memberloginpage?id=${singleGroup.groupId}`; // Append the id query parameter
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    sharedUrl
  )}`;
  window.open(whatsappUrl, "_blank");
};

export default function Groups() {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const router = useRouter();
  const navigateToCreateGroup = () => {
    router.push({
      pathname: "/creategroup",
    });
  };
  const { groupsList } = useUserAuth();
  const [groupCountArray, setGroupCountArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataForGroup = async (groupId, groupName) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/member/all/${groupId}`
        );

        const active = response.data.filter(
          (member) => member.name !== ""
        ).length;
        const pending = response.data.filter(
          (member) => member.name === ""
        ).length;

        return {
          groupName,
          active,
          pending,
        };
      } catch (error) {
        // console.error(`Error fetching data for ${groupName}:`, error);
        return {
          groupName,
          active: 0,
          pending: 0,
        };
      }
    };

    const fetchGroupData = async () => {
      const groupDataArray = await Promise.all(
        groupsList.map((singleGroup) => {
          return fetchDataForGroup(singleGroup.groupId, singleGroup.groupName);
        })
      );

      setGroupCountArray(groupDataArray);
      setLoading(false);
    };

    if (groupsList.length > 0) {
      fetchGroupData();
    }
  }, [groupsList]);

  return (
    <Box
      sx={{
        minWidth: 275,
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: isMobile ? 0 : "0 15rem",
        marginLeft: isMobile ? 0 : "230px",
        "& .MuiCard-root": {
          borderRadius: 3,
        },
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{ fontSize: 24, fontWeight: 600, fontFamily: "Poppins" }}
        >
          Groups
        </Typography>
        <button
          onClick={navigateToCreateGroup}
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
          + Add Group
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        groupsList.map((singleGroup, index) => {
          const groupData = groupCountArray[index];

          return (
            <>
              <GroupCard singleGroup={singleGroup} groupData={groupData} />
            </>
          );
        })
      )}
    </Box>
  );
}
