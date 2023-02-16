"use client";
import { Stylish } from "@next/font/google";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Snowfall from "react-snowfall";
import { useEffect } from "react";

const stylish = Stylish({ weight: "400", subsets: ["latin"] });

export default function splash() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/auth/login");
    }, 2500);
  });
  return (
    <main className={styles.main}>
      <img src="/note2.svg" alt="" />
      <h1 className={stylish.className}>Jotter</h1>
      <h3 className={stylish.className}>
        Create free notes and save them in our cloud!
      </h3>
      <Snowfall color="#00BCF5" />
    </main>
  );
}
