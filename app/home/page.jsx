"use client";
import Card from "@/components/card/Card";
import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Ubuntu } from "@next/font/google";

const ubuntu = Ubuntu({ weight: "500", subsets: ["cyrillic"] });
const colors = ["#E9F5FC", "#FFF5E1", "#FFE9F3", "#F3F5F7"];
const random = Math.floor(Math.random() * 5);
function home() {
  const rc = colors[random];
  const [pop, setPop] = useState("none");

  const open = () => {};

  return (
    <div className={styles.home}>
      <header>
        <h3 className={ubuntu.className}>
          Hello, <br /> Good morning!
        </h3>
        <input type="text" placeholder="search" />
      </header>

      <div className={styles.nav}>
        <h1 className={ubuntu.className}>Notes</h1>
      </div>

      <div className={styles.section}>
        <div className={styles.inner}>
          {colors.map(() => (
              <Card color={colors[Math.floor(Math.random() * colors.length)]} />
          ))}
        </div>
      </div>

      <div className="new"></div>
    </div>
  );
}

export default home;
