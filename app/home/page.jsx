"use client";
import Card from "@/components/card/Card";
import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Ubuntu } from "@next/font/google";
import { useSession } from "next-auth/react";

const ubuntu = Ubuntu({ weight: "500", subsets: ["cyrillic"] });
const getData = async () => {
  fetch("");
  return "";
};

function home() {
  const session = useSession();
  const user = session.data?.user;
  const colors = ["#E9F5FC", "#FFF5E1", "#FFE9F3", "#F3F5F7"];
  const random = Math.floor(Math.random() * 5);
  const rc = colors[random];
  const [pop, setPop] = useState("none");

  const open = () => {};

  const data = [
    {
      id: 501,
      header: "go to school",
      body: "get a book from the library",
    },
    {
      id: 502,
      header: "wait at home",
      body: "lorem is the best space filler",
    },
    {
      id: 503,
      header: "return at 5",
      body: "lorem is the best space filler",
    },
    {
      id: 504,
      header: "wait at home",
      body: "lorem is the best space filler",
    },
    {
      id: 505,
      header: "wait at home",
      body: "lorem is the best space filler",
    },
    {
      id: 506,
      header: "wait at home",
      body: "lorem is the best space filler",
    },
    {
      id: 507,
      header: "wait at home",
      body: "lorem is the best space filler",
    },
    {
      id: 508,
      header: "wait at home",
      body: "lorem is the best space filler",
    },
    {
      id: 509,
      header: "wait at home",
      body: "lorem is the best space filler",
    },
    {
      id: 510,
      header: "wait at home",
      body: "lorem is the best space filler",
    },
  ];

  const clicker = () => {};

  return (
    <div className={styles.home}>
      <header onClick={clicker}>
        <h3 className={ubuntu.className}>
          Hello, <br /> {user?.username}!
        </h3>
        <input type="text" placeholder="search" />
      </header>

      <div className={styles.nav}>
        <h1 className={ubuntu.className}>Notes</h1>
      </div>

      <div className={styles.section}>
        <div className={styles.inner}>
          {data.map((e) => (
            <Card
              rawData={e}
              color={colors[Math.floor(Math.random() * colors.length)]}
            />
          ))}
        </div>
      </div>

      <div className="new"></div>
    </div>
  );
}

export default home;
