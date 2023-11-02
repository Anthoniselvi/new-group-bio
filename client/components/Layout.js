import React from "react";
import AdminTopBar from "./NavBar/AdminTopBar";
import MemberTopBar from "./NavBar/MemberTopBar";
import { useUserAuth } from "@/context/GroupContext";

const Layout = ({ children }) => {
  const { isAdminLoggedIn, isMemberLoggedIn } = useUserAuth();

  return (
    <div>
      {isAdminLoggedIn ? <AdminTopBar /> : null}
      {isMemberLoggedIn ? <MemberTopBar /> : null}
      {children}
    </div>
  );
};

export default Layout;
