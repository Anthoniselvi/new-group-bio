import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "@/styles/Login.module.css";

const MemberLogin = () => {
  const [mobile, setMobile] = useState(null);
  const [membersList, setMembersList] = useState([]);
  const [error, setError] = useState(false);
  const [memberId, setMemberId] = useState("");
  const router = useRouter();
  const { id: groupId } = router.query;

  const handleLogin = () => {
    if (!mobile) {
      setError("Please enter a mobile number.");
      return;
    }

    const matchingMember = membersList.find(
      (member) => member.mobile === parseInt(mobile)
    );

    if (matchingMember) {
      setMemberId(matchingMember.memberId); // Store the memberId in state

      router.push({
        pathname: "/membergrouppage",
        query: { id: groupId, memberId: matchingMember.memberId },
      });
    } else {
      setError("Your mobile number is not registered.");
    }
  };
  console.log("memberId: " + memberId);
  useEffect(() => {
    console.log("groupId: " + groupId);
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/member/all/${groupId}`)
      .then((response) => {
        setMembersList(response.data);
        console.log("membersList: " + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [groupId]);

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

        <button onClick={handleLogin} className={styles.button}>
          Sign In
        </button>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default MemberLogin;
