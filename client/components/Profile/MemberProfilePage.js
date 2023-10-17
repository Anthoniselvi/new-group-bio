import { Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserAuth } from "@/context/GroupContext";
import { useMediaQuery } from "@mui/material";

const MemberProfilePage = () => {
  const [selectedGroup, setSelectedGroup] = useState({});
  const [selectedMember, setSelectedMember] = useState({});
  const router = useRouter();
  const { id: groupId, memberId } = router.query;
  const { isMemberLoggedIn } = useUserAuth();
  console.log("groupId in form:", groupId);
  console.log("memberId in form:", memberId);
  const isMobile = useMediaQuery("(max-width: 900px)");
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
  }, []);
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
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginLeft: isMobile ? 0 : "230px",
        paddingLeft: "100px",
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
            width: "50%",
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
            Phone Number - {selectedMember.mobile}
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
                Personal Information
              </Typography>
              <Typography
                sx={{
                  color: "#3549E6",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Edit
              </Typography>
            </div>
            <Typography>Name - {selectedMember.name}</Typography>
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
                sx={{
                  color: "#3549E6",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Edit
              </Typography>
            </div>
            <Typography>Company Name - {selectedMember.company}</Typography>
            <Typography>Designation - {selectedMember.designation}</Typography>
            <Typography>Industry - {selectedMember.industry}</Typography>
            <Typography>Services Offered - {selectedMember.offers}</Typography>
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
                sx={{
                  color: "#3549E6",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Edit
              </Typography>
            </div>
            <Typography>LinkedIn - {selectedMember.linkedin}</Typography>
            <Typography>Website Name - {selectedMember.website}</Typography>
          </div>
        </div>
      ) : (
        <div
          style={{
            border: "1px solid #e1e2e5",
            width: "50%",
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
                sx={{
                  color: "#3549E6",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  fontWeight: 500,
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
    </div>
  );
};

export default MemberProfilePage;
