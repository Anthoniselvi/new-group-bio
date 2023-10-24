import * as React from "react";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import SingleMemberProfile from "./SingleMemberProfile";
import EdgeBox from "./EdgeBox";
import { useMediaQuery } from "@mui/material";
import { courseList } from "../../Members/CourseList";
import { useUserAuth } from "@/context/GroupContext";
import { useRouter } from "next/router";
import axios from "axios";

export default function MembersListForPublic() {

  const isMobile = useMediaQuery("(max-width: 900px)");
  const [selectedMember, setSelectedMember] = useState(null);
  const [edgeMember, setEdgeMember] = useState(null);
  const [open, setOpen] = React.useState(false);
  const { isMemberLoggedIn } = useUserAuth();
  const router = useRouter();
  const { id: groupId } = router.query;
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
    if (isMemberLoggedIn) {
      if (!isMobile) {
        setSelectedMember(item);
      } else {
        setOpen(true);
        setEdgeMember(item);
      }
    } else {
      router.push({
        pathname: "/memberloginpage",
        query: { id: groupId },
      });
    }
  };
  const [selectedGroup, setSelectedGroup] = useState({});
  const [singleGroupMembers, setSingleGroupMembers] = useState([]);

  useEffect(() => {
    console.log("groupId:" + groupId);
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/group/single/${groupId}`)

      .then((response) => {
        setSelectedGroup(response.data);
        console.log("selectedGroup :" + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    console.log("groupId:" + groupId);
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/member/all/${groupId}`)

      .then((response) => {
        setSingleGroupMembers(response.data);
        console.log("singleGroup :" + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <List sx={{ width: "100%" }}>
        {Array.isArray(singleGroupMembers) ? (
          singleGroupMembers.map((item) => {
            if (item.name !== "") {
              return (
                <ListItem
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
                      <>
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
                      </>
                      <Typography
                        sx={{
                          // display: "inline",
                          color: "#75777A",
                          fontSize: 14,
                          fontFamily: "Poppins",
                        }}
                      >
                        {item.location}
                      </Typography>
                      <Typography
                        sx={{
                          // display: "inline",
                          color: "#454749",
                          fontSize: 16,
                          fontWeight: 500,
                          fontFamily: "Poppins",
                        }}
                      >
                        {item.offers}
                      </Typography>
                    </div>
                  </div>
                </ListItem>
              );
            }
            return null;
          })
        ) : (
          <div>No members found</div>
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
