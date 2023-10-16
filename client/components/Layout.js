import React from "react";
import TopBar from "./TopBar";
import MemberTopBar from "./MemberTopBar";
import { useUserAuth } from "@/context/GroupContext";
// import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const { isAdminLoggedIn, isMemberLoggedIn } = useUserAuth();
  return (
    <div>
      {isAdminLoggedIn && <TopBar />}
      {isMemberLoggedIn && <MemberTopBar />}
      {/* {userLoggedIn && <Sidebar />} */}
      {children}
    </div>
  );
};

export default Layout;
