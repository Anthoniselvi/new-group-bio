import { Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserAuth } from "@/context/GroupContext";
import { useMediaQuery } from "@mui/material";
import DialogMemberProfile from "./DialogMemberProfile";
import DialogAdminProfile from "./DialogAdminProfile";
import DialogPersonalInfo from "./DialogPersonalInfo";
import DialogBusinessInfo from "./DialogBusinessInfo";
import DialogSocialInfo from "./DialogSocialInfo";
const MemberProfilePage = () => {
  const [selectedGroup, setSelectedGroup] = useState({});
  const [selectedMember, setSelectedMember] = useState({});
  const router = useRouter();
  const { id: groupId, memberId } = router.query;
  const { isMemberLoggedIn } = useUserAuth();

  console.log("memberId in form:", memberId);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [open, setOpen] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleBusinessOpen = () => {
    setBusinessOpen(true);
  };
  const handleSocialOpen = () => {
    setSocialOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleBusinessClose = () => {
    setBusinessOpen(false);
  };
  const handleSocialClose = () => {
    setSocialOpen(false);
  };
  const handleClickOpenAdmin = () => {
    setOpenAdmin(true);
  };
  const handleCloseAdmin = () => {
    setOpenAdmin(false);
  };
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/member/${memberId}`)
      .then((response) => {
        setSelectedMember(response.data);
        console.log(
          "selected member in form: " + JSON.stringify(response.data)
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [memberId, selectedMember]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/group/single/${groupId}`)
      .then((response) => {
        setSelectedGroup(response.data);
        console.log("selected group in form: " + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log("selected gp:", JSON.stringify(selectedGroup));
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginLeft: isMobile ? 0 : "230px",
        paddingLeft: isMobile ? "10px" : "100px",
      }}
    >
      <Typography
        sx={{
          color: "#000000",
          fontSize: "24px",
          fontFamily: "Poppins",
          fontWeight: 600,
          borderBottom: "1px solid #e1e2e5",
        }}
      >
        Profile
      </Typography>
      <Typography>Account Information</Typography>
      {isMemberLoggedIn ? (
        <div
          style={{
            border: "1px solid #e1e2e5",
            width: isMobile ? "100%" : "50%",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #e1e2e5",
                paddingBottom: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontFamily: "Poppins",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                Personal Information
              </Typography>
              <Typography
                onClick={handleClickOpen}
                sx={{
                  color: "#3549E6",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Edit
              </Typography>
            </div>
            <Typography>{selectedMember.name}</Typography>
            <Typography>{selectedMember.mobile}</Typography>
            {selectedGroup.groupType === "0" ? (
              <>
                <Typography>Course - {selectedMember.course}</Typography>
                <Typography>Year - {selectedMember.year}</Typography>
              </>
            ) : (
              <></>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #e1e2e5",
                paddingBottom: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontFamily: "Poppins",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                Business Information
              </Typography>
              <Typography
                onClick={handleBusinessOpen}
                sx={{
                  color: "#3549E6",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Edit
              </Typography>
            </div>
            <Typography>{selectedMember.company}</Typography>
            <Typography>{selectedMember.designation}</Typography>
            <Typography>{selectedMember.industry}</Typography>
            <Typography>{selectedMember.offers}</Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #e1e2e5",
                paddingBottom: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontFamily: "Poppins",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                Social Media Information
              </Typography>
              <Typography
                onClick={handleSocialOpen}
                sx={{
                  color: "#3549E6",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Edit
              </Typography>
            </div>
            <Typography>{selectedMember.linkedin}</Typography>
            <Typography>{selectedMember.website}</Typography>
          </div>
        </div>
      ) : (
        <div
          style={{
            border: "1px solid #e1e2e5",
            width: isMobile ? "100%" : "50%",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            padding: "20px",
          }}
        >
          <Typography
            sx={{
              color: "#000000",
              fontFamily: "Poppins",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Admin
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #e1e2e5",
                paddingBottom: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontFamily: "Poppins",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                Details
              </Typography>
              <Typography
                onClick={handleClickOpenAdmin}
                sx={{
                  color: "#3549E6",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Edit Details
              </Typography>
            </div>
            <Typography>Username - admin</Typography>
            <Typography>Password - 123456</Typography>
          </div>
        </div>
      )}
      {/* <DialogMemberProfile
        open={open}
        onClose={handleClose}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
        selectedGroup={selectedGroup}
      /> */}
      <DialogPersonalInfo
        open={open}
        onClose={handleClose}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
        selectedGroup={selectedGroup}
      />
      <DialogBusinessInfo
        open={businessOpen}
        onClose={handleBusinessClose}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
        selectedGroup={selectedGroup}
      />
      <DialogSocialInfo
        open={socialOpen}
        onClose={handleSocialClose}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
        selectedGroup={selectedGroup}
      />
      <DialogAdminProfile open={openAdmin} onClose={handleCloseAdmin} />
    </div>
  );
};

export default MemberProfilePage;
