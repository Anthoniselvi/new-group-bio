import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useMediaQuery } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";

export default function CreateMemberForm() {
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const [mobile, setMobile] = useState("");
  const [selectedGroup, setSelectedGroup] = useState({});
  const router = useRouter();
  const { id, name } = router.query;

  const handleSubmit = () => {
    const memberData = {
      mobile: mobile,
      groupId: id,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/member/new`, memberData)
      .then((response) => {
        console.log("Member added successfully!");
        console.log("addedMember: " + JSON.stringify(response.data));
        onClose();
      })
      .catch((error) => {
        console.error("Error adding Member: ", error);
      });

    router.push({
      pathname: "/adminsinglegroup",
      query: { id: id },
    });
  };

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
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",

        padding: isMobile ? "5rem 1rem" : "5rem 8rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "20px",
          alignItems: isMobile ? "left" : "center",
        }}
      >
        <Typography
          sx={{
            color: "#191C1E",
            fontSize: 24,
            fontWeight: 600,
            fontFamily: "Poppins",
          }}
        >
          Create Member
        </Typography>
        <Typography
          sx={{
            color: "#191C1E",
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Poppins",
          }}
        >
          ({selectedGroup.groupName})
        </Typography>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          margin: "5% 0%",
          width: isMobile ? "250px" : "300px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label
            style={{
              fontFamily: "Poppins",
              fontSize: "14px",
              lineHeight: "18px",
              color: "#191C1E",
              fontWeight: 500,
            }}
          >
            Mobile Number
          </label>
          <input
            type="text"
            id="name"
            name="name"
            style={{
              background: "#fff",
              borderRadius: "7px",
              width: "100%",
              height: "44px",
              padding: "8px 15px",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "20px",
              color: "#101a34",
              border: "1px solid #cad3dd",
              fontFamily: "Poppins",
            }}
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
          />
        </div>
      </form>
      <div style={{ display: "flex", gap: "20px" }}>
        <Button
          sx={{
            backgroundColor: "#FBC91B",
            fontFamily: "Poppins",
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: 20,
            color: "#222222",
            padding: "5px 20px",
            textTransform: "none",
          }}
          onClick={handleSubmit}
        >
          Create
        </Button>

        <Button
          sx={{
            fontFamily: "Poppins",
            fontSize: "14px",
            borderRadius: 20,
            fontWeight: 600,
            color: "#222222",
            padding: "5px 20px",
            border: "1px solid #dbdbd7",
            textTransform: "none",
          }}
          onClick={handleSubmit}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
}
