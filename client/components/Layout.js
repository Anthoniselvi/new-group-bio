import React from "react";
import TopBar from "./TopBar";
// import Sidebar from "./Sidebar";

const Layout = ({ userLoggedIn, children }) => {
  return (
    <div>
      {userLoggedIn && <TopBar />}
      {/* {userLoggedIn && <Sidebar />} */}
      {children}
    </div>
  );
};

export default Layout;
