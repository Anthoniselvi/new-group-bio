import React, { useState } from "react";
// import Navbar from "./Navbar";
// import Drawer from "./Drawer";

const Layout = ({ children }) => {
  //   const [opened, setOpened] = useState(false);
  return (
    <div>
      {/* <Navbar opened={opened} setOpened={setOpened} />
      {opened ? <Drawer setOpened={setOpened} /> : null} */}
      {children}
    </div>
  );
};

export default Layout;
