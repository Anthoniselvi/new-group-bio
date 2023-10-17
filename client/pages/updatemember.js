import Form from "@/components/MemberPages/UpdateMember/Form";
import Header from "@/components/MemberPages/UpdateMember/Header";

import { useRouter } from "next/router";

const updatemember = () => {
  const router = useRouter();
  const { id: groupId, memberId } = router.query;
  console.log("groupId in update:", groupId);
  console.log("memberId in update:", memberId);
  return (
    <div style={{ padding: "5rem 1rem", marginLeft: "240px" }}>
      <Header />
      <Form />
    </div>
  );
};

export default updatemember;
