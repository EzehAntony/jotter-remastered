"use client";
import Card from "@/components/card/Card";
import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Ubuntu } from "@next/font/google";
import { useSession } from "next-auth/react";
import axios from "axios";
const ubuntu = Ubuntu({ weight: "500", subsets: ["cyrillic"] });

const getPosts = async (id) => {
  try {
    const res = await axios({
      url: "https://vercel.com/crayonne/jotter-remastered/api/note/getall",
      method: "POST",
      "content-type": "application/json",
      data: {
        id: id,
      },
    });
    if (res.statusText === "OK") {
      return res.data;
    }
  } catch (err) {
    throw new Error("Unable to fetch");
  }
};

function home() {
  //card color generator
  const colorGenerator = () => {
    const colors = ["#E9F5FC", "#FFF5E1", "#FFE9F3", "#F3F5F7"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return color;
  };

  // user session data
  const session = useSession();

  const [post, setPost] = useState(null);

  const fetchData = async () => {
    if (user) {
      const posts = await getPosts(user._id);
      if (posts) {
        setPost(posts);
      } else {
      }
    } else {
    }
  };

  const user = session.data?.user;
  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div className={styles.home}>
      <header>
        <h3 className={ubuntu.className}>
          Hello, <br /> {user && user.username}!
        </h3>
        <input type="text" placeholder="search" />
      </header>

      <div className={styles.nav}>
        <h1 className={ubuntu.className}>Notes</h1>
      </div>

      <div className={styles.section}>
        <div className={styles.inner}>
          {post && post.map((e) => <Card rawData={e} color={colorGenerator()} />)}
        </div>
      </div>

      <div className="new"></div>
    </div>
  );
}

export default home;
