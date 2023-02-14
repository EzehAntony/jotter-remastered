"use client";

import { Inter } from "@next/font/google";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./card.module.css";
const inter = Inter({ subsets: ["latin"] });

function Card({ color, rawData }) {
  const router = useRouter();

  //initial data gotten from the database

  //Configured and sliced data that displays in the card component
  const [data, setData] = useState({
    header: "",
    body: "",
  });

  // Checks if the characters returned are too long shortens then and adds "..." to the end of the sentence
  const addDots = () => {
    if (rawData.title.slice(0, 51).length > 10) {
      let copyHeader = rawData.title.slice(0, 10);
      copyHeader = copyHeader + "...";
      setData((prev) => ({ ...prev, header: copyHeader }));
    } else {
      setData((prev) => ({ ...prev, header: rawData.title }));
    }

    if (rawData.body.length > 40) {
      let copyBody = rawData.body;
      const a = rawData.body.slice(0, 40);
      const b = a + "...";
      setData((prev) => ({ ...prev, body: b }));
    } else {
      setData((prev) => ({ ...prev, body: rawData.body }));
    }
  };

  useEffect(() => {
    addDots();
  }, []);

  const click = () => {
    router.push(`/home/note/${rawData._id}`);
  };

  return (
    <div
      onClick={click}
      className={styles.card}
      style={{ backgroundColor: color }}
    >
      <header className={inter.className}>{data?.header}</header>

      <h3 className={inter.className}>{data?.body}</h3>
    </div>
  );
}

export default Card;
