"use client";
import Card from "@/components/card/Card";
import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Ubuntu } from "@next/font/google";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

const ubuntu = Ubuntu({ weight: "500", subsets: ["cyrillic"] });
const getData = async (id) => {
  const res = await fetch({
    url: "http://localhost:3000/api/note/getall",
    method: "POST",
    "content-type": "application/json",
    data: {
      id: id,
    },
  });
  if (!res.ok) {
    console.log(id);
    throw new Error("Unable  to fetch");
  } else {
    return res.json();
    console.log(res);
  }
};

function home() {
  const colors = ["#E9F5FC", "#FFF5E1", "#FFE9F3", "#F3F5F7"];
  const random = Math.floor(Math.random() * 5);
  const rc = colors[random];
  const [pop, setPop] = useState("none");
  const { user } = useSelector((state) => state.user);
  const getDataa = async () => {
    console.log(user)
    const data = await getData(user._id);
    console.log(data);
  };
  useEffect(() => {
    if (user) {
      alert(user)
    }
  }, []);
  return (
    <div className={styles.home}>
      <header>
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
          {/*           {data &&
            data.map((e) => (
              <Card
                rawData={e}
                color={colors[Math.floor(Math.random() * colors.length)]}
              />
            ))} */}
        </div>
      </div>

      <div className="new"></div>
    </div>
  );
}

export default home;
