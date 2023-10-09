import React from "react";
import styles from "@/styles/Home.module.css";

const Header = () => {
  return (
    <div className={styles.header_container}>
      <p className={styles.header_title}>Welcome to GroupBio!</p>
      <p className={styles.header_text}>
        Here's a checklist to complete your Bio
      </p>
    </div>
  );
};

export default Header;
