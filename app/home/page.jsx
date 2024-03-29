"use client";
import Card from "@/components/card/Card";
import "../globals.css";
import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Ubuntu } from "@next/font/google";
import { useSession } from "next-auth/react";
import axios from "axios";
import Loading from "@/components/loading/Loading";
const ubuntu = Ubuntu({ weight: "500", subsets: ["cyrillic"] });
import Link from "next/link";
import { useRouter } from "next/navigation";

function home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const router = useRouter();
  console.log(post);

  // user session data
  const session = useSession();
  const user = session.data?.user;

  //card color generator
  const colorGenerator = () => {
    const colors = ["#E9F5FC", "#FFF5E1", "#FFE9F3", "#F3F5F7"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return color;
  };

  const fetchData = async () => {
    if (user) {
      setLoading(true);
      setError(false);
      await axios({
        method: "POST",
        url: "/api/note/findall",
        data: {
          id: user._id,
        },
      })
        .then((res) => {
          setError(false);
          setLoading(false);
          setPost(res.data);
        })
        .catch((err) => {
          setError(true);
          setPost(null);
          setLoading(false);
        });
    } else {
    }
  };

  const reload = () => {
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div className={styles.home}>
      <header>
        <h3 className={ubuntu.className}>
          Hello, <br /> {user && user.username}!
        </h3>
        {/* <input type="text" placeholder="search" /> */}
      </header>

      <div className={styles.nav}>
        <h1 className={ubuntu.className}>Notes</h1>
      </div>

      <div className={styles.section}>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center ">
          {loading && <Loading />}
          {error && <img src="/error.gif" />}
          {error && (
            <button onClick={reload} className={styles.reload}>
              Reload
            </button>
          )}
          {post &&
            post.map((e) => (
              <Card rawData={e} key={e._id} color={colorGenerator()} />
            ))}
          {post && post.length === 0 && (
            <div className={styles.noData}>
              <img src="/empty.svg" />
              <button onClick={() => router.push("/home/note")}>
                Create Note
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="new"></div>
    </div>
  );
}

export default home;
