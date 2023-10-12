import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { courseList } from "../Members/CourseList";

export default function ListOfMembers({ singleGroup, selectedGroup }) {
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
  let hasNonEmptyName = false;
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {singleGroup.map((item) => {
        if (item.name !== "") {
          hasNonEmptyName = true;
          return (
            <ListItem
              alignItems="flex-start"
              key={item.profileId}
              data-starts-with={item.name.charAt(0).toLowerCase()}
            >
              <ListItemAvatar border="1px solid red">
                {item.image ? (
                  <Avatar alt="Remy Sharp" src={item.image} />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
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
              <ListItemText
                primary={item.name}
                secondary={
                  <React.Fragment>
                    {selectedGroup.groupType === "0" ? (
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
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
                    {item.location}
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.offers}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        }
      })}
    </List>
  );
}
