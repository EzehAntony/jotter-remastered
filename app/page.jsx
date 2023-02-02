"use client";
import Image from "next/image";
import { Aboreto } from "@next/font/google";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Snowfall from "react-snowfall";
import { useEffect } from "react";

const aboreto = Aboreto({ weight: "400", subsets: ["latin"] });

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
      <h2 className={aboreto.className}>Jotter</h2>

      <Snowfall color="#00BCF5" />
    </main>
  );
}
