import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "@/styles/Login.module.css";
import { useUserAuth } from "@/context/GroupContext";

const MemberLogin = () => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { id: groupId } = router.query;
  const { memberLogin, loggedMemberId } = useUserAuth();

  const validateMobile = (mobile) => {
    // Ensure mobile is a 10-digit number
    const regex = /^\d{10}$/;
    return regex.test(mobile);
  };

  const handleMemberLogin = async () => {
    if (!validateMobile(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/member/all/${groupId}`
      );
      const membersList = response.data;

      const matchingMember = membersList.find(
        (member) => member.mobile === parseInt(mobile)
      );

      if (matchingMember) {
        memberLogin(mobile, membersList);
      } else {
        setError("Your mobile number is not registered in this group.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Log In</h1>
        <input
          placeholder="Mobile"
          className={styles.input}
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <button onClick={handleMemberLogin} className={styles.button}>
          Sign In
        </button>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default MemberLogin;
