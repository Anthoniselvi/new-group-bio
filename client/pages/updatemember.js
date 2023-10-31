import Form from "@/components/MemberPages/UpdateMember/Form";
import Header from "@/components/MemberPages/UpdateMember/Header";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";

const updatemember = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  // const router = useRouter();
  // const { id: groupId, memberId } = router.query;
  // console.log("groupId in update:", groupId);
  // console.log("memberId in update:", memberId);
  return (
    <div
      style={{
        padding: isMobile ? "6rem 2rem" : "6rem 10rem",
        marginLeft: isMobile ? 0 : "240px",
      }}
    >
      <Header />
      <Form />
    </div>
  );
};

export default updatemember;
