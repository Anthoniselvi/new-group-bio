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
import Button from "@mui/material/Button";

export default function ListOfMembers({ singleGroup, selectedGroup }) {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [selectedMember, setSelectedMember] = useState(null);
  const [edgeMember, setEdgeMember] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [showFullOffers, setShowFullOffers] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength);
  };

  const showSingleMemberProfile = (item) => {
    if (!isMobile) {
      setSelectedMember(item);
    } else {
      setOpen(true);
      setEdgeMember(item);
    }
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

  return (
    <div style={{ display: "flex" }}>
      <List sx={{ width: "100%" }}>
        {singleGroup.length > 0 ? ( // Check if the array is not empty
          singleGroup.map((item) => {
            if (item.name !== "") {
              return (
                <ListItem
                  sx={{ maxHeight: "120px" }}
                  onClick={() => showSingleMemberProfile(item)}
                  alignItems="flex-start"
                  key={item.memberId}
                  data-starts-with={item.name.charAt(0).toLowerCase()}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: isMobile ? "20px" : "50px",
                      alignItems: "center",
                    }}
                  >
                    <ListItemAvatar>
                      {item.image ? (
                        <Avatar
                          alt="Remy Sharp"
                          src={item.image}
                          sx={{
                            width: isMobile ? "50px" : "80px",
                            height: isMobile ? "50px" : "80px",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: isMobile ? "50px" : "80px",
                            height: isMobile ? "50px" : "80px",
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
                    <div
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "5px",
                        width: "300px",
                        border: "1px solid red",
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
                      <br />
                      <Typography
                        sx={{
                          display: "inline",
                          color: "#454749",
                          fontSize: 16,
                          fontWeight: 500,
                          fontFamily: "Poppins",
                        }}
                      >
                        {showFullOffers
                          ? item.offers
                          : truncateText(item.offers, 50)}
                      </Typography>
                      {item.offers.length > 50 && (
                        <Button
                          sx={{ textTransform: "none" }}
                          // onClick={() => setShowFullOffers(!showFullOffers)}
                        >
                          {/* {showFullOffers ? "Read Less" : "Read More"} */}
                          {!showFullOffers && "Read More"}
                        </Button>
                      )}
                    </div>
                  </div>
                </ListItem>
              );
            } else {
              return (
                <div key={`empty-${item.memberId}`} style={{ display: "none" }}>
                  Empty Item
                </div>
              );
            }
          })
        ) : (
          <div>Loading...</div>
        )}
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
