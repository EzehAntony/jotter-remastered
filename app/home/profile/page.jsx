"use client";
import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { Inter } from "@next/font/google";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });
function page() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const session = useSession();
  const user = session.data.user;
  const fetchData = async () => {
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
        setData(res.data);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user) {
      fetchData();
    } else {
    }
  }, [user]);
  return (
    <div className={styles.profile}>
      <header>
        <h1 className={inter.className}>Profile</h1>
      </header>

      <div className={styles.other}>
        <label>
          <ul>
            <h3 className={inter.className}>Username</h3>
            <h3 className={inter.className}>Nazville</h3>
          </ul>
        </label>
        <label>
          <ul>
            <h3 className={inter.className}>total notes</h3>
            <h3 className={inter.className}>30</h3>
          </ul>
        </label>
      </div>

      <button onClick={signOut}>
        <img src="/exit.svg" alt="" />
        <h3>Logout</h3>
      </button>
    </div>
  );
}

export default page;
