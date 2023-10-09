import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Login.module.css";

const Login = () => {
  const [mobile, setMobile] = useState(null);

  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.post("http://localhost:2222/admin/add", mobile);

      router.push("/dashboard");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Log In</h1>
        <input
          placeholder="mobile"
          className={styles.input}
          onChange={(e) => setMobile(e.target.value)}
        />

        <button onClick={handleClick} className={styles.button}>
          Sign In
        </button>
        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </div>
    </div>
  );
};

export default Login;
