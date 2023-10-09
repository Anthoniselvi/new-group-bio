import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import MembersList from "@/components/Members/MembersList";
import AddMember from "@/components/Members/AddMember";
import AddedMembers from "@/components/Members/AddedMembers";

export default function SingleGroup() {
  const [createMemberModalOpen, setCreateMemberModalOpen] = useState(false);
  const router = useRouter();
  const { id: groupId, name } = router.query;

  const navigateToCreateMember = () => {
    setCreateMemberModalOpen(true);
  };

  const shareViaWhatsApp = () => {
    const shareUrl = encodeURIComponent(window.location.href);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${shareUrl}`;
    window.open(whatsappUrl, "_blank");
  };

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
        <h2>{name}</h2>
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
      <AddedMembers />
      {/* <MembersList /> */}
    </div>
  );
}
