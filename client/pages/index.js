import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Login from "@/components/Login";

export default function Home({ onLogin }) {
  return (
    <>
      <Head>
        <title>XYZ Group Bio</title>
      </Head>
      <main className={styles.main}>
        <Login onLogin={onLogin} />
      </main>
    </>
  );
}
