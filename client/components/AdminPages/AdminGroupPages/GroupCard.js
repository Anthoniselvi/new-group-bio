import React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Typography, Button } from "@mui/material";
import { FaLink } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/router";
import GroupMenu from "./GroupMenu";

const GroupCard = ({ singleGroup, groupData }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigateToSingleGroupProfiles = (singleGroup, router) => {
    router.push({
      pathname: "/adminsinglegroup",
      query: { id: singleGroup.groupId },
    });
  };

  const displayContent = singleGroup.groupImage ? (
    <img
      src={singleGroup.groupImage}
      alt={singleGroup.groupName}
      style={{ width: "80px", height: "80px", borderRadius: "50%" }}
    />
  ) : (
    <div
      style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        backgroundColor: "#ccc", // A default background color
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        color: "#fff",
      }}
    >
      {singleGroup.groupName.charAt(0)}
    </div>
  );

  return (
    <div
      style={{
        border: "1px solid #e1e2e5",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "6fr 1fr",
            alignItems: "center",
            // justifyContent: "space-between",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
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
          </div>
          {displayContent}
        </div>
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
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#F8F8F7",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            backgroundColor: "#F8F8F7",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
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
        </div>
        <MoreVertIcon style={{ cursor: "pointer" }} onClick={handleClick} />
      </CardActions>
      <GroupMenu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        groupId={singleGroup.groupId}
      />
    </div>
  );
};

export default GroupCard;
