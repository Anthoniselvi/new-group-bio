import React from "react";
import AdminTopBar from "./NavBar/AdminTopBar";
import MemberTopBar from "./NavBar/MemberTopBar";
import { useUserAuth } from "@/context/GroupContext";
// import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const { isAdminLoggedIn, isMemberLoggedIn } = useUserAuth();
  console.log("adminlog:" + isAdminLoggedIn);
  console.log("memberlog:" + isMemberLoggedIn);
  return (
    <div>
      {isAdminLoggedIn && <AdminTopBar />}
      {isMemberLoggedIn && <MemberTopBar />}

      {children}
    </div>
  );
};

export default Layout;
