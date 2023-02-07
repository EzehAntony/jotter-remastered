"use client";
import Image from "next/image";
import { Inter, inr } from "@next/font/google";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Snowfall from "react-snowfall";
import { useEffect } from "react";

const inter = Inter({ weight: "400", subsets: ["latin"] });

export default function splash() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      //router.push("/auth/login");
    }, 2500);
  });
  return (
    <main className={styles.main}>
      <img src="/note2.svg" alt="" />
      <h1 className={inter.className}>Jotter</h1>
      <h3 className={inter.className}>
        Create free notes and save them in our cloud!
      </h3>
      <button onClick={() => router.push("/auth/login")}>Start</button>
      <Snowfall color="#00BCF5" />
    </main>
  );
}
