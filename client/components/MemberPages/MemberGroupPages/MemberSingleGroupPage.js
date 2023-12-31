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

export default function MemberSingleGroupPage() {
  const [createMemberModalOpen, setCreateMemberModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [singleGroupMembers, setSingleGroupMembers] = useState([]);
  const { loggedMemberId } = useUserAuth();
  const isMobile = useMediaQuery("(max-width: 900px)");
  const router = useRouter();
  const { id: groupId, memberId } = router.query;
  const [selectedMember, setSelectedMember] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  // console.log("groupId :" + groupId);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/member/${memberId}`)
      .then((response) => {
        setSelectedMember(response.data);
        // console.log(
        //   "selected member in form: " + JSON.stringify(response.data)
        // );
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setDataLoaded(true);
      });
  }, [memberId]);

  const navigateToUpdateMember = () => {
    router.push({
      pathname: "/updatemember",
      query: { id: groupId, memberId: loggedMemberId },
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/group/single/${groupId}`)
      .then((response) => {
        setSelectedGroup(response.data);
        // console.log("selectedGroup :" + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [groupId]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/member/all/${groupId}`)
      .then((response) => {
        setSingleGroupMembers(response.data);
        // console.log("singleGroup :" + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [groupId]);

  return (
    <div
      style={{
        marginTop: "6rem",
        marginLeft: isMobile ? 0 : "230px",
        padding: isMobile ? "1rem" : "2rem 4rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "1rem",
        }}
      >
        {/* {console.log("selectedGroup :" + JSON.stringify(selectedGroup))} */}
        <h2>{selectedGroup.groupName}</h2>
        {/* {console.log(
          "selected member in form: " + JSON.stringify(selectedMember)
        )} */}
        {dataLoaded && (!selectedMember.name || selectedMember.name === "") ? (
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#00b4d8",
              color: "#fff",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => navigateToUpdateMember(memberId)}
          >
            Update
          </button>
        ) : null}

        {createMemberModalOpen ? (
          <AddMember
            open={createMemberModalOpen}
            onClose={() => setCreateMemberModalOpen(false)}
            name={selectedGroup.groupName}
            groupId={groupId}
          />
        ) : (
          <></>
        )}
      </div>
      <ListOfMembers
        singleGroup={singleGroupMembers}
        selectedGroup={selectedGroup}
      />
    </div>
  );
}
