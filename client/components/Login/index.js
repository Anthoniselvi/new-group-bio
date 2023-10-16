import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Login.module.css";
import { useUserAuth } from "@/context/GroupContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { adminLogin, error } = useUserAuth();

  const handleAdminLogin = async () => {
    if (!username || !password) {
      return;
    }

    try {
      await adminLogin(username, password);
    } catch (err) {
      console.log("login error:" + err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Log In</h1>
        <input
          placeholder="username"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleAdminLogin} className={styles.button}>
          Sign In
        </button>
        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </div>
    </div>
  );
};

export default Login;
