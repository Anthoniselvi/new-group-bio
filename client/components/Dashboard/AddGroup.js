import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useMediaQuery } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase";

export default function AddGroup({ open, onClose }) {
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const [file, setFile] = useState(null);
  const [per, setPerc] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [inputFieldValues, setInputFieldValues] = useState({
    groupName: "",
    groupType: "Select Group Type",
    groupDescription: "",
    groupImage: "",
  });

  const handleFieldChange = (event, fieldName) => {
    const newValue = event.target.value;
    setInputFieldValues((prevValues) => ({
      ...prevValues,
      [fieldName]: newValue,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const handleSubmit = () => {
    if (
      inputFieldValues.groupName.trim() === "" ||
      inputFieldValues.groupType === "Select Group Type"
    ) {
      console.error("GroupName and GroupType are mandatory");
      return;
    }

    if (!["0", "1", "2"].includes(inputFieldValues.groupType)) {
      console.error("Invalid GroupType value");
      return;
    }

    // Check if there is a file to upload
    if (file) {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // Update the inputFieldValues with the download URL
            const updatedInputFieldValues = {
              ...inputFieldValues,
              groupImage: downloadURL,
            };

            // Send the request with the updated inputFieldValues
            axios
              .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/group/add`,
                updatedInputFieldValues
              )
              .then((response) => {
                console.log("Group added successfully!");
                console.log("addedGroup: " + JSON.stringify(response.data));
                onClose();
              })
              .catch((error) => {
                console.error("Error adding Group: ", error);
              });
          });
        }
      );
    } else {
      // If there is no file to upload, just send the request with the current inputFieldValues
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/group/add`, inputFieldValues)
        .then((response) => {
          console.log("Group added successfully!");
          console.log("addedGroup: " + JSON.stringify(response.data));
          onClose();
        })
        .catch((error) => {
          console.error("Error adding Group: ", error);
        });
    }
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
                Group Name:
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
                value={inputFieldValues.groupName}
                onChange={(event) => handleFieldChange(event, "groupName")}
              />
            </div>
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
                Group Type:
              </label>
              <select
                name="groupType"
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
                value={inputFieldValues.groupType}
                onChange={(event) => handleFieldChange(event, "groupType")}
              >
                <option value="Select Group Type">Select Group Type</option>
                <option value="0">Alumni</option>
                <option value="1">Business</option>
                <option value="2">Friends</option>
              </select>
            </div>
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
                Group Description:
              </label>
              <textarea
                rows="4"
                style={{
                  background: "#fff",
                  borderRadius: "7px",
                  width: "100%",
                  padding: "8px 15px",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "20px",
                  color: "#101a34",
                  border: "1px solid #cad3dd",
                  fontFamily: "Poppins",
                }}
                value={inputFieldValues.groupDescription}
                onChange={(event) =>
                  handleFieldChange(event, "groupDescription")
                }
              ></textarea>
            </div>
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
                Group Image:
              </label>
              {imageUrl && (
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={imageUrl}
                  alt="image"
                />
              )}
              <input
                type="file"
                id="file"
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
                onChange={(event) => handleFileChange(event, "groupImage")}
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
