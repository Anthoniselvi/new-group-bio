import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Typography, Box, useMediaQuery } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
import { useRouter } from "next/router";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogAdminProfile({ open, onClose }) {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [editedMember, setEditedMember] = useState({});
  const router = useRouter();
  const { id: groupId, memberId } = router.query;
  const handleSubmitForm = () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/member/${memberId}`,
        editedMember
      )
      .then((response) => {
        console.log("Profile updated successfully!");
        console.log("updatedProfile: " + JSON.stringify(response.data));

        setEditedMember(editedMember);

        router.push({
          pathname: "/profile",
          query: { id: groupId, memberId },
        });
      });
    onClose();
  };
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/member/${memberId}`)
      .then((response) => {
        setEditedMember(response.data);
        console.log(
          "selected member in form: " + JSON.stringify(response.data)
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [memberId]);
  return (
    <Box>
      <Dialog
        sx={{
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            borderRadius: 5,
            width: isMobile ? "80%" : "60%",
          },
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ borderBottom: "1px solid #ececea" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#000000",
                fontSize: isMobile ? 16 : 18,
                fontWeight: 600,
                fontFamily: "Poppins",
              }}
            >
              Edit Account Information
            </Typography>
            <HighlightOffIcon onClick={onClose} style={{ cursor: "pointer" }} />
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <form
                onSubmit={handleSubmitForm}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  padding: "5% 0%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <label
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      lineHeight: "18px",
                      color: "#191C1E",
                      fontWeight: 500,
                    }}
                  >
                    Name
                  </label>
                  {console.log("editedMember:" + JSON.stringify(editedMember))}
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
                    // value={editedMember.name}
                    // onChange={(event) =>
                    //   setEditedMember({
                    //     ...editedMember,
                    //     name: event.target.value,
                    //   })
                    // }
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <label
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      lineHeight: "18px",
                      color: "#191C1E",
                      fontWeight: 500,
                    }}
                  >
                    UserName
                  </label>
                  <input
                    name="mobile"
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
                    // value={editedMember.mobile}
                    // onChange={(event) =>
                    //   setEditedMember({
                    //     ...editedMember,
                    //     mobile: event.target.value,
                    //   })
                    // }
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <label
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      lineHeight: "18px",
                      color: "#191C1E",
                      fontWeight: 500,
                    }}
                  >
                    Password
                  </label>
                  <input
                    name="company"
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
                    // value={editedMember.company}
                    // onChange={(event) =>
                    //   setEditedMember({
                    //     ...editedMember,
                    //     company: event.target.value,
                    //   })
                    // }
                  />
                </div>
              </form>
              <div
                style={{ display: "flex", gap: "20px", alignSelf: "flex-end" }}
              >
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
                  onClick={onClose}
                >
                  Cancel
                </Button>
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
                  onClick={handleSubmitForm}
                >
                  Save
                </Button>
              </div>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
