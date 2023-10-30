import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "@/styles/Login.module.css";
import { useUserAuth } from "@/context/GroupContext";

const MemberLogin = () => {
  const [mobile, setMobile] = useState("");
  const [membersList, setMembersList] = useState([]);
  const [error, setError] = useState(false);
  const [memberId, setMemberId] = useState("");
  const router = useRouter();
  const { id: groupId } = router.query;
  const { memberLogin, loggedMemberId } = useUserAuth();

  // console.log("memberId in login: " + loggedMemberId);
  useEffect(() => {
    // console.log("groupId: " + groupId);
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/member/all/${groupId}`)
      .then((response) => {
        setMembersList(response.data);
        // console.log("membersList: " + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [groupId]);

  const handleMemberLogin = () => {
    if (!mobile) {
      setError("Please enter a mobile number.");
      return;
    }

    // Check if the provided mobile number is in the membersList
    const matchingMember = membersList.find(
      (member) => member.mobile === parseInt(mobile)
    );

    if (matchingMember) {
      memberLogin(mobile, membersList);
    } else {
      setError("Your mobile number is not registered.");
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
