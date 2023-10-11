import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Login from "@/components/Login";
import HomePage from "@/components/Home/HomePage";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>XYZ Group Bio</title>
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Login />
        {/* <HomePage /> */}
      </main>
    </>
  );
}
