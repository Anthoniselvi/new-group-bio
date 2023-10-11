import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MembersList from "@/components/Members/MembersList";
import AddMember from "@/components/Members/AddMember";
import AddedMembers from "@/components/Members/AddedMembers";
import axios from "axios";
import SingleGroupPage from "@/components/Home/SingleGroupPage";

export default function SingleGroup() {
  const [createMemberModalOpen, setCreateMemberModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({});
  const router = useRouter();
  const { id: groupId } = router.query;

  const navigateToCreateMember = () => {
    setCreateMemberModalOpen(true);
  };

  const shareViaWhatsApp = () => {
    const currentUrl = window.location.origin; // Get the base URL
    const sharedUrl = `${currentUrl}/memberloginpage?id=${groupId}`; // Append the id query parameter
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      sharedUrl
    )}`;
    window.open(whatsappUrl, "_blank");
  };

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
          onClick={navigateToCreateMember}
        >
          + Add
        </button>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#25d366", // WhatsApp green
            color: "#fff",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={shareViaWhatsApp}
        >
          Share via WhatsApp
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
      {/* <AddedMembers /> */}
      <MembersList />
    </div>
  );
}
