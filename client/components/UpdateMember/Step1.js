import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Select, MenuItem } from "@mui/material";
import generateYearOptions from "./GenerateYear";
import styles from "@/styles/Form.module.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { courseList } from "../Members/CourseList";

const Step1 = ({
  inputFieldValues,
  handleFieldChange,
  fieldErrors,
  groupId,
  mobile,
  selectedGroupType,
}) => {
  console.log("groupType in Step1:" + selectedGroupType);
  const [file, setFile] = useState(null);
  const [per, setPerc] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const uploadFile = () => {
      if (file) {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setPerc(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
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
              setImageUrl(downloadURL);
              handleFieldChange({ target: { value: downloadURL } }, "image"); // Update inputFieldValues.image
            });
          }
        );
      }
    };
    uploadFile();
  }, [file, handleFieldChange]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <>
      <TextField
        label="name"
        fullWidth
        margin="normal"
        value={inputFieldValues.name}
        onChange={(event) => handleFieldChange(event, "name")}
        error={Boolean(fieldErrors.name)}
        helperText={fieldErrors.name}
      />

      <label htmlFor="file" className={styles.righttext}>
        <p>Kindly select your profile picture</p>
        <Box
          sx={{
            width: 100,
            height: 100,
            backgroundColor: "lightblue",
            border: "2px dashed #ccc",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {imageUrl ? (
            <img
              style={{ width: "100%", height: "100%" }}
              src={imageUrl}
              alt="image"
            />
          ) : (
            <EditIcon
              style={{
                marginTop: "70px",
                marginLeft: "70px",
                textAlign: "right",
              }}
            />
          )}
        </Box>
      </label>
      <input
        type="file"
        id="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {selectedGroupType === "0" ? (
        <>
          <TextField
            label="course"
            fullWidth
            select
            margin="normal"
            value={inputFieldValues.course}
            onChange={(event) => handleFieldChange(event, "course")}
            error={Boolean(fieldErrors.course)}
            helperText={fieldErrors.course}
          >
            {courseList.map((courseItem, index) => (
              <MenuItem key={index} value={courseItem.course}>
                {courseItem.course}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="year"
            fullWidth
            select
            margin="normal"
            value={inputFieldValues.year}
            onChange={(event) => handleFieldChange(event, "year")}
            error={Boolean(fieldErrors.year)}
            helperText={fieldErrors.year}
          >
            {generateYearOptions().map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        </>
      ) : (
        <></>
      )}
      <TextField
        label="location"
        fullWidth
        margin="normal"
        value={inputFieldValues.location}
        onChange={(event) => handleFieldChange(event, "location")}
        error={Boolean(fieldErrors.location)}
        helperText={fieldErrors.location}
      />
      <TextField
        label="mobile"
        // value={inputFieldValues.phone}
        value={mobile}
        onChange={(event) => handleFieldChange(event, "mobile")}
        fullWidth
        margin="normal"
      />
    </>
  );
};

export default Step1;
