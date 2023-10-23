import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import styles from "@/styles/Search.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useUserAuth } from "@/context/GroupContext";
import ListOfMembers from "../AdminPageForMembers/ListOfMembers";
import SingleMemberProfile from "../AdminPageForMembers/SingleMemberProfile";
import EdgeBox from "../AdminPageForMembers/EdgeBox";

const SearchedMembers = ({ searchResults, singleGroup, selectedGroup }) => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [selectedMember, setSelectedMember] = useState(null);
  const [edgeMember, setEdgeMember] = useState(null);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const getFirstLetterCapital = (name) => {
    return name.charAt(0).toUpperCase();
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
      {/* {console.log(
        "search in SearchedMembers:" + JSON.stringify(searchResults)
      )} */}
      {searchResults ? (
        <>
          {searchResults.map((item) => (
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
                  {/* <>
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
              </> */}
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
          ))}
        </>
      ) : (
        <p style={{ color: "black" }}>No Results found</p>
      )}
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
};

export default SearchedMembers;
