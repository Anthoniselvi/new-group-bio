import { Box, Typography, useMediaQuery, Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from "axios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useRouter } from "next/router";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase";

const EditGroupForm = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const router = useRouter();
  const { id: groupId } = router.query;
  console.log("groupId in editForm:" + groupId);
  const [file, setFile] = useState(null);
  const [per, setPerc] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [groupsList, setGroupsList] = useState([]);
  const [inputFieldValues, setInputFieldValues] = useState({
    groupName: "",
    groupType: "Select Group Type",
    groupDescription: "",
    groupImage: "",
  });

  const navigateToDashboard = () => {
    router.push({
      pathname: "/dashboard",
    });
  };
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
            const updatedInputFieldValues = {
              ...inputFieldValues,
              groupImage: downloadURL,
            };

            axios
              .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/group/add`,
                updatedInputFieldValues
              )
              .then((response) => {
                console.log("Group added successfully!");
                console.log("addedGroup: " + JSON.stringify(response.data));

                const updatedGroupsList = [...groupsList, response.data];
                setGroupsList(updatedGroupsList);
                router.push({
                  pathname: "/dashboard",
                });
              })
              .catch((error) => {
                console.error("Error adding Group: ", error);
              });
          });
        }
      );
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/group/add`, inputFieldValues)
        .then((response) => {
          console.log("Group added successfully!");
          console.log("addedGroup: " + JSON.stringify(response.data));

          const updatedGroupsList = [...groupsList, response.data];
          setGroupsList(updatedGroupsList);
          router.push({
            pathname: "/dashboard",
          });
        })
        .catch((error) => {
          console.error("Error adding Group: ", error);
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        marginLeft: "230px",
        padding: isMobile ? "5rem 1rem" : "5rem 8rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
          Edit Group
        </Typography>
        <HighlightOffIcon
          onClick={navigateToDashboard}
          style={{ cursor: "pointer" }}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          // margin: "5% 0%",
          // width: isMobile ? "250px" : "300px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "5% 0%",
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
            Group Name
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
            Group Type
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
            Group Description
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
            onChange={(event) => handleFieldChange(event, "groupDescription")}
          ></textarea>
        </div>
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
            Group Image
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
          Save
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
          onClick={navigateToDashboard}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
};

export default EditGroupForm;
