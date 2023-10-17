import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { courseList } from "../../Members/CourseList";
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
        width: "50%",
      }}
    >
      <CloseOutlined
        style={{ alignSelf: "flex-end" }}
        onClick={() => setSelectedMember(false)}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
          <Typography
            sx={{
              color: "#333333",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "Poppins",
            }}
          >
            {profile.mobile}
          </Typography>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography
            sx={{
              color: "#000000",
              fontFamily: "Poppins",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Bio
          </Typography>
          {selectedGroup.groupType === "0" ? (
            <Typography
              sx={{
                display: "inline",
                color: "#333333",
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
              color: "#333333",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "Poppins",
            }}
          >
            {profile.designation}
          </Typography>
          <Typography
            sx={{
              display: "inline",
              color: "#333333",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "Poppins",
            }}
          >
            {profile.company}
          </Typography>
          <Typography
            sx={{
              display: "inline",
              color: "#333333",
              fontSize: 14,
              fontFamily: "Poppins",
            }}
          >
            {profile.location}
          </Typography>
          <Typography
            sx={{
              display: "inline",
              color: "#333333",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "Poppins",
            }}
          >
            {profile.industry}
          </Typography>
          <Typography
            sx={{
              display: "inline",
              color: "#333333",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "Poppins",
            }}
          >
            Services Offered <br />
            {profile.offers.split(" ").map((word, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: "#e1e2e5",
                  borderRadius: "4px",
                  marginRight: "10px",
                  padding: "0 2px",
                  display: "inline",
                }}
              >
                {word}{" "}
              </span>
            ))}
          </Typography>
        </div>
      </div>
    </div>
  );
}
