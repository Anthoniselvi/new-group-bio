import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useMediaQuery } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddMember({ open, onClose, name, groupId }) {
  //   console.log("name, groupId: " + name, groupId);
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const [mobile, setMobile] = useState("");

  const handleSubmit = () => {
    // Create a member object with both mobile and groupId
    const memberData = {
      mobile: mobile,
      groupId: groupId,
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
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { backgroundColor: "#fff", color: "#121212" } }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: "5%",
          }}
        >
          <DialogTitle variant="h4" color="#DA344D">
            Create Group
          </DialogTitle>
        </Box>
        <DialogContent>
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
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label
                style={{
                  fontFamily: "Poppins",
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#101a34",
                  fontWeight: 600,
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
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ backgroundColor: "#ff574d", fontSize: "13px" }}
            type="button"
            color="secondary"
            variant="contained"
            onClick={onClose}
          >
            CANCEL
          </Button>
          <Button
            sx={{ backgroundColor: "#56c984", fontSize: "13px" }}
            type="button"
            color="secondary"
            variant="contained"
            onClick={handleSubmit}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
