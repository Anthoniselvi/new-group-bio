import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FaLink } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useUserAuth } from "@/context/GroupContext";
import { useState, useEffect } from "react";
import axios from "axios";
import GroupCard from "./GroupCard";

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
            <GroupCard
              key={singleGroup.groupId}
              singleGroup={singleGroup}
              groupData={groupData}
            />
          );
        })
      )}
    </Box>
  );
}
