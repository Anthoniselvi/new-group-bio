import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MembersList from "@/components/Members/MembersList";
import AddMember from "@/components/Members/AddMember";
import AddedMembers from "@/components/Members/AddedMembers";
import axios from "axios";
import ListOfMembers from "@/components/AdminPages/AdminPageForMembers/ListOfMembers";
import { useUserAuth } from "@/context/GroupContext";
import { useMediaQuery } from "@mui/material";
import MembersListForPublic from "../AdminPageForMembers/MembersListForPublic";

export default function PublicSingleGroupPage() {
  const [selectedGroup, setSelectedGroup] = useState({});
  const [singleGroupMembers, setSingleGroupMembers] = useState([]);

  const isMobile = useMediaQuery("(max-width: 900px)");
  const router = useRouter();
  const { id: groupId } = router.query;
  console.log("groupId:" + groupId);

  useEffect(() => {
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
    <div
      style={{
        marginTop: "6rem",
        marginLeft: isMobile ? 0 : "230px",
        padding: isMobile ? "1rem" : "2rem 4rem",
      }}
    >
      <h2>{selectedGroup.groupName}</h2>

      <MembersListForPublic
        singleGroup={singleGroupMembers}
        selectedGroup={selectedGroup}
      />
    </div>
  );
}
