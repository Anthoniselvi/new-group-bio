import * as React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { courseList } from "../Members/CourseList";
import image from "../../img/picture1.png";
export default function ActiveMembers({ singleGroup, selectedGroup }) {
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
    <div>
      <div
        // ref={profileCardsRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          gap: "1rem",
          width: "100%",
        }}
      >
        {singleGroup.map((item) => {
          if (item.name !== "") {
            hasNonEmptyName = true;
            return (
              <Card
                sx={{
                  display: "flex",
                  paddingRight: "1em",
                  paddingBottom: "1em",
                  width: "100%",
                  height: "200px",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "0px 1px 5px 1px #03045e",
                }}
                key={item.profileId}
                // onClick={() => navigateToSingleProfile(item)}
                data-starts-with={item.name.charAt(0).toLowerCase()}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "top",
                    width: "100%",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5em",
                      padding: 0,
                      paddingLeft: "1em",
                      paddingTop: "1em",
                    }}
                  >
                    <Typography
                      component="div"
                      sx={{
                        fontFamily: "Sans-serif",
                        fontSize: "17px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {item.name}
                      {/* Anthoniselvi */}
                    </Typography>
                    {selectedGroup.groupType === "0" ? (
                      <Typography
                        component="div"
                        sx={{
                          fontFamily: "Sans-serif",
                          fontSize: "15px",
                        }}
                      >
                        {formatCourseInfo(
                          item.course,
                          item.year,
                          getShortFormForCourse(item.course)
                        )}
                        {/* B.E, 2005 (EEE) */}
                      </Typography>
                    ) : (
                      <></>
                    )}
                  </CardContent>
                  <CardMedia
                    component="div"
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      overflow: "hidden",
                      marginTop: 2,
                    }}
                  >
                    {item.image ? (
                      <img
                        // src={image}
                        src={item.image}
                        style={{ width: "100%", height: "100%" }}
                        alt="image"
                      />
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
                  </CardMedia>
                </Box>

                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    gap: "0.5em",
                    padding: 0,
                    paddingLeft: "1em",
                    paddingTop: "0.5em",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Sans-serif",
                      fontSize: "14px",
                      color: "#999999",
                    }}
                    component="div"
                  >
                    {item.designation}
                    <br />
                    {item.company}
                    <br />
                    {item.location}
                    {/* Director Selvi Exports Virudhunagar */}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Sans-serif",
                      fontSize: "14px",
                      color: "#000000",
                      backgroundColor: "red",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      display: "inline-block",
                    }}
                    component="div"
                  >
                    {/* Services Offered: <br /> */}
                    {item.offers}
                    {/* Manufacturing of Pulses */}
                  </Typography>
                </CardContent>
              </Card>
            );
          }
        })}
        {hasNonEmptyName ? null : <p>No Updated Members</p>}
      </div>
    </div>
  );
}
