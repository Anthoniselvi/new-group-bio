import * as React from "react";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import SingleMemberProfile from "./SingleMemberProfile";
import EdgeBox from "./EdgeBox";
import { useMediaQuery } from "@mui/material";
import { courseList } from "../../Members/CourseList";

export default function ListOfMembers({ singleGroup, selectedGroup }) {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [selectedMember, setSelectedMember] = useState(null);
  const [edgeMember, setEdgeMember] = useState(null);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const getShortFormForCourse = (fullCourseName) => {
    const course = courseList.find(
      (courseItem) => courseItem.course === fullCourseName
    );
    return course ? course.shortform : fullCourseName;
  };

  const formatCourseInfo = (course, year, shortform) => {
    const cleanedCourse = course.replace(/\s*\([^)]*\)\s*/, "");
    return `${cleanedCourse.replace(/\)$/, "")}, ${year} (${shortform})`;
  };

  const showSingleMemberProfile = (item) => {
    if (!isMobile) {
      setSelectedMember(item);
    } else {
      setOpen(true);
      setEdgeMember(item);
    }
  };

  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <List sx={{ width: "100%" }}>
        {singleGroup.map((item) => {
          if (item.name !== "") {
            return (
              <ListItem
                onClick={() => showSingleMemberProfile(item)}
                alignItems="flex-start"
                key={item.profileId}
                data-starts-with={item.name.charAt(0).toLowerCase()}
              >
                <div
                  style={{ display: "flex", gap: "50px", alignItems: "center" }}
                >
                  <ListItemAvatar>
                    {item.image ? (
                      <Avatar
                        alt="Remy Sharp"
                        src={item.image}
                        sx={{ width: "80px", height: "80px" }}
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
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </ListItemAvatar>
                  <Typography
                    sx={{
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
                      {item.name}
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
                          item.course,
                          item.year,
                          getShortFormForCourse(item.course)
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
                      {item.location}
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
                      {item.offers}
                    </Typography>
                  </Typography>
                </div>
              </ListItem>
            );
          }
          return null; // Return null for items with empty names
        })}
      </List>
      {selectedMember && (
        <SingleMemberProfile
          profile={selectedMember}
          selectedGroup={selectedGroup}
          setSelectedMember={setSelectedMember}
        />
      )}
      {isMobile && edgeMember && (
        <EdgeBox open={open} toggleDrawer={toggleDrawer} profile={edgeMember} />
      )}
    </div>
  );
}
