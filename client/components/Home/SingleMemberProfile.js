import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { courseList } from "../Members/CourseList";
import { CloseOutlined } from "@mui/icons-material";

export default function SingleMemberProfile({
  profile,
  selectedGroup,
  setSelectedMember,
}) {
  const getShortFormForCourse = (fullCourseName) => {
    const course = courseList.find(
      (courseprofile) => courseprofile.course === fullCourseName
    );
    return course ? course.shortform : fullCourseName;
  };

  const formatCourseInfo = (course, year, shortform) => {
    const cleanedCourse = course.replace(/\s*\([^)]*\)\s*/, "");
    return `${cleanedCourse.replace(/\)$/, "")}, ${year} (${shortform})`;
  };
  console.log("profile: " + JSON.stringify(profile));
  let hasNonEmptyName = false;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignprofiles: "center",
      }}
    >
      <CloseOutlined
        style={{ alignSelf: "flex-end" }}
        onClick={() => setSelectedMember(false)}
      />
      {/* <ListprofileAvatar> */}
      {profile.image ? (
        <Avatar
          alt="Remy Sharp"
          src={profile.image}
          sx={{
            width: "80px",
            height: "80px",
          }}
        />
      ) : (
        <div
          style={{
            width: "80px",
            height: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#00b4d8",
            borderRadius: "50%",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {profile.name.charAt(0).toUpperCase()}
        </div>
      )}
      {/* </ListprofileAvatar> */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <Typography
          sx={{
            color: "#333333",
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "Poppins",
          }}
        >
          {profile.name}
        </Typography>
        {selectedGroup.groupType === "0" ? (
          <Typography
            sx={{
              display: "inline",
              color: "#75777A",
              fontSize: 14,
              fontFamily: "Poppins",
            }}
          >
            {formatCourseInfo(
              profile.course,
              profile.year,
              getShortFormForCourse(profile.course)
            )}
          </Typography>
        ) : (
          <></>
        )}

        <Typography
          sx={{
            display: "inline",
            color: "#75777A",
            fontSize: 14,
            fontFamily: "Poppins",
          }}
        >
          {profile.location}
        </Typography>

        <Typography
          sx={{
            display: "inline",
            color: "#454749",
            fontSize: 16,
            fontWeight: 500,
            fontFamily: "Poppins",
          }}
        >
          {profile.offers}
        </Typography>
      </div>
    </div>
  );
}
