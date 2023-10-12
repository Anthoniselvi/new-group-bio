import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
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

const card = (singleGroup, router, groupData) => {
  return (
    <React.Fragment>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: 18,
            fontWeight: 600,
            color: "#000000",
          }}
          component="div"
        >
          {singleGroup.groupName}
        </Typography>
        <Typography
          sx={{ fontFamily: "Poppins", color: "#75777A", fontSize: 16 }}
        >
          {singleGroup.groupDescription}
        </Typography>
        {groupData && (
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: 20, color: "#000000" }}
          >
            Active - {groupData.active}
            <br />
            Pending - {groupData.pending}
          </Typography>
        )}
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          gap: "1rem",
          backgroundColor: "#F8F8F7",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <Button
          onClick={() => shareViaWhatsApp(singleGroup)}
          size="small"
          sx={{
            fontFamily: "Poppins",
            fontSize: 14,
            color: "#F5F5F5",
            backgroundColor: "#222220",
            padding: "5px 25px",
            borderRadius: "20px",
            textTransform: "none",
            display: "flex",
            gap: 1,
            "&:hover": {
              backgroundColor: "#222220",
            },
          }}
        >
          <FaLink /> Share Link
        </Button>
        <Button
          onClick={() => navigateToSingleGroupProfiles(singleGroup, router)}
          size="small"
          sx={{
            fontFamily: "Poppins",
            fontSize: 14,
            color: "#1B1B18",
            backgroundColor: "#ffffff",
            padding: "5px 25px",
            borderRadius: "20px",
            textTransform: "none",
            display: "flex",
            gap: 1,
            border: "0.5px solid #e1e2e5",
          }}
        >
          Open <HiOutlineExternalLink style={{ fontSize: 20 }} />
        </Button>
      </CardActions>
    </React.Fragment>
  );
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

  useEffect(() => {
    const groupDataArray = [];

    groupsList.forEach((singleGroup) => {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/member/all/${singleGroup.groupId}`
        )
        .then((response) => {
          const active = response.data.filter(
            (member) => member.name !== ""
          ).length;
          const pending = response.data.filter(
            (member) => member.name === ""
          ).length;

          const groupName = singleGroup.groupName;

          const groupData = {
            groupName: groupName,
            active: active,
            pending: pending,
          };

          groupDataArray.push(groupData);
          setGroupCountArray(groupDataArray);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });
  }, [groupsList]);

  return (
    <Box
      sx={{
        minWidth: 275,
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: isMobile ? 0 : "0 8rem",
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
          }}
        >
          + Add Group
        </button>
      </div>
      {groupsList.map((singleGroup) => {
        const groupData = groupCountArray.find(
          (data) => data.groupName === singleGroup.groupName
        );

        return (
          <Card variant="outlined" padding="1rem" key={singleGroup.groupId}>
            {card(singleGroup, router, groupData)}
          </Card>
        );
      })}
    </Box>
  );
}
