import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MembersList from "@/components/Members/MembersList";
import AddMember from "@/components/Members/AddMember";
import AddedMembers from "@/components/Members/AddedMembers";
import axios from "axios";

export default function MemberGroupPage() {
  const [createMemberModalOpen, setCreateMemberModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({});
  const router = useRouter();
  const { id: groupId, memberId } = router.query;

  const navigateToUpdateMember = () => {
    router.push({
      pathname: "/updatemember",
      query: { id: groupId, memberId },
    });
  };
  console.log("memberId recd in member's group page:" + memberId);
  console.log("groupId recd in member's group page:" + groupId);
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
  return (
    <div style={{ padding: "1rem", marginTop: "6rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "1rem",
        }}
      >
        <h2>{selectedGroup.groupName}</h2>
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

        {createMemberModalOpen ? (
          <AddMember
            open={createMemberModalOpen}
            onClose={() => setCreateMemberModalOpen(false)}
            name={name}
            groupId={groupId}
          />
        ) : (
          <></>
        )}
      </div>
      <AddedMembers />
      {/* <MembersList /> */}
    </div>
  );
}
