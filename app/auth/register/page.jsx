"use client";

import { Ubuntu } from "@next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { React, useState } from "react";
import styles from "./register.module.css";
import Snowfall from "react-snowfall";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["500", "400", "700", "300"],
});

const page = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await axios({
        url: "/api/register",
        method: "POST",
        withCredentials: true,
        data: {
          username: username,
          password: password,
        },
      });
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.left}>
        <form className={styles.form} onSubmit={submit}>
          <h1 className={ubuntu.className}>
            <span>register</span>
          </h1>
          <h2 className={ubuntu.className}>
            A simple notepad app for making notes.
          </h2>

          <div className={styles.input}>
            <div className={styles.userLabel}>
              <h3 className={ubuntu.className} id={styles.username}>
                username
              </h3>
              <input
                className={styles.authInput}
                type="text"
                value={username}
                required={true}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.userLabel}>
              <h3 className={ubuntu.className} id={styles.username}>
                password
              </h3>
              <input
                className={styles.authInput}
                type="text"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onSubmit={submit}
              className={ubuntu.className}
              type="submit"
            >
              register
            </button>
          </div>

          {error && <Error data={error} />}
        </form>
        <p className={ubuntu.className}>
          Already have an account? <Link href={"/auth/login"}> login</Link>
        </p>
      </div>
      <div className={styles.right}>
        <img className={styles.noteImg} src="/note2.svg" alt="" />
      </div>
      <Snowfall color="#00BCF5" />
    </div>
  );
};
export default page;
